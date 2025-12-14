import { AlertTriangle, CheckCircle, XCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Returns() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                    Returns & Refunds
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                    Our policy for digital product purchases
                </p>
            </div>

            {/* Important Notice */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-4">
                    <AlertTriangle className="text-amber-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                        <h3 className="font-bold text-amber-800 dark:text-amber-400 mb-2">Important Notice</h3>
                        <p className="text-amber-700 dark:text-amber-300">
                            Due to the nature of digital products, all sales are generally final once the product has been downloaded.
                            Please review product descriptions carefully before purchasing.
                        </p>
                    </div>
                </div>
            </div>

            {/* Refund Eligibility */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="text-green-600" size={24} />
                        <h3 className="text-xl font-bold text-green-800 dark:text-green-400">Eligible for Refund</h3>
                    </div>
                    <ul className="space-y-3 text-green-700 dark:text-green-300">
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            Product not as described
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            Technical issues preventing download
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            Duplicate purchase by mistake
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            Corrupted or damaged files
                        </li>
                    </ul>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-3 mb-4">
                        <XCircle className="text-red-600" size={24} />
                        <h3 className="text-xl font-bold text-red-800 dark:text-red-400">Not Eligible</h3>
                    </div>
                    <ul className="space-y-3 text-red-700 dark:text-red-300">
                        <li className="flex items-start gap-2">
                            <span className="text-red-600 mt-1">✗</span>
                            "Changed my mind" after download
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-red-600 mt-1">✗</span>
                            Difficulty level too high/low
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-red-600 mt-1">✗</span>
                            Already consumed content (courses)
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-red-600 mt-1">✗</span>
                            Request after 7 days
                        </li>
                    </ul>
                </div>
            </div>

            {/* Refund Process */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 mb-12">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Refund Process</h2>
                <ol className="space-y-4">
                    {[
                        { step: 1, title: "Submit Request", desc: "Contact us within 7 days of purchase with your order ID and reason for refund." },
                        { step: 2, title: "Review", desc: "Our team will review your request within 2-3 business days." },
                        { step: 3, title: "Resolution", desc: "If approved, refund will be processed to original payment method within 5-7 business days." }
                    ].map(item => (
                        <li key={item.step} className="flex gap-4">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                {item.step}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                                <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>

            {/* Contact */}
            <div className="text-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8">
                <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Need a Refund?</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Contact our support team with your order details and we'll help you out.
                </p>
                <Link
                    to="/contact"
                    className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                >
                    Contact Support
                </Link>
            </div>
        </div>
    );
}
