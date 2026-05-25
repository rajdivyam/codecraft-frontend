import React from "react";
import { Mail, Phone, Linkedin, Github, Globe, MapPin } from "lucide-react";

const ModernTemplate = ({ resumeData }) => {
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
    <div className="resume-printable text-gray-900 bg-white max-w-4xl mx-auto shadow-sm flex flex-col min-h-[11in]">
      
      {/* Header Profile Section */}
      <div className="bg-slate-800 text-white p-8">
        <h1 className="text-4xl font-light uppercase tracking-wider mb-2">{name}</h1>
        {intro && <p className="text-slate-300 mt-4 leading-relaxed max-w-2xl">{intro}</p>}
      </div>

      {/* Main Content Area - Two Columns */}
      <div className="flex flex-col md:flex-row flex-1">
        
        {/* Left Column (Sidebar) */}
        <div className="w-full md:w-1/3 bg-slate-50 p-8 border-r border-slate-200">
          
          {/* Contact Info */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-800 uppercase tracking-wide border-b-2 border-blue-500 pb-1 mb-4 inline-block">Contact</h2>
            <div className="space-y-3 text-sm text-slate-600">
              {mail && (
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span>{mail}</span>
                </div>
              )}
              {cnt && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <span>{cnt}</span>
                </div>
              )}
              {lkdn && (
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-blue-500" />
                  <a href={lkdn} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">LinkedIn</a>
                </div>
              )}
              {gthb && (
                <div className="flex items-center gap-3">
                  <Github className="w-4 h-4 text-blue-500" />
                  <a href={gthb} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">GitHub</a>
                </div>
              )}
              {prtf && (
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <a href={prtf} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">Portfolio</a>
                </div>
              )}
            </div>
          </div>

          {/* Education */}
          {(clgname || education) && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 uppercase tracking-wide border-b-2 border-blue-500 pb-1 mb-4 inline-block">Education</h2>
              <div className="text-sm">
                {clgname && <p className="font-semibold text-slate-700">{clgname}</p>}
                {education && <p className="text-slate-600 mt-1">{education}</p>}
                {(grdyear || grdyear2) && (
                  <p className="text-slate-500 text-xs mt-1 font-medium">{grdyear} {grdyear2 ? `- ${grdyear2}` : ''}</p>
                )}
              </div>
            </div>
          )}

          {/* Skills */}
          {(skillsl1 || skillsl2 || skillsl3) && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 uppercase tracking-wide border-b-2 border-blue-500 pb-1 mb-4 inline-block">Skills</h2>
              <div className="space-y-4 text-sm text-slate-600">
                {skillsl1 && (
                  <div>
                    <span className="font-semibold text-slate-700 block mb-1">Primary</span>
                    <p>{skillsl1}</p>
                  </div>
                )}
                {skillsl2 && (
                  <div>
                    <span className="font-semibold text-slate-700 block mb-1">Secondary</span>
                    <p>{skillsl2}</p>
                  </div>
                )}
                {skillsl3 && (
                  <div>
                    <span className="font-semibold text-slate-700 block mb-1">Tools & Others</span>
                    <p>{skillsl3}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Main Content) */}
        <div className="w-full md:w-2/3 p-8">
          
          {/* Experience */}
          {experiences && experiences.length > 0 && experiences.some(e => e.organization || e.role) && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 uppercase tracking-wide border-b-2 border-slate-200 pb-2 mb-6 flex items-center gap-2">
                <span className="text-blue-500">◆</span> Professional Experience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  (exp.organization || exp.role) && (
                    <div key={index} className="relative pl-4 border-l-2 border-slate-200">
                      <div className="absolute w-2 h-2 bg-blue-500 rounded-full -left-[5px] top-1.5"></div>
                      <div className="flex flex-wrap justify-between items-baseline mb-1">
                        <h3 className="text-lg font-semibold text-slate-800">{exp.role}</h3>
                        {exp.duration && <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{exp.duration}</span>}
                      </div>
                      <p className="text-blue-600 font-medium mb-2">{exp.organization}</p>
                      {exp.responsibilities && <p className="text-sm text-slate-600 whitespace-pre-wrap">{exp.responsibilities}</p>}
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && projects.some(p => p.project || p.value) && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 uppercase tracking-wide border-b-2 border-slate-200 pb-2 mb-6 flex items-center gap-2">
                <span className="text-blue-500">◆</span> Key Projects
              </h2>
              <div className="space-y-5">
                {projects.map((project, index) => (
                  (project.project || project.value) && (
                    <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <div className="flex flex-wrap justify-between items-baseline mb-2">
                        <h3 className="text-md font-bold text-slate-800">{project.project || project.value}</h3>
                        {project.durn && <span className="text-xs font-medium text-slate-500">{project.durn}</span>}
                      </div>
                      {project.desc && <p className="text-sm text-slate-600 whitespace-pre-wrap">{project.desc}</p>}
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {achievements && achievements.length > 0 && achievements.some(a => a) && (
            <div>
              <h2 className="text-xl font-semibold text-slate-800 uppercase tracking-wide border-b-2 border-slate-200 pb-2 mb-6 flex items-center gap-2">
                <span className="text-blue-500">◆</span> Achievements
              </h2>
              <ul className="list-none space-y-2 text-sm text-slate-600">
                {achievements.map((achievement, index) => (
                  achievement && (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✔</span>
                      <span>{achievement}</span>
                    </li>
                  )
                ))}
              </ul>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
