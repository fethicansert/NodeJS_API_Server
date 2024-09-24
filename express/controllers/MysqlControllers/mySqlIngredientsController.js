import createMySqlConnection from "../../config/mySqlConn.js";
const db = await createMySqlConnection();

const getIngredients = async (req, res) => {
    try {
        //const [result] = await db.query('select * from ingredients');
        const [result] = await db.query('select ingredients.id, ingredients.ingredient_name as name, ingredient_types.type_name as type from ingredients inner join ingredient_types on ingredients.ingredient_type_id = ingredient_types.id');
        if (!result.length) res.status(400).json({ error: "Something went wrong !" });
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: "Something went wrong !" });
    }
}

const getIngredientTypes = async (req, res) => {
    try {
        console.log("Hello");
        const [result] = await db.query('select type_name as type from ingredient_types');
        const types = result.map(item => item.type);

        res.status(200).json(types);
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: "Something went wrong !" });
    }
}


export default { getIngredients, getIngredientTypes }