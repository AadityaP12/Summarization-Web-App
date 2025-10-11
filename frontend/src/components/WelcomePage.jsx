import { useState } from "react";
import LoginPage from "./Login";

function Welcome({onStart,userName}){


    const handleSubmit=()=>{

        onStart();
        

    }

    return(

        <div>
            <h1>Welcome {userName}!</h1>
            <h2>Get a clear summary of any privacy policy instantly.</h2>
            <form onSubmit={handleSubmit}>
                <button type="submit">Get Started</button>
            </form>
        </div>
    )


}

export default Welcome;