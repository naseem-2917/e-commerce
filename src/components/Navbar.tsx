import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, X, Sun, Moon, Shield, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { items } = useCart();
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/shop', label: 'Products' },
    ];

    // Get user initials for avatar fallback
    const getUserInitials = () => {
        if (user?.displayName) {
            return user.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        }
        return user?.email?.[0]?.toUpperCase() || 'U';
    };

    return (
        <nav className="fixed w-full top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16">
                    {/* Logo - Left */}
                    <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Sparkles size={22} className="text-white" />
                        </div>
                        <span className="font-bold text-2xl text-slate-900 dark:text-white tracking-tight">
                            NAS
                        </span>
                    </Link>

                    {/* Center Nav Links - Absolute Center */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <div className="flex items-center gap-2">
                            {navLinks.map(link => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    className={({ isActive }) => `
                                        font-medium transition-all px-4 py-2 rounded-lg
                                        ${isActive
                                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }
                                    `}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-2 ml-auto md:ml-0">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun size={20} className="text-yellow-500" />
                            ) : (
                                <Moon size={20} className="text-slate-600" />
                            )}
                        </button>

                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="relative p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <ShoppingCart size={20} className="text-slate-600 dark:text-slate-300" />
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center"
                                >
                                    {cartCount > 9 ? '9+' : cartCount}
                                </motion.span>
                            )}
                        </Link>

                        {/* User Menu (Desktop) - No Sign Out here */}
                        <div className="hidden md:flex items-center gap-2">
                            {user ? (
                                <>
                                    <Link
                                        to="/profile"
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        {user.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt={user.displayName || 'User'}
                                                className="w-8 h-8 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                                                {getUserInitials()}
                                            </div>
                                        )}
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            {user.displayName?.split(' ')[0] || 'Profile'}
                                        </span>
                                    </Link>
                                    {user.role === 'admin' && (
                                        <Link
                                            to="/admin"
                                            className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
                                            title="Admin Panel"
                                        >
                                            <Shield size={18} />
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="px-5 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            {isOpen ? (
                                <X size={24} className="text-slate-600 dark:text-slate-300" />
                            ) : (
                                <Menu size={24} className="text-slate-600 dark:text-slate-300" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navLinks.map(link => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) => `
                                        block px-4 py-3 rounded-xl font-medium transition-colors
                                        ${isActive
                                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                        }
                                    `}
                                >
                                    {link.label}
                                </NavLink>
                            ))}

                            <hr className="my-2 border-slate-200 dark:border-slate-700" />

                            {user ? (
                                <>
                                    <Link
                                        to="/profile"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    >
                                        {user.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt={user.displayName || 'User'}
                                                className="w-8 h-8 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                                                {getUserInitials()}
                                            </div>
                                        )}
                                        My Profile
                                    </Link>
                                    {user.role === 'admin' && (
                                        <Link
                                            to="/admin"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30"
                                        >
                                            <Shield size={18} />
                                            Admin Panel
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="block text-center px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
