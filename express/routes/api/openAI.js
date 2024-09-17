import express from 'express'
const router = express.Router();
import openAIController from '../../controllers//AI_Controllers/openIAController.js'


router.route('/')
    .post(openAIController.chat)

export default router

const x = {
    "message": {
        "recipes": [
            {
                "recipe_name": "Chicken Pasta with Tomatoes",
                "ingredients": [
                    { "name": "chicken breast", "quantity": "2", "quantity_unit": "pieces" },
                    { "name": "pasta", "quantity": "2 cups", "quantity_unit": "uncooked" },
                    { "name": "tomatoes", "quantity": "2", "quantity_unit": "medium-sized" },
                    { "name": "olive oil", "quantity": "2 tbsp", "quantity_unit": "—" },
                    { "name": "garlic", "quantity": "2 cloves", "quantity_unit": "—" },
                    { "name": "salt", "quantity": "1 tsp", "quantity_unit": "—" },
                    { "name": "black pepper", "quantity": "1/2 tsp", "quantity_unit": "—" },
                    { "name": "basil", "quantity": "1/4 cup", "quantity_unit": "chopped" }
                ],
                "instructions": [
                    "Cook pasta according to package instructions and set aside.",
                    "Cut chicken breast into bite-sized pieces and set aside.",
                    "Chop tomatoes and set aside.",
                    "In a large skillet, heat olive oil over medium heat.",
                    "Add minced garlic and cook for 1 minute.",
                    "Add chicken and cook until browned.",
                    "Add chopped tomatoes, salt, and black pepper.",
                    "Cook until chicken is cooked through and tomatoes have softened.",
                    "Add cooked pasta and chopped basil to the skillet.",
                    "Toss to combine and serve hot."
                ],
                "cookingTime": "30 minutes",
                "serve": 4
            }
        ]
    }
}