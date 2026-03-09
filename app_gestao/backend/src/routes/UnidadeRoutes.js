import { Router } from 'express'
import UnidadeController from '../controllers/UnidadeController.js'

const routes = new Router();

routes.get('/', UnidadeController.index);

export default routes;
