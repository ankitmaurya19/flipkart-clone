const Categories = require('../models/categories');
const slugify = require('slugify');

function createCategories(categories , parent = null){

    const categoryList = [];
    let category;
    if(parent === null) {
        category = categories.filter(cat => categories.parent == undefined);
    } else {
        category = categories.filter(cat => cat.parent == parent);
    }

    category.forEach(function(cate){
        categoryList.push({
            _id : categories._id,
            name : categories.name,
            slug : categories.slug,
            children : createCategories(categories , cate._id)
        });
    })

    return categoryList;

};

exports.addCategory = function(req , res){
    
    const categoryObject = {
        name : req.body.name,
        slug : slugify(req.body.name)
    }

    if(req.file) {
        categoryObject.categoryImage = process.env.api+'/public'+ req.file.filename;
    }

    if(req.body.parentId) {
        categoryObject.parentId = req.body.parentId;
    }

    const category = new Categories(categoryObject);
    category.save(function(err , cat){
        if(err) {
            res.send({err});
        } else if (cat) {
            res.send({cat});
        }
    });

}

exports.fetchCategory = function(req , res) {
    Category.find({} , function(err , result){
        if(err) {
            res.send(err) ;
        } else {
            const categoryList = createCategories(result);
            res.send(categoryList);
        }
    })
}