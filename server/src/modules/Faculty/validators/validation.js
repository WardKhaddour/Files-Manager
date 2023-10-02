const { body, param } = require('express-validator');

exports.validateGetFaculties = [
  param('universityId')
    .isMongoId()
    .withMessage('Please Provide a Valid University ID'),
];

exports.validateFacultyId = [
  param('facultyId').isMongoId().withMessage('Faculty Id must be a valid Id'),
];

exports.validateCreateFaculty = [
  body('name').isString().withMessage('Please Provide a Faculty Name'),
  body('university')
    .isMongoId()
    .withMessage('Please Provide a Valid University'),
  body('sections')
    .isArray({
      min: 1,
    })
    .withMessage('Please provide array of sections')
    .custom(sections => sections.every(section => typeof section === 'string'))
    .withMessage('Sections must be a strings'),
];

exports.validateUpdateFaculty = [
  body('name')
    .optional({ values: 'falsy' })
    .isString()
    .withMessage('Please Provide a Faculty Name'),
  body('university')
    .optional({ values: 'falsy' })
    .isMongoId()
    .withMessage('Please Provide a Valid University'),
  body('sections')
    .optional({ values: 'falsy' })
    .isArray({
      min: 1,
    })
    .withMessage('Please provide array of sections')
    .custom(sections => sections.every(section => typeof section === 'string'))
    .withMessage('Sections must be a strings'),
];
