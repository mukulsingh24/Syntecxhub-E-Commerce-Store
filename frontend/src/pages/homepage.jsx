import React, { useState,useEffect,useContext } from "react";
import { BrowserRouter,Routes } from "react-router-dom"
import axios from 'axios'
import {CartContext} from '../context/CartContext'
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
        <div>
            <ul>
            {products.map((item,index) => (
                <li key={index}>{item.name} - {item.price}
                <button onClick={()=>addtoCart(item)}>Add to Cart</button>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default Home