import { Router } from "express";
import ObraController from  '../controllers/ObraController.js'

const routes = new Router();

routes.post('/', ObraController.store);

routes.get('/', ObraController.index);

routes.get('/:id', ObraController.show);

export default routes;