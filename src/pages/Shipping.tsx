import { Download, Clock, Globe, Zap, Mail, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Shipping() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                    Delivery Information
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                    Everything you need to know about getting your digital products
                </p>
            </div>

            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 mb-12 text-center text-white">
                <Zap className="w-16 h-16 mx-auto mb-4 opacity-90" />
                <h2 className="text-2xl font-bold mb-2">Instant Digital Delivery</h2>
                <p className="text-green-100 text-lg">
                    All our products are digital downloads — no waiting, no shipping costs!
                </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                        <Download className="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Instant Access</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        Download your products immediately after payment confirmation. No delays.
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                        <Clock className="text-purple-600 dark:text-purple-400" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">24/7 Availability</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        Access your downloads anytime from your Orders page. Available around the clock.
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                        <Globe className="text-green-600 dark:text-green-400" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Worldwide Access</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        Download from anywhere in the world. No geographic restrictions.
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mb-4">
                        <Mail className="text-amber-600 dark:text-amber-400" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Email Confirmation</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        Receive order confirmation with download links directly to your email.
                    </p>
                </div>
            </div>

            {/* How it works */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">How It Works</h2>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {[
                        { step: 1, title: "Purchase", desc: "Complete secure checkout" },
                        { step: 2, title: "Confirmation", desc: "Receive email confirmation" },
                        { step: 3, title: "Download", desc: "Access from Orders page" },
                        { step: 4, title: "Enjoy", desc: "Use your product!" }
                    ].map((item) => (
                        <div key={item.step} className="text-center flex-1">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                                {item.step}
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Help */}
            <div className="text-center">
                <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Need Help?</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Having trouble with your download? Our support team is here to help.
                </p>
                <Link to="/contact" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                    Contact Support →
                </Link>
            </div>
        </div>
    );
}
