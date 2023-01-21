const { check, validationResult } = require('express-validator');


exports.validateRegisterUser = [
    check('name')
        .notEmpty().withMessage('name is required'),
    check('email')
        .isEmail().withMessage('A valid email is required'),
    check('password')
        .notEmpty().withMessage('password is required')
        .isLength({ min: 6 }).withMessage('password must be at least 6 characters')
]


exports.validateSignIn = [
    check('email')
        .isEmail()
        .withMessage('A valid email is required'),
    check('password')
        .notEmpty()
        .withMessage('Password is required')
]


exports.isRegiterValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({
            total_errors: errors.array().length,
            message: errors.array()[0]['msg']
        });
    }
    next();
}