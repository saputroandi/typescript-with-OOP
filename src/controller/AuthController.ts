import { Request, Response, NextFunction, request } from 'express';
import { ValidationError } from 'sequelize';
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
      if (e instanceof ValidationError) {
        return res.status(400).json({
          error: 1,
          messages: e.errors,
        });
      }
      next(e);
    }
  }
}

export default new AuthController();
