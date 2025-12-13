
import { Product } from '../types';
import { ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-md transition-all duration-300 group">
            <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Link to={`/product/${product.id}`} className="block w-full h-full">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </Link>
                {/* Quick Add Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault(); // Prevent navigation
                        e.stopPropagation();
                        addItem(product, 1);
                        alert('Added to cart!');
                    }}
                    className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:text-white text-slate-700"
                >
                    <ShoppingCart size={20} />
                </button>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider mb-1">{product.category}</p>
                        <Link to={`/product/${product.id}`}>
                            <h3 className="font-semibold text-slate-800 dark:text-slate-100 line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{product.name}</h3>
                        </Link>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                        <Star size={12} fill="currentColor" />
                        <span>4.5</span>
                    </div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4">{product.description}</p>

                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-900 dark:text-white">₹{product.price.toLocaleString()}</span>
                    {product.stock < 5 && (
                        <span className="text-xs text-red-500 font-medium bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">Low Stock</span>
                    )}
                </div>
            </div>
        </div>
    );
}
