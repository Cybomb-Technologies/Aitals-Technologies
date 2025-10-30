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
  Play,
  CheckCircle,
} from "lucide-react";
import Metatags from "../SEO/metatags";
const Home = () => {
  const logos = [
    "https://res.cloudinary.com/duomzq5mm/image/upload/v1761200939/microsoft-5_z1f1q9.svg",
    "https://res.cloudinary.com/duomzq5mm/image/upload/v1761201009/Zoho-logo_ggtqnk.png",
    "https://res.cloudinary.com/duomzq5mm/image/upload/v1761201062/aws-2_whii9k.svg",
    "https://res.cloudinary.com/duomzq5mm/image/upload/v1761201134/djit-trading-DY90WfDK_kbwf1d.png",
    "https://res.cloudinary.com/duomzq5mm/image/upload/v1761220634/cybomb_logo_cf2edt.jpg",
    "https://res.cloudinary.com/dcfjt8shw/image/upload/v1761297491/j4q6qjzlm93uirax0l6f.png",
    "https://res.cloudinary.com/dcfjt8shw/image/upload/v1761288318/wn8m8g8skdpl6iz2rwoa.svg",
  ];

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

  // Preload hero background image
  useEffect(() => {
    const preloadHeroImage = () => {
      const img = new Image();
      img.src =
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
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
      link: "https://fintech.aitals.com/",
    },
    {
      title: "Healthcare App",
      category: "Mobile Development",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      link: "https://healthcare.aitals.com/",
    },
    {
      title: "E-Learning Platform",
      category: "UI/UX Design",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf10vpJrsm7IbNaiXd5NOynH9nBjr5jsTU-g&s",
      link: "https://elearning.aitals.com/",
    },
    {
      title: "Fitness Tracker",
      category: "AI Solutions",
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5",
      link: "https://fitness.aitals.com/",
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

  const features = [
    "Custom Software",
    "Agile Methodology",
    "Dedicated Project",
    "Quality Assurance",
    "Timely Delivery",
    "Competitive Pricing",
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

  const metaPropsData = {
    title: "Mobile App and Web Development in Chennai | Aitals Technologies",
    description:
      "Aitals Technologies is a top IT company offering expert web development, mobile app development, UI/UX design, and digital solutions for startups and enterprises.",
    keyword:
      "Aitals Technologies, Web Development, Mobile App Development, UI UX Design, React Developer, Chennai IT Company, Software Services India",
    url: "https://aitals.com/",
    image: "https://aitals.com/assets/logo-B8Q2-6qZ.png",
  };

  return (
    <>
      <Metatags metaProps={metaPropsData} />
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Preload hero background image */}
        <link
          rel="preload"
          href="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
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

      {/* Hero Section - UPDATED WITHOUT ANIMATIONS */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d1933] pt-16">
        {/* Background Image with Overlay - Fixed position for proper scroll */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("https://res.cloudinary.com/dxw7zv8dr/image/upload/v1761638435/Desktop_-_14_wfb3pa.png")`,
          }}
        ></div>

        <div className="relative z-10 text-center w-full px-4 max-w-7xl mx-auto py-20">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight text-white font-['Poppins']"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform Your
            <span className="block mt-6 bg-gradient-to-b from-[#6b4faf] to-[#ffffff] bg-clip-text text-transparent font-semibold">
              Digital Vision
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-200 leading-relaxed font-['Poppins'] font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We deliver cutting-edge software solutions that drive growth,
            enhance efficiency, and transform businesses through innovative
            technology and expert craftsmanship.
          </motion.p>

          {/* Features List */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-gray-300 group"
              >
                <CheckCircle
                  size={18}
                  className="text-[#4a7dff] flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                />
                <span className="text-base font-medium group-hover:text-white transition-colors duration-300">
                  {feature}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              to="/contact"
              className="relative bg-black border border-white text-white text-lg px-10 py-5 rounded-xl font-semibold flex items-center gap-3 min-w-[220px] justify-center overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 hover:scale-105 group"
            >
              <span className="relative z-10">Start Your Project</span>
              <Play size={20} className="relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </Link>

            <Link
              to="/services"
              className="relative bg-black border border-white text-white text-lg px-10 py-5 rounded-xl font-semibold flex items-center gap-3 min-w-[200px] justify-center overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 hover:scale-105 group"
            >
              <span className="relative z-10">View Our Services</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </Link>
          </motion.div>

          {/* Updated Stats Preview */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-20 pt-12 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                100%
              </div>
              <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                Modern Tech
              </div>
            </div>
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                Expert Team Members
              </div>
            </div>
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                99.9%
              </div>
              <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                Uptime Guarantee
              </div>
            </div>
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                24h
              </div>
              <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                Response Time
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section - FIXED */}
      <section className="py-20 bg-[#100232] relative overflow-hidden">
        <div
          ref={addToRefs}
          className="opacity-0 translate-y-12 transition-all duration-700"
        >
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-white font-['Poppins'] relative inline-block">
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
                      className="bg-white p-10 rounded-2xl border border-gray-200 transition-all duration-400 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 hover:border-[#362B6A] relative overflow-hidden group flex flex-col h-full font-['Poppins'] cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#362B6A]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>

                      <div className="flex justify-between items-start mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#362B6A] to-[#5355A0] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                          <service.icon size={24} color="white" />
                        </div>

                        {/* Arrow Icon */}
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#362B6A] group-hover:text-white transition-all duration-300">
                          <ArrowRight
                            size={16}
                            className="group-hover:translate-x-0.5 transition-transform duration-300"
                          />
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-800 mb-4 font-['Poppins'] group-hover:text-[#362B6A] transition-colors duration-300">
                        {service.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed font-['Poppins'] flex-grow">
                        {service.desc}
                      </p>

                      {/* Click hint text */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500 font-medium group-hover:text-[#362B6A] transition-colors duration-300 flex items-center gap-1">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
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
                  className="bg-[#100232] p-12 rounded-2xl text-center shadow-xl transition-all duration-400 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 hover:border-[#4a7dff] border border-[#2d3b5b] relative overflow-hidden group font-['Poppins']"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"></div>

                  <div className="w-20 h-20 bg-gradient-to-br from-[#362B6A] to-[#5355A0] rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-360 transition-all duration-300">
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
        </div>
      </section>

      {/* Projects Section - FIXED */}
      <section className="py-20 bg-[#100232] relative">
        <div
          ref={addToRefs}
          className="opacity-0 translate-y-12 transition-all duration-700"
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-white font-['Poppins'] relative inline-block">
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
                className="relative bg-black border border-white text-white text-lg px-10 py-5 rounded-xl font-semibold inline-flex items-center gap-2 overflow-hidden transition-all duration-400 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-white/30 group font-['Poppins']"
              >
                <span className="relative z-10">View All Projects</span>
                <ArrowRight size={20} className="relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
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
                        <span className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-br from-[#362B6A] via-[#5355A0] to-[#362B6A] bg-clip-text text-transparent font-['Poppins'] block leading-none group-hover:scale-110 transition-transform duration-300">
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
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Partners We Work With
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
          </div>

          <div className="overflow-hidden relative pt-19">
            {/* Animation Container */}
            <div className="flex animate-scroll">
              {[...logos, ...logos].map((logo, index) => {
                // Function to get specific height for each logo
                const getLogoHeight = (logoUrl) => {
                  if (logoUrl.includes("microsoft-5")) return "h-14"; // Microsoft - 32px
                  if (logoUrl.includes("Zoho-logo")) return "h-10"; // Zoho - 40px
                  if (logoUrl.includes("aws-2")) return "h-12"; // AWS - 48px
                  if (logoUrl.includes("djit-trading")) return "h-14"; // Djit Trading - 56px
                  if (logoUrl.includes("cybomb_logo")) return "h-16"; // Cybomb - 64px
                  if (logoUrl.includes("j4q6qjzlm93uirax0l6f")) return "h-12"; // New logo 1
                  if (logoUrl.includes("wn8m8g8skdpl6iz2rwoa")) return "h-14"; // New logo 2
                  return "h-12"; // Default height
                };

                return (
                  <div
                    key={index}
                    className="flex-shrink-0 w-48 h-24 bg-white shadow-md rounded-2xl flex items-center justify-center mx-4"
                  >
                    <img
                      src={logo}
                      alt="Partner Logo"
                      className={`w-32 object-contain transition duration-300 ${getLogoHeight(
                        logo
                      )}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - FIXED */}
      <section className="py-20 bg-[#100232] relative overflow-hidden">
        <div
          ref={addToRefs}
          className="opacity-0 translate-y-12 transition-all duration-700"
        >
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white font-['Poppins'] leading-tight">
                Ready to Transform Your Idea Into Reality?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed font-['Poppins']">
                Let's collaborate and build something extraordinary together.
                Your next big thing starts here with Aitals Technologies.
              </p>
              <Link
                to="/contact"
                className="relative bg-black border border-white text-white text-lg px-10 py-6 rounded-xl font-bold inline-flex items-center gap-2 overflow-hidden transition-all duration-400 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-white/30 group font-['Poppins']"
              >
                <span className="relative z-10">Start Your Project Today</span>
                <ArrowRight size={20} className="relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </Link>
            </motion.div>
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
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
};

export default Home;
