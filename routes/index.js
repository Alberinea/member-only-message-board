import express from 'express';
import {
  indexGetController,
  indexPostController,
  indexDeleteController,
} from '../controllers/indexController.js';

const indexRouter = express.Router();

indexRouter.get('/', indexGetController);

indexRouter.post('/', indexPostController);

indexRouter.delete('/', indexDeleteController);

export default indexRouter;

