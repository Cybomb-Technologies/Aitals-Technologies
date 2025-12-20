import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from '../assets/logo.png';
import ChatWidget from "../ChatWidget/ChatWidget"
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false); // 👈 NEW STATE
  const location = useLocation();

  const servicesDropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target)
      ) {
        setIsServicesDropdownOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu logic and added mobile services dropdown reset
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset dropdowns when closing mobile menu
      if (isMobileServicesOpen) setIsMobileServicesOpen(false);
      if (isServicesDropdownOpen) setIsServicesDropdownOpen(false);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen, isMobileServicesOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    {
      name: "Services",
      path: "/services",
      dropdown: [
        {
          name: "Web Development",
          path: "/services/web-development",
        },
        {
          name: "Mobile App Development",
          path: "/services/mobile-development",
        },
        {
          name: "UI/UX Design",
          path: "/services/ui-ux-design",
        },
        {
          name: "Ecommerce",
          path: "/services/ecommerce",
        },
        {
          name: "Software Testing",
          path: "/services/software-testing",
        },
        {
          name: "Cloud Solutions",
          path: "/services/cloud-devops",
        },
        {
          name: "AI Integration",
          path: "/services/ai-automation",
        },
      ],
    },
    { name: "Pricing", path: "/pricing" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Career", path: "/career" },
    { name: "Blogs", path: "/blog" },
  ];

  const handleMouseEnter = (linkName) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(linkName);
    if (linkName === "Services") {
      setIsServicesDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(false);
      setActiveDropdown(null);
    }, 300);
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(false);
      setActiveDropdown(null);
    }, 300);
  };

  const isServicesActive = location.pathname.startsWith("/services");

  return (

    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full`}
    >
      <div
        className={`py-2 px-4 transition-all duration-300 ${isScrolled
            ? "bg-white shadow-lg"
            : "bg-white shadow-lg backdrop-blur-sm"
          }`}
      >
        <div className="flex items-center justify-between w-full px-4 md:px-8">
          <Link
            to="/"
            className="flex items-center group transition-all duration-300"
          >
            <img
              src={logo}
              alt="Aitals Technologies Logo"
              className="h-12 lg:h-15 w-auto transition-opacity group-hover:opacity-90"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className="relative"
                ref={link.name === "Services" ? servicesDropdownRef : null}
                onMouseEnter={() => handleMouseEnter(link.name)}
                onMouseLeave={handleMouseLeave}
              >
                {link.dropdown ? (
                  <div className="relative">
                    <button
                      className={`font-medium transition-colors flex items-center ${isServicesActive
                          ? "text-blue-600"
                          : isScrolled
                            ? "text-gray-700 hover:text-blue-600"
                            : "text-gray-700 hover:text-blue-600"
                        }`}
                    >
                      {link.name}
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform ${isServicesDropdownOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {/* Desktop Dropdown */}
                    <AnimatePresence>
                      {isServicesDropdownOpen &&
                        activeDropdown === "Services" && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-3 z-50"
                            onMouseEnter={handleDropdownMouseEnter}
                            onMouseLeave={handleDropdownMouseLeave}
                          >
                            {link.dropdown.map((dropdownItem, index) => (
                              <motion.div
                                key={dropdownItem.path}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Link
                                  to={dropdownItem.path}
                                  className="flex flex-col px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 rounded-lg mx-2 group/item"
                                  onClick={() =>
                                    setIsServicesDropdownOpen(false)
                                  }
                                >
                                  <span className="font-medium group-hover/item:translate-x-1 transition-transform">
                                    {dropdownItem.name}
                                  </span>
                                  <span className="text-sm text-gray-500 group-hover/item:text-blue-500 mt-1">
                                    {dropdownItem.description}
                                  </span>
                                </Link>
                                {index < link.dropdown.length - 1 && (
                                  <div className="h-px bg-gray-100 mx-4 my-1" />
                                )}
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`font-medium transition-colors ${location.pathname === link.path
                        ? "text-blue-600"
                        : isScrolled
                          ? "text-gray-700 hover:text-blue-600"
                          : "text-gray-700 hover:text-blue-600"
                      }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <Link to="/contact">
              <Button
                className="text-white px-4 py-2 rounded-full hover:opacity-90 transition-all"
                style={{
                  background: "linear-gradient(to right, #1A173A, #6666CC)",
                  border: "none",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Menu Button */}
          <button
            className="xl:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X
                className={isScrolled ? "text-gray-900" : "text-black"}
                size={24}
              />
            ) : (
              <Menu
                className={isScrolled ? "text-gray-900" : "text-black"}
                size={24}
              />
            )}
          </button>
        </div>
      </div>
      <ChatWidget />
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-screen w-full md:w-1/2 bg-white shadow-xl z-50 md:rounded-l-xl overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-end items-center mb-6">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <div key={link.path}>
                      {link.dropdown ? (
                        <div className="py-2">
                          <button
                            onClick={() =>
                              setIsMobileServicesOpen(!isMobileServicesOpen)
                            }
                            className={`flex items-center justify-between w-full text-left font-medium py-3 px-4 rounded-lg ${isServicesActive || isMobileServicesOpen
                                ? "text-blue-600 bg-blue-50"
                                : "text-gray-700 hover:bg-gray-50"
                              }`}
                          >
                            {link.name}
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${isMobileServicesOpen ? "rotate-180" : ""
                                }`}
                            />
                          </button>

                          <AnimatePresence>
                            {isMobileServicesOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="ml-4 mt-1 border-l-2 border-gray-200 pl-4 space-y-1 overflow-hidden"
                              >
                                {link.dropdown.map((dropdownItem) => (
                                  <Link
                                    key={dropdownItem.path}
                                    to={dropdownItem.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block py-2 px-4 rounded-lg font-medium ${location.pathname === dropdownItem.path
                                        ? "text-blue-600 bg-blue-50"
                                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                                      }`}
                                  >
                                    {dropdownItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block py-3 px-4 rounded-lg font-medium ${location.pathname === link.path
                              ? "text-blue-600 bg-blue-50"
                              : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                            }`}
                        >
                          {link.name}
                        </Link>
                      )}
                    </div>
                  ))}

                  <div className="pt-4">
                    <Link
                      to="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block"
                    >
                      <Button
                        className="w-full text-white"
                        style={{
                          background:
                            "linear-gradient(to right, #1A173A, #6666CC)",
                          border: "none",
                          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        }}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

          </>
        )}
      </AnimatePresence>
    </motion.nav>

  );
};

export default Navbar;
