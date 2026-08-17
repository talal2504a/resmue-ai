"use client";

import { ResumeData } from "./ModernTemplate";

interface TemplateProps {
  data: ResumeData;
  photo: string | null;
  includePhoto: boolean;
}

export function ClassicTemplate({ data, photo, includePhoto }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, awards, volunteer } = data;

  return (
    <div className="min-h-[1100px] bg-white text-gray-900 font-serif text-sm leading-relaxed">
      <header className="border-b-4 border-gray-800 pb-6 mb-6">
        <div className="flex items-start gap-6">
          {includePhoto && photo && (
            <img src={photo} alt={personalInfo.name} className="w-28 h-28 object-cover border-2 border-gray-800" />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{personalInfo.name || "Your Name"}</h1>
            <p className="text-xl font-medium text-gray-700 mb-3">{personalInfo.title || "Professional Title"}</p>
            <div className="flex flex-wrap gap-3 text-xs text-gray-600 font-sans">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.location && <span>• {personalInfo.location}</span>}
              {personalInfo.linkedin && <span>• LinkedIn</span>}
              {personalInfo.github && <span>• GitHub</span>}
              {personalInfo.portfolio && <span>• Portfolio</span>}
            </div>
          </div>
        </div>
      </header>

      {summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3 text-gray-800">
            Professional Summary
          </h2>
          <p className="text-gray-700">{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3 text-gray-800">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{exp.title}</h3>
                  <span className="text-xs text-gray-600 font-sans">{exp.duration}</span>
                </div>
                <p className="font-medium text-gray-800 mb-1">{exp.company}</p>
                <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3 text-gray-800">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <span className="text-xs text-gray-600 font-sans">{edu.year}</span>
                </div>
                <p className="text-gray-700">{edu.school}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3 text-gray-800">
            Skills
          </h2>
          <p className="text-gray-700">{skills.join(" • ")}</p>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3 text-gray-800">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj, i) => (
              <div key={i}>
                <h3 className="font-bold text-gray-900">{proj.name}</h3>
                <p className="text-gray-700">{proj.description}</p>
                {proj.link && <p className="text-xs text-gray-600 font-sans">{proj.link}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3 text-gray-800">
            Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert, i) => (
              <div key={i}>
                <h3 className="font-bold text-gray-900">{cert.name}</h3>
                <p className="text-xs text-gray-600 font-sans">{cert.issuer} • {cert.date}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {languages.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3 text-gray-800">
            Languages
          </h2>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang, i) => (
              <span key={i} className="text-gray-700">
                {lang.name} <span className="text-gray-500">({lang.proficiency})</span>
              </span>
            ))}
          </div>
        </section>
      )}

      {awards.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3 text-gray-800">
            Awards
          </h2>
          <div className="space-y-2">
            {awards.map((award, i) => (
              <div key={i}>
                <h3 className="font-bold text-gray-900">{award.title}</h3>
                <p className="text-xs text-gray-600 font-sans">{award.issuer} • {award.date}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {volunteer.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3 text-gray-800">
            Volunteer Experience
          </h2>
          <div className="space-y-3">
            {volunteer.map((vol, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{vol.role}</h3>
                  <span className="text-xs text-gray-600 font-sans">{vol.duration}</span>
                </div>
                <p className="text-gray-700 font-medium">{vol.organization}</p>
                <p className="text-gray-700 whitespace-pre-line">{vol.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
