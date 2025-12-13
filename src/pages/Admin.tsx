import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mock';

// Mock Orders
const MOCK_ORDERS = [
    { id: '101', user: 'john@example.com', total: 450, status: 'Shipped', date: '2023-10-25' },
    { id: '102', user: 'jane@example.com', total: 120, status: 'Processing', date: '2023-10-26' },
];

export default function Admin() {
    const { user, loading } = useAuth();
    const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
    const [products, setProducts] = useState(MOCK_PRODUCTS);

    if (loading) return <div>Loading...</div>;

    // Basic role check (In real app, enforce in Firestore rules too)
    if (!user || user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    const handleDeleteProduct = (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2">
                    <Plus size={18} /> Add Product
                </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 mb-6 border-b border-slate-200">
                <button
                    onClick={() => setActiveTab('products')}
                    className={`pb-3 px-4 font-medium transition-colors border-b-2 ${activeTab === 'products' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    Products
                </button>
                <button
                    onClick={() => setActiveTab('orders')}
                    className={`pb-3 px-4 font-medium transition-colors border-b-2 ${activeTab === 'orders' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    Orders
                </button>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {activeTab === 'products' ? (
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700">Product</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Category</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Price</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Stock</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {products.map(p => (
                                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                        <span className="font-medium text-slate-900">{p.name}</span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{p.category}</td>
                                    <td className="px-6 py-4 text-slate-600">₹{p.price.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-slate-600">{p.stock}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDeleteProduct(p.id)}
                                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700">Order ID</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">User</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Total</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MOCK_ORDERS.map(o => (
                                <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-slate-900 font-medium">#{o.id}</td>
                                    <td className="px-6 py-4 text-slate-600">{o.user}</td>
                                    <td className="px-6 py-4 text-slate-600">{o.date}</td>
                                    <td className="px-6 py-4 text-slate-900 font-bold">₹{o.total.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${o.status === 'Shipped' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {o.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
