import React,{useState} from "react";
import axios from 'axios'
import './loginpage.css';

function Login (){
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
        const response = await axios.post("http://localhost:5000/api/v1/user/login",{
            email,password},
        )
        alert("Login Successful!")
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.location.href = "/"}
        catch(err){
            alert("Invalid Credentials")
        }
    }
    return(
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1>Welcome Back</h1>
                    <p>Sign in to your account to continue shopping</p>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
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
                            placeholder="Enter your password"  
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Sign In</button>
                </form>
                <div className="form-divider"><span>or</span></div>
                <div className="login-footer">
                    Don't have an account? <a href="/register">Create one now</a>
                </div>
            </div>
        </div>
    )
}

export default Login