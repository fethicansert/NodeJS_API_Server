import createMySqlConnection from "../../config/mySqlConn.js";
const db = await createMySqlConnection();


const updateUser = async (req, res) => {

    const id = req?.params?.id;
    if (!id) return res.status(400).json({ error: "id parameter required" });

    const { username, firstname, lastname, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ error: "username and email required!" });
    }

    try {

        const [currentUser] = await db.query(`select * from users where id = '${id}'`);
        const [checkUsername] = await db.query(`select * from users where username = '${username}'`);

        if (checkUsername[0]?.username !== currentUser[0].username && checkUsername.length === 1) {
            return res.status(400).json({ error: "Username already taken" });
        };

        const [checkEmail] = await db.query(`select * from users where email = '${email}'`);
        if (checkEmail[0]?.email !== currentUser[0].email && checkEmail.length === 1) {
            return res.status(400).json({ error: "Email already taken" });
        }

        const [updateResult] = await db.query(
            `UPDATE USERS SET 
            username = '${username}', 
            firstname = '${firstname}',
            lastname = '${lastname}',
            email = '${email}'  
            WHERE id = '${id}'`);

        if (!updateResult?.affectedRows) return res.status(500).json({ error: "Server Error" });

        return res.status(200).json({ updatedUser: { ...req.body } });

    } catch (e) {
        return res.status(500).json({ error: "Server Error" });
    }


}


export default { updateUser }