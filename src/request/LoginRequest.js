const { check } = require('express-validator');

const LoginRequest = [
    check('email').isEmail(),
    check('password').isLength({ min: 5 }).withMessage("Password min 5 character").isString(),
]

module.exports = LoginRequest;