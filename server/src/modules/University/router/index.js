const { Router } = require('express');
const { universityController } = require('../dependencies');
const authManager = require('../../../auth/dependencies');
const {
  validateCreateUniversity,
  validateUniversityId,
  validateUpdateUniversity,
} = require('../validators/validation');
const validateRequest = require('../../../middlewares/validateRequest');

const router = Router();

router
  .route('/')
  .get(universityController.getAllUniversities.bind(universityController))
  .post(
    authManager.restrictAuthenticated,
    authManager.restrictTo('admin'),
    validateCreateUniversity,
    validateRequest,
    universityController.createUniversity.bind(universityController)
  );

router
  .route('/:universityId')
  .all(validateUniversityId, validateRequest)
  .get(universityController.getUniversityById.bind(universityController))
  .patch(
    validateUpdateUniversity,
    validateRequest,
    authManager.restrictAuthenticated,
    authManager.restrictTo('admin'),
    universityController.updateUniversity.bind(universityController)
  )
  .delete(
    authManager.restrictAuthenticated,
    authManager.restrictTo('admin'),
    universityController.deleteUniversity.bind(universityController)
  );

module.exports = router;
