import mongoose from "mongoose";


//define the schema for the database


const summarySchema= new mongoose.Schema({

    policy_text:{
        
        type: String,
        required: true 
    },
    summary_text: {

        type: String,
        required: true
    },
    generated_at: {

        type: Date,
        default: Date.now()}

});

const summaryModel= mongoose.model('Summary', summarySchema);


export default summaryModel;