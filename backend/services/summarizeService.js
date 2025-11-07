import summaryModel from "../models/summaryModel.js";
import fetch from "node-fetch";

export const preprocessText= (policyText)=> {

    const cleanedText=policyText.trim().replace(/\s+/g,' ');

    const maxLength=4500;

    const truncatedText= cleanedText.slice(0,maxLength);

    return truncatedText;

}


export const generateSummary=async (finalText)=>{

    const apiKey= process.env.API_KEY;

    const abortController= new AbortController();
    const signal= abortController.signal;

    const timeout= setTimeout(() => {
        
        abortController.abort();
                
    }, 30000);

    try {
        

    const response= await fetch("https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",{

        method:"POST",
        headers:{
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },

        body: JSON.stringify({inputs: finalText}),
        signal
    });

    clearTimeout(timeout);

    
    const data= await response.json();

    console.log(`API returned data: ${JSON.stringify(data)}`);
    
    const summary=data[0]?.summary_text;

    return summary;
        
    } catch (error) {
        clearTimeout(timeout);
        console.error("error generating summary: ",error);
        throw error;
    }

}


export const saveSummary=async (finalText,summary)=>{

    try {

        console.log('attempting to save summary in database...');

        const storeSummary= new summaryModel({policy_text: finalText, summary_text: summary, generated_at: new Date()});
        await storeSummary.save();
        console.log("saved.");
        
        
    } catch (error) {

        console.error(`Failed to save summary: ${error}`);
        
    }
}


