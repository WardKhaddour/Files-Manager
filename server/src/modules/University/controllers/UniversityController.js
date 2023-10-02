const { OK, NO_CONTENT, CREATED } = require('http-status-codes').StatusCodes;
const catchAsync = require('../../../utils/catchAsync');

class UniversityController {
  constructor(universityService) {
    this.universityService = universityService;
  }

  getAllUniversities = catchAsync(async (req, res) => {
    const universities = await this.universityService.getAllUniversities();
    res.status(OK).json({
      success: true,
      message: undefined,
      data: {
        universities,
      },
    });
  });

  getUniversityById = catchAsync(async (req, res) => {
    const { universityId } = req.params;
    const university = await this.universityService.getUniversityById(
      universityId
    );
    res.status(OK).json({
      success: true,
      message: undefined,
      data: { university },
    });
  });

  getUniversityByName = catchAsync(async (req, res) => {
    const { universityName } = req.params;
    const university = await this.universityService.getUniversityByName(
      universityName
    );
    res.status(OK).json({
      success: true,
      message: undefined,
      data: { university },
    });
  });

  createUniversity = catchAsync(async (req, res) => {
    const { name, city, country } = req.body;
    const createdUniversity = await this.universityService.createUniversity({
      name,
      city,
      country,
    });
    res.status(CREATED).json({
      success: true,
      message: 'University created successfully',
      data: createdUniversity,
    });
  });

  updateUniversity = catchAsync(async (req, res) => {
    const { name, city, country } = req.body;
    const { universityId } = req.params;
    const updatedUniversity = await this.universityService.updateUniversity({
      universityId,
      name,
      city,
      country,
    });
    res.status(OK).json({
      success: true,
      message: 'University updated successfully',
      data: updatedUniversity,
    });
  });

  deleteUniversity = catchAsync(async (req, res) => {
    const { universityId } = req.params;
    const deletedUniversity = await this.universityService.deleteUniversity(
      universityId
    );
    res.status(NO_CONTENT).json({
      success: true,
      message: 'University deleted successfully',
      data: deletedUniversity,
    });
  });
}

module.exports = UniversityController;
