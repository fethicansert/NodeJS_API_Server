import jwt from "jsonwebtoken";
import createMySqlConnection from "../../config/mySqlConn.js";

const db = await createMySqlConnection();

const logout = async (req, res) => {
    const cookies = req.cookies;

    console.log(cookies);
    if (!cookies?.jwt_refresh) return res.sendStatus(204);

    const refreshToken = cookies.jwt_refresh;

    const decoded = jwt.decode(refreshToken);

    try {

        const [result] = await db.query("SELECT * FROM USERS WHERE username = ?", [decoded.username]);

        if (!result.length) {
            res.clearCookie("jwt_refresh", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            return res.sendStatus(204);
        }


        res.clearCookie("jwt_refresh", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ message: `${result[0]?.username} logut.` });


    } catch (e) {
        console.log(e);
    }

}

export default logout;