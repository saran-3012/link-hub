const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    bio: {
        type: String,
        default: ''
    },
    profession: {
        type: String,
        default: ''
    }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;