import React, { useState,useEffect } from "react";
import { BrowserRouter,Routes } from "react-router-dom"
import axios from 'axios'
function Home(){
    const[products,setProducts] = useState([]);
    useEffect(()=>{
        const fetch = async() =>{
            const response = await axios.get("http://localhost:5000/api/v1/products")
            setProducts(response.data.get)
        }
        fetch()
    },[])
    return(
        <div>
            <h1>This is Sample</h1>
            <ul>
            {products.map((item,index) => (
                <li key={index}>{item.name},{item.price}
                </li>
            ))}
            </ul>
        </div>
    )
}

export default Home