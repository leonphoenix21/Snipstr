const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const id = check("id").notEmpty().isInt({ min: 0 });
const name =
    check('name')
        .notEmpty()
        .withMessage("Name must not be empty.");

const url =
    check('imageUrl')
        .notEmpty()
        .isURL()
        .withMessage('URL for image must be a valid URL.');


exports.validateCreate = [
    name,
    url,
    handleValidationErrors,
];

exports.validateUpdate = [
    id,
    name,
    url,
    handleValidationErrors,
]
