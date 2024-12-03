import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
};
  
const connection: ConnectionObject = {};

async function connectDB(): Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to DB!");
        return;        
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URL || "");
        console.log("Connected to DB!");
        connection.isConnected =  db.connections[0].readyState;
    } catch (error) {   
        console.log("Error connecting to DB!");
        process.exit(1);
    }
}

export default connectDB;