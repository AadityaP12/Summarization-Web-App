import LoginPage from "./components/Login";
import Welcome from "./components/WelcomePage";
import Summarize from "./components/Summarize";
import { useState } from "react";
import { useEffect } from "react";
import {auth} from "./firebase.js"
import { signOut } from "firebase/auth";
import { onAuthStateChanged} from "firebase/auth";
import './App.css'

function App(){

  const [currentState, setCurrentState]= useState("login");

  const [userInfo, setUserInfo]=useState({
    email:"",
    password:""
  })

  const {email, password}= userInfo;

  const handleLogin= ()=>{
    
    setCurrentState("welcome");

  }

  const handleWelcome=()=>{

    setCurrentState("summarize");
  }


  
  useEffect(()=>{

    const unsubscribe=onAuthStateChanged(auth,(user)=>{

      if(user) {
        setCurrentState("welcome");
      }
      else {
        setCurrentState("login");
      }


    });

    return unsubscribe;

  },[]);

  return(

    <div className="app-container">      

      {
        currentState!=="login" && (
          <button onClick={()=> signOut(auth)}  className="logout-button">
            Logout
          </button>
        )
      }                              
      {currentState==="login" && <LoginPage onSuccess={handleLogin} userInfo={userInfo} updateInfo={setUserInfo}/>}
      {currentState==="welcome" && <Welcome onStart={handleWelcome} userName={email}/>}
      {currentState==="summarize" && <Summarize/>}
    </div>
  )

}


export default App;