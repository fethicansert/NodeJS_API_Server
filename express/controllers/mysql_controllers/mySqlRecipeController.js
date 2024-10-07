import { json } from "express";
import createMySqlConnection from "../../config/mySqlConn.js";
const db = await createMySqlConnection();



export const getUserRecipes = async (req, res) => {

    //check if param exists
    const idParam = req?.params?.id;
    if (!idParam) return res.status(400).json({ error: "id parameter requiored" })

    try {
        const [userRecipes] = await db.query(`SELECT * FROM user_recipes where user_id = ${idParam} `);
        return res.status(200).json({ userRecipes: userRecipes });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ error: "Server error !" })
    }

}


export const addRecipe = async (req, res) => {
    //destructure body to get datas
    const { recipe_name, ingredients, instructions, cookingTime, serve, userId } = req.body;

    //check if recipe is valid
    if (!recipe_name || !ingredients || !instructions || !cookingTime || !serve) return res.status(400).json({ error: "Someting missing !" });

    //Parse ingredient objects to json string
    const stringIngredients = JSON.stringify(ingredients);

    try {
        //chek if recipe already in the MysqlDB
        const [checkRecipe] = await db.query(`SELECT * FROM user_recipes WHERE recipe_name = '${recipe_name}'`);

        //if recipe in MySqlDB send error
        if (checkRecipe.length) return res.status(409).json({ error: "Already in the MysqlDB" });

        //insert recipe in db with user_id
        await db.query("INSERT INTO user_recipes SET ?",
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



