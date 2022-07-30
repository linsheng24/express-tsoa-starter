export const validateEmail = mail => {
  if (
    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(
      mail,
    )
  ) {
    return true;
  }
  return false;
};

export const validatePassword = password => {
  if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
    return true;
  }
  return false;
};
