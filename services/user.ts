import errorFactory from '../errors/errorFactory';
import * as errorType from '../errors/constants';
export default class UserService {
  private _db_user;

  constructor(userModel) {
    this._db_user = userModel;
  }

  async findByEmail(email: string) {
    return await this._db_user.findByEmail(email);
  }

  async register(email: string, password: string) {
    const existUser = await this._db_user.findByEmail(email);
    if (existUser && existUser.enable === 1) {
      throw errorFactory(errorType.EXISTED_EMAIL);
    } else {
      return this._db_user.register(email, password);
    }
  }

  async getLoginUser(email: string, password: string) {
    const user = await this._db_user.getLoginUser(email, password);
    if (user) {
      return user;
    } else {
      throw errorFactory(errorType.LOGIN_FAILED);
    }
  }
}
