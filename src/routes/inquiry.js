import Router from 'express';
import * as inquiryController from '../controllers/inquiry.controller.js'
import { verifyUser } from '../middleware/verifyJwt.js';
const inquiry = Router();


inquiry.post("/",inquiryController.inquiryPost);
inquiry.get("/", verifyUser, inquiryController.inquiryGet);


export default inquiry;