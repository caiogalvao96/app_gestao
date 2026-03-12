import { Router } from 'express';
import InsumoController from '../controllers/InsumoController.js';

const routes = new Router();

// Rota para cadastrar (POST)
routes.post('/', InsumoController.store);

// Rota para listar todos (GET)
routes.get('/', InsumoController.index);

// Rota para buscar um específico (GET)
routes.get('/:id', InsumoController.show);

routes.delete('/:id', InsumoController.delete);

export default routes;