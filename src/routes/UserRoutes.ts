import BaseRoutes from './BaseRoutes';

// Controller
import UserController from '../controller/UserController';

class UserRoutes extends BaseRoutes {
  public routes() {
    this.router.get('/v1/user', UserController.index);
    this.router.post('/v1/user', UserController.store);
  }
}

export default new UserRoutes().router;
