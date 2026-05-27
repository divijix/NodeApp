import Router from 'express';
import * as categoryController from '../controllers/category.controller.js'
const category = Router();

category.get("/",categoryController.getCategory);
category.post("/new-category",categoryController.newCategory);
// category.delete("/delete-category",);
category.patch("/update-category",categoryController.updateCategory);


export default category;