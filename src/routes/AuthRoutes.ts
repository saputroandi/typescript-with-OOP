import BaseRoutes from './BaseRoutes';
import passport from 'passport';
import LocalStrategy from 'passport-local';

// Middleware
import AuthMiddleware from '../middleware/AuthMiddleware';

// Controller
import AuthController from '../controller/AuthController';

class AuthRoutes extends BaseRoutes {
  constructor() {
    super();
    passport.use(
      new LocalStrategy.Strategy(
        { usernameField: 'email' },
        AuthController.localStrategy
      )
    );
  }
  public routes(): void {
    this.router.post('/v1/login', AuthMiddleware, AuthController.login);
    this.router.post('/v1/register', AuthController.register);
  }
}

export default new AuthRoutes().router;
