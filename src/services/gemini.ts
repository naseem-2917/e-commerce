import { MOCK_PRODUCTS } from "../data/mock";

// Use environment variable for API URL (Local Node or Cloudflare Worker)
const API_Base = import.meta.env.VITE_AI_API_URL || 'http://localhost:3001/api';

export const getShoppingAssistantResponse = async (userQuery: string, cartContext?: string) => {
    try {
        const productContext = MOCK_PRODUCTS.map(p =>
            `${p.name}: $${p.price} (${p.category}) - ${p.description}. Tags: ${p.tags?.join(', ')}`
        ).join('\n');

        // Cloudflare Worker expects POST to /ai/chat or similar.
        // Our worker routing logic currently handles /chat suffix or root.
        // If using the worker directly mapped to a domain, adjust path.
        const endpoint = API_Base.includes('workers.dev') ? API_Base : `${API_Base}/chat`;

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: userQuery,
                productContext,
                cartContext
            })
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.text;
    } catch (error) {
        console.error("Error calling AI Service:", error);
        return "I'm having trouble connecting to my brain right now.";
    }
};

export const summarizeProduct = async (_productName: string, _description: string) => {
    // Note: If using the simplified worker I created, it might mock this or need expansion.
    // For now assuming the Node server is primary or Worker is expanded later.
    return "Summary feature requires backend update.";
}

export const analyzeReviews = async (_reviews: string[]) => {
    return "Analysis feature requires backend update.";
}
