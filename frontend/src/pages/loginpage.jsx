import React,{useState} from "react";
import axios from 'axios'

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
        <div>
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Enter Email"  onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="Enter Password"  onChange={(e)=>setPassword(e.target.value)}/>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login