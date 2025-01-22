import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PayPalButton from './PayPalButton';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        
        <header className="navbar">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </header>

        
        <main className="main-content">
          <h1>Welcome to The Online PayPal Store</h1>
          <p>We offer amazing products at great prices,Choose your favorite items and enjoy secure payments with PayPal</p>
          <div className="paypal-button-container">
            <h2>Complete Your Purchase</h2>
            <p>Click the button below to proceed with your payment.</p>
            <PayPalButton />
          </div>
        </main>

      
        <footer className="footer">
          <p>2025 The Online  Store. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
