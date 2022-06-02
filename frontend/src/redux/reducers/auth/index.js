import {createSlice} from "@reduxjs/toolkit";

 const authSlice = createSlice({
 name:"auth",
 initialState:{
     token:localStorage.getItem("token")||"",
     isLoggedIn:localStorage.getItem("token")?true:false,
 },
 reducers:{
     login:(state,action)=>{
         state.token=action.payload;
         localStorage.setItem('token',action.payload);
         state.isLoggedIn=true;
     },
     logout:(state,action)=>{
         localStorage.clear();
         state.token="";
         state.isLoggedIn=false;
     }
 }


})

export const {login,logout} = authSlice.actions;

export default authSlice.reducer;