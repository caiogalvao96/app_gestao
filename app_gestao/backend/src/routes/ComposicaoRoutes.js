import {Router} from 'express'
import ComposicaoController from '../controllers/ComposicaoController.js'

const routes = new Router();

routes.post('/', ComposicaoController.store);

routes.get('/', ComposicaoController.index);

routes.get('/:id', ComposicaoController.show);

routes.put('/:id', ComposicaoController.update);

routes.delete('/:id', ComposicaoController.delete);

export default routes;  