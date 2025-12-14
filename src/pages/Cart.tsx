import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Download, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
    const { items, removeItem, updateQuantity, total } = useCart();

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                        <ShoppingBag size={40} className="text-slate-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Your cart is empty</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
                        Discover our amazing digital products and start adding them to your cart!
                    </p>
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                    >
                        <ShoppingBag size={20} /> Browse Products
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    <AnimatePresence>
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-100 dark:border-slate-800 shadow-sm"
                            >
                                <div className="flex gap-4">
                                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                                        <img
                                            src={item.images[0]}
                                            alt={item.name}
                                            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl"
                                        />
                                    </Link>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <Link
                                                    to={`/product/${item.id}`}
                                                    className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1"
                                                >
                                                    {item.name}
                                                </Link>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{item.category}</p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                title="Remove item"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-2 mt-2">
                                            <Download size={14} className="text-blue-500" />
                                            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Instant Download</span>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg">
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="px-4 font-medium text-slate-900 dark:text-white">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <p className="text-xl font-bold text-slate-900 dark:text-white">
                                                ₹{(item.price * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm sticky top-24">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Order Summary</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                <span>Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                <span>Discount</span>
                                <span className="text-green-600">Apply at checkout</span>
                            </div>
                        </div>

                        <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mb-6">
                            <div className="flex justify-between text-lg font-bold text-slate-900 dark:text-white">
                                <span>Total</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                        </div>

                        <Link
                            to="/checkout"
                            className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                        >
                            Proceed to Checkout <ArrowRight size={18} />
                        </Link>

                        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
                            💳 Secure checkout • 🔒 Encrypted payment
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
