import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code,
  Globe,
  Smartphone,
  Database,
  Shield,
  Zap,
  Users,
  Award,
  Clock,
  CheckCircle,
  ShoppingCart,
  BarChart,
  MessageCircle,
  Palette,
  CreditCard,
  Truck,
  HeadphonesIcon,
  ShieldCheck,
} from "lucide-react";

const Ecommerce = () => {
  const sectionRefs = useRef([]);
  const [selectedTechCategory, setSelectedTechCategory] = useState("Platforms");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const features = [
    {
      icon: ShoppingCart,
      title: "Complete E-commerce Solutions",
      desc: "End-to-end online store development with seamless shopping experience",
    },
    {
      icon: CreditCard,
      title: "Secure Payment Integration",
      desc: "Multiple payment gateway options with PCI compliance and fraud protection",
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Security",
      desc: "SSL encryption, secure checkout, and regular security updates",
    },
    {
      icon: Truck,
      title: "Inventory & Order Management",
      desc: "Real-time inventory tracking and automated order processing",
    },
    {
      icon: BarChart,
      title: "Sales Analytics",
      desc: "Comprehensive dashboard with sales reports and customer insights",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Customer Support",
      desc: "Round-the-clock technical support and maintenance services",
    },
  ];

  const technologies = {
    Platforms: [
      {
        name: "Shopify",
        logo: "https://cdn.worldvectorlogo.com/logos/shopify.svg",
        url: "/services/shopify",
      },
      {
        name: "WooCommerce",
        logo: "https://cdn.worldvectorlogo.com/logos/woocommerce-1.svg",
        url: "/services/woo-commerce",
      },
      {
        name: "Magento",
        logo: "https://www.svgrepo.com/show/303592/magento-2-logo.svg",
        url: "/services/magento",
      },
      {
        name: "BigCommerce",
        logo: "https://www.vectorlogo.zone/logos/bigcommerce/bigcommerce-icon.svg",
        url: "/services/big-commerce",
      },
      {
        name: "Custom Solutions",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        url: "/services/custom-ecommerce",
      },
    ],
    Frontend: [
      {
        name: "React",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        url: "/services/react-development-service",
      },
      {
        name: "Vue.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
        url: "/services/vuejs-development",
      },
      {
        name: "Angular",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
        url: "/services/angular-development-service",
      },
      {
        name: "TypeScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        url: "/services/typescript-development",
      },
      {
        name: "Next.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        url: "/services/nextjs-development",
      },
    ],
    Backend: [
      {
        name: "Node.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        url: "/services/nodejs-development-service",
      },
      {
        name: "PHP",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
        url: "/services/php-development-service",
      },
      {
        name: "Python",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        url: "/services/python-development-service",
      },
      {
        name: "Java",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        url: "/services/java-development-service",
      },
      {
        name: ".NET",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
        url: "/services/dotnet-development-service",
      },
    ],
    "Payment & Security": [
      {
        name: "Stripe",
        logo: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg",
        url: "/services/payment-integration",
      },
      {
        name: "PayPal",
        logo: "https://www.vectorlogo.zone/logos/paypal/paypal-icon.svg",
        url: "/services/payment-integration",
      },
      {
        name: "Razorpay",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq7XQpw0VPRRyLLR9iM-nrpdTWrmOyBl2bnA&s",
        url: "/services/payment-integration",
      },
      {
        name: "Google Pay",
        logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-pay-icon.png",
        url: "/services/payment-integration",
      },
      {
        name: "SSL Security",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
        url: "/services/security",
      },
    ],
  };

  const process = [
    {
      number: "01",
      title: "Strategy & Planning",
      desc: "Market research, competitor analysis, and e-commerce strategy development",
    },
    {
      number: "02",
      title: "UI/UX Design",
      desc: "Customer-centric design with optimized user journey and conversion paths",
    },
    {
      number: "03",
      title: "Development",
      desc: "Agile development with feature-rich e-commerce functionality",
    },
    {
      number: "04",
      title: "Payment Integration",
      desc: "Secure payment gateway setup and transaction testing",
    },
    {
      number: "05",
      title: "Testing & Launch",
      desc: "Comprehensive testing across devices and smooth store launch",
    },
    {
      number: "06",
      title: "Support & Growth",
      desc: "Ongoing maintenance, updates, and sales optimization",
    },
  ];

  const solutions = [
    {
      icon: ShoppingCart,
      title: "Online Store Development",
      desc: "Complete e-commerce websites with product catalogs and shopping carts",
      features: [
        "Product Management",
        "Shopping Cart",
        "Wishlist",
        "Reviews & Ratings",
      ],
    },
    {
      icon: BarChart,
      title: "Multi-vendor Marketplace",
      desc: "Platforms connecting multiple sellers with buyers in one marketplace",
      features: [
        "Vendor Dashboard",
        "Commission System",
        "Order Management",
        "Revenue Tracking",
      ],
    },
    {
      icon: CreditCard,
      title: "Payment Solutions",
      desc: "Secure payment processing with multiple gateway integrations",
      features: [
        "Multiple Payment Options",
        "PCI Compliance",
        "Fraud Detection",
        "Refund Management",
      ],
    },
    {
      icon: Database,
      title: "Inventory Management",
      desc: "Real-time inventory tracking and automated stock management",
      features: [
        "Stock Alerts",
        "Barcode Integration",
        "Supplier Management",
        "Warehouse Sync",
      ],
    },
  ];

  const stats = [
    { number: "150+", label: "E-commerce Stores Built" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "5M+", label: "Monthly Visitors" },
    { number: "24/7", label: "Store Monitoring" },
  ];

  const techCategories = Object.keys(technologies);

  return (
    <>
      <Helmet>
        <title>E-commerce Development Services | Online Store Solutions</title>
        <meta
          name="description"
          content="Professional e-commerce development services with secure payment integration, inventory management, and scalable online store solutions."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      {/* Hero Section - Blue */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(13, 25, 51, 0.4), rgba(13, 25, 51, 0.95)), url("https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80")`,
          }}
        ></div>

        {/* Animated Gradient Overlays */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(74, 125, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(58, 109, 240, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(13, 25, 51, 0.2) 0%, transparent 50%)
            `,
          }}
        ></div>

        <div className="relative z-10 pt-20 text-center w-full px-4">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-white font-['Poppins'] drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Modern E-commerce
            <span className="block mt-2 bg-gradient-to-r from-[#4a7dff] via-[#3a6df0] to-[#4a7dff] bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-shift">
              Development
            </span>
            Solutions
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-gray-200 leading-relaxed font-['Poppins'] font-light opacity-0 animate-fade-in-up"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Build powerful online stores that drive sales, enhance customer
            experience, and grow your business with our comprehensive e-commerce
            development services
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 opacity-0 animate-fade-in-up"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/contact"
              className="relative bg-[#4a7dff] text-white text-lg px-8 py-6 rounded-xl font-semibold flex items-center gap-2 min-w-[220px] justify-center overflow-hidden transition-all duration-300 hover:bg-[#3a6df0] hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30 group"
            >
              <span className="relative z-10">Start Your Project</span>
              <ArrowRight size={20} className="relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </Link>

            <Link
              to="/portfolio"
              className="relative bg-transparent text-white text-lg px-8 py-6 rounded-xl font-semibold border-2 border-[#4a7dff] flex items-center gap-2 min-w-[180px] justify-center overflow-hidden transition-all duration-300 hover:bg-[#4a7dff]/10 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/20 group"
            >
              <span className="relative z-10">View Our Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4a7dff]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section - White */}
      <section
        ref={addToRefs}
        className="py-20 bg-white relative overflow-hidden opacity-0 translate-y-8 transition-all duration-700"
      >
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-radial-gradient from-[#4a7dff]/5 to-transparent animate-spin-slow"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#4a7dff] via-[#3a6df0] to-[#4a7dff] bg-clip-text text-transparent font-['Poppins'] relative inline-block">
              Why Choose Our Services
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              We combine technical expertise with creative design to deliver
              e-commerce solutions that exceed expectations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-[#1a2b4d] to-[#152547] p-10 rounded-2xl border border-[#2d3b5b] transition-all duration-400 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 hover:border-[#4a7dff] relative overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4a7dff]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>

                <div className="w-20 h-20 bg-gradient-to-br from-[#4a7dff] to-[#3a6df0] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 animate-pulse-glow">
                  <feature.icon size={32} color="white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-100 mb-4 font-['Poppins'] group-hover:text-[#4a7dff] transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-300 leading-relaxed font-['Poppins']">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section - Blue */}
      <section
        ref={addToRefs}
        className="py-20 bg-[#0d1933] relative opacity-0 translate-y-8 transition-all duration-700"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#4a7dff] via-[#3a6df0] to-[#4a7dff] bg-clip-text text-transparent font-['Poppins'] relative inline-block">
              Technologies We Use
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              We leverage the latest technologies and frameworks to build robust
              and scalable e-commerce applications
            </p>
          </div>

          {/* Tech Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {techCategories.map((category) => (
              <button
                key={category}
                className={`px-6 py-3 rounded-xl font-semibold font-['Poppins'] transition-all duration-300 ${
                  selectedTechCategory === category
                    ? "bg-[#4a7dff] text-white shadow-lg shadow-blue-500/30"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                }`}
                onClick={() => setSelectedTechCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tech Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {technologies[selectedTechCategory].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={tech.url} className="block">
                  <div className="bg-gradient-to-br from-[#1a2b4d] to-[#152547] p-6 rounded-2xl border border-[#2d3b5b] transition-all duration-400 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 hover:border-[#4a7dff] text-center group h-full flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-4 p-2 group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={tech.logo}
                        alt={`${tech.name} logo`}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <span className="text-gray-100 font-semibold font-['Poppins'] group-hover:text-[#4a7dff] transition-colors duration-300">
                      {tech.name}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - White */}
      <section
        ref={addToRefs}
        className="py-20 bg-white relative opacity-0 translate-y-8 transition-all duration-700"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#4a7dff] via-[#3a6df0] to-[#4a7dff] bg-clip-text text-transparent font-['Poppins'] relative inline-block">
              Our Development Process
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              A structured approach that ensures quality, transparency, and
              timely delivery of your project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-[#1a2b4d] to-[#152547] p-12 rounded-2xl text-center shadow-xl transition-all duration-400 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 hover:border-[#4a7dff] border border-[#2d3b5b] relative overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"></div>

                <div className="text-5xl font-extrabold mb-4 bg-gradient-to-br from-[#4a7dff] to-[#3a6df0] bg-clip-text text-transparent font-['Poppins'] leading-none">
                  {step.number}
                </div>

                <h3 className="text-2xl font-bold text-gray-100 mb-4 font-['Poppins']">
                  {step.title}
                </h3>

                <p className="text-gray-300 leading-relaxed font-['Poppins']">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section - Blue */}
      <section
        ref={addToRefs}
        className="py-20 bg-[#0d1933] relative opacity-0 translate-y-8 transition-all duration-700"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#4a7dff] via-[#3a6df0] to-[#4a7dff] bg-clip-text text-transparent font-['Poppins'] relative inline-block">
              Our Solutions
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              Comprehensive e-commerce development services tailored to your
              specific business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                className="bg-white p-10 rounded-2xl border border-gray-200 transition-all duration-400 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 hover:border-[#4a7dff] relative overflow-hidden group flex flex-col h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4a7dff]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>

                <div className="w-20 h-20 bg-gradient-to-br from-[#4a7dff] to-[#3a6df0] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 animate-pulse-glow">
                  <solution.icon size={32} color="white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4 font-['Poppins'] group-hover:text-[#4a7dff] transition-colors duration-300">
                  {solution.title}
                </h3>

                <p className="text-gray-600 leading-relaxed font-['Poppins'] mb-6">
                  {solution.desc}
                </p>

                <ul className="flex flex-col gap-3 mt-auto">
                  {solution.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-2 text-gray-600 font-['Poppins'] font-medium text-lg"
                    >
                      <CheckCircle
                        size={18}
                        className="text-green-500 flex-shrink-0"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - White */}
      <section
        ref={addToRefs}
        className="py-20 bg-white relative opacity-0 translate-y-8 transition-all duration-700"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#4a7dff] via-[#3a6df0] to-[#4a7dff] bg-clip-text text-transparent font-['Poppins'] relative inline-block">
              Our Achievements
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-16 leading-relaxed font-['Poppins']">
              Numbers that speak about our commitment to excellence and client
              satisfaction
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-[#1a2b4d] to-[#152547] text-center p-12 rounded-2xl border border-[#2d3b5b] transition-all duration-400 hover:-translate-y-2 hover:scale-105 hover:border-[#4a7dff] hover:shadow-2xl hover:shadow-blue-500/15 min-h-[200px] flex flex-col justify-center items-center relative overflow-hidden group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4a7dff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>

                  <div className="relative z-10 w-full">
                    <span className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-br from-[#4a7dff] via-[#3a6df0] to-[#4a7dff] bg-clip-text text-transparent font-['Poppins'] block leading-none">
                      {stat.number}
                    </span>
                    <span className="text-xl text-gray-300 font-semibold font-['Poppins'] block leading-relaxed">
                      {stat.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Blue */}
      <section
        ref={addToRefs}
        className="py-20 bg-gradient-to-br from-[#0d1933] to-[#1a2b4d] relative overflow-hidden opacity-0 translate-y-8 transition-all duration-700"
      >
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-radial-gradient from-white/10 to-transparent animate-spin-medium"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white font-['Poppins'] leading-tight">
              Ready to Start Your Project?
            </h2>

            <p className="text-xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed font-['Poppins']">
              Let's discuss your e-commerce development needs and create
              something amazing together
            </p>

            <Link
              to="/contact"
              className="relative bg-white text-[#4a7dff] text-lg px-10 py-6 rounded-xl font-semibold inline-flex items-center gap-2 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group mx-auto"
            >
              <span className="relative z-10">Get Started Today</span>
              <ArrowRight size={20} className="relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4a7dff]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes fade-in-up {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(74, 125, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(58, 109, 240, 0.5);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-medium {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-gradient-shift {
          animation: gradient-shift 3s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.8s forwards;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-medium {
          animation: spin-medium 15s linear infinite;
        }

        .bg-radial-gradient {
          background: radial-gradient(
            circle,
            var(--tw-gradient-from) 0%,
            var(--tw-gradient-to) 70%
          );
        }
      `}</style>
    </>
  );
};

export default Ecommerce;
