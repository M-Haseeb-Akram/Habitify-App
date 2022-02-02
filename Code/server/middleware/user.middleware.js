const {check, validationResult} = require('express-validator/check');

const expressValidater = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else {
        const extractedErrors = [];
        errors
            .array({onlyFirstError: true})
            .forEach((error) =>
                extractedErrors.push({[error.param]: error.msg}),
            );
        res.status(400).json({statusCode: 406, errors: extractedErrors});
    }
};

const addHabitMiddleware = () => {
    return [
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
            .withMessage({pattern: 'Please enter a valid name'}),
    ];
};


module.exports = {expressValidater, addHabitMiddleware};
