import React,{useState} from "react";
import axios from "axios";



export const Register=()=>{
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [message,setMessage]=useState("");

    return (
        <div className="register">
<h1>Register</h1>
<input type={'email'} placeholder="Email..." onChange={(e)=>{
    setEmail(e.target.value);
}} />
<input type={'password'} placeholder="Password..." onChange={(e)=>{
    setPassword(e.target.value);
}} />
<button onClick={()=>{
     axios.post("http://localhost:5000/register", {
        email,
        password,
        role_id:1,
      })

.then((result)=>{
   if(result.data.success){
     setMessage('Create account successfully')  
   } 
}).catch((err)=>{
    console.log(err.message);
    return setMessage('try again')
})

}}>Register</button>
  <p>{message}</p>
        </div>
      
    )
}