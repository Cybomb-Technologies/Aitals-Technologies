import React, { useEffect, useRef } from "react";
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
} from "lucide-react";
import "./Web-dev.css";

const WebDev = () => {
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

  const features = [
    {
      icon: Globe,
      title: "Responsive Design",
      desc: "Perfectly optimized for all devices - desktop, tablet, and mobile",
    },
    {
      icon: Zap,
      title: "High Performance",
      desc: "Lightning-fast load times and optimized user experience",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      desc: "Enterprise-grade security with regular updates and maintenance",
    },
    {
      icon: Database,
      title: "Scalable Architecture",
      desc: "Built to grow with your business and handle increasing traffic",
    },
    {
      icon: Smartphone,
      title: "Progressive Web Apps",
      desc: "Native app-like experience with web technology",
    },
    {
      icon: Users,
      title: "User-Centric Approach",
      desc: "Intuitive interfaces designed with your users in mind",
    },
  ];

  const technologies = [
    {
      category: "Frontend",
      items: ["React.js", "Next.js", "Vue.js", "Angular", "TypeScript"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Python", "PHP", "Java", ".NET"],
    },
    {
      category: "Database",
      items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD"],
    },
  ];

  const process = [
    {
      number: "01",
      title: "Discovery & Planning",
      desc: "We analyze your requirements and create a detailed project roadmap",
    },
    {
      number: "02",
      title: "Design & Prototyping",
      desc: "Create stunning UI/UX designs and interactive prototypes",
    },
    {
      number: "03",
      title: "Development",
      desc: "Agile development with regular updates and testing",
    },
    {
      number: "04",
      title: "Testing & QA",
      desc: "Comprehensive testing across all devices and browsers",
    },
    {
      number: "05",
      title: "Deployment",
      desc: "Smooth deployment with zero downtime and full support",
    },
    {
      number: "06",
      title: "Maintenance",
      desc: "Ongoing support, updates, and performance optimization",
    },
  ];

  const solutions = [
    {
      icon: ShoppingCart,
      title: "E-Commerce Solutions",
      desc: "Complete online store development with payment integration",
      features: ["Payment Gateway", "Inventory Management", "Order Tracking"],
    },
    {
      icon: BarChart,
      title: "Business Applications",
      desc: "Custom web applications to streamline your business operations",
      features: ["Dashboard Analytics", "CRM Integration", "Real-time Data"],
    },
    {
      icon: MessageCircle,
      title: "Web Portals",
      desc: "Feature-rich portals for customers, employees, and partners",
      features: ["User Management", "Content Management", "Multi-language"],
    },
    {
      icon: Palette,
      title: "Custom Websites",
      desc: "Unique, brand-focused websites that drive engagement",
      features: ["SEO Optimized", "Fast Loading", "Mobile Responsive"],
    },
  ];

  const stats = [
    { number: "200+", label: "Projects Completed" },
    { number: "99%", label: "Client Satisfaction" },
    { number: "50+", label: "Team Members" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <>
      <Helmet>
        <title>Web Development Services | Modern Web Solutions</title>
        <meta
          name="description"
          content="Professional web development services with cutting-edge technologies. Responsive, secure, and scalable web solutions for your business."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      {/* Hero Section - Blue */}
      <section className="webdev-hero-section">
        <div className="webdev-hero-content">
          <motion.h1
            className="webdev-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Modern Web
            <span className="webdev-hero-accent">Development</span>
            Solutions
          </motion.h1>
          <motion.p
            className="webdev-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We build cutting-edge web applications that drive business growth
            and deliver exceptional user experiences
          </motion.p>
          <motion.div
            className="webdev-hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/contact" className="webdev-primary-button">
              Start Your Project <ArrowRight size={20} />
            </Link>
            <Link to="/portfolio" className="webdev-secondary-button">
              View Our Work
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section - White */}
      <section
        ref={addToRefs}
        className="webdev-section webdev-features-section webdev-scroll-reveal"
      >
        <div className="webdev-container">
          <div className="webdev-section-header">
            <h2 className="webdev-section-title">Why Choose Our Services</h2>
            <p className="webdev-section-description">
              We combine technical expertise with creative design to deliver web
              solutions that exceed expectations
            </p>
          </div>
          <div className="webdev-features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="webdev-feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="webdev-feature-icon">
                  <feature.icon size={32} color="white" />
                </div>
                <h3 className="webdev-feature-title">{feature.title}</h3>
                <p className="webdev-feature-description">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section - Blue */}
      <section
        ref={addToRefs}
        className="webdev-section webdev-tech-section webdev-scroll-reveal"
      >
        <div className="webdev-container">
          <div className="webdev-section-header">
            <h2 className="webdev-section-title">Technologies We Use</h2>
            <p className="webdev-section-description">
              We leverage the latest technologies and frameworks to build robust
              and scalable web applications
            </p>
          </div>
          <div className="webdev-tech-grid">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                className="webdev-tech-card"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="webdev-tech-category">{tech.category}</h3>
                <div className="webdev-tech-items">
                  {tech.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="webdev-tech-item">
                      <CheckCircle size={18} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - White */}
      <section
        ref={addToRefs}
        className="webdev-section webdev-process-section webdev-scroll-reveal"
      >
        <div className="webdev-container">
          <div className="webdev-section-header">
            <h2 className="webdev-section-title">Our Development Process</h2>
            <p className="webdev-section-description">
              A structured approach that ensures quality, transparency, and
              timely delivery of your project
            </p>
          </div>
          <div className="webdev-process-grid">
            {process.map((step, index) => (
              <motion.div
                key={index}
                className="webdev-process-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="webdev-process-number">{step.number}</div>
                <h3 className="webdev-process-title">{step.title}</h3>
                <p className="webdev-process-description">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section - Blue */}
      <section
        ref={addToRefs}
        className="webdev-section webdev-solutions-section webdev-scroll-reveal"
      >
        <div className="webdev-container">
          <div className="webdev-section-header">
            <h2 className="webdev-section-title">Our Solutions</h2>
            <p className="webdev-section-description">
              Comprehensive web development services tailored to your specific
              business needs
            </p>
          </div>
          <div className="webdev-solutions-grid">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                className="webdev-solution-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="webdev-solution-icon">
                  <solution.icon size={32} color="white" />
                </div>
                <h3 className="webdev-solution-title">{solution.title}</h3>
                <p className="webdev-solution-description">{solution.desc}</p>
                <ul className="webdev-solution-features">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="webdev-solution-feature">
                      <CheckCircle size={18} />
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
        className="webdev-section webdev-stats-section webdev-scroll-reveal"
      >
        <div className="webdev-container">
          <div className="webdev-stats-content">
            <h2 className="webdev-stats-title">Our Achievements</h2>
            <p className="webdev-stats-description">
              Numbers that speak about our commitment to excellence and client
              satisfaction
            </p>
            <div className="webdev-stats-grid">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="webdev-stat-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="webdev-stat-content">
                    <span className="webdev-stat-number">{stat.number}</span>
                    <span className="webdev-stat-label">{stat.label}</span>
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
        className="webdev-section webdev-cta-section webdev-scroll-reveal"
      >
        <div className="webdev-container">
          <div className="webdev-section-header">
            <h2 className="webdev-cta-title">Ready to Start Your Project?</h2>
            <p className="webdev-cta-description">
              Let's discuss your web development needs and create something
              amazing together
            </p>
            <Link to="/contact" className="webdev-cta-button">
              Get Started Today <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default WebDev;
