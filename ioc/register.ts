import UserService from '../services/user';
import userModel from '../models/user';
import * as Types from './constants';

// inject db instance to service
export default function Register(ioc) {
  ioc.bind(Types.USER, () => new UserService(userModel));
}
