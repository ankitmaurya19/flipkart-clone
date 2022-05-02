const jwt = require('jsonwebtoken');

exports.requiredSignin = function(req , res , next){
    
    if(req.headers.autherization) {
        const token = req.headers.autherization;
        const user = jwt.verify(token , "secretkey");
        req.user = user;
    } else {
    res.send('Autherization Required');
    }
    next();
}

exports.adminMiddleware = function(req , res , next){
    if(req.user.role !== 'admin') {
        res.send('Access denied');
    }
    next();
}

exports.userMiddleware = function(req , res , next){
    if(req.user.role !== 'user')
    {
        res.send('Access denied.');
    }
    next();
}