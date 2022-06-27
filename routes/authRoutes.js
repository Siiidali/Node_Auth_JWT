const express = require('express');
const authControllers = require('../controllers/authControllers');
const router = express.Router();



router.get('/signup',authControllers.signup_get);
router.get('/login',authControllers.login_get);
router.post('/signup',authControllers.signup_post);
router.post('/login',authControllers.login_post);




module.exports = router ; 