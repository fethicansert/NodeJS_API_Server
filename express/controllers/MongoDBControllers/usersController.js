const User = require('../../model/User');
const TrafficSingQuestion = require('../../model/TrafficSingQuestion');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).exec();
        if (!users) return res.json({ message: "No users founeded." });
        res.json(users);
    } catch (err) {
        console.log(err);
    }
}


const addQuestion = async (req, res) => {

    const { user, questionId } = req.body;

    if (!user || !questionId) return res.status(400).json({ error: "Something Missing !" });

    const foundUser = await User.findOne({ username: user }).exec();

    if (!foundUser) return res.sendStatus(401);

    //Check if question already in the users quesitons list
    const duplicate = foundUser.questions.find(currentQuestionID => currentQuestionID === questionId);
    if (duplicate) return res.status(409).json({ error: 'Question alreday in the study list !' });

    try {
        foundUser.questions.push(questionId);
        const result = await foundUser.save();
        console.log(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

    return res.sendStatus(200);
}

const getUserQuestions = async (req, res) => {

    if (!req?.params?.user) return res.status(400).json({ error: 'user parameter required' });

    const user = req.params.user;

    console.log(user);
    try {
        const foundUser = await User.findOne({ username: user }).exec()
        if (!foundUser) return res.sendStatus(401);

        const questionIds = foundUser.questions;
        // let quesitons = [];

        const userQuestions = await TrafficSingQuestion.find({ _id: { $in: questionIds } }).exec();
        res.json(userQuestions);

    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }

}




module.exports = { getAllUsers, addQuestion, getUserQuestions }