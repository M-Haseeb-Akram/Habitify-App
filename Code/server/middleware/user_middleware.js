const {check, validationResult} = require('express-validator');

const addHabitMiddleware = (req, res, next) => {
    check('Name')
        .notEmpty()
        .withMessage({required: 'Name is required'})
        .custom((value) => {
            if (/^[a-zA-Z ]+$/.test(value)) {
                return true;
            } else {
                return false;
            }
        })
        .withMessage({pattern: 'Please enter a valid name'})
        .trim();
    const errors = validationResult(req);
    if (!errors ) {
        const extractedErrors = [];
        errors
            .array({onlyFirstError: true})
            .forEach((error) =>
                extractedErrors.push({[error.param]: error.msg}),
            );
        res.status(400).json({statusCode: 406, errors: extractedErrors});
    }
    next();
};


module.exports = {addHabitMiddleware};
