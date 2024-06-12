import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar1 from "./Navbar1";
import axios from "axios";

const ForgotPassword = () => {
    const [username, setUsername] = useState('');
    const [errorCase , setErrorCase] = useState('')
    const navigate = useNavigate()

    const handlePostOTP = async() => {
       try{
        const response  =await axios.post(`http://localhost:3000/ForgotPassword` , {username})
        const data = await response.json()
        if(data.error){
            throw new Error(data.message)
        }
        navigate('ResetPassword')
       }catch(error){
        setErrorCase(`Error Occured. ${error.message}`)
       }
    }

    return (
        <>
            <div className="body-wrapper">
                <Navbar1 />
                <div className="login-form-wrapper"> 
                    <form action="/ForgotPassword" method="post" onSubmit={async (e) => {
                        e.preventDefault();
                        handlePostOTP();
                    }}>
                        <h2>Forgot Password</h2>
                        <input type="text" placeholder="Enter your username" onChange={e => setUsername(e.target.value)} required/>
                        <input type="submit" value='Get OTP' />
                    </form>
                    <div>{errorCase}</div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
