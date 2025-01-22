import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    imageUrl: ''
  });
  const [productToUpdate, setProductToUpdate] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    imageUrl: ''
  });

  // Fetch products from the database
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

  // Add a new product (admin-only feature)
  const addProduct = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to add products.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/products/add',
        newProduct,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Product added successfully!');
      fetchProducts();
      setNewProduct({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        imageUrl: ''
      });
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product');
    }
  };

  // Delete a product
  const deleteProduct = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to delete products.');
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Product deleted successfully!');
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product');
    }
  };

  // Update a product
  const updateProduct = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to update products.');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/update/${productToUpdate.id}`,
        productToUpdate,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Product updated successfully!');
      fetchProducts();
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Failed to update product');
    }
  };

  // Handle form changes for adding or updating products
  const handleProductChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'new') {
      setNewProduct((prev) => ({
        ...prev,
        [name]: value
      }));
    } else if (type === 'update') {
      setProductToUpdate((prev) => ({
        ...prev,
        [name]: value
      }));
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
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setProductToUpdate({
                      id: product._id,
                      name: product.name,
                      description: product.description,
                      price: product.price,
                      quantity: product.quantity,
                      category: product.category,
                      imageUrl: product.imageUrl
                    })}
                    className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700"
                  >
                    Update
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No products available</div>
          )}
        </div>
      )}

      {/* Add Product Form */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add Product</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => handleProductChange(e, 'new')}
            name="name"
            className="w-full p-3 border border-gray-300 rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Product Description"
            value={newProduct.description}
            onChange={(e) => handleProductChange(e, 'new')}
            name="description"
            className="w-full p-3 border border-gray-300 rounded-md mb-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => handleProductChange(e, 'new')}
            name="price"
            className="w-full p-3 border border-gray-300 rounded-md mb-2"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={(e) => handleProductChange(e, 'new')}
            name="quantity"
            className="w-full p-3 border border-gray-300 rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => handleProductChange(e, 'new')}
            name="category"
            className="w-full p-3 border border-gray-300 rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.imageUrl}
            onChange={(e) => handleProductChange(e, 'new')}
            name="imageUrl"
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
          />

          <button
            onClick={addProduct}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Update Product Form */}
      {productToUpdate.id && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Update Product</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Product Name"
              value={productToUpdate.name}
              onChange={(e) => handleProductChange(e, 'update')}
              name="name"
              className="w-full p-3 border border-gray-300 rounded-md mb-2"
            />
            <input
              type="text"
              placeholder="Product Description"
              value={productToUpdate.description}
              onChange={(e) => handleProductChange(e, 'update')}
              name="description"
              className="w-full p-3 border border-gray-300 rounded-md mb-2"
            />
            <input
              type="number"
              placeholder="Price"
              value={productToUpdate.price}
              onChange={(e) => handleProductChange(e, 'update')}
              name="price"
              className="w-full p-3 border border-gray-300 rounded-md mb-2"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={productToUpdate.quantity}
              onChange={(e) => handleProductChange(e, 'update')}
              name="quantity"
              className="w-full p-3 border border-gray-300 rounded-md mb-2"
            />
            <input
              type="text"
              placeholder="Category"
              value={productToUpdate.category}
              onChange={(e) => handleProductChange(e, 'update')}
              name="category"
              className="w-full p-3 border border-gray-300 rounded-md mb-2"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={productToUpdate.imageUrl}
              onChange={(e) => handleProductChange(e, 'update')}
              name="imageUrl"
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />

            <button
              onClick={updateProduct}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Update Product
            </button>
          </div>
        </div>
      )}

      {/* Message state */}
      {message && <div className="text-center text-green-500">{message}</div>}
    </div>
  );
};

export default Home;
