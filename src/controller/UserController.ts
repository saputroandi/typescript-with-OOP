import { Request, Response, NextFunction } from 'express';
import IController from './Controllerinterface';

class UserController implements IController {
  index(req: Request, res: Response, next: NextFunction): Response {
    return res.send('hello from controller');
  }
  store(req: Request, res: Response, next: NextFunction): Response {
    return res.json(req.body);
  }
  update(req: Request, res: Response, next: NextFunction): Response {
    return res.send('hello from controller');
  }
  delete(req: Request, res: Response, next: NextFunction): Response {
    return res.send('hello from controller');
  }
}

export default new UserController();
