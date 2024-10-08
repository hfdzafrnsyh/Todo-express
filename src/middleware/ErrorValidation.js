const { validationResult } = require('express-validator');


const ErrorValidation = (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    if (!error.isEmpty()) {
        return res.status(400).json({
            status: 'bad request',
            error: error.mapped()
        })

    }
    next()
}

module.exports = ErrorValidation;