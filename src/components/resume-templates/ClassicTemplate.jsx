import React from "react";

const ClassicTemplate = ({ resumeData }) => {
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
    <div className="resume-printable text-gray-900 bg-white p-8 max-w-4xl mx-auto shadow-sm">
      {/* Personal Details */}
      <h1 className="text-3xl font-bold mb-2 text-gray-900">{name}</h1>

      <div className="flex flex-wrap gap-4 text-blue-600">
        {lkdn && <a href={lkdn} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
        {gthb && <a href={gthb} target="_blank" rel="noopener noreferrer">GitHub</a>}
        {prtf && <a href={prtf} target="_blank" rel="noopener noreferrer">Portfolio</a>}
        {cnt && <p className="text-gray-700">Contact: {cnt}</p>}
        {mail && <p className="text-gray-700">Email: {mail}</p>}
      </div>
      <hr className="h-5 mt-2" />
      
      {/* Introduction */}
      {intro && (
        <>
          <section className="my-6">
            <h2 className="text-xl font-bold mb-2">About Me</h2>
            <p>{intro}</p>
          </section>
          <hr />
        </>
      )}
      
      {/* Skills */}
      {(skillsl1 || skillsl2 || skillsl3) && (
        <>
          <section className="my-6">
            <h2 className="text-xl font-bold mb-2">Skills</h2>
            {skillsl1 && <p><strong>Primary:</strong> {skillsl1}</p>}
            {skillsl2 && <p><strong>Secondary:</strong> {skillsl2}</p>}
            {skillsl3 && <p><strong>Other:</strong> {skillsl3}</p>}
          </section>
          <hr />
        </>
      )}
      
      {/* Education */}
      {(clgname || education) && (
        <>
          <section className="my-6">
            <h2 className="text-xl font-bold mb-2">Education</h2>
            {clgname && <p><strong>{clgname}</strong></p>}
            {education && <p>{education}</p>}
            {(grdyear || grdyear2) && (
              <p>{grdyear} {grdyear2 ? `- ${grdyear2}` : ''}</p>
            )}
          </section>
          <hr />
        </>
      )}
      
      {/* Experience */}
      <section className="my-6">
        <h2 className="text-xl font-bold mb-2">Experience</h2>
        {experiences && experiences.length > 0 && experiences.some(e => e.organization || e.role) ? (
          <ul className="list-disc pl-5">
            {experiences.map((exp, index) => (
              (exp.organization || exp.role) && (
                <li key={index} className="mb-4">
                  <strong>{exp.organization}</strong> {exp.role ? `- ${exp.role}` : ''} {exp.duration ? `(${exp.duration})` : ''} <br />
                  {exp.responsibilities && <p className="mt-1 whitespace-pre-wrap">{exp.responsibilities}</p>}
                </li>
              )
            ))}
          </ul>
        ) : (
          <p>No experiences added yet.</p>
        )}
      </section>
      <hr />
      
      {/* Projects */}
      <section className="my-6">
        <h2 className="text-xl font-bold mb-2">Projects</h2>
        {projects && projects.length > 0 && projects.some(p => p.project || p.value) ? (
          <ul className="list-disc pl-5">
            {projects.map((project, index) => (
              (project.project || project.value) && (
                <li key={index} className="mb-4">
                  <strong>{project.project || project.value || ''}</strong>
                  {project.durn && <span> | {project.durn}</span>}
                  <br />
                  {project.desc && <p className="mt-1 whitespace-pre-wrap">{project.desc}</p>}
                </li>
              )
            ))}
          </ul>
        ) : (
          <p>No projects added yet.</p>
        )}
      </section>
      <hr />

      {/* Achievements */}
      <section className="my-6">
        <h2 className="text-xl font-bold mb-2">Achievements</h2>
        {achievements && achievements.length > 0 && achievements.some(a => a) ? (
          <ul className="list-disc pl-5">
            {achievements.map((achievement, index) => (
              achievement && <li key={index} className="mb-1">{achievement}</li>
            ))}
          </ul>
        ) : (
          <p>No achievements added yet.</p>
        )}
      </section>
    </div>
  );
};

export default ClassicTemplate;
