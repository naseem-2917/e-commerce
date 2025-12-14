import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Lightbulb, Search, ThumbsUp } from 'lucide-react';
import { getShoppingAssistantResponse } from '../services/gemini';
import { useCart } from '../context/CartContext';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    role: 'user' | 'ai';
    content: string;
}

const QUICK_ACTIONS = [
    { icon: Lightbulb, label: 'Best for me?', query: 'What product would you recommend for a beginner developer?' },
    { icon: Search, label: 'Find ebook', query: 'Show me ebooks for learning programming' },
    { icon: ThumbsUp, label: 'Top sellers', query: 'What are your top selling products?' },
];

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', content: 'Hi! 👋 I\'m your AI assistant for NAS Digital. I can help you find the perfect digital products. Ask me anything!' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const { items } = useCart();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (e?: React.FormEvent, customQuery?: string) => {
        e?.preventDefault();
        const query = customQuery || input.trim();
        if (!query) return;

        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: query }]);
        setLoading(true);

        // Context from cart
        const cartContext = items.map(i => i.name).join(', ');

        try {
            const response = await getShoppingAssistantResponse(query, cartContext);
            setMessages(prev => [...prev, { role: 'ai', content: response }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I encountered an error. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    const handleQuickAction = (query: string) => {
        handleSend(undefined, query);
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className={clsx(
                    "fixed bottom-20 md:bottom-6 right-4 md:right-6 p-4 rounded-full shadow-2xl z-40 transition-all duration-300",
                    isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100 bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                )}
            >
                <MessageSquare size={28} fill="currentColor" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500"></span>
                </span>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 w-[calc(100%-2rem)] md:w-96 h-[60vh] md:h-[500px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-slate-100 dark:border-slate-800"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <Sparkles size={18} className="text-yellow-300" />
                                </div>
                                <div>
                                    <h3 className="font-bold">AI Assistant</h3>
                                    <p className="text-xs text-white/70">NAS Digital</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full text-white/90 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={clsx("flex", msg.role === 'user' ? "justify-end" : "justify-start")}
                                >
                                    <div
                                        className={clsx(
                                            "max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed",
                                            msg.role === 'user'
                                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none"
                                                : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700 rounded-tl-none"
                                        )}
                                    >
                                        {/* Render simple markdown-like bolding */}
                                        {msg.content.split('**').map((part, i) =>
                                            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-1">
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions */}
                        {messages.length <= 2 && !loading && (
                            <div className="px-4 py-2 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                                <p className="text-xs text-slate-500 mb-2">Quick actions:</p>
                                <div className="flex flex-wrap gap-2">
                                    {QUICK_ACTIONS.map((action, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleQuickAction(action.query)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium transition-colors"
                                        >
                                            <action.icon size={12} />
                                            {action.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Ask about products..."
                                className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-full px-4 py-2.5 focus:ring-2 focus:ring-purple-500/30 focus:bg-white dark:focus:bg-slate-700 transition-all text-sm outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <button
                                type="submit"
                                disabled={loading || !input.trim()}
                                className="p-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
