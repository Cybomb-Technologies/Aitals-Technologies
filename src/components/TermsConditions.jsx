import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  FileText,
  Scale,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import Metatags from "../SEO/metatags";

const metaPropsData = {
  title: "Terms & Conditions - Aitals Tech | Service Agreement",
  description:
    "Read Aitals Technologies Terms & Conditions governing software development services, project agreements, intellectual property rights, and client responsibilities.",
  keyword:
    "Aitals Terms Conditions, Service Agreement, Software Development Terms, Project Agreement, Intellectual Property, Client Responsibilities, Legal Terms",
  url: "https://aitals.com/terms-conditions",
  image: "https://aitals.com/assets/logo-B8Q2-6qZ.png",
};

const TermsConditions = () => {
  return (
    <>
      <Metatags metaProps={metaPropsData} />
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-[#0d1933] pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1933] to-[#1a2b4d]"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")`,
          }}
        ></div>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 text-white font-['Poppins']"
          >
            Terms & Conditions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-4xl mx-auto font-['Poppins']"
          >
            Last updated: October 2025
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Important Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-yellow-800">
                    Important Notice
                  </h3>
                  <p className="text-yellow-700 mt-1">
                    Please read these terms carefully before using our services.
                    By accessing or using our website and services, you agree to
                    be bound by these terms.
                  </p>
                </div>
              </div>
            </div>

            {/* Acceptance of Terms */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using Aitals Technologies' website and
                services, you accept and agree to be bound by the terms and
                provision of this agreement.
              </p>
            </div>

            {/* Services Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                2. Services Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Aitals Technologies provides software development, web
                development, mobile app development, UI/UX design, cloud
                solutions, and AI integration services.
              </p>
            </div>

            {/* User Responsibilities */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                3. User Responsibilities
              </h2>
              <p className="text-gray-600 mb-4">As a user, you agree to:</p>
              <ul className="space-y-3">
                {[
                  "Provide accurate and complete information",
                  "Maintain the confidentiality of your account",
                  "Notify us immediately of any unauthorized use",
                  "Comply with all applicable laws and regulations",
                  "Not engage in any illegal or prohibited activities",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Intellectual Property */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                4. Intellectual Property
              </h2>
              <div className="flex items-start space-x-4">
                <FileText className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-600 mb-4">
                    All content, features, and functionality are owned by Aitals
                    Technologies and are protected by international copyright,
                    trademark, and other intellectual property laws.
                  </p>
                  <p className="text-gray-600 mb-4">You may not:</p>
                  <ul className="space-y-3">
                    {[
                      "Copy, modify, or create derivative works",
                      "Use our intellectual property without permission",
                      "Reverse engineer or decompile our software",
                      "Remove any copyright or proprietary notices",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Project Development Terms */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                5. Project Development Terms
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <h3 className="font-semibold text-gray-800">
                      Client Responsibilities
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "Provide clear project requirements",
                      "Timely feedback and approvals",
                      "Required materials and access",
                      "Payment as per agreement",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-center mb-3">
                    <Scale className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="font-semibold text-gray-800">
                      Our Commitments
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "Professional delivery of services",
                      "Adherence to project timelines",
                      "Quality assurance and testing",
                      "Confidentiality of client information",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                6. Payment Terms
              </h2>
              <ul className="space-y-3">
                {[
                  "Payment schedules as outlined in project proposals",
                  "All prices in INR unless otherwise specified",
                  "Late payments may incur additional charges",
                  "Refunds subject to our refund policy",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Sections */}
            {[
              {
                title: "7. Limitation of Liability",
                content:
                  "Aitals Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the services.",
              },
              {
                title: "8. Termination",
                content:
                  "We may terminate or suspend access to our services immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.",
              },
              {
                title: "9. Governing Law",
                content:
                  "These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.",
              },
              {
                title: "10. Changes to Terms",
                content:
                  "We reserve the right to modify these terms at any time. We will notify users of any changes by posting the new terms on this site.",
              },
              {
                title: "11. Dispute Resolution",
                content:
                  "Any disputes arising from these terms shall be resolved through arbitration in Bangalore, India, in accordance with the Arbitration and Conciliation Act, 1996.",
              },
            ].map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                12. Contact Information
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <p className="font-semibold text-gray-800 mb-2">
                  Aitals Technologies Pvt Ltd
                </p>
                <div className="space-y-1 text-gray-600">
                  <p>Email: support@aitals.com</p>
                  <p>Phone: +91 9715092104</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TermsConditions;
