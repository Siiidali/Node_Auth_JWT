const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const authRequire = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'the auth by me',(err,decodedToken)=>{
            if(err){
                console.log(err);
                res.redirect('/login');
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        res.redirect('/login');
    }
}


const checkUser = (req,res)=>{
    const token = req.cookies.jwt;
    if(token){
        token.verify(token,'the auth by me' , async(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            }else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user ; 
                next();
            }
        })
    }else{
        res.locals.user = null;
        next();
    }
};

module.exports = { authRequire , checkUser };