import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaMap, FaBook, FaYoutube, FaCertificate, FaArrowRight } from 'react-icons/fa';

const boxData = [
  { title: 'Frontend', emoji: '🎨', description: 'Create visual and interactive elements of websites and applications.', color: 'blue' },
  { title: 'Backend', emoji: '⚙️', description: 'Build and maintain server-side logic, databases, and core APIs.', color: 'emerald' },
  { title: 'DSA', emoji: '🧩', description: 'Solve complex algorithmic problems and optimize software performance.', color: 'purple' },
  { title: 'AI/ML', emoji: '🤖', description: 'Create systems that learn from data, make decisions, and improve over time.', color: 'orange' },
  { title: 'Data Science', emoji: '📊', description: 'Extract insights and patterns from massive data to drive business innovation.', color: 'indigo' },
  { title: 'Blockchain', emoji: '⛓️', description: 'Develop decentralized systems for secure, transparent, and proof-based transactions.', color: 'cyan' },
  { title: 'Data Analyst', emoji: '📈', description: 'Analyze and interpret raw data to provide actionable business insights.', color: 'teal' },
  { title: 'Dev Ops', emoji: '🚀', description: 'Optimize and automate development workflows for faster, reliable delivery.', color: 'rose' },
  { title: 'UX Design', emoji: '✨', description: 'Design user-centered interfaces that deeply enhance usability and experience.', color: 'pink' },
  { title: 'Android', emoji: '📱', description: 'Build, maintain, and optimize applications for the Android operating system.', color: 'emerald' },
  { title: 'Cybersecurity', emoji: '🛡️', description: 'Protect network systems and sensitive data from cyber threats and vulnerabilities.', color: 'red' },
  { title: 'iOS', emoji: '🍎', description: 'Create and maintain high-performance applications for Apple iOS devices.', color: 'slate' },
];

// Domain-specific links: [Roadmap (roadmap.sh), Resources (W3Schools), YouTube Guide, Get Certified (Infosys Springboard)]
const domainLinks = {
  'Frontend': [
    'https://roadmap.sh/frontend',
    'https://www.w3schools.com/whatis/whatis_frontenddev.asp',
    'https://www.youtube.com/watch?v=zJSY8tbf_ys',
    'https://infyspringboard.onwingspan.com/web/en/app/toc/lex_auth_01353898498498810000_shared/overview'
  ],
  'Backend': [
    'https://roadmap.sh/backend',
    'https://www.w3schools.com/nodejs/',
    'https://www.youtube.com/watch?v=XBu54nfzxAQ',
    'https://infyspringboard.onwingspan.com/web/en/app/toc/lex_auth_01350846697414246498_shared/overview'
  ],
  'DSA': [
    'https://roadmap.sh/datastructures-and-algorithms',
    'https://www.w3schools.com/dsa/',
    'https://www.youtube.com/watch?v=8hly31xKli0',
    'https://infyspringboard.onwingspan.com/web/en/app/toc/lex_auth_01350846528938803252_shared/overview'
  ],
  'AI/ML': [
    'https://roadmap.sh/ai-data-scientist',
    'https://www.w3schools.com/ai/',
    'https://www.youtube.com/watch?v=i_LwzRVP7bg',
    'https://infyspringboard.onwingspan.com/web/en/app/toc/lex_auth_01353899073abornd3837_shared/overview'
  ],
  'Data Science': [
    'https://roadmap.sh/ai-data-scientist',
    'https://www.w3schools.com/datascience/',
    'https://www.youtube.com/watch?v=ua-CiDNNj30',
    'https://infyspringboard.onwingspan.com/web/en/app/toc/lex_auth_01350846866749030448_shared/overview'
  ],
  'Blockchain': [
    'https://roadmap.sh/blockchain',
    'https://www.w3schools.com/python/',
    'https://www.youtube.com/watch?v=gyMwXuJrbJQ',
    'https://infyspringboard.onwingspan.com/web/en/app/toc/lex_auth_01353899549405593620_shared/overview'
  ],
  'Data Analyst': [
    'https://roadmap.sh/data-analyst',
    'https://www.w3schools.com/datascience/',
    'https://www.youtube.com/watch?v=yZvFH7B6gKI',
    'https://infyspringboard.onwingspan.com/web/en/app/toc/lex_auth_01350846866749030448_shared/overview'
  ],
  'Dev Ops': [
    'https://roadmap.sh/devops',
    'https://www.w3schools.com/git/',
    'https://www.youtube.com/watch?v=j5Zsa_eOXeY',
    'https://infyspringboard.onwingspan.com/web/en/app/toc/lex_auth_01353900214530867239_shared/overview'
  ],
  'UX Design': [
    'https://roadmap.sh/ux-design',
    'https://www.w3schools.com/css/',
    'https://www.youtube.com/watch?v=uL2ZB7XXIgg',
    'https://infyspringboard.onwingspan.com/web/en/app/toc/lex_auth_01353900684528025618_shared/overview'
  ],
  'Android': [
    'https://roadmap.sh/android',
    'https://www.w3schools.com/kotlin/',
    'https://www.youtube.com/watch?v=fis26HvvDII',
    'https://infyspringboard.onwingspan.com/web/en/app/toc/lex_auth_01353901139820134417_shared/overview'
  ],
  'Cybersecurity': [
    'https://roadmap.sh/cyber-security',
    'https://www.w3schools.com/cybersecurity/',
    'https://www.youtube.com/watch?v=U_P23SqJaDc',
    'https://infyspringboard.onwingspan.com/web/en/app/toc/lex_auth_01353901573238784016_shared/overview'
  ],
  'iOS': [
    'https://roadmap.sh/ios',
    'https://www.w3schools.com/swift/',
    'https://www.youtube.com/watch?v=09TeUXjzpKs',
    'https://infyspringboard.onwingspan.com/web/en/app/toc/lex_auth_01353901139820134417_shared/overview'
  ],
};

const Roadmap = () => {
  const [selectedBox, setSelectedBox] = useState(null);

  const openPopup = (index) => setSelectedBox(index);
  const closePopup = () => setSelectedBox(null);

  const colorStyles = {
    blue: 'from-blue-500/10 to-transparent group-hover:border-blue-500/50 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/30',
    emerald: 'from-emerald-500/10 to-transparent group-hover:border-emerald-500/50 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30',
    purple: 'from-purple-500/10 to-transparent group-hover:border-purple-500/50 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/30',
    orange: 'from-orange-500/10 to-transparent group-hover:border-orange-500/50 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/30',
    indigo: 'from-indigo-500/10 to-transparent group-hover:border-indigo-500/50 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30',
    cyan: 'from-cyan-500/10 to-transparent group-hover:border-cyan-500/50 bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/30',
    teal: 'from-teal-500/10 to-transparent group-hover:border-teal-500/50 bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-500/30',
    rose: 'from-rose-500/10 to-transparent group-hover:border-rose-500/50 bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/30',
    pink: 'from-pink-500/10 to-transparent group-hover:border-pink-500/50 bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-500/30',
    red: 'from-red-500/10 to-transparent group-hover:border-red-500/50 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30',
    slate: 'from-slate-500/10 to-transparent group-hover:border-slate-500/50 bg-slate-100 dark:bg-slate-500/20 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-500/30',
  };

  const linkTypes = [
    { label: 'View Roadmap', icon: <FaMap />, gradient: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500' },
    { label: 'Resources', icon: <FaBook />, gradient: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500' },
    { label: 'YouTube Guide', icon: <FaYoutube />, gradient: 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500' },
    { label: 'Get Certified', icon: <FaCertificate />, gradient: 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500' }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-72px)] w-full bg-slate-50 dark:bg-[#0A0A0A] text-slate-900 dark:text-white transition-colors duration-500 relative overflow-hidden py-12">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[120px] transition-all duration-700" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-[120px] transition-all duration-700" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 relative flex flex-col">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-semibold text-slate-700 dark:text-gray-300">Curated Learning Paths</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-slate-900 dark:text-white">
            Developer <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 dark:from-blue-400 dark:to-purple-400">
              Roadmaps
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Step-by-step guides, high-quality resources, and industry certifications to master any software engineering stack from scratch.
          </p>
        </div>

        {/* Roadmaps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full mb-12">
          {boxData.map((box, index) => {
            const styles = colorStyles[box.color];
            const gradientBg = styles.split(' ')[0]; // E.g., 'from-blue-500/10'
            const hoverBorder = styles.split(' ')[2]; // E.g., 'group-hover:border-blue-500/50'

            return (
              <div
                key={index}
                onClick={() => openPopup(index)}
                className={`group relative p-6 sm:p-8 rounded-[2rem] bg-white/80 dark:bg-white/5 border border-white/40 dark:border-white/10 ${hoverBorder} hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-500 overflow-hidden flex flex-col shadow-sm hover:shadow-xl dark:shadow-md dark:hover:shadow-2xl backdrop-blur-sm hover:-translate-y-1 cursor-pointer min-h-[240px]`}
              >
                {/* Background Glow on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradientBg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-slate-800 dark:group-hover:text-gray-100 transition-colors">
                    <span className="mr-2">{box.emoji}</span>{box.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed font-medium mb-6 flex-grow">
                    {box.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 dark:text-white pb-0.5">Explore Path</span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-300">
                      <FaArrowRight className="text-slate-600 dark:text-white text-xs -rotate-45" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modern Glassmorphic Modal Popup */}
      {selectedBox !== null && (
        <div 
          className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 opacity-100 transition-opacity"
          onClick={closePopup}
        >
          
          <div 
            className="bg-white dark:bg-[#111116] border border-slate-200 dark:border-white/10 p-8 rounded-[2.5rem] max-w-md w-full relative shadow-2xl flex flex-col transform scale-100 transition-transform dark:shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Ambient Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Title & Close */}
            <div className="flex items-start justify-between mb-8 relative z-10">
              <div>
                <p className="text-indigo-600 dark:text-indigo-400 text-sm font-bold tracking-wider uppercase mb-1">Learning Path</p>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white"><span className="mr-2">{boxData[selectedBox].emoji}</span>{boxData[selectedBox].title}</h2>
              </div>
              <button 
                onClick={closePopup}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-500 dark:text-gray-400 transition-colors"
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>

            {/* Links / Resources List */}
            <div className="space-y-4 relative z-10">
              {linkTypes.map((type, idx) => (
                <a 
                  key={idx} 
                  href={domainLinks[boxData[selectedBox].title]?.[idx] || '#'} 
                  className={`group flex items-center justify-between p-4 rounded-2xl text-white ${type.gradient} shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center gap-3 font-semibold text-lg">
                    <span className="text-xl opacity-90">{type.icon}</span>
                    {type.label}
                  </div>
                  <FaArrowRight className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>

          </div>
          
        </div>
      )}
    </div>
  );
};

export default Roadmap;
