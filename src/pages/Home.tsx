import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Shield, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_PRODUCTS } from '../data/mock';
import ProductCard from '../components/ProductCard';

export default function Home() {
    const featuredProducts = MOCK_PRODUCTS.slice(0, 4);

    return (
        <div className="space-y-16 pb-16">
            {/* Hero Section */}
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-900 transition-colors py-20 lg:py-32">
                {/* Abstract Background Shapes */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-b from-blue-600/20 to-transparent blur-3xl opacity-50 animate-pulse" />
                    <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-t from-indigo-600/20 to-transparent blur-3xl opacity-50 animate-pulse delay-1000" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm">
                            <Sparkles size={14} className="inline mr-2" />
                            AI-Powered Shopping Experience
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                            The Future of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient">
                                E-commerce is Here
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Discover a curated collection of premium products tailored just for you.
                            Experience smart recommendations and seamless shopping.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                            <Link to="/shop" className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl shadow-blue-500/10 flex items-center gap-2">
                                Start Shopping <ArrowRight size={20} />
                            </Link>
                            <Link to="/signup" className="px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-full font-medium hover:bg-slate-700 transition-all">
                                Create Account
                            </Link>
                        </div>
                    </motion.div>
                    {/* Stats/Features Banner */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mt-16 pt-12 border-t border-slate-700/50">
                        <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors group">
                            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                                <Zap size={24} />
                            </div>
                            <h3 className="font-bold text-white text-lg">Instant Search</h3>
                            <p className="text-sm text-slate-400 mt-1">Powered by Advanced AI</p>
                        </div>
                        <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors group">
                            <div className="p-3 bg-green-500/10 text-green-400 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                                <Truck size={24} />
                            </div>
                            <h3 className="font-bold text-white text-lg">Fast Delivery</h3>
                            <p className="text-sm text-slate-400 mt-1">Global Shipping Networks</p>
                        </div>
                        <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors group">
                            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                                <Shield size={24} />
                            </div>
                            <h3 className="font-bold text-white text-lg">Secure Payment</h3>
                            <p className="text-sm text-slate-400 mt-1">100% Buyer Protection</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Featured Products</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">Hand-picked selections for you</p>
                    </div>
                    <Link to="/shop" className="hidden sm:flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="mt-8 sm:hidden text-center">
                    <Link to="/shop" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline">
                        View All Products <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
                <div className="bg-slate-900 dark:bg-blue-900/20 rounded-3xl p-8 md:p-16 text-center shadow-xl dark:shadow-none overflow-hidden relative">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stay ahead of the curve</h2>
                        <p className="text-slate-300 mb-8 text-lg">Subscribe to our newsletter for exclusive deals, new arrivals, and AI-curated recommendations.</p>
                        <form className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                            />
                            <button type="submit" className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
