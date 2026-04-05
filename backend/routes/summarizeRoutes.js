import express from "express"
import summarizeController from "../controllers/summarizeController.js"
import historyController from "../controllers/historyController.js";
import authenticate from "../middlewares/authMiddleware.js";
import rateLimit from "express-rate-limit";

//apply rate limiting

const generalLimiter=rateLimit({
    windowMs: 15 * 60 * 1000,
    max:100,
    message:{error: "Too many requests, please try again later."}

});

const summarizeLimiter=rateLimit({
    windowMs:15 * 60 * 1000,
    max:10,
    message:{error:"Too many requests, please try again later."}

});


const router= express.Router();

router.post("/summarize",summarizeLimiter,authenticate,summarizeController);  
router.get("/history",generalLimiter,authenticate,historyController);

export default router;