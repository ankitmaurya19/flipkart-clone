
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

exports.signup = function(req , res){
    User.findOne({email : req.body.email} , function(err , result){
        if(err) {
            console.log(err);
        } else if(result) {
            res.end('Admin already registered.');
        } else {
            const user = new User ({
                firstName : req.body.firstName,
                lastname : req.body.lastName,
                username : Math.random().toString(),
                email : req.body.email,
                password : req.body.password,
                role : 'admin'
            });
            user.save(function(error , data){
                if(err) {
                    res.send('Somerting went wrong. Please! try again.');
                } else {
                    res.send(user);
                }
            })
        }
    });
}

exports.signin = function(req , res) {
    User.findOne({email : req.body.email} , function(err , result){
        if(err) {
            console.log(err);
        } else if(result){
            if(result.authenticate(req.body.password) && (role === 'admin')) {
                const token = jwt.sign({_id:user_id , role : result.role},'secretkey' , {expiresIn:'1h'});
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
