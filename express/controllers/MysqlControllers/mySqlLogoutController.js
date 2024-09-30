import jwt from "jsonwebtoken";
import createMySqlConnection from "../../config/mySqlConn.js";

const db = await createMySqlConnection();

const logout = async (req, res) => {
    const cookies = req.cookies;

    console.log(cookies);
    if (!cookies?.jwt_refresh) return res.sendStatus(204);

    const refreshToken = cookies.jwt_refresh;

    const decoded = jwt.decode(refreshToken);
    console.log(decoded);

    try {

        const [result] = await db.query("SELECT * FROM USERS WHERE username = ?", [decoded.username]);

        if (!result.length) return res.status(400).json({ error: "username not matching!!!" });

        res.clearCookie("jwt_refresh", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.sendStatus(204);

    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }

}

export default logout;