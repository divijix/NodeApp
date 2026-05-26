import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth.js';
// import { connectToDB } from './config/DBconnection.js';
import pool from './config/DBconnection.js';
import User from './routes/user.js';
import category from './routes/category.js';
import products from './routes/products.js';

const app = express();

// connectToDB();

app.use(cors());
app.use(express.json()); // TODO handle wrong format of json data, json error handling 
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", User);
app.use("/api/v1/category", category);
app.use("/api/v1/products", products)

export default app;
