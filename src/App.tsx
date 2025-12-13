import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import ChatBot from './components/ChatBot';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Orders from './pages/Orders';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <ThemeProvider>
                    <Router basename="/e-commerce">
                        <div className="relative">
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/" element={<Layout><Home /></Layout>} />
                                <Route path="/shop" element={<Layout><Shop /></Layout>} />
                                <Route path="/product/:id" element={<Layout><ProductDetails /></Layout>} />
                                <Route path="/cart" element={<Layout><Cart /></Layout>} />
                                <Route path="/orders" element={<Layout><Orders /></Layout>} />
                                <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
                                <Route path="/admin" element={<Layout><Admin /></Layout>} />
                            </Routes>
                            <ChatBot />
                        </div>
                    </Router>
                </ThemeProvider>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
