import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();

// ✅ CORS configuration to allow frontend origin and handle preflight
const corsOptions = {
  origin: 'http://localhost:5175', // your frontend dev server
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight requests

app.use(express.json());

const PORT = process.env.PORT || 5000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/generate-resume', async (req, res) => {
  const { name, email, jobTitle, company } = req.body;

  if (!name || !email || !jobTitle || !company) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const prompt = `
Generate a professional resume and cover letter for the following:

Name: ${name}
Email: ${email}
Job Title: ${jobTitle}
Company: ${company}

Return a JSON object with:
{
  "tailoredResume": "...",
  "coverLetter": "...",
  "matchScore": number between 80-100
}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    });

    const content = completion.choices[0].message.content;

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      parsed = {
        tailoredResume: content,
        coverLetter: content,
        matchScore: Math.floor(Math.random() * 21) + 80
      };
    }

    res.json(parsed);
  } catch (err) {
    console.error('Error generating resume:', err);
    res.status(500).json({ error: 'Failed to generate resume.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});