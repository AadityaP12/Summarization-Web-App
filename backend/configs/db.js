import mongoose from "mongoose"

const connectDB= async ()=>{

    try {

        const conn= await mongoose.connect(process.env.MONGO_URI);

        //console.log("connection object: ", conn);
        console.log(`Connected to MongoDB successfully: ${conn.connection.host}`);
        
    } catch (error) {

        //console.log(`connection object: ${JSON.stringify(conn)}`);
        console.log(`Failed to connect: ${error.message}`);
        process.exit(1);
        
    }
}

export default connectDB;