import createMySqlConnection from "../../config/mySqlConn.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const db = await createMySqlConnection();

const auth = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Something missing !" });

    try {

        //check if user exist
        const [userResult] = await db.query("SELECT * FROM USERS WHERE username = ?", [username]);
        if (!userResult.length) return res.status(403).json({ error: "Incorrect Username !" });

        //get user password from passwords table
        const [passwordResult] = await db.query("SELECT * FROM passwords WHERE user_id = ?", [userResult[0].id]);

        //copmare request password and user password
        const compare = await bcrypt.compare(password, passwordResult[0].password);
        if (!compare) return res.status(403).json({ error: "Incorrect Password !" });

        const user = userResult[0];
        //if password valid thans create jwt
        const payload = { ...user };

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" });

        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "10d" });

        const x = res.cookie("jwt_refresh", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: false })

        res.status(200).json({ token: accessToken });
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }

}


export default auth;