export default {
    async fetch(request, env, ctx) {
        // Handle CORS preflight
        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
                },
            });
        }

        if (request.method !== "POST") {
            return new Response("Method Not Allowed", { status: 405 });
        }

        try {
            const url = new URL(request.url);
            const { query, productContext, cartContext } = await request.json();
            const apiKey = env.GEMINI_API_KEY;

            if (!apiKey) {
                return new Response("Configuration Error: Missing API Key", { status: 500 });
            }

            // Determine prompt based on endpoint or payload
            // Simple path-based routing
            let systemPrompt = "";
            if (url.pathname.endsWith("/chat")) {
                systemPrompt = `
            You are an expert AI Shopping Assistant for a tech and lifestyle e-commerce store.
            
            Product Catalog Context:
            ${productContext || 'No specific products loaded.'}

            User Cart: ${cartContext || 'Empty'}

            User Query: "${query}"

            Instructions:
            - Act as a helpful sales associate.
            - Recommend products from the catalog if relevant.
            - Be concise and friendly.
            - Format output with Markdown (bold names).
        `;
            } else if (url.pathname.endsWith("/summarize")) {
                // Handle explicit summary payload if needed, or re-use structure
                // For simplicity in this example, we keep the chat structure main or allow generic prompting
                return new Response("Endpoint not implemented in this demo", { status: 404 });
            } else {
                // Default generic handler
                systemPrompt = query;
            }

            // Call Gemini REST API
            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

            const geminiResponse = await fetch(geminiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: systemPrompt }]
                    }]
                })
            });

            if (!geminiResponse.ok) {
                const errorText = await geminiResponse.text();
                console.error("Gemini API Error:", errorText);
                return new Response(`Gemini API Error: ${geminiResponse.status}`, { status: 500 });
            }

            const data = await geminiResponse.json();
            const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

            return new Response(JSON.stringify({ text: generatedText }), {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*", // Allow all origins for simplicity (or configure specific)
                },
            });

        } catch (error) {
            console.error("Worker Error:", error);
            return new Response(JSON.stringify({ error: "Internal Server Error" }), {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });
        }
    },
};
