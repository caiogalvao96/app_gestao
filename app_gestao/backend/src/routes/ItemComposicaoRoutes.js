import {Router} from 'express'
import ItemComposicaoController from '../controllers/ItemComposicaoController.js'

const routes = new Router();

routes.post('/', ItemComposicaoController.store);

routes.get('/', ItemComposicaoController.index);

routes.get('/:id', ItemComposicaoController.show);

export default routes;  