import React,{useContext} from "react";
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext";
import "./navbar.css";
function Nav(){

    const { cart } = useContext(CartContext);
    const auth = localStorage.getItem('token');
    const logout = () =>{
        localStorage.removeItem('token')
        window.location.href="/login";
    }
    return(
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <div className="navbar-logo">🛍️</div>
                    <span>E-Commerce Store</span>
                </Link>
                <ul className="navbar-menu">
                    <li><Link to="/" className="navbar-link">Home</Link></li>
                    <li><Link to="/cart" className="navbar-link">
                        Cart <span className="cart-badge">{cart.length}</span>
                    </Link></li>
                </ul>
                <div className="navbar-auth">
                    {
                        auth ? 
                        <button className="navbar-button" onClick={logout}>Logout</button>
                        :
                        <div className="navbar-auth">
                            <Link to="/login" className="navbar-link">Login</Link>
                            <span className="navbar-divider">|</span>
                            <Link to="/register" className="navbar-link">Register</Link>
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Nav