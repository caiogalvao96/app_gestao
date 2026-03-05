import {Router} from 'express'
import AtividadeController from '../controllers/AtividadeController.js'

const routes = new Router();

routes.post('/', AtividadeController.store);

routes.get('/', AtividadeController.index);

routes.get('/:id', AtividadeController.show);

routes.put('/:id', AtividadeController.update);

routes.delete('/:id', AtividadeController.delete);

export default routes;  