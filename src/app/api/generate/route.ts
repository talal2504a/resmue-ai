import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ResumeData } from '@/components/ResumeForm';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function formatResumeMarkdown(data: ResumeData): string {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, awards, volunteer } = data;

  let md = '';

  md += `# ${personalInfo.name || 'Your Name'}\n`;
  md += `## ${personalInfo.title || 'Professional Title'}\n\n`;

  if (personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.linkedin || personalInfo.github || personalInfo.portfolio) {
    md += `**Contact:**`;
    if (personalInfo.email) md += ` ${personalInfo.email}`;
    if (personalInfo.phone) md += ` | ${personalInfo.phone}`;
    if (personalInfo.location) md += ` | ${personalInfo.location}`;
    if (personalInfo.linkedin) md += ` | [LinkedIn](${personalInfo.linkedin})`;
    if (personalInfo.github) md += ` | [GitHub](${personalInfo.github})`;
    if (personalInfo.portfolio) md += ` | [Portfolio](${personalInfo.portfolio})`;
    md += '\n\n';
  }

  if (summary) {
    md += `## Professional Summary\n\n${summary}\n\n`;
  }

  if (experience.length > 0) {
    md += `## Work Experience\n\n`;
    experience.forEach((exp) => {
      md += `### ${exp.title} at ${exp.company}\n`;
      md += `**${exp.duration}**\n\n`;
      md += `${exp.description}\n\n`;
    });
  }

  if (education.length > 0) {
    md += `## Education\n\n`;
    education.forEach((edu) => {
      md += `### ${edu.degree}\n`;
      md += `**${edu.school}** | **${edu.year}**\n\n`;
    });
  }

  if (skills.length > 0) {
    md += `## Skills\n\n${skills.join(' • ')}\n\n`;
  }

  if (projects.length > 0) {
    md += `## Projects\n\n`;
    projects.forEach((proj) => {
      md += `### ${proj.name}\n`;
      if (proj.link) md += `**Link:** [${proj.link}](${proj.link})\n\n`;
      md += `${proj.description}\n\n`;
    });
  }

  if (certifications.length > 0) {
    md += `## Certifications\n\n`;
    certifications.forEach((cert) => {
      md += `- **${cert.name}** — ${cert.issuer} (${cert.date})\n`;
    });
    md += '\n';
  }

  if (languages.length > 0) {
    md += `## Languages\n\n`;
    languages.forEach((lang) => {
      md += `- ${lang.name} (${lang.proficiency})\n`;
    });
    md += '\n';
  }

  if (awards.length > 0) {
    md += `## Awards\n\n`;
    awards.forEach((award) => {
      md += `- **${award.title}** — ${award.issuer} (${award.date})\n`;
    });
    md += '\n';
  }

  if (volunteer.length > 0) {
    md += `## Volunteer Experience\n\n`;
    volunteer.forEach((vol) => {
      md += `### ${vol.role} at ${vol.organization}\n`;
      md += `**${vol.duration}**\n\n`;
      md += `${vol.description}\n\n`;
    });
  }

  return md;
}

async function enhanceWithAI(data: ResumeData, mode: string, aiPrompt?: string, documentType: string = 'resume'): Promise<string> {
  let prompt = '';
  const docLabel = documentType === 'cv' ? 'CV' : 'resume';

  if (mode === 'ai' && aiPrompt) {
    prompt = `You are an expert professional ${docLabel} writer. Based on the following user description, create a professional, well-structured ${docLabel} in Markdown format.

User description:
"${aiPrompt}"

CRITICAL RULES:
1. ONLY use information explicitly provided by the user. NEVER invent fake companies, degrees, jobs, skills, certifications, achievements, dates, or years of experience.
2. If the user does not mention a specific company, degree, or certification, DO NOT create one. Leave that section empty or omit it.
3. Improve wording, organize sections professionally, write strong bullet points using action verbs, and format everything cleanly.
4. Use professional Markdown formatting with clear headers.
5. Keep the tone professional and confident.
6. Do NOT add any fictional details. If information is missing, leave it blank.

${documentType === 'cv'
  ? 'A CV (Curriculum Vitae) is typically longer and more detailed than a resume. Include comprehensive sections for education, experience, skills, projects, certifications, languages, awards, publications, presentations, research, and volunteer work where applicable.'
  : 'A resume is typically 1-2 pages and focused on relevant experience and skills for a specific job. Keep it concise and impactful.'}

Generate the ${docLabel} now:`;
  } else {
    const resumeText = formatResumeMarkdown(data);
    prompt = `You are an expert professional ${docLabel} writer. Take the following ${docLabel} data and improve it:

${resumeText}

CRITICAL RULES:
1. ONLY use the information provided below. NEVER invent fake companies, degrees, jobs, skills, certifications, achievements, dates, or years of experience.
2. Improve wording, make bullet points more impactful with action verbs and quantifiable results where possible.
3. Organize sections professionally with clear hierarchy.
4. Format as clean Markdown.
5. Do NOT add any fictional details.

${documentType === 'cv'
  ? 'This is a CV. Make it comprehensive and detailed, suitable for academic, research, or international applications.'
  : 'This is a resume. Keep it concise and focused, suitable for job applications.'}

Generate the improved ${docLabel}:`;
  }

  const response = await openai.chat.completions.create({
    model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
    messages: [
      { role: 'system', content: 'You are an expert professional resume writer who only uses provided information and never fabricates details.' },
      { role: 'user', content: prompt },
    ],
  });

  return response.choices[0].message.content || formatResumeMarkdown(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { resumeData, mode, aiPrompt, documentType, userId } = body;

    if (!resumeData) {
      return NextResponse.json({ error: 'Missing resume data' }, { status: 400 });
    }

    const resumeText = await enhanceWithAI(resumeData, mode, aiPrompt, documentType);

    // Save to Supabase if user is authenticated
    if (userId && resumeData.personalInfo?.name) {
      const { error } = await supabase.from('resumes').insert({
        user_id: userId,
        name: `${resumeData.personalInfo.name || 'Untitled'} ${documentType === 'cv' ? 'CV' : 'Resume'}`,
        personal_info: resumeData.personalInfo,
        experience: resumeData.experience,
        education: resumeData.education,
        skills: resumeData.skills,
        content: resumeText,
      });

      if (error) {
        console.error('Error saving resume:', error);
      }
    }

    return NextResponse.json({ resume: resumeText });
  } catch (error) {
    console.error('Error generating resume:', error);
    return NextResponse.json({ error: 'Failed to generate resume' }, { status: 500 });
  }
}
