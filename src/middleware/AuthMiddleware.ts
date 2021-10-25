import { Request, Response, NextFunction } from 'express';
import AuthHelper from '../utils/AuthHelper';
import IMiddleware from './MiddlewareInterface';
import jwt from 'jsonwebtoken';
import GetToken from '../utils/GetToken';

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

  async decodeToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      let token = GetToken.handle(req);

      if (!token) return next();

      req.user = jwt.verify(token, process.env.SECRET_KEY as string);

      return next();
    } catch (err: any) {
      if (err && err.name === 'JsonWebTokenError') {
        return res.json({
          error: 1,
          message: err.message,
        });
      }

      next(err);
    }
  }
}

export default new AuthMiddleware();
