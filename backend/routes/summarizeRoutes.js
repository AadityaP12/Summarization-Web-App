import express from "express"
import summarizeController from "../controllers/summarizeController.js"
import historyController from "../controllers/historyController.js";

const router= express.Router();

router.post("/summarize",summarizeController);  //call the controller, not the service

router.get("/history",historyController);

export default router;