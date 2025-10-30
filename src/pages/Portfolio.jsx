import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ExternalLink,
  Code,
  Smartphone,
  Palette,
  ShoppingCart,
  ArrowRight,
  CheckCircle,
  Users,
  Award,
  TrendingUp,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Metatags from "../SEO/metatags";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Web Development",
    "Mobile Apps",
    "UI/UX Design",
    "E-commerce",
  ];

  const projects = [
    {
      title: "FinTech Dashboard",
      category: "Web Development",
      description:
        "Comprehensive financial analytics platform with real-time data visualization",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      portfolioLink: "https://fintech.aitals.com/",
      tech: ["React", "Node.js", "MongoDB"],
      results: "40% increase in user engagement",
    },
    {
      title: "Healthcare Mobile App",
      category: "Mobile Apps",
      description: "Patient management and appointment booking application",
      image:
        "https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710",
      portfolioLink: "https://healthcare.aitals.com/",
      tech: ["React Native", "Firebase", "Redux"],
      results: "50K+ downloads in 3 months",
    },
    {
      title: "E-Learning Platform",
      category: "Web Development",
      description: "Interactive online learning platform with video streaming",
      image:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      portfolioLink: "https://elearning.aitals.com/",
      tech: ["Next.js", "PostgreSQL", "AWS"],
      results: "10K+ active students",
    },
    {
      title: "Fitness Tracking App",
      category: "Mobile Apps",
      description: "Comprehensive fitness and nutrition tracking application",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      portfolioLink: "https://fitness.aitals.com/",
      tech: ["Flutter", "Firebase", "ML Kit"],
      results: "4.8★ rating on stores",
    },
    {
      title: "Restaurant Booking System",
      category: "Web Development",
      description: "Table reservation and menu management platform",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      portfolioLink: "https://restaurant.aitals.com/",
      tech: ["Vue.js", "Express", "MySQL"],
      results: "500+ restaurants onboarded",
    },
    {
      title: "Art Gallery",
      category: "UI/UX Design",
      description: "Complete UI/UX overhaul for Art Customization application",
      image:
        "https://images.unsplash.com/photo-1572177812156-58036aae439c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      portfolioLink: "https://travelapp.aitals.com/",
      tech: ["Figma", "Adobe XD", "Prototyping"],
      results: "100% user needs satisfied",
    },
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  // Fallback images for demo purposes
  const fallbackImages = {
    "FinTech Dashboard":
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    "Healthcare Mobile App":
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    "E-Learning Platform":
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    "Fashion E-commerce":
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    "Fitness Tracking App":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    "Restaurant Booking System":
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    "Travel App Redesign":
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    "Real Estate Platform":
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
  };

  const handleImageError = (e, projectTitle) => {
    e.target.src =
      fallbackImages[projectTitle] ||
      "https://images.unsplash.com/photo-1572177812156-58036aae439c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80";
  };

  const stats = [
    {
      number: "500+",
      label: "Projects Completed",
    },
    {
      number: "98%",
      label: "Client Satisfaction",
    },
    {
      number: "50+",
      label: "Countries Served",
    },
    {
      number: "24/7",
      label: "Support Available",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      text: "Aitals delivered beyond our expectations. The team was professional, responsive, and truly understood our vision.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      company: "Global Retail Co.",
      text: "Our e-commerce platform has seen a 200% increase in sales since launch. Outstanding work!",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      company: "HealthCare Plus",
      text: "The mobile app they built has transformed how we serve our patients. Highly recommended!",
      rating: 5,
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

  const metaPropsData = {
    title: "Portfolio - Aitals Technologies | Our Work & Case Studies",
    description:
      "Explore Aitals Technologies' portfolio of successful projects including web applications, mobile apps, e-commerce solutions, and digital transformations delivered to clients worldwide.",
    keyword:
      "Aitals Portfolio, Web Development Projects, Mobile App Case Studies, E-commerce Solutions, UI/UX Design Work, Software Development Projects, Client Success Stories",
    url: "https://aitals.com/portfolio",
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d1933] pt-16">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(16, 2, 50, 0.9), rgba(16, 2, 50, 0.8)), url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80")`,
          }}
        ></div>

        <div className="relative z-10 text-center w-full px-4 max-w-7xl mx-auto py-20">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight text-white font-['Poppins']"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our
            <span className="block mt-6 bg-gradient-to-b from-[#6b4faf] to-[#ffffff] bg-clip-text text-transparent font-semibold">
              Portfolio
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-200 leading-relaxed font-['Poppins'] font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Showcasing our best work and the impact we've created for clients
            across industries. Each project represents our commitment to
            excellence and innovation.
          </motion.p>

          {/* Features List */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              "Quality Assured",
              "Client-Centric",
              "Innovation Driven",
              "Timely Delivery",
              "Scalable Solutions",
              "24/7 Support",
            ].map((feature, index) => (
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
              <ArrowRight size={20} className="relative z-10" />
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
        </div>
      </section>

      {/* Portfolio Projects Section */}
      <section className="py-20 bg-[#100232] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
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

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all text-base ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] text-white shadow-lg scale-105"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-400 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/15 border border-gray-200 font-['Poppins'] group flex flex-col"
              >
                {/* Fixed Height Image Container */}
                <div className="relative overflow-hidden h-64 w-full">
                  <img
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
                    src={project.image}
                    onError={(e) => handleImageError(e, project.title)}
                  />
                  {/* View Details Button - Always Visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <a
                      href={project.portfolioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </a>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4 self-start">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 font-['Poppins']">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-base mb-4 line-clamp-2 leading-relaxed font-['Poppins'] flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-200 mt-auto">
                    <p className="text-sm font-medium text-green-600 flex items-center gap-2">
                      <CheckCircle size={16} />
                      {project.results}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#362B6A] via-[#5355A0] to-[#362B6A] bg-clip-text text-transparent font-['Poppins'] relative inline-block">
              Our Impact in Numbers
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              Real results for real businesses
            </p>
          </motion.div>

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
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#100232] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-white font-['Poppins'] relative inline-block">
              Client Testimonials
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              What our clients say about us
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-gray-200 shadow-xl transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/15 font-['Poppins']"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 text-base leading-relaxed font-['Poppins']">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 gradient-bg rounded-full mr-4 flex items-center justify-center bg-gradient-to-br from-[#362B6A] to-[#5355A0]">
                    <Users size={20} color="white" />
                  </div>
                  <div>
                    <div className="font-bold text-base font-['Poppins']">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 font-['Poppins']">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
