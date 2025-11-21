import React, { useContext } from "react";
import { CartContext } from "../context/CartContext"; // Import the Cloud

function CartPage() {
    const { cart } = useContext(CartContext);
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

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
                    <button>Checkout</button>
                </div>
            )}
        </div>
    );
}

export default CartPage;