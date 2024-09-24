import createMySqlConnection from "../config/mySqlConn";

const db = await createMySqlConnection();

const register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ error: "Something missing !" });

    try {
        const [usernameResult] = db.query("SELECT username FROM USERS WHERE username = ?", [username]);
        if (usernameResult) return res.status(409).json({ error: "These username already used" });

        const [emailResult] = db.query("SELECT email FROM USERS WHERE email = ?", [email]);
        if (emailResult) return res.status(409).json({ error: "These email already used" })

        const insert = db.query("INSERT INTO USERS SET ?", { username, email, password });
    } catch (e) {

    }

    res.sendStatus(201);
}

export default register;