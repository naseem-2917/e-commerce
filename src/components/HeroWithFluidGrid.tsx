import { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import clsx from 'clsx';

// Grid configuration
const GRID_COLS = 20;
const GRID_ROWS = 12;
const CELL_SIZE = 60;

interface GridCellProps {
    isActive: boolean;
    theme: string;
}

function GridCell({ isActive, theme }: GridCellProps) {
    return (
        <motion.div
            className={clsx(
                'border transition-all duration-300',
                theme === 'dark'
                    ? 'border-slate-800/50'
                    : 'border-slate-200/50',
                isActive && theme === 'dark' && 'border-cyan-500/60 bg-cyan-500/5 scale-105',
                isActive && theme !== 'dark' && 'border-purple-400/60 bg-purple-400/5 scale-105'
            )}
            style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
            }}
            animate={{
                opacity: isActive ? 1 : 0.3,
            }}
            transition={{ duration: 0.2 }}
        />
    );
}

export default function HeroWithFluidGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const { user } = useAuth();
    const [activeCells, setActiveCells] = useState<Set<number>>(new Set());

    // Mouse position motion values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for fluid movement
    const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    // Secondary blob with more lag
    const springConfigSlow = { damping: 35, stiffness: 80, mass: 0.8 };
    const cursorX2 = useSpring(mouseX, springConfigSlow);
    const cursorY2 = useSpring(mouseY, springConfigSlow);

    // Tertiary blob with even more lag
    const springConfigSlowest = { damping: 45, stiffness: 50, mass: 1.2 };
    const cursorX3 = useSpring(mouseX, springConfigSlowest);
    const cursorY3 = useSpring(mouseY, springConfigSlowest);

    // Scale effect based on velocity
    const scale = useTransform(
        [cursorX, cursorY],
        ([x, y]) => {
            const velocity = Math.sqrt(
                Math.pow(Number(x) - mouseX.get(), 2) +
                Math.pow(Number(y) - mouseY.get(), 2)
            );
            return 1 + Math.min(velocity * 0.001, 0.3);
        }
    );

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            // Fix: Use correct offset calculation
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            mouseX.set(x);
            mouseY.set(y);

            // Calculate which grid cells are near the cursor
            const gridStartX = (rect.width - GRID_COLS * CELL_SIZE) / 2;
            const gridStartY = (rect.height - GRID_ROWS * CELL_SIZE) / 2;

            const cellX = Math.floor((x - gridStartX) / CELL_SIZE);
            const cellY = Math.floor((y - gridStartY) / CELL_SIZE);

            const newActiveCells = new Set<number>();

            // Activate cells in a radius around cursor
            for (let dx = -2; dx <= 2; dx++) {
                for (let dy = -2; dy <= 2; dy++) {
                    const nx = cellX + dx;
                    const ny = cellY + dy;
                    if (nx >= 0 && nx < GRID_COLS && ny >= 0 && ny < GRID_ROWS) {
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance <= 2.5) {
                            newActiveCells.add(ny * GRID_COLS + nx);
                        }
                    }
                }
            }

            setActiveCells(newActiveCells);
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, [mouseX, mouseY]);

    return (
        <section
            ref={containerRef}
            className={clsx(
                'relative min-h-[90vh] flex items-center justify-center overflow-hidden transition-colors',
                theme === 'dark'
                    ? 'bg-slate-950'
                    : 'bg-slate-50'
            )}
        >
            {/* Interactive Grid Background */}
            <div
                className="absolute inset-0 flex flex-wrap justify-center items-center pointer-events-none"
                style={{
                    width: GRID_COLS * CELL_SIZE,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                {Array.from({ length: GRID_COLS * GRID_ROWS }).map((_, i) => (
                    <GridCell
                        key={i}
                        isActive={activeCells.has(i)}
                        theme={theme}
                    />
                ))}
            </div>

            {/* Fluid Gradient Blobs */}
            {/* Primary Blob */}
            <motion.div
                className="absolute pointer-events-none z-10"
                style={{
                    left: cursorX,
                    top: cursorY,
                    x: '-50%',
                    y: '-50%',
                    scale,
                }}
            >
                <div
                    className={clsx(
                        'w-[400px] h-[400px] rounded-full blur-[100px]',
                        theme === 'dark'
                            ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-60'
                            : 'bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-40'
                    )}
                />
            </motion.div>

            {/* Secondary Blob */}
            <motion.div
                className="absolute pointer-events-none z-10"
                style={{
                    left: cursorX2,
                    top: cursorY2,
                    x: '-50%',
                    y: '-50%',
                }}
            >
                <div
                    className={clsx(
                        'w-[300px] h-[300px] rounded-full blur-[80px]',
                        theme === 'dark'
                            ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 opacity-50'
                            : 'bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 opacity-30'
                    )}
                />
            </motion.div>

            {/* Tertiary Blob */}
            <motion.div
                className="absolute pointer-events-none z-10"
                style={{
                    left: cursorX3,
                    top: cursorY3,
                    x: '-50%',
                    y: '-50%',
                }}
            >
                <div
                    className={clsx(
                        'w-[200px] h-[200px] rounded-full blur-[60px]',
                        theme === 'dark'
                            ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 opacity-40'
                            : 'bg-gradient-to-r from-pink-300 via-rose-300 to-orange-300 opacity-25'
                    )}
                />
            </motion.div>

            {/* Hero Content */}
            <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={clsx(
                        'inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border mb-8',
                        theme === 'dark'
                            ? 'bg-white/5 border-white/10'
                            : 'bg-slate-900/5 border-slate-900/10'
                    )}
                >
                    <Sparkles size={16} className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'} />
                    <span className={clsx(
                        'text-sm font-medium',
                        theme === 'dark' ? 'text-white/80' : 'text-slate-700'
                    )}>
                        AI-Powered Digital Store
                    </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
                >
                    <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>
                        Welcome to
                    </span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        NAS Digital
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={clsx(
                        'text-lg md:text-xl max-w-2xl mx-auto mb-12',
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    )}
                >
                    Discover premium digital products — ebooks, courses, templates, and more with AI-powered recommendations.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 items-center justify-center"
                >
                    <Link
                        to="/shop"
                        className="group px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full font-bold transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 flex items-center gap-2"
                    >
                        Explore Products
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    {user ? (
                        <Link
                            to="/profile"
                            className={clsx(
                                'px-8 py-4 rounded-full font-bold border transition-all flex items-center gap-2',
                                theme === 'dark'
                                    ? 'bg-white/5 backdrop-blur-sm text-white border-white/20 hover:bg-white/10'
                                    : 'bg-slate-900/5 backdrop-blur-sm text-slate-900 border-slate-900/20 hover:bg-slate-900/10'
                            )}
                        >
                            <User size={20} />
                            My Profile
                        </Link>
                    ) : (
                        <Link
                            to="/signup"
                            className={clsx(
                                'px-8 py-4 rounded-full font-bold border transition-all flex items-center gap-2',
                                theme === 'dark'
                                    ? 'bg-white/5 backdrop-blur-sm text-white border-white/20 hover:bg-white/10'
                                    : 'bg-slate-900/5 backdrop-blur-sm text-slate-900 border-slate-900/20 hover:bg-slate-900/10'
                            )}
                        >
                            Create Account
                        </Link>
                    )}
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-16 flex items-center justify-center gap-8 md:gap-16"
                >
                    {[
                        { value: '1000+', label: 'Products' },
                        { value: '50K+', label: 'Downloads' },
                        { value: '4.9', label: 'Rating' },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className={clsx(
                                'text-2xl md:text-3xl font-bold',
                                theme === 'dark' ? 'text-white' : 'text-slate-900'
                            )}>
                                {stat.value}
                            </div>
                            <div className={clsx(
                                'text-sm',
                                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                            )}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className={clsx(
                'absolute bottom-0 left-0 right-0 h-32 pointer-events-none',
                theme === 'dark'
                    ? 'bg-gradient-to-t from-slate-950 to-transparent'
                    : 'bg-gradient-to-t from-slate-50 to-transparent'
            )} />
        </section>
    );
}
