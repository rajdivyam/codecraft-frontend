import React, { useState } from 'react';
import { Play, Check, Terminal, Code2, Menu, FileText, Keyboard } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../utils/apiConfig';
import Editor from '@monaco-editor/react';
import { useTheme } from '../context/ThemeContext';
import { codingQuestions } from '../data/machineCodingQuestions';

const MachineCode = () => {
  const { isDarkMode } = useTheme();
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('machineCode_language') || 'javascript';
  });
  const [code, setCode] = useState(() => {
    const saved = localStorage.getItem('machineCode_code');
    return saved !== null ? saved : 'function main() {\n    console.log("Hello, World!");\n}\n\nmain();';
  });
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [stdinInput, setStdinInput] = useState(() => {
    return localStorage.getItem('machineCode_stdinInput') || '';
  });
  const [showInput, setShowInput] = useState(true);
  const [showQuestions, setShowQuestions] = useState(() => {
    const saved = localStorage.getItem('machineCode_showQuestions');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [selectedQuestion, setSelectedQuestion] = useState(() => {
    const saved = localStorage.getItem('machineCode_selectedQuestion');
    return saved ? JSON.parse(saved) : null;
  });

  React.useEffect(() => {
    localStorage.setItem('machineCode_language', language);
  }, [language]);

  React.useEffect(() => {
    localStorage.setItem('machineCode_code', code);
  }, [code]);

  React.useEffect(() => {
    if (selectedQuestion) {
      localStorage.setItem('machineCode_selectedQuestion', JSON.stringify(selectedQuestion));
    } else {
      localStorage.removeItem('machineCode_selectedQuestion');
    }
  }, [selectedQuestion]);

  React.useEffect(() => {
    localStorage.setItem('machineCode_stdinInput', stdinInput);
  }, [stdinInput]);

  const defaultTemplates = {
    c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
    java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    javascript: 'function main() {\n    console.log("Hello, World!");\n}\n\nmain();',
    python: 'def main():\n    print("Hello, World!")\n\nif __name__ == "__main__":\n    main()'
  };

  const [questions, setQuestions] = useState(codingQuestions);
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const filteredQuestions = questions.filter(q => 
    difficultyFilter === 'All' ? true : q.difficulty === difficultyFilter
  );

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30';
      case 'Medium': return 'text-amber-600 bg-amber-100 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30';
      case 'Hard': return 'text-red-600 bg-red-100 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-500/20 dark:text-gray-400 border-gray-200 dark:border-gray-500/30';
    }
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    const question = questions.find(q => q.id === selectedQuestion);
    if (question && question.leetcodeStyle && question.templates[newLang]) {
      setCode(question.templates[newLang]);
    } else {
      setCode(defaultTemplates[newLang] || '');
    }
    setOutput('');
    setError('');
  };

  const runCode = async (isSubmit = false) => {
    setIsRunning(true);
    setOutput('');
    setError('');
    
    const question = selectedQuestion ? questions.find(q => q.id === selectedQuestion) : null;
    
    try {
      if (isSubmit && question && question.leetcodeStyle && question.testCases) {
        let allPassed = true;
        let testResults = [];
        
        for (let i = 0; i < question.testCases.length; i++) {
          const tc = question.testCases[i];
          const mergedCode = code + (question.runners[language] || '');
          const response = await axios.post(`${API_BASE_URL}/execute`, { 
            language, 
            code: mergedCode, 
            input: tc.input 
          });
          
          const resultOutput = (response.data.output || '').trim();
          const expected = tc.expected.trim();
          
          if (resultOutput === expected) {
            testResults.push(`✅ Test Case ${i + 1}: Passed`);
          } else {
            testResults.push(`❌ Test Case ${i + 1}: Failed\n   Input: ${tc.input}\n   Expected: ${expected}\n   Got: ${resultOutput}`);
            allPassed = false;
          }
        }
        
        setOutput(testResults.join('\n\n'));
        if (allPassed) markSolved(selectedQuestion);
        
      } else {
        // Standard Run
        let finalCode = code;
        if (question && question.leetcodeStyle && question.runners[language]) {
          finalCode = code + question.runners[language];
        }
        
        const response = await axios.post(`${API_BASE_URL}/execute`, { 
          language, 
          code: finalCode, 
          input: stdinInput 
        });
        
        const resultOutput = response.data.output || '';
        const resultError = response.data.error || '';
        
        if (resultError) {
          setError(resultError);
        } else {
          setOutput(resultOutput || 'Program executed with no explicit output.');
          if (question && !question.solved && !question.leetcodeStyle) {
            const cleanOutput = resultOutput.trim().replace(/\r\n/g, '\n');
            const cleanExpected = question.expectedOutput.trim().replace(/\r\n/g, '\n');
            if (cleanOutput === cleanExpected || cleanOutput.includes(cleanExpected)) {
              markSolved(selectedQuestion);
            }
          }
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || `Runtime Error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const markSolved = (id) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, solved: true } : q));
  };

  const clearOutput = () => { setOutput(''); setError(''); };
  const toggleQuestions = () => {
    const newVal = !showQuestions;
    setShowQuestions(newVal);
    localStorage.setItem('machineCode_showQuestions', JSON.stringify(newVal));
  };

  const selectQuestion = (id) => {
    const question = questions.find(q => q.id === id);
    if (question) {
      setSelectedQuestion(id);
      setLanguage(question.language);
      if (question.leetcodeStyle && question.templates[question.language]) {
        setCode(question.templates[question.language]);
      } else {
        setCode(question.template);
      }
      setStdinInput(question.sampleInput || (question.testCases ? question.testCases[0].input : ''));
      setOutput('');
      setError('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] w-full bg-[#f8fafc] dark:bg-[#0A0A0A] text-slate-900 dark:text-gray-100 transition-colors duration-200">
      
      {/* Top Navbar for IDE - Full width, flush with edges */}
      <div className="flex justify-between items-center px-4 md:px-6 h-14 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#111116] z-10">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Code2 className="w-5 h-5" />
          <span className="font-extrabold text-sm tracking-wide">Machine Coding IDE</span>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3">
          <select
            className="px-3 py-1.5 rounded-lg text-sm bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 font-medium text-slate-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            <option value="python" className="dark:bg-slate-800 dark:text-slate-200">Python</option>
            <option value="javascript" className="dark:bg-slate-800 dark:text-slate-200">Node.js</option>
            <option value="java" className="dark:bg-slate-800 dark:text-slate-200">Java 17</option>
            <option value="cpp" className="dark:bg-slate-800 dark:text-slate-200">C++</option>
            <option value="c" className="dark:bg-slate-800 dark:text-slate-200">C</option>
          </select>

          <button
            onClick={toggleQuestions}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold border transition-all shadow-sm ${
              showQuestions
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-500/20 dark:border-indigo-500/30 dark:text-indigo-300'
                : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700 dark:bg-[#1A1A24] dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5'
            }`}
          >
            <Menu size={16} />
            <span className="hidden sm:inline">Problems</span>
          </button>
          
          <button
            onClick={() => runCode(false)}
            disabled={isRunning || !code.trim()}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold bg-slate-800 hover:bg-slate-700 text-white transition-all shadow-md active:scale-95 ml-2 border border-slate-700"
          >
            <Play size={14} fill="currentColor" />
            Run
          </button>

          <button
            onClick={() => runCode(true)}
            disabled={isRunning || !code.trim()}
            className="flex items-center gap-2 px-5 py-1.5 rounded-lg text-sm font-bold bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-400 disabled:dark:bg-gray-700 text-white transition-all shadow-md active:scale-95 ml-2"
          >
            {isRunning ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Check size={14} className="stroke-[3]" />
            )}
            Submit
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar: Questions Library */}
        {showQuestions && (
          <div className="w-72 md:w-80 flex-shrink-0 flex flex-col border-r border-gray-200 dark:border-white/10 bg-white dark:bg-[#111116] overflow-hidden transition-all duration-300">
            <div className="p-4 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20 flex items-center justify-between">
              <h2 className="text-[11px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Problem Set</h2>
              <select
                className="px-2 py-1 rounded text-xs font-semibold bg-white dark:bg-[#1A1A24] border border-gray-200 dark:border-white/10 text-slate-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-1 content-start custom-scrollbar">
              {filteredQuestions.map((question, idx) => (
                <button
                  key={question.id}
                  onClick={() => selectQuestion(question.id)}
                  className={`w-full text-left p-4 rounded-xl text-sm flex flex-col group transition-all border ${
                    selectedQuestion === question.id
                      ? 'bg-indigo-50/50 border-indigo-200 dark:bg-indigo-500/10 dark:border-indigo-500/20'
                      : 'bg-white border-transparent hover:border-gray-200 dark:bg-[#111116] dark:hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                     <div className="flex items-center gap-2 truncate">
                       <span className={`font-bold truncate ${selectedQuestion === question.id ? 'text-indigo-700 dark:text-indigo-400' : 'text-gray-800 dark:text-gray-200'}`}>
                          {question.id}. {question.title}
                       </span>
                     </div>
                     {question.solved && <Check size={16} className="text-emerald-500 shrink-0 stroke-[3]" />}
                  </div>
                  <div className="flex items-center gap-2 mt-1 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty}
                    </span>
                  </div>
                  <div className="text-[11px] font-medium text-gray-500 line-clamp-2 w-full">
                     {question.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Center/Right Panel: Editor Top, Terminal Bottom */}
        <div className="flex-1 flex flex-col min-w-[300px] bg-white dark:bg-[#111116] overflow-hidden">
          
          {selectedQuestion && (
            <div className="p-5 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20 flex items-start gap-4">
               <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
               </div>
               <div>
                 <div className="flex items-center gap-3 mb-1.5">
                   <h3 className="font-bold text-lg text-slate-900 dark:text-white">{questions.find(q => q.id === selectedQuestion)?.title}</h3>
                   <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getDifficultyColor(questions.find(q => q.id === selectedQuestion)?.difficulty)}`}>
                      {questions.find(q => q.id === selectedQuestion)?.difficulty}
                   </span>
                 </div>
                 <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                   {questions.find(q => q.id === selectedQuestion)?.description}
                 </p>
                 {questions.find(q => q.id === selectedQuestion)?.examples && (
                   <div className="bg-white/50 dark:bg-black/40 p-3 rounded-lg border border-gray-200 dark:border-white/10 mt-2">
                     <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Test Cases / Examples</p>
                     <pre className="text-[13px] font-mono text-slate-800 dark:text-gray-300 whitespace-pre-wrap">
                       {questions.find(q => q.id === selectedQuestion)?.examples}
                     </pre>
                   </div>
                 )}
               </div>
            </div>
          )}
          
          <div className="flex-1 relative border-b border-gray-200 dark:border-white/10">
            <Editor
              height="100%"
              language={language === 'c' || language === 'cpp' ? 'cpp' : language}
              theme={isDarkMode ? 'vs-dark' : 'light'}
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 15,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                padding: { top: 20 },
                scrollBeyondLastLine: false,
                lineNumbersMinChars: 4,
                wordWrap: 'on',
                formatOnPaste: true,
                cursorBlinking: 'smooth'
              }}
            />
          </div>

          {/* Bottom Panel: Input + Terminal Output side by side */}
          <div className="h-48 flex-shrink-0 flex bg-slate-50 dark:bg-[#09090d] border-t border-slate-200 dark:border-white/5 transition-colors duration-200">
            
            {/* Stdin Input Panel */}
            {showInput && (
              <div className="w-64 flex-shrink-0 flex flex-col border-r border-slate-200 dark:border-white/5">
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-black/20 border-b border-slate-200 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <Keyboard size={14} className="text-indigo-600 dark:text-indigo-400" />
                    <span className="text-xs font-bold text-slate-500 dark:text-gray-400 tracking-wider">STDIN INPUT</span>
                  </div>
                </div>
                <textarea
                  value={stdinInput}
                  onChange={(e) => setStdinInput(e.target.value)}
                  placeholder={`Enter input here...\ne.g.\n5\n7`}
                  className="flex-1 w-full bg-transparent text-slate-800 dark:text-gray-300 placeholder-slate-400 dark:placeholder-slate-600 p-4 text-sm font-mono resize-none focus:outline-none custom-scrollbar"
                  spellCheck="false"
                />
              </div>
            )}

            {/* Terminal Output */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex justify-between items-center px-5 py-2.5 bg-slate-100 dark:bg-black/20 border-b border-slate-200 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-slate-500 dark:text-gray-400" />
                    <span className="text-xs font-bold text-slate-500 dark:text-gray-400 tracking-wider">TERMINAL OUTPUT</span>
                  </div>
                  <button
                    onClick={() => setShowInput(!showInput)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-colors ${
                      showInput
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-500/20 dark:border-indigo-500/30 dark:text-indigo-300'
                        : 'bg-white border-gray-200 hover:bg-gray-50 text-slate-600 hover:text-slate-800 dark:bg-[#1A1A24] dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-1"><Keyboard size={10} /> Input</span>
                  </button>
                </div>
                <button 
                  onClick={clearOutput}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white px-3 py-1 bg-white dark:bg-[#1A1A24] border border-slate-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 rounded transition-colors"
                >
                  Clear Console
                </button>
              </div>
              <div className="flex-1 p-5 overflow-auto custom-scrollbar font-mono text-sm leading-relaxed">
                {isRunning ? (
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                     <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
                     <span>Executing script...</span>
                  </div>
                ) : error ? (
                  <pre className="text-red-600 dark:text-red-400 whitespace-pre-wrap">{error}</pre>
                ) : output ? (
                  <pre className="text-slate-800 dark:text-white whitespace-pre-wrap">{output}</pre>
                ) : (
                  <span className="text-slate-400 dark:text-slate-600 font-medium">✨ Output will appear here. Run your code to see results.</span>
                )}
                
                {selectedQuestion && questions.find(q => q.id === selectedQuestion)?.solved && (
                  <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl text-emerald-700 dark:text-emerald-400 font-medium text-sm flex items-center gap-2 shadow-inner">
                    <Check className="w-5 h-5" /> All test cases passed successfully!
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MachineCode;
