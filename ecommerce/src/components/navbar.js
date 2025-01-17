import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        
        <div className="flex items-center space-x-2">
          <img
            src="https://assets.aboutamazon.com/dims4/default/3755bfe/2147483647/strip/true/crop/1600x800+0+400/resize/1200x600!/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F2c%2F94%2F940c952b4bf79885ca375079e248%2Fsquid-orange-logo.jpg" // Replace with your logo URL
            alt="Logo"
            className="h-10 w-10 rounded-full"
          />
          <span className="text-xl font-bold">MyApp</span>
        </div>

        
        <ul className="flex space-x-8">
          <li>
            <Link to="/" className="hover:text-gray-200 font-semibold">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-200 font-semibold">
              About
            </Link>
          </li>
          <li>
            <Link to="/second" className="hover:text-gray-200 font-semibold">
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Login and Signup on the right */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/login" className="hover:text-gray-200 font-semibold">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="hover:text-gray-200 font-semibold">
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
