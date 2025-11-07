import { useState } from "react";
import SummaryHistory from "./History";

function Welcome({onStart,userName}){

    const [showHistory, setShowHistory]=useState(false);
    const [error, setError]=useState("");
    const [isLoading, setIsLoading]=useState(false);
    const [historyData, setHistoryData]=useState([]);
    const [showWelcome, setShowWelcome]= useState(true);


    const handleSubmit=()=>{

        onStart(); 

    }

    const getHistory= async ()=>{

        //to show the history
        setIsLoading(true);
        setShowHistory(true);
        try {

            const fetchHistory= await fetch("http://localhost:5000/api/v2/history");

            console.log("fetchHistory [RAW]: ", fetchHistory);

            const data= await fetchHistory.json();
            console.log("type of history data: ", typeof(data));
            console.log(`history data [RAW]: ${JSON.stringify(data, null, 2)}`);

            const firstKey=Object.keys(data)[0];
            console.log("first key: ", firstKey);
            const summaryData=data[firstKey];
            console.log("extracted summary data: ", summaryData);
            console.log("type of summary data: ", typeof(summaryData));  
            

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

        <div>
            {
                showWelcome===true && (

                    <>
                        <h1>Welcome {userName}!</h1>
                        <h2>Get a clear summary of any privacy policy instantly.</h2>
                        <div>
                            <button onClick={handleSubmit}>Get Started</button>
                            <br/>
                            <br/>
                            <button onClick={getHistory}>Show History</button>
                        </div>
                    </>
                )
            }
            
            {isLoading===true && (
                    <p>Loading...</p>
                )}
            {showHistory===true && showWelcome===false && <SummaryHistory historyData={historyData}/>}
        </div>
    )


}

export default Welcome;