import createMySqlConnection from "../../config/mySqlConn.js";
import bcrypt from 'bcrypt';
const db = await createMySqlConnection();

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ error: "Something missing !" });

    try {
        const [usernameResult] = await db.query("SELECT username FROM USERS WHERE username = ?", [username]);
        if (usernameResult.length) return res.status(409).json({ error: "The username has already taken!" });

        const [emailResult] = await db.query("SELECT email FROM USERS WHERE email = ?", [email]);
        if (emailResult.length) return res.status(409).json({ error: "The email has already taken" })

        const hashedPassword = await bcrypt.hash(password, 8);
        const [insertResult] = await db.query("INSERT INTO USERS SET ?", { username, email, password: hashedPassword });

        return res.status(201).json({ message: insertResult.insertId });

    } catch (e) {
        console.log(e);
    }

    return res.sendStatus(400);
}

export default register;