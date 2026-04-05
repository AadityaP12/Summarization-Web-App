import mongoose from "mongoose";


const summarySchema= new mongoose.Schema({

    input_text:{
        
        type: String,
        required: true 
    },
    summary_text: {

        type: String,
        required: true
    },
    generated_at: {

        type: Date,
        default: Date.now
    }

});

const summaryModel= mongoose.model('Summary', summarySchema);


export default summaryModel;