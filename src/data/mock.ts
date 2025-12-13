import { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Sony WH-1000XM5',
        description: 'The best noise cancelling headphones in the market with industry-leading noise cancellation. 30 hours battery life, lightweight design, and crystal clear call quality.',
        price: 29990,
        category: 'Electronics',
        images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1000'],
        stock: 10,
        tags: ['noise cancelling', 'wireless', 'headphones', 'sony']
    },
    {
        id: '2',
        name: 'MacBook Air M2',
        description: 'Supercharged by M2 chip. The thinnest, lightest notebook. 18 hours battery life. Stunning Liquid Retina display.',
        price: 99900,
        category: 'Computers',
        images: ['https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=1000'],
        stock: 5,
        tags: ['laptop', 'apple', 'm2', 'macbook']
    },
    {
        id: '3',
        name: 'Nike Air Max 270',
        description: 'Legendary Air Max comfort with a modern streamlined look. Features the biggest heel Air unit yet for a soft ride that feels as impossible as it looks.',
        price: 13995,
        category: 'Fashion',
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000'],
        stock: 20,
        tags: ['shoes', 'running', 'sport', 'nike']
    },
    {
        id: '4',
        name: 'Logitech MX Master 3S',
        description: 'An icon remastered. Feel every moment of your workflow with even more precision, tactility, and performance, thanks to Quiet Clicks and the 8,000 DPI track-on-glass sensor.',
        price: 8995,
        category: 'Electronics',
        images: ['https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&q=80&w=1000'],
        stock: 15,
        tags: ['mouse', 'productivity', 'wireless', 'logitech']
    },
    {
        id: '5',
        name: 'Samsung Galaxy S24 Ultra',
        description: 'Unleash new possibilities with Galaxy AI. Capture details that rival reality with the 200MP camera and the most powerful processor on a Galaxy.',
        price: 129999,
        category: 'Electronics',
        images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=1000'],
        stock: 8,
        tags: ['smartphone', 'samsung', 'android', 'ai']
    },
    {
        id: '6',
        name: 'Herman Miller Aeron Chair',
        description: 'The benchmark for ergonomic seating. Designed to distribute weight evenly and keep you cool and comfortable for long hours of work.',
        price: 125000,
        category: 'Furniture',
        images: ['https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=1000'],
        stock: 3,
        tags: ['office', 'chair', 'ergonomic', 'furniture']
    },
    {
        id: '7',
        name: 'Ray-Ban Aviator Classic',
        description: 'Currently one of the most iconic sunglass models in the world. Originally designed for U.S. Aviators in 1937.',
        price: 10590,
        category: 'Fashion',
        images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1000'],
        stock: 25,
        tags: ['sunglasses', 'fashion', 'summer', 'rayban']
    },
    {
        id: '8',
        name: 'PlayStation 5 Console',
        description: 'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback, adaptive triggers, and 3D Audio.',
        price: 54990,
        category: 'Gaming',
        images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1000'],
        stock: 12,
        tags: ['gaming', 'ps5', 'console', 'sony']
    },
    {
        id: '9',
        name: 'Kindle Paperwhite',
        description: 'Now with a 6.8" display and thinner borders, adjustable warm light, up to 10 weeks of battery life, and 20% faster page turns.',
        price: 14999,
        category: 'Electronics',
        images: ['https://images.unsplash.com/photo-1594312915251-48db9280c8f1?auto=format&fit=crop&q=80&w=1000'],
        stock: 30,
        tags: ['reader', 'book', 'amazon', 'tablet']
    },
    {
        id: '10',
        name: 'Dyson V15 Detect',
        description: 'Powerful, intelligent cordless vacuum. Laser reveals microscopic dust. LCD screen reports performance in real time.',
        price: 65900,
        category: 'Home',
        images: ['https://images.unsplash.com/photo-1558317379-1784935d1926?auto=format&fit=crop&q=80&w=1000'],
        stock: 7,
        tags: ['vacuum', 'cleaning', 'home', 'dyson']
    }
];
