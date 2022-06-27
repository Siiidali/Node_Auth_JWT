const express = require('express');
const mongoose= require('mongoose');
const authRoutes = require('./routes/authRoutes');

require("dotenv").config();


const app = express();

app.set('view engine' , 'ejs');

app.use(express.static('public'));
app.use(express.json());


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

app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);