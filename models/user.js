
const mongoose = require('mongoose');

//Schema for user data
const userSchema = new mongoose.Schema({
    
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,},
    email:{
        type: String,
        required: true,
        unique: true,
    },
    jobTitle:{
        type: String,
    },
    gender:{
        type: String,
    },
},
{timestamps :true}
)
//Model for user data
const User = mongoose.model('users', userSchema);
module.exports = User;