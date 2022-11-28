const mongoose = require ('mongoose');
const { users } = require('moongose/models');


const userSChema = new mongoose.Schema({
    firstName:{
        type:String,
        unique: true
    },
    lastName:{
        type:String,
        unique:true
    },
    username: {
        type: String,
        unique: true
    },
    password: String
})

const User = mongoose.model('User', userSChema);
module.exports = User;