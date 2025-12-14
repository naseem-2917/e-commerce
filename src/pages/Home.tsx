import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Shield, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_PRODUCTS } from '../data/mock';
import ProductCard from '../components/ProductCard';

export default function Home() {
    const featuredProducts = MOCK_PRODUCTS.filter(p => p.isActive).slice(0, 4);

    return (
        <div className="space-y-16 pb-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 transition-colors py-20 lg:py-32">
                {/* Abstract Background Shapes */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-b from-blue-600/20 to-transparent blur-3xl opacity-50 animate-pulse" />
                    <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-t from-purple-600/20 to-transparent blur-3xl opacity-50 animate-pulse delay-1000" />
                    <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-cyan-500/10 to-transparent blur-3xl opacity-40 animate-pulse delay-500" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1.5 px-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm">
                            <Sparkles size={14} className="inline mr-2" />
                            AI-Powered Digital Store
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                            Welcome to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">
                                NAS Digital
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Discover premium digital products curated just for you.
                            Ebooks, courses, templates, and more — with AI-powered recommendations.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                            <Link
                                to="/shop"
                                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-bold hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-xl shadow-blue-500/25 flex items-center gap-2"
                            >
                                Explore Products <ArrowRight size={20} />
                            </Link>
                            <Link
                                to="/signup"
                                className="px-8 py-4 bg-white/5 text-white border border-white/20 rounded-full font-medium hover:bg-white/10 transition-all backdrop-blur-sm"
                            >
                                Create Account
                            </Link>
                        </div>
                    </motion.div>

                    {/* Features Banner */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-16 pt-12 border-t border-white/10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all group"
                        >
                            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-400 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                                <Sparkles size={24} />
                            </div>
                            <h3 className="font-bold text-white text-lg">AI-Powered</h3>
                            <p className="text-sm text-slate-400 mt-1 text-center">Smart recommendations & explanations</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all group"
                        >
                            <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 text-green-400 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                                <Download size={24} />
                            </div>
                            <h3 className="font-bold text-white text-lg">Instant Download</h3>
                            <p className="text-sm text-slate-400 mt-1 text-center">Get your products immediately</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all group"
                        >
                            <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                                <Shield size={24} />
                            </div>
                            <h3 className="font-bold text-white text-lg">Secure Payment</h3>
                            <p className="text-sm text-slate-400 mt-1 text-center">100% safe & encrypted</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Browse Categories</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Find exactly what you need</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { name: 'Design Templates', icon: '🎨', color: 'from-pink-500/20 to-rose-500/20' },
                        { name: 'Online Courses', icon: '📚', color: 'from-blue-500/20 to-cyan-500/20' },
                        { name: 'Ebooks', icon: '📖', color: 'from-amber-500/20 to-orange-500/20' },
                        { name: 'Software', icon: '💻', color: 'from-green-500/20 to-emerald-500/20' },
                    ].map((cat) => (
                        <Link
                            key={cat.name}
                            to={`/shop?category=${encodeURIComponent(cat.name)}`}
                            className={`p-6 rounded-2xl bg-gradient-to-br ${cat.color} border border-slate-200 dark:border-slate-700 hover:scale-105 transition-all text-center group`}
                        >
                            <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform">{cat.icon}</span>
                            <h3 className="font-semibold text-slate-900 dark:text-white">{cat.name}</h3>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Featured Products</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">Hand-picked digital goodies for you</p>
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

            {/* Why Choose Us */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 md:p-16 text-center shadow-2xl overflow-hidden relative">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why NAS Digital?</h2>
                        <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                            We use AI to help you find the perfect products. Get personalized recommendations,
                            understand complex products with AI explanations, and download instantly after purchase.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                                <h3 className="font-bold text-white mb-2">🤖 AI Explains</h3>
                                <p className="text-sm text-slate-400">Not sure about a product? Our AI explains it in simple terms.</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                                <h3 className="font-bold text-white mb-2">⚡ Instant Access</h3>
                                <p className="text-sm text-slate-400">Download your products immediately after purchase.</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                                <h3 className="font-bold text-white mb-2">🛡️ Quality Guaranteed</h3>
                                <p className="text-sm text-slate-400">All products are vetted for quality. Satisfaction guaranteed.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center shadow-xl overflow-hidden relative">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Get Exclusive Deals</h2>
                        <p className="text-blue-100 mb-6">Subscribe and get 20% off on your first purchase!</p>
                        <form className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-4 rounded-full bg-white/20 border border-white/30 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                            />
                            <button type="submit" className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold hover:bg-blue-50 transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
