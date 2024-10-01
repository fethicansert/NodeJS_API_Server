import { json } from "express";
import createMySqlConnection from "../../config/mySqlConn.js";
const db = await createMySqlConnection();

export const addRecipe = async (req, res) => {
    //destructure body to get datas
    const { recipe_name, ingredients, instructions, cookingTime, serve, userId } = req.body;

    //check if recipe is valid
    if (!recipe_name || !ingredients || !instructions || !cookingTime || !serve) return json.status(400).json({ error: "Someting missing !" });

    //Parse ingredient objects to json string
    const stringIngredients = JSON.stringify(ingredients);

    try {
        //chek if recipe already in the MysqlDB
        const [checkRecipe] = await db.query(`SELECT * FROM user_recipes WHERE recipe_name = '${recipe_name}'`);

        //if recipe in MySqlDB send error
        if (checkRecipe.length) return res.status(409).json({ error: "Already in the MysqlDB" });

        //insert recipe in db with user_id
        const [recipeResult] = await db.query("INSERT INTO user_recipes SET ?",
            {
                recipe_name: recipe_name,
                recipe_ingredients: stringIngredients,
                recipe_cook_time: cookingTime,
                recipe_serve: serve,
                user_id: userId
            });

        //send created status with message
        return res.status(201).json({ message: `${recipe_name} recipe added to user recipe -> MySqlDB` });
    } catch (e) {
        //send error
        return res.status(500).json({ error: "Server Error" });
    }

};

export const getRecipes = (req, res) => {

}

