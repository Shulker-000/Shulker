import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- SVG Icons (Self-contained for simplicity) ---
const User = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
const Mail = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>);
const MessageSquare = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>);
const Send = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>);
const CheckCircle = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>);
const LogoIcon = (props) => (<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" fill="url(#paint0_linear_contact)"/><path d="M24 10C16.268 10 10 16.268 10 24C10 31.732 16.268 38 24 38C31.732 38 38 31.732 38 24C38 16.268 31.732 10 24 10Z" stroke="white" strokeWidth="2"/><path d="M24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16Z" stroke="white" strokeWidth="2"/><defs><linearGradient id="paint0_linear_contact" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse"><stop stopColor="#4F46E5"/><stop offset="1" stopColor="#A259FF"/></linearGradient></defs></svg>);

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
        // Reset form and success message after a delay
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 4000);
    };

    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                {/* Left Column: Visual Side */}
                <div className="relative hidden lg:block">
                    <img
                        src="https://images.unsplash.com/photo-1553775282-20af8077976e?q=80&w=2592&auto=format&fit=crop"
                        alt="A person on a phone call in a modern office"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-800/60 to-transparent"></div>
                     <motion.div
                        className="absolute bottom-10 left-10 text-white p-4"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <h1 className="text-4xl font-bold leading-tight">Let's Connect.</h1>
                        <p className="mt-2 text-lg max-w-md text-indigo-100">Have a question or a project in mind? We're all ears.</p>
                    </motion.div>
                </div>

                {/* Right Column: Form Side */}
                <div className="flex flex-col justify-center items-center py-12 px-6 sm:px-12">
                    <motion.div
                        className="w-full max-w-md"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants} className="text-center lg:text-left mb-10">
                            <div className="flex justify-center lg:justify-start mb-4">
                                <LogoIcon />
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                                Get in Touch
                            </h2>
                            <p className="mt-2 text-lg text-gray-600">
                                We'd love to hear from you.
                            </p>
                        </motion.div>
                        
                        <div className="relative min-h-[480px]">
                            <AnimatePresence mode="wait">
                                {isSubmitted ? (
                                    <motion.div
                                        key="success"
                                        className="absolute inset-0 flex flex-col items-center justify-center text-center"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                    >
                                        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                                        <h3 className="text-2xl font-semibold text-gray-900">Message Sent!</h3>
                                        <p className="text-gray-600 mt-2">Thank you for reaching out. We'll get back to you soon.</p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                                <div className="relative"><User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="John Doe" /></div>
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                <div className="relative"><Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="you@company.com" /></div>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="How can we help?" />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                            <div className="relative"><MessageSquare className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" /><textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={5} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="Your message..."/></div>
                                        </div>
                                        <div className="pt-2">
                                            <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-base font-semibold shadow-lg hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 disabled:bg-indigo-400 disabled:cursor-not-allowed disabled:transform-none">
                                                {isSubmitting ? (<><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>Sending...</>) : (<>Send Message <Send className="ml-2 w-5 h-5" /></>)}
                                            </button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
