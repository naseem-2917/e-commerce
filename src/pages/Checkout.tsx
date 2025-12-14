import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { MOCK_COUPONS, MOCK_ORDERS } from '../data/mock';
import { Tag, Check, X, CreditCard, Shield, Download, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Checkout() {
    const { items, total, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
    const [couponError, setCouponError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    const handleApplyCoupon = () => {
        setCouponError('');
        const coupon = MOCK_COUPONS.find(
            c => c.code.toLowerCase() === couponCode.trim().toLowerCase() && c.isActive
        );

        if (coupon) {
            const discountAmount = Math.round(total * (coupon.discountPercent / 100));
            setAppliedCoupon({ code: coupon.code, discount: discountAmount });
            setCouponCode('');
        } else {
            setCouponError('Invalid or expired coupon code');
        }
    };

    const removeCoupon = () => {
        setAppliedCoupon(null);
    };

    const finalTotal = appliedCoupon ? total - appliedCoupon.discount : total;

    const handlePlaceOrder = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setIsProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Create mock order (in real app, save to Firestore)
        const newOrder = {
            id: `ORD-${Date.now()}`,
            userId: user.uid,
            userEmail: user.email || '',
            items: items.map(item => ({
                productId: item.id,
                productName: item.name,
                price: item.price,
                downloadUrl: item.downloadUrl
            })),
            total: finalTotal,
            couponCode: appliedCoupon?.code,
            discount: appliedCoupon?.discount || 0,
            status: 'completed' as const,
            createdAt: new Date()
        };

        // Add to mock orders (for demo)
        MOCK_ORDERS.push(newOrder);

        setIsProcessing(false);
        setOrderComplete(true);

        // Clear cart after successful order
        setTimeout(() => {
            clearCart();
            navigate('/orders');
        }, 3000);
    };

    if (items.length === 0 && !orderComplete) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Your cart is empty</h2>
                <Link to="/shop" className="text-blue-600 hover:underline">Continue Shopping</Link>
            </div>
        );
    }

    if (orderComplete) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-16 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 mx-auto mb-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center"
                >
                    <Check size={48} className="text-green-600" />
                </motion.div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Order Successful! 🎉</h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                    Your payment has been processed. You can now download your products from the Orders page.
                </p>
                <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 mb-4">
                    <Download size={20} />
                    <span className="font-medium">Redirecting to your downloads...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to="/cart" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors">
                <ArrowLeft size={18} /> Back to Cart
            </Link>

            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Details */}
                <div className="space-y-6">
                    {/* Items Summary */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Order Items</h2>
                        <div className="space-y-4">
                            {items.map(item => (
                                <div key={item.id} className="flex gap-4">
                                    <img src={item.images[0]} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                                    <div className="flex-1">
                                        <h3 className="font-medium text-slate-900 dark:text-white">{item.name}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-bold text-slate-900 dark:text-white">
                                        ₹{(item.price * item.quantity).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Coupon Code */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <Tag size={20} /> Apply Coupon
                        </h2>

                        {appliedCoupon ? (
                            <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
                                <div className="flex items-center gap-2">
                                    <Check size={18} className="text-green-600" />
                                    <span className="font-medium text-green-700 dark:text-green-400">
                                        {appliedCoupon.code} applied!
                                    </span>
                                    <span className="text-green-600">-₹{appliedCoupon.discount.toLocaleString()}</span>
                                </div>
                                <button onClick={removeCoupon} className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                                    <X size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    placeholder="Enter coupon code"
                                    className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-white"
                                />
                                <button
                                    onClick={handleApplyCoupon}
                                    disabled={!couponCode.trim()}
                                    className="px-6 py-3 bg-slate-900 dark:bg-blue-600 text-white rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                >
                                    Apply
                                </button>
                            </div>
                        )}

                        <AnimatePresence>
                            {couponError && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-red-500 text-sm mt-2"
                                >
                                    {couponError}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                            💡 Try: SAVE10, FIRST20, or HACKATHON50
                        </p>
                    </div>
                </div>

                {/* Payment Summary */}
                <div>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 sticky top-24">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Payment Summary</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                <span>Subtotal</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                            {appliedCoupon && (
                                <div className="flex justify-between text-green-600">
                                    <span>Discount ({appliedCoupon.code})</span>
                                    <span>-₹{appliedCoupon.discount.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                <span>Processing Fee</span>
                                <span className="text-green-600">FREE</span>
                            </div>
                        </div>

                        <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mb-6">
                            <div className="flex justify-between text-xl font-bold text-slate-900 dark:text-white">
                                <span>Total</span>
                                <span>₹{finalTotal.toLocaleString()}</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={isProcessing}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-70 transition-all flex items-center justify-center gap-2"
                        >
                            {isProcessing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <CreditCard size={20} /> Pay ₹{finalTotal.toLocaleString()}
                                </>
                            )}
                        </button>

                        <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                <Shield size={16} className="text-green-500" />
                                <span>Secure 256-bit SSL encryption</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                <Download size={16} className="text-blue-500" />
                                <span>Instant download after payment</span>
                            </div>
                        </div>

                        {!user && (
                            <p className="mt-4 text-center text-sm text-amber-600 dark:text-amber-400">
                                ⚠️ Please <Link to="/login" className="underline font-medium">login</Link> to complete your purchase
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
