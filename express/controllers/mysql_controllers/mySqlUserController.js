import createMySqlConnection from "../../config/mySqlConn.js";
const db = await createMySqlConnection();


const updateUser = async (req, res) => {

    const id = req?.params?.id;
    if (!id) return res.status(400).json({ error: "id parameter requiored" });

    const { username, firstname, lastname, email } = req.body;

    if (!username || !firstname || !lastname || !email) {
        return res.status(400).json({ error: "Something Missing !" });
    }

    try {
        const [updateResult] = await db.query(
            `UPDATE USERS 
            SET username = '${username}', firstname = '${firstname}', lastname = '${lastname}', email = '${email}'  
            WHERE id = '${id}'`);




    } catch (e) {
        console.log(e);
    }

    return res.sendStatus(200);
}


export default { updateUser }