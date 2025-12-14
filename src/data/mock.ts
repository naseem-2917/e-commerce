import { Product, Coupon, Order } from '../types';

export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Ultimate UI Kit Pro',
        description: 'A comprehensive Figma UI kit with 500+ components, 50+ screens, and design systems for web and mobile apps. Perfect for startups and designers who want to speed up their workflow.',
        price: 2999,
        category: 'Design Templates',
        images: ['https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000'],
        screenshots: [
            'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=800'
        ],
        downloadUrl: 'https://example.com/downloads/ui-kit-pro.zip',
        isActive: true,
        tags: ['figma', 'ui kit', 'design system', 'components']
    },
    {
        id: '2',
        name: 'React Mastery Course',
        description: 'Complete React.js course from beginner to advanced. Learn hooks, context, Redux, and build 10 real-world projects. Includes lifetime access and certificate.',
        price: 4999,
        category: 'Online Courses',
        images: ['https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000'],
        screenshots: [
            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'
        ],
        downloadUrl: 'https://example.com/courses/react-mastery',
        isActive: true,
        tags: ['react', 'javascript', 'web development', 'course']
    },
    {
        id: '3',
        name: 'Notion Productivity System',
        description: 'All-in-one Notion template for productivity. Includes task manager, habit tracker, goal setting, and life dashboard. Boost your productivity 10x.',
        price: 999,
        category: 'Templates',
        images: ['https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=1000'],
        downloadUrl: 'https://example.com/downloads/notion-system.zip',
        isActive: true,
        tags: ['notion', 'productivity', 'template', 'organization']
    },
    {
        id: '4',
        name: 'The Startup Playbook',
        description: 'Essential guide for first-time founders. Learn fundraising, product-market fit, team building, and scaling strategies from successful entrepreneurs.',
        price: 1499,
        category: 'Ebooks',
        images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000'],
        downloadUrl: 'https://example.com/downloads/startup-playbook.pdf',
        isActive: true,
        tags: ['startup', 'business', 'entrepreneurship', 'ebook']
    },
    {
        id: '5',
        name: '3D Icon Pack - Premium',
        description: '200+ stunning 3D icons in multiple formats (PNG, SVG, Figma). Perfect for websites, apps, and presentations. High-resolution and fully customizable.',
        price: 1999,
        category: 'Design Templates',
        images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000'],
        downloadUrl: 'https://example.com/downloads/3d-icons.zip',
        isActive: true,
        tags: ['icons', '3d', 'design', 'graphics']
    },
    {
        id: '6',
        name: 'Python AI Bootcamp',
        description: 'Learn Python and AI/ML from scratch. Build chatbots, image recognition systems, and recommendation engines. 40+ hours of content with hands-on projects.',
        price: 5999,
        category: 'Online Courses',
        images: ['https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=1000'],
        downloadUrl: 'https://example.com/courses/python-ai',
        isActive: true,
        tags: ['python', 'ai', 'machine learning', 'course']
    },
    {
        id: '7',
        name: 'Social Media Template Bundle',
        description: 'Complete social media kit with 100+ Canva templates for Instagram, TikTok, LinkedIn, and Twitter. Stand out with professional designs.',
        price: 799,
        category: 'Templates',
        images: ['https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=1000'],
        downloadUrl: 'https://example.com/downloads/social-templates.zip',
        isActive: true,
        tags: ['social media', 'canva', 'instagram', 'marketing']
    },
    {
        id: '8',
        name: 'JavaScript Interview Guide',
        description: 'Ace your next JavaScript interview with 200+ curated questions, answers, and explanations. Covers ES6+, React, Node.js, and system design.',
        price: 699,
        category: 'Ebooks',
        images: ['https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=1000'],
        downloadUrl: 'https://example.com/downloads/js-interview.pdf',
        isActive: true,
        tags: ['javascript', 'interview', 'career', 'programming']
    },
    {
        id: '9',
        name: 'Chrome Extension Starter Kit',
        description: 'Build Chrome extensions in minutes. Includes boilerplate code, manifest v3 setup, popup UI templates, and deployment guide.',
        price: 1299,
        category: 'Software',
        images: ['https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=1000'],
        downloadUrl: 'https://example.com/downloads/chrome-kit.zip',
        isActive: true,
        tags: ['chrome', 'extension', 'javascript', 'web']
    },
    {
        id: '10',
        name: 'Photography Masterclass',
        description: 'Professional photography course covering composition, lighting, editing, and business. Learn from award-winning photographers. Includes Lightroom presets.',
        price: 3499,
        category: 'Online Courses',
        images: ['https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1000'],
        downloadUrl: 'https://example.com/courses/photography',
        isActive: true,
        tags: ['photography', 'editing', 'lightroom', 'creative']
    }
];

// Pre-configured coupons for hackathon demo
export const MOCK_COUPONS: Coupon[] = [
    { code: 'SAVE10', discountPercent: 10, isActive: true },
    { code: 'FIRST20', discountPercent: 20, isActive: true },
    { code: 'HACKATHON50', discountPercent: 50, isActive: true },
    { code: 'EXPIRED25', discountPercent: 25, isActive: false }
];

// Sample orders for admin demo
export const MOCK_ORDERS: Order[] = [
    {
        id: 'ORD-001',
        userId: 'user123',
        userEmail: 'john@example.com',
        items: [
            { productId: '1', productName: 'Ultimate UI Kit Pro', price: 2999, downloadUrl: 'https://example.com/downloads/ui-kit-pro.zip' },
            { productId: '4', productName: 'The Startup Playbook', price: 1499, downloadUrl: 'https://example.com/downloads/startup-playbook.pdf' }
        ],
        total: 4048,
        couponCode: 'SAVE10',
        discount: 450,
        status: 'completed',
        createdAt: new Date('2024-12-13')
    },
    {
        id: 'ORD-002',
        userId: 'user456',
        userEmail: 'jane@example.com',
        items: [
            { productId: '2', productName: 'React Mastery Course', price: 4999, downloadUrl: 'https://example.com/courses/react-mastery' }
        ],
        total: 4999,
        discount: 0,
        status: 'completed',
        createdAt: new Date('2024-12-14')
    }
];

// Categories for filtering
export const CATEGORIES = [
    'All',
    'Design Templates',
    'Online Courses',
    'Templates',
    'Ebooks',
    'Software'
];
