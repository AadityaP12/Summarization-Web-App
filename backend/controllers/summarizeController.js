import fetch from "node-fetch"
import dotenv from "dotenv"

import summaryModel from "../models/summaryModel.js";

dotenv.config();



const summarizeController= async (req,res)=>{

    let timeout;
    let countdown;

    try {

        //const policyText=  req.body;      
    //console.log(`Policy text: ${JSON.stringify(policyText)}`);

    //the above is an object, to extract the text , u must add .policyText or destructure it

    const {policyText} =req.body; 
    //console.log(`Policy text: ${policyText}`);
    
    if(!policyText){

        return res.status(400).json({error: "Text is required!"});
    }
    

    const finalText= preprocessText(policyText);

    if(finalText.trim().split(/\s+/).length < 50){

        return res.status(400).json({error:"Text too short"});
    }

    const apiKey= process.env.API_KEY;

    const abortController= new AbortController();
    const signal= abortController.signal;

    let timeleft=30;


    countdown=setInterval(() => {

        timeleft--;
        console.log(timeleft);
        
        
    }, 1000);

    timeout= setTimeout(() => {

        
        abortController.abort();
                
    }, 30000);

        

    const response= await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn",{

        method:"POST",
        headers:{
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },

        body: JSON.stringify({inputs: finalText}),
        signal
    });

    clearTimeout(timeout);
    clearInterval(countdown);

    
    const data= await response.json();

    console.log(`API returned data: ${JSON.stringify(data)}`);
    
    const summary=data[0]?.summary_text;

    if(!summary){

        return res.status(500).json({error: "Failed to generate summary"});
    }

    

    res.status(200).json({ summary: summary});

    try {

        console.log('attempting to save summary in database...');

        const storeSummary= new summaryModel({policy_text: finalText, summary_text: summary, generated_at: Date.now()});
        await storeSummary.save();
        const savedSummaries= await summaryModel.find();
        console.log('Saved summaries:', savedSummaries);
        
    } catch (error) {

        console.error(`Failed to save summary.`);
        
    }

    
        
    } catch (error) {

        clearTimeout(timeout);
        clearInterval(countdown);

        if(error.name =="AbortError"){

            res.status(500).json({error: "Request timed out"})
        }
        
        else{
            console.log(error);
            res.status(500).json({error: "Failed to generate summary!"})

        }
    }




}

const preprocessText= (policyText)=> {

    const cleanedText=policyText.trim().replace(/\s+/g,' ');

    const maxLength=4500;

    const truncatedText= cleanedText.slice(0,maxLength);

    return truncatedText;

}


/*const mockReq= {body:{policyText:"TEXT HERE"}}; 
const mockRes= {
    
    json: (output)=>{
        console.log(`Response: ${JSON.stringify(output)}`);
    },

    status: (code)=>{

        console.log(`Status: ${code}`);
        return mockRes;
    }
    
}

summarizeController(mockReq,mockRes);*/

export default summarizeController;