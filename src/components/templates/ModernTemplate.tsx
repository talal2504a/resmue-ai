"use client";

interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface Education {
  degree: string;
  school: string;
  year: string;
}

interface Project {
  name: string;
  description: string;
  link?: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

interface Language {
  name: string;
  proficiency: string;
}

interface Award {
  title: string;
  issuer: string;
  date: string;
}

interface Volunteer {
  role: string;
  organization: string;
  duration: string;
  description: string;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  awards: Award[];
  volunteer: Volunteer[];
  photo: string | null;
  includePhoto: boolean;
  documentType: "resume" | "cv";
}

interface TemplateProps {
  data: ResumeData;
  photo: string | null;
  includePhoto: boolean;
  accentColor?: string;
}

export function ModernTemplate({ data, photo, includePhoto, accentColor = "#4f46e5" }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, awards, volunteer } = data;

  return (
    <div className="flex min-h-[1100px] bg-white text-gray-900 font-sans text-sm leading-relaxed">
      {includePhoto && photo && (
        <div className="w-32 flex-shrink-0 flex flex-col items-center border-r border-gray-200 bg-gray-50 p-4">
          <img src={photo} alt={personalInfo.name} className="w-24 h-24 rounded-full object-cover border-2 shadow-sm mb-3" style={{ borderColor: accentColor }} />
        </div>
      )}
      <div className="flex-1 p-8">
        <header className="mb-6 pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{personalInfo.name || "Your Name"}</h1>
          <p className="text-lg font-medium mb-2" style={{ color: accentColor }}>{personalInfo.title || "Professional Title"}</p>
          <div className="flex flex-wrap gap-3 text-xs text-gray-600">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
            {personalInfo.linkedin && <span>• LinkedIn</span>}
            {personalInfo.github && <span>• GitHub</span>}
            {personalInfo.portfolio && <span>• Portfolio</span>}
          </div>
        </header>

        {summary && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>Professional Summary</h3>
            <p className="text-gray-700 text-sm">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>Experience</h3>
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                    <span className="text-xs text-gray-500">{exp.duration}</span>
                  </div>
                  <p className="text-sm font-medium mb-1" style={{ color: accentColor }}>{exp.company}</p>
                  <p className="text-gray-700 text-sm whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>Education</h3>
            <div className="space-y-3">
              {education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                    <span className="text-xs text-gray-500">{edu.year}</span>
                  </div>
                  <p className="text-sm" style={{ color: accentColor }}>{edu.school}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>Projects</h3>
            <div className="space-y-3">
              {projects.map((proj, i) => (
                <div key={i}>
                  <h4 className="font-semibold text-gray-900">{proj.name}</h4>
                  <p className="text-gray-700 text-sm">{proj.description}</p>
                  {proj.link && <p className="text-xs mt-1" style={{ color: accentColor }}>{proj.link}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>Certifications</h3>
            <div className="space-y-2">
              {certifications.map((cert, i) => (
                <div key={i}>
                  <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                  <p className="text-xs text-gray-600">{cert.issuer} • {cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>Languages</h3>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                  {lang.name} <span className="text-gray-500">({lang.proficiency})</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {awards.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>Awards</h3>
            <div className="space-y-2">
              {awards.map((award, i) => (
                <div key={i}>
                  <h4 className="font-semibold text-gray-900">{award.title}</h4>
                  <p className="text-xs text-gray-600">{award.issuer} • {award.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {volunteer.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>Volunteer Experience</h3>
            <div className="space-y-3">
              {volunteer.map((vol, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-semibold text-gray-900">{vol.role}</h4>
                    <span className="text-xs text-gray-500">{vol.duration}</span>
                  </div>
                  <p className="text-sm font-medium mb-1" style={{ color: accentColor }}>{vol.organization}</p>
                  <p className="text-gray-700 text-sm whitespace-pre-line">{vol.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
