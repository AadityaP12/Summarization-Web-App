import summaryModel from "../models/summaryModel.js";

class HistoryService {

    async getHistory () {

        try {
            const summaries= await summaryModel.find();
            return summaries;
            
        } catch (error) {
            
            return [];
            
        }

    }
}

export default new HistoryService();