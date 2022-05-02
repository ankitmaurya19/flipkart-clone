
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = function(req , res){

    User.findOne({email : req.body.email} , function(err , result){
        if(err) {
            console.log(err);
            res.send(err);
        } else if(result) {
            res.send('email already registered.');
        } else {
            const user = new User ({
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                username : Math.random().toString(),
                email : req.body.email,
                password : req.body.password
            });
            user.save(function(error , data){
                if(err) {
                    res.send('Somerting went wrong. Please! try again.');
                } else {
                    console.log(data);
                    res.send({user: data});
                }
            })
        }
    });
}

exports.signin = function(req , res) {
    User.findOne({email : req.body.email} , function(err , result){
        if(err) {
            console.log(err);
            res.send(err);
        } else if(result){
            if(result.authenticate(req.body.password)) {
                const token = jwt.sign({_id:user._id , role : user.role},'secretkey' , {expiresIn:'1h'});
                const {_id , firstName , lastName , email , role , fullName} = result;
                
                res.send({
                    token , 
                    result : {_id , firstName , lastName , email , role , fullName}
                });
            } else {
                res.send("Password doesn't match");
            }
        } else {
            res.send("User doen't exist");
        }
    })
}
