import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, CheckCircle, Circle, Clock, Plus, Trash2, ChevronLeft, ChevronRight,
  BrainCircuit, Target, Activity, CheckSquare, Zap, Flame, GripVertical, Play, Pause, RotateCcw,
  Sparkles, GraduationCap, Briefcase, Code, Heart, BookOpen, Loader2, Minus
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Utilities
const getTodayDateString = () => {
    const d = new Date();
    // Use local time to avoid timezone offset issues
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const getLocalISODate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
const getDayName = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' });

const INITIAL_TASKS = [
  { id: '1', title: 'Complete React Dashboard', category: 'Projects', status: 'In Progress', priority: 'High', time: '10:00 AM' },
  { id: '2', title: 'Revise System Design', category: 'Learning', status: 'To Do', priority: 'High', time: '02:00 PM' }
];

const INITIAL_HABITS = [
  { id: 1, name: 'LeetCode Daily', streak: 0, lastCompleted: null },
  { id: 2, name: 'Read System Design', streak: 0, lastCompleted: null }
];

const getInitialAnalytics = () => {
    const data = [];
    for(let i=6; i>=0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        data.push({ date: getLocalISODate(d), name: getDayName(getLocalISODate(d)), hours: 0, tasks: 0 });
    }
    return data;
};

const CATEGORIES = ['Learning', 'Interview', 'Projects', 'Health', 'Revision'];
const PRIORITIES = ['Low', 'Medium', 'High'];

export default function Planyourday() {
  const { isDarkMode } = useTheme();

  // Load States from LocalStorage
  const [tasks, setTasks] = useState(() => {
    try { 
        const saved = localStorage.getItem('planYourDay_tasks_v2'); 
        if (saved) {
            const parsed = JSON.parse(saved);
            const today = getTodayDateString();
            // Migrate old tasks without a date to today
            return parsed.map(t => ({ ...t, date: t.date || today }));
        }
        return INITIAL_TASKS.map(t => ({...t, date: getTodayDateString()})); 
    } catch(e) { 
        return INITIAL_TASKS.map(t => ({...t, date: getTodayDateString()})); 
    }
  });
  
  const [habits, setHabits] = useState(() => {
    try { const saved = localStorage.getItem('planYourDay_habits_v2'); return saved ? JSON.parse(saved) : INITIAL_HABITS; } catch(e) { return INITIAL_HABITS; }
  });

  const [stats, setStats] = useState(() => {
    try { const saved = localStorage.getItem('planYourDay_stats_v2'); return saved ? JSON.parse(saved) : { problemsSolved: 0, jobApps: 0 }; } catch(e) { return { problemsSolved: 0, jobApps: 0 }; }
  });

  const [analytics, setAnalytics] = useState(() => {
    try { const saved = localStorage.getItem('planYourDay_analytics_v2'); return saved ? JSON.parse(saved) : getInitialAnalytics(); } catch(e) { return getInitialAnalytics(); }
  });

  const [aiInsights, setAiInsights] = useState(() => {
    try { const saved = localStorage.getItem('planYourDay_insights_v2'); return saved ? JSON.parse(saved) : { tips: [], lastDate: null }; } catch(e) { return { tips: [], lastDate: null }; }
  });

  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  
  // Date Selection State
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date()); // For Calendar View
  const [selectedDateStr, setSelectedDateStr] = useState(getTodayDateString()); // For Task Filtering
  
  // Inputs
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Learning');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [newHabitName, setNewHabitName] = useState('');

  // Timer State
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerActive, setTimerActive] = useState(false);
  const [timerMode, setTimerMode] = useState('Work');

  // Sync to LocalStorage
  useEffect(() => { localStorage.setItem('planYourDay_tasks_v2', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('planYourDay_habits_v2', JSON.stringify(habits)); }, [habits]);
  useEffect(() => { localStorage.setItem('planYourDay_stats_v2', JSON.stringify(stats)); }, [stats]);
  useEffect(() => { localStorage.setItem('planYourDay_analytics_v2', JSON.stringify(analytics)); }, [analytics]);
  useEffect(() => { localStorage.setItem('planYourDay_insights_v2', JSON.stringify(aiInsights)); }, [aiInsights]);

  // Derived Dynamic Data for Selected Date
  const displayedTasks = tasks.filter(t => t.date === selectedDateStr);
  const tasksDoneCount = displayedTasks.filter(t => t.status === 'Done').length;
  const tasksTotalCount = displayedTasks.length;
  const focusScore = tasksTotalCount > 0 ? Math.round((tasksDoneCount / tasksTotalCount) * 100) : 0;
  
  const todayAnalytics = analytics.find(d => d.date === getTodayDateString()) || { hours: 0, tasks: 0 };
  const totalStudyHoursToday = parseFloat(todayAnalytics.hours.toFixed(1));

  // Determine Max Streak
  const maxStreak = habits.length > 0 ? Math.max(...habits.map(h => h.streak)) : 0;

  // Analytics Helper
  const updateTodayAnalytics = (field, amount) => {
      const todayStr = getTodayDateString();
      setAnalytics(prev => {
          let newData = [...prev];
          let todayIndex = newData.findIndex(d => d.date === todayStr);
          if (todayIndex === -1) {
              newData.shift(); // Remove oldest
              newData.push({ date: todayStr, name: getDayName(todayStr), hours: 0, tasks: 0 });
              todayIndex = newData.length - 1;
          }
          newData[todayIndex] = { ...newData[todayIndex], [field]: Math.max(0, newData[todayIndex][field] + amount) };
          return newData;
      });
  };

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timerActive && timeLeft === 0) {
      setTimerActive(false);
      if (timerMode === 'Work') {
          // Add 25 mins to analytics (0.416 hours)
          updateTodayAnalytics('hours', 25 / 60);
      }
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, timerMode]);

  // Gemini AI Insights Generator
  useEffect(() => {
      const todayStr = getTodayDateString();
      if (aiInsights.lastDate !== todayStr && !isGeneratingInsights) {
          generateInsights(todayStr);
      }
  }, []); // Run once on mount

  const generateInsights = async (targetDateStr) => {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) return;
      
      setIsGeneratingInsights(true);
      try {
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
          
          const targetTasks = tasks.filter(t => t.date === targetDateStr);
          const taskTitles = targetTasks.map(t => `${t.title} (${t.priority})`).join(', ');
          const prompt = `Act as an expert productivity coach for a developer. Here are my tasks for the date ${targetDateStr}: [${taskTitles || 'No tasks scheduled yet'}]. 
          Give me exactly 2 very short, highly actionable, and dynamic tips/insights to help me dominate the day. 
          Format exactly like this (use | as separator):
          Tip 1 Title|Tip 1 short description
          Tip 2 Title|Tip 2 short description`;

          const result = await model.generateContent(prompt);
          const text = result.response.text();
          
          const tips = text.split('\n').filter(l => l.includes('|')).map(line => {
              const [title, desc] = line.split('|');
              return { title: title.replace(/Tip \d+ Title:/, '').replace(/\*/g,'').trim(), desc: desc?.replace(/\*/g,'').trim() || '' };
          }).slice(0, 2);

          if (tips.length > 0) {
              setAiInsights({ tips, lastDate: targetDateStr });
          }
      } catch (error) {
          console.error("Failed to generate AI insights:", error);
      } finally {
          setIsGeneratingInsights(false);
      }
  };

  // Habit Logic
  const addHabit = (e) => {
      e.preventDefault();
      if(!newHabitName.trim()) return;
      setHabits([...habits, { id: Date.now(), name: newHabitName, streak: 0, lastCompleted: null }]);
      setNewHabitName('');
  };

  const toggleHabit = (id) => {
      const todayStr = getTodayDateString();
      setHabits(habits.map(h => {
          if (h.id === id) {
              const isDoneToday = h.lastCompleted === todayStr;
              return { 
                  ...h, 
                  lastCompleted: isDoneToday ? null : todayStr,
                  streak: isDoneToday ? Math.max(0, h.streak - 1) : h.streak + 1
              };
          }
          return h;
      }));
  };

  const deleteHabit = (id) => setHabits(habits.filter(h => h.id !== id));

  // Stat Counter Logic
  const updateStat = (key, delta) => {
      setStats(prev => ({ ...prev, [key]: Math.max(0, prev[key] + delta) }));
  };

  // Calendar
  const renderCalendarDays = () => {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayStr = getTodayDateString();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-10 border border-transparent"></div>);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateStr = getLocalISODate(date);
      const isToday = dateStr === todayStr;
      const isSelected = dateStr === selectedDateStr;
      
      const hasTasks = tasks.some(t => t.date === dateStr);

      days.push(
        <div 
          key={i} 
          onClick={() => setSelectedDateStr(dateStr)}
          className={`flex flex-col items-center justify-center p-2 rounded-xl cursor-pointer transition-all duration-300 border ${
            isSelected 
              ? 'border-indigo-500 bg-indigo-500 text-white dark:bg-indigo-500/20 dark:text-indigo-400 font-bold shadow-md dark:shadow-[0_0_15px_rgba(99,102,241,0.4)]' 
              : isToday
                ? 'border-cyan-400 bg-cyan-50 text-cyan-700 dark:border-cyan-400/50 dark:bg-cyan-500/10 dark:text-cyan-300 font-bold'
                : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 dark:border-white/5 dark:bg-white/5 dark:text-gray-300 dark:hover:border-indigo-400/50 dark:hover:bg-indigo-500/10 font-medium'
          }`}
        >
          <span className="text-sm">{i}</span>
          <div className="flex gap-1 mt-1 h-1">
             {hasTasks && <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-indigo-400 dark:shadow-[0_0_5px_#818cf8]'}`}></div>}
          </div>
        </div>
      );
    }
    return days;
  };

  const nextMonth = () => setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1));

  // Tasks
  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasks([{ 
      id: Date.now().toString(), 
      title: newTaskTitle, 
      category: newTaskCategory,
      status: 'To Do', 
      priority: newTaskPriority, 
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      date: selectedDateStr
    }, ...tasks]);
    setNewTaskTitle('');
  };

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(t => {
        if(t.id === id) {
            const newStatus = t.status === 'Done' ? 'To Do' : 'Done';
            if (newStatus === 'Done') updateTodayAnalytics('tasks', 1);
            else updateTodayAnalytics('tasks', -1);
            return { ...t, status: newStatus };
        }
        return t;
    }));
  };
  
  const removeTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  const getPriorityStyles = (priority) => {
    switch(priority) {
      case 'High': return 'text-rose-600 bg-rose-100 border-rose-200 dark:text-rose-400 dark:shadow-[0_0_10px_rgba(244,63,94,0.3)] dark:bg-rose-500/10 dark:border-rose-500/30';
      case 'Medium': return 'text-amber-600 bg-amber-100 border-amber-200 dark:text-amber-400 dark:shadow-[0_0_10px_rgba(251,191,36,0.3)] dark:bg-amber-500/10 dark:border-amber-500/30';
      case 'Low': return 'text-emerald-600 bg-emerald-100 border-emerald-200 dark:text-emerald-400 dark:shadow-[0_0_10px_rgba(16,185,129,0.3)] dark:bg-emerald-500/10 dark:border-emerald-500/30';
      default: return 'text-gray-500 dark:text-gray-400';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Learning': return <GraduationCap className="w-3 h-3 mr-1" />;
      case 'Interview': return <Briefcase className="w-3 h-3 mr-1" />;
      case 'Projects': return <Code className="w-3 h-3 mr-1" />;
      case 'Health': return <Heart className="w-3 h-3 mr-1" />;
      case 'Revision': return <BookOpen className="w-3 h-3 mr-1" />;
      default: return <Circle className="w-3 h-3 mr-1" />;
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Learning': return 'text-purple-600 bg-purple-100 border-purple-200 dark:text-purple-400 dark:bg-purple-500/10 dark:border-purple-500/20';
      case 'Interview': return 'text-blue-600 bg-blue-100 border-blue-200 dark:text-blue-400 dark:bg-blue-500/10 dark:border-blue-500/20';
      case 'Projects': return 'text-cyan-600 bg-cyan-100 border-cyan-200 dark:text-cyan-400 dark:bg-cyan-500/10 dark:border-cyan-500/20';
      case 'Health': return 'text-pink-600 bg-pink-100 border-pink-200 dark:text-pink-400 dark:bg-pink-500/10 dark:border-pink-500/20';
      case 'Revision': return 'text-indigo-600 bg-indigo-100 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-500/10 dark:border-indigo-500/20';
      default: return 'text-slate-600 bg-slate-100 border-slate-200 dark:text-gray-400 dark:bg-gray-500/10 dark:border-gray-500/20';
    }
  };

  // Timer Helper
  const toggleTimer = () => setTimerActive(!timerActive);
  const resetTimer = () => {
    setTimerActive(false);
    setTimeLeft(timerMode === 'Work' ? 25 * 60 : 5 * 60);
  };
  const switchTimerMode = (mode) => {
    setTimerMode(mode);
    setTimerActive(false);
    setTimeLeft(mode === 'Work' ? 25 * 60 : 5 * 60);
  }
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };
  const timerRadius = 45;
  const timerCircumference = 2 * Math.PI * timerRadius;
  const timerStrokeDashoffset = timerCircumference - (timeLeft / (timerMode === 'Work' ? 25*60 : 5*60)) * timerCircumference;

  // Render Display
  const isSelectedToday = selectedDateStr === getTodayDateString();
  const displayDateStr = isSelectedToday ? "Today's Tasks" : `${new Date(selectedDateStr).toLocaleDateString('en-US', {month:'short', day:'numeric'})} Tasks`;

  return (
    <div className={`min-h-screen pt-4 pb-12 px-4 md:px-8 w-full transition-colors duration-500 bg-[#f8fafc] text-slate-900 dark:bg-[#0f111a] dark:text-white`}>
      <div className="max-w-7xl mx-auto w-full relative z-0">
        
        {/* Background Glow Effects */}
        {isDarkMode && (
          <>
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
          </>
        )}

        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-6 rounded-2xl shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-purple-400 dark:via-indigo-400 dark:to-cyan-400 mb-1">
              Good Morning, Developer
            </h1>
            <p className="text-slate-500 dark:text-gray-400 font-medium flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs text-slate-400 dark:text-gray-400 uppercase tracking-wider font-bold">Focus Score</p>
                <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{focusScore}<span className="text-sm text-slate-400 dark:text-gray-500">/100</span></p>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 dark:border-cyan-400/50 flex items-center justify-center bg-cyan-50 dark:bg-cyan-400/10 shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Zap className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Hero Cards Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Tasks Done', value: `${tasksDoneCount}/${tasksTotalCount}`, icon: <CheckSquare/>, color: 'bg-emerald-50 dark:bg-transparent dark:bg-gradient-to-br dark:from-emerald-500/20 dark:to-emerald-600/5', border: 'border-emerald-100 dark:border-emerald-500/20', text: 'text-emerald-600 dark:text-emerald-400', iconBg: 'bg-emerald-100 dark:bg-white/5', interactive: false },
            { label: 'Study Hours', value: `${totalStudyHoursToday}h`, icon: <Clock/>, color: 'bg-purple-50 dark:bg-transparent dark:bg-gradient-to-br dark:from-purple-500/20 dark:to-purple-600/5', border: 'border-purple-100 dark:border-purple-500/20', text: 'text-purple-600 dark:text-purple-400', iconBg: 'bg-purple-100 dark:bg-white/5', interactive: false },
            { label: 'Problems Solved', value: stats.problemsSolved, icon: <BrainCircuit/>, color: 'bg-cyan-50 dark:bg-transparent dark:bg-gradient-to-br dark:from-cyan-500/20 dark:to-cyan-600/5', border: 'border-cyan-100 dark:border-cyan-500/20', text: 'text-cyan-600 dark:text-cyan-400', iconBg: 'bg-cyan-100 dark:bg-white/5', interactive: true, key: 'problemsSolved' },
            { label: 'Job Apps', value: stats.jobApps, icon: <Target/>, color: 'bg-pink-50 dark:bg-transparent dark:bg-gradient-to-br dark:from-pink-500/20 dark:to-pink-600/5', border: 'border-pink-100 dark:border-pink-500/20', text: 'text-pink-600 dark:text-pink-400', iconBg: 'bg-pink-100 dark:bg-white/5', interactive: true, key: 'jobApps' },
            { label: 'Max Streak', value: `${maxStreak} Days`, icon: <Flame/>, color: 'bg-orange-50 dark:bg-transparent dark:bg-gradient-to-br dark:from-orange-500/20 dark:to-orange-600/5', border: 'border-orange-100 dark:border-orange-500/20', text: 'text-orange-600 dark:text-orange-400', iconBg: 'bg-orange-100 dark:bg-white/5', interactive: false }
          ].map((stat, i) => (
            <div key={i} className={`${stat.color} border ${stat.border} rounded-2xl p-4 flex flex-col justify-between backdrop-blur-md relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 shadow-sm dark:shadow-none`}>
              <div className="flex justify-between items-start mb-2 z-10">
                <span className={`p-2 rounded-lg ${stat.iconBg} ${stat.text}`}>{stat.icon}</span>
                {stat.interactive && (
                   <div className="flex bg-white/50 dark:bg-white/10 rounded-lg p-0.5 opacity-0 group-hover:opacity-100 transition-opacity border border-slate-200 dark:border-white/5 backdrop-blur-md">
                     <button onClick={() => updateStat(stat.key, -1)} className={`p-1 rounded-md hover:bg-slate-200 dark:hover:bg-white/20 ${stat.text} transition-colors`}><Minus className="w-3 h-3"/></button>
                     <button onClick={() => updateStat(stat.key, 1)} className={`p-1 rounded-md hover:bg-slate-200 dark:hover:bg-white/20 ${stat.text} transition-colors`}><Plus className="w-3 h-3"/></button>
                   </div>
                )}
              </div>
              <div className="z-10">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">{stat.value}</h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 font-bold uppercase tracking-wider">{stat.label}</p>
              </div>
              <div className={`absolute -bottom-4 -right-4 w-16 h-16 rounded-full blur-xl opacity-20 dark:opacity-50 bg-current ${stat.text}`}></div>
            </div>
          ))}
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Calendar & Timer & Habits (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Calendar */}
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-lg relative overflow-hidden">
              <div className="flex justify-between items-center mb-4 relative z-10">
                <h2 className="text-base font-bold text-slate-800 dark:text-white">
                   {currentMonthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-1">
                  <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-gray-400 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-gray-400 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center mb-2 relative z-10">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="text-[10px] font-bold text-slate-400 dark:text-gray-500">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 relative z-10">
                {renderCalendarDays()}
              </div>
            </div>

            {/* Focus Timer */}
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-lg flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-50 dark:from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex gap-2 mb-6 bg-slate-100 dark:bg-white/5 p-1 rounded-lg border border-slate-200 dark:border-white/5 z-10">
                <button onClick={() => switchTimerMode('Work')} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${timerMode === 'Work' ? 'bg-indigo-500 text-white shadow-sm dark:shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white'}`}>Work</button>
                <button onClick={() => switchTimerMode('Break')} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${timerMode === 'Break' ? 'bg-cyan-500 text-white shadow-sm dark:shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white'}`}>Break</button>
              </div>
              
              <div className="relative w-32 h-32 flex items-center justify-center z-10">
                <svg className="absolute w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r={timerRadius} fill="none" stroke={isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"} strokeWidth="6" />
                  <circle 
                    cx="64" cy="64" r={timerRadius} 
                    fill="none" 
                    stroke={timerMode === 'Work' ? '#6366f1' : '#06b6d4'} 
                    strokeWidth="6"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: timerCircumference,
                      strokeDashoffset: timerStrokeDashoffset,
                      transition: 'stroke-dashoffset 1s linear'
                    }}
                    className={isDarkMode ? "drop-shadow-[0_0_8px_currentColor]" : ""}
                  />
                </svg>
                <span className="text-3xl font-extrabold tabular-nums tracking-tight text-slate-800 dark:text-white drop-shadow-sm dark:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                  {formatTime(timeLeft)}
                </span>
              </div>

              <div className="flex gap-4 mt-6 z-10">
                <button onClick={toggleTimer} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm dark:shadow-[0_0_15px_rgba(0,0,0,0.2)] ${timerActive ? 'bg-amber-100 text-amber-600 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 border dark:border-amber-500/50 hover:bg-amber-200 dark:hover:bg-amber-500/30' : 'bg-indigo-100 text-indigo-600 border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-400 border dark:border-indigo-500/50 hover:bg-indigo-200 dark:hover:bg-indigo-500/30'}`}>
                  {timerActive ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                </button>
                <button onClick={resetTimer} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 flex items-center justify-center transition-all">
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Habit Tracker */}
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-lg flex flex-col max-h-[350px]">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-pink-500 dark:text-pink-400" /> Habit Tracker
              </h3>
              <form onSubmit={addHabit} className="mb-3 relative shrink-0">
                 <input 
                   type="text" 
                   value={newHabitName} 
                   onChange={e=>setNewHabitName(e.target.value)} 
                   placeholder="Add new habit..." 
                   className="w-full bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white rounded-lg pl-3 pr-8 py-2 text-xs focus:outline-none focus:border-pink-500/50 placeholder:text-slate-400 dark:placeholder:text-gray-500"
                 />
                 <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors">
                   <Plus className="w-4 h-4"/>
                 </button>
              </form>
              <div className="space-y-3 overflow-y-auto custom-scrollbar pr-1 flex-1">
                {habits.map(habit => {
                  const isCompletedToday = habit.lastCompleted === getTodayDateString();
                  return (
                    <div key={habit.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-colors group">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <button onClick={() => toggleHabit(habit.id)} className={`shrink-0 w-5 h-5 rounded-md flex items-center justify-center border transition-all ${isCompletedToday ? 'bg-pink-100 border-pink-300 text-pink-500 dark:bg-pink-500/20 dark:border-pink-500/50 dark:text-pink-400 dark:shadow-[0_0_8px_rgba(236,72,153,0.4)]' : 'bg-slate-200 border-slate-300 dark:bg-black/20 dark:border-white/10 text-transparent hover:border-pink-300 dark:hover:border-pink-500/50'}`}>
                          <CheckCircle className="w-3 h-3" strokeWidth={3} />
                        </button>
                        <span className={`text-sm font-medium truncate ${isCompletedToday ? 'text-slate-400 dark:text-gray-400 line-through' : 'text-slate-700 dark:text-gray-200'}`}>{habit.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-orange-600 bg-orange-100 border-orange-200 dark:text-orange-400 dark:bg-orange-400/10 px-2 py-1 rounded-md border dark:border-orange-400/20 dark:shadow-[0_0_5px_rgba(251,146,60,0.2)]">
                          <Flame className="w-3 h-3" /> {habit.streak}
                        </div>
                        <button onClick={() => deleteHabit(habit.id)} className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-500/20 dark:text-gray-500 dark:hover:text-red-400 transition-all">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )
                })}
                {habits.length === 0 && (
                  <p className="text-xs text-center text-slate-400 dark:text-gray-500 py-4">No habits added yet.</p>
                )}
              </div>
            </div>

          </div>

          {/* Center Column: Tasks (5 cols) */}
          <div className="lg:col-span-5 flex flex-col bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-lg overflow-hidden h-full min-h-[600px]">
            <div className="p-6 border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-transparent dark:bg-gradient-to-r dark:from-white/[0.02] dark:to-transparent flex-shrink-0">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2 transition-all">
                <CheckSquare className="w-5 h-5 text-indigo-500 dark:text-indigo-400" /> {displayDateStr}
              </h2>
              <form onSubmit={addTask} className="space-y-3">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-400"><Plus className="w-4 h-4" /></div>
                  <input 
                    type="text" 
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="What needs to be done?" 
                    className="w-full bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-400 dark:placeholder:text-gray-500"
                  />
                </div>
                <div className="flex gap-2">
                  <select value={newTaskCategory} onChange={e=>setNewTaskCategory(e.target.value)} className="bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 outline-none flex-1">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select value={newTaskPriority} onChange={e=>setNewTaskPriority(e.target.value)} className="bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 outline-none w-28">
                    {PRIORITIES.map(p => <option key={p} value={p}>{p} Priority</option>)}
                  </select>
                  <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-sm dark:shadow-[0_0_10px_rgba(99,102,241,0.3)]">Add</button>
                </div>
              </form>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {displayedTasks.map(task => (
                <div 
                  key={task.id} 
                  className={`group flex items-center p-4 rounded-xl border transition-all duration-300 hover:translate-x-1 ${
                    task.status === 'Done'
                      ? 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/5 opacity-60'
                      : 'bg-white dark:bg-black/20 border-slate-200 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-500/30 hover:bg-slate-50 dark:hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="mr-3 text-slate-300 dark:text-gray-600 cursor-grab active:cursor-grabbing hover:text-slate-500 dark:hover:text-gray-400 transition-colors">
                    <GripVertical className="w-4 h-4" />
                  </div>
                  
                  <button onClick={() => toggleTaskStatus(task.id)} className="mr-4 text-slate-400 dark:text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors focus:outline-none">
                    {task.status === 'Done' 
                      ? <CheckCircle className="w-5 h-5 text-emerald-500 dark:text-emerald-400 dark:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" /> 
                      : <Circle className="w-5 h-5" />
                    }
                  </button>
                  
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className={`font-semibold text-sm truncate transition-all duration-300 ${task.status === 'Done' ? 'text-slate-500 dark:text-gray-500 line-through' : 'text-slate-800 dark:text-gray-200'}`}>
                      {task.title}
                    </span>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[10px] font-bold uppercase tracking-wider">
                      <span className="flex items-center text-slate-500 dark:text-gray-500">
                        <Clock className="w-3 h-3 mr-1" /> {task.time}
                      </span>
                      <span className={`flex items-center px-1.5 py-0.5 rounded border ${getCategoryColor(task.category)}`}>
                        {getCategoryIcon(task.category)} {task.category}
                      </span>
                      <span className={`flex items-center px-1.5 py-0.5 rounded border ${getPriorityStyles(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                    <button onClick={() => removeTask(task.id)} className="p-2 text-slate-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {displayedTasks.length === 0 && (
                <div className="h-40 flex flex-col items-center justify-center text-slate-400 dark:text-gray-500">
                  <CheckSquare className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-sm font-medium">No tasks for this day. Plan ahead!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: AI Suggestions & Analytics (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* AI Suggestions */}
            <div className="bg-indigo-50 dark:bg-transparent dark:bg-gradient-to-br dark:from-indigo-500/10 dark:to-purple-500/10 backdrop-blur-xl rounded-2xl p-6 border border-indigo-100 dark:border-indigo-500/20 shadow-sm dark:shadow-[0_0_20px_rgba(99,102,241,0.1)] relative overflow-hidden group min-h-[180px]">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 dark:bg-purple-500/20 blur-2xl rounded-full group-hover:bg-purple-500/20 dark:group-hover:bg-purple-500/30 transition-colors"></div>
              <div className="flex justify-between items-center mb-4 relative z-10">
                 <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                   <Sparkles className="w-4 h-4 text-purple-500 dark:text-purple-400" /> AI Insights
                 </h3>
                 {isGeneratingInsights && <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />}
              </div>
              <div className="space-y-3 relative z-10">
                {aiInsights.tips.length > 0 && aiInsights.lastDate === selectedDateStr ? aiInsights.tips.map((tip, idx) => (
                    <div key={idx} className="bg-white dark:bg-black/20 border border-indigo-100 dark:border-white/5 rounded-xl p-3 text-sm hover:border-indigo-300 dark:hover:border-indigo-500/30 hover:bg-indigo-50 dark:hover:bg-white/5 transition-colors cursor-pointer shadow-sm dark:shadow-none">
                      <p className="font-semibold text-slate-800 dark:text-white mb-1">{tip.title}</p>
                      <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">{tip.desc}</p>
                    </div>
                )) : !isGeneratingInsights && (
                    <div className="text-center py-6 text-slate-400 dark:text-gray-500">
                        <p className="text-xs font-medium mb-2">No dynamic insights available for {isSelectedToday ? 'today' : 'this date'}.</p>
                        <button onClick={() => generateInsights(selectedDateStr)} className="text-xs text-indigo-500 hover:underline">Generate Now</button>
                    </div>
                )}
              </div>
            </div>

            {/* Weekly Analytics Chart */}
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-lg flex-1 min-h-[250px] flex flex-col">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Weekly Activity
              </h3>
              <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={isDarkMode ? "#818cf8" : "#6366f1"} stopOpacity={isDarkMode ? 0.4 : 0.2}/>
                        <stop offset="95%" stopColor={isDarkMode ? "#818cf8" : "#6366f1"} stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={isDarkMode ? "#22d3ee" : "#06b6d4"} stopOpacity={isDarkMode ? 0.4 : 0.2}/>
                        <stop offset="95%" stopColor={isDarkMode ? "#22d3ee" : "#06b6d4"} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} vertical={false} />
                    <XAxis dataKey="name" stroke={isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"} fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke={isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"} fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: isDarkMode ? 'rgba(15,17,26,0.9)' : 'rgba(255,255,255,0.9)', borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', borderRadius: '12px', fontSize: '12px' }}
                      itemStyle={{ color: isDarkMode ? '#fff' : '#0f172a' }}
                    />
                    <Area type="monotone" dataKey="hours" name="Study Hours" stroke={isDarkMode ? "#818cf8" : "#6366f1"} strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                    <Area type="monotone" dataKey="tasks" name="Tasks Done" stroke={isDarkMode ? "#22d3ee" : "#06b6d4"} strokeWidth={3} fillOpacity={1} fill="url(#colorTasks)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(150, 150, 150, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(150, 150, 150, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(150, 150, 150, 0.3);
        }
        
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
