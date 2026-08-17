"use client";

import { ResumeData } from "./ModernTemplate";

interface TemplateProps {
  data: ResumeData;
  photo: string | null;
  includePhoto: boolean;
}

export function MinimalTemplate({ data, photo, includePhoto }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, awards, volunteer } = data;

  return (
    <div className="min-h-[1100px] bg-white text-gray-900 font-sans text-sm leading-relaxed px-12 py-10">
      <header className="mb-10 text-center">
        {includePhoto && photo && (
          <img src={photo} alt={personalInfo.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border border-gray-200" />
        )}
        <h1 className="text-4xl font-light text-gray-900 mb-2">{personalInfo.name || "Your Name"}</h1>
        <p className="text-base font-normal text-gray-600 mb-3">{personalInfo.title || "Professional Title"}</p>
        <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• LinkedIn</span>}
          {personalInfo.github && <span>• GitHub</span>}
          {personalInfo.portfolio && <span>• Portfolio</span>}
        </div>
      </header>

      {summary && (
        <section className="mb-8">
          <p className="text-gray-700 text-center max-w-2xl mx-auto italic">{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-center mb-6 text-gray-400">Experience</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-gray-900">{exp.title}</h3>
                  <span className="text-xs text-gray-500">{exp.duration}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{exp.company}</p>
                <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-center mb-6 text-gray-400">Education</h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {education.map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                  <span className="text-xs text-gray-500">{edu.year}</span>
                </div>
                <p className="text-sm text-gray-600">{edu.school}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-center mb-4 text-gray-400">Skills</h2>
          <div className="max-w-2xl mx-auto flex flex-wrap justify-center gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="text-xs text-gray-600 border border-gray-200 rounded-full px-3 py-1">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-center mb-6 text-gray-400">Projects</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {projects.map((proj, i) => (
              <div key={i}>
                <h3 className="font-medium text-gray-900">{proj.name}</h3>
                <p className="text-sm text-gray-700">{proj.description}</p>
                {proj.link && <p className="text-xs text-gray-500">{proj.link}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-center mb-6 text-gray-400">Certifications</h2>
          <div className="max-w-2xl mx-auto space-y-2">
            {certifications.map((cert, i) => (
              <div key={i} className="text-center">
                <span className="font-medium text-gray-900">{cert.name}</span>
                <span className="text-xs text-gray-500"> — {cert.issuer}, {cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {languages.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-center mb-4 text-gray-400">Languages</h2>
          <div className="max-w-2xl mx-auto flex flex-wrap justify-center gap-3">
            {languages.map((lang, i) => (
              <span key={i} className="text-sm text-gray-700">
                {lang.name} <span className="text-gray-400">({lang.proficiency})</span>
              </span>
            ))}
          </div>
        </section>
      )}

      {awards.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-center mb-6 text-gray-400">Awards</h2>
          <div className="max-w-2xl mx-auto space-y-2">
            {awards.map((award, i) => (
              <div key={i} className="text-center">
                <span className="font-medium text-gray-900">{award.title}</span>
                <span className="text-xs text-gray-500"> — {award.issuer}, {award.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {volunteer.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-center mb-6 text-gray-400">Volunteer Experience</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {volunteer.map((vol, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-gray-900">{vol.role}</h3>
                  <span className="text-xs text-gray-500">{vol.duration}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{vol.organization}</p>
                <p className="text-gray-700 whitespace-pre-line">{vol.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
