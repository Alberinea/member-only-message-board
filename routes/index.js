import express from 'express';
import {
  indexGetController,
  indexPostController,
} from '../controllers/indexController.js';

const indexRouter = express.Router();

indexRouter.get('/', indexGetController);

indexRouter.post('/', indexPostController);


export default indexRouter;

