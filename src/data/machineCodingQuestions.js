export const codingQuestions = [
  // EASY QUESTIONS (1-12)
  {
    id: 1, title: "Hello World", difficulty: "Easy",
    description: "Write a program that prints 'Hello, World!' to the console.",
    examples: "Input: None\nOutput: Hello, World!",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function helloWorld() {\n    // Write your code here\n    console.log("Hello, World!");\n}',
      python: 'def hello_world():\n    # Write your code here\n    print("Hello, World!")',
      cpp: '#include <iostream>\nusing namespace std;\n\nvoid helloWorld() {\n    // Write your code here\n    cout << "Hello, World!" << endl;\n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public void helloWorld() {\n        // Write your code here\n        System.out.println("Hello, World!");\n    }\n}',
      c: '#include <stdio.h>\n\nvoid helloWorld() {\n    // Write your code here\n    printf("Hello, World!\\n");\n}'
    },
    runners: {
      javascript: '\nhelloWorld();',
      python: '\nif __name__ == "__main__":\n    hello_world()',
      cpp: '\nint main() {\n    helloWorld();\n    return 0;\n}',
      java: '\npublic class Main {\n    public static void main(String[] args) {\n        new Solution().helloWorld();\n    }\n}',
      c: '\nint main() {\n    helloWorld();\n    return 0;\n}'
    },
    expectedOutput: 'Hello, World!', solved: false,
    testCases: [{ input: "", expected: "Hello, World!" }]
  },
  {
    id: 2, title: "Sum of Two Numbers", difficulty: "Easy",
    description: "Write a program that adds two numbers and returns the result.",
    examples: "Input: a = 5, b = 7\nOutput: 12",
    language: "cpp",
    leetcodeStyle: true,
    templates: {
      javascript: 'function sum(a, b) {\n    // Return the sum of a and b\n    return a + b;\n}',
      python: 'def sum(a, b):\n    # Return the sum of a and b\n    return a + b',
      cpp: '#include <iostream>\nusing namespace std;\n\nint sum(int a, int b) {\n    // Return the sum of a and b\n    return a + b;\n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public int sum(int a, int b) {\n        return a + b;\n    }\n}',
      c: '#include <stdio.h>\n\nint sum(int a, int b) {\n    return a + b;\n}'
    },
    runners: {
      javascript: '\nconst args = require("fs").readFileSync(0).toString().split(/\\s+/);\nif (args.length >= 2) console.log(sum(parseInt(args[0]), parseInt(args[1])));',
      python: '\nimport sys\nline = sys.stdin.read().split()\nif len(line) >= 2:\n    print(sum(int(line[0]), int(line[1])))',
      cpp: '\nint main() {\n    int a, b;\n    if (std::cin >> a >> b) std::cout << sum(a, b);\n    return 0;\n}',
      java: '\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int a = sc.nextInt();\n            int b = sc.nextInt();\n            System.out.print(new Solution().sum(a, b));\n        }\n    }\n}',
      c: '\nint main() {\n    int a, b;\n    if (scanf("%d %d", &a, &b) == 2) printf("%d", sum(a, b));\n    return 0;\n}'
    },
    testCases: [
      { input: "5 7", expected: "12" },
      { input: "10 20", expected: "30" },
      { input: "-5 5", expected: "0" }
    ],
    expectedOutput: '12', solved: false
  },
  {
    id: 3, title: "FizzBuzz", difficulty: "Easy",
    description: "Print numbers from 1 to n. For multiples of 3 print 'Fizz', 5 print 'Buzz', both print 'FizzBuzz'.",
    examples: "Input: n = 15\nOutput:\n1\n2\nFizz\n4\nBuzz...",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function fizzBuzz(n) {\n    // Implement FizzBuzz for numbers 1 to n\n    \n}',
      python: 'def fizz_buzz(n):\n    # Implement FizzBuzz\n    pass',
      cpp: '#include <iostream>\nusing namespace std;\n\nvoid fizzBuzz(int n) {\n    // Implement FizzBuzz\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public void fizzBuzz(int n) {\n        \n    }\n}',
      c: '#include <stdio.h>\n\nvoid fizzBuzz(int n) {\n    \n}'
    },
    runners: {
      javascript: '\nconst n = parseInt(require("fs").readFileSync(0).toString().trim());\nif (!isNaN(n)) fizzBuzz(n);',
      python: '\nimport sys\nline = sys.stdin.read().strip()\nif line: fizz_buzz(int(line))',
      cpp: '\nint main() {\n    int n; if (std::cin >> n) fizzBuzz(n); return 0;\n}',
      java: '\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in); if (sc.hasNextInt()) new Solution().fizzBuzz(sc.nextInt());\n    }\n}',
      c: '\nint main() {\n    int n; if (scanf("%d", &n) == 1) fizzBuzz(n); return 0;\n}'
    },
    testCases: [{ input: "15", expected: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz" }],
    expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz', solved: false
  },
  {
    id: 4, title: "Even or Odd", difficulty: "Easy",
    description: "Write a program that determines if a number is even or odd.",
    examples: "Input: num = 42\nOutput: 42 is even",
    language: "python",
    leetcodeStyle: true,
    templates: {
      python: 'def check_even_odd(num):\n    # Print if num is even or odd\n    pass',
      javascript: 'function checkEvenOdd(num) {\n    \n}',
      cpp: '#include <iostream>\nusing namespace std;\n\nvoid checkEvenOdd(int num) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public void checkEvenOdd(int num) {\n        \n    }\n}',
      c: '#include <stdio.h>\n\nvoid checkEvenOdd(int num) {\n    \n}'
    },
    runners: {
      python: '\nimport sys\nline = sys.stdin.read().strip()\nif line: check_even_odd(int(line))',
      javascript: '\nconst n = parseInt(require("fs").readFileSync(0).toString().trim());\nif (!isNaN(n)) checkEvenOdd(n);',
      cpp: '\nint main() { int n; if (std::cin >> n) checkEvenOdd(n); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); if (sc.hasNextInt()) new Solution().checkEvenOdd(sc.nextInt()); } }',
      c: '\nint main() { int n; if (scanf("%d", &n) == 1) checkEvenOdd(n); return 0; }'
    },
    testCases: [
      { input: "42", expected: "42 is even" },
      { input: "7", expected: "7 is odd" }
    ],
    expectedOutput: '42 is even', solved: false
  },
  {
    id: 5, title: "Reverse a String", difficulty: "Easy",
    description: "Reverse the given string and print it.",
    examples: "Input: str = 'codecraft'\nOutput: tfarcedoc",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function reverseString(str) {\n    // Return or print reversed string\n    \n}',
      python: 'def reverse_string(s):\n    # Print reversed string\n    pass',
      cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nvoid reverseString(string s) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public void reverseString(String s) {\n        \n    }\n}',
      c: '#include <stdio.h>\n\nvoid reverseString(char* s) {\n    \n}'
    },
    runners: {
      javascript: '\nconst s = require("fs").readFileSync(0).toString().trim();\nif (s) { const res = reverseString(s); if (res) console.log(res); }',
      python: '\nimport sys\ns = sys.stdin.read().strip()\nif s: reverse_string(s)',
      cpp: '\nint main() { std::string s; if (std::cin >> s) reverseString(s); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); if (sc.hasNext()) new Solution().reverseString(sc.next()); } }',
      c: '\nint main() { char s[1000]; if (scanf("%s", s) == 1) reverseString(s); return 0; }'
    },
    testCases: [
      { input: "codecraft", expected: "tfarcedoc" },
      { input: "hello", expected: "olleh" }
    ],
    expectedOutput: 'tfarcedoc', solved: false
  },
  {
    id: 6, title: "Palindrome Check", difficulty: "Easy",
    description: "Check if the given string is a palindrome. Return true or false.",
    examples: "Input: str = 'racecar'\nOutput: true",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function isPalindrome(str) {\n    // Return true if palindrome, else false\n    \n}',
      python: 'def is_palindrome(s):\n    # Return True or False\n    pass',
      cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nbool isPalindrome(string s) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public boolean isPalindrome(String s) {\n        return false;\n    }\n}',
      c: '#include <stdbool.h>\n#include <string.h>\n\nbool isPalindrome(char* s) {\n    return false;\n}'
    },
    runners: {
      javascript: '\nconst s = require("fs").readFileSync(0).toString().trim();\nconsole.log(isPalindrome(s));',
      python: '\nimport sys\ns = sys.stdin.read().strip()\nprint(str(is_palindrome(s)).lower())',
      cpp: '\nint main() { std::string s; if (std::cin >> s) std::cout << (isPalindrome(s) ? "true" : "false"); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); if (sc.hasNext()) System.out.print(new Solution().isPalindrome(sc.next())); } }',
      c: '\n#include <stdio.h>\nint main() { char s[1000]; if (scanf("%s", s) == 1) printf("%s", isPalindrome(s) ? "true" : "false"); return 0; }'
    },
    testCases: [
      { input: "racecar", expected: "true" },
      { input: "hello", expected: "false" }
    ],
    expectedOutput: 'true', solved: false
  },
  {
    id: 7, title: "Two Sum", difficulty: "Easy",
    description: "Given array and target, return indices of the two numbers that add up to target.",
    examples: "Input: nums = [2, 7, 11, 15], target = 9\nOutput: 0, 1",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function twoSum(nums, target) {\n    // Return [index1, index2]\n    \n}',
      python: 'def two_sum(nums, target):\n    # Return [index1, index2]\n    pass',
      cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        return new int[]{};\n    }\n}',
      c: '#include <stdio.h>\n#include <stdlib.h>\n\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    *returnSize = 2;\n    return (int*)malloc(2 * sizeof(int));\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/).map(Number);\nconst n = input[0];\nconst nums = input.slice(1, n + 1);\nconst target = input[n + 1];\nconsole.log(twoSum(nums, target).join(", "));',
      python: '\nimport sys\ndata = list(map(int, sys.stdin.read().split()))\nn = data[0]\nprint(", ".join(map(str, two_sum(data[1:n+1], data[n+1]))))',
      cpp: '\nint main() { int n; if (std::cin >> n) { std::vector<int> nums(n); for(int i=0; i<n; i++) std::cin >> nums[i]; int t; std::cin >> t; auto res = twoSum(nums, t); std::cout << res[0] << ", " << res[1]; } return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[] nums = new int[n]; for(int i=0; i<n; i++) nums[i] = sc.nextInt(); int t = sc.nextInt(); int[] r = new Solution().twoSum(nums, t); System.out.print(r[0] + ", " + r[1]); } }',
      c: '\nint main() { int n; scanf("%d", &n); int* nums = malloc(n*sizeof(int)); for(int i=0; i<n; i++) scanf("%d", &nums[i]); int t; scanf("%d", &t); int rs; int* r = twoSum(nums, n, t, &rs); printf("%d, %d", r[0], r[1]); return 0; }'
    },
    testCases: [
      { input: "4 2 7 11 15 9", expected: "0, 1" },
      { input: "3 3 2 4 6", expected: "1, 2" }
    ],
    expectedOutput: '0, 1', solved: false
  },
  {
    id: 8, title: "Maximum Subarray", difficulty: "Easy",
    description: "Find the contiguous subarray with the largest sum and return the sum.",
    examples: "Input: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function maxSubArray(nums) {\n    \n}',
      python: 'def max_sub_array(nums):\n    pass',
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint maxSubArray(vector<int>& nums) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public int maxSubArray(int[] nums) {\n        return 0;\n    }\n}',
      c: '#include <stdio.h>\n\nint maxSubArray(int* nums, int numsSize) {\n    return 0;\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/).map(Number);\nconsole.log(maxSubArray(input.slice(1)));',
      python: '\nimport sys\ndata = list(map(int, sys.stdin.read().split()))\nprint(max_sub_array(data[1:]))',
      cpp: '\nint main() { int n; std::cin >> n; std::vector<int> nums(n); for(int i=0; i<n; i++) std::cin >> nums[i]; std::cout << maxSubArray(nums); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[] nums = new int[n]; for(int i=0; i<n; i++) nums[i] = sc.nextInt(); System.out.print(new Solution().maxSubArray(nums)); } }',
      c: '\nint main() { int n; scanf("%d", &n); int* nums = malloc(n*sizeof(int)); for(int i=0; i<n; i++) scanf("%d", &nums[i]); printf("%d", maxSubArray(nums, n)); return 0; }'
    },
    testCases: [
      { input: "9 -2 1 -3 4 -1 2 1 -5 4", expected: "6" },
      { input: "1 5", expected: "5" }
    ],
    expectedOutput: '6', solved: false
  },
  {
    id: 9, title: "Valid Anagram", difficulty: "Easy",
    description: "Check if two strings are anagrams. Return true or false.",
    examples: "Input: s = 'anagram', t = 'nagaram'\nOutput: true",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function isAnagram(s, t) {\n    \n}',
      python: 'def is_anagram(s, t):\n    pass',
      cpp: '#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nbool isAnagram(string s, string t) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public boolean isAnagram(String s, String t) {\n        return false;\n    }\n}',
      c: '#include <stdbool.h>\n#include <string.h>\n\nbool isAnagram(char* s, char* t) {\n    return false;\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/);\nconsole.log(isAnagram(input[0], input[1]));',
      python: '\nimport sys\ndata = sys.stdin.read().split()\nprint(str(is_anagram(data[0], data[1])).lower())',
      cpp: '\nint main() { std::string s, t; std::cin >> s >> t; std::cout << (isAnagram(s, t) ? "true" : "false"); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); System.out.print(new Solution().isAnagram(sc.next(), sc.next())); } }',
      c: '\n#include <stdio.h>\nint main() { char s[100], t[100]; scanf("%s %s", s, t); printf("%s", isAnagram(s, t) ? "true" : "false"); return 0; }'
    },
    testCases: [
      { input: "anagram nagaram", expected: "true" },
      { input: "rat car", expected: "false" }
    ],
    expectedOutput: 'true', solved: false
  },
  {
    id: 10, title: "Contains Duplicate", difficulty: "Easy",
    description: "Check if array contains duplicates. Return true or false.",
    examples: "Input: nums = [1,2,3,1]\nOutput: true",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function containsDuplicate(nums) {\n    \n}',
      python: 'def contains_duplicate(nums):\n    pass',
      cpp: '#include <iostream>\n#include <vector>\n#include <set>\nusing namespace std;\n\nbool containsDuplicate(vector<int>& nums) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        return false;\n    }\n}',
      c: '#include <stdbool.h>\n\nbool containsDuplicate(int* nums, int numsSize) {\n    return false;\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/).map(Number);\nconsole.log(containsDuplicate(input.slice(1)));',
      python: '\nimport sys\ndata = list(map(int, sys.stdin.read().split()))\nprint(str(contains_duplicate(data[1:])).lower())',
      cpp: '\nint main() { int n; std::cin >> n; std::vector<int> nums(n); for(int i=0; i<n; i++) std::cin >> nums[i]; std::cout << (containsDuplicate(nums) ? "true" : "false"); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[] nums = new int[n]; for(int i=0; i<n; i++) nums[i] = sc.nextInt(); System.out.print(new Solution().containsDuplicate(nums)); } }',
      c: '\n#include <stdio.h>\nint main() { int n; scanf("%d", &n); int* nums = malloc(n*sizeof(int)); for(int i=0; i<n; i++) scanf("%d", &nums[i]); printf("%s", containsDuplicate(nums, n) ? "true" : "false"); return 0; }'
    },
    testCases: [
      { input: "4 1 2 3 1", expected: "true" },
      { input: "3 1 2 3", expected: "false" }
    ],
    expectedOutput: 'true', solved: false
  },
  {
    id: 11, title: "Missing Number", difficulty: "Easy",
    description: "Find the missing number in range [0, n].",
    examples: "Input: nums = [3,0,1]\nOutput: 2",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function missingNumber(nums) {\n    \n}',
      python: 'def missing_number(nums):\n    pass',
      cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint missingNumber(vector<int>& nums) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public int missingNumber(int[] nums) {\n        return 0;\n    }\n}',
      c: '#include <stdio.h>\n\nint missingNumber(int* nums, int numsSize) {\n    return 0;\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/).map(Number);\nconsole.log(missingNumber(input.slice(1)));',
      python: '\nimport sys\ndata = list(map(int, sys.stdin.read().split()))\nprint(missing_number(data[1:]))',
      cpp: '\nint main() { int n; std::cin >> n; std::vector<int> nums(n); for(int i=0; i<n; i++) std::cin >> nums[i]; std::cout << missingNumber(nums); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[] nums = new int[n]; for(int i=0; i<n; i++) nums[i] = sc.nextInt(); System.out.print(new Solution().missingNumber(nums)); } }',
      c: '\nint main() { int n; scanf("%d", &n); int* nums = malloc(n*sizeof(int)); for(int i=0; i<n; i++) scanf("%d", &nums[i]); printf("%d", missingNumber(nums, n)); return 0; }'
    },
    testCases: [
      { input: "3 3 0 1", expected: "2" },
      { input: "2 0 1", expected: "2" }
    ],
    expectedOutput: '2', solved: false
  },
  {
    id: 12, title: "Move Zeroes", difficulty: "Easy",
    description: "Move all 0's to the end of array while maintaining relative order.",
    examples: "Input: nums = [0,1,0,3,12]\nOutput: [1, 3, 12, 0, 0]",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function moveZeroes(nums) {\n    \n}',
      python: 'def move_zeroes(nums):\n    pass',
      cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid moveZeroes(vector<int>& nums) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public void moveZeroes(int[] nums) {\n        \n    }\n}',
      c: '#include <stdio.h>\n\nvoid moveZeroes(int* nums, int numsSize) {\n    \n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/).map(Number);\nconst nums = input.slice(1);\nmoveZeroes(nums);\nconsole.log("[" + nums.join(", ") + "]");',
      python: '\nimport sys\ndata = list(map(int, sys.stdin.read().split()))\nnums = data[1:]\nmove_zeroes(nums)\nprint("[" + ", ".join(map(str, nums)) + "]")',
      cpp: '\nint main() { int n; std::cin >> n; std::vector<int> nums(n); for(int i=0; i<n; i++) std::cin >> nums[i]; moveZeroes(nums); std::cout << "["; for(int i=0; i<n; i++) std::cout << nums[i] << (i==n-1 ? "" : ", "); std::cout << "]"; return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[] nums = new int[n]; for(int i=0; i<n; i++) nums[i] = sc.nextInt(); new Solution().moveZeroes(nums); System.out.print("["); for(int i=0; i<n; i++) System.out.print(nums[i] + (i==n-1 ? "" : ", ")); System.out.print("]"); } }',
      c: '\nint main() { int n; scanf("%d", &n); int* nums = malloc(n*sizeof(int)); for(int i=0; i<n; i++) scanf("%d", &nums[i]); moveZeroes(nums, n); printf("["); for(int i=0; i<n; i++) printf("%d%s", nums[i], (i==n-1 ? "" : ", ")); printf("]"); return 0; }'
    },
    testCases: [
      { input: "5 0 1 0 3 12", expected: "[1, 3, 12, 0, 0]" }
    ],
    expectedOutput: '[1, 3, 12, 0, 0]', solved: false
  },

  // MEDIUM QUESTIONS (13-24)
  {
    id: 13, title: "Longest Substring Without Repeating", difficulty: "Medium",
    description: "Find the length of the longest substring without repeating characters.",
    examples: "Input: s = 'abcabcbb'\nOutput: 3",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function lengthOfLongestSubstring(s) {\n    \n}',
      python: 'def length_of_longest_substring(s):\n    pass',
      cpp: '#include <iostream>\n#include <string>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\n\nint lengthOfLongestSubstring(string s) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        return 0;\n    }\n}',
      c: '#include <stdio.h>\n#include <string.h>\n\nint lengthOfLongestSubstring(char* s) {\n    return 0;\n}'
    },
    runners: {
      javascript: '\nconst s = require("fs").readFileSync(0).toString().trim();\nconsole.log(lengthOfLongestSubstring(s));',
      python: '\nimport sys\ns = sys.stdin.read().strip()\nprint(length_of_longest_substring(s))',
      cpp: '\nint main() { std::string s; std::cin >> s; std::cout << lengthOfLongestSubstring(s); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); System.out.print(new Solution().lengthOfLongestSubstring(sc.hasNext() ? sc.next() : "")); } }',
      c: '\nint main() { char s[1000]; if (scanf("%s", s) == 1) printf("%d", lengthOfLongestSubstring(s)); else printf("0"); return 0; }'
    },
    testCases: [
      { input: "abcabcbb", expected: "3" },
      { input: "bbbbb", expected: "1" }
    ],
    expectedOutput: '3', solved: false
  },
  {
    id: 14, title: "Container With Most Water", difficulty: "Medium",
    description: "Find the maximum area of water a container can store.",
    examples: "Input: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function maxArea(height) {\n    \n}',
      python: 'def max_area(height):\n    pass',
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint maxArea(vector<int>& height) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public int maxArea(int[] height) {\n        return 0;\n    }\n}',
      c: '#include <stdio.h>\n\nint maxArea(int* height, int heightSize) {\n    return 0;\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/).map(Number);\nconsole.log(maxArea(input.slice(1)));',
      python: '\nimport sys\ndata = list(map(int, sys.stdin.read().split()))\nprint(max_area(data[1:]))',
      cpp: '\nint main() { int n; std::cin >> n; std::vector<int> nums(n); for(int i=0; i<n; i++) std::cin >> nums[i]; std::cout << maxArea(nums); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[] h = new int[n]; for(int i=0; i<n; i++) h[i] = sc.nextInt(); System.out.print(new Solution().maxArea(h)); } }',
      c: '\nint main() { int n; scanf("%d", &n); int* h = malloc(n*sizeof(int)); for(int i=0; i<n; i++) scanf("%d", &h[i]); printf("%d", maxArea(h, n)); return 0; }'
    },
    testCases: [
      { input: "9 1 8 6 2 5 4 8 3 7", expected: "49" }
    ],
    expectedOutput: '49', solved: false
  },
  {
    id: 15, title: "3Sum", difficulty: "Medium",
    description: "Find number of unique triplets that sum to 0.",
    examples: "Input: nums = [-1,0,1,2,-1,-4]\nOutput: 2",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function threeSum(nums) {\n    \n}',
      python: 'def three_sum(nums):\n    pass',
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint threeSum(vector<int>& nums) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public int threeSum(int[] nums) {\n        return 0;\n    }\n}',
      c: '#include <stdio.h>\n\nint threeSum(int* nums, int numsSize) {\n    return 0;\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/).map(Number);\nconsole.log(threeSum(input.slice(1)));',
      python: '\nimport sys\ndata = list(map(int, sys.stdin.read().split()))\nprint(three_sum(data[1:]))',
      cpp: '\nint main() { int n; std::cin >> n; std::vector<int> nums(n); for(int i=0; i<n; i++) std::cin >> nums[i]; std::cout << threeSum(nums); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[] h = new int[n]; for(int i=0; i<n; i++) h[i] = sc.nextInt(); System.out.print(new Solution().threeSum(h)); } }',
      c: '\nint main() { int n; scanf("%d", &n); int* h = malloc(n*sizeof(int)); for(int i=0; i<n; i++) scanf("%d", &h[i]); printf("%d", threeSum(h, n)); return 0; }'
    },
    testCases: [
      { input: "6 -1 0 1 2 -1 -4", expected: "2" }
    ],
    expectedOutput: '2', solved: false
  },
  {
    id: 16, title: "Search in Rotated Sorted Array", difficulty: "Medium",
    description: "Given a rotated sorted array and target, return its index.",
    examples: "Input: nums = [4,5,6,7,0,1,2], target = 0\nOutput: 4",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function search(nums, target) {\n    \n}',
      python: 'def search(nums, target):\n    pass',
      cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint search(vector<int>& nums, int target) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public int search(int[] nums, int target) {\n        return -1;\n    }\n}',
      c: '#include <stdio.h>\n\nint search(int* nums, int numsSize, int target) {\n    return -1;\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/).map(Number);\nconst n = input[0];\nconst nums = input.slice(1, n+1);\nconst t = input[n+1];\nconsole.log(search(nums, t));',
      python: '\nimport sys\ndata = list(map(int, sys.stdin.read().split()))\nn = data[0]\nprint(search(data[1:n+1], data[n+1]))',
      cpp: '\nint main() { int n, t; std::cin >> n; std::vector<int> nums(n); for(int i=0; i<n; i++) std::cin >> nums[i]; std::cin >> t; std::cout << search(nums, t); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[] nums = new int[n]; for(int i=0; i<n; i++) nums[i] = sc.nextInt(); System.out.print(new Solution().search(nums, sc.nextInt())); } }',
      c: '\nint main() { int n, t; scanf("%d", &n); int* nums = malloc(n*sizeof(int)); for(int i=0; i<n; i++) scanf("%d", &nums[i]); scanf("%d", &t); printf("%d", search(nums, n, t)); return 0; }'
    },
    testCases: [
      { input: "7 4 5 6 7 0 1 2 0", expected: "4" }
    ],
    expectedOutput: '4', solved: false
  },
  {
    id: 17, title: "Merge Intervals", difficulty: "Medium",
    description: "Merge overlapping intervals and return the number of resulting intervals.",
    examples: "Input: intervals = [[1,3],[2,6],[8,10],[15,18]]\nOutput: 3",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function merge(intervals) {\n    \n}',
      python: 'def merge(intervals):\n    pass',
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint mergeIntervals(vector<vector<int>>& intervals) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public int merge(int[][] intervals) {\n        return 0;\n    }\n}',
      c: '#include <stdio.h>\n\nint merge(int** intervals, int intervalsSize, int* intervalsColSize) {\n    return 0;\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/).map(Number);\nconst n = input[0];\nconst intervals = [];\nfor(let i=0; i<n; i++) intervals.push([input[1+i*2], input[2+i*2]]);\nconsole.log(merge(intervals));',
      python: '\nimport sys\ndata = list(map(int, sys.stdin.read().split()))\nn = data[0]\nintervals = [data[1+i*2:3+i*2] for i in range(n)]\nprint(merge(intervals))',
      cpp: '\nint main() { int n; std::cin >> n; std::vector<std::vector<int>> ivs(n, std::vector<int>(2)); for(int i=0; i<n; i++) std::cin >> ivs[i][0] >> ivs[i][1]; std::cout << mergeIntervals(ivs); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[][] ivs = new int[n][2]; for(int i=0; i<n; i++) { ivs[i][0] = sc.nextInt(); ivs[i][1] = sc.nextInt(); } System.out.print(new Solution().merge(ivs)); } }',
      c: '\nint main() { int n; scanf("%d", &n); int** ivs = malloc(n*sizeof(int*)); int* cols = malloc(n*sizeof(int)); for(int i=0; i<n; i++) { ivs[i] = malloc(2*sizeof(int)); scanf("%d %d", &ivs[i][0], &ivs[i][1]); cols[i] = 2; } printf("%d", merge(ivs, n, cols)); return 0; }'
    },
    testCases: [
      { input: "4 1 3 2 6 8 10 15 18", expected: "3" }
    ],
    expectedOutput: '3', solved: false
  },
  {
    id: 18, title: "Group Anagrams", difficulty: "Medium",
    description: "Group anagrams together and return the number of groups.",
    examples: "Input: strs = ['eat','tea','tan','ate','nat','bat']\nOutput: 3",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function groupAnagrams(strs) {\n    \n}',
      python: 'def group_anagrams(strs):\n    pass',
      cpp: '#include <iostream>\n#include <vector>\n#include <string>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\n\nint groupAnagrams(vector<string>& strs) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public int groupAnagrams(String[] strs) {\n        return 0;\n    }\n}',
      c: '#include <stdio.h>\n\nint groupAnagrams(char** strs, int strsSize) {\n    return 0;\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/);\nconsole.log(groupAnagrams(input.slice(1)));',
      python: '\nimport sys\ndata = sys.stdin.read().split()\nprint(group_anagrams(data[1:]))',
      cpp: '\nint main() { int n; std::cin >> n; std::vector<std::string> s(n); for(int i=0; i<n; i++) std::cin >> s[i]; std::cout << groupAnagrams(s); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); String[] s = new String[n]; for(int i=0; i<n; i++) s[i] = sc.next(); System.out.print(new Solution().groupAnagrams(s)); } }',
      c: '\nint main() { int n; scanf("%d", &n); char** s = malloc(n*sizeof(char*)); for(int i=0; i<n; i++) { s[i] = malloc(100); scanf("%s", s[i]); } printf("%d", groupAnagrams(s, n)); return 0; }'
    },
    testCases: [
      { input: "6 eat tea tan ate nat bat", expected: "3" }
    ],
    expectedOutput: '3', solved: false
  },
  {
    id: 19, title: "Spiral Matrix", difficulty: "Medium",
    description: "Return all elements of the matrix in spiral order.",
    examples: "Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]\nOutput: 1,2,3,6,9,8,7,4,5",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function spiralOrder(matrix) {\n    \n}',
      python: 'def spiral_order(matrix):\n    pass',
      cpp: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nstring spiralOrder(vector<vector<int>>& matrix) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public String spiralOrder(int[][] matrix) {\n        return "";\n    }\n}',
      c: '#include <stdio.h>\n\nchar* spiralOrder(int** matrix, int matrixSize, int* matrixColSize) {\n    return "";\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/).map(Number);\nconst r = input[0], c = input[1];\nconst mat = [];\nfor(let i=0; i<r; i++) mat.push(input.slice(2+i*c, 2+(i+1)*c));\nconsole.log(spiralOrder(mat));',
      python: '\nimport sys\ndata = list(map(int, sys.stdin.read().split()))\nr, c = data[0], data[1]\nmat = [data[2+i*c : 2+(i+1)*c] for i in range(r)]\nprint(spiral_order(mat))',
      cpp: '\nint main() { int r, c; std::cin >> r >> c; std::vector<std::vector<int>> m(r, std::vector<int>(c)); for(int i=0; i<r; i++) for(int j=0; j<c; j++) std::cin >> m[i][j]; std::cout << spiralOrder(m); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int r = sc.nextInt(); int c = sc.nextInt(); int[][] m = new int[r][c]; for(int i=0; i<r; i++) for(int j=0; j<c; j++) m[i][j] = sc.nextInt(); System.out.print(new Solution().spiralOrder(m)); } }',
      c: '\nint main() { int r, c; scanf("%d %d", &r, &c); int** m = malloc(r*sizeof(int*)); int* cols = malloc(r*sizeof(int)); for(int i=0; i<r; i++) { m[i] = malloc(c*sizeof(int)); for(int j=0; j<c; j++) scanf("%d", &m[i][j]); cols[i] = c; } printf("%s", spiralOrder(m, r, cols)); return 0; }'
    },
    testCases: [
      { input: "3 3 1 2 3 4 5 6 7 8 9", expected: "1,2,3,6,9,8,7,4,5" }
    ],
    expectedOutput: '1,2,3,6,9,8,7,4,5', solved: false
  },
  {
    id: 20, title: "Word Break", difficulty: "Medium",
    description: "Check if string can be segmented into a space-separated sequence of dictionary words.",
    examples: "Input: s = 'leetcode', wordDict = ['leet', 'code']\nOutput: true",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function wordBreak(s, wordDict) {\n    \n}',
      python: 'def word_break(s, word_dict):\n    pass',
      cpp: '#include <iostream>\n#include <vector>\n#include <string>\n#include <unordered_set>\nusing namespace std;\n\nbool wordBreak(string s, vector<string>& wordDict) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public boolean wordBreak(String s, List<String> wordDict) {\n        return false;\n    }\n}',
      c: '#include <stdbool.h>\n\nbool wordBreak(char* s, char** wordDict, int wordDictSize) {\n    return false;\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/);\nconsole.log(wordBreak(input[0], input.slice(2)));',
      python: '\nimport sys\ndata = sys.stdin.read().split()\nprint(str(word_break(data[0], data[2:])).lower())',
      cpp: '\nint main() { std::string s; int n; std::cin >> s >> n; std::vector<std::string> d(n); for(int i=0; i<n; i++) std::cin >> d[i]; std::cout << (wordBreak(s, d) ? "true" : "false"); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String s = sc.next(); int n = sc.nextInt(); List<String> d = new ArrayList<>(); for(int i=0; i<n; i++) d.add(sc.next()); System.out.print(new Solution().wordBreak(s, d)); } }',
      c: '\nint main() { char s[100]; int n; scanf("%s %d", s, &n); char** d = malloc(n*sizeof(char*)); for(int i=0; i<n; i++) { d[i] = malloc(100); scanf("%s", d[i]); } printf("%s", wordBreak(s, d, n) ? "true" : "false"); return 0; }'
    },
    testCases: [
      { input: "leetcode 2 leet code", expected: "true" }
    ],
    expectedOutput: 'true', solved: false
  },
  {
    id: 21, title: "Number of Islands", difficulty: "Medium",
    description: "Given a 2D grid, return the number of islands.",
    examples: "Input: grid = [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]\nOutput: 3",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function numIslands(grid) {\n    \n}',
      python: 'def num_islands(grid):\n    pass',
      cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint numIslands(vector<vector<char>>& grid) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public int numIslands(char[][] grid) {\n        return 0;\n    }\n}',
      c: '#include <stdio.h>\n\nint numIslands(char** grid, int gridSize, int* gridColSize) {\n    return 0;\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/);\nconst r = parseInt(input[0]), c = parseInt(input[1]);\nconst g = [];\nfor(let i=0; i<r; i++) g.push(input[2+i].split(""));\nconsole.log(numIslands(g));',
      python: '\nimport sys\ndata = sys.stdin.read().split()\nr, c = int(data[0]), int(data[1])\ng = [list(data[2+i]) for i in range(r)]\nprint(num_islands(g))',
      cpp: '\nint main() { int r, c; std::cin >> r >> c; std::vector<std::vector<char>> g(r, std::vector<char>(c)); for(int i=0; i<r; i++) for(int j=0; j<c; j++) std::cin >> g[i][j]; std::cout << numIslands(g); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int r = sc.nextInt(); int c = sc.nextInt(); char[][] g = new char[r][c]; for(int i=0; i<r; i++) { String s = sc.next(); for(int j=0; j<c; j++) g[i][j] = s.charAt(j); } System.out.print(new Solution().numIslands(g)); } }',
      c: '\nint main() { int r, c; scanf("%d %d", &r, &c); char** g = malloc(r*sizeof(char*)); int* cols = malloc(r*sizeof(int)); for(int i=0; i<r; i++) { g[i] = malloc(c+1); scanf("%s", g[i]); cols[i] = c; } printf("%d", numIslands(g, r, cols)); return 0; }'
    },
    testCases: [
      { input: "4 5 11000 11000 00100 00011", expected: "3" }
    ],
    expectedOutput: '3', solved: false
  },
  {
    id: 22, title: "Coin Change", difficulty: "Medium",
    description: "Return the fewest number of coins that you need to make up that amount.",
    examples: "Input: coins = [1,2,5], amount = 11\nOutput: 3",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function coinChange(coins, amount) {\n    \n}',
      python: 'def coin_change(coins, amount):\n    pass',
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint coinChange(vector<int>& coins, int amount) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public int coinChange(int[] coins, int amount) {\n        return -1;\n    }\n}',
      c: '#include <stdio.h>\n\nint coinChange(int* coins, int coinsSize, int amount) {\n    return -1;\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/).map(Number);\nconst n = input[0];\nconst coins = input.slice(1, n+1);\nconst amt = input[n+1];\nconsole.log(coinChange(coins, amt));',
      python: '\nimport sys\ndata = list(map(int, sys.stdin.read().split()))\nn = data[0]\nprint(coin_change(data[1:n+1], data[n+1]))',
      cpp: '\nint main() { int n, a; std::cin >> n; std::vector<int> c(n); for(int i=0; i<n; i++) std::cin >> c[i]; std::cin >> a; std::cout << coinChange(c, a); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[] c = new int[n]; for(int i=0; i<n; i++) c[i] = sc.nextInt(); System.out.print(new Solution().coinChange(c, sc.nextInt())); } }',
      c: '\nint main() { int n, a; scanf("%d", &n); int* c = malloc(n*sizeof(int)); for(int i=0; i<n; i++) scanf("%d", &c[i]); scanf("%d", &a); printf("%d", coinChange(c, n, a)); return 0; }'
    },
    testCases: [
      { input: "3 1 2 5 11", expected: "3" }
    ],
    expectedOutput: '3', solved: false
  },
  {
    id: 23, title: "Longest Palindromic Substring", difficulty: "Medium",
    description: "Return the longest palindromic substring in s.",
    examples: "Input: s = 'babad'\nOutput: bab",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function longestPalindrome(s) {\n    \n}',
      python: 'def longest_palindrome(s):\n    pass',
      cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nstring longestPalindrome(string s) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public String longestPalindrome(String s) {\n        return "";\n    }\n}',
      c: '#include <stdio.h>\n#include <string.h>\n\nchar* longestPalindrome(char* s) {\n    return "";\n}'
    },
    runners: {
      javascript: '\nconst s = require("fs").readFileSync(0).toString().trim();\nconsole.log(longestPalindrome(s));',
      python: '\nimport sys\ns = sys.stdin.read().strip()\nprint(longest_palindrome(s))',
      cpp: '\nint main() { std::string s; std::cin >> s; std::cout << longestPalindrome(s); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); System.out.print(new Solution().longestPalindrome(sc.hasNext() ? sc.next() : "")); } }',
      c: '\nint main() { char s[1000]; if (scanf("%s", s) == 1) printf("%s", longestPalindrome(s)); return 0; }'
    },
    testCases: [
      { input: "babad", expected: "bab" }
    ],
    expectedOutput: 'bab', solved: false
  },
  {
    id: 24, title: "Set Matrix Zeroes", difficulty: "Medium",
    description: "If an element is 0, set its entire row and column to 0. Return the number of 0s.",
    examples: "Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]\nOutput: 5",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function setZeroes(matrix) {\n    \n}',
      python: 'def set_zeroes(matrix):\n    pass',
      cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint setZeroes(vector<vector<int>>& matrix) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public int setZeroes(int[][] matrix) {\n        return 0;\n    }\n}',
      c: '#include <stdio.h>\n\nint setZeroes(int** matrix, int matrixSize, int* matrixColSize) {\n    return 0;\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/).map(Number);\nconst r = input[0], c = input[1];\nconst mat = [];\nfor(let i=0; i<r; i++) mat.push(input.slice(2+i*c, 2+(i+1)*c));\nconsole.log(setZeroes(mat));',
      python: '\nimport sys\ndata = list(map(int, sys.stdin.read().split()))\nr, c = data[0], data[1]\nmat = [data[2+i*c : 2+(i+1)*c] for i in range(r)]\nprint(set_zeroes(mat))',
      cpp: '\nint main() { int r, c; std::cin >> r >> c; std::vector<std::vector<int>> m(r, std::vector<int>(c)); for(int i=0; i<r; i++) for(int j=0; j<c; j++) std::cin >> m[i][j]; std::cout << setZeroes(m); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int r = sc.nextInt(); int c = sc.nextInt(); int[][] m = new int[r][c]; for(int i=0; i<r; i++) for(int j=0; j<c; j++) m[i][j] = sc.nextInt(); System.out.print(new Solution().setZeroes(m)); } }',
      c: '\nint main() { int r, c; scanf("%d %d", &r, &c); int** m = malloc(r*sizeof(int*)); int* cols = malloc(r*sizeof(int)); for(int i=0; i<r; i++) { m[i] = malloc(c*sizeof(int)); for(int j=0; j<c; j++) scanf("%d", &m[i][j]); cols[i] = c; } printf("%d", setZeroes(m, r, cols)); return 0; }'
    },
    testCases: [
      { input: "3 3 1 1 1 1 0 1 1 1 1", expected: "5" }
    ],
    expectedOutput: '5', solved: false
  },
  {
    id: 25, title: "Median of Two Sorted Arrays", difficulty: "Hard",
    description: "Return the median of the two sorted arrays.",
    examples: "Input: nums1 = [1,3], nums2 = [2]\nOutput: 2.0",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function findMedianSortedArrays(nums1, nums2) {\n    \n}',
      python: 'def find_median_sorted_arrays(nums1, nums2):\n    pass',
      cpp: '#include <iostream>\n#include <vector>\n#include <iomanip>\nusing namespace std;\n\ndouble findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        return 0.0;\n    }\n}',
      c: '#include <stdio.h>\n\ndouble findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size) {\n    return 0.0;\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/).map(Number);\nconst n1 = input[0];\nconst nums1 = input.slice(1, n1+1);\nconst n2 = input[n1+1];\nconst nums2 = input.slice(n1+2, n1+2+n2);\nconsole.log(findMedianSortedArrays(nums1, nums2).toFixed(1));',
      python: '\nimport sys\ndata = list(map(int, sys.stdin.read().split()))\nn1 = data[0]\nnums1 = data[1:n1+1]\nn2 = data[n1+1]\nnums2 = data[n1+2:]\nprint("{:.1f}".format(find_median_sorted_arrays(nums1, nums2)))',
      cpp: '\nint main() { int n1, n2; std::cin >> n1; std::vector<int> v1(n1); for(int i=0; i<n1; i++) std::cin >> v1[i]; std::cin >> n2; std::vector<int> v2(n2); for(int i=0; i<n2; i++) std::cin >> v2[i]; std::cout << std::fixed << std::setprecision(1) << findMedianSortedArrays(v1, v2); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n1 = sc.nextInt(); int[] v1 = new int[n1]; for(int i=0; i<n1; i++) v1[i] = sc.nextInt(); int n2 = sc.nextInt(); int[] v2 = new int[n2]; for(int i=0; i<n2; i++) v2[i] = sc.nextInt(); System.out.print(String.format("%.1f", new Solution().findMedianSortedArrays(v1, v2))); } }',
      c: '\nint main() { int n1, n2; scanf("%d", &n1); int* v1 = malloc(n1*sizeof(int)); for(int i=0; i<n1; i++) scanf("%d", &v1[i]); scanf("%d", &n2); int* v2 = malloc(n2*sizeof(int)); for(int i=0; i<n2; i++) scanf("%d", &v2[i]); printf("%.1f", findMedianSortedArrays(v1, n1, v2, n2)); return 0; }'
    },
    testCases: [
      { input: "2 1 3 1 2", expected: "2.0" }
    ],
    expectedOutput: '2.0', solved: false
  },
  {
    id: 26, title: "Trapping Rain Water", difficulty: "Hard",
    description: "Return how much water it can trap after raining.",
    examples: "Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function trap(height) {\n    \n}',
      python: 'def trap(height):\n    pass',
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint trap(vector<int>& height) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public int trap(int[] height) {\n        return 0;\n    }\n}',
      c: '#include <stdio.h>\n\nint trap(int* height, int heightSize) {\n    return 0;\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/).map(Number);\nconsole.log(trap(input.slice(1)));',
      python: '\nimport sys\ndata = list(map(int, sys.stdin.read().split()))\nprint(trap(data[1:]))',
      cpp: '\nint main() { int n; std::cin >> n; std::vector<int> h(n); for(int i=0; i<n; i++) std::cin >> h[i]; std::cout << trap(h); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[] h = new int[n]; for(int i=0; i<n; i++) h[i] = sc.nextInt(); System.out.print(new Solution().trap(h)); } }',
      c: '\nint main() { int n; scanf("%d", &n); int* h = malloc(n*sizeof(int)); for(int i=0; i<n; i++) scanf("%d", &h[i]); printf("%d", trap(h, n)); return 0; }'
    },
    testCases: [
      { input: "12 0 1 0 2 1 0 1 3 2 1 2 1", expected: "6" }
    ],
    expectedOutput: '6', solved: false
  },
  {
    id: 27, title: "Merge k Sorted Lists", difficulty: "Hard",
    description: "Merge k sorted arrays into one sorted array.",
    examples: "Input: lists = [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function mergeKLists(lists) {\n    \n}',
      python: 'def merge_k_lists(lists):\n    pass',
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <string>\nusing namespace std;\n\nstring mergeKLists(vector<vector<int>>& lists) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public String mergeKLists(int[][] lists) {\n        return "";\n    }\n}',
      c: '#include <stdio.h>\n\nchar* mergeKLists(int** lists, int listsSize, int* listsColSize) {\n    return "";\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/).map(Number);\nconst k = input[0];\nconst lists = [];\nlet idx = 1;\nfor(let i=0; i<k; i++) {\n  const n = input[idx++];\n  lists.push(input.slice(idx, idx+n));\n  idx += n;\n}\nconsole.log(mergeKLists(lists));',
      python: '\nimport sys\ndata = list(map(int, sys.stdin.read().split()))\nk = data[0]\nlists = []\nidx = 1\nfor i in range(k):\n  n = data[idx]\n  lists.append(data[idx+1 : idx+1+n])\n  idx += 1 + n\nprint(merge_k_lists(lists))',
      cpp: '\nint main() { int k; std::cin >> k; std::vector<std::vector<int>> l(k); for(int i=0; i<k; i++) { int n; std::cin >> n; l[i].resize(n); for(int j=0; j<n; j++) std::cin >> l[i][j]; } std::cout << mergeKLists(l); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int k = sc.nextInt(); int[][] l = new int[k][]; for(int i=0; i<k; i++) { int n = sc.nextInt(); l[i] = new int[n]; for(int j=0; j<n; j++) l[i][j] = sc.nextInt(); } System.out.print(new Solution().mergeKLists(l)); } }',
      c: '\nint main() { int k; scanf("%d", &k); int** l = malloc(k*sizeof(int*)); int* cols = malloc(k*sizeof(int)); for(int i=0; i<k; i++) { int n; scanf("%d", &n); l[i] = malloc(n*sizeof(int)); cols[i] = n; for(int j=0; j<n; j++) scanf("%d", &l[i][j]); } printf("%s", mergeKLists(l, k, cols)); return 0; }'
    },
    testCases: [
      { input: "3 3 1 4 5 3 1 3 4 2 2 6", expected: "[1,1,2,3,4,4,5,6]" }
    ],
    expectedOutput: '[1,1,2,3,4,4,5,6]', solved: false
  },
  {
    id: 28, title: "Minimum Window Substring", difficulty: "Hard",
    description: "Return the minimum window substring of s that includes all characters of t.",
    examples: "Input: s = 'ADOBECODEBANC', t = 'ABC'\nOutput: BANC",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function minWindow(s, t) {\n    \n}',
      python: 'def min_window(s, t):\n    pass',
      cpp: '#include <iostream>\n#include <string>\n#include <unordered_map>\nusing namespace std;\n\nstring minWindow(string s, string t) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public String minWindow(String s, String t) {\n        return "";\n    }\n}',
      c: '#include <stdio.h>\n#include <string.h>\n\nchar* minWindow(char* s, char* t) {\n    return "";\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/);\nconsole.log(minWindow(input[0], input[1]));',
      python: '\nimport sys\ndata = sys.stdin.read().split()\nprint(min_window(data[0], data[1]))',
      cpp: '\nint main() { std::string s, t; std::cin >> s >> t; std::cout << minWindow(s, t); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); System.out.print(new Solution().minWindow(sc.next(), sc.next())); } }',
      c: '\nint main() { char s[100], t[100]; scanf("%s %s", s, t); printf("%s", minWindow(s, t)); return 0; }'
    },
    testCases: [
      { input: "ADOBECODEBANC ABC", expected: "BANC" }
    ],
    expectedOutput: 'BANC', solved: false
  },
  {
    id: 29, title: "N-Queens", difficulty: "Hard",
    description: "Return the number of distinct solutions to the n-queens puzzle.",
    examples: "Input: n = 4\nOutput: 2",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function solveNQueens(n) {\n    \n}',
      python: 'def solve_n_queens(n):\n    pass',
      cpp: '#include <iostream>\nusing namespace std;\n\nint solveNQueens(int n) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public int solveNQueens(int n) {\n        return 0;\n    }\n}',
      c: '#include <stdio.h>\n\nint solveNQueens(int n) {\n    return 0;\n}'
    },
    runners: {
      javascript: '\nconst n = parseInt(require("fs").readFileSync(0).toString().trim());\nconsole.log(solveNQueens(n));',
      python: '\nimport sys\nn = int(sys.stdin.read().strip())\nprint(solve_n_queens(n))',
      cpp: '\nint main() { int n; std::cin >> n; std::cout << solveNQueens(n); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); System.out.print(new Solution().solveNQueens(sc.nextInt())); } }',
      c: '\nint main() { int n; scanf("%d", &n); printf("%d", solveNQueens(n)); return 0; }'
    },
    testCases: [
      { input: "4", expected: "2" },
      { input: "8", expected: "92" }
    ],
    expectedOutput: '2', solved: false
  },
  {
    id: 30, title: "Edit Distance", difficulty: "Hard",
    description: "Return the minimum number of operations to convert word1 to word2.",
    examples: "Input: word1 = 'horse', word2 = 'ros'\nOutput: 3",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function minDistance(word1, word2) {\n    \n}',
      python: 'def min_distance(word1, word2):\n    pass',
      cpp: '#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint minDistance(string word1, string word2) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public int minDistance(String word1, String word2) {\n        return 0;\n    }\n}',
      c: '#include <stdio.h>\n#include <string.h>\n\nint minDistance(char* word1, char* word2) {\n    return 0;\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/);\nconsole.log(minDistance(input[0], input[1]));',
      python: '\nimport sys\ndata = sys.stdin.read().split()\nprint(min_distance(data[0], data[1]))',
      cpp: '\nint main() { std::string s1, s2; std::cin >> s1 >> s2; std::cout << minDistance(s1, s2); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); System.out.print(new Solution().minDistance(sc.next(), sc.next())); } }',
      c: '\nint main() { char s1[100], s2[100]; scanf("%s %s", s1, s2); printf("%d", minDistance(s1, s2)); return 0; }'
    },
    testCases: [
      { input: "horse ros", expected: "3" }
    ],
    expectedOutput: '3', solved: false
  },
  {
    id: 31, title: "Largest Rectangle in Histogram", difficulty: "Hard",
    description: "Return the area of the largest rectangle in the histogram.",
    examples: "Input: heights = [2,1,5,6,2,3]\nOutput: 10",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function largestRectangleArea(heights) {\n    \n}',
      python: 'def largest_rectangle_area(heights):\n    pass',
      cpp: '#include <iostream>\n#include <vector>\n#include <stack>\n#include <algorithm>\nusing namespace std;\n\nint largestRectangleArea(vector<int>& heights) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public int largestRectangleArea(int[] heights) {\n        return 0;\n    }\n}',
      c: '#include <stdio.h>\n\nint largestRectangleArea(int* heights, int heightsSize) {\n    return 0;\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/).map(Number);\nconsole.log(largestRectangleArea(input.slice(1)));',
      python: '\nimport sys\ndata = list(map(int, sys.stdin.read().split()))\nprint(largest_rectangle_area(data[1:]))',
      cpp: '\nint main() { int n; std::cin >> n; std::vector<int> h(n); for(int i=0; i<n; i++) std::cin >> h[i]; std::cout << largestRectangleArea(h); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[] h = new int[n]; for(int i=0; i<n; i++) h[i] = sc.nextInt(); System.out.print(new Solution().largestRectangleArea(h)); } }',
      c: '\nint main() { int n; scanf("%d", &n); int* h = malloc(n*sizeof(int)); for(int i=0; i<n; i++) scanf("%d", &h[i]); printf("%d", largestRectangleArea(h, n)); return 0; }'
    },
    testCases: [
      { input: "6 2 1 5 6 2 3", expected: "10" }
    ],
    expectedOutput: '10', solved: false
  },
  {
    id: 32, title: "Sliding Window Maximum", difficulty: "Hard",
    description: "Return the max of each sliding window.",
    examples: "Input: nums = [1,3,-1,-3,5,3,6,7], k = 3\nOutput: 3,3,5,5,6,7",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function maxSlidingWindow(nums, k) {\n    \n}',
      python: 'def max_sliding_window(nums, k):\n    pass',
      cpp: '#include <iostream>\n#include <vector>\n#include <deque>\n#include <string>\nusing namespace std;\n\nstring maxSlidingWindow(vector<int>& nums, int k) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public String maxSlidingWindow(int[] nums, int k) {\n        return "";\n    }\n}',
      c: '#include <stdio.h>\n\nchar* maxSlidingWindow(int* nums, int numsSize, int k) {\n    return "";\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/).map(Number);\nconst n = input[0];\nconst nums = input.slice(1, n+1);\nconst k = input[n+1];\nconsole.log(maxSlidingWindow(nums, k));',
      python: '\nimport sys\ndata = list(map(int, sys.stdin.read().split()))\nn = data[0]\nprint(max_sliding_window(data[1:n+1], data[n+1]))',
      cpp: '\nint main() { int n, k; std::cin >> n; std::vector<int> v(n); for(int i=0; i<n; i++) std::cin >> v[i]; std::cin >> k; std::cout << maxSlidingWindow(v, k); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[] v = new int[n]; for(int i=0; i<n; i++) v[i] = sc.nextInt(); System.out.print(new Solution().maxSlidingWindow(v, sc.nextInt())); } }',
      c: '\nint main() { int n, k; scanf("%d", &n); int* v = malloc(n*sizeof(int)); for(int i=0; i<n; i++) scanf("%d", &v[i]); scanf("%d", &k); printf("%s", maxSlidingWindow(v, n, k)); return 0; }'
    },
    testCases: [
      { input: "8 1 3 -1 -3 5 3 6 7 3", expected: "3,3,5,5,6,7" }
    ],
    expectedOutput: '3,3,5,5,6,7', solved: false
  },
  {
    id: 33, title: "Word Ladder", difficulty: "Hard",
    description: "Return the length of the shortest transformation sequence.",
    examples: "Input: beginWord = 'hit', endWord = 'cog', wordList = ['hot','dot','dog','lot','log','cog']\nOutput: 5",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function ladderLength(beginWord, endWord, wordList) {\n    \n}',
      python: 'def ladder_length(begin_word, end_word, word_list):\n    pass',
      cpp: '#include <iostream>\n#include <vector>\n#include <string>\n#include <unordered_set>\n#include <queue>\nusing namespace std;\n\nint ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n        return 0;\n    }\n}',
      c: '#include <stdio.h>\n#include <string.h>\n\nint ladderLength(char* beginWord, char* endWord, char** wordList, int wordListSize) {\n    return 0;\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/);\nconsole.log(ladderLength(input[0], input[1], input.slice(3)));',
      python: '\nimport sys\ndata = sys.stdin.read().split()\nprint(ladder_length(data[0], data[1], data[3:]))',
      cpp: '\nint main() { std::string b, e; int n; std::cin >> b >> e >> n; std::vector<std::string> l(n); for(int i=0; i<n; i++) std::cin >> l[i]; std::cout << ladderLength(b, e, l); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String b = sc.next(), e = sc.next(); int n = sc.nextInt(); List<String> l = new ArrayList<>(); for(int i=0; i<n; i++) l.add(sc.next()); System.out.print(new Solution().ladderLength(b, e, l)); } }',
      c: '\nint main() { char b[20], e[20]; int n; scanf("%s %s %d", b, e, &n); char** l = malloc(n*sizeof(char*)); for(int i=0; i<n; i++) { l[i] = malloc(20); scanf("%s", l[i]); } printf("%d", ladderLength(b, e, l, n)); return 0; }'
    },
    testCases: [
      { input: "hit cog 6 hot dot dog lot log cog", expected: "5" }
    ],
    expectedOutput: '5', solved: false
  },
  {
    id: 34, title: "Reverse Nodes in k-Group", difficulty: "Hard",
    description: "Reverse array in groups of size k.",
    examples: "Input: head = [1,2,3,4,5], k = 2\nOutput: [2,1,4,3,5]",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function reverseKGroup(arr, k) {\n    \n}',
      python: 'def reverse_k_group(arr, k):\n    pass',
      cpp: '#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nstring reverseKGroup(vector<int>& arr, int k) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public String reverseKGroup(int[] arr, int k) {\n        return "";\n    }\n}',
      c: '#include <stdio.h>\n\nchar* reverseKGroup(int* arr, int arrSize, int k) {\n    return "";\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/).map(Number);\nconst n = input[0];\nconst arr = input.slice(1, n+1);\nconst k = input[n+1];\nconsole.log(reverseKGroup(arr, k));',
      python: '\nimport sys\ndata = list(map(int, sys.stdin.read().split()))\nn = data[0]\nprint(reverse_k_group(data[1:n+1], data[n+1]))',
      cpp: '\nint main() { int n, k; std::cin >> n; std::vector<int> v(n); for(int i=0; i<n; i++) std::cin >> v[i]; std::cin >> k; std::cout << reverseKGroup(v, k); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[] v = new int[n]; for(int i=0; i<n; i++) v[i] = sc.nextInt(); System.out.print(new Solution().reverseKGroup(v, sc.nextInt())); } }',
      c: '\nint main() { int n, k; scanf("%d", &n); int* v = malloc(n*sizeof(int)); for(int i=0; i<n; i++) scanf("%d", &v[i]); scanf("%d", &k); printf("%s", reverseKGroup(v, n, k)); return 0; }'
    },
    testCases: [
      { input: "5 1 2 3 4 5 2", expected: "[2,1,4,3,5]" }
    ],
    expectedOutput: '[2,1,4,3,5]', solved: false
  },
  {
    id: 35, title: "Regular Expression Matching", difficulty: "Hard",
    description: "Implement regular expression matching with support for '.' and '*'.",
    examples: "Input: s = 'aa', p = 'a*'\nOutput: true",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function isMatch(s, p) {\n    \n}',
      python: 'def is_match(s, p):\n    pass',
      cpp: '#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nbool isMatch(string s, string p) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public boolean isMatch(String s, String p) {\n        return false;\n    }\n}',
      c: '#include <stdbool.h>\n\nbool isMatch(char* s, char* p) {\n    return false;\n}'
    },
    runners: {
      javascript: '\nconst input = require("fs").readFileSync(0).toString().split(/\\s+/);\nconsole.log(isMatch(input[0], input[1]));',
      python: '\nimport sys\ndata = sys.stdin.read().split()\nprint(str(is_match(data[0], data[1])).lower())',
      cpp: '\nint main() { std::string s, p; std::cin >> s >> p; std::cout << (isMatch(s, p) ? "true" : "false"); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); System.out.print(new Solution().isMatch(sc.next(), sc.next())); } }',
      c: '\nint main() { char s[100], p[100]; scanf("%s %s", s, p); printf("%s", isMatch(s, p) ? "true" : "false"); return 0; }'
    },
    testCases: [
      { input: "aa a*", expected: "true" }
    ],
    expectedOutput: 'true', solved: false
  },
  {
    id: 36, title: "Longest Valid Parentheses", difficulty: "Hard",
    description: "Find the length of the longest valid parentheses substring.",
    examples: "Input: s = ')()())'\nOutput: 4",
    language: "javascript",
    leetcodeStyle: true,
    templates: {
      javascript: 'function longestValidParentheses(s) {\n    \n}',
      python: 'def longest_valid_parentheses(s):\n    pass',
      cpp: '#include <iostream>\n#include <string>\n#include <stack>\n#include <algorithm>\nusing namespace std;\n\nint longestValidParentheses(string s) {\n    \n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public int longestValidParentheses(String s) {\n        return 0;\n    }\n}',
      c: '#include <stdio.h>\n#include <string.h>\n\nint longestValidParentheses(char* s) {\n    return 0;\n}'
    },
    runners: {
      javascript: '\nconst s = require("fs").readFileSync(0).toString().trim();\nconsole.log(longestValidParentheses(s));',
      python: '\nimport sys\ns = sys.stdin.read().strip()\nprint(longest_valid_parentheses(s))',
      cpp: '\nint main() { std::string s; std::cin >> s; std::cout << longestValidParentheses(s); return 0; }',
      java: '\nimport java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); System.out.print(new Solution().longestValidParentheses(sc.hasNext() ? sc.next() : "")); } }',
      c: '\nint main() { char s[1000]; if (scanf("%s", s) == 1) printf("%d", longestValidParentheses(s)); else printf("0"); return 0; }'
    },
    testCases: [
      { input: ")()())", expected: "4" }
    ],
    expectedOutput: '4', solved: false
  }
];
