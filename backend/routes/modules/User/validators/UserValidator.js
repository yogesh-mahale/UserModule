const { body, param } = require('express-validator')

const validateUserCreateRequest = function () {
    return [
        body('email')
            .exists()
            .isEmail()
            .withMessage('email is required'),
        body('firstName')
            .exists()
            .withMessage('firstName is required!'),
        body('lastName')
            .exists()
            .withMessage('lastName is required!'),
        body('phone')
            .optional()
            .isMobilePhone()
            .withMessage('Valid phone number is required!'),
    ]
}


module.exports = {
    validateUserCreateRequest: validateUserCreateRequest
}
