import BaseRoutes from './BaseRoutes';

// Middleware
import AuthMiddleware from '../middleware/AuthMiddleware';

// Controller
import AuthController from '../controller/AuthController';

class AuthRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/v1/login', AuthMiddleware, AuthController.login);
    this.router.post('/v1/register', AuthController.register);
  }
}

export default new AuthRoutes().router;
