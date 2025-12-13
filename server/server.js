import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// 1. Chat Endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { query, productContext, cartContext } = req.body;

        const prompt = `
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

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ text });
    } catch (error) {
        console.error('Chat Error:', error);
        res.status(500).json({ error: 'Failed to generate chat response' });
    }
});

// 2. Product Summary Endpoint
app.post('/api/summarize', async (req, res) => {
    try {
        const { productName, description } = req.body;

        const prompt = `
            Summarize the product "${productName}" into 3 short, punchy bullet points highlighting key benefits.
            
            Description: ${description}
            
            Format:
            • Point 1
            • Point 2
            • Point 3
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ text });
    } catch (error) {
        console.error('Summary Error:', error);
        res.status(500).json({ error: 'Failed to generate summary' });
    }
});

// 3. Review Analysis Endpoint
app.post('/api/analyze-reviews', async (req, res) => {
    try {
        const { reviews } = req.body;

        const prompt = `
            Analyze these customer reviews. Provide a sentiment summary and list Pros/Cons.
            
            Reviews:
            ${reviews.join('\n')}
            
            Format:
            **Sentiment:** Positive/Mixed/Negative
            **Pros:** ...
            **Cons:** ...
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ text });
    } catch (error) {
        console.error('Analysis Error:', error);
        res.status(500).json({ error: 'Failed to analyze reviews' });
    }
});

app.listen(port, () => {
    console.log(`AI Server running at http://localhost:${port}`);
});
