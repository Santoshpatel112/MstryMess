import mongoose from "mongoose";


// The value Return in Object form  after DB connection 
type ConnectionObject={
    isConnected ? :number // question mark means optional   
}

const connection :ConnectionObject={} 

async function dbconnect():Promise<void>{
    if(connection.isConnected){
        console.log("MongoDB: Already connected");
        return;
    }

    if (!process.env.MONGO_URI) {
        throw new Error("Please define MONGO_URI in your environment variables");
    }

    try {
        const opts = {
            bufferCommands: true,
        };

        const dbconnect = await mongoose.connect(process.env.MONGO_URI, opts);
        connection.isConnected = dbconnect.connections[0].readyState;
        console.log("MongoDB: Connected successfully");

    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error; // Let the calling code handle the error
    }
}

export default dbconnect;