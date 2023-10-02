const { signToken } = require('../../../utils/jwt');

class UserAuthHelper {
  signToken(userId) {
    const token = signToken(userId);
    return token;
  }

  filterUserFields(data) {
    if (!data) {
      return {};
    }
    if (!data.token)
      return {
        id: data.id,
        name: data.name,
        email: data.email,
        photo: data.photo,
        role: data.role,
        year: data.year,
        section: data.section,
        faculty: data.faculty,
        university: data.university,
        availableSpace: data.availableSpace,
        totalSpace: data.totalSpace,
        emailIsConfirmed: data.emailIsConfirmed,
      };
    return {
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        photo: data.photo,
        role: data.role,
        year: data.year,
        section: data.section,
        faculty: data.faculty,
        university: data.university,
        availableSpace: data.availableSpace,
        totalSpace: data.totalSpace,
        emailIsConfirmed: data.emailIsConfirmed,
      },
      token: data.token,
    };
  }
}

module.exports = UserAuthHelper;
