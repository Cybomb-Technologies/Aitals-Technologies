import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code,
  Smartphone,
  Palette,
  ShoppingCart,
  TestTube,
  Cloud,
  Brain,
  CheckCircle,
} from "lucide-react";

const Services = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-12");
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

  const services = [
    {
      icon: Code,
      title: "Custom Web Development",
      desc: "Build powerful, scalable web applications tailored to your business needs. We create responsive, high-performance websites using cutting-edge technologies that drive results and enhance user engagement.",
      features: [
        "React & Next.js",
        "Node.js Backend",
        "RESTful APIs",
        "Progressive Web Apps",
      ],
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      link: "/services/web-development",
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      desc: "Native iOS and Android applications with seamless user experiences. We build intuitive, high-performance mobile apps that engage users and deliver exceptional value across all platforms.",
      features: [
        "React Native",
        "Flutter",
        "Native iOS/Android",
        "Cross-platform Solutions",
      ],
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      link: "/services/mobile-development",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      desc: "Beautiful, intuitive designs that users love and convert. Our design process focuses on creating engaging, user-centric interfaces that drive conversions and enhance user satisfaction.",
      features: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "Design Systems",
      ],
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      link: "/services/ui-ux-design",
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Solutions",
      desc: "Complete online store solutions with payment integration. We build scalable e-commerce platforms that drive sales, enhance customer experience, and grow your online business.",
      features: [
        "Shopify Development",
        "WooCommerce",
        "Custom Platforms",
        "Payment Gateways",
      ],
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      link: "/services/ecommerce",
    },
    {
      icon: TestTube,
      title: "Software Testing & Maintenance",
      desc: "Comprehensive QA and ongoing support for your applications. Ensure your software runs flawlessly with our rigorous testing protocols and reliable maintenance services.",
      features: [
        "Automated Testing",
        "Manual QA",
        "Performance Testing",
        "24/7 Support",
      ],
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      link: "/services/software-testing",
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps Services",
      desc: "Scalable cloud infrastructure and continuous deployment. Optimize your development workflow and ensure reliable, scalable deployment with our expert DevOps solutions.",
      features: [
        "AWS/Azure/GCP",
        "CI/CD Pipelines",
        "Docker & Kubernetes",
        "Infrastructure as Code",
      ],
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      link: "/services/cloud-devops",
    },
    {
      icon: Brain,
      title: "AI & Automation Integration",
      desc: "Intelligent solutions powered by machine learning and AI. Transform your business operations with cutting-edge AI technologies that automate processes and provide valuable insights.",
      features: [
        "Machine Learning",
        "Natural Language Processing",
        "Chatbots",
        "Process Automation",
      ],
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      link: "/services/ai-automation",
    },
  ];

  const processSteps = [
    {
      title: "Discovery",
      desc: "Understanding your vision and requirements",
      icon: "🔍",
    },
    {
      title: "Design",
      desc: "Creating beautiful, functional designs",
      icon: "🎨",
    },
    {
      title: "Development",
      desc: "Building with cutting-edge technology",
      icon: "⚙️",
    },
    {
      title: "Deployment",
      desc: "Launching your product to the world",
      icon: "🚀",
    },
    { title: "Support", desc: "Ongoing maintenance and updates", icon: "🛠️" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>
          Our Services - Aitals Technologies | Web & Mobile Development
        </title>
        <meta
          name="description"
          content="Comprehensive software development services including web development, mobile apps, UI/UX design, cloud solutions, and AI integration."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0d1933] to-[#1a2b4d] pt-32 pb-14">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(13, 25, 51, 0.4), rgba(13, 25, 51, 0.95)), url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80")`,
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

        <div className="relative z-10 text-center w-full px-4">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-white font-['Poppins'] drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Services
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-gray-200 leading-relaxed font-['Poppins'] font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Comprehensive digital solutions to transform your business. From
            concept to deployment, we deliver excellence at every step.
          </motion.p>
        </div>
      </section>

      {/* Services Content Section */}
      <section
        ref={addToRefs}
        className="py-20 bg-white opacity-0 translate-y-12 transition-all duration-700"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 lg:p-16 shadow-xl border border-white/90 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/25 hover:border-blue-500/10 hover:bg-gradient-to-br hover:from-white hover:to-blue-50/30 relative overflow-hidden group ${
                  index % 2 === 0 ? "" : "lg:flex-row-reverse"
                }`}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                  {/* Content */}
                  <motion.div
                    variants={itemVariants}
                    className={`space-y-6 relative z-10 ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    {/* Icon Container */}
                    <div className="w-20 h-20 bg-gradient-to-br from-[#4a7dff] to-[#3a6df0] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 animate-pulse transition-all duration-400 group-hover:scale-110 group-hover:rotate-5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>
                      <service.icon className="text-white" size={24} />
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-br from-[#4a7dff] via-[#3a6df0] to-[#2a5de0] bg-clip-text text-transparent font-['Poppins'] leading-tight relative inline-block">
                      {service.title}
                      <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full transition-all duration-400 group-hover:w-24"></div>
                    </h2>

                    {/* Description */}
                    <p className="text-lg text-gray-600 leading-relaxed font-['Poppins'] transition-colors duration-300 group-hover:text-gray-700">
                      {service.desc}
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl bg-white/70 transition-all duration-300 hover:bg-white hover:border hover:border-blue-500/20 hover:translate-x-1 group/feature"
                        >
                          <CheckCircle
                            className="text-green-500 mt-0.5 flex-shrink-0 transition-all duration-300 group-hover/feature:scale-110 group-hover/feature:text-green-600"
                            size={20}
                          />
                          <span className="text-gray-700 font-medium font-['Poppins'] transition-colors duration-300 group-hover/feature:text-gray-900">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Button */}
                    <Link to={service.link}>
                      <button className="bg-gradient-to-br from-[#4a7dff] to-[#3a6df0] text-white text-lg px-10 py-5 rounded-2xl font-semibold transition-all duration-400 hover:from-[#3a6df0] hover:to-[#2a5de0] hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40 shadow-lg shadow-blue-500/25 font-['Poppins'] inline-flex items-center gap-3 relative overflow-hidden group/button">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-600"></div>
                        Get Started
                        <ArrowRight size={20} />
                      </button>
                    </Link>
                  </motion.div>

                  {/* Image */}
                  <motion.div
                    variants={itemVariants}
                    className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-500/10 border border-white/90 transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105 group-hover:shadow-3xl group-hover:shadow-blue-500/20 aspect-[4/3]"
                  >
                    <img
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110 brightness-95 contrast-105 group-hover:brightness-100 group-hover:contrast-110"
                      src={service.image}
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                        e.target.alt = "Service placeholder image";
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        ref={addToRefs}
        className="py-20 bg-gradient-to-br from-gray-50 to-gray-200 opacity-0 translate-y-12 transition-all duration-700"
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#4a7dff] via-[#3a6df0] to-[#4a7dff] bg-clip-text text-transparent font-['Poppins'] relative inline-block">
              Our Development Process
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              A proven methodology for successful project delivery
            </p>
          </motion.div>

          {/* Process Container */}
          <div className="relative">
            {/* Process Line - Hidden on mobile */}
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] transform -translate-y-1/2 hidden lg:block"></div>

            {/* Process Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center transition-all duration-400 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 hover:border-[#4a7dff] relative overflow-hidden group font-['Poppins']"
                >
                  {/* Top border animation */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"></div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4a7dff] to-[#3a6df0] rounded-full flex items-center justify-center text-white text-2xl mb-6 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-360">
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 font-['Poppins']">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-sm font-['Poppins']">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={addToRefs}
        className="py-20 bg-gradient-to-br from-[#0d1933] to-[#1a2b4d] text-center opacity-0 translate-y-12 transition-all duration-700 relative overflow-hidden"
      >
        {/* Background Animation */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(74, 125, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(58, 109, 240, 0.1) 0%, transparent 50%)
            `,
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Title */}
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#4a7dff] via-[#3a6df0] to-[#4a7dff] bg-clip-text text-transparent font-['Poppins'] leading-tight">
              Ready to Start Your Project?
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed font-['Poppins']">
              Let's discuss how we can help bring your vision to life with our
              expert services
            </p>

            {/* Button */}
            <Link to="/contact">
              <button className="bg-gradient-to-br from-[#4a7dff] to-[#3a6df0] text-white text-lg px-12 py-6 rounded-2xl font-bold transition-all duration-400 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40 shadow-lg shadow-blue-500/25 font-['Poppins'] inline-flex items-center gap-3 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                Let's Build Your Next Big Thing
                <ArrowRight size={20} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
