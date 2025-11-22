import React, { useState,useEffect,useContext } from "react";
import { BrowserRouter,Routes } from "react-router-dom"
import axios from 'axios'
import {CartContext} from '../context/CartContext'
import './homepage.css';
function Home(){
    const[products,setProducts] = useState([]);
    const {addtoCart} = useContext(CartContext)
    useEffect(()=>{
        const fetch = async() =>{
            const response = await axios.get("http://localhost:5000/api/v1/products")
            setProducts(response.data.get)
        }
        fetch()
    },[])
    return(
        <div className="home-container">
            <div className="hero-section">
                <h1>Welcome to Our Store</h1>
                <p>Discover premium products at unbeatable prices</p>
            </div>
            
            <div className="container">
                <div className="products-grid">
                    {products.length > 0 ? (
                        products.map((item,index) => (
                            <div className="product-card" key={index}>
                                {item.image && (
                                    <img src={item.image} alt={item.name} className="product-image" />
                                )}
                                <div className="product-info">
                                    <h3 className="product-name">{item.name}</h3>
                                    <div className="product-price">${item.price}</div>
                                    <button 
                                        className="add-to-cart-btn"
                                        onClick={()=>addtoCart(item)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state" style={{gridColumn: '1 / -1'}}>
                            <div className="empty-state-icon">📦</div>
                            <p className="empty-state-text">Loading products...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home