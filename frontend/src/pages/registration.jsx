import React, { useState } from "react";
import axios from 'axios'
import { Form } from "react-router-dom";
function Register (){
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
        const response = await axios.post("http://localhost:5000/api/v1/user/register",{
            name,email,password}
        )
        alert("Registration Successful!")}
        catch(err){
            alert("User Already Exists")
        }
    }
    return(
        <div>
            <div className="register-container">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter Name"  onChange={(e)=>setName(e.target.value)} />
                    <input type="email" placeholder="Enter Email"  onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="Enter Password"  onChange={(e)=>setPassword(e.target.value)}/>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register