import Groq from "groq-sdk";
import dotenv from 'dotenv'; // Loads .env file contents into process.env
dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const schema = {
    recipes: {
        type: "array",
        title: "Recipe List",
        description: "An array of recipe objects",
        items: {
            type: "object",
            title: "Recipe",
            description: "A recipe object",
            properties: {
                recipe_name: {
                    type: "string",
                    title: "Recipe name",
                    description: "The name of recipe"
                },
                ingredients: {
                    type: 'object',
                    description: "An ingredient used in the recipe",
                    properties: {
                        name: {
                            type: "string",
                            description: "The name of ingredient"
                        },
                        quantity: {
                            type: "string",
                            description: "The qunatity of ingredient",
                        },
                        quantity_unit: {
                            type: "string",
                            description: "The qunatity unit of ingredient"
                        }
                    },
                    required: ["name", "quantity", "quantity_unit"]
                },
                instructions: {
                    type: "array",
                    title: "Instruction List",
                    description: "Step-by-step instructions for preparing the recipe",
                    items: {
                        type: "string",
                        description: "A step in the preparation of the recipe"
                    }
                },
                cookingTime: {
                    type: "string",
                    title: "",
                    description: "The cooking time of recipe",
                },
                serve: {
                    type: "integer",
                    title: "The number of servings the recipe yields"
                }
            },
            required: ["recipe_name", "ingredients", "instructions", "cookingTime", "serve"]
        }
    }
}

export const chat = async (req, res) => {

    const { userContent } = req.body;

    if (!userContent) return res.status(400).json({ message: "No user content recieved" });
    const jsonSchema = JSON.stringify(schema, null, 4);

    const systemContent = `You are greate chef who creates recipes.
                           The user will enter food ingredients seperated with commas.
                           You will use these ingredients and create a recipe.
                           Output must in JSON using the schema defined here:${jsonSchema}`;

    const chatCompletion = await groq.chat.completions.create({
        messages: [
            { role: "system", content: systemContent },
            { role: "user", content: userContent, },
        ],

        response_format: { "type": "json_object" },
        model: "mixtral-8x7b-32768",

    });
    const parsedMessage = JSON.parse(chatCompletion.choices[0]?.message?.content);
    res.json({ message: chatCompletion.choices[0]?.message?.content || "" })
}


export default { chat }
