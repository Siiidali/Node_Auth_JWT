const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { Router } = require("express");

const handleErrors = (err) => {
    let errors = {email: "" , password: ""};

    // incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'that email is not registred '
    }

    // incorrect password
    if(err.message === 'incorrect password'){
        errors.email = 'the password is wrong'
    }

    //duplicate email 
    if(err.code === 11000){
        errors.email = 'that email is alreasy registre' ;
        return errors ;    
    }

    //validations errors 
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach((e)=>{
            errors[e.properties.path] = e.properties.message ; 
        });
    }
    return errors ; 
};


const maxAge = 3*24*60*60 ;

const create_token = (id)=>{
    return jwt.sign({id},"the auth by me",{
        expiresIn: maxAge
    });

};



const signup_get = (req,res)=>{
    res.render('signup');
};



const signup_post = async(req,res)=>{
    const {email,password} = req.body; 
    try {
        const user = await User.create({email,password});
        const tooken = create_token(user._id);
        res.cookie('jwt', tooken ,{httpOnly: true , maxAge: maxAge*1000});
        // 201 : we created this user with success .
       res.status(201).json({user: user._id});
    } catch (error) {
        const err = handleErrors(error);
        res.status(400).json({err});
    }
};

const login_get = (req,res)=>{
    res.render('login');
};

const login_post = async (req,res)=>{
    const {email,password} = req.body;
    try {   
        const user = await User.login(email,password);
        const tooken = create_token(user._id);
        res.cookie('jwt', tooken ,{httpOnly: true , maxAge: maxAge*1000});
        res.status(200).json({user: user._id});
        
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({errors});
    }
};

const lougout_get = (req,res)=>{
    req.cookie('jwt','',{maxAge:1});
    res.redirect('/');
};

module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post,
    lougout_get
};