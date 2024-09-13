import React from 'react';
import axios from 'axios';
import { backend_url } from '../../App'

const PayButton = ({ cartItems, userId }) => {
    const backend_api = `${backend_url}/api`

    const handleCheckout = async () => {
        if (!Array.isArray(cartItems)) {
            console.error('cartItems is not an array:', cartItems);
            return;
        }

        try {
            const response = await axios.post(`${backend_api}/stripe/create-checkout-session`, {
                cartItems,
                userId,
            });

            if (response.data.url) {
                window.location.href = response.data.url; // Redirect to Stripe checkout page
                localStorage.removeItem('cart'); // Clear cart after checkout
            } else {
                console.error('Failed to get redirect URL from Stripe:', response.data);
            }
        } catch (error) {
            console.error('Error creating checkout session:', error.message);
        }
    };

    return (
        <button className="btn btn-primary" onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
    );
};

export default PayButton;
