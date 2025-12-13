import { MOCK_PRODUCTS } from "../data/mock";

const API_URL = "https://wild-block-3a24.khannaseem1704.workers.dev";

export const getShoppingAssistantResponse = async (userQuery: string, _cartContext?: string) => {
    try {
        const productContext = MOCK_PRODUCTS.map(p =>
            `${p.name}: ₹${p.price} (${p.category}) - ${p.description}`
        ).join('\n');

        const fullPrompt = `
        You are an AI shopping assistant.
        Here is the product list:
        ${productContext}

        User Question: ${userQuery}
        Answer concisely.
        `;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: fullPrompt })
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

export const summarizeProduct = async (_productName: string, _description: string) => {
    return "Summary feature currently unavailable.";
}

export const analyzeReviews = async (_reviews: string[]) => {
    return "Analysis feature currently unavailable.";
}