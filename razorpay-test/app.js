const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors

const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

app.use(bodyParser.json());

// PayPal sandbox credentials
const PAYPAL_CLIENT_ID = 'ARTlK7b_d_UDmtYHP-Z1IAgflUMYJtT1l0UTshrYgE9qgI8WB9FNnVJs1Yns6mVx_1niZvdRKYbIOWt2';
const PAYPAL_SECRET = 'EGT2hJFXV6j2lU-EOwHbdSA33Vt2yajxngoxCE9k72TuzK07M0Ud6hzEQDaIrPUOz6zach3DgcplSKZ-';

// PayPal URL for authorization
const PAYPAL_API_URL = 'https://api.sandbox.paypal.com';

const getAccessToken = async () => {
  try {
    const response = await axios.post(
      `${PAYPAL_API_URL}/v1/oauth2/token`,
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64')}`
        }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
  }
};

// Route to create a payment
app.post('/create-payment', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    // Get PayPal access token
    const accessToken = await getAccessToken();

    // Create payment data
    const paymentData = {
      intent: 'sale',
      payer: { payment_method: 'paypal' },
      transactions: [
        {
          amount: {
            total: amount,
            currency: currency || 'USD'
          },
          description: 'Test Payment'
        }
      ],
      redirect_urls: {
        return_url: 'http://localhost:3000/payment-success',
        cancel_url: 'http://localhost:3000/payment-cancelled'
      }
    };

    // Make API request to create payment
    const response = await axios.post(
      `${PAYPAL_API_URL}/v1/payments/payment`,
      paymentData,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );

    res.json(response.data); // Send the response with payment details
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).send('Error creating payment');
  }
});

// Route for successful payment (after the user completes payment)
app.get('/payment-success', (req, res) => {
  res.send('Payment Successful');
});

// Route for cancelled payment
app.get('/payment-cancelled', (req, res) => {
  res.send('Payment Cancelled');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
