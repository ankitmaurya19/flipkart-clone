const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true , 
        trim : true,
        min : 3
    },
    lastName : {
        type : String,
        required : true , 
        trim : true,
        min : 3
    },
    username :{
        type : String,
        required : true,
        unique : true,
        index : true,
        lowercase : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true ,
        lowercase: true
    },
    hashed_password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['user' , 'admin'],
        default : 'user'
    },
    contactNumber : {
        type : Number,
        required : true
    }
} , {timestamps : true});

// userSchema.virtual('password').set(function(password){
//     this.hashed_password = bcrypt.hashSync(password , 12);

// });

userSchema.virtual('fullName').set(function(){
    return `${this.firstName} ${this.lastName}`;
})

userSchema.methods = {
    authenticate : function(password){
        return bcrypt.compare(password, this.hashed_password);
    }
}


module.exports = mongoose.model('User' , userSchema);