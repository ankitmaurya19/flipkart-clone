const express = require('express');
const { Router } = require('express');
const { requiredSignin, adminMiddleware } = require('../common-middleware');
const { addCategory, fetchCategory } = require('../controllers/categories');
const multer = require('multer');
const shortid = require('shortid');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage });


router.post('/categories/create' , requiredSignin , adminMiddleware , upload.single('CategoryImg') ,addCategory);
router.get('/categories/getcategory' , fetchCategory);

module.exports = router;