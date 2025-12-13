import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 border-t border-slate-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4 inline-block">
                            AI Shop
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed mb-4">
                            Experience the future of shopping with our AI-powered platform. Personalized recommendations, smart search, and premium products.
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
                            <li><Link to="/shop" className="hover:text-blue-400 transition-colors">Shop</Link></li>
                            <li><Link to="/orders" className="hover:text-blue-400 transition-colors">Orders</Link></li>
                            <li><Link to="/cart" className="hover:text-blue-400 transition-colors">Cart</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
                            <li><Link to="/shipping" className="hover:text-blue-400 transition-colors">Shipping Policy</Link></li>
                            <li><Link to="/returns" className="hover:text-blue-400 transition-colors">Returns & Refunds</Link></li>
                            <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Contact Info</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-blue-400 flex-shrink-0" />
                                <span>123 Innovation Dr, Tech City, TC 90210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-blue-400 flex-shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-blue-400 flex-shrink-0" />
                                <span>support@aishop.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} AI E-commerce Platform. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link to="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-slate-300">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
