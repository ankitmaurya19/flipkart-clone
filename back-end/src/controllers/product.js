
const shortid = require('shortid');
const Product = require('../models/product');
const slugify = require('slugify');


exports.createProduct = function(req , res){
    
    res.send({ file : req.files, body : req.body });
    const {
        name , price , description , quantity , category , createdBy
    } = req.body;

    const productImage = [];
    if(req.files.length() > 0)
    {
        productImage = req.files.map(file => {
            return {img : file.filename};
        });
    }

    const product = new Product({
        name : name,
        slug : slugify(name),
        price,
        description,
        productImage,
        category,
        quantity,
        createdBy : req.user._id
    });
    product.save(function(err , product){
        if(err) {
            res.send(err);
        } else {
            res.send(product);
        }
    })

    
}