import { Request, Response, NextFunction } from 'express';
import IMiddleware from './MiddlewareInterface';

class AuthMiddleware implements IMiddleware {
  handle(req: Request, res: Response, next: NextFunction): void | Response {
    const { name } = req.body;

    if (name == 'andi') return next();

    return res.send('unauthorize');
  }
}

export default new AuthMiddleware().handle;
