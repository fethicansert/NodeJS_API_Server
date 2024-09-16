import mongoose from "mongoose"
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001   //if not roles given User defalut => 2001
        },
        Editor: Number,
        Admin: Number
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String,   //not always required and no default value for refresh token 
    questions: {
        type: [String]
    }
});

const User = mongoose.model('User', userSchema);

export default User;