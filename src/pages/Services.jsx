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
import "./Services.css";

const Services = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
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
      link: "/services/web-development", // Unique link for web development
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
      link: "/services/mobile-development", // Unique link for mobile development
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
      link: "/services/ui-ux-design", // Unique link for UI/UX design
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
      link: "/services/ecommerce-solutions", // Unique link for e-commerce
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
      link: "/services/software-testing", // Unique link for testing
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
      link: "/services/cloud-devops", // Unique link for cloud & devops
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
      link: "/services/ai-automation", // Unique link for AI & automation
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
      </Helmet>

      {/* Hero Section */}
      <section className="services-hero-section">
        <div className="services-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="services-hero-content"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="services-hero-title"
            >
              Our Services
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="services-hero-subtitle"
            >
              Comprehensive digital solutions to transform your business. From
              concept to deployment, we deliver excellence at every step.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Content Section */}
      <section ref={addToRefs} className="services-content-section">
        <div className="services-container">
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`services-item ${
                  index % 2 === 1 ? "services-item-reverse" : ""
                } services-scroll-reveal`}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div
                  variants={itemVariants}
                  className="services-content"
                >
                  <div className="services-icon-container">
                    <service.icon className="text-white" size={24} />
                  </div>
                  <h2 className="services-title">{service.title}</h2>
                  <p className="services-description">{service.desc}</p>

                  <div className="services-features-grid">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="services-feature">
                        <CheckCircle
                          className="services-feature-icon"
                          size={20}
                        />
                        <span className="services-feature-text">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Updated Link with unique route for each service */}
                  <Link to={service.link}>
                    <button className="services-button">
                      Get Started
                      <ArrowRight size={20} />
                    </button>
                  </Link>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="services-image-container"
                >
                  <img
                    alt={service.title}
                    className="services-image"
                    src={service.image}
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                      e.target.alt = "Service placeholder image";
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={addToRefs} className="services-process-section">
        <div className="services-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="services-section-header"
          >
            <h2 className="services-section-title">Our Development Process</h2>
            <p className="services-section-description">
              A proven methodology for successful project delivery
            </p>
          </motion.div>

          <div className="services-process-container">
            <div className="services-process-line"></div>

            <motion.div
              className="services-process-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="services-process-card services-scroll-reveal"
                >
                  <div className="services-process-icon">{step.icon}</div>
                  <h3 className="services-process-title">{step.title}</h3>
                  <p className="services-process-description">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={addToRefs} className="services-cta-section">
        <div className="services-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="services-cta-title">Ready to Start Your Project?</h2>
            <p className="services-cta-description">
              Let's discuss how we can help bring your vision to life with our
              expert services
            </p>
            <Link to="/contact">
              <button className="services-cta-button">
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
