import Groq from "groq-sdk";
import dotenv from 'dotenv'; // Loads .env file contents into process.env
dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});


export const chat = async (req, res) => {

    const { userContent } = req.body;

    if (!userContent) return res.status(400).json({ message: "No user content recieved" });
   
    const systemContent = `You are a great recipe master. 
                           Prepare a recipe using giving ingredients from user.
                           Please give me the recipe name, ingredients, instructions, cooking time, and serve.`;

    const chatCompletion = await groq.chat.completions.create({
        messages: [
            { role: "system", content: systemContent },
            { role: "user", content: userContent, },
        ],

        response_format: { "type": "text" },
        model: "mixtral-8x7b-32768",

    });
   
    res.json({ message: chatCompletion.choices[0]?.message?.content || "" })
}




export default { chat }
