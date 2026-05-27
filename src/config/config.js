import dotenv from 'dotenv';

dotenv.config();

const requiredConfig = {
    DB_URL: process.env.DB_URL,
    JWT_KEY: process.env.JWT_KEY,
    CL_CLOUD_NAME: process.env.CL_CLOUD_NAME,
    CL_KEY: process.env.CL_KEY,
    CL_SECRET: process.env.CL_SECRET,
}


// checking if all the Required Configs are present

for(const[key, value] of Object.entries(requiredConfig)){
    if(!value || value.trim() === ''){
        throw new Error(`CRITICAL CONFIG ERROR: ENV variable missing ${key} is missing `);
    }
}

const config = {
    ...requiredConfig,
    // non important configs 
    NODE_ENV: process.env.NODE_ENV || 'DEV'
}

export default config;