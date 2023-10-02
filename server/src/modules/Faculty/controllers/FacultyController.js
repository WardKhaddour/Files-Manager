const { OK, NO_CONTENT, CREATED } = require('http-status-codes').StatusCodes;
const catchAsync = require('../../../utils/catchAsync');

class FacultyController {
  constructor(facultyService) {
    this.facultyService = facultyService;
  }

  getAllFaculties = catchAsync(async (req, res) => {
    const { universityId } = req.params;
    const faculties = await this.facultyService.getAllFaculties(universityId);
    res.status(OK).json({
      success: true,
      message: undefined,
      data: {
        faculties,
      },
    });
  });

  getFacultyById = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const faculty = await this.facultyService.getFacultyById(facultyId);
    res.status(OK).json({
      success: true,
      message: undefined,
      data: { faculty },
    });
  });

  getFacultyByName = catchAsync(async (req, res) => {
    const { facultyName } = req.params;
    const faculty = await this.facultyService.getFacultyByName(facultyName);
    res.status(OK).json({
      success: true,
      message: undefined,
      data: { faculty },
    });
  });

  getFacultyInfo = catchAsync(async (req, res) => {
    const { facultyId } = req.params;

    const { sections, yearsNum } = await this.facultyService.getFacultyInfo(
      facultyId
    );
    res.status(OK).json({
      success: true,
      message: undefined,
      data: { sections, yearsNum },
    });
  });

  createFaculty = catchAsync(async (req, res) => {
    const { name, university, sections } = req.body;
    const createdFaculty = await this.facultyService.createFaculty({
      name,
      university,
      sections,
    });
    res.status(CREATED).json({
      success: true,
      message: 'Faculty created successfully',
      data: createdFaculty,
    });
  });

  updateFaculty = catchAsync(async (req, res) => {
    const { name, university, sections } = req.body;
    const { facultyId } = req.params;
    const updatedFaculty = await this.facultyService.updateFaculty({
      facultyId,
      name,
      university,
      sections,
    });
    res.status(OK).json({
      success: true,
      message: 'Faculty updated successfully',
      data: updatedFaculty,
    });
  });

  deleteFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const deletedFaculty = await this.facultyService.deleteFaculty(facultyId);
    res.status(NO_CONTENT).json({
      success: true,
      message: 'Faculty deleted successfully',
      data: deletedFaculty,
    });
  });
}

module.exports = FacultyController;
