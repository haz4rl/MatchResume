import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate-resume", async (req, res) => {
  try {
    const { name, email, jobTitle, company } = req.body;

    if (!name || !email || !jobTitle || !company) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    
    const resumeResponse = await client.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [
        { role: "system", content: "You are a resume generator." },
        {
          role: "user",
          content: `Generate a professional resume for ${name} (email: ${email}), applying for the role of ${jobTitle} at ${company}. Include skills, achievements, and relevant experience.`,
        },
      ],
      temperature: 0.7,
    });

    const tailoredResume = resumeResponse.choices[0].message.content || "";

    
    const coverResponse = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a cover letter generator." },
        {
          role: "user",
          content: `Write a compelling cover letter for ${name}, applying for the ${jobTitle} role at ${company}. Highlight relevant skills, enthusiasm, and motivation.`,
        },
      ],
      temperature: 0.7,
    });

    const coverLetter = coverResponse.choices[0].message.content || "";

    
    res.status(200).json({
      name,
      email,
      jobTitle,
      company,
      tailoredResume,
      coverLetter,
      matchScore: Math.floor(Math.random() * 21) + 80, // random 80-100
    });
  } catch (error) {
    console.error("Resume generation failed:", error);
    res.status(500).json({ error: "Failed to generate documents" });
  }
});


const PORT = process.env.PORT || 5500;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
