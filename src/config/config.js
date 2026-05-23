import dotenv from 'dotenv';

dotenv.config();

if(!process.env.MONGO_URI || process.env.MONGO_URI === ''){
    throw new Error("URI key not present in .ENV file");
}
if(!process.env.JWT_KEY || process.env.JWT_KEY === ''){
    throw new Error("JWT KEY is not present");
}


export const config = {
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV,
    JWT_KEY: process.env.JWT_KEY
}