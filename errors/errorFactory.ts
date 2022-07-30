import * as Types from './constants';
import * as CustomError from './index';

const errorFactory = type => {
  switch (type) {
    case Types.EXISTED_EMAIL:
      return new CustomError.ExistedEmail();
    case Types.LOGIN_FAILED:
      return new CustomError.LoginFailed();
    case Types.ERROR_USER_VALIDATION:
      return new CustomError.ErrorUserValidation();
    default:
      break;
  }
};

export default errorFactory;
