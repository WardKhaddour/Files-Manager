const { NOT_FOUND, BAD_REQUEST, UNAUTHORIZED } =
  require('http-status-codes').StatusCodes;

const AppError = require('../../../utils/AppError');

class ProjectService {
  constructor(projectDAO, eventBus) {
    this.projectDAO = projectDAO;
    this.eventBus = eventBus;
  }

  async getAllProjects({ course, folder, userId }) {
    const projects = await this.projectDAO.findAll({
      author: userId,
      folder,
      course,
    });
    if (projects) {
      return projects;
    }
    if (course) {
      const courseTeachers = await this.eventBus.emitCourseEvent(
        'get-course-teachers',
        course
      );
      if (!courseTeachers) {
        throw new AppError('Please provide a valid course', BAD_REQUEST);
      }
      if (!courseTeachers.includes(userId)) {
        // throw new AppError(
        //   "Unauthorized, You don't have access to this course projects",
        //   UNAUTHORIZED
        // );
        return {};
      }
      return this.projectDAO.findAll({ course });
    }

    const folderDetails = await this.eventBus.emitFolderEvent(
      'get-folder-details',
      folder
    );
    if (!folderDetails) {
      throw new AppError('Please provide a valid folder', BAD_REQUEST);
    }
    if (
      folderDetails.type !== 'projects-folder' ||
      folderDetails.author !== userId
    ) {
      // throw new AppError(
      //   "Unauthorized, You don't have access to this projects folder",
      //   UNAUTHORIZED
      // );
      return {};
    }
    return this.projectDAO.findAll({ folder });
  }

  async getProjectById(projectId, userId) {
    const project = await this.projectDAO.findById(projectId);
    if (project.author.includes(userId)) {
      return project;
    }
    if (project.folder) {
      const folderDetails = await this.eventBus.emitFolderEvent(
        'get-folder-details',
        project.folder
      );
      if (folderDetails.author === userId) {
        return project;
      }
    }
    if (project.course) {
      const courseTeachers = await this.eventBus.emitCourseEvent(
        'get-course-teachers',
        project.course
      );
      if (courseTeachers.includes(userId)) {
        return project;
      }
    }
    return {};
  }

  async createProject(projectData) {
    const { author, name, course, folder, path } = projectData;

    const folderType = (
      await this.eventBus.emitFolderEvent('get-folder-details', folder)
    ).type;
    if (folderType && folderType !== 'projects-folder') {
      throw new AppError(
        'You Cannot upload projects to files folder',
        BAD_REQUEST
      );
    }

    const courseIsProject = await this.eventBus.emitCourseEvent(
      'get-course-is-project',
      course
    );

    if (course && !courseIsProject) {
      throw new AppError(
        'You Cannot upload projects to normal course',
        BAD_REQUEST
      );
    }

    return this.projectDAO.createEntity({ author, name, course, folder, path });
  }

  async updateProject(projectData, userId) {
    const { projectId, name, author } = projectData;

    if (!(await this.projectDAO.findById(projectId))?.author.includes(userId)) {
      throw new AppError('Unauthorized', UNAUTHORIZED);
    }

    const projectToUpdate = await this.projectDAO.findById(projectId);
    if (!projectToUpdate) {
      throw new AppError('Project Not Found', NOT_FOUND);
    }

    const updatedProject = await this.projectDAO.updateEntity(projectId, {
      name,
      author,
    });

    return { ...updatedProject, prevPath: projectToUpdate.path };
  }

  async deleteProject(projectId, userId) {
    if (!(await this.projectDAO.findById(projectId))?.author.includes(userId)) {
      throw new AppError('Unauthorized', UNAUTHORIZED);
    }
    const deletedProject = await this.projectDAO.deleteEntity(projectId);
    return deletedProject;
  }
}

module.exports = ProjectService;
