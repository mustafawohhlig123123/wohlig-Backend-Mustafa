import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Second from './Second';

function App() {
  return (
    <div className="App bg-gray-100 min-h-screen">
      <Router>
        <Navbar />
        <div className="container mx-auto py-4">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<h1 className="text-4xl font-bold text-center">About Page</h1>} />
            <Route path="/second" element={<Second/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
