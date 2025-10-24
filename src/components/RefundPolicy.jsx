import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  RefreshCw,
  XCircle,
  CheckCircle,
  Clock,
  ChevronRight,
} from "lucide-react";
import Metatags from "../SEO/metatags";

const metaPropsData = {
  title:
    "Refund Policy - Aitals Technologies | Service Refunds & Cancellations",
  description:
    "Read Aitals Technologies' refund policy for software development services, project cancellations, maintenance plans, and consulting services. Understand our refund eligibility criteria.",
  keyword:
    "Aitals Refund Policy, Software Development Refunds, Project Cancellation, Service Refunds, Maintenance Plan Refunds, Consulting Service Refunds, Payment Refunds",
  url: "https://aitals.com/refund-policy",
  image: "https://aitals.com/assets/logo-B8Q2-6qZ.png",
};

const RefundPolicy = () => {
  return (
    <>
      <Metatags metaProps={metaPropsData} />
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-[#0d1933] pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1933] to-[#1a2b4d]"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")`,
          }}
        ></div>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 text-white font-['Poppins']"
          >
            Refund Policy
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
            {/* Policy Overview */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-start space-x-3">
                <RefreshCw className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-800">
                    Refund Policy Overview
                  </h3>
                  <p className="text-blue-700 mt-1">
                    We strive for complete customer satisfaction. This policy
                    outlines the circumstances under which refunds may be
                    granted.
                  </p>
                </div>
              </div>
            </div>

            {/* Refund Eligibility */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                1. Refund Eligibility
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <h3 className="font-semibold text-green-800">
                      Eligible for Refund
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Service not delivered as described",
                      "Project cancellation within 24 hours",
                      "Technical issues we cannot resolve",
                      "Duplicate payment charged",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-green-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                  <div className="flex items-center mb-4">
                    <XCircle className="w-6 h-6 text-red-600 mr-3" />
                    <h3 className="font-semibold text-red-800">
                      Not Eligible for Refund
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Change of mind after work begins",
                      "Services already rendered",
                      "Third-party costs incurred",
                      "Custom development work started",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-red-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Service-Specific Refund Policies */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                2. Service-Specific Refund Policies
              </h2>

              <div className="space-y-6">
                {/* Custom Development Projects */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Custom Development Projects
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "100% refund if cancelled within 24 hours of agreement",
                      "50% refund if cancelled after requirements finalization but before development starts",
                      "No refund once development work has commenced",
                      "Milestone payments are non-refundable once the milestone is delivered and approved",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Maintenance & Support Services */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Maintenance & Support Services
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Pro-rated refund for unused portion of annual plans",
                      "No refund for monthly plans after service period has started",
                      "Refund available if we fail to provide agreed-upon support",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Consulting Services */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Consulting Services
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Full refund if cancelled 48 hours before scheduled session",
                      "50% refund if cancelled 24 hours before scheduled session",
                      "No refund for no-shows or cancellations within 24 hours",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Refund Process */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                3. Refund Process
              </h2>
              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-600 mb-4">
                    Refund requests are processed within 7-10 business days:
                  </p>
                  <ol className="space-y-3">
                    {[
                      "Submit refund request via email to billing@aitals.com",
                      "Include project details and reason for refund",
                      "Our team will review within 2 business days",
                      "Approved refunds processed to original payment method",
                      "You will receive confirmation once processed",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-gray-600 mt-1">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* Partial Refunds */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                4. Partial Refunds
              </h2>
              <p className="text-gray-600 mb-4">
                In some cases, partial refunds may be granted where:
              </p>
              <ul className="space-y-3">
                {[
                  "Only part of the services were unsatisfactory",
                  "There were misunderstandings in project scope",
                  "Client requirements changed significantly mid-project",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dispute Resolution */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                5. Dispute Resolution
              </h2>
              <p className="text-gray-600 mb-4">
                If you disagree with our refund decision, you may:
              </p>
              <ul className="space-y-3">
                {[
                  "Request a secondary review by senior management",
                  "Provide additional documentation supporting your claim",
                  "Seek mediation if the dispute cannot be resolved internally",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Third-Party Costs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                6. Third-Party Costs
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Please note that third-party costs (domain registration,
                hosting, APIs, etc.) are generally non-refundable as these are
                paid to external providers.
              </p>
            </div>

            {/* Contact for Refund Requests */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                7. Contact for Refund Requests
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <p className="font-semibold text-gray-800 mb-3">
                  For refund requests and inquiries:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p>Email: support@aitals.com</p>
                  <p>Phone: +91 9715092104</p>
                  <p>Response Time: Within 2 business days</p>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
              <h3 className="font-semibold text-yellow-800 mb-4">
                Important Notes
              </h3>
              <ul className="space-y-3">
                {[
                  "Refund eligibility is determined on a case-by-case basis",
                  "All refund decisions are final",
                  "This policy may be updated without prior notice",
                  "Special arrangements may override this policy if documented in writing",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-yellow-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default RefundPolicy;
