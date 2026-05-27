import Router from 'express';
import * as categoryController from '../controllers/category.controller.js'
import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, "./uploads")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // const fileExtension = Path2D.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({storage: storage});

const category = Router();

category.get("/",categoryController.getCategory);
category.post("/new-category",upload.single('image'),categoryController.newCategory);
// category.delete("/delete-category",);
category.patch("/update-category",categoryController.updateCategory);


export default category;