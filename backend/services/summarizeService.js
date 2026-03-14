import summaryModel from "../models/summaryModel.js";
import fetch from "node-fetch";

class SummmarizeService {

    constructor(){

        this.maxLength=4500;
        this.timeout=30000;
        this.apiURL="https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn";
        this.apiKey=process.env.API_KEY;

    }


    preprocessText(inputText) {

        const cleanedText=inputText.trim().replace(/\s+/g,' ');

        const truncatedText= cleanedText.slice(0,this.maxLength);

        return truncatedText;

    }


    async generateSummary(finalText) {

        const abortController= new AbortController();
        const signal= abortController.signal;

        const timeout= setTimeout(() => {
            
            abortController.abort();
                    
        }, this.timeout);

        try {
            

        const response= await fetch(this.apiURL,{

            method:"POST",
            headers:{
                Authorization: `Bearer ${this.apiKey}`,
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


    async saveSummary (finalText,summary) {

        try {

            console.log('attempting to save summary in database...');

            const storeSummary= new summaryModel({input_text: finalText, summary_text: summary, generated_at: new Date()});
            await storeSummary.save();
            console.log("saved.");
            
            
        } catch (error) {

            console.error(`Failed to save summary: ${error}`);
            
        }
    }
    }


export default new SummmarizeService();