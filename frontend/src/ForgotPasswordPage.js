import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar1 from "./Navbar1";

const ForgotPassword=()=>{
    const [username , setUsername]=useState('')

   const callOTP=()=>{
    
    }

    return(<>
    <div className="body-wrapper">
        <Navbar1/>
        <form action="/ForgotPassword" method="post" onSubmit={async (e)=>{
            e.preventDefault();
            callOTP();
        }}>
            <input type="text" placeholder="Enter your username" onChange={e=>setUsername(e.target.value)}/>
            <input type="submit" value='Get OTP' />
        </form>
        </div>
    </>)
}

export default ForgotPassword