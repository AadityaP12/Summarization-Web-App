import { useState } from "react";
import SummaryHistory from "./History";
import './WelcomePage.css';

function Welcome({onStart,userName}){

    const [showHistory, setShowHistory]=useState(false);
    const [error, setError]=useState("");
    const [isLoading, setIsLoading]=useState(false);
    const [historyData, setHistoryData]=useState([]);
    const [showWelcome, setShowWelcome]= useState(true);

    const BASE_URL=import.meta.env.VITE_API_URL;


    const handleSubmit=()=>{

        onStart(); 

    }

    const getHistory= async ()=>{

        //to show the history
        setIsLoading(true);
        setShowHistory(true);
        try {

            const token=localStorage.getItem("token");
            
            const fetchHistory= await fetch(`${BASE_URL}/history`,{

                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            });

            
            const data= await fetchHistory.json();
            //console.log("type of history data: ", typeof(data));
            //console.log(`history data [RAW]: ${JSON.stringify(data, null, 2)}`);

            //const firstKey=Object.keys(data)[0];
           
            const summaryData=data.savedSummaries;
            //console.log("extracted summary data: ", summaryData);
            //console.log("type of summary data: ", typeof(summaryData));  
            

            if(fetchHistory.ok){
                setIsLoading(false);
                setHistoryData(summaryData);
                setShowWelcome(false);

            }
            

            
        } catch (error) {

            setIsLoading(false);
            setError("Unable to fetch history from server 🙁: ", error);

        }                
        
    }

    return(

        <div className={showHistory && !showWelcome ? "history-wrapper":"welcome-container"}>
            {
                showWelcome===true && (

                    <>
                        <h1 className="welcome-title">
                            Welcome {userName.split("@")[0]}!
                        </h1>
                        <h2 className="welcome-subtitle">Get a clear summary of your queries instantly.</h2>
                        <div className="button-group">
                            <button onClick={handleSubmit} className="primary-button">Get Started</button>
                            <button onClick={getHistory} className="secondary-button">Show History</button>
                        </div>
                    </>
                )
            }
            
            {isLoading && (
            <div className="welcome-loading">
                <div className="welcome-spinner"></div>
                <p>Loading history...</p>
            </div>
)}
            {showHistory===true && showWelcome===false && <SummaryHistory historyData={historyData}/>}
        </div>
    )


}

export default Welcome;