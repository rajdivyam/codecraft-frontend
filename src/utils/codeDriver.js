/**
 * Generates full runnable code by combining user's function with driver code.
 * This enables LeetCode/GFG style execution - user writes only the function,
 * test cases are called automatically.
 */

export function generateFullCode(language, userCode, testCases, functionName) {
  if (!testCases || testCases.length === 0) {
    // No test cases, run user code as-is
    return userCode;
  }

  const calls = testCases.map(tc => tc.input);

  switch (language) {
    case 'javascript':
      return generateJSDriver(userCode, calls, functionName);
    case 'python':
      return generatePythonDriver(userCode, calls, functionName);
    case 'cpp':
      return generateCppDriver(userCode, calls, functionName);
    case 'java':
      return generateJavaDriver(userCode, calls, functionName);
    case 'c':
      return generateCDriver(userCode, calls, functionName);
    default:
      return userCode;
  }
}

function generateJSDriver(userCode, calls, fn) {
  const testLines = calls.map(c => `console.log(JSON.stringify(${fn}(${c})));`).join('\n');
  return `${userCode}\n\n// --- Driver Code (Auto-generated) ---\n${testLines}\n`;
}

function generatePythonDriver(userCode, calls, fn) {
  const testLines = calls.map(c => {
    const pyInput = c.replace(/true/g, 'True').replace(/false/g, 'False').replace(/null/g, 'None');
    return `import json as __json\n__r = ${fn}(${pyInput})\nprint(__json.dumps(__r) if isinstance(__r, (list, dict)) else __r)`;
  });
  return `${userCode}\n\n# --- Driver Code (Auto-generated) ---\n${testLines.join('\n')}\n`;
}

function generateCppDriver(userCode, calls, fn) {
  // Transform JS array syntax [1,2,3] to C++ vector syntax {1,2,3}
  const transformedCalls = calls.map(c => {
    return c.replace(/\[([^\[\]]*)\]/g, '{$1}');
  });
  const testLines = transformedCalls.map(c => `    cout << ${fn}(${c}) << endl;`).join('\n');
  return `#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\n#include <unordered_map>\n#include <unordered_set>\n#include <climits>\n#include <sstream>\nusing namespace std;\n\n${userCode}\n\n// --- Driver Code (Auto-generated) ---\nint main() {\n${testLines}\n    return 0;\n}\n`;
}

function generateJavaDriver(userCode, calls, fn) {
  const testLines = calls.map(c => `        System.out.println(Solution.${fn}(${c}));`).join('\n');
  return `${userCode}\n\n// --- Driver Code (Auto-generated) ---\npublic class Main {\n    public static void main(String[] args) {\n${testLines}\n    }\n}\n`;
}

function generateCDriver(userCode, calls, fn) {
  const testLines = calls.map(c => `    printf("%d\\n", ${fn}(${c}));`).join('\n');
  return `#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\n\n${userCode}\n\n// --- Driver Code (Auto-generated) ---\nint main() {\n${testLines}\n    return 0;\n}\n`;
}

/**
 * Parse output and compare with test cases.
 * Returns array of { passed, input, expected, actual }
 */
export function evaluateResults(rawOutput, testCases) {
  const outputLines = rawOutput.trim().split('\n').map(l => l.trim().replace(/\r/g, ''));

  return testCases.map((tc, i) => {
    const actual = (outputLines[i] || '').trim();
    let expected = tc.expected.trim();

    // Normalize for comparison
    const normalizeValue = (v) => {
      try {
        return JSON.stringify(JSON.parse(v));
      } catch {
        return v;
      }
    };

    const passed = normalizeValue(actual) === normalizeValue(expected);

    return {
      id: i + 1,
      input: tc.input,
      expected: expected,
      actual: actual || '(no output)',
      passed
    };
  });
}
