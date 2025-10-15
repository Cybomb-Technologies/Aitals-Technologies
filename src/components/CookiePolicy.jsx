import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  Cookie,
  Settings,
  Shield,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

const CookiePolicy = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - Aitals Technologies</title>
        <meta
          name="description"
          content="Learn about how Aitals Technologies uses cookies and similar technologies to enhance your browsing experience."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-[#0d1933] pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1933] to-[#1a2b4d]"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")`,
          }}
        ></div>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 text-white font-['Poppins']"
          >
            Cookie Policy
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
            {/* Cookie Consent */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <div className="flex items-start space-x-3">
                <Cookie className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-800">
                    Cookie Consent
                  </h3>
                  <p className="text-green-700 mt-1">
                    By using our website, you consent to the use of cookies in
                    accordance with this policy. You can manage your preferences
                    at any time.
                  </p>
                </div>
              </div>
            </div>

            {/* What Are Cookies? */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                1. What Are Cookies?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Cookies are small text files that are stored on your device when
                you visit a website. They help the website remember your
                preferences and improve your browsing experience.
              </p>
            </div>

            {/* Types of Cookies We Use */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                2. Types of Cookies We Use
              </h2>

              <div className="space-y-6">
                {/* Essential Cookies */}
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center mb-4">
                    <Shield className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="font-semibold text-gray-800">
                      Essential Cookies
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Required for the website to function properly.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Session management and security",
                      "Load balancing and performance",
                      "Shopping cart functionality",
                      "Cannot be disabled",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Performance Cookies */}
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                  <div className="flex items-center mb-4">
                    <Settings className="w-6 h-6 text-purple-600 mr-3" />
                    <h3 className="font-semibold text-gray-800">
                      Performance Cookies
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Help us understand how visitors interact with our website.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Google Analytics tracking",
                      "Page load times and performance",
                      "Error tracking and debugging",
                      "User behavior analysis",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Marketing Cookies */}
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="w-6 h-6 text-orange-600 mr-3" />
                    <h3 className="font-semibold text-gray-800">
                      Marketing Cookies
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Used to track visitors across websites for advertising
                    purposes.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Social media integration",
                      "Advertising campaign tracking",
                      "Retargeting and remarketing",
                      "Conversion tracking",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Specific Cookies We Use */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                3. Specific Cookies We Use
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-800 font-semibold">
                        Cookie Name
                      </th>
                      <th className="px-4 py-3 text-left text-gray-800 font-semibold">
                        Purpose
                      </th>
                      <th className="px-4 py-3 text-left text-gray-800 font-semibold">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      {
                        name: "session_id",
                        purpose: "Maintain user session",
                        duration: "Session",
                      },
                      {
                        name: "_ga",
                        purpose: "Google Analytics",
                        duration: "2 years",
                      },
                      {
                        name: "_gid",
                        purpose: "Google Analytics",
                        duration: "24 hours",
                      },
                      {
                        name: "cookie_consent",
                        purpose: "Remember cookie preferences",
                        duration: "1 year",
                      },
                    ].map((cookie, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-mono text-sm text-gray-700">
                          {cookie.name}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {cookie.purpose}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {cookie.duration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Third-Party Cookies */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                4. Third-Party Cookies
              </h2>
              <p className="text-gray-600 mb-4">
                We may use third-party services that set their own cookies:
              </p>
              <ul className="space-y-3">
                {[
                  "Google Analytics for website analytics",
                  "Social media platforms for sharing features",
                  "Payment processors for transaction handling",
                  "Advertising networks for relevant ads",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Managing Cookies */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                5. Managing Cookies
              </h2>
              <p className="text-gray-600 mb-6">
                You can control and/or delete cookies as you wish:
              </p>

              {/* Browser Settings */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Browser Settings
                </h3>
                <ul className="space-y-3">
                  {[
                    "Delete all cookies from your browser history",
                    "Block cookies from specific websites",
                    "Set your browser to ask before storing cookies",
                    "Use private/incognito browsing mode",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-gray-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Opt-Out Tools */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Opt-Out Tools
                </h3>
                <ul className="space-y-3">
                  {[
                    "Google Analytics Opt-out Browser Add-on",
                    "Digital Advertising Alliance opt-out tool",
                    "Network Advertising Initiative opt-out tool",
                    "Your Online Choices website",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-gray-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Additional Sections */}
            {[
              {
                title: "6. Do Not Track Signals",
                content:
                  "Our website does not currently respond to Do Not Track signals. However, you can configure your browser settings to refuse all cookies or to indicate when a cookie is being sent.",
              },
              {
                title: "7. Cookie Duration",
                content:
                  "Cookies may be either 'persistent' or 'session' cookies. Session cookies are temporary and expire when you close your browser, while persistent cookies remain until deleted or reach expiration date.",
              },
              {
                title: "8. Updates to This Policy",
                content:
                  "We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the 'Last updated' date.",
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
                9. Contact Information
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <p className="font-semibold text-gray-800 mb-3">
                  For questions about this Cookie Policy:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p>Email: support@aitals.com</p>
                  <p>Phone: +91 9715092104</p>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
              <h3 className="font-semibold text-blue-800 mb-4">
                Need Help Managing Cookies?
              </h3>
              <p className="text-blue-700 leading-relaxed">
                If you need assistance with managing your cookie preferences or
                have questions about our use of cookies, please don't hesitate
                to contact our privacy team.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CookiePolicy;
