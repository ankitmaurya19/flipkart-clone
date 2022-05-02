const express = require('express');
const { Router } = require('express');
const { requiredSignin, userMiddleware } = require('../common-middleware');
const { addItemsTocart } = require('../controllers/cart');


const router = express.Router();


router.post('/user/cart/addtocart' , requiredSignin , userMiddleware ,addItemsTocart);

module.exports = router;