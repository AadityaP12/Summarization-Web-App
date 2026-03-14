import summaryModel from "../models/summaryModel.js";

class HistoryService {

    async getHistory () {

        try {
            const summaries= await summaryModel.find();
            console.log("saved summaries: ", summaries);   //summaries is an array of objects/documents
            return summaries;
            
        } catch (error) {
            console.error("failed to fetch summaries: ",error);
            return [];
            
        }

    }
}

export default new HistoryService();