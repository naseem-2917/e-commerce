import { NavLink, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function BottomNavigation() {
    const { items } = useCart();
    const { user } = useAuth();
    const location = useLocation();
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    // Hide on login/signup pages
    if (location.pathname === '/login' || location.pathname === '/signup') {
        return null;
    }

    const navItems = [
        { to: '/', icon: Home, label: 'Home' },
        { to: '/shop', icon: ShoppingBag, label: 'Products' },
        { to: '/cart', icon: ShoppingCart, label: 'Cart', badge: cartCount },
        { to: user ? '/orders' : '/login', icon: User, label: user ? 'Profile' : 'Login' },
    ];

    return (
        <motion.nav
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 z-50 md:hidden"
        >
            <div className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
                {navItems.map(({ to, icon: Icon, label, badge }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) => `
                            flex flex-col items-center justify-center flex-1 py-2 px-1 relative transition-colors
                            ${isActive
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }
                        `}
                    >
                        {({ isActive }) => (
                            <>
                                <div className="relative">
                                    <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                    {badge !== undefined && badge > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                                        >
                                            {badge > 9 ? '9+' : badge}
                                        </motion.span>
                                    )}
                                </div>
                                <span className={`text-[10px] mt-1 font-medium ${isActive ? 'font-semibold' : ''}`}>
                                    {label}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="bottomNavIndicator"
                                        className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                                    />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </motion.nav>
    );
}
