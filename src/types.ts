export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    screenshots?: string[];      // Product preview screenshots
    downloadUrl: string;         // Secure download URL
    isActive: boolean;           // Admin toggle for visibility
    tags?: string[];
}

export interface CartItem extends Product {
    quantity: number;
}

export interface OrderItem {
    productId: string;
    productName: string;
    price: number;
    downloadUrl: string;
}

export interface Order {
    id: string;
    userId: string;
    userEmail: string;
    items: OrderItem[];
    total: number;
    couponCode?: string;
    discount: number;
    status: 'completed' | 'pending';
    createdAt: Date;
}

export interface Coupon {
    code: string;
    discountPercent: number;
    isActive: boolean;
}

export interface UserProfile {
    uid: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
}
