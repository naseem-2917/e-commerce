import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDO1bBIhW0TSvK330LVIIlzQ2nZw2jNXVY",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "e-commerce-83dcc.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "e-commerce-83dcc",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "e-commerce-83dcc.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "281686513278",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:281686513278:web:d5e21897896e1a715aea2f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
