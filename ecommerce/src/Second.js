import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Second = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      if (Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        setError('Products data is not an array.');
        console.log('Response Data is not an array:', response.data);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-4xl font-bold text-center mb-6">Product List</h1>

      {/* Loading state */}
      {loading ? (
        <div className="text-center text-gray-500">Loading products...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="bg-white border border-gray-300 rounded-lg p-4 shadow-md">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-40 object-cover mb-4 rounded-md"
                />
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-lg font-bold text-blue-600">${product.price}</p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No products available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Second;
