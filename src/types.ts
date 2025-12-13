export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    stock: number;
    tags?: string[];
}

export interface CartItem extends Product {
    quantity: number;
}

export interface UserProfile {
    uid: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
}
