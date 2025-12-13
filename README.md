# 🛍️ AI-Powered E-commerce Platform

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

> A modern, full-stack e-commerce application featuring a smart AI Shopping Assistant, powered by Google Gemini, React, and Firebase.

## 🔗 Live Demo
**[🚀 View Live Demo](https://naseem-2917.github.io/e-commerce/)**  
*(Replace with your actual deployment URL)*

---

## ✨ Features

### 🛒 Core E-commerce
- **Product Discovery:** Clean grid layout with filtering and sorting.
- **Product Details:** Rich product pages with image galleries and specs.
- **Shopping Cart:** Persistent cart management using local storage.
- **Checkout Flow:** Simulated payment processing and order creation.
- **Admin Dashboard:** Manage products and track orders.

### 🤖 AI Integration (Gemini Pro)
- **💬 Smart Shopping Assistant:** A context-aware chatbot that helps users find products based on their needs (e.g., "Best laptop for coding").
- **📝 AI Product Summaries:** One-click generation of concise product highlights.
- **📊 Review Sentiment Analysis:** AI analyzes customer reviews to extract Pros/Cons and overall sentiment.
- **🔒 Secure Proxy:** AI requests are secured via a custom backend (Node.js or Cloudflare Worker) to protect API keys.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend (AI Proxy):** Node.js / Express OR Cloudflare Workers
- **Database & Auth:** Firebase Firestore & Authentication
- **AI Model:** Google Gemini Pro

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Firebase Project (with Auth & Firestore enabled)
- Google Gemini API Key

### 1. Frontend Setup

```bash
# Clone the repository
git clone https://github.com/naseem-2917/e-commerce.git
cd e-commerce

# Install dependencies
npm install

# Configure Environment
# Copy .env.example to .env and fill in your keys
cp .env.example .env

# Run Development Server
npm run dev
```

### 2. Backend Setup (Choose One)

You need a backend to securely proxy AI requests. Choose either the local Node server or Cloudflare Worker.

#### Option A: Local Node Server
```bash
cd server
npm install
npm start
# Server runs on http://localhost:3001
```

#### Option B: Cloudflare Worker (Production)
```bash
cd cloudflare-worker
npm install
wrangler secret put GEMINI_API_KEY # Enter your key
wrangler deploy
# Update VITE_AI_API_URL in frontend .env with your Worker URL
```

---

## 🔒 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_APP_ID=your_id

# AI Configuration
VITE_GEMINI_API_KEY=your_key (Dev only)
# VITE_AI_API_URL=http://localhost:3001/api (For Prod/Secure)
```

---

## 📸 Screenshots

| Shop Page | AI Assistant |
|-----------|--------------|
| ![Shop](https://via.placeholder.com/400x200?text=Shop+Page) | ![Chat](https://via.placeholder.com/400x200?text=AI+Chat) |

| Product Details | Admin Panel |
|----------------|-------------|
| ![Details](https://via.placeholder.com/400x200?text=Product+Details) | ![Admin](https://via.placeholder.com/400x200?text=Admin+Panel) |

---

## 🤝 Contribution

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.