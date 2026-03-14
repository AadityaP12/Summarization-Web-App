import HistoryService from "../services/historyService.js";

const historyController=async (req,res)=>{

    try {

        const savedSummaries=await HistoryService.getHistory();
        res.status(200).json({savedSummaries});
        
    } catch (error) {

        res.status(500).json({error: "failed to fetch history"});;
        
    }
}

export default historyController;