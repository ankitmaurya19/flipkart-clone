const express = require('express');
const { Router } = require('express');
const { requiredSignin , adminMiddleware } = require('../common-middleware');
const { createProduct } = require('../controllers/product');
const multer = require('multer');
const shortid = require('shortid');

const router = express.Router();

const Product = require('../models/product');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage });


router.post('/product/create' , requiredSignin , adminMiddleware , upload.array('ProductImage') , createProduct);


module.exports = router;