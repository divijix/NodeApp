import Router from 'express';
import * as inquiryController from '../controllers/inquiry.controller.js'
import { verifyAdmin } from '../middleware/verifyJwt.js';
const inquiry = Router();


inquiry.post("/",inquiryController.inquiryPost);
inquiry.get("/", verifyAdmin, inquiryController.inquiryGet);


export default inquiry;