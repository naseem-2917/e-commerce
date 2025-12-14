import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface UserData {
    uid: string;
    email: string | null;
    displayName: string | null;
    role: 'user' | 'admin';
}

interface AuthContextType {
    user: UserData | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            try {
                if (firebaseUser) {
                    // Fetch additional user data from Firestore
                    const userDocRef = doc(db, 'users', firebaseUser.uid);
                    const userDoc = await getDoc(userDocRef);
                    const userData = userDoc.data();

                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        displayName: firebaseUser.displayName,
                        role: userData?.role || 'user', // Role comes from Firestore
                    });
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Auth Error:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        });

        // Safety timeout
        const timer = setTimeout(() => setLoading(false), 2000);

        return () => {
            unsubscribe();
            clearTimeout(timer);
        }
    }, []);

    const signOut = async () => {
        await firebaseSignOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
