import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./style.css"
import { useDispatch, useSelector } from "react-redux";
import {  logout } from "../../redux/reducers/auth";

//===============================================================

const NavBar = () => {
  const dispatch = useDispatch();
  const {token,isLoggedIn} = useSelector((state) => {
    // specify which state to subscribe to (state tree => reducer => state name )
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  //===============================================================

  return (
    
      <div className="NavBar">
     
            <Link className="Link" to="/">
              Register
            </Link>
            <Link to="/login">Login</Link>
            </div>
         )
};

export default NavBar;
