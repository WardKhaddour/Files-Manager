class AuthHelper {
  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static deleteToken() {
    localStorage.removeItem('token');
  }
}

export default AuthHelper;
