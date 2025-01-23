// src/Chatbot.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './ChatBot.css';

const socket = io('http://localhost:3000');  // Connect to the server

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');

    // Listen for replies from the server, only set up once
    useEffect(() => {
        const handleReply = (reply) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'bot', text: reply },
            ]);
        };

        socket.on('reply', handleReply);

        // Cleanup the event listener when the component is unmounted
        return () => {
            socket.off('reply', handleReply);
        };
    }, []);  // Empty dependency array ensures this runs only once when the component mounts

    const sendMessage = () => {
        if (userMessage.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'user', text: userMessage },
            ]);

            socket.emit('message', userMessage);  // Send message to backend
            setUserMessage('');  // Clear the input field
        }
    };

    return (
        <div>
            {/* <h2>Chat with Bot</h2> */}
            <div id="chat">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender === 'user' ? 'You' : 'Bot'}: </strong>{msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chatbot;
