import express from 'express';
import {
  registerGetController,
  registerPostController,
} from '../controllers/registerController.js';

const registerRouter = express.Router();

registerRouter.get('/register', registerGetController);

registerRouter.post('/register', registerPostController);

export default registerRouter;
