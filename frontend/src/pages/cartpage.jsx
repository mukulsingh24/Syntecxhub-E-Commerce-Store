import React, { useContext,useState } from "react";
import { CartContext } from "../context/CartContext"; // Import the Cloud
import axios from 'axios'
import './cartpage.css';

function CartPage() {
    const { cart,clearCart} = useContext(CartContext);
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
        <div className="cart-page">
            <div className="cart-container">
                <div className="cart-header">
                    <h1>Shopping Cart</h1>
                </div>
                
                <div className="cart-content">
                    <div className="cart-items">
                        {cart.length === 0 ? (
                            <div className="cart-items-empty">
                                <div className="empty-icon">🛒</div>
                                <p className="empty-message">Your cart is empty</p>
                                <a href="/" className="continue-shopping">Continue Shopping</a>
                            </div>
                        ) : (
                            <div>
                                {cart.map((item, index) => (
                                    <div className="cart-item" key={index}>
                                        {item.image && (
                                            <img src={item.image} alt={item.name} className="cart-item-image" />
                                        )}
                                        <div className="cart-item-details">
                                            <div className="cart-item-name">{item.name}</div>
                                            <div className="cart-item-meta">
                                                <span className="meta-item">ID: {item._id?.substring(0, 8)}</span>
                                            </div>
                                        </div>
                                        <div className="price">${item.price}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="cart-summary">
                            <div className="summary-title">Order Summary</div>
                            <div className="summary-row">
                                <span>Subtotal ({cart.length} items)</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="summary-row">
                                <span>Tax</span>
                                <span>${(totalPrice * 0.1).toFixed(2)}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span className="price">${(totalPrice + (totalPrice * 0.1)).toFixed(2)}</span>
                            </div>

                            <div className="promo-code">
                                <div className="promo-input-group">
                                    <input type="text" placeholder="Promo code" />
                                    <button className="promo-btn">Apply</button>
                                </div>
                            </div>

                            <button className="checkout-btn" onClick={()=>handleCheckout()}>
                                Proceed to Checkout
                            </button>
                            <a href="/" className="continue-shopping-link">Continue Shopping</a>

                            <div className="cart-benefits">
                                <div className="benefit-item">
                                    <span className="benefit-icon">✓</span>
                                    <span>Free shipping on orders over $50</span>
                                </div>
                                <div className="benefit-item">
                                    <span className="benefit-icon">✓</span>
                                    <span>Secure payment & data protection</span>
                                </div>
                                <div className="benefit-item">
                                    <span className="benefit-icon">✓</span>
                                    <span>30-day returns policy</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CartPage;