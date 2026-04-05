import admin from "firebase-admin"
import {readFileSync} from "fs"

const path = process.env.RENDER 
    ? "/etc/secrets/serviceAccountKey.json" 
    : "./serviceAccountKey.json";

const serviceAccount=JSON.parse(readFileSync(path));

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
});

export default admin;