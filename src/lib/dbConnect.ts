import { log } from "console";
import mongoose from "mongoose";


// The value Return in Object form  after DB connection 
type ConnectionObject={
    isConnected ? :number // question mark means optional   
}

const connection :ConnectionObject={} 

async function dbconnect():Promise<void>{
    if(connection.isConnected){
        console.log("already connected")
        return;
    }
    try {
       const dbconnect= await mongoose.connect(process.env.MONGO_URI ||"",{});
        connection.isConnected=dbconnect.connections[0].readyState; // db connection [0] is default on ready state
        console.log("Db connected Sucesfuly",dbconnect);

    } catch (error) {
        log("Db connection failed",error);
        // proces gressfulyy exit 
        process.exit(1);
    }
}

export default dbconnect;