import { useState } from "react";
import './Summarize.css';

function Summarize(){

  const [text, setText]= useState("");
  const [summary, setSummary]= useState("");
  const [isLoading, setIsLoading]= useState(false);

  const [error, setError]= useState("");
  

  const handleSubmit= async ()=>{

    

    try {

      setSummary("");
      setError("");
      setIsLoading(true);

    const response= await fetch("http://localhost:5000/api/v2.5/summarize",{

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({text})

    });

    console.log(`Response from API (raw): ${JSON.stringify(response)}`);

    const data= await response.json();

    console.log(`API data: ${JSON.stringify(data)}`);
     
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

    <div className="summarize-container glass-card">

      <h1>Summarize Your Text</h1>

      
      <textarea
      
      rows={20}
      cols={80}
      style={{margin: "auto", fontFamily: "Arial, sans-serif", textAlign:"center"}}
      placeholder="Paste your content here"
      value={text}
      onChange={(e)=> setText(e.target.value)} 
      className="text-input-area"     
      />

      <br/>
      <br/>


      <button onClick={handleSubmit} className="summarize-button">Simplify</button>

      <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Analyzing your text...</p>
      </div>

      
      <div className="result-section">
          <div className="summary-box">
              <p className="summary-label">Summary:</p>
              <p className="summary-text">{summary}</p>
          </div>
      </div>

      
      <div className="error-box">
          <p className="error-label">Error:</p>
          <p className="error-text">{error}</p>
      </div>


      {

        isLoading && (

          <div>
            <p>Loading...</p>
          </div>
        )
      }

      {
        summary && (
          <div>
            <p>Summary:</p>
            <p>{summary}</p>
          </div>
        )
      }

      {

        error && (
          <div>
            <p>Error:</p>
            <p>{error}</p>
          </div>
        )
      }

            

    </div>
  );
}


export default Summarize;