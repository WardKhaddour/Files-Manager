const { Router } = require('express');
const { courseController } = require('../dependencies');
const authManager = require('../../../auth/dependencies');
const {
  validateGetCourses,
  validateCreateCourse,
  validateUpdateCourse,
  validateCourseId,
} = require('../validators/validation');
const validateRequest = require('../../../middlewares/validateRequest');

const router = Router();

router.use(authManager.restrictAuthenticated);

router
  .route('/')
  .get(
    validateGetCourses,
    validateRequest,
    courseController.getAllCourses.bind(courseController)
  )
  .post(
    authManager.restrictTo('admin'),
    validateCreateCourse,
    validateRequest,
    courseController.createCourse.bind(courseController)
  );

router
  .route('/:courseId')
  .all(validateCourseId, validateRequest)
  .get(courseController.getCourseById.bind(courseController))
  .patch(
    validateUpdateCourse,
    validateRequest,
    authManager.restrictTo('admin'),
    courseController.updateCourse.bind(courseController)
  )
  .delete(
    authManager.restrictTo('admin'),
    courseController.deleteCourse.bind(courseController)
  );

module.exports = router;
