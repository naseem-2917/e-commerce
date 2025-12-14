import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, loginWithGoogle, resetPassword } from '../services/auth';
import { Mail, Lock, AlertCircle, Eye, EyeOff, Sparkles, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmailSent, setResetEmailSent] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const { error: loginError } = await loginUser(email, password);
        if (loginError) {
            setError('Invalid email or password. Please try again.');
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
            setError('Failed to sign in with Google.');
        } else {
            navigate('/');
        }
        setLoading(false);
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter your email address.');
            return;
        }
        setLoading(true);
        setError('');
        const { error: resetError } = await resetPassword(email);
        if (resetError) {
            setError('Failed to send reset email. Check your email address.');
        } else {
            setResetEmailSent(true);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
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
                    <AnimatePresence mode="wait">
                        {showForgotPassword ? (
                            <motion.div
                                key="forgot"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <button
                                    onClick={() => { setShowForgotPassword(false); setResetEmailSent(false); setError(''); }}
                                    className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors"
                                >
                                    <ArrowLeft size={18} /> Back to login
                                </button>

                                {resetEmailSent ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle size={32} className="text-green-600" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Check your email</h2>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            We've sent a password reset link to <strong>{email}</strong>
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Forgot password?</h2>
                                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                                            No worries, we'll send you reset instructions.
                                        </p>

                                        {error && (
                                            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl mb-4 flex items-center gap-2 text-sm">
                                                <AlertCircle size={16} />
                                                {error}
                                            </div>
                                        )}

                                        <form onSubmit={handleForgotPassword} className="space-y-4">
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

                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                            >
                                                {loading ? (
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    'Send Reset Link'
                                                )}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="login"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                            >
                                <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">Welcome back</h2>
                                <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Sign in to your account</p>

                                {error && (
                                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl mb-4 flex items-center gap-2 text-sm">
                                        <AlertCircle size={16} />
                                        {error}
                                    </div>
                                )}

                                {/* Google Login */}
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

                                <form onSubmit={handleLogin} className="space-y-4">
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
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                                            <button
                                                type="button"
                                                onClick={() => setShowForgotPassword(true)}
                                                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                            >
                                                Forgot password?
                                            </button>
                                        </div>
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
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            'Sign In'
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <p className="mt-6 text-center text-slate-400 text-sm">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium">
                        Create account
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
