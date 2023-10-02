const { Router } = require('express');
const { facultyController } = require('../dependencies');
const authManager = require('../../../auth/dependencies');
const {
  validateGetFaculties,
  validateCreateFaculty,
  validateFacultyId,
  validateUpdateFaculty,
} = require('../validators/validation');
const validateRequest = require('../../../middlewares/validateRequest');

const router = Router();

router
  .route('/')
  .post(
    authManager.restrictAuthenticated,
    authManager.restrictTo('admin'),
    validateCreateFaculty,
    validateRequest,
    facultyController.createFaculty.bind(facultyController)
  );

router
  .route('/university/:universityId')
  .get(
    validateGetFaculties,
    validateRequest,
    facultyController.getAllFaculties.bind(facultyController)
  );

router
  .route('/:facultyId')
  .all(validateFacultyId, validateRequest)
  .get(facultyController.getFacultyById.bind(facultyController))
  .patch(
    validateUpdateFaculty,
    validateRequest,
    authManager.restrictAuthenticated,
    authManager.restrictTo('admin'),
    facultyController.updateFaculty.bind(facultyController)
  )
  .delete(
    authManager.restrictAuthenticated,
    authManager.restrictTo('admin'),
    facultyController.deleteFaculty.bind(facultyController)
  );

router.get(
  '/:facultyId/info',
  validateFacultyId,
  validateRequest,
  facultyController.getFacultyInfo.bind(facultyController)
);

module.exports = router;
