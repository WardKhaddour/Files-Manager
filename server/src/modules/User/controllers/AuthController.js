const catchAsync = require('../../../utils/catchAsync');
const CookieManager = require('../helpers/Cookies/CookieManager');

class AuthController extends CookieManager {
  constructor(authService) {
    super();
    this.authService = authService;
  }

  signup = catchAsync(async (req, res) => {
    const { name, email, password, year, section, faculty, university } =
      req.body;
    const userData = await this.authService.signup({
      name,
      email,
      password,
      year,
      section,
      faculty,
      university,
    });
    this.setCookie(req, res, 'token', userData.token).json({
      success: true,
      message: 'Signed up successfully',
      data: userData,
    });
  });

  login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const userData = await this.authService.login({
      email,
      password,
    });
    this.setCookie(req, res, 'token', userData.token).json({
      success: true,
      message: 'Welcome',
      data: userData.user,
    });
  });

  confirmEmail = catchAsync(async (req, res) => {
    const { token: confirmEmailToken } = req.params;

    const userData = await this.authService.confirmEmail({
      confirmEmailToken,
    });
    this.setCookie(req, res, 'token', userData.token).json({
      success: true,
      message: 'Email confirmed!',
      data: userData,
    });
  });

  resendConfirmToken = catchAsync(async (req, res) => {
    const { email } = req.body;

    await this.authService.resendConfirmToken({
      email,
    });
    res.json({
      success: true,
      message: 'Token Sent to Your Email!',
      data: undefined,
    });
  });

  logout = catchAsync(async (req, res) => {
    this.clearCookie(req, res, 'token').json({
      success: true,
      message: undefined,
      data: undefined,
    });
  });
}

module.exports = AuthController;
