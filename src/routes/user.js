import Router from 'express'
import { verifyUser } from '../middleware/verifyJwt.js';
import * as userController from '../controllers/user.controller.js'


const user = Router();


user.post('/update-profile',verifyUser,userController.updateProflie);
user.get('/')


export default user;