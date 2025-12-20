import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Metatags from '@/SEO/metatags';

// Import images
import img1 from '@/assets/pdfworks/image.png';
import img2 from '@/assets/pdfworks/image copy.png';
import img3 from '@/assets/pdfworks/image copy 2.png';
import img4 from '@/assets/pdfworks/image copy 3.png';
import img5 from '@/assets/pdfworks/image copy 4.png';
import img6 from '@/assets/pdfworks/pdfworks.png';

const PDFWorks = () => {
    const meta = {
        title: "PDF-Works: The Ultimate PDF Solution",
        description: "Transform, Secure, and Optimize your documents with our all-in-one PDF power toolkit. No installation required.",
        url: window.location.href,
        image: "/logo.png"
    };

    const carouselImages = [img1, img2, img3, img4, img5, img6];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
        }, 10000); // 10 seconds

        return () => clearInterval(interval);
    }, [carouselImages.length]);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const features = [
        {
            title: "Smart Conversion Hub",
            desc: "Stop worrying about file compatibility. Our high-fidelity conversion engine preserves your layouts, fonts, and images.",
            subFeatures: ["Document to PDF (Word, Excel, PPT)", "Image to PDF (JPG, PNG)", "PDF to Image"]
        },
        {
            title: "Advanced OCR",
            desc: "Unlock the text inside your images and scans using intelligent extraction and handwriting recognition.",
            subFeatures: ["Multi-Language Support (30+)", "Intelligent Layout Extraction", "Handwriting Recognition"]
        },
        {
            title: "Professional PDF Editor",
            desc: "Edit PDFs as easily as Word documents. Modify text, fix typos, or update numbers directly on the PDF.",
            subFeatures: ["Text Editing", "Structure Control (Rearrange/Rotate)", "Batch Processing"]
        },
        {
            title: "Enterprise-Grade Security",
            desc: "Protect your sensitive data with state-of-the-art security features covering encryption and access control.",
            subFeatures: ["AES-256 Encryption", "2FA Protection", "Access Control & Watermarking"]
        },
        {
            title: "Optimization & Organization",
            desc: "Keep your digital workspace clean. Merge multiple PDFs, split documents, or compress files without quality loss.",
            subFeatures: ["Merge & Split", "Compress & Optimize", "Code Minifier for Developers"]
        }
    ];

    return (
        <div className="min-h-screen bg-[#0d1933] text-gray-200 pt-20 font-sans">
            <Metatags metaProps={meta} />

            {/* Header / Hero */}
            <section className="relative py-24 px-4 overflow-hidden">
                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* <Link to="/products" className="inline-flex items-center text-gray-400 hover:text-white mb-10 transition-colors text-sm font-medium tracking-wide">
                        <ArrowLeft className="w-4 h-4 mr-2" /> BACK TO PRODUCTS
                    </Link> */}
                    <div className="text-center max-w-5xl mx-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-white leading-tight"
                        >
                            The Ultimate PDF Solution
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl text-gray-400 mb-10 leading-relaxed max-w-3xl mx-auto font-light"
                        >
                            Transform, Secure, and Optimize your documents with our all-in-one PDF power toolkit.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                        >
                            <a href="https://pdfworks.in" target="_blank" rel="noopener noreferrer">
                                <Button size="lg" className="bg-white text-[#0d1933] hover:bg-gray-100 rounded-none px-10 py-7 text-lg shadow-xl transition-all font-semibold uppercase tracking-wider">
                                    Start Editing Now <ExternalLink className="ml-2 w-4 h-4" />
                                </Button>
                            </a>
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-none px-10 py-7 text-lg border-white/20 text-white hover:bg-white/5 uppercase tracking-wider font-semibold"
                                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                            >
                                Explore Features
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Product Overview - WHITE BACKGROUND */}
            <section className="py-20 px-4 bg-white text-[#0d1933]">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-semibold mb-6 uppercase tracking-widest opacity-80 text-[#0d1933]">Overview</h2>
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
                            PDF-Works is a comprehensive web-based platform designed to simplify every aspect of document management. Whether you need to digitize paper documents with AI-powered OCR, secure sensitive contracts with advanced encryption, or simply convert formats for compatibility, PDF-Works offers a professional-grade suite of tools in a user-friendly interface.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Image Carousel Section */}
            <section className="py-20 px-4 bg-[#0d1933] relative overflow-hidden">
                <div className="max-w-6xl mx-auto relative group">
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                        <AnimatePresence mode='wait'>
                            <motion.img
                                key={currentImageIndex}
                                src={carouselImages[currentImageIndex]}
                                alt={`Feature preview ${currentImageIndex + 1}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full object-contain"
                            />
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                            {carouselImages.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features Grid */}
            <section id="features" className="py-24 px-4 bg-[#0d1933] text-left">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Key Features & Tools</h2>
                        <p className="text-xl text-gray-400 font-light max-w-2xl">Everything you need to handle your documents professionally, available directly in your browser.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={itemVariants}
                                className="group"
                            >
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gray-200 transition-colors">{feature.title}</h3>
                                <p className="text-gray-400 mb-6 text-base leading-relaxed">{feature.desc}</p>
                                <ul className="space-y-3">
                                    {feature.subFeatures.map((sub, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-gray-500 font-medium">
                                            <span className="w-1 h-1 bg-gray-500 mr-3 shrink-0"></span>
                                            {sub}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works - WHITE BACKGROUND */}
            <section className="py-24 px-4 bg-white text-[#0d1933]">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0d1933]">How It Works</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) - Minimal */}
                        <div className="hidden md:block absolute top-[2rem] left-[0] right-[0] h-px bg-gray-200"></div>

                        {[
                            { title: "Select Your Tool", desc: "Choose from our organized dashboard of tools." },
                            { title: "Upload & Process", desc: "Drag and drop your files. Our server handles the heavy lifting." },
                            { title: "Download & Share", desc: "Get your processed file instantly." }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative z-10 pt-8"
                            >
                                <div className="absolute top-0 left-0 md:left-0 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#0d1933] rounded-full"></div>
                                <div className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-widest">Step 0{i + 1}</div>
                                <h3 className="text-xl font-bold text-[#0d1933] mb-3">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm max-w-xs">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="py-24 px-4 bg-[#0d1933]">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">Why Choose PDF-Works?</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {[
                            { title: "No Installation", desc: "Works entirely in your browser. Access from anywhere." },
                            { title: "Privacy First", desc: "Files are processed securely and deleted automatically." },
                            { title: "User Accounts", desc: "Track your history, manage files, and access premium features." }
                        ].map((item, i) => (
                            <div key={i} className="p-8 border border-white/5 bg-white/[0.02] transition-colors hover:bg-white/[0.05]">
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-32 px-4 bg-[#0d1933] border-t border-white/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to simplify your workflow?</h2>
                    <a href="https://pdfworks.in" target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="bg-white text-[#0d1933] hover:bg-gray-200 rounded-none px-12 py-8 text-lg font-bold shadow-2xl uppercase tracking-wider">
                            Get Started for Free
                        </Button>
                    </a>
                </div>
            </section>
        </div>
    );
};

export default PDFWorks;
