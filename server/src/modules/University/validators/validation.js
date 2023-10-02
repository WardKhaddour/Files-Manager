const { body, param } = require('express-validator');

exports.validateCreateUniversity = [
  body('name').isString().withMessage('Please Provide a Faculty Name'),
  body('city').isString().withMessage('Please Provide a Faculty City'),
  body('country').isString().withMessage('Please Provide a Faculty Country'),
];

exports.validateUpdateUniversity = [
  body('name')
    .optional({ values: 'falsy' })
    .isString()
    .withMessage('Please Provide a Faculty Name'),
  body('city')
    .optional({ values: 'falsy' })
    .isString()
    .withMessage('Please Provide a Faculty City'),
  body('country')
    .optional({ values: 'falsy' })
    .isString()
    .withMessage('Please Provide a Faculty Country'),
];

exports.validateUniversityId = [
  param('universityId')
    .isMongoId()
    .withMessage('Please provide a valid university ID'),
];
