import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import ChatBot from './components/ChatBot';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';

// Placeholder for Home
const Home = () => {
    return (
        <div className="p-8 text-center">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Welcome to AI Shop</h1>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">Experience the future of e-commerce with our AI-powered shopping assistant. Find exactly what you need with smart recommendations and personalized help.</p>
            <a href="/shop" className="px-6 py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-blue-500/20">Start Shopping</a>
        </div>
    )
}

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="relative">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/" element={<Layout><Home /></Layout>} />
                            <Route path="/shop" element={<Layout><Shop /></Layout>} />
                            <Route path="/product/:id" element={<Layout><ProductDetails /></Layout>} />
                            <Route path="/cart" element={<Layout><Cart /></Layout>} />
                            <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
                            <Route path="/admin" element={<Layout><Admin /></Layout>} />
                        </Routes>
                        <ChatBot />
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
