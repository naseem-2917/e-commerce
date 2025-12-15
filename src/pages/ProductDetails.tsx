import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/mock';
import { ShoppingCart, ArrowLeft, Sparkles, Download, Shield, Zap, ChevronLeft, ChevronRight, Star, ThumbsUp, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { explainProduct } from '../services/gemini';
import { motion, AnimatePresence } from 'framer-motion';

// Mock reviews data (would come from Firebase in production)
const MOCK_REVIEWS: Record<string, Array<{ id: string; userId: string; userName: string; rating: number; comment: string; date: string; helpful: number }>> = {
    '1': [
        { id: 'r1', userId: 'u1', userName: 'Rahul S.', rating: 5, comment: 'Amazing UI kit! Saved me weeks of work. The components are well organized and easy to customize.', date: '2024-12-10', helpful: 12 },
        { id: 'r2', userId: 'u2', userName: 'Priya M.', rating: 4, comment: 'Great value for money. Would love to see more mobile components in future updates.', date: '2024-12-08', helpful: 8 },
    ],
    '2': [
        { id: 'r3', userId: 'u3', userName: 'Amit K.', rating: 5, comment: 'Best React course I have taken! The projects are practical and the explanations are clear.', date: '2024-12-12', helpful: 25 },
        { id: 'r4', userId: 'u4', userName: 'Sneha P.', rating: 5, comment: 'Finally understood hooks and context! Highly recommend for beginners.', date: '2024-12-05', helpful: 18 },
    ],
    '3': [
        { id: 'r5', userId: 'u5', userName: 'Vikram R.', rating: 4, comment: 'Great Notion template. Boosted my productivity significantly!', date: '2024-12-11', helpful: 6 },
    ],
};

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCart();
    const { user } = useAuth();

    // AI Explain Feature State
    const [aiExplanation, setAiExplanation] = useState('');
    const [isExplaining, setIsExplaining] = useState(false);

    // Screenshot carousel state
    const [currentScreenshot, setCurrentScreenshot] = useState(0);

    // Review form state
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [userRating, setUserRating] = useState(5);
    const [userComment, setUserComment] = useState('');
    const [reviews, setReviews] = useState(MOCK_REVIEWS[id || ''] || []);

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
        if (aiExplanation) return;
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

    // Calculate average rating
    const avgRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : '0';

    // Submit review
    const handleSubmitReview = () => {
        if (!userComment.trim()) return;

        const newReview = {
            id: `r${Date.now()}`,
            userId: user?.uid || 'guest',
            userName: user?.displayName || 'Anonymous',
            rating: userRating,
            comment: userComment,
            date: new Date().toISOString().split('T')[0],
            helpful: 0,
        };

        setReviews([newReview, ...reviews]);
        setUserComment('');
        setUserRating(5);
        setShowReviewForm(false);
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
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                            {product.name}
                        </h1>

                        {/* Tags */}
                        {product.tags && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {product.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded-md">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Rating Display */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={18}
                                        className={star <= Math.round(parseFloat(avgRating)) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}
                                    />
                                ))}
                            </div>
                            <span className="font-bold text-slate-900 dark:text-white">{avgRating}</span>
                            <span className="text-slate-500 dark:text-slate-400">({reviews.length} reviews)</span>
                        </div>

                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                            ₹{product.price.toLocaleString()}
                        </p>
                    </div>

                    {/* AI Explain Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAIExplain}
                        disabled={isExplaining}
                        className="w-full py-4 mb-6 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 disabled:opacity-70"
                    >
                        <Sparkles size={20} className={isExplaining ? 'animate-spin' : ''} />
                        {aiExplanation ? '✓ AI Explained' : isExplaining ? 'Analyzing...' : 'AI Explain This Product'}
                    </motion.button>

                    {/* AI Explanation Result */}
                    <AnimatePresence>
                        {aiExplanation && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 p-5 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl border border-purple-200 dark:border-purple-800"
                            >
                                <div className="flex items-center gap-2 mb-3 text-purple-700 dark:text-purple-300">
                                    <Sparkles size={18} />
                                    <span className="font-bold">AI Explanation</span>
                                </div>
                                <div className="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-line leading-relaxed">
                                    {aiExplanation}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-2">About this product</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Quantity & Add to Cart */}
                    <div className="flex flex-col gap-3 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-3 text-lg font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                    -
                                </button>
                                <span className="px-4 py-3 min-w-[50px] text-center font-bold text-slate-900 dark:text-white">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-3 text-lg font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={() => {
                                    addItem(product, quantity);
                                    alert('Added to cart!');
                                }}
                                className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-6 py-4 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
                            >
                                <ShoppingCart size={20} /> Add to Cart
                            </button>
                        </div>

                        {/* Buy Now Button */}
                        <Link
                            to="/checkout"
                            onClick={() => addItem(product, quantity)}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
                        >
                            <Zap size={20} /> Buy Now
                        </Link>
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

            {/* Reviews Section */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-12 mb-12">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Customer Reviews</h2>
                        <p className="text-slate-500 dark:text-slate-400">{reviews.length} reviews • Average rating: {avgRating}/5</p>
                    </div>
                    <button
                        onClick={() => setShowReviewForm(!showReviewForm)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                    >
                        Write a Review
                    </button>
                </div>

                {/* Review Form */}
                <AnimatePresence>
                    {showReviewForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-8 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800"
                        >
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Write Your Review</h3>

                            {/* Star Rating */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Rating</label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setUserRating(star)}
                                            className="p-1"
                                        >
                                            <Star
                                                size={28}
                                                className={star <= userRating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Comment */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Review</label>
                                <textarea
                                    value={userComment}
                                    onChange={(e) => setUserComment(e.target.value)}
                                    placeholder="Share your experience with this product..."
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleSubmitReview}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                                >
                                    Submit Review
                                </button>
                                <button
                                    onClick={() => setShowReviewForm(false)}
                                    className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Reviews List */}
                <div className="space-y-6">
                    {reviews.length === 0 ? (
                        <div className="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                            <User size={40} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                            <p className="text-slate-500 dark:text-slate-400">No reviews yet. Be the first to review this product!</p>
                        </div>
                    ) : (
                        reviews.map((review) => (
                            <div key={review.id} className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">{review.userName}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        size={14}
                                                        className={star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-xs text-slate-500 dark:text-slate-400">{review.date}</span>
                                        </div>
                                    </div>
                                    <button className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                                        <ThumbsUp size={14} />
                                        <span>{review.helpful}</span>
                                    </button>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400">{review.comment}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Related Products */}
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
