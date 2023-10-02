const { OK, NO_CONTENT, CREATED, BAD_REQUEST } =
  require('http-status-codes').StatusCodes;
const AppError = require('../../../utils/AppError');
const catchAsync = require('../../../utils/catchAsync');
const { deleteFile } = require('../../../utils/file');

class ProjectController {
  constructor(projectService) {
    this.projectService = projectService;
  }

  getAllProjects = catchAsync(async (req, res, next) => {
    const { course, folder } = req.query;
    const { userId } = req;
    if ((course && folder) || (!course && !folder)) {
      return next(
        new AppError('Please Provide only a course or folder', BAD_REQUEST)
      );
    }
    const projects = await this.projectService.getAllProjects({
      course,
      folder,
      userId,
    });
    return res.status(OK).json({
      success: true,
      message: undefined,
      data: projects,
    });
  });

  getProjectById = catchAsync(async (req, res) => {
    const { projectId } = req.params;
    const { userId } = req;

    const project = await this.projectService.getProjectById(projectId, userId);
    res.status(OK).json({
      success: true,
      message: undefined,
      data: project,
    });
  });

  createProject = catchAsync(async (req, res, next) => {
    const { name, course, folder, author } = req.body;
    const { path } = req.file;
    if ((folder && course) || (!folder && !course)) {
      return next(
        new AppError(
          'Only one of parent folder or course is allowed',
          BAD_REQUEST
        )
      );
    }

    try {
      const createdProject = await this.projectService.createProject({
        name,
        course,
        path,
        folder,
        author,
      });
      return res.status(CREATED).json({
        success: true,
        message: 'Project created successfully',
        data: createdProject,
      });
    } catch (err) {
      await deleteFile(path);
      throw err;
    }
  });

  updateProject = catchAsync(async (req, res) => {
    const { name, author } = req.body;
    const { projectId } = req.params;
    const { userId } = req;
    const updatedProject = await this.projectService.updateProject(
      {
        projectId,
        name,
        author,
      },
      userId
    );
    res.status(OK).json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject,
    });
  });

  deleteProject = catchAsync(async (req, res) => {
    const { projectId } = req.params;
    const { userId } = req;
    const deletedProject = await this.projectService.deleteProject(
      projectId,
      userId
    );
    await deleteFile(deletedProject.path);
    res.status(NO_CONTENT).json({
      success: true,
      message: 'Project deleted successfully',
      data: deletedProject,
    });
  });
}

module.exports = ProjectController;
