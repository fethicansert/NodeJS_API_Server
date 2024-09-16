import User from "../../model/User.js";
import bcrypt from 'bcrypt'

const newUserHandler = async (req, res) => {
    const { user, pwd, email } = req.body;

    if (!user || !pwd || !email) return res.status(400).json({ "error": "Something missing !." });

    // check for duplicate username in the database
    const duplicate = await User.findOne({ username: user }).exec() // exec() for execute 
    if (duplicate) return res.status(409).json({ message: "Username already exist" });

    try {
        //encyrpt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the user
        const result = await User.create({
            "username": user,
            "password": hashedPwd,
            "email": email
        });

        console.log(result);

        res.sendStatus(201);

    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
};

export default newUserHandler 
