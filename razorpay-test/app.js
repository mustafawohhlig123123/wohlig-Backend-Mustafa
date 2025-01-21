const express = require('express');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');

const app = express();
app.use(bodyParser.json());

const razorpay = new Razorpay({
    key_id: 'rzp_test_1DP5mmOlF5G5ag',
    key_secret: 'rzp_test_SECRET', 
});


app.post('/create-order', async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const order = await razorpay.orders.create({
            amount: amount * 100, 
            currency: currency || 'INR', // Default currency is INR
            receipt: `receipt_${Date.now()}`,
        });

        res.status(200).json(order); // Return the order object
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ error: error.message });
    }
});


app.post('/verify-payment', (req, res) => {
    const crypto = require('crypto');
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac('sha256', 'rzp_test_SECRET');
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === razorpay_signature) {
        res.status(200).json({ success: true });
    } else {
        res.status(400).json({ success: false, message: 'Invalid signature' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
