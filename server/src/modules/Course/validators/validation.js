const { body, query, param } = require('express-validator');
const { ObjectId } = require('mongoose').Types;

exports.validateGetCourses = [
  query('university')
    .exists()
    .withMessage('University is required')
    .isMongoId()
    .withMessage('University must be a valid ID'),
  query('faculty')
    .exists()
    .withMessage('Faculty is required')
    .isMongoId()
    .withMessage('Faculty must be a valid ID'),
  query('year')
    .exists()
    .withMessage('Year is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('Year must be a positive integer, between 1 and 5'),
  query('section')
    .exists()
    .withMessage('Section is required')
    .isString()
    .withMessage('Section must be a string'),
];

exports.validateCourseId = [
  param('courseId')
    .exists()
    .withMessage('Course ID is required')
    .isMongoId()
    .withMessage('Course ID must be a valid ID'),
];

exports.validateCreateCourse = [
  body('name').isString().withMessage('Please Provide a Course Name'),
  body('university')
    .isMongoId()
    .withMessage('Please Provide a Valid University'),
  body('faculty').isMongoId().withMessage('Please Provide a Valid Faculty'),
  body('year')
    .isArray({ min: 1 })
    .withMessage('Year must be an array with at least one element')
    .custom(value => {
      return value.every(element => typeof element === 'number');
    })
    .withMessage('Year must contain only numbers'),
  body('teachers')
    .isArray()
    .custom(values => values.every(val => ObjectId.isValid(val)))
    .withMessage('Please provide a valid teachers'),
  body('section')
    .isArray({ min: 1 })
    .withMessage('Section must be an array with at least one element')
    .custom(value => {
      return value.every(element => typeof element === 'string');
    })
    .withMessage('Section must contain only strings'),
];

exports.validateUpdateCourse = [
  body('name')
    .optional({ values: 'falsy' })
    .isString()
    .withMessage('Please Provide a Course Name'),
  body('university')
    .optional({ values: 'falsy' })
    .isMongoId()
    .withMessage('Please Provide a Valid University'),
  body('faculty')
    .optional({ values: 'falsy' })
    .isMongoId()
    .withMessage('Please Provide a Valid Faculty'),
  body('year')
    .optional({ values: 'falsy' })
    .isArray({ min: 1 })
    .withMessage('Year must be an array with at least one element')
    .custom(value => {
      return value.every(element => typeof element === 'number');
    })
    .withMessage('Year must contain only numbers'),
  body('teachers')
    .optional({ values: 'falsy' })
    .isArray()
    .custom(values => values.every(val => ObjectId.isValid(val)))
    .withMessage('Please provide a valid teachers'),
  body('section')
    .optional({ values: 'falsy' })
    .isArray({ min: 1 })
    .withMessage('Section must be an array with at least one element')
    .custom(value => {
      return value.every(element => typeof element === 'string');
    })
    .withMessage('Section must contain only strings'),
];
