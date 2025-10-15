import { Link } from "react-router-dom";
import {
  Code2,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Link to="/">
                <img
                  src="src/assets/logo.png"
                  alt="Aitals Technologies Logo"
                  className="h-8 w-auto object-contain"
                />
              </Link>
            </div>

            <p className="text-gray-400 mb-4">
              Innovating Ideas Into Digital Excellence. Your trusted partner for
              cutting-edge software solutions.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">
              Quick Links
            </span>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/career"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Career
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Services</span>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services/web-development"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  to="/services/mobile-development"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link
                  to="/services/ui-ux-design"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link
                  to="/services/ecommerce"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Ecommerce
                </Link>
              </li>
              <li>
                <Link
                  to="/services/web-development"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  AI Integration
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">
              Contact Info
            </span>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  146, Sterling Rd, Nungambakkam, Chennai, Tamil Nadu, India -
                  600034
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a
                  href="mailto:support@aitals.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  support@aitals.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">+91 9715092104</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2025 Aitals Technologies Pvt Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link
              to="/privacy-policy"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-conditions"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/refund-policy"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Refund Policy
            </Link>
            <Link
              to="/cookie-policy"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
