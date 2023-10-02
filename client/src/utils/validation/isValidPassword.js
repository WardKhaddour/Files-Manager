const isValidPassword = password => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-#!$@£%^&*()_+|~=`{}[\]:";'<>?,./ ]).{8,}$/;
  return passwordRegex.test(password);
};

export default isValidPassword;
