import express from 'express';
import { body } from 'express-validator';
import {
  registerGetController,
  registerPostController,
} from '../controllers/registerController.js';

const registerRouter = express.Router();

registerRouter.get('/register', registerGetController);

registerRouter.post(
  '/register',
  body('email').isEmail().normalizeEmail(),
  body('name').not().isEmpty().trim().escape(),
  body('password').not().isEmpty().trim().escape(),
  registerPostController
);

export default registerRouter;
