const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    slug : {
        type : String ,
        require : true ,
        unique : true
    },
    categoryImage : String,
    parentId : {
        type : String
    }
} , {timestamps : true});

module.exports = mongoose.model('Category' , categoriesSchema);