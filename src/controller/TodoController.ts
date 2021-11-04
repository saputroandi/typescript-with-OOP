import { Request, Response, NextFunction } from 'express';
import IController from './Controllerinterface';
import Policy from '../utils/Policy';

class TodoController implements IController {
  index(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | Promise<Response> {
    return res.send('hello from controller');
  }

  store(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | Promise<Response> {
    const policy = Policy.handle(req.user);

    if (!policy.can('create', 'Todos')) {
      return res.status(401).json({
        error: 1,
        message: `unauthorize action`,
      });
    }

    return res.send('hit todos');
  }

  update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | Promise<Response> {
    return res.send('hello from controller');
  }

  delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | Promise<Response> {
    return res.send('hello from controller');
  }
}

export default new TodoController();
