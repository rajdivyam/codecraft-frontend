import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Webcam from "react-webcam";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, VideoOff, Mic, MicOff, Timer, 
  ChevronRight, X, Sparkles, CheckCircle2,
  AlertCircle, Play, Pause, FileText,
  MessageSquare, Brain, Zap, ArrowRight
} from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const interviewQuestions = {
  "SDE-1": ["Tell me about yourself.", "Why do you want to be a software developer?", "How would you solve this algorithmic problem?", "What are your strengths and weaknesses?", "Explain a time when you had to debug a challenging issue.", "What is OOP and why is it important?", "What are your thoughts on Agile development?"],
  "SDE-2": ["Tell me about a complex project you've worked on.", "How do you handle code reviews?", "What design patterns have you used?", "Describe a challenging problem you solved and how you approached it.", "What is your experience with system design?", "How do you prioritize tasks in a project?"],
  "SDE-3": ["Describe your leadership experience.", "How do you mentor junior developers?", "What’s your approach to handling high-pressure situations?", "How do you ensure code quality in your team?", "What’s your experience with cloud technologies?", "How do you keep up with new technologies?"],
  "Data Analyst": ["Tell me about yourself.", "How would you analyze a dataset with missing values?", "What are the most important skills for a data analyst?", "Can you explain the difference between mean, median, and mode?", "What is the process of ETL?", "Have you used SQL for data analysis? Give an example.", "How do you visualize data effectively?"],
  "Data Scientist": ["Tell me about yourself.", "What is the difference between supervised and unsupervised learning?", "How do you handle missing data in a dataset?", "Explain a time when you built a predictive model. What algorithm did you use?", "What is the importance of feature engineering?", "How do you ensure the accuracy of a machine learning model?", "Explain the bias-variance tradeoff."],
  "Cybersecurity Engineer": ["Tell me about yourself.", "What is the difference between symmetric and asymmetric encryption?", "Explain how a man-in-the-middle attack works.", "How would you secure a network from external threats?", "What is a firewall and how does it work?", "What is penetration testing?", "How would you handle a security breach?"],
  "DevOps Engineer": ["Tell me about yourself.", "What is CI/CD and how do you implement it?", "Explain the concept of containerization.", "What tools have you used for automation?", "How do you monitor a production system?", "What is infrastructure as code?", "What is the most challenging part of working with DevOps?"],
  "UI/UX Designer": ["Tell me about yourself.", "What is your design process?", "How do you balance user needs with business goals?", "Explain how you conduct user testing.", "How would you improve the user interface of a product?", "What tools do you use for wireframing and prototyping?", "Can you explain the difference between UI and UX?"],
  "Cloud Engineer": ["Tell me about yourself.", "What is cloud computing?", "What are the differences between IaaS, PaaS, and SaaS?", "What is your experience with cloud providers like AWS, Azure, or Google Cloud?", "How do you ensure high availability and disaster recovery in a cloud environment?", "What are containers and how do they relate to cloud infrastructure?", "How do you manage cloud cost optimization?"],
  "Machine Learning Engineer": ["Tell me about yourself.", "What is the difference between a machine learning model and an algorithm?", "What are some common algorithms used in machine learning?", "Explain a time when you worked on training a model. What data and techniques did you use?", "What is the importance of data preprocessing in machine learning?", "How do you evaluate the performance of a machine learning model?", "What is overfitting and how do you prevent it?"],
  "Full Stack Developer": ["Tell me about yourself.", "What technologies do you use in both front-end and back-end development?", "Explain how you handle API development and integration.", "What is the MVC architecture and how do you implement it?", "How do you ensure the scalability of a full stack application?", "What are the best practices for version control in full-stack development?", "How do you handle authentication and authorization in your applications?"]
};

const Interview = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionTime, setSessionTime] = useState(0); 
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [answers, setAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [aiReport, setAiReport] = useState(null);

  const questions = interviewQuestions[role] || interviewQuestions["SDE-1"];

  // Initialize Gemini
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const recognitionRef = useRef(null);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isWebcamOn) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWebcamOn]);

  // Web Speech API Initialization
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn("Speech Recognition API is not supported in this browser.");
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          // You can also handle interim results here if you want real-time feedback
          const interim = event.results[i][0].transcript;
          setTranscript(interim);
        }
      }
      if (finalTranscript) {
        setTranscript(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        alert("Microphone access denied. Please check your browser permissions.");
      }
      setIsRecording(false);
    };

    recognition.onend = () => {
      if (isRecording) {
        recognition.start(); // Keep it running if we're supposed to be recording
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Handle Recording State Changes
  useEffect(() => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error("Failed to start recognition:", err);
      }
    } else {
      recognitionRef.current.stop();
    }
  }, [isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const generateReport = async () => {
    setIsGeneratingReport(true);
    setShowFeedback(true);
    
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
      
      const sessionData = questions.map((q, i) => ({
        question: q,
        answer: answers[i] || "No answer provided."
      }));

      const prompt = `You are an expert tech interviewer. Evaluate the following mock interview session for the role of ${role}.
      
      Interview Session Data:
      ${JSON.stringify(sessionData, null, 2)}
      
      Generate a detailed feedback report in JSON format with the following structure:
      {
        "overallScore": number (0-100),
        "strengths": string[],
        "weaknesses": string[],
        "feedback": string,
        "technicalSkills": number (0-100),
        "communication": number (0-100),
        "confidence": number (0-100),
        "tips": string[]
      }
      Return ONLY the JSON.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Clean up the response text and extract JSON more robustly
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const cleanedText = jsonMatch[0];
        setAiReport(JSON.parse(cleanedText));
      } else {
        console.error("AI response did not contain valid JSON:", text);
        throw new Error("Invalid AI response format");
      }
    } catch (error) {
      console.error("Error generating AI report:", error);
      setAiReport({
        overallScore: 0,
        strengths: ["Evaluation failed. " + (error.message || "Check your API key.")],
        weaknesses: ["AI evaluation was not completed."],
        feedback: "We encountered an error while processing your interview feedback. " + (error.message || ""),
        technicalSkills: 0,
        communication: 0,
        confidence: 0,
        tips: ["Please try again later."]
      });
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const nextQuestion = () => {
    const currentAnswer = transcript;
    setAnswers(prev => [...prev, currentAnswer]);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTranscript("");
    } else {
      generateReport();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white flex flex-col lg:flex-row transition-colors duration-200 overflow-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] rounded-full bg-indigo-600/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      {/* Left Side: Camera Section */}
      <div className="w-full lg:w-1/2 p-6 lg:p-12 relative z-10 flex flex-col justify-center border-r border-slate-200 dark:border-white/5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-2xl mx-auto w-full"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Camera className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h2 className="font-bold text-xl">Camera Preview</h2>
                <p className="text-slate-500 dark:text-gray-400 text-xs flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-emerald-500 dark:text-emerald-400" /> AI Monitoring Active
                </p>
              </div>
            </div>
            
            <div className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center gap-3">
              <Timer className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-300">{formatTime(sessionTime)}</span>
            </div>
          </div>

          <div className="relative aspect-video rounded-[2.5rem] bg-black border border-slate-200 dark:border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.15)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
            {isWebcamOn ? (
              <Webcam
                ref={webcamRef}
                className="w-full h-full object-cover"
                onUserMedia={() => setIsWebcamOn(true)}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/50 backdrop-blur-xl">
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <VideoOff className="w-8 h-8 text-gray-500" />
                </div>
                <button 
                  onClick={() => {
                    setIsWebcamOn(true);
                    setIsRecording(true);
                  }}
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95 flex items-center gap-2"
                >
                  <Play className="w-4 h-4" /> Start Interview
                </button>
              </div>
            )}

            {/* Mic indicator */}
            <div className="absolute bottom-6 left-6 p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-4">
              <div className={`p-2 rounded-xl ${isRecording ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                {isRecording ? <Mic className="w-4 h-4 text-emerald-400" /> : <MicOff className="w-4 h-4 text-red-400" />}
              </div>
              <div className="space-y-1">
                <div className="flex gap-0.5">
                  {[...Array(8)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={isRecording ? { height: [4, 12, 4] } : { height: 4 }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1 bg-indigo-400 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <div className="text-slate-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">AI Assistant</div>
                <div className="text-sm font-bold">Listening...</div>
              </div>
            </div>
            <button 
              onClick={() => setIsRecording(!isRecording)}
              className={`p-6 rounded-[2rem] border transition-all flex items-center gap-4 group ${
                isRecording 
                  ? 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20 text-slate-900 dark:text-white' 
                  : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 shadow-sm dark:shadow-none'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                isRecording ? 'bg-emerald-500/20' : 'bg-indigo-500/10 dark:bg-indigo-500/20'
              }`}>
                {isRecording ? <Mic className="w-6 h-6 text-emerald-600 dark:text-emerald-400" /> : <Mic className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
              </div>
              <div className="text-left">
                <div className="text-slate-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Microphone</div>
                <div className="text-sm font-bold">{isRecording ? 'Mute' : 'Unmute'}</div>
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Question Section */}
      <div className="w-full lg:w-1/2 p-6 lg:p-12 relative z-10 bg-slate-100/50 dark:bg-white/[0.02] backdrop-blur-3xl flex flex-col justify-center border-l border-slate-200/50 dark:border-l-0">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-xl mx-auto w-full"
        >
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/60 dark:bg-white/5 border border-slate-300/50 dark:border-white/10 text-slate-600 dark:text-gray-400 text-xs font-bold tracking-widest uppercase">
                Step {currentQuestionIndex + 1} of {questions.length}
              </div>
              <div className="flex gap-1">
                {questions.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i <= currentQuestionIndex ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-300 dark:bg-white/10'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative">
              <span className="absolute -top-16 -left-8 text-[10rem] font-black text-slate-900/[0.03] dark:text-white/[0.03] select-none pointer-events-none">
                0{currentQuestionIndex + 1}
              </span>
              <motion.h3 
                key={currentQuestionIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-4xl md:text-5xl font-black leading-tight relative z-10"
              >
                {questions[currentQuestionIndex].split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.03, delay: index * 0.02 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h3>
            </div>
          </div>

          {/* Transcript Panel */}
          <div className="mb-12 p-8 rounded-[2.5rem] bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none min-h-[200px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-black tracking-wider uppercase">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                Live Transcription
              </div>
            </div>
            <p className="text-slate-700 dark:text-gray-300 leading-relaxed text-lg italic">
              {transcript ? `"${transcript}"` : "Waiting for your response..."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button 
              onClick={() => navigate('/interview')}
              className="px-8 py-4 rounded-2xl bg-slate-200 hover:bg-slate-300 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white font-bold transition-all flex items-center gap-2"
            >
              <X className="w-5 h-5" /> End Session
            </button>
            <button 
              onClick={nextQuestion}
              className="flex-1 w-full sm:w-auto px-10 py-4 bg-indigo-600 dark:bg-white text-white dark:text-black font-black rounded-2xl shadow-[0_10px_20px_rgba(79,70,229,0.15)] dark:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_10px_30px_rgba(79,70,229,0.3)] dark:hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish Interview' : 'Next Question'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* AI Report Modal */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="max-w-4xl w-full my-8 bg-white dark:bg-[#0B0F1A] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-8 md:p-10 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black">Interview Report</h2>
                    <p className="text-slate-500 dark:text-gray-400 text-sm">AI-Powered Performance Analysis</p>
                  </div>
                </div>
                {!isGeneratingReport && (
                  <div className="text-right">
                    <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{aiReport?.overallScore}%</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-gray-500">Overall Score</div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-8 md:p-10 space-y-10 custom-scrollbar">
                {isGeneratingReport ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="relative w-24 h-24 mb-8">
                      <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                      <div className="absolute inset-4 rounded-full border-4 border-purple-500/20 border-b-purple-500 animate-spin-slow" />
                      <Brain className="absolute inset-0 m-auto w-8 h-8 text-slate-900 dark:text-white animate-pulse" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Analyzing Your Session...</h3>
                    <p className="text-slate-500 dark:text-gray-400 max-w-xs text-center">Gemini AI is reviewing your transcripts, communication style, and technical depth.</p>
                  </div>
                ) : aiReport ? (
                  <>
                    {/* Score Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { label: 'Technical Depth', score: aiReport.technicalSkills, icon: Zap, color: 'text-yellow-500' },
                        { label: 'Communication', score: aiReport.communication, icon: MessageSquare, color: 'text-blue-500' },
                        { label: 'Confidence', score: aiReport.confidence, icon: Sparkles, color: 'text-purple-500' }
                      ].map((stat, i) => (
                        <div key={i} className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none flex flex-col items-center text-center">
                          <stat.icon className={`w-6 h-6 ${stat.color} mb-3`} />
                          <div className="text-2xl font-black mb-1">{stat.score}%</div>
                          <div className="text-xs font-bold text-slate-500 dark:text-gray-500 uppercase tracking-wider">{stat.label}</div>
                          <div className="w-full h-1.5 bg-slate-200 dark:bg-white/5 rounded-full mt-4 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${stat.score}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className={`h-full bg-gradient-to-r from-indigo-500 to-purple-500`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Detailed Feedback */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" /> Key Strengths
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {aiReport.strengths.map((s, i) => (
                          <div key={i} className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-slate-700 dark:text-gray-300 text-sm flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" /> Areas for Improvement
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {aiReport.weaknesses.map((w, i) => (
                          <div key={i} className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 text-slate-700 dark:text-gray-300 text-sm flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                            {w}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl" />
                      <h3 className="text-lg font-bold mb-4">Summary Feedback</h3>
                      <p className="text-slate-600 dark:text-gray-400 leading-relaxed italic text-lg">"{aiReport.feedback}"</p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-bold">Recommended Preparation</h3>
                      <div className="space-y-3">
                        {aiReport.tips.map((tip, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-indigo-500/5 border border-slate-200 dark:border-indigo-500/10">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center shrink-0">
                              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400">{i + 1}</span>
                            </div>
                            <span className="text-slate-700 dark:text-gray-300 text-sm">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : null}
              </div>

              {/* Footer */}
              <div className="p-8 md:p-10 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/interview')}
                  className="px-8 py-4 rounded-2xl bg-slate-200 hover:bg-slate-300 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white font-bold transition-all flex items-center justify-center gap-2"
                >
                  Return to Dashboard
                </button>
                <button 
                  onClick={() => window.print()}
                  className="flex-1 px-8 py-4 bg-indigo-600 dark:bg-white text-white dark:text-black font-black rounded-2xl shadow-[0_10px_20px_rgba(79,70,229,0.15)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_10px_30px_rgba(79,70,229,0.3)] dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all flex items-center justify-center gap-3"
                >
                  Download Report <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Interview;

