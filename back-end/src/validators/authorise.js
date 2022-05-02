const {check, validationResult} = require('express-validator');

exports.validateSigninRequests = [
    check('email')
    .notEmpty()
    .withMessage(' email is required.'),
    check('password')
    .isLength({min : 8})
    .withMessage('Password must be of atleast 8 character.')

];

exports.validateSignupRequests = [
    check('firstName')
    .notEmpty()
    .withMessage('first name is required.'),
    check('lastName')
    .notEmpty()
    .withMessage('last name is required.'),
    check('email')
    .notEmpty()
    .withMessage(' email is required.'),
    check('password')
    .isLength({min : 8})
    .withMessage('Password must be of atleast 8 character.')

];

exports.isValidated = function(req , res , next) {
    const errors = validationResult(req);
    if(errors.array().length > 0)
    {
        return res.send({error : errors.array()[0].msg})
    }
    next();
}