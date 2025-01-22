import React, { useState } from 'react';

const PayPalButton = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paymentLink, setPaymentLink] = useState('');


  const products = [
    { id: 1, name: 'Product 1', price: '10.00' },
    { id: 2, name: 'Product 2', price: '20.00' },
    { id: 3, name: 'Product 3', price: '30.00' },
    {id : 4, name: 'Product4', price:'89.0' }
  ];

  const handlePayment = async () => {
    if (!selectedProduct) {
      console.error('No product selected');
      return;
    }

    const paymentData = {
      amount: selectedProduct.price, // dynamically set the price based on selection
      currency: 'USD',
    };

    try {
      // Call the backend to create a payment
      const response = await fetch('http://localhost:3000/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();
      if (data.links && data.links.length) {
        // Get the approval URL from PayPal response
        const approvalUrl = data.links.find(link => link.rel === 'approval_url').href;
        setPaymentLink(approvalUrl);
        window.location.href = approvalUrl; // Redirect the user to PayPal for approval
      } else {
        console.error('No approval URL found in PayPal response');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  return (
    <div>
      {/* Dropdown for selecting a product */}
      <select
        onChange={(e) => {
          const product = products.find(p => p.id === parseInt(e.target.value));
          setSelectedProduct(product);
        }}
        defaultValue=""
      >
        <option value="" disabled>Select a product</option>
        {products.map(product => (
          <option key={product.id} value={product.id}>
            {product.name} - ${product.price}
          </option>
        ))}
      </select>

      {/* PayPal button */}
      <button onClick={handlePayment} disabled={!selectedProduct}>
        Pay with PayPal
      </button>

      {/* Link to PayPal payment */}
      {paymentLink && <a href={paymentLink}>Go to PayPal</a>}
    </div>
  );
};

export default PayPalButton;
