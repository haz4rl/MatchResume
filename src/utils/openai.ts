import OpenAI from "openai";

// Ensure the API key exists
const apiKey = import.meta.env.REACT_OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("VITE_OPENAI_API_KEY is not defined in your .env file");
}

const client = new OpenAI({
  apiKey:  process.env.REACT_APP_OPENAI_KEY ?? '',
});

export const generateResume = async (data: {
  name: string;
  email: string;
  jobTitle: string;
  company: string;
}) => {
  const prompt = `
Generate a professional resume and cover letter for the following:

Name: ${data.name}
Email: ${data.email}
Job Title: ${data.jobTitle}
Company: ${data.company}

Return JSON in this format:
{
  "tailoredResume": "...",
  "coverLetter": "...",
  "matchScore": number between 80-100
}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.choices[0].message?.content || "";

  try {
    return JSON.parse(text);
  } catch {
    return {
      tailoredResume: text,
      coverLetter: text,
      matchScore: Math.floor(Math.random() * 21) + 80,
    };
  }
};
