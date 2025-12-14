import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, loginWithGoogle } from '../services/auth';
import { Mail, Lock, User, AlertCircle, Eye, EyeOff, Sparkles, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const passwordStrength = () => {
        if (password.length === 0) return { text: '', color: '' };
        if (password.length < 6) return { text: 'Too short', color: 'text-red-500' };
        if (password.length < 8) return { text: 'Weak', color: 'text-amber-500' };
        if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)) return { text: 'Strong', color: 'text-green-500' };
        return { text: 'Medium', color: 'text-amber-500' };
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        setLoading(true);
        setError('');
        const { error } = await registerUser(name, email, password);

        if (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('This email is already registered. Try logging in.');
            } else {
                setError('Failed to create account. Please try again.');
            }
        } else {
            navigate('/');
        }
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        const { error: googleLoginError } = await loginWithGoogle();
        if (googleLoginError) {
            setError('Failed to sign up with Google.');
        } else {
            navigate('/');
        }
        setLoading(false);
    };

    const strength = passwordStrength();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative max-w-md w-full"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Sparkles size={24} className="text-white" />
                        </div>
                        <span className="text-3xl font-bold text-white">NAS</span>
                    </Link>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-800">
                    <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">Create account</h2>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Join NAS and start shopping</p>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl mb-4 flex items-center gap-2 text-sm">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    {/* Google Signup */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-3 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-3 mb-6"
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                        Continue with Google
                    </button>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-slate-700" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white dark:bg-slate-900 text-slate-500">or continue with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="w-full pl-12 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {password && (
                                <p className={`text-xs mt-1 ${strength.color}`}>{strength.text}</p>
                            )}
                        </div>

                        <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span>By signing up, you agree to our Terms of Service and Privacy Policy</span>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-center text-slate-400 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                        Sign in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
