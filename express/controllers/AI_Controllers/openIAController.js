import OpenAI from 'openai';
import dotenv from 'dotenv'; // Loads .env file contents into process.env
dotenv.config();

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

const askQuestion = async (req, res) => {
    const { userContent } = req.body;
    const systemPrompt = `You are a team coach.`;
    const chatCompletion = await client.chat.completions.create({
        model: "llama-3.1-70b-versatile",
        messages: [
            { role: 'system', content: systemPrompt },
            { role: "user", content: userContent }
        ],
        temperature: 0.5,
        max_tokens: 128,
    })

    res.json({ message: chatCompletion.choices[0]?.message?.content || "" })
}

export default { askQuestion }

