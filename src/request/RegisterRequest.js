const { check, body } = require('express-validator');

const RegisterRequest = [
    check('name').isString(),
    check('email').isEmail(),
    check('password').isString().isLength({ min: 5 }).withMessage("Password min 5 character"),
    check('confirm_password').isString().isLength({min : 5})
    .custom((value , {req}) => {
        if(value != req.body.password ) {
           return Promise.reject('password dont match')
        }
        return true;
        })
]

module.exports = RegisterRequest;