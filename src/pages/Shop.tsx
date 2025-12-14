import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, Sparkles } from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES } from '../data/mock';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function Shop() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
    const [priceRange, setPriceRange] = useState<'all' | 'low' | 'mid' | 'high'>(
        (searchParams.get('price') as 'all' | 'low' | 'mid' | 'high') || 'all'
    );
    const [showFilters, setShowFilters] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    // Filter products
    const filteredProducts = useMemo(() => {
        let products = MOCK_PRODUCTS.filter(p => p.isActive);

        // Category filter
        if (selectedCategory && selectedCategory !== 'All') {
            products = products.filter(p => p.category === selectedCategory);
        }

        // Price filter
        if (priceRange !== 'all') {
            products = products.filter(p => {
                if (priceRange === 'low') return p.price < 1000;
                if (priceRange === 'mid') return p.price >= 1000 && p.price < 3000;
                if (priceRange === 'high') return p.price >= 3000;
                return true;
            });
        }

        // Search filter (simple local search)
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            products = products.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query) ||
                p.tags?.some(t => t.toLowerCase().includes(query))
            );
        }

        return products;
    }, [selectedCategory, priceRange, searchQuery]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        // Simulate AI search delay for effect
        setTimeout(() => {
            setIsSearching(false);
            const params = new URLSearchParams();
            if (searchQuery) params.set('q', searchQuery);
            if (selectedCategory !== 'All') params.set('category', selectedCategory);
            if (priceRange !== 'all') params.set('price', priceRange);
            setSearchParams(params);
        }, 300);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('All');
        setPriceRange('all');
        setSearchParams({});
    };

    const hasActiveFilters = searchQuery || selectedCategory !== 'All' || priceRange !== 'all';

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Digital Products</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} available
                    </p>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex-1 max-w-md">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products... (AI-powered)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                        />
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        {isSearching && (
                            <Sparkles size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500 animate-spin" />
                        )}
                    </div>
                </form>

                {/* Filter Toggle (Mobile) */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 font-medium"
                >
                    <SlidersHorizontal size={18} />
                    Filters {hasActiveFilters && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
                </button>
            </div>

            {/* Filters */}
            <AnimatePresence>
                {(showFilters || window.innerWidth >= 768) && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mb-8 overflow-hidden"
                    >
                        <div className="flex flex-col md:flex-row gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                            {/* Categories */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Category
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {CATEGORIES.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="md:w-64">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Price Range
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { value: 'all', label: 'All' },
                                        { value: 'low', label: '< ₹1,000' },
                                        { value: 'mid', label: '₹1k - ₹3k' },
                                        { value: 'high', label: '> ₹3,000' },
                                    ].map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => setPriceRange(option.value as typeof priceRange)}
                                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${priceRange === option.value
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Clear Filters */}
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-1 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium self-end"
                                >
                                    <X size={16} /> Clear
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No products found</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">
                        Try adjusting your search or filters
                    </p>
                    <button
                        onClick={clearFilters}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
}
