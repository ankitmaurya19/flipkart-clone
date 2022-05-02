
const { Router } = require('express');
const express = require('express');
const { signup, signin } = require('../controllers/user');
const { validateSigninRequests, isValidated, validateSignupRequests } = require('../validators/authorise');
const router = express.Router();

router.post('/signin' , validateSigninRequests , isValidated , signin)

router.post('/signup' , validateSignupRequests , isValidated , signup)

// router.post("/profile" , requiredSignin , function(req , res){
//     console.log("token");
// })

module.exports = router;