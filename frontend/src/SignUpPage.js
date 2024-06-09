import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar1 from "./Navbar1";

function SignUp(){

    const [username , setUsername]=useState("");
  const [techStack , setTechStack]=useState("");
  const [language , setLanguage]=useState("");
  const [codeforces , setCodeforces]=useState("");
  const [codechef ,  setCodechef]=useState("");
  const [leetcode ,  setLeetcode]=useState("");
  const [email , setEmail]=useState("");
  const [password , setPassword]=useState("");
  const [confirmPassword , setConfirmPassword]=useState("");

    return(<>
     <div className='body-wrapper'>
      <Navbar1/>
      <div className='signup-form-wrapper'>
  
    <form action='/SignUp' method='post' onSubmit={(e)=>{
      e.preventDefault();
      
    }}>
      <h2>SignUp</h2>
     
      <input type='text' name='username' placeholder='Enter a Username' onChange={(e)=>setUsername(e.target.value)} required/>
      <input type='text' name='email' placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} required/>
      <input type='text' name='techStack' placeholder='Enter your email' onChange={(e)=>setTechStack(e.target.value)} required/>
      <input type='text' name='techStack' placeholder='Enter your TeckStack' onChange={(e)=>setTechStack(e.target.value)} />
      <input type='text' name='language' placeholder='Enter your Preferred Language' onChange={(e)=>setLanguage(e.target.value)} />
      <input type='text' name='codeforces' placeholder='Enter your Rating in Codeforces' onChange={(e)=>setCodeforces(e.target.value)} />
      <input type='text' name='codechef' placeholder='Enter your Rating in CodeChef' onChange={(e)=>setCodechef(e.target.value)} />
      <input type='text' name='leetcode' placeholder='Enter your Rating in LeetCode' onChange={(e)=>setLeetcode(e.target.value)} />
      <input type='password' name='password' placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}  required/>
      <input type='password' name='conf_password' placeholder='Confirm your password' onChange={(e)=>setConfirmPassword(e.target.value)} required/>
      <input className='login-submit' type='submit' value="SignUP" />
    </form>
  
    </div>
    <div className='login-extras-wrapper'>
      <p><Link to='/ForgotPassword'></Link></p>
      <p><Link to='/LogIn'>Already have an Account?</Link></p>
      </div>
    </div>
    </>
    )
}
export default SignUp