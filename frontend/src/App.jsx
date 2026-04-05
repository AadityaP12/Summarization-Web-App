import LoginPage from "./components/Login";
import Welcome from "./components/WelcomePage";
import Summarize from "./components/Summarize";
import { useState } from "react";
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

  return(

    <div className="app-container">                                    
      {currentState==="login" && <LoginPage onSuccess={handleLogin} userInfo={userInfo} updateInfo={setUserInfo}/>}
      {currentState==="welcome" && <Welcome onStart={handleWelcome} userName={email}/>}
      {currentState==="summarize" && <Summarize/>}
    </div>
  )

}


export default App;