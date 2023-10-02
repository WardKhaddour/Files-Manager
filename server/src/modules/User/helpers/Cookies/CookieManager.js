class CookieManager {
  setCookie(req, res, key, value) {
    const secure = res.secure || req.headers['x-forwarded-proto'] === 'https';
    const sameSite = secure ? 'none' : undefined;
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ), // 30 Days
      httpOnly: true,
      sameSite,
      secure, // Secure on HTTPS
    };
    res.cookie(key, value, cookieOptions);
    return res;
  }

  clearCookie(req, res, key) {
    const secure = res.secure || req.headers['x-forwarded-proto'] === 'https';
    const sameSite = secure ? 'none' : undefined;
    const cookieOptions = {
      expires: new Date(),
      httpOnly: true,
      sameSite,
      secure, // Secure on HTTPS
    };
    res.clearCookie(key, cookieOptions);
    return res;
  }
}

module.exports = CookieManager;
