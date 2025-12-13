import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

// Types
export interface AuthError {
    code: string;
    message: string;
}

/**
 * Sign up a new user with email and password
 * Creates a user document in Firestore with 'user' role
 */
export const registerUser = async (name: string, email: string, password: string) => {
    try {
        // 1. Create Auth User
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Update Profile Name
        await updateProfile(user, { displayName: name });

        // 3. Create Firestore Document
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            name,
            email,
            role: 'user', // Default role
            createdAt: new Date().toISOString(),
        });

        return { user, error: null };
    } catch (error: any) {
        return { user: null, error: error as AuthError };
    }
};

/**
 * Login with email and password
 */
export const loginUser = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { user: userCredential.user, error: null };
    } catch (error: any) {
        return { user: null, error: error as AuthError };
    }
};

/**
 * Login with Google
 * Creates Firestore document if it doesn't exist
 */
export const loginWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Check if user doc exists
        const userDoc = await getDoc(doc(db, 'users', user.uid));

        if (!userDoc.exists()) {
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                role: 'user',
                createdAt: new Date().toISOString(),
            });
        }

        return { user, error: null };
    } catch (error: any) {
        return { user: null, error: error as AuthError };
    }
};

/**
 * Log out current user
 */
export const logoutUser = async () => {
    try {
        await firebaseSignOut(auth);
        return { error: null };
    } catch (error: any) {
        return { error: error as AuthError };
    }
};
