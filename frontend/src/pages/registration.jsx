import React, { useState } from "react";
import axios from 'axios'
import { Form } from "react-router-dom";
import './registration.css';
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
        <div className="register-page">
            <div className="register-container">
                <div className="register-header">
                    <h1>Create Account</h1>
                    <p>Join our community and start shopping today</p>
                </div>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            placeholder="Enter your full name"  
                            onChange={(e)=>setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="Enter your email address"  
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Create a strong password"  
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="terms-agreement">
                        <input type="checkbox" id="terms" required />
                        <label htmlFor="terms">
                            I agree to the <a href="#terms">Terms & Conditions</a>
                        </label>
                    </div>
                    <button type="submit" className="submit-btn">Create Account</button>
                </form>
                <div className="form-divider"><span>or</span></div>
                <div className="register-footer">
                    Already have an account? <a href="/login">Sign in here</a>
                </div>
            </div>
        </div>
    )
}

export default Register