import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/mock';
import { ShoppingCart, ArrowLeft, Sparkles, Download, Shield, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { explainProduct } from '../services/gemini';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCart();

    // AI Explain Feature State
    const [aiExplanation, setAiExplanation] = useState('');
    const [isExplaining, setIsExplaining] = useState(false);

    // Screenshot carousel state
    const [currentScreenshot, setCurrentScreenshot] = useState(0);

    if (!product) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Product not found</h2>
                <Link to="/shop" className="text-blue-600 hover:underline mt-4">Back to Shop</Link>
            </div>
        );
    }

    const allImages = [product.images[0], ...(product.screenshots || [])];

    const handleAIExplain = async () => {
        if (aiExplanation) return; // Already explained
        setIsExplaining(true);
        try {
            const result = await explainProduct(product);
            setAiExplanation(result);
        } catch (error) {
            setAiExplanation("Sorry, I couldn't generate an explanation right now. Please try again.");
        }
        setIsExplaining(false);
    };

    const nextScreenshot = () => {
        setCurrentScreenshot((prev) => (prev + 1) % allImages.length);
    };

    const prevScreenshot = () => {
        setCurrentScreenshot((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to="/shop" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors">
                <ArrowLeft size={18} /> Back to Shop
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                {/* Image Gallery Section */}
                <div className="space-y-4">
                    <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                        <img
                            src={allImages[currentScreenshot]}
                            alt={product.name}
                            className="w-full h-auto rounded-xl object-cover aspect-square"
                        />
                        {allImages.length > 1 && (
                            <>
                                <button
                                    onClick={prevScreenshot}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-lg hover:scale-110 transition-transform"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={nextScreenshot}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-lg hover:scale-110 transition-transform"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </>
                        )}
                    </div>
                    {/* Thumbnail Navigation */}
                    {allImages.length > 1 && (
                        <div className="flex gap-2 justify-center">
                            {allImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentScreenshot(idx)}
                                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${currentScreenshot === idx
                                            ? 'border-blue-500 scale-105'
                                            : 'border-transparent opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div>
                    <div className="mb-6">
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-3">
                            {product.category}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">{product.name}</h1>

                        {/* Tags */}
                        {product.tags && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {product.tags.map(tag => (
                                    <span key={tag} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                        ₹{product.price.toLocaleString()}
                    </div>

                    {/* ⭐ AI EXPLAIN BUTTON - THE UNIQUE FEATURE */}
                    <motion.button
                        onClick={handleAIExplain}
                        disabled={isExplaining || !!aiExplanation}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mb-6 py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all disabled:opacity-70"
                    >
                        <Sparkles size={22} className={isExplaining ? 'animate-spin' : ''} />
                        {isExplaining ? 'AI is thinking...' : aiExplanation ? '✓ AI Explained' : '🤖 Explain this Product'}
                    </motion.button>

                    {/* AI Explanation Result */}
                    <AnimatePresence>
                        {aiExplanation && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-2xl mb-6 border border-purple-200 dark:border-purple-800"
                            >
                                <div className="flex items-center gap-2 font-bold text-purple-900 dark:text-purple-300 mb-3">
                                    <Sparkles size={18} />
                                    AI Explanation
                                </div>
                                <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                                    {aiExplanation}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-3">About this product</h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                            {product.description}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold transition-colors"
                            >-</button>
                            <span className="px-4 py-3 font-medium text-slate-900 dark:text-white min-w-[50px] text-center">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold transition-colors"
                            >+</button>
                        </div>

                        <button
                            onClick={() => {
                                addItem(product, quantity);
                                alert('Added to cart!');
                            }}
                            className="flex-1 bg-slate-900 dark:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                            <ShoppingCart size={20} /> Add to Cart
                        </button>
                    </div>

                    {/* Features / Benefits */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                                <Download size={20} />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white text-sm">Instant Download</p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">After purchase</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                <Zap size={20} />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white text-sm">Lifetime Access</p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">No expiry</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                                <Shield size={20} />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white text-sm">Secure Payment</p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">100% safe</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Placeholder */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-12">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">You might also like</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {MOCK_PRODUCTS.filter(p => p.id !== product.id && p.category === product.category && p.isActive)
                        .slice(0, 4)
                        .map(p => (
                            <Link
                                key={p.id}
                                to={`/product/${p.id}`}
                                className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow group"
                            >
                                <img src={p.images[0]} alt={p.name} className="w-full aspect-square object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform" />
                                <h3 className="font-medium text-slate-900 dark:text-white text-sm line-clamp-1">{p.name}</h3>
                                <p className="text-blue-600 dark:text-blue-400 font-bold">₹{p.price.toLocaleString()}</p>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
