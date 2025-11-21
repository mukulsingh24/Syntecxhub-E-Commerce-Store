import React from "react"
import Nav from "./components/navbar"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/homepage"
import Login from "./pages/loginpage"
import Register from "./pages/registration"
function App() {

  return (
    <>
        <Routes>
           <Route path="/" element={ <Home /> } />
           <Route path="/login" element={ <Login /> } />
           <Route path="/register" element={ <Register/> } />
        </Routes>
     </>
  )
}

export default App
