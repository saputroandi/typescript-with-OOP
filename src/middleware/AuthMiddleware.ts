import { Request, Response, NextFunction } from 'express';
import EmailValidation from '../utils/EmailValidation';
import IMiddleware from './MiddlewareInterface';

class AuthMiddleware implements IMiddleware {
  handle(req: Request, res: Response, next: NextFunction): void | Response {
    if (req.body && req.body.email && req.body.password) {
      if (EmailValidation(req.body.email) && req.body.password.length >= 6) {
        next();
      }

      return res.status(400).json({
        error: 1,
        messages: 'invalid email or password',
      });
    }

    return res.status(400).json({
      error: 1,
      messages: 'email or password cannot be empty',
    });
  }
}

export default new AuthMiddleware().handle;
