const BaseDAO = require('../../../DAO/BaseDAO');
const Course = require('../models/Course');

class CourseDAO extends BaseDAO {
  static #isInternalConstructing = false;

  constructor() {
    super(Course);
    if (!CourseDAO.#isInternalConstructing) {
      throw new TypeError('PrivateConstructor is not constructable');
    }
    CourseDAO.#isInternalConstructing = false;
  }

  static getInstance() {
    CourseDAO.#isInternalConstructing = true;

    if (!CourseDAO.instance) {
      CourseDAO.instance = new CourseDAO();
    }
    return CourseDAO.instance;
  }

  async findById(courseId) {
    const entity = await this.Model.findById(courseId)
      .populate({
        path: 'teachers',
        select: '_id name photo photoSrc',
      })
      .populate({
        path: 'folders',
        populate: {
          path: 'author',
          select: '_id name photo photoSrc',
        },
      })
      .populate({
        path: 'files',
        populate: {
          path: 'author',
          select: '_id name photo photoSrc',
        },
      });
    return this.formatEntity(entity);
  }

  async getCourseTeachers(courseId) {
    return (await this.Model.findById(courseId).select('+teachers')).toObject()
      .author;
  }
}

module.exports = CourseDAO;
