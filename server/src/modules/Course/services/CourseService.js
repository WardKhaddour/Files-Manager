const { NOT_FOUND } = require('http-status-codes').StatusCodes;

const AppError = require('../../../utils/AppError');

class CourseService {
  constructor(courseDAO, eventBus) {
    this.courseDAO = courseDAO;
    this.eventBus = eventBus;
  }

  async getAllCourses(courseFilter) {
    return this.courseDAO.findAll(courseFilter);
  }

  async getCourseById({ courseId, userId }) {
    const [savedFiles, course] = await Promise.all([
      this.eventBus.emitUserEvent('get-saved-files', userId),
      this.courseDAO.findById(courseId),
    ]);
    course.files = course.files?.map(file => ({
      ...file,
      isSaved: savedFiles?.includes(file.id),
    }));
    return course;
  }

  async createCourse({ name, university, teachers, faculty, section, year }) {
    return this.courseDAO.createEntity({
      name,
      university,
      teachers,
      faculty,
      section,
      year,
    });
  }

  async updateCourse({
    courseId,
    name,
    university,
    teachers,
    faculty,
    section,
    year,
  }) {
    const courseToUpdate = await this.courseDAO.findById(courseId);
    if (!courseToUpdate) {
      throw new AppError('Course Not Found', NOT_FOUND);
    }

    const updatedCourse = await this.courseDAO.updateEntity(courseId, {
      name,
      university,
      teachers,
      faculty,
      section,
      year,
    });

    return updatedCourse;
  }

  async deleteCourse(courseId) {
    const deletedCourse = await this.courseDAO.deleteEntity(courseId);
    return deletedCourse;
  }
}

module.exports = CourseService;
