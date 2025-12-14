import { useState } from 'react';
import clsx from 'clsx';

interface AnimatedCardProps {
    children: React.ReactNode;
    className?: string;
}

export default function AnimatedCard({ children, className }: AnimatedCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={clsx('relative group', className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                transition: 'transform 0.3s ease',
            }}
        >
            {/* Animated Border Container */}
            <div
                className="absolute -inset-[1px] rounded-2xl overflow-hidden"
                style={{
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                }}
            >
                {/* Rotating Gradient Border */}
                <div
                    className="absolute inset-[-50%] w-[200%] h-[200%]"
                    style={{
                        background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #22c55e, #3b82f6)',
                        animation: isHovered ? 'border-spin 3s linear infinite' : 'none',
                    }}
                />
            </div>

            {/* Inner Background (covers the rotating gradient except border) */}
            <div className="absolute inset-[1px] rounded-[14px] bg-white dark:bg-slate-900" />

            {/* Card Content */}
            <div className="relative z-10 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 group-hover:border-transparent transition-colors bg-white dark:bg-slate-900">
                {children}
            </div>
        </div>
    );
}
