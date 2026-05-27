import dotenv from 'dotenv';
dotenv.config();

const config = {
    DB_URL: process.env.DB_URL,
    JWT_KEY: process.env.JWT_KEY,
    NODE_ENV: process.env.NODE_ENV || 'DEV'
};

export default config;
