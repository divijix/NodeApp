// import mongoose from "mongoose";
import config from './config.js';

// const CONNECTION_OPTIONS = {
//     maxPoolSize:5,
//     minPoolSize:1,
//     retryWrites:true,
//     retryReads:true,
// }


// export async function connectToDB(MONGO_URI = config.MONGO_URI ){
//     try{
//         await mongoose.connect(MONGO_URI, CONNECTION_OPTIONS);
//         checkConnection();
//         console.log("connected to the DB");
//     }catch(err){
//         console.log(`Some Error happened ${err.message}`);
//         throw err;
//     }

// }


// function checkConnection(){
//     mongoose.connection.on("disconnected",()=>{console.log("Disconnected from the DB")});
//     mongoose.connection.on("reconnected",()=>{console.log("Reconnected to the DB")});
//     mongoose.connection.on("error",(err)=>{console.log(`Some error happend ${err.message}`)})
// }

// // --- Graceful Shutdown ---

// async function gracefulShutdown(signal = "SIGTERM"){
//     console.log(`Signal Recived ${signal}, Gracefully shutting down`);
//     try{
//         if(mongoose.connection.readyState === 1){
//             await mongoose.connection.close();
//         }
//     }catch(err){
//         console.log(`Some error happened while Disconnecting ${err.message}`);
//     }finally{
//         console.log("Shut Down Successfully");
//         if(config.NODE_ENV === 'DEV'){
//             console.log("Exiting")
//             process.exit(0);
//         }
//     }
    
// }

// process.on("SIGTERM", ()=>{gracefulShutdown("SIGTERM")});
// process.on("SIGINT", ()=>{gracefulShutdown("SIGINT")});




//
//
import pkg from 'pg';
// import config from './config';
const {Pool} = pkg;

const pool = new Pool({
    connectionString: config.DB_URL,
    ssl:{
        rejectUnauthorized: false
    },
    idleTimeoutMillis:30000
});

pool.on("connect", ()=>{console.log("Connection established to the PostDB")});

// Test the connection immediately on startup and initialize tables
pool.connect()
    .then(async (client) => {
        console.log("Database connection successful!");
        try {
            await client.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    username VARCHAR(255) NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    profile TEXT
                );
            `);
            console.log("Database tables verified/created successfully.");
        } catch (tableErr) {
            console.error("Failed to verify/create database tables:", tableErr.message);
        } finally {
            client.release();
        }
    })
    .catch(err => {
        console.error("Database connection failed:", err.message);
    });

export default pool;