import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MOCK_ORDERS } from '../data/mock';
import { Download, Package, ShoppingBag, Calendar, Check, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Orders() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                    <Package size={40} className="text-slate-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Please Login</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8">
                    Login to view your orders and download your products
                </p>
                <Link
                    to="/login"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                >
                    Login Now
                </Link>
            </div>
        );
    }

    // Filter orders for current user (in real app, query from Firestore)
    const userOrders = MOCK_ORDERS.filter(o => o.userEmail === user.email || o.userId === user.uid);

    if (userOrders.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                        <ShoppingBag size={40} className="text-slate-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">No orders yet</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
                        Once you make a purchase, your orders and downloads will appear here.
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
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Orders</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Download your purchased products</p>
                </div>
            </div>

            <div className="space-y-6">
                {userOrders.map((order, index) => (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
                    >
                        {/* Order Header */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-6">
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Order ID</p>
                                    <p className="font-bold text-slate-900 dark:text-white">{order.id}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Date</p>
                                    <p className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
                                        <Calendar size={14} />
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Total</p>
                                    <p className="font-bold text-slate-900 dark:text-white">₹{order.total.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${order.status === 'completed'
                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                        : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                                    }`}>
                                    {order.status === 'completed' && <Check size={14} />}
                                    {order.status === 'completed' ? 'Completed' : 'Pending'}
                                </span>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-6">
                            <div className="space-y-4">
                                {order.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                                                <Download size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-900 dark:text-white">{item.productName}</h3>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">₹{item.price.toLocaleString()}</p>
                                            </div>
                                        </div>
                                        {order.status === 'completed' && (
                                            <a
                                                href={item.downloadUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                            >
                                                <Download size={16} /> Download
                                                <ExternalLink size={14} />
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {order.couponCode && (
                                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                                    <Check size={16} />
                                    <span>Coupon {order.couponCode} applied: -₹{order.discount.toLocaleString()} saved!</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Help Section */}
            <div className="mt-12 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Need Help?</h3>
                <p className="text-slate-300 mb-4">Having trouble with your downloads? Contact our support team.</p>
                <button className="px-6 py-2 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-colors">
                    Contact Support
                </button>
            </div>
        </div>
    );
}
