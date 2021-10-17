import { Router, Request, Response, NextFunction } from 'express';
import RouteInterface from './RouteInterface';

// Controller
import UserController from '../controller/UserController';

class UserRoutes implements RouteInterface {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  public routes() {
    this.router.get('/v1/user', UserController.index);
    this.router.post('/v1/user', UserController.store);
  }
}

export default new UserRoutes().router;
