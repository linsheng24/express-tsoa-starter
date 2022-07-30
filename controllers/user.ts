import {
  Controller,
  Get,
  Post,
  Body,
  Route,
  Request,
  Security,
  Tags,
  Response,
  Example,
} from 'tsoa';
import ioc from '../ioc/IOC';
import * as SERVICETYPE from '../ioc/constants';
import { LoginDto, RegisterDto } from '../dtos/user';
import { sign } from '../lib/authentication';
import UserService from '../services/user';
import responseFactory from '../lib/responseFactory';
import { ExistedEmail, LoginFailed, ErrorUserValidation } from '../errors';
import errorFactory from '../errors/errorFactory';
import * as errorType from '../errors/constants';
import { validateEmail, validatePassword } from '../utils/validation';
@Route('api/user')
@Tags('User')
export class UsersController extends Controller {
  private readonly userService: UserService;

  constructor() {
    super();
    this.userService = ioc.use(SERVICETYPE.USER);
  }

  /**
   * @summary Register a user
   */
  @Post('/')
  @Example({
    code: 200,
  })
  @Response<ExistedEmail>(501)
  @Response<ErrorUserValidation>(503)
  public async register(@Body() body: RegisterDto) {
    try {
      const { email, password } = body;
      if (!validateEmail(email) || !validatePassword(password)) {
        throw errorFactory(errorType.ERROR_USER_VALIDATION);
      }
      const user = await this.userService.register(email, password);
      return responseFactory();
    } catch (e) {
      throw e;
    }
  }

  /**
   * @summary Login a user
   */
  @Post('/login')
  @Example({
    code: 200,
  })
  @Response<LoginFailed>(502)
  public async login(@Body() body: LoginDto) {
    try {
      const { email, password } = body;
      const user = await this.userService.getLoginUser(email, password);
      return responseFactory(sign(user));
    } catch (e) {
      throw e;
    }
  }

  /**
   * @summary Get profile data of the user
   */
  @Security('jwt')
  @Get('/profile')
  @Example({
    code: 200,
    data: {
      id: 1,
      name: null,
      email: 'sample@gmail.com',
      sex: null,
      birth: null,
    },
  })
  public async profile(@Request() request: any) {
    try {
      return responseFactory(request.user);
    } catch (e) {
      throw e;
    }
  }
}
