// Here goes modules imports
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import morgan from 'morgan';

// Here goes the file imports
import authRouter from './routes/auth.js';
// import { connectToDB } from './config/DBconnection.js';
import pool from './config/DBconnection.js';
import user from './routes/user.js';
import category from './routes/category.js'
import inquiry from './routes/inquiry.js';

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();

// connectToDB();

app.use(cors());
app.use(express.json()); // TODO handle wrong format of json data, json error handling 
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", user);
app.use("/api/v1/category", category);
app.use("/api/v1/inquiry",inquiry);



app.use(express.static(path.join(__dirname, 'public')));
export default app;