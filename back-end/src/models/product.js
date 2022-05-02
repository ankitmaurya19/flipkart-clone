const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
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
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true,
        trim : true
    },
    quantity : {
        type : Number,
        required : true
    },
    offer : {Number},
    productImage : [
        {img : String}
    ],
    category : {type : mongoose.Schema.Types.ObjectId, ref : "Category" , required : true},
    reviews : [{
        userId : {type : mongoose.Schema.Types.ObjectId, ref: 'User'},
        review : String
    }],
    createdBy : {type : mongoose.Schema.Types.ObjectId, ref : 'User' , required : true},
    updatedAt : Date


} , {timestamps : true});

module.exports = mongoose.model('Product' , productsSchema);;