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

const Home = () => {
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

  // Preload hero image
  useEffect(() => {
    const preloadHeroImage = () => {
      const img = new Image();
      img.src =
        "https://images.pexels.com/photos/16323581/pexels-photo-16323581.jpeg?_gl=1*f2b7lv*_ga*MTUzMTEwMTY5NS4xNzU0MjA1MjMx*_ga_8JE65Q40S6*czE3NjAzNDQwNDAkbzEzJGcxJHQxNzYwMzQ0MDgyJGoxOCRsMCRoMA..";
    };

    preloadHeroImage();
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
      title: "Software Testing",
      desc: "Rigorous testing processes to ensure reliability, performance, and bug-free software delivery",
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
      title: "Fintech Platform",
      category: "Web Development",
      image:
        "https://st.depositphotos.com/1006472/3528/i/450/depositphotos_35289079-stock-photo-golden-coin-stack-on-dark.jpg",
      link: "/portfolio/Fintech/index.html",
    },
    {
      title: "Healthcare App",
      category: "Mobile Development",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      link: "/portfolio/Healthcare/index.html",
    },
    {
      title: "E-Learning Platform",
      category: "UI/UX Design",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf10vpJrsm7IbNaiXd5NOynH9nBjr5jsTU-g&s",
      link: "/portfolio/E-Learning/index.html",
    },
    {
      title: "Fitness Tracker",
      category: "AI Solutions",
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5",
      link: "/portfolio/Fitness/index.html",
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

  // Map services to their respective routes
  const getServiceRoute = (title) => {
    const routeMap = {
      "Web Development": "/services/web-development",
      "Mobile Apps": "/services/mobile-development",
      "UI/UX Design": "/services/ui-ux-design",
      "Cloud Integration": "/services/cloud-devops",
      "AI Solutions": "/services/ai-automation",
      "Software Testing": "/services/software-testing",
    };
    return routeMap[title] || "/services";
  };

  // Function to handle project click - opens in new tab for external HTML files
  const handleProjectClick = (link) => {
    window.open(link, "_blank");
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
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Preload hero image */}
        <link
          rel="preload"
          href="https://images.pexels.com/photos/16323581/pexels-photo-16323581.jpeg?_gl=1*f2b7lv*_ga*MTUzMTEwMTY5NS4xNzU0MjA1MjMx*_ga_8JE65Q40S6*czE3NjAzNDQwNDAkbzEzJGcxJHQxNzYwMzQ0MDgyJGoxOCRsMCRoMA.."
          as="image"
        />
        <style>
          {`
            body {
              background-color: #0d1933;
              font-family: 'Poppins', sans-serif;
            }
          `}
        </style>
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d1933] pt-32 pb-20">
        {/* Solid Background First */}
        <div className="absolute inset-0 bg-[#0d1933]"></div>

        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1933] via-[#0d1933] to-[#1a2b4d]"></div>

        {/* Background Image with Overlay - Preloaded and immediately visible */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(13, 25, 51, 0.4), rgba(13, 25, 51, 0.95)), url("https://images.pexels.com/photos/16323581/pexels-photo-16323581.jpeg?_gl=1*f2b7lv*_ga*MTUzMTEwMTY5NS4xNzU0MjA1MjMx*_ga_8JE65Q40S6*czE3NjAzNDQwNDAkbzEzJGcxJHQxNzYwMzQ0MDgyJGoxOCRsMCRoMA..")`,
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
            Innovating Ideas Into
            <span className="block mt-4 bg-gradient-to-r from-[#4a7dff] via-[#3a6df0] to-[#4a7dff] bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-shift font-['Poppins']">
              Digital Excellence
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-gray-200 leading-relaxed font-['Poppins'] font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We transform your vision into powerful digital solutions with
            cutting-edge technology and creative innovation. Your trusted
            partner for web development, mobile apps, and custom software
            solutions.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              to="/services"
              className="relative bg-[#4a7dff] text-white text-lg px-8 py-6 rounded-xl font-semibold flex items-center gap-2 min-w-[220px] justify-center overflow-hidden transition-all duration-300 hover:bg-[#3a6df0] hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30 group"
            >
              <span className="relative z-10">Our Services</span>
              <ArrowRight size={20} className="relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </Link>

            <Link
              to="/portfolio"
              className="relative bg-transparent text-white text-lg px-8 py-6 rounded-xl font-semibold border-2 border-[#4a7dff] flex items-center gap-2 min-w-[180px] justify-center overflow-hidden transition-all duration-300 hover:bg-[#4a7dff]/10 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/20 group font-['Poppins']"
            >
              <span className="relative z-10">View Our Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4a7dff]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section
        ref={addToRefs}
        className="py-20 bg-[#0d1933] relative overflow-hidden opacity-0 translate-y-12 transition-all duration-700"
      >
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-radial-gradient from-[#4a7dff]/3 to-transparent animate-spin-slow"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#4a7dff] via-[#3a6df0] to-[#4a7dff] bg-clip-text text-transparent font-['Poppins'] relative inline-block">
              Our Services
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              Comprehensive digital solutions tailored to your business needs.
              From concept to deployment, we deliver excellence in every
              project.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => {
              const serviceRoute = getServiceRoute(service.title);

              return (
                <Link to={serviceRoute} key={index}>
                  <motion.div
                    variants={itemVariants}
                    className="bg-white p-10 rounded-2xl border border-gray-200 transition-all duration-400 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 hover:border-[#4a7dff] relative overflow-hidden group flex flex-col h-full font-['Poppins'] cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4a7dff]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>

                    <div className="flex justify-between items-start mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#4a7dff] to-[#3a6df0] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 animate-pulse-glow">
                        <service.icon size={24} color="white" />
                      </div>

                      {/* Arrow Icon */}
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#4a7dff] group-hover:text-white transition-all duration-300">
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-0.5 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-4 font-['Poppins'] group-hover:text-[#4a7dff] transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed font-['Poppins'] flex-grow">
                      {service.desc}
                    </p>

                    {/* Click hint text */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500 font-medium group-hover:text-[#4a7dff] transition-colors duration-300 flex items-center gap-1">
                        Learn more
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        ref={addToRefs}
        className="py-20 bg-white relative opacity-0 translate-y-12 transition-all duration-700"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#4a7dff] via-[#3a6df0] to-[#4a7dff] bg-clip-text text-transparent font-['Poppins'] relative inline-block">
              Why Choose Aitals
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              We combine technical expertise with business understanding to
              deliver solutions that drive real results
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-[#1a2b4d] to-[#152547] p-12 rounded-2xl text-center shadow-xl transition-all duration-400 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 hover:border-[#4a7dff] border border-[#2d3b5b] relative overflow-hidden group font-['Poppins']"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"></div>

                <div className="w-20 h-20 bg-gradient-to-br from-[#4a7dff] to-[#3a6df0] rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-360 transition-all duration-300">
                  <item.icon size={24} color="white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-100 mb-4 font-['Poppins']">
                  {item.title}
                </h3>

                <p className="text-gray-300 leading-relaxed font-['Poppins']">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        ref={addToRefs}
        className="py-20 bg-[#0d1933] relative opacity-0 translate-y-12 transition-all duration-700"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#4a7dff] via-[#3a6df0] to-[#4a7dff] bg-clip-text text-transparent font-['Poppins'] relative inline-block">
              Featured Projects
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              Explore our portfolio of successful projects across various
              industries and technologies
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-400 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40 aspect-[3/4] w-full group cursor-pointer"
                onClick={() => handleProjectClick(project.link)}
              >
                <img
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
                  src={project.image}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                    e.target.alt = "Project placeholder image";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1933]/95 to-transparent flex flex-col justify-end p-8 opacity-100 group-hover:from-[#0d1933]/98 group-hover:to-transparent group-hover:to-60%">
                  <span className="text-[#4a7dff] text-sm font-semibold mb-2 uppercase tracking-wider font-['Poppins'] opacity-100">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white leading-tight font-['Poppins'] opacity-100">
                    {project.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-sm font-medium">
                      View Project
                    </span>
                    <ArrowRight size={16} className="text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/portfolio"
              className="relative bg-gradient-to-br from-[#4a7dff] to-[#3a6df0] text-white text-lg px-10 py-5 rounded-xl font-semibold inline-flex items-center gap-2 overflow-hidden transition-all duration-400 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40 group font-['Poppins']"
            >
              <span className="relative z-10">View All Projects</span>
              <ArrowRight size={20} className="relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - UPDATED FOR BETTER RESPONSIVENESS */}
      <section
        ref={addToRefs}
        className="py-20 bg-white relative opacity-0 translate-y-12 transition-all duration-700"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#4a7dff] via-[#3a6df0] to-[#4a7dff] bg-clip-text text-transparent font-['Poppins'] relative inline-block">
                Trusted by Global Clients
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-16 leading-relaxed font-['Poppins']">
                We've delivered successful projects to clients across USA,
                Europe, Asia, and beyond. Our commitment to excellence has made
                us a preferred technology partner worldwide.
              </p>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl transition-all duration-400 hover:-translate-y-2 hover:border-[#4a7dff] hover:shadow-2xl hover:shadow-blue-500/15 min-h-[180px] flex flex-col justify-center items-center relative overflow-hidden group font-['Poppins']"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4a7dff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>

                    <div className="relative z-10 w-full text-center space-y-3">
                      <span className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-br from-[#4a7dff] via-[#3a6df0] to-[#4a7dff] bg-clip-text text-transparent font-['Poppins'] block leading-none group-hover:scale-110 transition-transform duration-300">
                        {stat.number}
                      </span>
                      <span className="text-lg md:text-xl text-gray-600 font-semibold font-['Poppins'] block leading-tight group-hover:text-[#4a7dff] transition-colors duration-300 px-2 break-words">
                        {stat.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={addToRefs}
        className="py-20 bg-gradient-to-br from-[#0d1933] to-[#1a2b4d] relative overflow-hidden opacity-0 translate-y-12 transition-all duration-700"
      >
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
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#4a7dff] via-[#3a6df0] to-[#4a7dff] bg-clip-text text-transparent font-['Poppins'] leading-tight">
              Ready to Transform Your Idea Into Reality?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed font-['Poppins']">
              Let's collaborate and build something extraordinary together. Your
              next big thing starts here with Aitals Technologies.
            </p>
            <Link
              to="/contact"
              className="relative bg-gradient-to-br from-[#4a7dff] to-[#3a6df0] text-white text-lg px-10 py-6 rounded-xl font-bold inline-flex items-center gap-2 overflow-hidden transition-all duration-400 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 group font-['Poppins']"
            >
              <span className="relative z-10">Start Your Project Today</span>
              <ArrowRight size={20} className="relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </Link>
          </motion.div>
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

        .animate-gradient-shift {
          animation: gradient-shift 3s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
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

export default Home;
