import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, ChevronRight } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Aitals Technologies</title>
        <meta
          name="description"
          content="Learn how Aitals Technologies collects, uses, and protects your personal information. Your privacy is our priority."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-[#0d1933] pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1933] to-[#1a2b4d]"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")`,
          }}
        ></div>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 text-white font-['Poppins']"
          >
            Privacy Policy
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
            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <Shield className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  Data Protection
                </h3>
                <p className="text-gray-600">
                  We implement industry-standard security measures to protect
                  your data.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <Lock className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  Your Rights
                </h3>
                <p className="text-gray-600">
                  You have control over your personal information and how it's
                  used.
                </p>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                1. Information We Collect
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Personal Information
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Name, email address, and contact details",
                      "Company information and job title",
                      "Payment and billing information",
                      "Communication preferences",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Technical Information
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "IP address and browser type",
                      "Device information and operating system",
                      "Website usage data and analytics",
                      "Cookies and tracking technologies",
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

            {/* How We Use Your Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                2. How We Use Your Information
              </h2>
              <p className="text-gray-600 mb-4">
                We use the collected information for:
              </p>
              <ul className="space-y-3">
                {[
                  "Providing and maintaining our services",
                  "Processing transactions and managing accounts",
                  "Improving user experience and website functionality",
                  "Communicating important updates and offers",
                  "Complying with legal obligations",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Data Sharing and Disclosure */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                3. Data Sharing and Disclosure
              </h2>
              <p className="text-gray-600 mb-4">
                We do not sell your personal information. We may share data
                with:
              </p>
              <ul className="space-y-3">
                {[
                  "Trusted service providers and partners",
                  "Legal authorities when required by law",
                  "Business transfers in case of merger or acquisition",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Data Security */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                4. Data Security
              </h2>
              <div className="flex items-start space-x-4">
                <Database className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-600 mb-4">
                    We implement appropriate security measures including:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "SSL encryption for data transmission",
                      "Regular security assessments and updates",
                      "Access controls and authentication protocols",
                      "Secure data storage and backup systems",
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

            {/* Your Rights */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                5. Your Rights
              </h2>
              <p className="text-gray-600 mb-4">You have the right to:</p>
              <ul className="space-y-3">
                {[
                  "Access and receive your personal data",
                  "Rectify inaccurate or incomplete data",
                  "Request deletion of your personal data",
                  "Object to processing of your data",
                  "Data portability to another service",
                  "Withdraw consent at any time",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cookies and Tracking */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                6. Cookies and Tracking
              </h2>
              <div className="flex items-start space-x-4">
                <Eye className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-600 mb-4">
                    We use cookies and similar technologies to:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Remember your preferences and settings",
                      "Analyze website traffic and performance",
                      "Provide personalized content and ads",
                      "Enable social media features",
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

            {/* Additional Sections */}
            {[
              {
                title: "7. International Data Transfers",
                content:
                  "Your data may be transferred to and processed in countries outside of your residence. We ensure appropriate safeguards are in place for such transfers.",
              },
              {
                title: "8. Data Retention",
                content:
                  "We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.",
              },
              {
                title: "9. Children's Privacy",
                content:
                  "Our services are not directed to individuals under 16. We do not knowingly collect personal information from children under 16.",
              },
              {
                title: "10. Changes to This Policy",
                content:
                  "We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the 'Last updated' date.",
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
                11. Contact Us
              </h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
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

export default PrivacyPolicy;
