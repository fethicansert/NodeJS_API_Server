import createMySqlConnection from "../../config/mySqlConn.js";
const db = await createMySqlConnection();

export const addRecipe = async (req, res) => {
    const recipe = req.body;

    console.log(recipe);


    res.sendStatus(200);
};

