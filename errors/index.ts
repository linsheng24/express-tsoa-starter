export default class CustomError extends Error {
  public code;

  constructor(message) {
    if (message instanceof Object) {
      super(JSON.stringify(message, null, 4));
    } else {
      super(message);
    }
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * @example {
 *  "message": "該 Email 已被註冊",
 *  "code": "501"
 * }
 */
export class ExistedEmail extends CustomError {
  constructor(message = '該 Email 已被註冊') {
    super(message);
    this.code = 501;
  }
}

/**
 * @example {
 *  "message": "帳號或密碼錯誤",
 *  "code": "502"
 * }
 */
export class LoginFailed extends CustomError {
  constructor(message = '帳號或密碼錯誤') {
    super(message);
    this.code = 502;
  }
}

/**
 * @example {
 *  "message": "註冊格式錯誤",
 *  "code": "503"
 * }
 */
export class ErrorUserValidation extends CustomError {
  constructor(message = '註冊格式錯誤') {
    super(message);
    this.code = 503;
  }
}
