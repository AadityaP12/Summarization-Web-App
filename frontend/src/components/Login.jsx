import { useState } from "react";

function LoginPage({onSuccess, userInfo, updateInfo}){


    //under the hood

    /*props:{

    onSuccess: handleLogin(),
    userInfo: {

    username: "",
    password:""
    
    }
    
    }*/


    

    const {username, password}= userInfo;

    const handleChange=(e)=>{

        updateInfo({...userInfo, [e.target.name]: e.target.value})
    }

    const handleSubmit=(e)=>{

        e.preventDefault();
        onSuccess();

        
        

        
    }

    const handleGoogle=()=>{
        //placeholder for future integration
    }


    return(
        <div>

            <h1>Stop Scrolling, Start Understanding.</h1>

            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="username"
                placeholder="Enter username"
                required={true}
                value={username}
                onChange={handleChange}
                />
                <input
                type="password"
                name="password"
                placeholder="Enter password"
                required={true}
                value={password}
                onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>
            <form onSubmit={handleGoogle}>
                <button type="submit">Sign in with Google</button>
            </form>
        </div>

    )


}

export default LoginPage;