import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle } from 'lucide-react';
import { doc, addDoc, collection } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
    const { items, total, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate Logic
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (user) {
                await addDoc(collection(db, 'orders'), {
                    userId: user.uid,
                    items,
                    total,
                    status: 'paid',
                    createdAt: new Date().toISOString()
                });
            }

            clearCart();
            setSuccess(true);
        } catch (err) {
            console.error(err);
            alert('Checkout failed!');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                    <CheckCircle size={48} />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Confirmed!</h1>
                <p className="text-slate-600 mb-8">Thank you for your purchase. We've sent a confirmation email.</p>
                <button onClick={() => navigate('/shop')} className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold">
                    Continue Shopping
                </button>
            </div>
        )
    }

    if (items.length === 0) {
        return <Navigate to="/cart" replace />
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>

            <form onSubmit={handleCheckout} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                <h2 className="text-xl font-bold mb-6">Payment Details</h2>

                <div className="space-y-4 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Cardholder Name</label>
                        <input type="text" required className="w-full px-4 py-2 border rounded-lg" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
                        <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input type="text" required className="w-full pl-10 pr-4 py-2 border rounded-lg" placeholder="0000 0000 0000 0000" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                            <input type="text" required className="w-full px-4 py-2 border rounded-lg" placeholder="MM/YY" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">CVC</label>
                            <input type="text" required className="w-full px-4 py-2 border rounded-lg" placeholder="123" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between text-lg font-bold mb-8 pt-6 border-t">
                    <span>Total Amount</span>
                    <span>${(total * 1.08).toFixed(2)}</span>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Processing...' : `Pay $${(total * 1.08).toFixed(2)}`}
                </button>
            </form>
        </div>
    )
}

// Temporary helpers
function Navigate({ to }: { to: string } & any) {
    const navigate = useNavigate();
    React.useEffect(() => { navigate(to); }, [to, navigate]);
    return null;
}
