import { useState } from "react";
import {auth} from "../firebase.js"
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth"
import './Login.css';

function LoginPage({onSuccess, userInfo, updateInfo}){


    //under the hood

    /*props:{

    onSuccess: handleLogin(),
    userInfo: {

    email: "",
    password:""
    
    }
    
    }*/

    const [message,setMessage]=useState("");
    const [error, setError]=useState("");
    
    const [isRegistering, setIsRegistering]=useState(false);

    const {email, password}= userInfo;

    const handleChange=(e)=>{

        updateInfo({...userInfo, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e)=>{

        e.preventDefault(); 
        if(isRegistering) {

            try {

                const userCredential= await createUserWithEmailAndPassword(auth,email,password);    
                const user= userCredential.user;
                const token= await user.getIdToken();
                localStorage.setItem("token",token);
                onSuccess();
                setMessage("Registration Successful!");
                
            } catch (error) {

                setError(error.message);
                
            }

        }
        else {

            try {
            
                const userCredential= await signInWithEmailAndPassword(auth,email,password);
                const user=userCredential.user;
                const token=await user.getIdToken();
                localStorage.setItem("token",token);
                onSuccess();
                setMessage("Login Successful!");

            } catch (error) {

                setError(error.message);
                
            }

        }
        
    }

    const handleGoogle=()=>{
        //placeholder for future integration
    }


    return(
        <div className="login-container">

            <h1>Stop Scrolling, Start Understanding.</h1>
            <br/>

            <form onSubmit={handleSubmit} className="login-form">
                <input
                type="email"
                name="email"
                placeholder="Enter email"
                required={true}
                value={email}
                onChange={handleChange}
                className="login-input"
                />
                <input
                type="password"
                name="password"
                placeholder="Enter password"
                required={true}
                value={password}
                onChange={handleChange}
                className="login-input"
                />
                <br/>
                <button type="submit" className="login-button">{isRegistering ? "Register":"Login"}</button>
            </form>

            <p onClick={() => setIsRegistering(!isRegistering)} style={{textAlign:"center"}}>
                {isRegistering? "Already have an account? Login" : "Don't have an account? Register"}
            </p>
            

            <br/>
            {message && <p className="login-message">{message}</p>}
            {error && <p className="login-error">{error}</p>}
        </div>

    )


}

export default LoginPage;