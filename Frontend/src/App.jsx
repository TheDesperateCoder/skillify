// import React, { useState } from "react";
// import { Route, Routes } from "react-router-dom";
import Main from "./Pages/main";
// import "./App.css"
import Login from "./Pages/login";
import Signup from "./Pages/signup";



// function App() {

//   const data = JSON.parse(localStorage.getItem("user"))
//   console.log(data)
 
//   return (
// <>
//  <Routes>
//  <Route path="/" element={<h1>Hello</h1>}></Route>
//   <>
//  if(!data){
//     <>
//     <Route path="/Login" element={<Login/>}></Route>
//     <Route path="/Signup" element={<Signup/>}></Route>
//     </>
//   }
  
//   if(data?.user?.accountType === "Candidate"){
//     <Route path="/candidate" element={<Main/>}></Route>
//   }
  
//  if(data?.user?.accountType === "Recruiter"){
//     <Route path="/Recruiter" element={<h1>bhbhb</h1>}></Route>
//   } 
//   </>
  
//  </Routes>
//  </>
//   );
// }

// export default App;    



import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import axios from 'axios';

// Import your components (replace with your actual components)
// import Login from './Login'; // Make sure these paths are correct
// import Signup from './Signup';
// import Main from './Main';

function App() {
  const userData = JSON.parse(localStorage.getItem("user"))

  return (
      <Routes>
        <Route path="/" element={
          userData?.user?.accountType === "Candidate" ? (
           <Main />
        ) : <Login></Login>
        } />
          <Route path="/" element={
          userData?.user?.accountType === "Recruiter" ? (
          <><h1>Sorry for Discomfort, This page will be Available Soon.</h1></>
        ) : <Login></Login>
        } />
      <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
  );
}

export default App;