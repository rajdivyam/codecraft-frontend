import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Code, Laptop, Briefcase, Database, Cpu, 
  Shield, Server, Bug, PenTool, Cloud, 
  Layers, Terminal, ArrowRight, Sparkles
} from 'lucide-react';

const roles = [
  {
    name: 'SDE-1',
    badge: 'Fresher',
    description: 'Entry-level software development — DSA, problem solving & coding fundamentals.',
    icon: Code,
    gradient: 'from-blue-500/20 to-indigo-500/20',
    border: 'border-blue-500/30'
  },
  {
    name: 'SDE-2',
    badge: '2–5 YRS',
    description: 'Mid-level role — system design, OOP, and advanced coding patterns.',
    icon: Laptop,
    gradient: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/30'
  },
  {
    name: 'SDE-3',
    badge: '5+ YRS',
    description: 'Senior-level — leadership, architecture decisions & complex problem solving.',
    icon: Briefcase,
    gradient: 'from-indigo-500/20 to-purple-500/20',
    border: 'border-indigo-500/30'
  },
  {
    name: 'Data Analyst',
    badge: 'Analytics',
    description: 'SQL, data wrangling, statistics & business intelligence for analysts.',
    icon: Database,
    gradient: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/30'
  },
  {
    name: 'Data Scientist',
    badge: 'ML / AI',
    description: 'ML algorithms, statistics, Python & real-world data science problems.',
    icon: Sparkles,
    gradient: 'from-teal-500/20 to-emerald-500/20',
    border: 'border-teal-500/30'
  },
  {
    name: 'Cybersecurity Engineer',
    badge: 'Security',
    description: 'Network security, ethical hacking & vulnerability assessment.',
    icon: Shield,
    gradient: 'from-red-500/20 to-orange-500/20',
    border: 'border-red-500/30'
  },
  {
    name: 'DevOps Engineer',
    badge: 'DevOps',
    description: 'CI/CD pipelines, Docker, Kubernetes & cloud infra automation.',
    icon: Server,
    gradient: 'from-orange-500/20 to-yellow-500/20',
    border: 'border-orange-500/30'
  },
  {
    name: 'QA Engineer',
    badge: 'Testing',
    description: 'Automation testing, bug tracking & quality assurance processes.',
    icon: Bug,
    gradient: 'from-amber-500/20 to-orange-500/20',
    border: 'border-amber-500/30'
  },
  {
    name: 'UI/UX Designer',
    badge: 'Design',
    description: 'Design thinking, Figma, prototyping & usability testing.',
    icon: PenTool,
    gradient: 'from-fuchsia-500/20 to-pink-500/20',
    border: 'border-fuchsia-500/30'
  },
  {
    name: 'Cloud Engineer',
    badge: 'Cloud',
    description: 'AWS / Azure, cloud architecture & infrastructure as code.',
    icon: Cloud,
    gradient: 'from-sky-500/20 to-blue-500/20',
    border: 'border-sky-500/30'
  },
  {
    name: 'Machine Learning Engineer',
    badge: 'Deep Learning',
    description: 'Model training, deployment, MLOps & AI product engineering.',
    icon: Cpu,
    gradient: 'from-violet-500/20 to-purple-500/20',
    border: 'border-violet-500/30'
  },
  {
    name: 'Full Stack Developer',
    badge: 'Full Stack',
    description: 'Frontend + backend, APIs, databases & end-to-end application building.',
    icon: Layers,
    gradient: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-500/30'
  },
  {
    name: 'More Roles',
    badge: 'Explore',
    description: 'Explore additional specialized interview tracks.',
    icon: Terminal,
    gradient: 'from-slate-500/20 to-gray-500/20',
    border: 'border-slate-500/30'
  },
];

const InterviewIndex = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white transition-colors duration-200 overflow-x-hidden font-sans">
      {/* Background Glows */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/[0.04] dark:bg-blue-600/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/[0.04] dark:bg-purple-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-bold tracking-wider uppercase mb-6"
          >
            Interview Mastery
          </motion.span>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
            Prepare for Your Next <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
              Tech Interview
            </span>
          </h1>
          
          <p className="text-slate-600 dark:text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Pick your role and practice with curated questions, coding challenges, and expert tips tailored to your specific career path.
          </p>
        </motion.div>

        {/* Role Cards Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24"
        >
          {roles.map((role) => (
            <motion.div
              key={role.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link 
                to={role.name === 'More Roles' ? '/more-interviews' : `/interview/${role.name}`}
                className="block h-full relative"
              >
                <div className={`h-full p-8 rounded-[2rem] bg-white dark:bg-white/[0.03] backdrop-blur-xl border border-slate-200/80 dark:border-white/10 ${role.border} group-hover:border-slate-300 dark:group-hover:border-white/20 hover:shadow-lg dark:hover:shadow-none transition-all duration-500 flex flex-col`}>
                  {/* Glowing Overlay */}
                  <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                  
                  <div className="relative z-10 flex flex-col h-full justify-between flex-grow">
                    <div>
                      <div className="flex items-start justify-between mb-8">
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 group-hover:scale-110 transition-transform duration-500">
                          <role.icon className="w-6 h-6 text-slate-700 dark:text-white" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-gray-400 group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                          {role.badge}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                        {role.name}
                      </h3>
                      
                      <p className="text-slate-600 dark:text-gray-400 group-hover:text-slate-800 dark:group-hover:text-gray-300 transition-colors leading-relaxed mb-8">
                        {role.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold group-hover:gap-4 transition-all">
                      <span>Practice Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl group-hover:from-indigo-600/30 group-hover:to-purple-600/30 transition-all" />
          <div className="relative p-12 md:p-16 rounded-[3rem] bg-white dark:bg-white/[0.02] backdrop-blur-2xl border border-slate-200 dark:border-white/10 text-center overflow-hidden shadow-xl dark:shadow-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
            
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900 dark:text-white">Ready to Land the Offer?</h2>
            <p className="text-slate-600 dark:text-gray-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Join thousands of developers who’ve successfully landed their dream roles using our curated interview prep.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-indigo-600 dark:bg-white text-white dark:text-black font-black rounded-2xl shadow-[0_10px_20px_rgba(79,70,229,0.2)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_10px_30px_rgba(79,70,229,0.4)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all flex items-center gap-3 mx-auto"
            >
              Start Practicing <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InterviewIndex;

