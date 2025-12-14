import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MouseFollowerProps {
    color?: string;
}

export default function MouseFollower({ color = 'blue' }: MouseFollowerProps) {
    const [isVisible, setIsVisible] = useState(false);

    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [x, y, isVisible]);

    const colorClasses: Record<string, string> = {
        blue: 'from-blue-400/30 to-cyan-400/30 dark:from-blue-500/20 dark:to-cyan-500/20',
        purple: 'from-purple-400/30 to-pink-400/30 dark:from-purple-500/20 dark:to-pink-500/20',
        amber: 'from-amber-400/30 to-orange-400/30 dark:from-amber-500/20 dark:to-orange-500/20',
    };

    return (
        <motion.div
            className={`fixed pointer-events-none z-0 w-[500px] h-[500px] rounded-full bg-gradient-to-r ${colorClasses[color] || colorClasses.blue} blur-3xl opacity-0 transition-opacity duration-300`}
            style={{
                x,
                y,
                translateX: '-50%',
                translateY: '-50%',
                opacity: isVisible ? 1 : 0,
            }}
        />
    );
}
