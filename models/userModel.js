const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'please enter your email'],
        unique: true,
        lowercase: true,
        validate: [isEmail,'Please enter a valid email adresse']
    },
    password: {
        type: String,
        required: [true,'please enter your password'],
        minlength: [6,'Your password is to short']
    }
});

//mongoose hooks 

userSchema.pre('save',function(next){




    next();
})



const User = mongoose.model('user',userSchema);
module.exports = User ;