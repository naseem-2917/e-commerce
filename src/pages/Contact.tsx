import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                    Contact Us
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                    Have questions? We'd love to hear from you.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Contact Info */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                            <Mail className="text-blue-600 dark:text-blue-400" size={24} />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-1">Email</h3>
                        <p className="text-slate-600 dark:text-slate-400">support@nasdigital.com</p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                            <Phone className="text-green-600 dark:text-green-400" size={24} />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-1">Phone</h3>
                        <p className="text-slate-600 dark:text-slate-400">+91 98765 43210</p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                            <MapPin className="text-purple-600 dark:text-purple-400" size={24} />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-1">Location</h3>
                        <p className="text-slate-600 dark:text-slate-400">Mumbai, India</p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mb-4">
                            <Clock className="text-amber-600 dark:text-amber-400" size={24} />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-1">Response Time</h3>
                        <p className="text-slate-600 dark:text-slate-400">Within 24 hours</p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3 mb-6">
                            <MessageSquare className="text-blue-600" size={24} />
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Send us a message</h2>
                        </div>

                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="text-green-600" size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                                        Thank you for contacting us. We'll get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white"
                                            placeholder="How can we help?"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white resize-none"
                                            placeholder="Tell us more about your inquiry..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Send size={18} /> Send Message
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
