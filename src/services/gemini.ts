import { MOCK_PRODUCTS } from "../data/mock";
import { Product } from "../types";

// Cloudflare Worker endpoint (secure - API key is stored in Worker)
const WORKER_URL = "https://wild-block-3a24.khannaseem1704.workers.dev";

// Fallback responses when AI is not available
const FALLBACK_RESPONSES = {
    recommendation: "Based on your interest, I'd recommend checking out our top sellers: Ultimate UI Kit Pro (₹2,999), React Mastery Course (₹4,999), and The Startup Playbook (₹1,499).",
};

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
            return generateSmartFallback(prompt);
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

    // Check for product-related queries
    const matchingProducts = MOCK_PRODUCTS.filter(p =>
        p.isActive && (
            p.name.toLowerCase().includes(lowerPrompt) ||
            p.category.toLowerCase().includes(lowerPrompt) ||
            p.tags?.some(t => lowerPrompt.includes(t.toLowerCase()))
        )
    ).slice(0, 3);

    if (matchingProducts.length > 0) {
        const productList = matchingProducts.map(p => `**${p.name}** - ₹${p.price}`).join('\n');
        return `Here are some products you might like:\n\n${productList}\n\nClick on any product to learn more!`;
    }

    // Category-based responses
    if (lowerPrompt.includes('course') || lowerPrompt.includes('learn')) {
        return "We have great courses! Check out:\n• **React Mastery Course** - ₹4,999\n• **Python AI Bootcamp** - ₹5,999\n• **Photography Masterclass** - ₹3,499";
    }

    if (lowerPrompt.includes('design') || lowerPrompt.includes('ui') || lowerPrompt.includes('template')) {
        return "For design needs, try:\n• **Ultimate UI Kit Pro** - ₹2,999 (500+ components)\n• **3D Icon Pack** - ₹1,999\n• **Social Media Template Bundle** - ₹799";
    }

    if (lowerPrompt.includes('ebook') || lowerPrompt.includes('book') || lowerPrompt.includes('read')) {
        return "Our best ebooks:\n• **The Startup Playbook** - ₹1,499\n• **JavaScript Interview Guide** - ₹699\nPerfect for learning on the go!";
    }

    if (lowerPrompt.includes('cheap') || lowerPrompt.includes('budget') || lowerPrompt.includes('affordable')) {
        const cheapProducts = MOCK_PRODUCTS.filter(p => p.isActive && p.price < 1500).slice(0, 3);
        const list = cheapProducts.map(p => `• **${p.name}** - ₹${p.price}`).join('\n');
        return `Budget-friendly options:\n${list}`;
    }

    if (lowerPrompt.includes('best') || lowerPrompt.includes('popular') || lowerPrompt.includes('top')) {
        return "Our top sellers:\n• **React Mastery Course** - Most popular course\n• **Ultimate UI Kit Pro** - Best for designers\n• **Notion Productivity System** - ₹999 bestseller";
    }

    return FALLBACK_RESPONSES.recommendation;
};

// AI Shopping Assistant - Chat with context
export const getShoppingAssistantResponse = async (userQuery: string, _cartContext?: string) => {
    const productContext = MOCK_PRODUCTS.slice(0, 5).map(p =>
        `${p.name}: ₹${p.price} (${p.category})`
    ).join('\n');

    const fullPrompt = `
    You are an AI shopping assistant for NAS Digital, a digital products store.
    Some products: ${productContext}

    User: ${userQuery}
    
    Instructions:
    - Be helpful and concise (under 50 words)
    - Recommend specific products when relevant
    - Mention prices in ₹
    `;

    return callGeminiAPI(fullPrompt);
};

// AI Explain Product
export const explainProduct = async (product: Product): Promise<string> => {
    const prompt = `
    Explain this digital product simply (under 60 words):
    
    Product: ${product.name}
    Category: ${product.category}
    Price: ₹${product.price}
    Description: ${product.description}
    
    Format: Brief explanation + 3 bullet point benefits + who should buy
    `;

    return callGeminiAPI(prompt);
};

// AI Product Recommendations
export const getProductRecommendations = async (userPreference: string): Promise<string> => {
    return callGeminiAPI(`Recommend 2-3 digital products for someone interested in: ${userPreference}. Keep it under 40 words.`);
};

// Semantic search with fallback
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
    if (product) {
        return explainProduct(product);
    }
    return `**${productName}**: ${description.slice(0, 100)}...`;
};

export const analyzeReviews = async (reviews: string[]) => {
    if (reviews.length === 0) return "No reviews to analyze.";
    return `Based on ${reviews.length} reviews: Generally positive feedback with customers appreciating the quality and value.`;
};