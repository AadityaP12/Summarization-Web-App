//my first backend code

import express from "express"
import cors from "cors"
import fetch from "node-fetch"
import dotenv from "dotenv"
import connectDB from "./configs/db.js"
import summarizeRoutes from "./routes/summarizeRoutes.js"


//load envs

dotenv.config();


//create the server

const app=express();
app.use(cors());
app.use(express.json());

const PORT=process.env.PORT || 5000;

connectDB();


//define base URL

app.use("/api/v3",summarizeRoutes);

//start the server

app.listen(PORT, ()=>{
    //console.log("server is running on PORT ",PORT);

    console.log(`server is running on PORT ${PORT}`);
});






