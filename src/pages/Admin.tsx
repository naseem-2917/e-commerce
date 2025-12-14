import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Plus, Trash2, Edit2, Package, ShoppingBag, Tag, X, Check, ToggleLeft, ToggleRight } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_ORDERS, MOCK_COUPONS, CATEGORIES } from '../data/mock';
import { Product, Coupon } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

export default function Admin() {
    const { user, loading } = useAuth();
    const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'coupons'>('products');
    const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
    const [coupons, setCoupons] = useState<Coupon[]>(MOCK_COUPONS);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showCouponModal, setShowCouponModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Product form state
    const [productForm, setProductForm] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Design Templates',
        downloadUrl: '',
        imageUrl: '',
        tags: ''
    });

    // Coupon form state
    const [couponForm, setCouponForm] = useState({
        code: '',
        discountPercent: ''
    });

    if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

    if (!user || user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    const handleToggleProduct = (id: string) => {
        setProducts(products.map(p =>
            p.id === id ? { ...p, isActive: !p.isActive } : p
        ));
    };

    const handleDeleteProduct = (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const handleOpenProductModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setProductForm({
                name: product.name,
                description: product.description,
                price: product.price.toString(),
                category: product.category,
                downloadUrl: product.downloadUrl,
                imageUrl: product.images[0] || '',
                tags: product.tags?.join(', ') || ''
            });
        } else {
            setEditingProduct(null);
            setProductForm({
                name: '',
                description: '',
                price: '',
                category: 'Design Templates',
                downloadUrl: '',
                imageUrl: '',
                tags: ''
            });
        }
        setShowProductModal(true);
    };

    const handleSaveProduct = () => {
        const newProduct: Product = {
            id: editingProduct?.id || `${Date.now()}`,
            name: productForm.name,
            description: productForm.description,
            price: parseInt(productForm.price) || 0,
            category: productForm.category,
            images: [productForm.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000'],
            downloadUrl: productForm.downloadUrl,
            isActive: editingProduct?.isActive ?? true,
            tags: productForm.tags.split(',').map(t => t.trim()).filter(Boolean)
        };

        if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id ? newProduct : p));
        } else {
            setProducts([newProduct, ...products]);
        }
        setShowProductModal(false);
    };

    const handleToggleCoupon = (code: string) => {
        setCoupons(coupons.map(c =>
            c.code === code ? { ...c, isActive: !c.isActive } : c
        ));
    };

    const handleDeleteCoupon = (code: string) => {
        if (confirm('Delete this coupon?')) {
            setCoupons(coupons.filter(c => c.code !== code));
        }
    };

    const handleAddCoupon = () => {
        if (!couponForm.code || !couponForm.discountPercent) return;
        const newCoupon: Coupon = {
            code: couponForm.code.toUpperCase(),
            discountPercent: parseInt(couponForm.discountPercent),
            isActive: true
        };
        setCoupons([newCoupon, ...coupons]);
        setCouponForm({ code: '', discountPercent: '' });
        setShowCouponModal(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your digital products store</p>
                </div>
                {activeTab === 'products' && (
                    <button
                        onClick={() => handleOpenProductModal()}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                    >
                        <Plus size={18} /> Add Product
                    </button>
                )}
                {activeTab === 'coupons' && (
                    <button
                        onClick={() => setShowCouponModal(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
                    >
                        <Plus size={18} /> Add Coupon
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {[
                    { id: 'products', label: 'Products', icon: Package, count: products.length },
                    { id: 'orders', label: 'Orders', icon: ShoppingBag, count: MOCK_ORDERS.length },
                    { id: 'coupons', label: 'Coupons', icon: Tag, count: coupons.length },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-slate-900 dark:bg-blue-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                    >
                        <tab.icon size={18} />
                        {tab.label}
                        <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-700'
                            }`}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Product</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Category</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Price</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Status</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {products.map(p => (
                                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={p.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                                                <div>
                                                    <span className="font-medium text-slate-900 dark:text-white block">{p.name}</span>
                                                    <span className="text-xs text-slate-500 dark:text-slate-400">ID: {p.id}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{p.category}</td>
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">₹{p.price.toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleProduct(p.id)}
                                                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${p.isActive
                                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                                                    }`}
                                            >
                                                {p.isActive ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                                                {p.isActive ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleOpenProductModal(p)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(p.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Order ID</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Customer</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Products</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Date</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Total</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {MOCK_ORDERS.map(o => (
                                    <tr key={o.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{o.id}</td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{o.userEmail}</td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                {o.items.map((item, i) => (
                                                    <span key={i} className="block text-slate-600 dark:text-slate-400 text-xs">
                                                        {item.productName}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                                            {new Date(o.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                                            ₹{o.total.toLocaleString()}
                                            {o.couponCode && (
                                                <span className="block text-xs text-green-600">-₹{o.discount} ({o.couponCode})</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${o.status === 'completed'
                                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                    : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                                                }`}>
                                                {o.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Coupons Tab */}
                {activeTab === 'coupons' && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Code</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Discount</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Status</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {coupons.map(c => (
                                    <tr key={c.code} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded font-mono font-bold text-slate-900 dark:text-white">
                                                {c.code}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{c.discountPercent}%</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleCoupon(c.code)}
                                                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${c.isActive
                                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                                                    }`}
                                            >
                                                {c.isActive ? <Check size={14} /> : <X size={14} />}
                                                {c.isActive ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleDeleteCoupon(c.code)}
                                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Product Modal */}
            <AnimatePresence>
                {showProductModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowProductModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                </h2>
                                <button onClick={() => setShowProductModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={productForm.name}
                                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="Product name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                                    <textarea
                                        value={productForm.description}
                                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="Short description"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Price (₹)</label>
                                        <input
                                            type="number"
                                            value={productForm.price}
                                            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            placeholder="999"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                                        <select
                                            value={productForm.category}
                                            onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        >
                                            {CATEGORIES.filter(c => c !== 'All').map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Download URL</label>
                                    <input
                                        type="url"
                                        value={productForm.downloadUrl}
                                        onChange={(e) => setProductForm({ ...productForm, downloadUrl: e.target.value })}
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="https://example.com/download/file.zip"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Image URL</label>
                                    <input
                                        type="url"
                                        value={productForm.imageUrl}
                                        onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        value={productForm.tags}
                                        onChange={(e) => setProductForm({ ...productForm, tags: e.target.value })}
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="react, javascript, course"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowProductModal(false)}
                                    className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveProduct}
                                    disabled={!productForm.name || !productForm.price}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {editingProduct ? 'Update' : 'Create'} Product
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Coupon Modal */}
            <AnimatePresence>
                {showCouponModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowCouponModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-sm"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add Coupon</h2>
                                <button onClick={() => setShowCouponModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Coupon Code</label>
                                    <input
                                        type="text"
                                        value={couponForm.code}
                                        onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 uppercase"
                                        placeholder="SUMMER25"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Discount Percentage</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="100"
                                        value={couponForm.discountPercent}
                                        onChange={(e) => setCouponForm({ ...couponForm, discountPercent: e.target.value })}
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="25"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowCouponModal(false)}
                                    className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddCoupon}
                                    disabled={!couponForm.code || !couponForm.discountPercent}
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
                                >
                                    Add Coupon
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
