import LoginPage from "./components/Login";
import Welcome from "./components/WelcomePage";
import Summarize from "./components/SummarizePage";
import { useState } from "react";

function App(){

  const [currentState, setCurrentState]= useState("login");

  const [userInfo, setUserInfo]=useState({
    username:"",
    password:""
  })

  const {username, password}= userInfo;

  const handleLogin= ()=>{
    
    setCurrentState("welcome");

  }

  const handleWelcome=()=>{

    setCurrentState("summarize");
  }

  return(

    <div>                                    
      {currentState==="login" && <LoginPage onSuccess={handleLogin} userInfo={userInfo} updateInfo={setUserInfo}/>}
      {currentState==="welcome" && <Welcome onStart={handleWelcome} userName={username}/>}
      {currentState==="summarize" && <Summarize/>}
    </div>
  )

}


export default App;