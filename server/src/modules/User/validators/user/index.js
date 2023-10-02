const { body, query, param } = require('express-validator');

exports.validateUserId = [
  param('userId').isMongoId().withMessage('Please provide a valid user ID'),
];

exports.validateFileId = [
  param('fileId').isMongoId().withMessage('Please provide a valid file ID'),
];

exports.validateDeleteMe = [
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Please Provide a Valid Password'),
];

exports.validateSearch = [
  query('search')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Please provide a valid name or email'),
  query('role')
    .trim()
    .optional({
      values: 'falsy',
    })
    .custom(val => ['admin', 'teacher', 'student'].includes(val))
    .withMessage('Please provide a valid role'),
];
