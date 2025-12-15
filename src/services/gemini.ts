import { MOCK_PRODUCTS } from "../data/mock";
import { Product } from "../types";

// Cloudflare Worker endpoint (secure - API key is stored in Worker)
const WORKER_URL = "https://wild-block-3a24.khannaseem1704.workers.dev";

// Helper to call Cloudflare Worker with Gemini API
const callGeminiAPI = async (prompt: string): Promise<string> => {
    try {
        const response = await fetch(WORKER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        if (response.ok) {
            const data = await response.json();
            // Handle different response formats
            if (typeof data === 'string') return data;
            if (data?.response) return data.response;
            if (data?.text) return data.text;
            if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
                return data.candidates[0].content.parts[0].text;
            }
            return "I couldn't process that request. Please try again.";
        } else {
            console.warn("Worker error:", response.status);
            return generateSmartFallback(prompt);
        }
    } catch (error) {
        console.error("Error calling AI Service:", error);
        return generateSmartFallback(prompt);
    }
};

// Smart fallback when API is unavailable
const generateSmartFallback = (prompt: string): string => {
    const lowerPrompt = prompt.toLowerCase();

    // Extract product name from prompt if available
    for (const product of MOCK_PRODUCTS) {
        if (lowerPrompt.includes(product.name.toLowerCase())) {
            return generateProductResponse(product);
        }
    }

    // Category-based responses
    if (lowerPrompt.includes('course') || lowerPrompt.includes('learn')) {
        return "🎓 **Best Courses:**\n\n• **React Mastery Course** (₹4,999) - Complete React.js training\n• **Python AI Bootcamp** (₹5,999) - AI/ML from scratch\n• **Photography Masterclass** (₹3,499) - Pro photography skills";
    }

    if (lowerPrompt.includes('design') || lowerPrompt.includes('ui') || lowerPrompt.includes('template')) {
        return "🎨 **Design Resources:**\n\n• **Ultimate UI Kit Pro** (₹2,999) - 500+ Figma components\n• **3D Icon Pack** (₹1,999) - 200+ stunning icons\n• **Social Media Bundle** (₹799) - 100+ Canva templates";
    }

    if (lowerPrompt.includes('ebook') || lowerPrompt.includes('book')) {
        return "📚 **Top Ebooks:**\n\n• **The Startup Playbook** (₹1,499) - Guide for founders\n• **JavaScript Interview Guide** (₹699) - 200+ interview questions";
    }

    return "👋 I'm here to help! Ask me about:\n\n• **Courses** - React, Python AI, Photography\n• **Design** - UI Kits, Icons, Templates\n• **Ebooks** - Business, Programming guides\n\nWhat interests you?";
};

// Generate product-specific response with pros/cons
const generateProductResponse = (product: Product): string => {
    const pros: Record<string, string[]> = {
        'Design Templates': ['Professional quality', 'Saves hours of work', 'Fully customizable'],
        'Online Courses': ['Learn at your pace', 'Lifetime access', 'Certificate included'],
        'Templates': ['Ready to use', 'Time-saving', 'Easy to customize'],
        'Ebooks': ['Instant download', 'Expert insights', 'Portable learning'],
        'Software': ['Boost productivity', 'Regular updates', 'Easy setup'],
    };

    const cons: Record<string, string[]> = {
        'Design Templates': ['Requires design software', 'Learning curve for beginners'],
        'Online Courses': ['Self-discipline needed', 'No live interaction'],
        'Templates': ['May need customization', 'Specific tool required'],
        'Ebooks': ['Digital only', 'Self-study format'],
        'Software': ['Initial setup time', 'Tech knowledge helpful'],
    };

    const productPros = pros[product.category] || ['High quality', 'Great value', 'Instant access'];
    const productCons = cons[product.category] || ['Digital product', 'No physical copy'];

    return `📦 **${product.name}** - ₹${product.price}

${product.description.slice(0, 150)}...

✅ **Pros:**
${productPros.map(p => `• ${p}`).join('\n')}

⚠️ **Cons:**
${productCons.map(c => `• ${c}`).join('\n')}

⭐ **Verdict:** Great choice for ${product.category === 'Online Courses' ? 'learners' : 'professionals'} looking to level up!`;
};

// AI Shopping Assistant - Enhanced with product context
export const getShoppingAssistantResponse = async (userQuery: string, _cartContext?: string) => {
    // Check if user is asking about a specific product
    const lowerQuery = userQuery.toLowerCase();

    for (const product of MOCK_PRODUCTS) {
        if (lowerQuery.includes(product.name.toLowerCase()) ||
            product.tags?.some(tag => lowerQuery.includes(tag.toLowerCase()))) {
            // Found a specific product - give detailed response
            const prompt = `
You are an AI shopping assistant. A customer is asking about this product:

Product: ${product.name}
Price: ₹${product.price}
Category: ${product.category}
Description: ${product.description}
Tags: ${product.tags?.join(', ')}

Customer question: "${userQuery}"

Give a helpful response that includes:
1. Brief product overview (1-2 sentences)
2. 3 Pros (benefits)
3. 2 Cons (limitations)
4. Who should buy this (target audience)

Keep it under 100 words. Be honest and helpful.
`;
            return callGeminiAPI(prompt);
        }
    }

    // General shopping query
    const productContext = MOCK_PRODUCTS.filter(p => p.isActive).slice(0, 6).map(p =>
        `${p.name} (₹${p.price}) - ${p.category}: ${p.tags?.slice(0, 3).join(', ')}`
    ).join('\n');

    const fullPrompt = `
You are an AI shopping assistant for NAS Digital store.

Available products:
${productContext}

Customer: "${userQuery}"

Instructions:
- Recommend 2-3 relevant products based on their query
- Mention product names and prices
- Be helpful and conversational
- Keep response under 60 words
`;

    return callGeminiAPI(fullPrompt);
};

// AI Explain Product - Detailed with pros/cons
export const explainProduct = async (product: Product): Promise<string> => {
    const prompt = `
Explain this digital product for a potential buyer:

Product: ${product.name}
Category: ${product.category}
Price: ₹${product.price}
Description: ${product.description}
Tags: ${product.tags?.join(', ')}

Provide:
1. Simple explanation (2 sentences, easy to understand)
2. ✅ 3 Key Benefits (pros)
3. ⚠️ 2 Limitations (cons - be honest)
4. 👤 Who should buy (target audience)
5. ⭐ Final verdict (1 sentence)

Keep total under 100 words. Use emojis for formatting.
`;

    return callGeminiAPI(prompt);
};

// AI Product Recommendations
export const getProductRecommendations = async (userPreference: string): Promise<string> => {
    const products = MOCK_PRODUCTS.filter(p => p.isActive).slice(0, 5);
    const context = products.map(p => `${p.name} (₹${p.price}) - ${p.category}`).join('\n');

    return callGeminiAPI(`
Products: ${context}

User wants: ${userPreference}

Recommend 2-3 best matches with brief reasons. Under 50 words.
`);
};

// Semantic search
export const semanticSearch = async (query: string): Promise<Product[]> => {
    const lowerQuery = query.toLowerCase();

    return MOCK_PRODUCTS.filter(p =>
        p.isActive && (
            p.name.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery) ||
            p.tags?.some(t => t.toLowerCase().includes(lowerQuery))
        )
    ).slice(0, 5);
};

// Legacy functions
export const summarizeProduct = async (productName: string, description: string) => {
    const product = MOCK_PRODUCTS.find(p => p.name === productName);
    if (product) return explainProduct(product);
    return `**${productName}**: ${description.slice(0, 100)}...`;
};

export const analyzeReviews = async (reviews: string[]) => {
    if (reviews.length === 0) return "No reviews yet. Be the first to review!";
    const prompt = `Analyze these reviews briefly: ${reviews.slice(0, 3).join(' | ')}. Give sentiment and key points in 30 words.`;
    return callGeminiAPI(prompt);
};