import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { login} from "../../redux/reducers/auth";


export const Login = () => {

  const dispatch = useDispatch();
  const {token,isLoggedIn} = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });

// ===================================

  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  //===================================

  const loginn =()=> {

 
    axios.post("http://localhost:5000/login", {
        email,
        password
      })
    .then((result)=>{
if(result.data.success){
    setMessage('login succefull')
    dispatch(login(result.data.token));
} 
 
    })
      
   .catch ((err)=> {
     
      setMessage("Error happened while Login, please try again");
    })
}

  //===============================================================



  return (
    <>
      <div className="Form">
        <p className="Title">Login</p>
      
          <br />

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button
            onClick={() => {
              loginn();
            }}
          >
            Login
          </button>
          <p>{message}</p>
      

       
      </div>
    </>
  );
};


