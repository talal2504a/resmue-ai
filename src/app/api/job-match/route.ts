import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { resume, jobDescription, userId } = await req.json();

    const prompt = `
      Analyze the following resume against the job description and provide a detailed match analysis.
      
      Resume:
      ${resume}
      
      Job Description:
      ${jobDescription}
      
      Provide a JSON response with the following structure:
      {
        "matchScore": 82,
        "matchedSkills": ["React", "JavaScript", "HTML", "CSS"],
        "missingSkills": ["TypeScript", "Docker", "AWS"],
        "keywordGaps": ["leadership", "agile", "ci/cd"],
        "suggestions": [
          "Add TypeScript to your skills section",
          "Include AWS experience or certifications",
          "Highlight leadership and project management experience"
        ]
      }
      
      Be thorough and specific in your analysis.
    `;

    const response = await openai.chat.completions.create({
      model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
      messages: [
        { role: 'system', content: 'You are an expert ATS (Applicant Tracking System) analyst and career coach.' },
        { role: 'user', content: prompt },
      ],
    });

    const content = response.choices[0].message.content;
    const result = JSON.parse(content || '{}');

    // Save to Supabase if user is authenticated
    if (userId) {
      await supabase.from('job_matches').insert({
        user_id: userId,
        job_description: jobDescription,
        match_score: result.matchScore,
        matched_skills: result.matchedSkills,
        missing_skills: result.missingSkills,
        keyword_gaps: result.keywordGaps,
        suggestions: result.suggestions,
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error matching job:', error);
    return NextResponse.json({ error: 'Failed to analyze job match' }, { status: 500 });
  }
}
