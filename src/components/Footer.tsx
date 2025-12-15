import { Link, useLocation } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Sparkles, Home, ShoppingBag, HelpCircle, MessageCircle, User } from 'lucide-react';

export default function Footer() {
    const location = useLocation();

    // Check if current path matches
    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            {/* Main Footer - Always visible, with padding for mobile nav */}
            <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 border-t border-slate-800 transition-colors duration-300 mb-16 md:mb-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        {/* Brand */}
                        <div className="col-span-2 lg:col-span-1">
                            <Link to="/" className="flex items-center gap-2 mb-4">
                                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                                    <Sparkles size={20} className="text-white" />
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                    NAS
                                </span>
                            </Link>
                            <p className="text-sm text-slate-400 leading-relaxed mb-4">
                                AI-powered digital marketplace. Premium templates, courses, ebooks & more.
                            </p>
                            <div className="flex items-center gap-4">
                                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook size={20} /></a>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram size={20} /></a>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-white font-bold mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                                <li><Link to="/shop" className="hover:text-blue-400 transition-colors">Products</Link></li>
                                <li><Link to="/orders" className="hover:text-blue-400 transition-colors">My Orders</Link></li>
                                <li><Link to="/cart" className="hover:text-blue-400 transition-colors">Cart</Link></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h3 className="text-white font-bold mb-4">Support</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
                                <li><Link to="/shipping" className="hover:text-blue-400 transition-colors">Delivery Info</Link></li>
                                <li><Link to="/returns" className="hover:text-blue-400 transition-colors">Returns & Refunds</Link></li>
                                <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
                            </ul>
                        </div>

                        {/* Contact - Hidden on small mobile */}
                        <div className="hidden lg:block">
                            <h3 className="text-white font-bold mb-4">Contact Info</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-3">
                                    <MapPin size={18} className="text-blue-400 flex-shrink-0" />
                                    <span>Mumbai, India</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone size={18} className="text-blue-400 flex-shrink-0" />
                                    <span>+91 98765 43210</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail size={18} className="text-blue-400 flex-shrink-0" />
                                    <span>support@nasdigital.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                        <p>© {new Date().getFullYear()} NAS Digital. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <Link to="/faq" className="hover:text-slate-300">Privacy Policy</Link>
                            <Link to="/faq" className="hover:text-slate-300">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Mobile Bottom Navigation - Fixed at bottom */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-50 safe-area-inset-bottom">
                <div className="flex items-center justify-around py-2 px-2">
                    <Link
                        to="/"
                        className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-colors ${isActive('/') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}
                    >
                        <Home size={22} />
                        <span className="text-[10px] font-medium">Home</span>
                    </Link>
                    <Link
                        to="/shop"
                        className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-colors ${isActive('/shop') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}
                    >
                        <ShoppingBag size={22} />
                        <span className="text-[10px] font-medium">Shop</span>
                    </Link>
                    <Link
                        to="/faq"
                        className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-colors ${isActive('/faq') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}
                    >
                        <HelpCircle size={22} />
                        <span className="text-[10px] font-medium">Help</span>
                    </Link>
                    <Link
                        to="/contact"
                        className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-colors ${isActive('/contact') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}
                    >
                        <MessageCircle size={22} />
                        <span className="text-[10px] font-medium">Contact</span>
                    </Link>
                    <Link
                        to="/profile"
                        className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-colors ${isActive('/profile') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}
                    >
                        <User size={22} />
                        <span className="text-[10px] font-medium">Profile</span>
                    </Link>
                </div>
            </nav>
        </>
    );
}
