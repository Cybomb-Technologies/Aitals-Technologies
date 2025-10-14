import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code,
  Smartphone,
  Palette,
  Cloud,
  Brain,
  Shield,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";
import "./Home.css";

const Home = () => {
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
      title: "Web Development",
      desc: "Custom websites built with cutting-edge technologies for optimal performance and user experience",
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      desc: "Native iOS & Android applications that deliver seamless mobile experiences",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      desc: "Beautiful, user-centric design solutions that drive engagement and conversions",
    },
    {
      icon: Cloud,
      title: "Cloud Integration",
      desc: "Scalable cloud infrastructure & DevOps solutions for modern businesses",
    },
    {
      icon: Brain,
      title: "AI Solutions",
      desc: "Intelligent automation & machine learning to transform your operations",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      desc: "Comprehensive testing & maintenance ensuring flawless performance",
    },
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: "Quality Excellence",
      desc: "Industry-leading standards with rigorous quality assurance processes",
    },
    {
      icon: Users,
      title: "Expert Team",
      desc: "50+ skilled developers, designers, and project managers",
    },
    {
      icon: TrendingUp,
      title: "24/7 Support",
      desc: "Round-the-clock technical assistance and maintenance services",
    },
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Healthcare App",
      category: "Mobile Development",
      image:
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Finance Dashboard",
      category: "UI/UX Design",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "AI Chatbot",
      category: "AI Solutions",
      image:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
  ];

  const stats = [
    {
      number: "500+",
      label: "Projects Delivered",
    },
    {
      number: "50+",
      label: "Countries Served",
    },
    {
      number: "98%",
      label: "Client Satisfaction",
    },
    {
      number: "24/7",
      label: "Support Available",
    },
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
          Aitals Technologies - Innovating Ideas Into Digital Excellence
        </title>
        <meta
          name="description"
          content="Leading software and web development company specializing in custom mobile apps, website design, and digital solutions. Transform your ideas into reality."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="home-hero-section">
        <div className="home-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="home-hero-content"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="home-hero-title"
            >
              Innovating Ideas Into
              <span className="home-hero-accent">Digital Excellence</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="home-hero-subtitle"
            >
              We transform your vision into powerful digital solutions with
              cutting-edge technology and creative innovation. Your trusted
              partner for web development, mobile apps, and custom software
              solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="home-hero-buttons"
            >
              <Link to="/contact">
                <button className="home-primary-button">
                  Start Your Project
                  <ArrowRight size={20} />
                </button>
              </Link>
              <Link to="/portfolio">
                <button className="home-secondary-button">View Our Work</button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={addToRefs} className="home-section home-services-section">
        <div className="home-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="home-section-header"
          >
            <h2 className="home-section-title">Our Services</h2>
            <p className="home-section-description">
              Comprehensive digital solutions tailored to your business needs.
              From concept to deployment, we deliver excellence in every
              project.
            </p>
          </motion.div>

          <motion.div
            className="home-services-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="home-service-card home-scroll-reveal"
              >
                <div className="home-service-icon">
                  <service.icon className="text-white" size={24} />
                </div>
                <h3 className="home-service-title">{service.title}</h3>
                <p className="home-service-description">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={addToRefs} className="home-section home-why-choose-section">
        <div className="home-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="home-section-header"
          >
            <h2 className="home-section-title">Why Choose Aitals</h2>
            <p
              className="home-section-description"
              style={{ color: "#6b7280" }}
            >
              We combine technical expertise with business understanding to
              deliver solutions that drive real results
            </p>
          </motion.div>

          <motion.div
            className="home-features-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="home-feature-card home-scroll-reveal"
              >
                <div className="home-feature-icon">
                  <item.icon size={24} />
                </div>
                <h3 className="home-feature-title">{item.title}</h3>
                <p className="home-feature-description">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={addToRefs} className="home-section home-projects-section">
        <div className="home-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="home-section-header"
          >
            <h2 className="home-section-title">Featured Projects</h2>
            <p className="home-section-description">
              Explore our portfolio of successful projects across various
              industries and technologies
            </p>
          </motion.div>

          <motion.div
            className="home-projects-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="home-project-card home-scroll-reveal"
              >
                <img
                  alt={project.title}
                  className="home-project-image"
                  src={project.image}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                    e.target.alt = "Project placeholder image";
                  }}
                />
                <div className="home-project-overlay">
                  <span className="home-project-category">
                    {project.category}
                  </span>
                  <h3 className="home-project-name">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="home-view-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/portfolio">
              <button className="home-view-all-button">
                View All Projects
                <ArrowRight size={20} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={addToRefs} className="home-section home-stats-section">
        <div className="home-container">
          <div className="home-stats-content">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="home-stats-title">Trusted by Global Clients</h2>
              <p className="home-stats-description">
                We've delivered successful projects to clients across USA,
                Europe, Asia, and beyond. Our commitment to excellence has made
                us a preferred technology partner worldwide.
              </p>

              <motion.div
                className="home-stats-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="home-stat-card home-scroll-reveal"
                  >
                    <div className="home-stat-number">{stat.number}</div>
                    <div className="home-stat-label">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={addToRefs} className="home-section home-cta-section">
        <div className="home-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="home-cta-title">
              Ready to Transform Your Idea Into Reality?
            </h2>
            <p className="home-cta-description">
              Let's collaborate and build something extraordinary together. Your
              next big thing starts here with Aitals Technologies.
            </p>
            <Link to="/contact">
              <button className="home-cta-button">
                Start Your Project Today
                <ArrowRight size={20} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
