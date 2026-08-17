import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || !text.trim()) {
      return NextResponse.json({ error: 'No text provided', detail: 'Please upload a resume with readable text.' }, { status: 400 });
    }

    const prompt = `
      Analyze the following resume text for AI-generated content indicators.
      
      Resume Text:
      ${text}
      
      Provide:
      1. A score from 0-100 indicating the likelihood of AI-generated content
      2. A list of specific indicators found (e.g., generic wording, repetitive phrasing, uniform writing style, overly formal language)
      3. Recommendations for making the resume more authentic and human-written
      
      Return the response as JSON with the following structure:
      {
        "score": 72,
        "indicators": ["Generic wording", "Repetitive phrasing"],
        "recommendations": "Add more specific personal achievements and use varied sentence structures."
      }
    `;

    const response = await openai.chat.completions.create({
      model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
      messages: [
        { role: 'system', content: 'You are an expert at detecting AI-generated content in resumes.' },
        { role: 'user', content: prompt },
      ],
    });

    const content = response.choices[0].message.content;
    if (!content) {
      return NextResponse.json({ error: 'Empty response from AI', detail: 'The AI returned no analysis. Please try again.' }, { status: 500 });
    }

    try {
      const result = JSON.parse(content);
      return NextResponse.json(result);
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Content:', content);
      return NextResponse.json({ error: 'Invalid AI response', detail: 'Could not parse analysis result. Please try again.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error detecting AI content:', error);
    const message = error instanceof Error ? error.message : 'Failed to analyze resume';
    return NextResponse.json({ error: 'Failed to analyze resume', detail: message }, { status: 500 });
  }
}
