import express from 'express';
import {
  loginGetController,
  loginPostController,
} from '../controllers/loginController.js';

const loginRouter = express.Router();

loginRouter.get('/login', loginGetController);

loginRouter.post('/login', loginPostController);

export default loginRouter;
