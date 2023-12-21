const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const User = new Schema ({
    _id: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4()
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    DOB: {
        type: Date,
        required: true
    }
})


const UserModel = mongoose.model('users', User);


module.exports = UserModel