import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, signOut } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            AI Shop
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                            Home
                        </Link>
                        <Link to="/shop" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                            Shop
                        </Link>
                        <Link to="/orders" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                            Orders
                        </Link>
                    </div>

                    {/* Search Bar - Hidden on mobile for now */}
                    <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Ask AI or search products..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm"
                        />
                    </div>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/cart" className="relative text-slate-600 hover:text-slate-900 transition-colors">
                            <ShoppingCart size={22} />
                            {/* <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">0</span> */}
                        </Link>

                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
                                    <User size={22} />
                                    <span className="text-sm font-medium max-w-[100px] truncate">{user.displayName || 'User'}</span>
                                </button>
                                {/* Dropdown */}
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                                    <div className="py-1">
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Profile</Link>
                                        {user.role === 'admin' && (
                                            <Link to="/admin" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Admin Dashboard</Link>
                                        )}
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                        >
                                            <LogOut size={14} /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">Login</Link>
                                <Link to="/signup" className="text-sm font-medium px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors shadow-lg shadow-blue-500/20">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <Link to="/cart" className="text-slate-600 hover:text-slate-900">
                            <ShoppingCart size={22} />
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-slate-600 hover:text-slate-900"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-slate-200">
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50">Home</Link>
                        <Link to="/shop" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50">Shop</Link>
                        {user ? (
                            <>
                                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50">Profile</Link>
                                <button onClick={handleSignOut} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">Sign Out</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50">Login</Link>
                                <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
