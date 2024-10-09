import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate  } from "react-router-dom";
import "../blocks/Pages.css";
import Header from "../components/Header";
import MainPage from "../components/MainPage";
import Footer from "../components/Footer";
import Register from "../components/Register";
import Login from "./Login";
import ProtectedRoute from "../components/ProtectedRoute";
import * as auth from "../utils/auth";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  
  const navigate = useNavigate()

  useEffect(() =>{

  const jwt = localStorage.getItem("token")
  
    if (jwt){

      auth.checkToken(jwt).then((res) => {
        if (res){
          handleLoggedIn()
          navigate('/cards')
      }
    })
      .catch((err) => {
        if (err.message.includes('Failed to fetch' || err.message.includes('CORS'))){
          console.log(err)
        }
      })
    }
}, [])
  const handleLoggedIn = () => {
    setLoggedIn(true)
  }
  const handleLogOut = () => {
    setLoggedIn(false)
  }
  
  return (
    <div className="App">
      <Header handleLogOut={handleLogOut} />

      <Routes>
        <Route path="/signin"   element={<Login handleLoggedIn={handleLoggedIn}/>}></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/" element={<Login />} ></Route>
        <Route
          path="/cards"
          element={
            <ProtectedRoute loggedIn={loggedIn} >
              <MainPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
