import {useState} from "react";
import './History.css';

function SummaryHistory({historyData}){



    //console.log(`gotten history data: ${JSON.stringify(historyData, null, 2)}`);

    const [isLoading, setIsLoading]=useState(false);

    



//i got the array here. but i need to extract it and cleanly map the data for each object, through index.
    return(
        <div className="history-container">
            <h2 className="history-title">Your Summary History</h2>
            <div className="history-grid">
                {
                historyData.map((data, index)=>(
                    <div key={data._id} className="history-card">
                        <br></br>

                        <div className="history-date">
                            
                            {new Date(data?.generated_at).toLocaleDateString()}
                        </div>

                        <br></br>
                        <br></br>

                        <div>
                            <h4 className="history-section-title">Original Text</h4>
                            <div className="history-request">{data?.input_text}</div>
                        </div>
                        <div className="history-divider"></div>


                        <div>
                            <h4 className="history-section-title">Summary</h4>
                            <div className="history-response">{data?.summary_text}</div>
                        </div>
                        
                    </div>
                ))
            }

            </div>
        </div>
    )
}


export default SummaryHistory;