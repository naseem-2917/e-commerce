import { Link } from 'react-router-dom';
import { ShoppingCart, Download, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { motion } from 'framer-motion';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group"
        >
            <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full">
                        {product.category}
                    </span>
                </div>
                {/* Digital Product Indicator */}
                <div className="absolute top-3 right-3">
                    <span className="p-2 bg-blue-500/90 backdrop-blur-sm text-white rounded-full flex items-center justify-center" title="Digital Download">
                        <Download size={14} />
                    </span>
                </div>
                {/* AI Feature Badge */}
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-medium rounded-full">
                        <Sparkles size={12} /> AI Explain
                    </span>
                </div>
            </Link>

            <div className="p-4">
                <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-3 min-h-[2.5rem]">
                    {product.description}
                </p>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                        {product.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                        ₹{product.price.toLocaleString()}
                    </span>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.preventDefault();
                            addItem(product, 1);
                        }}
                        className="p-2.5 bg-slate-900 dark:bg-blue-600 text-white rounded-xl hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors shadow-md"
                        title="Add to Cart"
                    >
                        <ShoppingCart size={18} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
