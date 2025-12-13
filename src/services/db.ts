import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    doc,

    updateDoc
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Example: Add a new product to Firestore
 */
export const addProduct = async (productData: any) => {
    try {
        const docRef = await addDoc(collection(db, 'products'), productData);
        return { id: docRef.id, ...productData };
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
};

/**
 * Example: Get all products
 */
export const getProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Example: Get user's orders
 */
export const getUserOrders = async (userId: string) => {
    const q = query(collection(db, 'orders'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Example: Update user role (Admin only)
 */
export const updateUserRole = async (uid: string, newRole: 'user' | 'admin') => {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
        role: newRole
    });
};
