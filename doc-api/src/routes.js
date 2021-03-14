import { Router } from 'express';
import {
  get as getReport,
  create as createReport,
} from './controllers/report_controller';

const routes = Router();

routes.use('/report/:id', getReport);
routes.use('/create/report/:id', createReport);

export default routes;
