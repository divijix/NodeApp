import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth.js';
import pool from './config/DBconnection.js';
import User from './routes/user.js';

const app = express();

app.use(cors());
app.use(express.json()); // TODO handle wrong format of json data, json error handling 
app.use(cookieParser());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'API is running',
        routes: [
            '/api/v1/auth/register',
            '/api/v1/auth/login',
            '/api/v1/user/update-profile'
        ]
    });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', User);

app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        path: req.originalUrl
    });
});

export default app;
