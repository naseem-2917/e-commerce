import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { Filter, SlidersHorizontal } from 'lucide-react';

// Mock Data for now
const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Sony WH-1000XM5',
        description: 'The best noise cancelling headphones in the market with industry-leading noise cancellation.',
        price: 348,
        category: 'Electronics',
        images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1000'],
        stock: 10,
        tags: ['noise cancelling', 'wireless', 'headphones']
    },
    {
        id: '2',
        name: 'MacBook Air M2',
        description: 'Supercharged by M2 chip. The thinnest, lightest notebook.',
        price: 1199,
        category: 'Computers',
        images: ['https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=1000'],
        stock: 5,
        tags: ['laptop', 'apple', 'm2']
    },
    {
        id: '3',
        name: 'Nike Air Max 270',
        description: 'Legendary Air Max comfort with a modern streamlined look.',
        price: 160,
        category: 'Fashion',
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000'],
        stock: 20,
        tags: ['shoes', 'running', 'sport']
    },
    {
        id: '4',
        name: 'Logitech MX Master 3S',
        description: 'An icon remastered. Feel every moment of your workflow with even more precision.',
        price: 99,
        category: 'Electronics',
        images: ['https://images.unsplash.com/photo-1631557008670-07bf6007e2c9?auto=format&fit=crop&q=80&w=1000'],
        stock: 15,
        tags: ['mouse', 'productivity', 'wireless']
    }
];

export default function Shop() {
    const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Shop All Products</h1>
                    <p className="text-slate-500 mt-1">Discover the best products curated just for you.</p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                        <SlidersHorizontal size={18} />
                        <span>Sort</span>
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
