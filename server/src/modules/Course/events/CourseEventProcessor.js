const { EventEmitter } = require('node:events');

class CourseEventProcessor extends EventEmitter {
  constructor(courseDAO) {
    super();
    this.courseDAO = courseDAO;

    this.on('get-course-teachers', this.getCourseTeachers.bind(this));

    this.on('get-course-is-project', this.getCourseIsProject.bind(this));

    this.on('check-course-exists', this.checkCourseExists.bind(this));
  }

  async getCourseTeachers(courseId) {
    try {
      const course = await this.courseDAO.findById(courseId);
      this.emit('get-course-teachers-response', course?.teachers);
    } catch (err) {
      this.emit('get-course-teachers-error', err);
    } finally {
      this.cleanupEventListeners('get-course-teachers');
    }
  }

  async getCourseIsProject(courseId) {
    try {
      const course = await this.courseDAO.findById(courseId);
      this.emit('get-course-is-project-response', course?.isProject);
    } catch (err) {
      this.emit('get-course-is-project-error', err);
    } finally {
      this.cleanupEventListeners('get-course-is-project');
    }
  }

  async checkCourseExists(courseId) {
    try {
      const course = await this.courseDAO.findById(courseId);
      this.emit('check-course-exists-response', !!course);
    } catch (err) {
      this.emit('check-course-exists-error', err);
    } finally {
      this.cleanupEventListeners('check-course-exists');
    }
  }

  cleanupEventListeners(event) {
    this.removeAllListeners(`${event}-response`);
    this.removeAllListeners(`${event}-error`);
  }
}

module.exports = CourseEventProcessor;
