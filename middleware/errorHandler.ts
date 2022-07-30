import CustomError from '../errors/index';
import { ValidateError } from 'tsoa';

export default function errorHandler(err, req, res, next) {
  if (err instanceof CustomError) {
    // customized error
    res.status(err.code).json({
      code: err.code,
      message: err.message,
    });
  } else if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  } else {
    // server internal error
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
}
