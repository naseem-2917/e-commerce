import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Sparkles, Download, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_PRODUCTS } from '../data/mock';
import ProductCard from '../components/ProductCard';
import HeroWithFluidGrid from '../components/HeroWithFluidGrid';
import AnimatedCard from '../components/AnimatedCard';

export default function Home() {
    const featuredProducts = MOCK_PRODUCTS.filter(p => p.isActive).slice(0, 4);

    return (
        <div className="pb-16">
            {/* Hero Section with Fluid Grid Effect */}
            <HeroWithFluidGrid />

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-slate-50 dark:bg-slate-950">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: Zap, title: 'Instant Download', desc: 'Get your digital products immediately after purchase', gradient: 'from-amber-500 to-orange-500' },
                        { icon: Shield, title: 'Secure Payment', desc: 'Your transactions are protected with enterprise-grade security', gradient: 'from-green-500 to-emerald-500' },
                        { icon: Sparkles, title: 'AI Powered', desc: 'Smart recommendations and instant product explanations', gradient: 'from-blue-500 to-purple-500' },
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <AnimatedCard>
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                                    <feature.icon size={24} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
                            </AnimatedCard>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Categories Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50 dark:bg-slate-950">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Browse Categories</h2>
                    <p className="text-slate-600 dark:text-slate-400">Find the perfect digital product for your needs</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { name: 'UI Kits & Design', emoji: '🎨' },
                        { name: 'Online Courses', emoji: '📚' },
                        { name: 'Ebooks & Guides', emoji: '📖' },
                        { name: 'Templates', emoji: '📄' },
                    ].map((cat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link to="/shop">
                                <AnimatedCard className="cursor-pointer">
                                    <div className="text-center py-2">
                                        <span className="text-5xl mb-4 block">{cat.emoji}</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{cat.name}</span>
                                        <ChevronRight size={18} className="mx-auto mt-3 text-slate-400" />
                                    </div>
                                </AnimatedCard>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50 dark:bg-slate-950">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Featured Products</h2>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">Top picks from our collection</p>
                    </div>
                    <Link
                        to="/shop"
                        className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1"
                    >
                        View All <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50 dark:bg-slate-950">
                <div className="relative rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />
                    <div className="relative p-12 text-center text-white">
                        <Download size={48} className="mx-auto mb-6 opacity-80" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
                        <p className="text-white/80 mb-8 max-w-lg mx-auto">
                            Join thousands of creators and professionals who trust NAS Digital.
                        </p>
                        <Link
                            to="/shop"
                            className="inline-block px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-all hover:scale-105"
                        >
                            Start Shopping
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
