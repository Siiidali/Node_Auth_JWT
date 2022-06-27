const User = require("../models/userModel");


const handleErrors = (err) => {
    let errors = {email: "" , password: ""};

    //duplicate email 
    if(err.code === 11000){
        errors.email = 'that email is alreasy registre' ;
    }

    //validations errors 
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach((e)=>{
            errors[e.properties.path] = e.properties.message ; 
        });
    }
    return errors ; 
};



const signup_get = (req,res)=>{
    res.render('signup');
};

const signup_post = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.create({email,password});
        // 201 : we created this user with success .
       res.status(201).json(user);
    } catch (error) {
        const err = handleErrors(error);
        res.status(400).json({err});
    }
};

const login_get = (req,res)=>{
    res.render('login');
};

const login_post = (req,res)=>{

};

module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post,
};