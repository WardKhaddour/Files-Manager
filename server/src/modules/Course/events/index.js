const CourseDAO = require('../DAO/CourseDAO');
const CourseEventProcessor = require('./CourseEventProcessor');

const courseDAO = CourseDAO.getInstance();
const courseEventProcessor = new CourseEventProcessor(courseDAO);

module.exports = courseEventProcessor;
