import dotenv from 'dotenv';
dotenv.config();

const config = {
    DB_URL: process.env.DB_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL,
    JWT_KEY: process.env.JWT_KEY,
    NODE_ENV: process.env.NODE_ENV || 'DEV'
};

if (!config.DB_URL) {
    console.warn("WARNING: DB_URL (or DATABASE_URL/POSTGRES_URL) is not defined in environment variables!");
}
if (!config.JWT_KEY) {
    console.warn("WARNING: JWT_KEY is not defined in environment variables!");
}

export default config;
