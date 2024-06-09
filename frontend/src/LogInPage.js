import Navbar1 from "./Navbar1"
import { Link } from "react-router-dom";
import { useState } from "react";

function LogIn(){
    const [username , setUsername]=useState('');
    const [password , setPassword]=useState('');

    const handleLogin=()=>{
        
    }

    return(<>
    <div className='body-wrapper'>
    
    <Navbar1/>
  
    <div className='login-form-wrapper'>
  
    <form method='post' action='/LogIn' onSubmit={async (e)=>{
      e.preventDefault();
      handleLogin({username ,  password})
    }}>
      <h2>LogIn</h2>
      <input type='text' name='uniqueUser' placeholder='Enter your email' onChange={(e)=>setUsername(e.target.value)} required/>
      <input type='password' name='password' placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)} required/>
      <input className='login-submit' type='submit' value="LogIn"/>
    </form>
  
      <div className='login-extras-wrapper'>
      <p><Link to='/ForgotPassword'>Forgot Password?</Link></p>
      <p><Link to='/SignUp'>Don't have an Account?</Link></p>
      </div>
  
    </div>
  
    </div>

    </>
    )
}
export default LogIn