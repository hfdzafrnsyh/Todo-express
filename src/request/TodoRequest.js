const { check } = require('express-validator');

const TodoRequest = [
    check('title').isString().isLength({min : 5}),
]

module.exports = TodoRequest;