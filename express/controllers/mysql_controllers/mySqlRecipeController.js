import { json } from "express";
import createMySqlConnection from "../../config/mySqlConn.js";
const db = await createMySqlConnection();



export const getUserRecipes = async (req, res) => {

    //get id parameter from params
    const id = req?.params?.id;

    //check id given if not send error
    if (!id) return res.status(400).json({ error: "id parameter requiored" });

    try {
        //get recipes with given user id
        const [userRecipes] = await db.query(`SELECT * FROM user_recipes where user_id = ${id} `);

        //send success status with message
        return res.status(200).json({ userRecipes: userRecipes });
    } catch (e) {
        console.log(e);
        //if catches error send server error 
        return res.status(400).json({ error: "Server error !" })
    }

}

export const deleteRecipe = async (req, res) => {

    //get id parameter from params
    const id = req?.params?.id;

    //check id given if not send error
    if (!id) return res.status(400).json({ error: "id parameter requiored" });


    try {

        //check if recipe exists;
        const [checkExists] = await db.query(`SELECT * FROM user_recipes WHERE id=${id}`);
        if (!checkExists.length) return res.status(400).json({ error: `Recipe not exists with given id: ${id}` })

        //delete recipe with given recipe id
        const [deleteRecipe] = await db.query(`DELETE FROM user_recipes WHERE id=${id}`);
        console.log(deleteRecipe);

        //send success status with message
        return res.status(200).json({ message: "Recipe Deleted" });
    } catch (e) {
        //if catches error send server error 
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



