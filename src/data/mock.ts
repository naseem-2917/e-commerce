import { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Sony WH-1000XM5',
        description: 'The best noise cancelling headphones in the market with industry-leading noise cancellation. 30 hours battery life, lightweight design, and crystal clear call quality.',
        price: 348,
        category: 'Electronics',
        images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1000'],
        stock: 10,
        tags: ['noise cancelling', 'wireless', 'headphones', 'sony']
    },
    {
        id: '2',
        name: 'MacBook Air M2',
        description: 'Supercharged by M2 chip. The thinnest, lightest notebook. 18 hours battery life. Stunning Liquid Retina display.',
        price: 1199,
        category: 'Computers',
        images: ['https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=1000'],
        stock: 5,
        tags: ['laptop', 'apple', 'm2', 'macbook']
    },
    {
        id: '3',
        name: 'Nike Air Max 270',
        description: 'Legendary Air Max comfort with a modern streamlined look. Features the biggest heel Air unit yet for a soft ride that feels as impossible as it looks.',
        price: 160,
        category: 'Fashion',
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000'],
        stock: 20,
        tags: ['shoes', 'running', 'sport', 'nike']
    },
    {
        id: '4',
        name: 'Logitech MX Master 3S',
        description: 'An icon remastered. Feel every moment of your workflow with even more precision, tactility, and performance, thanks to Quiet Clicks and the 8,000 DPI track-on-glass sensor.',
        price: 99,
        category: 'Electronics',
        images: ['https://images.unsplash.com/photo-1631557008670-07bf6007e2c9?auto=format&fit=crop&q=80&w=1000'],
        stock: 15,
        tags: ['mouse', 'productivity', 'wireless', 'logitech']
    }
];
