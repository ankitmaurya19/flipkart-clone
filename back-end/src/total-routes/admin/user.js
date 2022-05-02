
const { Router } = require('express');
const express = require('express');
const { signup, signin} = require('../../controllers/admin/user');
const { validateSigninRequests, isValidated, validateSignupRequests } = require('../../validators/authorise');
const router = express.Router();

router.post('/admin/signin' , validateSigninRequests , isValidated , signin)

router.post('/admin/signup' , validateSignupRequests , isValidated , signup)


module.exports = router;