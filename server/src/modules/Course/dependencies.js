const CourseDAO = require('./DAO/CourseDAO');
const CourseServices = require('./services/CourseService');
const CourseController = require('./controllers/CourseController');
const eventBus = require('../../events/index');

const courseDAO = CourseDAO.getInstance();
const courseService = new CourseServices(courseDAO, eventBus);
const courseController = new CourseController(courseService);

module.exports = {
  courseController,
};
