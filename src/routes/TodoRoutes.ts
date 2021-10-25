import BaseRoutes from './BaseRoutes';

// Controller
import TodoController from '../controller/TodoController';

class TodoRoutes extends BaseRoutes {
  public routes() {
    this.router.get('/v1/todos', TodoController.index);
    this.router.post('/v1/todos', TodoController.store);
  }
}

export default new TodoRoutes().router;
