import React,{useContext} from "react";
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext";
function Nav(){

    const { cart } = useContext(CartContext);
    const auth = localStorage.getItem('token');
    const logout = () =>{
        localStorage.removeItem('token')
        window.location.href="/login";
    }
    return(
        <div>
            <h1>E-Commerce Store</h1>
            <Link to="/cart">Cart ({cart.length})</Link>
            <span> | </span>
            {
                auth ? 
                <button onClick={logout}>Logout</button>
                :
                <div><Link to="/login">Login</Link>
                <span> | </span>
                <Link to="/register">Register</Link>
                </div>
            }
        </div>
    )
}

export default Nav