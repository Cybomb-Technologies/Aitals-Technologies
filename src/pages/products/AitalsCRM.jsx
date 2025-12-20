import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Metatags from '@/SEO/metatags';

const AitalsCRM = () => {
    const meta = {
        title: "Aitals CRM - CloudCRM Solution",
        description: "Streamline business operations from lead acquisition to post-sales support with our comprehensive CRM.",
        url: window.location.href,
        image: "/logo.png"
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
            title: "Executive Dashboard",
            desc: "The command center for users, offering immediate insights upon login.",
            subFeatures: ["Real-time KPI Cards & Revenue Trends", "Pipeline Distribution Charts", "Upcoming Activities Timeline"]
        },
        {
            title: "Sales Suite (EMP Module)",
            desc: "A robust set of tools for the modern sales force.",
            subFeatures: ["Leads, Contacts & Deals Management", "Campaigns & Sales Forecasts", "Centralized Document Repository"]
        },
        {
            title: "Workflow Automation Engine",
            desc: "A 'No-Code' visual builder empowering users to endlessly customize their process.",
            subFeatures: ["Visual Trigger-Action Logic", "Automated Email & Task Assignment", "Field Updates on Specific Events"]
        },
        {
            title: "Vendor Management System",
            desc: "A dedicated module for procurement and supplier relations.",
            subFeatures: ["Searchable Vendor Directory", "Performance Rating & Metrics", "Quick Actions (Call/Email)"]
        },
        {
            title: "Support Ticketing",
            desc: "A structured environment for handling customer queries effectively.",
            subFeatures: ["Ticket Tracking & Status Management", "Priority Flags (High/Med/Low)", "Contextual History & Actions"]
        },
        {
            title: "Analytics & Reporting",
            desc: "Granular deep-dives beyond the main dashboard.",
            subFeatures: ["Lead Analytics", "Marketing Performance Metrics", "Sales Trend Analysis"]
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
                            Intelligent CloudCRM
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl text-gray-400 mb-10 leading-relaxed max-w-3xl mx-auto font-light"
                        >
                            Streamline your business operations, from lead acquisition to post-sales support and vendor management.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                        >
                            <Button size="lg" className="bg-white text-[#0d1933] hover:bg-gray-100 rounded-none px-10 py-7 text-lg shadow-xl transition-all font-semibold uppercase tracking-wider">
                                Start Free Trial <ExternalLink className="ml-2 w-4 h-4" />
                            </Button>
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
                            CloudCRM is a comprehensive solution designed to unify your business processes. It integrates powerful automation with intuitive data visualization to provide a 360-degree view of your sales, support, and vendor relationships. With role-based access and modular routing, it adapts perfectly to your organization's structure.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Placeholder for Carousel (Hidden for now) */}
            {/* 
            <section className="py-20 px-4 bg-[#0d1933] relative overflow-hidden">
                <div className="max-w-6xl mx-auto relative group">
                     <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                        ...
                     </div>
                </div>
            </section> 
            */}

            {/* Key Features Grid - DARK BACKGROUND */}
            <section id="features" className="py-24 px-4 bg-[#0d1933] text-left">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Key Features</h2>
                        <p className="text-xl text-gray-400 font-light max-w-2xl">Everything you need to manage your business relationships in one place.</p>
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
                            { title: "Data Ingestion", desc: "New leads and contacts enter automatically via integrations or manual entry." },
                            { title: "Process & Automation", desc: "Sales moves deals through stages while the Workflow Engine handles repetitive tasks." },
                            { title: "Insights & Action", desc: "Real-time dashboards provide visibility into revenue and upcoming tasks." }
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

            {/* Why CloudCRM - DARK BACKGROUND */}
            <section className="py-24 px-4 bg-[#0d1933]">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">Why Choose CloudCRM?</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {[
                            { title: "360-Degree Management", desc: "Complete lifecycle management for Leads, Accounts, Contacts, and Deals." },
                            { title: "Intelligent Automation", desc: "Visual workflow builder to automate repetitive tasks based on triggers." },
                            { title: "Integrated Support", desc: "Built-in ticketing system to manage customer inquiries seamlessly." }
                        ].map((item, i) => (
                            <div key={i} className="p-8 border border-white/5 bg-white/[0.02] transition-colors hover:bg-white/[0.05]">
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action - DARK BACKGROUND */}
            <section className="py-32 px-4 bg-[#0d1933] border-t border-white/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Take control of your customer relationships.</h2>
                    <Button size="lg" className="bg-white text-[#0d1933] hover:bg-gray-200 rounded-none px-12 py-8 text-lg font-bold shadow-2xl uppercase tracking-wider">
                        Get Started Today
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default AitalsCRM;
