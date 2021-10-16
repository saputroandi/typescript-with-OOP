import { Router, Request, Response, NextFunction } from 'express';
import RouteInterface from './RouteInterface';

class UserRoutes implements RouteInterface {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  public routes() {
    this.router.get(
      '/user',
      (req: Request, res: Response, next: NextFunction) => {
        res.send('hello from user route');
      }
    );
  }
}

export default new UserRoutes().router;
