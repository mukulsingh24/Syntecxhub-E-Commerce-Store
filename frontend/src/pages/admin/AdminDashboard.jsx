import React, { useEffect, useState } from "react";
import axios from 'axios';
import './AdminDashboard.css';

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
        <div className="admin-dashboard">
            <div className="admin-container">
                <div className="admin-header">
                    <h1>Admin Dashboard</h1>
                    <p>Manage your store's orders and products efficiently</p>
                </div>

                <div className="admin-stats">
                    <div className="stat-card">
                        <div className="stat-icon">📊</div>
                        <div className="stat-value">{orders.length}</div>
                        <div className="stat-label">Total Orders</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">📦</div>
                        <div className="stat-value">{products.length}</div>
                        <div className="stat-label">Products</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">💰</div>
                        <div className="stat-value">${orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0).toFixed(2)}</div>
                        <div className="stat-label">Total Revenue</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">✅</div>
                        <div className="stat-value">{orders.filter(o => o.isPaid).length}</div>
                        <div className="stat-label">Paid Orders</div>
                    </div>
                </div>

                <div className="admin-section">
                    <div className="section-header">
                        <h2>Recent Orders</h2>
                    </div>
                    <div className="section-content">
                        {orders.length === 0 ? (
                            <div className="empty-table-message">
                                <div className="empty-icon">📭</div>
                                <p>No orders yet</p>
                            </div>
                        ) : (
                            <table className="orders-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>User Email</th>
                                        <th>Total Price</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id}>
                                            <td><span className="order-id">{order._id}</span></td>
                                            <td><span className="user-email">{order.user?.email || "Unknown"}</span></td>
                                            <td><span className="price">${order.totalPrice}</span></td>
                                            <td>
                                                <span className={`status-badge ${order.isPaid ? 'status-paid' : 'status-pending'}`}>
                                                    {order.isPaid ? "Paid" : "Pending"}
                                                </span>
                                            </td>
                                            <td><span className="date">{new Date(order.createdAt).toLocaleDateString()}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                <div className="admin-section">
                    <div className="section-header">
                        <h2>Add New Product</h2>
                    </div>
                    <div className="section-content">
                        <div className="add-product-section">
                            <h3 className="add-product-title">Fill in the product details</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Product Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Enter product name"  
                                        value={name}
                                        onChange={(e)=>setName(e.target.value)} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input 
                                        type="number" 
                                        placeholder="Enter product price"  
                                        value={price}
                                        onChange={(e)=>setPrice(e.target.value)} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Image URL</label>
                                    <input 
                                        type="text" 
                                        placeholder="Enter image URL"  
                                        value={image}
                                        onChange={(e)=>setImage(e.target.value)} 
                                    />
                                </div>
                            </div>
                            <div className="form-actions">
                                <button className="add-btn" onClick={handleCreate}>Add Product</button>
                                <button className="cancel-btn" onClick={() => {setName(""); setPrice(""); setImage("");}}>Clear</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="admin-section">
                    <div className="section-header">
                        <h2>Manage Products</h2>
                    </div>
                    <div className="section-content">
                        {products.length === 0 ? (
                            <div className="empty-table-message">
                                <div className="empty-icon">📦</div>
                                <p>No products available</p>
                            </div>
                        ) : (
                            <table className="products-table">
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
                                                {product.image && (
                                                    <img src={product.image} alt={product.name} className="product-image" />
                                                )}
                                            </td>
                                            <td><span className="product-name">{product.name}</span></td>
                                            <td><span className="price">${product.price}</span></td>
                                            <td>
                                                <button 
                                                    className="action-btn"
                                                    onClick={() => handleDelete(product._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;