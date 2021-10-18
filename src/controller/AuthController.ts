import { Request, Response, NextFunction } from 'express';

class AuthController {
  login(req: Request, res: Response, next: NextFunction): Response {
    return res.send('hello from controller');
  }
  register(req: Request, res: Response, next: NextFunction): Response {
    return res.json(req.body);
  }
}

export default new AuthController();
