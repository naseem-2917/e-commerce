# 🛒 NAS Digital - AI-Powered Digital Products Store

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-10.8-FFCA28?logo=firebase)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)

> A modern AI-powered digital products marketplace built with React, Firebase, and Google Gemini AI.

## 🔗 Live Demo

**[🚀 Visit NAS Digital](https://e-commerce-83dcc.web.app/)**

---

## ✨ Features

### 🤖 AI-Powered Features
| Feature | Description |
|---------|-------------|
| **AI Product Explainer** | Click "🤖 Explain this Product" on any product page - AI explains the product in simple terms |
| **AI Shopping Assistant** | Floating chatbot with quick actions: "Best for me?", "Find ebook", "Top sellers" |
| **Smart Recommendations** | AI suggests products based on your preferences |

### 🛍️ E-commerce Features
| Feature | Description |
|---------|-------------|
| **Digital Products** | UI Kits, Courses, Ebooks, Templates, Software |
| **Instant Download** | Download purchased products immediately |
| **Coupon System** | Apply discount codes at checkout |
| **Order History** | View all purchases with download links |

### 🎨 Modern UI/UX
- Dark/Light mode toggle
- Mobile-first responsive design
- Bottom navigation for mobile
- Smooth animations (Framer Motion)
- Glassmorphism effects

### 🔐 Authentication
- Email/Password login & signup
- Google One-Click login
- Forgot Password (email reset)
- User Profile page

### 👨‍💼 Admin Panel
- Products management (Add/Edit/Delete)
- Orders view with customer details
- Coupons management (Create/Toggle/Delete)
- Secret code access: `nasadmin`

---

## 🏗️ Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, Framer Motion |
| Backend | Firebase (Auth, Firestore) |
| AI | Google Gemini API |
| Hosting | Firebase Hosting |

---

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ChatBot.tsx
│   ├── ProductCard.tsx
│   └── BottomNavigation.tsx
├── pages/            # Route pages
│   ├── Home.tsx
│   ├── Shop.tsx
│   ├── ProductDetails.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── Orders.tsx
│   ├── Profile.tsx
│   ├── Admin.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── FAQ.tsx
│   ├── Shipping.tsx
│   ├── Returns.tsx
│   └── Contact.tsx
├── context/          # React Context providers
├── services/         # Firebase & Gemini API
├── data/             # Mock data
└── types.ts          # TypeScript interfaces
```

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/naseem-2917/e-commerce.git
cd e-commerce

# Install
npm install

# Run
npm run dev
```

---

## 🔑 Test Credentials

### Admin Access
1. Login with any account
2. Go to `/admin`
3. Enter secret code: `nasadmin`

### Coupon Codes
| Code | Discount |
|------|----------|
| `SAVE10` | 10% off |
| `FIRST20` | 20% off |
| `HACKATHON50` | 50% off |

---

## 📱 Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero, categories, featured products |
| Products | `/shop` | All products with filters |
| Product Details | `/product/:id` | AI Explain, add to cart |
| Cart | `/cart` | View cart items |
| Checkout | `/checkout` | Apply coupon, payment |
| Orders | `/orders` | Download purchased products |
| Profile | `/profile` | User info, quick links |
| Admin | `/admin` | Manage products/coupons |
| FAQ | `/faq` | Common questions |
| Shipping | `/shipping` | Delivery info |
| Returns | `/returns` | Refund policy |
| Contact | `/contact` | Contact form |

---

## 🎯 Key Highlights

- ✅ **AI Integration** - Gemini-powered product explanations & chat
- ✅ **Mobile-First** - Bottom navigation, responsive design
- ✅ **Modern Auth** - Google login, password reset
- ✅ **Admin Panel** - Full product & coupon management
- ✅ **Dark Mode** - System-aware theme toggle

---

## 📄 License

MIT License - Free for personal and commercial use.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/naseem-2917">Naseem Khan</a>
</p>
