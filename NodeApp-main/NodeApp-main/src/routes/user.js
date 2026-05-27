import Router from 'express'
import { verifyUser } from '../middleware/verifyJwt.js';
import * as userController from '../controllers/user.controller.js'


const User = Router();


User.post('/update-profile',verifyUser,userController.updateProflie);


export default User;