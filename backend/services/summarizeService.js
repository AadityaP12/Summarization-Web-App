import summaryModel from "../models/summaryModel.js";
import fetch from "node-fetch";

class SummarizeService {

    constructor(){

        this.maxLength=4500;
        this.timeout=60000;
        this.apiURL="https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn";

    }


    preprocessText(inputText) {

        const cleanedText=inputText.trim().replace(/\s+/g,' ');

        const truncatedText= cleanedText.slice(0,this.maxLength);

        return truncatedText;

    }


    async generateSummary(finalText) {

        const apiKey=process.env.API_KEY;
        
        const abortController= new AbortController();
        const signal= abortController.signal;

        const timeout= setTimeout(() => {
            
            abortController.abort();
                    
        }, this.timeout);

        try {
            

        const response= await fetch(this.apiURL,{

            method:"POST",
            headers:{
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                inputs: finalText,
                options: {wait_for_model:true}
            }),
            signal
        });

        clearTimeout(timeout);

        
        const data= await response.json();
        
        const summary=data[0]?.summary_text;

        return summary;
            
        } catch (error) {
            clearTimeout(timeout);
            throw error;
        }

    }


    async saveSummary (finalText,summary) {

        try {


            const storeSummary= new summaryModel({input_text: finalText, summary_text: summary, generated_at: new Date()});
            await storeSummary.save();
            
            
        } catch (error) {

            // save failed silently -> non-critical
            
        }
    }
    }


export default new SummarizeService();