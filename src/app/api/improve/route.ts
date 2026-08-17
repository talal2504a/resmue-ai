import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

export async function POST(req: Request) {
  try {
    const { resume } = await req.json();

    const prompt = `
      Improve the following resume text to make it more professional, impactful, and polished.
      
      Original Resume:
      ${resume}
      
      Please:
      1. Enhance the wording and language to be more professional and impactful
      2. Add strong action verbs and quantifiable achievements
      3. Improve the structure and flow
      4. Fix any grammar or formatting issues
      5. Make it more compelling to recruiters
      
      Return the improved resume text only, without any explanations or markdown formatting.
    `;

    const response = await openai.chat.completions.create({
      model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
      messages: [
        { role: 'system', content: 'You are an expert professional resume writer and editor.' },
        { role: 'user', content: prompt },
      ],
    });

    const improvedResume = response.choices[0].message.content;
    return NextResponse.json({ improvedResume });
  } catch (error) {
    console.error('Error improving resume:', error);
    return NextResponse.json({ error: 'Failed to improve resume' }, { status: 500 });
  }
}
