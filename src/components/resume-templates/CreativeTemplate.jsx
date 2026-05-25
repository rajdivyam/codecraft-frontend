import React from "react";
import { Mail, Phone, Linkedin, Github, Globe } from "lucide-react";

const CreativeTemplate = ({ resumeData }) => {
  const {
    name,
    lkdn,
    gthb,
    prtf,
    cnt,
    mail,
    intro,
    skillsl1,
    skillsl2,
    skillsl3,
    clgname,
    education,
    grdyear,
    grdyear2,
    experiences,
    projects,
    achievements,
  } = resumeData;

  return (
    <div className="resume-printable text-gray-900 bg-white max-w-4xl mx-auto shadow-sm min-h-[11in] relative">
      
      {/* Decorative sidebar strip */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-indigo-600"></div>

      <div className="pl-16 pr-10 py-12">
        {/* Header Section */}
        <div className="border-b-4 border-indigo-600 pb-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">{name}</h1>
            {intro && <p className="text-indigo-600 font-medium mt-3 text-lg">{intro}</p>}
          </div>
          
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-600">
            {mail && (
              <div className="flex items-center gap-2 justify-end">
                <span>{mail}</span>
                <Mail className="w-4 h-4 text-indigo-600" />
              </div>
            )}
            {cnt && (
              <div className="flex items-center gap-2 justify-end">
                <span>{cnt}</span>
                <Phone className="w-4 h-4 text-indigo-600" />
              </div>
            )}
            <div className="flex gap-3 justify-end mt-1">
              {lkdn && <a href={lkdn} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors"><Linkedin className="w-5 h-5" /></a>}
              {gthb && <a href={gthb} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors"><Github className="w-5 h-5" /></a>}
              {prtf && <a href={prtf} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors"><Globe className="w-5 h-5" /></a>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Experience */}
            {experiences && experiences.length > 0 && experiences.some(e => e.organization || e.role) && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">💼</span> Experience
                </h2>
                <div className="space-y-8">
                  {experiences.map((exp, index) => (
                    (exp.organization || exp.role) && (
                      <div key={index} className="relative">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                          <h3 className="text-xl font-bold text-gray-800">{exp.role}</h3>
                          {exp.duration && <span className="text-indigo-600 font-semibold text-sm">{exp.duration}</span>}
                        </div>
                        <h4 className="text-md font-semibold text-gray-500 uppercase tracking-wider mb-3">{exp.organization}</h4>
                        {exp.responsibilities && <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{exp.responsibilities}</p>}
                      </div>
                    )
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && projects.some(p => p.project || p.value) && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">🚀</span> Projects
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {projects.map((project, index) => (
                    (project.project || project.value) && (
                      <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-indigo-200 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-3">
                          <h3 className="text-lg font-bold text-gray-800">{project.project || project.value}</h3>
                          {project.durn && <span className="text-sm font-medium text-gray-500 bg-white px-2 py-1 rounded shadow-sm">{project.durn}</span>}
                        </div>
                        {project.desc && <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{project.desc}</p>}
                      </div>
                    )
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Side Column */}
          <div className="space-y-10">
            
            {/* Education */}
            {(clgname || education) && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">🎓</span> Education
                </h2>
                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                  {clgname && <h3 className="font-bold text-gray-900 mb-1">{clgname}</h3>}
                  {education && <p className="text-indigo-700 font-medium text-sm mb-3">{education}</p>}
                  {(grdyear || grdyear2) && (
                    <p className="text-gray-500 text-sm font-medium flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                      {grdyear} {grdyear2 ? `- ${grdyear2}` : ''}
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* Skills */}
            {(skillsl1 || skillsl2 || skillsl3) && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">⚡</span> Skills
                </h2>
                <div className="space-y-5">
                  {skillsl1 && (
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Primary</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillsl1.split(',').map((skill, i) => skill.trim() && (
                          <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">{skill.trim()}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {skillsl2 && (
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Secondary</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillsl2.split(',').map((skill, i) => skill.trim() && (
                          <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">{skill.trim()}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {skillsl3 && (
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillsl3.split(',').map((skill, i) => skill.trim() && (
                          <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">{skill.trim()}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Achievements */}
            {achievements && achievements.length > 0 && achievements.some(a => a) && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">🏆</span> Awards
                </h2>
                <ul className="space-y-3">
                  {achievements.map((achievement, index) => (
                    achievement && (
                      <li key={index} className="flex gap-3 text-gray-700 text-sm">
                        <span className="text-indigo-500 shrink-0">❖</span>
                        <span>{achievement}</span>
                      </li>
                    )
                  ))}
                </ul>
              </section>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
