import Router from 'express';
import * as authController from '../controllers/auth.controller.js'

const authRouter = Router();


authRouter.get('/register', authController.registerUser);
authRouter.get('/login', authController.loginUser);

export default authRouter;