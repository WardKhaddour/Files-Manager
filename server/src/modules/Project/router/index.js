const { Router } = require('express');
const authManager = require('../../../auth/dependencies');
const { projectController } = require('../dependencies');
const uploadProject = require('../../../middlewares/projects/uploadProject');
const validateRequest = require('../../../middlewares/validateRequest');
const {
  validateGetAllProjects,
  validateUploadProject,
  validateUpdateProject,
  validateProjectId,
} = require('../validators/validation');

const router = Router();

router.use(authManager.restrictAuthenticated);

router
  .route('/')
  .get(
    authManager.restrictTo('student', 'teacher'),
    validateGetAllProjects,
    validateRequest,
    projectController.getAllProjects.bind(projectController)
  )
  .post(
    authManager.restrictTo('student'),
    uploadProject,
    validateUploadProject,
    validateRequest,
    projectController.createProject.bind(projectController)
  );

router
  .route('/:projectId')
  .all(validateProjectId)
  .get(projectController.getProjectById.bind(projectController))
  .patch(
    authManager.restrictTo('student'),
    validateUpdateProject,
    validateRequest,
    projectController.updateProject.bind(projectController)
  )
  .delete(
    authManager.restrictTo('student'),
    projectController.deleteProject.bind(projectController)
  );

module.exports = router;
