import Router from 'express';
import * as productController from '../controllers/products.controller.js';
const products = Router();

// products.get("/category",);
products.get("/", productController.getProducts);
// products.get("/:id",);
// products.post("/new-product",);
// products.psot("/update-product",);

export default products;