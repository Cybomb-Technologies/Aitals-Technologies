import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Smartphone, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Metatags from '@/SEO/metatags';
import pdfworksImg from '@/assets/pdfworks.png';
import hralvaImg from '@/assets/Hr-Alva.png';

const Products = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const meta = {
    title: "Our Digital Products Suite - Aitals Technologies",
    description: "Explore our range of digital tools including PDFWorks, Hralva HRMS, and Aitals CRM.",
    url: window.location.href,
    image: "/logo.png"
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Metatags metaProps={meta} />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white py-32 px-4">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 animate-pulse"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-4 px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-blue-200 text-sm font-medium"
          >
            Digital Ecosystem
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-8 pb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
          >
            Empowering Your Business
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed"
          >
            A suite of powerful tools designed to streamline operations, manage talent, and build lasting customer relationships.
          </motion.p>
        </div>
      </section>

      {/* Products List */}
      <section className="max-w-7xl mx-auto py-16 px-4 space-y-24">

        {/* PDFWorks Section */}
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="flex-1 space-y-6">
            <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Document Management
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900">
              PDFWorks.in
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 leading-relaxed">
              Experience the next generation of document management. PDFWorks provides powerful, intuitive tools to convert, edit, and organize your PDF documents directly from your browser. Secure, fast, and driven by AI.
            </motion.p>
            <motion.ul variants={itemVariants} className="space-y-3">
              {['Seamless PDF Conversion', 'Smart AI Document Analysis', 'Enterprise-Grade Security', 'Cloud-Native Performance'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>
            <motion.div variants={itemVariants} className="pt-4">
              <Link to="/products/pdfworks">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div variants={itemVariants} className="flex-1 w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="relative aspect-video overflow-hidden bg-gray-50">
              <img
                src={pdfworksImg}
                alt="PDFWorks Interface"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Hralva Section */}
        <motion.div
          className="flex flex-col lg:flex-row-reverse items-center gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="flex-1 space-y-6">
            <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
              Human Resources
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900">
              Hralva
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 leading-relaxed">
              Transform your workplace with Hralva, the comprehensive HRMS solution designed for modern businesses. From recruitment to retirement, manage your most valuable asset—your people—with efficiency and empathy.
            </motion.p>
            <motion.ul variants={itemVariants} className="space-y-3">
              {['Smart Recruitment & Onboarding', 'Automated Payroll & Compliance', 'Performance & Appraisal', 'Employee Self-Service Portal'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="text-purple-500 w-5 h-5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>
            <motion.div variants={itemVariants} className="pt-4">
              <Link to="/products/hralva">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div variants={itemVariants} className="flex-1 w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="relative aspect-video overflow-hidden bg-gray-50">
              <img
                src={hralvaImg}
                alt="Hralva Dashboard"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Aitals CRM Section */}
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="flex-1 space-y-6">
            <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
              Customer Relationships
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900">
              Aitals CRM
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 leading-relaxed">
              Supercharge your sales team with Aitals CRM. Detailed analytics, seamless automation, and a 360-degree view of your customers help you close deals faster and build lasting relationships.
            </motion.p>
            <motion.ul variants={itemVariants} className="space-y-3">
              {['Sales Force Automation', 'Omnichannel Communication', 'Predictive Analytics', 'Seamless Integrations'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="text-indigo-500 w-5 h-5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>
            <motion.div variants={itemVariants} className="pt-4">
              <Link to="/products/aitals-crm">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div variants={itemVariants} className="flex-1 w-full bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="aspect-video bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="text-center">
                <div className="text-5xl font-bold text-indigo-500 mb-2">CRM</div>
                <div className="text-gray-500 font-medium">Relationships that Grow.</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </section>
    </div>
  );
};

export default Products;
