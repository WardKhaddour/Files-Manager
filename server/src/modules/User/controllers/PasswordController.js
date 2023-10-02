const catchAsync = require('../../../utils/catchAsync');
const CookieManager = require('../helpers/Cookies/CookieManager');

class PasswordController extends CookieManager {
  constructor(passwordService) {
    super();
    this.passwordService = passwordService;
  }

  forgotPassword = catchAsync(async (req, res) => {
    const { email } = req.body;
    await this.passwordService.forgotPassword({ email });
    res.json({
      success: true,
      message: 'Reset Password Link sent to your email',
      data: undefined,
    });
  });

  resetPassword = catchAsync(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const userData = await this.passwordService.resetPassword({
      token,
      password,
    });
    this.setCookie(req, res, 'token', userData.token).json({
      success: true,
      message: 'Welcome',
      data: userData,
    });
  });

  updatePassword = catchAsync(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const { userId } = req;

    const userData = await this.passwordService.updatePassword({
      userId,
      currentPassword,
      newPassword,
    });

    this.setCookie(req, res, 'token', userData.token).json({
      success: true,
      message: 'Password Updated Successfully!',
      data: userData,
    });
  });
}

module.exports = PasswordController;
