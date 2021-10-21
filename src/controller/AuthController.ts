import { Request, Response, NextFunction, request } from 'express';
const db = require('../db/models');

class AuthController {
  login(req: Request, res: Response, next: NextFunction): Response {
    return res.send('hello from controller');
  }
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const payload = req.body;

      const result = await db.User.create(payload);

      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
