import { Request, Response, NextFunction } from 'express';

interface IMiddleware {
  handle(req: Request, res: Response, next: NextFunction): void | Response;
}

export default IMiddleware;
