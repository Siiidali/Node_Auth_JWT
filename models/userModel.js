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

userSchema.pre('save',async function(next){

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

// methode to log in user 

userSchema.statics.login = async function(email,password){
    // 'this' refere to the user Model 
    const user = await this.findOne({email});
    if(user){
        const result = await bcrypt.compare(password,user.password);
        if(result){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};


const User = mongoose.model('user',userSchema);
module.exports = User ;