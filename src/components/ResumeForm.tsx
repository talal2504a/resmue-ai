"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import PhotoUpload from "./PhotoUpload";

interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

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
  link: string;
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
  personalInfo: PersonalInfo;
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
  markdown?: string;
}

type Mode = "manual" | "ai";

export default function ResumeForm({ onGenerate, documentType }: { onGenerate: (data: ResumeData) => void; documentType: "resume" | "cv" }) {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [mode, setMode] = useState<Mode>("manual");
  const [aiPrompt, setAiPrompt] = useState("");
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });
  const [summary, setSummary] = useState("");
  const [experience, setExperience] = useState<Experience[]>([
    { title: "", company: "", duration: "", description: "" },
  ]);
  const [education, setEducation] = useState<Education[]>([
    { degree: "", school: "", year: "" },
  ]);
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [projects, setProjects] = useState<Project[]>([
    { name: "", description: "", link: "" },
  ]);
  const [certifications, setCertifications] = useState<Certification[]>([
    { name: "", issuer: "", date: "" },
  ]);
  const [languages, setLanguages] = useState<Language[]>([
    { name: "", proficiency: "" },
  ]);
  const [awards, setAwards] = useState<Award[]>([
    { title: "", issuer: "", date: "" },
  ]);
  const [volunteer, setVolunteer] = useState<Volunteer[]>([
    { role: "", organization: "", duration: "", description: "" },
  ]);
  const [photo, setPhoto] = useState<string | null>(null);
  const [includePhoto, setIncludePhoto] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isLoading]);

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  const addExperience = () => {
    setExperience([...experience, { title: "", company: "", duration: "", description: "" }]);
  };

  const removeExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    setExperience(updated);
  };

  const addEducation = () => {
    setEducation([...education, { degree: "", school: "", year: "" }]);
  };

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    setEducation(updated);
  };

  const addSkill = () => {
    if (currentSkill.trim()) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const addProject = () => {
    setProjects([...projects, { name: "", description: "", link: "" }]);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const addCertification = () => {
    setCertifications([...certifications, { name: "", issuer: "", date: "" }]);
  };

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const updateCertification = (index: number, field: keyof Certification, value: string) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], [field]: value };
    setCertifications(updated);
  };

  const addLanguage = () => {
    setLanguages([...languages, { name: "", proficiency: "" }]);
  };

  const removeLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const updated = [...languages];
    updated[index] = { ...updated[index], [field]: value };
    setLanguages(updated);
  };

  const addAward = () => {
    setAwards([...awards, { title: "", issuer: "", date: "" }]);
  };

  const removeAward = (index: number) => {
    setAwards(awards.filter((_, i) => i !== index));
  };

  const updateAward = (index: number, field: keyof Award, value: string) => {
    const updated = [...awards];
    updated[index] = { ...updated[index], [field]: value };
    setAwards(updated);
  };

  const addVolunteer = () => {
    setVolunteer([...volunteer, { role: "", organization: "", duration: "", description: "" }]);
  };

  const removeVolunteer = (index: number) => {
    setVolunteer(volunteer.filter((_, i) => i !== index));
  };

  const updateVolunteer = (index: number, field: keyof Volunteer, value: string) => {
    const updated = [...volunteer];
    updated[index] = { ...updated[index], [field]: value };
    setVolunteer(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setElapsedSeconds(0);
    setIsLoading(true);

    const data: ResumeData = {
      personalInfo,
      summary,
      experience: experience.filter((exp) => exp.title || exp.company),
      education: education.filter((edu) => edu.degree || edu.school),
      skills,
      projects: projects.filter((p) => p.name || p.description),
      certifications: certifications.filter((c) => c.name || c.issuer),
      languages: languages.filter((l) => l.name),
      awards: awards.filter((a) => a.title || a.issuer),
      volunteer: volunteer.filter((v) => v.role || v.organization),
      photo,
      includePhoto,
      documentType,
    };

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData: data, mode, aiPrompt, documentType, userId: user?.id }),
      });

      if (!response.ok) throw new Error("Failed to generate resume");

      const result = await response.json();
      onGenerate({ ...data, markdown: result.resume });
      addToast(`${documentType === "cv" ? "CV" : "Resume"} generated successfully!`, "success");
    } catch (error) {
      console.error("Error:", error);
      addToast("Failed to generate resume. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";
  const cardClass = "bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Mode Toggle */}
      <div className={`${cardClass}`}>
        <div className="flex rounded-xl border border-gray-200 overflow-hidden">
          <button
            type="button"
            onClick={() => setMode("manual")}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              mode === "manual" ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Fill Manually
          </button>
          <button
            type="button"
            onClick={() => setMode("ai")}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              mode === "ai" ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Generate with AI
          </button>
        </div>
      </div>

      {mode === "ai" && (
        <div className={`${cardClass}`}>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Describe Yourself</h2>
          <p className="text-sm text-gray-600 mb-4">
            Tell us about yourself, your experience, education, and skills. The AI will create a professional CV for you.
          </p>
          <textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            rows={6}
            className={inputClass}
            placeholder="Example: I am a frontend developer with 2 years of experience in React and Next.js. I have built an e-commerce website and a dashboard. I graduated with a BSc in Computer Science in 2022..."
            required={mode === "ai"}
          />
          <p className="text-xs text-gray-500 mt-2">
            The AI will use only the information you provide. It will never invent fake companies, degrees, jobs, or achievements.
          </p>
        </div>
      )}

      {mode === "manual" && (
        <>
          {/* Personal Information */}
          <div className={cardClass}>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Full Name</label>
                <input type="text" value={personalInfo.name} onChange={(e) => updatePersonalInfo("name", e.target.value)} className={inputClass} placeholder="John Doe" />
              </div>
              <div>
                <label className={labelClass}>Professional Title</label>
                <input type="text" value={personalInfo.title} onChange={(e) => updatePersonalInfo("title", e.target.value)} className={inputClass} placeholder="Software Engineer" />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" value={personalInfo.email} onChange={(e) => updatePersonalInfo("email", e.target.value)} className={inputClass} placeholder="john@example.com" />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input type="tel" value={personalInfo.phone} onChange={(e) => updatePersonalInfo("phone", e.target.value)} className={inputClass} placeholder="+1 (555) 000-0000" />
              </div>
              <div>
                <label className={labelClass}>Location</label>
                <input type="text" value={personalInfo.location} onChange={(e) => updatePersonalInfo("location", e.target.value)} className={inputClass} placeholder="New York, NY" />
              </div>
              <div>
                <label className={labelClass}>LinkedIn</label>
                <input type="url" value={personalInfo.linkedin} onChange={(e) => updatePersonalInfo("linkedin", e.target.value)} className={inputClass} placeholder="https://linkedin.com/in/johndoe" />
              </div>
              <div>
                <label className={labelClass}>GitHub</label>
                <input type="url" value={personalInfo.github} onChange={(e) => updatePersonalInfo("github", e.target.value)} className={inputClass} placeholder="https://github.com/johndoe" />
              </div>
              <div>
                <label className={labelClass}>Portfolio</label>
                <input type="url" value={personalInfo.portfolio} onChange={(e) => updatePersonalInfo("portfolio", e.target.value)} className={inputClass} placeholder="https://johndoe.com" />
              </div>
            </div>

            <div className="mt-6">
              <label className={labelClass}>Professional Summary</label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={4}
                className={inputClass}
                placeholder="Write a brief professional summary..."
              />
            </div>
          </div>

          {/* Work Experience */}
          <div className={cardClass}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Work Experience</h2>
              <button type="button" onClick={addExperience} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                Add Experience
              </button>
            </div>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className={labelClass}>Job Title</label>
                      <input type="text" value={exp.title} onChange={(e) => updateExperience(index, "title", e.target.value)} className={inputClass} placeholder="Software Engineer" />
                    </div>
                    <div>
                      <label className={labelClass}>Company</label>
                      <input type="text" value={exp.company} onChange={(e) => updateExperience(index, "company", e.target.value)} className={inputClass} placeholder="Google" />
                    </div>
                    <div>
                      <label className={labelClass}>Duration</label>
                      <input type="text" value={exp.duration} onChange={(e) => updateExperience(index, "duration", e.target.value)} className={inputClass} placeholder="2020 - Present" />
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className={labelClass}>Description</label>
                    <textarea value={exp.description} onChange={(e) => updateExperience(index, "description", e.target.value)} rows={3} className={`${inputClass} resize-none`} placeholder="Describe your responsibilities and achievements..." />
                  </div>
                  {experience.length > 1 && (
                    <button type="button" onClick={() => removeExperience(index)} className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className={cardClass}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Education</h2>
              <button type="button" onClick={addEducation} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                Add Education
              </button>
            </div>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                    <div>
                      <label className={labelClass}>Degree</label>
                      <input type="text" value={edu.degree} onChange={(e) => updateEducation(index, "degree", e.target.value)} className={inputClass} placeholder="Bachelor of Science" />
                    </div>
                    <div>
                      <label className={labelClass}>School</label>
                      <input type="text" value={edu.school} onChange={(e) => updateEducation(index, "school", e.target.value)} className={inputClass} placeholder="Stanford University" />
                    </div>
                    <div>
                      <label className={labelClass}>Year</label>
                      <input type="text" value={edu.year} onChange={(e) => updateEducation(index, "year", e.target.value)} className={inputClass} placeholder="2020" />
                    </div>
                  </div>
                  {education.length > 1 && (
                    <button type="button" onClick={() => removeEducation(index)} className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className={cardClass}>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Skills</h2>
            <div className="flex gap-3 mb-5">
              <input
                type="text"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                className={`${inputClass} flex-1`}
                placeholder="Add a skill (e.g., React, Python, Project Management)"
              />
              <button type="button" onClick={addSkill} className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors text-sm font-medium">
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                  {skill}
                  <button type="button" onClick={() => removeSkill(index)} className="text-indigo-400 hover:text-indigo-700">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className={cardClass}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Projects</h2>
              <button type="button" onClick={addProject} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                Add Project
              </button>
            </div>
            <div className="space-y-6">
              {projects.map((proj, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className={labelClass}>Project Name</label>
                      <input type="text" value={proj.name} onChange={(e) => updateProject(index, "name", e.target.value)} className={inputClass} placeholder="E-commerce Website" />
                    </div>
                    <div>
                      <label className={labelClass}>Link</label>
                      <input type="url" value={proj.link} onChange={(e) => updateProject(index, "link", e.target.value)} className={inputClass} placeholder="https://github.com/..." />
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className={labelClass}>Description</label>
                    <textarea value={proj.description} onChange={(e) => updateProject(index, "description", e.target.value)} rows={3} className={`${inputClass} resize-none`} placeholder="Describe the project..." />
                  </div>
                  {projects.length > 1 && (
                    <button type="button" onClick={() => removeProject(index)} className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className={cardClass}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Certifications</h2>
              <button type="button" onClick={addCertification} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                Add Certification
              </button>
            </div>
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                    <div>
                      <label className={labelClass}>Certification Name</label>
                      <input type="text" value={cert.name} onChange={(e) => updateCertification(index, "name", e.target.value)} className={inputClass} placeholder="AWS Certified Developer" />
                    </div>
                    <div>
                      <label className={labelClass}>Issuer</label>
                      <input type="text" value={cert.issuer} onChange={(e) => updateCertification(index, "issuer", e.target.value)} className={inputClass} placeholder="Amazon Web Services" />
                    </div>
                    <div>
                      <label className={labelClass}>Date</label>
                      <input type="text" value={cert.date} onChange={(e) => updateCertification(index, "date", e.target.value)} className={inputClass} placeholder="2023" />
                    </div>
                  </div>
                  {certifications.length > 1 && (
                    <button type="button" onClick={() => removeCertification(index)} className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className={cardClass}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Languages</h2>
              <button type="button" onClick={addLanguage} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                Add Language
              </button>
            </div>
            <div className="space-y-6">
              {languages.map((lang, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className={labelClass}>Language</label>
                      <input type="text" value={lang.name} onChange={(e) => updateLanguage(index, "name", e.target.value)} className={inputClass} placeholder="English" />
                    </div>
                    <div>
                      <label className={labelClass}>Proficiency</label>
                      <input type="text" value={lang.proficiency} onChange={(e) => updateLanguage(index, "proficiency", e.target.value)} className={inputClass} placeholder="Native / Fluent / Intermediate" />
                    </div>
                  </div>
                  {languages.length > 1 && (
                    <button type="button" onClick={() => removeLanguage(index)} className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div className={cardClass}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Awards</h2>
              <button type="button" onClick={addAward} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                Add Award
              </button>
            </div>
            <div className="space-y-6">
              {awards.map((award, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                    <div>
                      <label className={labelClass}>Award Title</label>
                      <input type="text" value={award.title} onChange={(e) => updateAward(index, "title", e.target.value)} className={inputClass} placeholder="Best Employee of the Year" />
                    </div>
                    <div>
                      <label className={labelClass}>Issuer</label>
                      <input type="text" value={award.issuer} onChange={(e) => updateAward(index, "issuer", e.target.value)} className={inputClass} placeholder="Company Name" />
                    </div>
                    <div>
                      <label className={labelClass}>Date</label>
                      <input type="text" value={award.date} onChange={(e) => updateAward(index, "date", e.target.value)} className={inputClass} placeholder="2023" />
                    </div>
                  </div>
                  {awards.length > 1 && (
                    <button type="button" onClick={() => removeAward(index)} className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Volunteer Experience */}
          <div className={cardClass}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Volunteer Experience</h2>
              <button type="button" onClick={addVolunteer} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                Add Volunteer
              </button>
            </div>
            <div className="space-y-6">
              {volunteer.map((vol, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className={labelClass}>Role</label>
                      <input type="text" value={vol.role} onChange={(e) => updateVolunteer(index, "role", e.target.value)} className={inputClass} placeholder="Volunteer Teacher" />
                    </div>
                    <div>
                      <label className={labelClass}>Organization</label>
                      <input type="text" value={vol.organization} onChange={(e) => updateVolunteer(index, "organization", e.target.value)} className={inputClass} placeholder="Charity Name" />
                    </div>
                    <div>
                      <label className={labelClass}>Duration</label>
                      <input type="text" value={vol.duration} onChange={(e) => updateVolunteer(index, "duration", e.target.value)} className={inputClass} placeholder="2021 - Present" />
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className={labelClass}>Description</label>
                    <textarea value={vol.description} onChange={(e) => updateVolunteer(index, "description", e.target.value)} rows={3} className={`${inputClass} resize-none`} placeholder="Describe your volunteer work..." />
                  </div>
                  {volunteer.length > 1 && (
                    <button type="button" onClick={() => removeVolunteer(index)} className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Profile Picture */}
      <div className={cardClass}>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Picture</h2>
        <p className="text-sm text-gray-600 mb-4">Would you like to include a profile picture on your CV?</p>
        <div className="flex gap-3 mb-5">
          <button
            type="button"
            onClick={() => setIncludePhoto(true)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-colors ${
              includePhoto ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => { setIncludePhoto(false); setPhoto(null); }}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-colors ${
              !includePhoto ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            No
          </button>
        </div>
        {includePhoto && <PhotoUpload photo={photo} onPhotoChange={setPhoto} />}
      </div>

      {/* Submit */}
      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-indigo-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Generating... {elapsedSeconds}s
            </>
          ) : (
            `Generate ${documentType === "cv" ? "CV" : "Resume"}`
          )}
        </button>
      </div>
    </form>
  );
}
