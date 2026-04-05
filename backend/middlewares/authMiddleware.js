import admin from "../configs/firebase.js"


const authenticate= async (req,res,next) => {

    try {

        const authHeader=req.headers.authorization;

        if(!authHeader) {
            return res.status(400).json({"error":"no token provided"});
        }

        const token=authHeader.split(" ")[1];
        const decoded= await admin.auth().verifyIdToken(token);   
        req.user=decoded;
        next();
        
    } catch (error) {

        res.status(401).json({"error":"invalid token"});
        
    }


}


export default authenticate;