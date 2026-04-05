import { useState } from "react";
import './Summarize.css';

function Summarize(){

  const [text, setText]= useState("");
  const [summary, setSummary]= useState("");
  const [isLoading, setIsLoading]= useState(false);

  const [error, setError]= useState("");

  const BASE_URL=import.meta.env.VITE_API_URL;
  

  const handleSubmit= async ()=>{

    

    try {

      setSummary("");
      setError("");
      setIsLoading(true);

      const token=localStorage.getItem("token");

      const response= await fetch(`${BASE_URL}/summarize`,{
      

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },

      body: JSON.stringify({text})

    });

    //console.log(`Response from API (raw): ${JSON.stringify(response)}`);

    const data= await response.json();

    //console.log(`API data: ${JSON.stringify(data)}`);
     
    if(response.ok){

      setIsLoading(false);
      setSummary(data.summary);
      

    } else{

      setIsLoading(false);
      setError(data.error);
    }
      
    } catch (error) {

      if(error.name=== "AbortError"){
        setError("The request took too long. Please try again.");
      }
      else{
        setError("Failed to connect to server. Please try again later.");
      }
    }
    finally{
      setIsLoading(false);
    }

    
  }

  return(

    <div className="summarize-container">

      <h1>Summarize Your Text</h1>

      
      <textarea
      placeholder="Paste your content here"
      value={text}
      onChange={(e)=> setText(e.target.value)} 
      className="text-input-area"     
      />

      <br/>
      <br/>


      <button onClick={handleSubmit} className="summarize-button">Simplify</button>


      {isLoading && (
    <div className="summarize-loading">
        <div className="summarize-spinner"></div>
        <p>Analyzing your text...</p>
    </div>
    )}

    {summary && (
        <div className="summary-result">
            <p className="summary-label">Summary</p>
            <p className="summary-text">{summary}</p>
        </div>
    )}

    {error && (
        <div className="error-result">{error}</div>
    )}

            

    </div>
  );
}


export default Summarize;