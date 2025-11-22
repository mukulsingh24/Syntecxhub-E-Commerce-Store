import React, { useEffect, useState } from "react";
import axios from 'axios';

function AdminDashboard() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const[name,setName] = useState("")
    const[price,setPrice] = useState("")
    const[image,setImage] = useState("")

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("http://localhost:5000/api/v1/orders/all");
            const response1 = await axios.get("http://localhost:5000/api/v1/products");
            setOrders(response.data.get);
            setProducts(response1.data.get); 
        }
        fetch();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/v1/products/${id}`);
        setProducts(products.filter((product) => product._id !== id));
    };

    const handleCreate = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/v1/products`, {
                name,
                price,
                image
            });
            setProducts([...products, response.data.newProduct]);
            alert("Product Created!");
            setName("");
            setPrice("");
            setImage("");
        } catch (err) {
            alert("Error creating product");
        }
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <h3>Orders</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User Email</th>
                        <th>Total Price</th>
                        <th>Paid Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user?.email || "Unknown User"}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.isPaid ? "Paid" : "Pending"}</td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />

            <div>
                <input type="text" placeholder="Enter Product Name" onChange={(e)=>setName(e.target.value)} />
                <input type="number" placeholder="Enter Product Price"  onChange={(e)=>setPrice(e.target.value)} />
                <input type="text" placeholder="Enter Image of Product"  onChange={(e)=>setImage(e.target.value)} />
                <button onClick={handleCreate}>Add</button>
            </div>

            <h3>Manage Products</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>
                                <img src={product.image} alt={product.name} width="50" />
                            </td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>
                                <button onClick={() => handleDelete(product._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminDashboard;