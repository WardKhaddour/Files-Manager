const { OK, NO_CONTENT, CREATED } = require('http-status-codes').StatusCodes;
const catchAsync = require('../../../utils/catchAsync');

class CourseController {
  constructor(courseService) {
    this.courseService = courseService;
  }

  getAllCourses = catchAsync(async (req, res) => {
    const { university, faculty, year, section } = req.query;
    const courses = await this.courseService.getAllCourses({
      university,
      faculty,
      year,
      section,
    });
    res.status(OK).json({
      success: true,
      message: undefined,
      data: {
        courses,
      },
    });
  });

  getCourseById = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { userId } = req;
    const course = await this.courseService.getCourseById({ courseId, userId });
    res.status(OK).json({
      success: true,
      message: undefined,
      data: { course },
    });
  });

  createCourse = catchAsync(async (req, res) => {
    const { name, university, teachers, section, faculty, year } = req.body;
    const createdCourse = await this.courseService.createCourse({
      name,
      university,
      teachers,
      section,
      faculty,
      year,
    });
    res.status(CREATED).json({
      success: true,
      message: 'Course created successfully',
      data: createdCourse,
    });
  });

  updateCourse = catchAsync(async (req, res) => {
    const { name, university, teachers, section, faculty, year } = req.body;
    const { courseId } = req.params;
    const updatedCourse = await this.courseService.updateCourse({
      courseId,
      name,
      university,
      teachers,
      section,
      faculty,
      year,
    });
    res.status(OK).json({
      success: true,
      message: 'Course updated successfully',
      data: updatedCourse,
    });
  });

  deleteCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const deletedCourse = await this.courseService.deleteCourse(courseId);
    res.status(NO_CONTENT).json({
      success: true,
      message: 'Course deleted successfully',
      data: deletedCourse,
    });
  });
}

module.exports = CourseController;
