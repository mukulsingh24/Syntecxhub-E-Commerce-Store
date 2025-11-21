import React, { useContext,useState } from "react";
import { CartContext } from "../context/CartContext"; // Import the Cloud
import axios from 'axios'

function CartPage() {
    const { cart } = useContext(CartContext);
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const handleCheckout = async() =>{
        const userString = localStorage.getItem("user")
        const user = JSON.parse(userString);
        const theme = { orderItems: cart, totalPrice, user: user._id }
        const response = await axios.post("http://localhost:5000/api/v1/order",theme)
        alert("Order Placed")
        clearCart()
    }
    return (
        <div>
            <h2>Your Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                {item.name} - ${item.price}
                            </li>
                        ))}
                    </ul>
                    
                    <h3>Total: ${totalPrice}</h3>
                    <button onClick={()=>handleCheckout}>Checkout</button>
                </div>
            )}
        </div>
    );
}

export default CartPage;