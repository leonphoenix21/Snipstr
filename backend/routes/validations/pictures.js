const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const id = check("id").notEmpty().isInt({ min: 0 });

const url = check('imageUrl')
    .notEmpty()
    .isURL({ require_protocol: false, require_host: false });


exports.validateCreate = [
    url,
    handleValidationErrors,
];

exports.validateUpdate = [
    id,
    url,
    handleValidationErrors,
]
