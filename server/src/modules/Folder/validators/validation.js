const { body, param } = require('express-validator');

exports.validateGetFolders = [
  body('course').isMongoId().withMessage('Please Provide a Valid Course ID'),
];

exports.validateFolderId = [
  param('folderId').isMongoId().withMessage('Please Provide a Valid Folder ID'),
];

exports.validateCreateFolder = [
  body('name').isString().withMessage('Please Provide a Folder Name'),
  body('course')
    .optional({
      values: 'falsy',
    })
    .isMongoId()
    .withMessage('Please Provide a Valid Course'),
  body('parentFolder')
    .optional({
      values: 'falsy',
    })
    .isMongoId()
    .withMessage('Please Provide a Valid Folder'),
];

exports.validateUpdateFolder = [
  body('name')
    .optional({
      values: 'falsy',
    })
    .isString()
    .withMessage('Please Provide a Folder Name'),
  body('course')
    .optional({
      values: 'falsy',
    })
    .isMongoId()
    .withMessage('Please Provide a Valid Course'),
  body('parentFolder')
    .optional({
      values: 'falsy',
    })
    .isMongoId()
    .withMessage('Please Provide a Valid Folder'),
];
