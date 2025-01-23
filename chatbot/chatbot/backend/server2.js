const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); 

const app = express();
const server = http.createServer(app);

// Enable CORS for HTTP requests
app.use(cors({
    origin: 'http://localhost:3001',  // Allow requests from your frontend
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

// Configure Socket.IO to allow CORS
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3001',  // Allow Socket.IO connections from your frontend
        methods: ['GET', 'POST'],
    },
});

// Middleware to parse JSON requests
app.use(express.json());

io.on('connection', (socket) => {
    console.log('A user connected');

   
    socket.on('message', (msg) => {
        console.log('Message received:', msg);
        let reply = '';
        if (msg.toLowerCase().includes('hello')) {
            reply = 'Hi there! How can I help you?';
        } else if (msg.toLowerCase().includes('bye')) {
            reply = 'Goodbye! Have a great day!';
        } else {
            reply = 'I\'m not sure how to respond to that.';
        }

        // Emit the response back to the client
        socket.emit('reply', reply);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// POST endpoint for testing the chatbot using Postman
app.post('/message', (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    let reply = '';
    if (message.toLowerCase().includes('hello')) {
        reply = 'Hi there! How can I help you?';
    } else if (message.toLowerCase().includes('bye')) {
        reply = 'Goodbye! Have a great day!';
    } else {
        reply = 'I\'m not sure how to respond to that.';
    }

    // Return the response to Postman
    res.json({ reply });
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
