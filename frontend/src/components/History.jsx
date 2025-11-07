import {useState} from "react";

function SummaryHistory({historyData}){



    console.log(`gotten history data: ${JSON.stringify(historyData, null, 2)}`);

    const [isLoading, setIsLoading]=useState(false);

    



//i got the array here. but i need to extract it and cleanly map the data for each object, through index.
    return(
        <div>
            {
                historyData.map((data, index)=>(
                    <div key={data._id} style={{outline: "2px solid white", width: "fit-content"}}>
                        <br></br>
                        <div style={{width: "fit-content"}}>
                            <h4 style={{textAlign: "left"}}>EVENT DATE</h4>
                            {data?.generated_at}
                        </div>
                        <br></br>
                        <br></br>
                        <div style={{outline: "2px solid white", width: "fit-content"}}>
                            <h4 style={{textAlign: "left"}}>REQUEST</h4>
                            {data?.policy_text}
                        </div>
                        <div style={{outline: "2px solid white", width: "fit-content"}}>
                            <h4 style={{textAlign: "left"}}>RESPONSE</h4>
                            {data?.summary_text}
                        </div>
                        
                    </div>
                ))
            }

        </div>
    )
}


export default SummaryHistory;