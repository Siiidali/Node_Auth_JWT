const express = require('express');
const mongoose= require('mongoose');
const authRoutes = require('./routes/authRoutes');
const { authRequire, checkUser } = require('./middlewares/authMiddlewares');
const cookieParser = require('cookie-parser');
require("dotenv").config();


const app = express();

app.set('view engine' , 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

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
app.get('*',checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies',authRequire, (req, res) => res.render('smoothies'));
app.use(authRoutes);