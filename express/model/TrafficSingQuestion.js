import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;


//My shcema => 
//TrafficSignQuestion => 
//image(string image url) - choices(arr hold choice schema instances) =>
//choice(obj hold answer text string and isCorrext boolean) => answer => text(string) and isCorrect

const choiceShema = new Schema({
    answer: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    }
});

const traficSingQuestionShema = new Schema({
    image: {
        type: String,
        required: true
    },
    choices: [choiceShema],
    type: {
        type: String,
        required: true
    }
});



export default model('TrafficSignQuestion', traficSingQuestionShema);