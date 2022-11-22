const mongoose = require ('mongoose');
const { users } = require('moongose/models');


const userSChema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String
})

const User = mongoose.model('User', userSChema);
module.exports = User;