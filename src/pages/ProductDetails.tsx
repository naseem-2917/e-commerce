import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/mock';
import { ShoppingCart, Star, Truck, ShieldCheck, ArrowLeft, Sparkles, Brain } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { summarizeProduct, analyzeReviews } from '../services/gemini';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_REVIEWS = [
    "Amazing product! The quality is top notch and it arrived very quickly. Highly recommend.",
    "Good value for money but the battery life could be better.",
    "I love the design, it looks very premium. Works exactly as described.",
    "Had some issues with shipping but the support team was helpful.",
    "Best purchase I've made all year. Seriously impressive features."
];

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    // In real app, fetch from Firestore
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCart();

    const [summary, setSummary] = useState('');
    const [isSummarizing, setIsSummarizing] = useState(false);

    const [reviewAnalysis, setReviewAnalysis] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    if (!product) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-slate-800">Product not found</h2>
                <Link to="/shop" className="text-blue-600 hover:underline mt-4">Back to Shop</Link>
            </div>
        );
    }

    const handleSummarize = async () => {
        setIsSummarizing(true);
        const result = await summarizeProduct(product.name, product.description);
        setSummary(result);
        setIsSummarizing(false);
    };

    const handleAnalyzeReviews = async () => {
        setIsAnalyzing(true);
        const result = await analyzeReviews(MOCK_REVIEWS);
        setReviewAnalysis(result);
        setIsAnalyzing(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to="/shop" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors">
                <ArrowLeft size={18} /> Back to Shop
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                {/* Image Section */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-auto rounded-xl object-cover aspect-square"
                    />
                </div>

                {/* Info Section */}
                <div>
                    <div className="mb-6">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase text-sm">{product.category}</span>
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mt-2 mb-4">{product.name}</h1>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-amber-400">
                                <Star fill="currentColor" size={20} />
                                <Star fill="currentColor" size={20} />
                                <Star fill="currentColor" size={20} />
                                <Star fill="currentColor" size={20} />
                                <Star fill="currentColor" size={20} className="opacity-50" />
                            </div>
                            <span className="text-slate-500 dark:text-slate-400 text-sm">(128 reviews)</span>
                        </div>
                    </div>

                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                        ₹{product.price.toLocaleString()}
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-slate-900 dark:text-white">Description</h3>
                            <button
                                onClick={handleSummarize}
                                disabled={isSummarizing || !!summary}
                                className="text-xs flex items-center gap-1 text-purple-600 dark:text-purple-400 font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 px-2 py-1 rounded-full transition-colors"
                            >
                                <Sparkles size={14} /> {isSummarizing ? 'Summarizing...' : 'AI Summary'}
                            </button>
                        </div>

                        <AnimatePresence>
                            {summary ? (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl text-sm text-purple-900 dark:text-purple-300 mb-4 border border-purple-100 dark:border-purple-800"
                                >
                                    <div className="font-bold mb-1 flex items-center gap-2"><Sparkles size={14} /> AI Highlights</div>
                                    <div className="whitespace-pre-line leading-relaxed">{summary}</div>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>

                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                            {product.description}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold"
                            >-</button>
                            <span className="px-4 py-2 font-medium text-slate-900 dark:text-white">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold"
                            >+</button>
                        </div>

                        <button
                            onClick={() => {
                                addItem(product, quantity);
                                alert('Added to cart!');
                            }}
                            className="flex-1 bg-slate-900 dark:bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10"
                        >
                            <ShoppingCart size={20} /> Add to Cart
                        </button>
                    </div>

                    {/* Features / Benefits */}
                    <div className="grid grid-cols-2 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                                <Truck size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">Free Delivery</p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">Orders over ₹5,000</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">2 Year Warranty</p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">100% Guarantee</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Customer Reviews</h2>
                    <button
                        onClick={handleAnalyzeReviews}
                        disabled={isAnalyzing || !!reviewAnalysis}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform"
                    >
                        <Brain size={18} /> {isAnalyzing ? 'Analyzing...' : 'Analyze with AI'}
                    </button>
                </div>

                <AnimatePresence>
                    {reviewAnalysis && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-2xl p-6 mb-8"
                        >
                            <h3 className="flex items-center gap-2 font-bold text-indigo-900 dark:text-indigo-300 mb-4">
                                <Sparkles size={18} /> AI Sentiment Analysis
                            </h3>
                            <div className="text-indigo-800 dark:text-indigo-200 whitespace-pre-line leading-relaxed">
                                {reviewAnalysis}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="space-y-6">
                    {MOCK_REVIEWS.map((review, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex text-amber-400">
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                </div>
                                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Verified Buyer</span>
                            </div>
                            <p className="text-slate-700 dark:text-slate-300">{review}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
