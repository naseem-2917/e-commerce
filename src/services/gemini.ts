import { MOCK_PRODUCTS } from "../data/mock";
import { Product } from "../types";

const API_URL = "https://wild-block-3a24.khannaseem1704.workers.dev";

// Helper to call Cloudflare Worker with Gemini API
const callGeminiAPI = async (prompt: string): Promise<string> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        if (response.ok) {
            const data = await response.json();
            return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";
        } else {
            console.warn("Cloudflare worker error", response.status);
            return "Sorry, I am facing some issues connecting to the server.";
        }
    } catch (error) {
        console.error("Error calling AI Service:", error);
        return "I'm having trouble connecting to the AI service.";
    }
};

// AI Shopping Assistant - Chat with context
export const getShoppingAssistantResponse = async (userQuery: string, _cartContext?: string) => {
    const productContext = MOCK_PRODUCTS.map(p =>
        `${p.name}: ₹${p.price} (${p.category}) - ${p.description}`
    ).join('\n');

    const fullPrompt = `
    You are an AI shopping assistant for NAS Digital, a digital products store.
    Available products:
    ${productContext}

    User Question: ${userQuery}
    
    Instructions:
    - Be helpful and concise
    - Recommend specific products when relevant
    - Use product names exactly as listed
    - Mention prices in ₹ (Indian Rupees)
    - Keep responses under 100 words
    `;

    return callGeminiAPI(fullPrompt);
};

// AI Explain Product - Explains product in simple terms (UNIQUE FEATURE)
export const explainProduct = async (product: Product): Promise<string> => {
    const prompt = `
    You are explaining a digital product to a potential buyer who is not tech-savvy.
    
    Product: ${product.name}
    Category: ${product.category}
    Price: ₹${product.price}
    Description: ${product.description}
    Tags: ${product.tags?.join(', ') || 'None'}
    
    Instructions:
    - Explain what this product is in very simple terms (like explaining to a 10-year-old)
    - List 3 key benefits in bullet points
    - Who should buy this? (target audience in one line)
    - Keep total response under 80 words
    - Be enthusiastic but honest
    `;

    return callGeminiAPI(prompt);
};

// AI Product Recommendations based on query
export const getProductRecommendations = async (userPreference: string): Promise<string> => {
    const productContext = MOCK_PRODUCTS.filter(p => p.isActive).map(p =>
        `${p.id}. ${p.name} (₹${p.price}) - ${p.category}: ${p.description.slice(0, 100)}...`
    ).join('\n');

    const prompt = `
    You are a product recommendation AI for NAS Digital store.
    
    User is looking for: ${userPreference}
    
    Available Products:
    ${productContext}
    
    Instructions:
    - Recommend 2-3 most relevant products
    - Explain why each is a good match (1 sentence each)
    - Format: "**Product Name** - reason"
    - Keep total response under 60 words
    `;

    return callGeminiAPI(prompt);
};

// AI-powered semantic search
export const semanticSearch = async (query: string): Promise<Product[]> => {
    const productContext = MOCK_PRODUCTS.filter(p => p.isActive).map(p =>
        `${p.id}: ${p.name} - ${p.category} - ${p.tags?.join(', ')}`
    ).join('\n');

    const prompt = `
    User search query: "${query}"
    
    Products:
    ${productContext}
    
    Return ONLY the product IDs (comma-separated) that best match the query.
    Order by relevance. Return at most 5 IDs.
    Example response: "1, 5, 3"
    `;

    try {
        const result = await callGeminiAPI(prompt);
        const ids = result.split(',').map(id => id.trim());
        return MOCK_PRODUCTS.filter(p => ids.includes(p.id) && p.isActive);
    } catch {
        // Fallback to simple string matching
        return MOCK_PRODUCTS.filter(p =>
            p.isActive && (
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.description.toLowerCase().includes(query.toLowerCase()) ||
                p.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()))
            )
        );
    }
};

// Legacy functions kept for backward compatibility
export const summarizeProduct = async (productName: string, description: string) => {
    const product = MOCK_PRODUCTS.find(p => p.name === productName);
    if (product) {
        return explainProduct(product);
    }

    const prompt = `Summarize this product in 2-3 bullet points: ${productName} - ${description}`;
    return callGeminiAPI(prompt);
};

export const analyzeReviews = async (reviews: string[]) => {
    const prompt = `
    Analyze these customer reviews and provide:
    1. Overall sentiment (Positive/Mixed/Negative)
    2. Key highlights (2 points)
    3. Any concerns (1 point)
    Keep it under 50 words.
    
    Reviews:
    ${reviews.join('\n')}
    `;

    return callGeminiAPI(prompt);
};