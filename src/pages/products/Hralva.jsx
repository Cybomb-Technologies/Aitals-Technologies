import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Metatags from '@/SEO/metatags';

// Import images
import img1 from '@/assets/hralva/image.png';
import img2 from '@/assets/hralva/admin-Role&PermissionSetting.png';
import img3 from '@/assets/hralva/admin-Securitysetting.png';
import img4 from '@/assets/hralva/admin-generalsetting.png';
import img5 from '@/assets/hralva/admin-localizationsetting.png';
import img6 from '@/assets/hralva/admin-payrollManagement.png';
import img7 from '@/assets/hralva/admin-payrollsetting.png';
import img8 from '@/assets/hralva/admin-teamdashboard.png';
import img9 from '@/assets/hralva/anmt-dashboard.png';
//import img10 from '@/assets/hralva/attendance.png';
import img11 from '@/assets/hralva/emp-attendanceAfterCheckin.png';
import img12 from '@/assets/hralva/emp-dashboard.png';
import img13 from '@/assets/hralva/emp-setting.png';
import img14 from '@/assets/hralva/hr-empViewTimesheetReport.png';
import img15 from '@/assets/hralva/hr-hrletterDashboard.png';
import img16 from '@/assets/hralva/hr-leave.png';
import img17 from '@/assets/hralva/onboarding-steps.png';
import img18 from '@/assets/hralva/org-dashboard.png';


const Hralva = () => {
    const meta = {
        title: "Hralva - Modern HR Management System",
        description: "Comprehensive HRMS solution for recruitment, payroll, and employee engagement.",
        url: window.location.href,
        image: "/logo.png"
    };

    const carouselImages = [img1, img9, img12, img6, img8, img18, img17, img14, img15, img16, img2, img3, img4, img5, img7, img11, img13];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Only set interval if there's more than one image
    useEffect(() => {
        if (carouselImages.length <= 1) return;

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

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const features = [
        {
            title: "Employee Management 360°",
            desc: "The heart of the system is a robust employee database that goes beyond simple record-keeping.",
            subFeatures: ["Comprehensive Profiles & Document Vault", "Role-Based Access Control", "Virtual Fields & Smart Calculations"]
        },
        {
            title: "Intelligent Payroll Engine",
            desc: "A fully automated payroll system designed for accuracy and compliance.",
            subFeatures: ["Multi-Country Support (50+)", "Automated Calculations & Digital Payslips", "Statutory Compliance & Analyics"]
        },
        {
            title: "Onboarding & Offboarding",
            desc: "Streamlines transitions to ensure a professional experience for joining and departing employees.",
            subFeatures: ["Automated Workflows", "Pre-boarding Portal", "Asset Provisioning & Structured Offboarding"]
        },
        {
            title: "Organization & Teams",
            desc: "Visualizes company structure with departments, designations, and reporting lines.",
            subFeatures: ["Hierarchy Management", "Team Analytics", "Policy Management Repository"]
        },
        {
            title: "Attendance & Leave",
            desc: "Real-time Tracking captures check-in/out times, calculates working hours, and handles shift scheduling.",
            subFeatures: ["Real-time Tracking & Shift Scheduling", "Automated Leave Accruals", "Attendance Regularization"]
        },
        {
            title: "Reports & Analytics",
            desc: "Comprehensive Reporting for attendance, leave, payroll, and employee demographics.",
            subFeatures: ["Customizable Exports (PDF, Excel, CSV)", "Visual Dashboards", "Workforce Trends"]
        },
        {
            title: "Document & Communication Hub",
            desc: "Automated generation of offer letters, experience certificates, and internal communication.",
            subFeatures: ["Automated HR Letters", "Company-wide Announcements", "Customizable Letter Templates"]
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
                            Intelligent HR & Payroll Solution
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl text-gray-400 mb-10 leading-relaxed max-w-3xl mx-auto font-light"
                        >
                            Streamline your workforce management with our AI-driven, all-in-one HRMS platform.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                        >
                            <Link to="/">
                                <Button size="lg" className="bg-white text-[#0d1933] hover:bg-gray-100 rounded-none px-10 py-7 text-lg shadow-xl transition-all font-semibold uppercase tracking-wider">
                                    Request Demo <ExternalLink className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-none px-10 py-7 text-lg border-white/20 text-white hover:bg-white/5 uppercase tracking-wider font-semibold"
                                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                            >
                                View Features
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
                            Hralva transforms HR operations with a unified platform for employee management. From comprehensive profile databases and automated notifications to role-based access and seamless onboarding, Hralva empowers organizations to manage their workforce efficiently and securely.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Image Carousel Section - DARK BACKGROUND, NO PADDING, NO GREY BG */}
            {carouselImages.length > 0 && (
                <section className="py-20 px-4 bg-[#0d1933] relative overflow-hidden">
                    <div className="max-w-6xl mx-auto relative group">
                        <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                            <AnimatePresence mode='wait'>
                                <motion.img
                                    key={currentImageIndex}
                                    src={carouselImages[currentImageIndex]}
                                    alt={`Platform preview ${currentImageIndex + 1}`}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full object-contain"
                                />
                            </AnimatePresence>

                            {/* Navigation Buttons (Only if > 1 image) */}
                            {carouselImages.length > 1 && (
                                <>
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
                                </>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Key Features Grid - DARK BACKGROUND */}
            <section id="features" className="py-24 px-4 bg-[#0d1933] text-left">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Key Features</h2>
                        <p className="text-xl text-gray-400 font-light max-w-2xl">A complete suite of tools to manage your most valuable asset: your people.</p>
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
                            { title: "Centralized Data", desc: "All modules read from a 'Single Source of Truth'. Updates propagate instantly across the system." },
                            { title: "Workflow Orchestration", desc: "State-machine driven workflows ensure no step is missed in processes like Onboarding." },
                            { title: "Seamless Integration", desc: "Payroll directly queries Attendance records for LOP and payable days without manual input." }
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

            {/* Why Hralva Section - DARK BACKGROUND */}
            <section className="py-24 px-4 bg-[#0d1933]">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">Why HRMS-Pro?</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {[
                            { title: "For HR", desc: "Reduces administrative overhead by 80% through automation." },
                            { title: "For Finance", desc: "Ensures 100% payroll accuracy and statutory compliance." },
                            { title: "For Employees", desc: "Specific self-service portals for transparency and empowerment." }
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
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to revolutionize your HR?</h2>
                    <Button size="lg" className="bg-white text-[#0d1933] hover:bg-gray-200 rounded-none px-12 py-8 text-lg font-bold shadow-2xl uppercase tracking-wider">
                        Get Started Today
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Hralva;
