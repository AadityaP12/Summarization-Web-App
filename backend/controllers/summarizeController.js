import {generateSummary,saveSummary,preprocessText} from "../services/summarizeService.js"

const summarizeController= async (req,res)=>{


    try {

    const {policyText} =req.body; 
    
    if(!policyText){

        return res.status(400).json({error: "Text is required!"});
    }
    

    const finalText= preprocessText(policyText);

    if(finalText.trim().split(/\s+/).length < 50){

        return res.status(400).json({error:"Text too short."});
    }

    const summary= await generateSummary(finalText);

    if(!summary){

        return res.status(500).json({error: "Failed to generate summary ❌"});
    }

    
    res.status(200).json({ summary: summary});

    saveSummary(finalText,summary);

         
    } catch (error) {


        if(error.name =="AbortError"){

            res.status(500).json({error: "Request timed out"})
        }
        
        else{
            console.log("🚩 Failed to generate summary: ",error);
            res.status(500).json({error: "Failed to generate summary!"})

        }
    }

}

export default summarizeController;