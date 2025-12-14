import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "What are digital products?",
        answer: "Digital products are downloadable items like ebooks, online courses, design templates, software, and more. Once purchased, you get instant access to download them."
    },
    {
        question: "How do I download my purchased products?",
        answer: "After completing your purchase, go to the 'Orders' page in your account. You'll find download buttons next to each product you've purchased."
    },
    {
        question: "Can I get a refund?",
        answer: "Due to the nature of digital products, we generally don't offer refunds once the product has been downloaded. However, if you face technical issues, please contact our support team."
    },
    {
        question: "How do I use a coupon code?",
        answer: "During checkout, you'll see a 'Apply Coupon' section. Enter your coupon code and click 'Apply' to see the discount reflected in your total."
    },
    {
        question: "Are the products compatible with all devices?",
        answer: "Compatibility varies by product. Each product page lists the compatible formats and requirements. Most ebooks are in PDF format, courses include video files, and templates come in their native formats (Figma, Canva, etc.)."
    },
    {
        question: "How long do I have access to purchased products?",
        answer: "You get lifetime access to all products you purchase. Download them anytime from your Orders page."
    },
    {
        question: "Can I share my purchased products?",
        answer: "No, products are for personal use only. Sharing or redistributing purchased products is prohibited under our terms of service."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit/debit cards, UPI, and net banking through our secure payment gateway."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                    Frequently Asked Questions
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                    Find answers to common questions about our digital products
                </p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                            <span className="font-semibold text-slate-900 dark:text-white pr-4">
                                {faq.question}
                            </span>
                            {openIndex === index ? (
                                <ChevronUp size={20} className="text-blue-600 flex-shrink-0" />
                            ) : (
                                <ChevronDown size={20} className="text-slate-400 flex-shrink-0" />
                            )}
                        </button>
                        {openIndex === index && (
                            <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Still have questions */}
            <div className="mt-12 text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8">
                <MessageCircle className="w-12 h-12 text-white/80 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Still have questions?</h2>
                <p className="text-blue-100 mb-6">Can't find the answer you're looking for? Reach out to our support team.</p>
                <Link
                    to="/contact"
                    className="inline-block px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors"
                >
                    Contact Us
                </Link>
            </div>
        </div>
    );
}
