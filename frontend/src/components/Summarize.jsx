import { useState } from "react";

function Summarize(){

  const [policyText, setPolicyText]= useState("");
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

      body: JSON.stringify({policyText})

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

    <div style={{margin:"auto", fontFamily: "Arial, sans-serif", textAlign: "center"}}>
      
      <textarea
      
      rows={20}
      cols={80}
      style={{margin: "auto", fontFamily: "Arial, sans-serif", textAlign:"center"}}
      placeholder="Paste your privacy content here"
      value={policyText}
      onChange={(e)=> setPolicyText(e.target.value)}      
      />

      <br/>
      <br/>


      <button onClick={handleSubmit} style={{margin:"auto"}}>Simplify</button>


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