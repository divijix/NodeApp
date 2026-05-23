import mongoose from "mongoose";
import { config } from "./config.js";


const CONNECTION_OPTIONS = {
    maxPoolSize:5,
    minPoolSize:1,
    retryWrites:true,
    retryReads:true,
}


export async function connectToDB(MONGO_URI = config.MONGO_URI ){
    try{
        await mongoose.connect(MONGO_URI, CONNECTION_OPTIONS);
        checkConnection();
        console.log("connected to the DB");
    }catch(err){
        console.log(`Some Error happened ${err.message}`);
        throw err;
    }

}


function checkConnection(){
    mongoose.connection.on("disconnected",()=>{console.log("Disconnected from the DB")});
    mongoose.connection.on("reconnected",()=>{console.log("Reconnected to the DB")});
    mongoose.connection.on("error",(err)=>{console.log(`Some error happend ${err.message}`)})
}

// --- Graceful Shutdown ---

async function gracefulShutdown(signal = "SIGTERM"){
    console.log(`Signal Recived ${signal}, Gracefully shutting down`);
    try{
        if(mongoose.connection.readyState === 1){
            await mongoose.connection.close();
        }
    }catch(err){
        console.log(`Some error happened while Disconnecting ${err.message}`);
    }finally{
        console.log("Shut Down Successfully");
        if(config.NODE_ENV === 'DEV'){
            console.log("Exiting")
            process.exit(0);
        }
    }
    
}

process.on("SIGTERM", ()=>{gracefulShutdown("SIGTERM")});
process.on("SIGINT", ()=>{gracefulShutdown("SIGINT")});