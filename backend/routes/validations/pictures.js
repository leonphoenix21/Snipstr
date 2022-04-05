const { check } = require('express-validator');
const { handleValidationErrors } = require('./utils');

const id = check("id").notEmpty().isInt({ min: 0 });
const name =
    check('name')
        .notEmpty()
        .withMessage("Name must not be empty.");

const imageUrl =
    check('imageUrl')
        .notEmpty()
        .isURL()
        .withMessage('URL for image must be a valid URL.');

const body =
    check('body')
        .notEmpty()
        .withMessage('Body must contain text.');

exports.validateCreate = [
    name,
    imageUrl,
    body,
    handleValidationErrors,
];

exports.validateUpdate = [
    id,
    name,
    imageUrl,
    handleValidationErrors,
]
