const express = require('express');
const mongoose= require('mongoose');
require("dotenv").config();


const app = express();
app.set('view engine' , 'ejs');

const dbURL = process.env.URLDB;
mongoose.connect(dbURL,{ useNewUrlParser: true , useUnifiedTopology:true})
.then((result)=>{
    console.log('Connected to database');
    
    // listin to requests
    
    app.listen(3000,(()=>{
        console.log("listining to requests ...");
    }));
}).catch((error)=>{
    console.log(error);
});