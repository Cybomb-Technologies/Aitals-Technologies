import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Code2, Mail, Phone, MapPin, Linkedin, Instagram, Send } from "lucide-react";
import { useState } from "react";

const API_BASE_URL1 = import.meta.env.VITE_API_BASE_URL;

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [subscribeError, setSubscribeError] = useState("");

  // Newsletter subscription
  const handleNewsletterSubscribe = async (e) => {
    e.preventDefault();

    if (!newsletterEmail) {
      setSubscribeError("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setSubscribeError("Please enter a valid email address");
      return;
    }

    setIsSubscribing(true);
    setSubscribeError("");
    setSubscribeMessage("");

    try {
      const response = await fetch(`${API_BASE_URL1}/api/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newsletterEmail,
          source: "footer",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscribeMessage(
          data.message || "Successfully subscribed to our newsletter!"
        );
        setNewsletterEmail("");
      } else {
        setSubscribeError(
          data.message || "Subscription failed. Please try again."
        );
      }
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      setSubscribeError("Network error. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        
        {/* Compact Newsletter Section */}
        <div className="py-8 border-b border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Text Side */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-white">Stay Updated</h3>
              <p className="text-gray-400 text-sm mt-1">
                Get the latest insights delivered to your inbox
              </p>
            </div>

            {/* Form Side */}
            <div className="w-full md:w-auto">
              <form
                onSubmit={handleNewsletterSubscribe}
                className="flex flex-col sm:flex-row gap-2"
              >
                <div className="w-full sm:w-64 relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      setSubscribeError("");
                      setSubscribeMessage("");
                    }}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-300 text-sm"
                    disabled={isSubscribing}
                  />
                  
                  {/* Message Container - Static on Mobile, Absolute on Desktop */}
                  <div className="mt-2 sm:absolute sm:mt-0 sm:left-0 sm:-bottom-6 w-full">
                    {subscribeMessage && (
                      <p className="text-green-400 text-xs text-center sm:text-left">{subscribeMessage}</p>
                    )}
                    {subscribeError && (
                      <p className="text-red-400 text-xs text-center sm:text-left">{subscribeError}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-5 py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-50 hover:text-black transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 text-sm whitespace-nowrap"
                >
                  {isSubscribing ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Wait...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Subscribe
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Link to="/">
                  <img
                    src={logo}
                    alt="Aitals Technologies Logo"
                    className="h-8 w-auto object-contain"
                  />
                </Link>
              </div>

              <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                Innovating Ideas Into Digital Excellence. Your trusted partner for
                cutting-edge software solutions.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/company/aitalstechnologies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/aitals_technologies?igsh=aDNyazJlZDhubmhi&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/Aitals_Tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <span className="text-white font-semibold mb-4 block">
                Quick Links
              </span>
              <ul className="space-y-2">
                
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-blue-300 transition-colors text-sm"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-gray-400 hover:text-blue-300 transition-colors text-sm"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/portfolio"
                    className="text-gray-400 hover:text-blue-300 transition-colors text-sm"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/career"
                    className="text-gray-400 hover:text-blue-300 transition-colors text-sm"
                  >
                    Career
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-blue-300 transition-colors text-sm"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-white font-semibold mb-4 block">Services</span>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/services/web-development"
                    className="text-gray-400 hover:text-blue-300 transition-colors text-sm"
                  >
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/mobile-development"
                    className="text-gray-400 hover:text-blue-300 transition-colors text-sm"
                  >
                    Mobile App Development
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/ui-ux-design"
                    className="text-gray-400 hover:text-blue-300 transition-colors text-sm"
                  >
                    UI/UX Design
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/ecommerce"
                    className="text-gray-400 hover:text-blue-300 transition-colors text-sm"
                  >
                    Ecommerce
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/ai-automation"
                    className="text-gray-400 hover:text-blue-300 transition-colors text-sm"
                  >
                    AI Integration
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-white font-semibold mb-4 block">
                Contact Info
              </span>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-300 mt-0.5 flex-shrink-0" />
                  <a
                    href="https://maps.google.com/?q=Prime Plaza No.54/1, 1st street, Sripuram colony, St. Thomas Mount, Chennai, Tamil Nadu - 600 016, India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-300 transition-colors cursor-pointer text-sm"
                  >
                    Prime Plaza No.54/1, 1st street, Sripuram colony, St. Thomas
                    Mount, Chennai, Tamil Nadu - 600 016, India
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-300 flex-shrink-0" />
                  <a
                    href="mailto:support@aitals.com"
                    className="text-gray-400 hover:text-blue-300 transition-colors text-sm"
                  >
                    support@aitals.com
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-300 flex-shrink-0" />
                  <a
                    href="tel:+919715092104"
                    className="text-gray-400 hover:text-blue-300 transition-colors text-sm"
                  >
                    +91 9715092104
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0 text-sm">
              © 2025 Aitals Technologies Pvt Ltd. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/privacy-policy"
                className="text-gray-500 hover:text-white transition-colors text-xs"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-conditions"
                className="text-gray-500 hover:text-white transition-colors text-xs"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/refund-policy"
                className="text-gray-500 hover:text-white transition-colors text-xs"
              >
                Refund Policy
              </Link>
              <Link
                to="/cookie-policy"
                className="text-gray-500 hover:text-white transition-colors text-xs"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;