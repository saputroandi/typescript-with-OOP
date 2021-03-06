import express, { Application, Response, Request, NextFunction } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';

// Routes
import AuthRoutes from './src/routes/AuthRoutes';
import TodoRoutes from './src/routes/TodoRoutes';
import AuthMiddleware from './src/middleware/AuthMiddleware';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(AuthMiddleware.decodeToken);
  }

  protected routes(): void {
    this.app
      .route('/')
      .get((req: Request, res: Response, next: NextFunction) => {
        res.send('route dengan TS');
      });
    this.app.use('/auth', AuthRoutes);
    this.app.use('/api', TodoRoutes);
  }
}

const port: number = 5000;
const app = new App().app;

app.listen(port, () => {
  console.log(`this app run on port ${port}`);
});
