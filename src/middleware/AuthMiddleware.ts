import { Request, Response, NextFunction } from 'express';
import AuthHelper from '../utils/AuthHelper';
import IMiddleware from './MiddlewareInterface';

class AuthMiddleware implements IMiddleware {
  handle(req: Request, res: Response, next: NextFunction): void | Response {
    if (
      !req.body ||
      !AuthHelper.emailValidation(req.body.email) ||
      req.body.password.length < 6
    ) {
      return res.status(400).json({
        error: 1,
        messages: 'invalid email or password',
      });
    }
    next();
  }
}

export default new AuthMiddleware().handle;
