import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Palette,
  Users,
  Eye,
  Layout,
  Component,
  Zap,
  Shield,
  CheckCircle,
  Smartphone,
  Monitor,
  Tablet,
  Cpu,
  Figma,
  PenTool,
  Code,
  Award,
  Clock,
} from "lucide-react";
import Metatags from "../../../SEO/metatags";

const UiUx = () => {
  const sectionRefs = useRef([]);
  const [selectedTechCategory, setSelectedTechCategory] =
    useState("Design Tools");

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
      icon: Users,
      title: "User-Centered Design",
      desc: "Deep understanding of user needs and behaviors to create intuitive experiences",
    },
    {
      icon: Eye,
      title: "Visual Excellence",
      desc: "Stunning visuals that capture attention and communicate your brand identity",
    },
    {
      icon: Zap,
      title: "Seamless Interactions",
      desc: "Smooth animations and transitions that enhance user engagement",
    },
    {
      icon: Shield,
      title: "Accessibility First",
      desc: "Inclusive designs that work for everyone, regardless of ability",
    },
    {
      icon: Layout,
      title: "Consistent Design Systems",
      desc: "Cohesive visual language across all platforms and devices",
    },
    {
      icon: Component,
      title: "Modular Components",
      desc: "Reusable design elements that ensure scalability and maintainability",
    },
  ];

  const technologies = {
    "Design Tools": [
      {
        name: "Figma",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      },
      {
        name: "Adobe XD",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-original.svg",
      },
      {
        name: "Sketch",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg",
      },
      {
        name: "Lottie",
        logo: "https://cdn.worldvectorlogo.com/logos/lottiefiles.svg",
      },
      {
        name: "After Effects",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg",
      },
    ],
    "Prototyping & Testing": [
      {
        name: "Framer",
        logo: "https://cdn.worldvectorlogo.com/logos/framer-1.svg",
      },
      {
        name: "Maze",
        logo: "https://cdn.brandfetch.io/iddFGFHNcm/theme/dark/symbol.svg",
      },
      {
        name: "UsabilityHub",
        logo: "https://avatars.githubusercontent.com/u/16235092?s=200&v=4",
      },
      {
        name: "Storybook",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/storybook/storybook-original.svg",
      },
      {
        name: "InVision",
        logo: "https://cdn.worldvectorlogo.com/logos/invision.svg",
      },
    ],
  };

  const process = [
    {
      number: "01",
      title: "Research & Discovery",
      desc: "Understand user needs, business goals, and market landscape",
    },
    {
      number: "02",
      title: "User Personas & Journey",
      desc: "Create detailed user profiles and map their experiences",
    },
    {
      number: "03",
      title: "Wireframing",
      desc: "Develop structural layouts and information architecture",
    },
    {
      number: "04",
      title: "Visual Design",
      desc: "Craft beautiful interfaces with brand-aligned aesthetics",
    },
    {
      number: "05",
      title: "Prototyping",
      desc: "Build interactive prototypes for testing and validation",
    },
    {
      number: "06",
      title: "Testing & Iteration",
      desc: "Gather feedback and refine designs for optimal results",
    },
  ];

  const solutions = [
    {
      icon: Smartphone,
      title: "Mobile App Design",
      desc: "Intuitive mobile experiences that users love to engage with",
      features: ["iOS & Android", "Gesture Design", "Mobile-First Approach"],
    },
    {
      icon: Monitor,
      title: "Web Application UI",
      desc: "Complex web applications with clean, efficient interfaces",
      features: [
        "Responsive Design",
        "Dashboard Layouts",
        "Data Visualization",
      ],
    },
    {
      icon: Tablet,
      title: "Tablet Experiences",
      desc: "Optimized designs that leverage tablet capabilities",
      features: ["Touch Interface", "Split-screen Layouts", "Pen Support"],
    },
    {
      icon: Cpu,
      title: "Design Systems",
      desc: "Comprehensive design systems for consistent brand experiences",
      features: ["Component Libraries", "Style Guides", "Design Tokens"],
    },
  ];

  const stats = [
    { number: "150+", label: "Projects Designed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "40+", label: "Design Awards" },
    { number: "5M+", label: "Users Reached" },
  ];

  const techCategories = Object.keys(technologies);

  const metaPropsData = {
    title:
      "UI/UX Design Services | Exceptional Digital Experiences | Aitals Technologies",
    description:
      "Aitals Technologies provides professional UI/UX design services including user research, wireframing, prototyping, visual design, and design systems for web and mobile applications.",
    keyword:
      "UI/UX Design, User Experience Design, User Interface Design, Wireframing, Prototyping, Design Systems, Visual Design, Mobile App Design, Web Design",
    url: "https://aitals.com/services/ui-ux-design",
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
      </Helmet>

      {/* Hero Section - Updated with Web-dev.jsx styling */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d1933] pt-16">
        {/* Background Image with Purple Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(16, 2, 50, 0.9), rgba(16, 2, 50, 0.8)), url("https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80")`,
          }}
        ></div>

        <div className="relative z-10 text-center w-full px-4 max-w-7xl mx-auto py-20">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight text-white font-['Poppins']"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            UI/UX
            <span className="block mt-6 bg-gradient-to-b from-[#6b4faf] to-[#ffffff] bg-clip-text text-transparent font-semibold">
              Design
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-200 leading-relaxed font-['Poppins'] font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We craft beautiful, intuitive digital experiences that users love
            and businesses thrive on
          </motion.p>

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
              to="/portfolio"
              className="relative bg-black border border-white text-white text-lg px-10 py-5 rounded-xl font-semibold flex items-center gap-3 min-w-[200px] justify-center overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 hover:scale-105 group"
            >
              <span className="relative z-10">View Our Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Updated with Web-dev.jsx styling */}
      <section
        ref={addToRefs}
        className="py-20 bg-white relative overflow-hidden opacity-0 translate-y-8 transition-all duration-700"
      >
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Our Design Philosophy
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              We believe great design is not just about aesthetics—it's about
              creating meaningful experiences that solve real problems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-[#100232] p-12 rounded-2xl text-center shadow-xl transition-all duration-400 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 hover:border-[#4a7dff] border border-[#2d3b5b] relative overflow-hidden group font-['Poppins']"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"></div>

                <div className="w-20 h-20 bg-gradient-to-br from-[#362B6A] to-[#5355A0] rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-360 transition-all duration-300">
                  <feature.icon size={24} color="white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-100 mb-4 font-['Poppins']">
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

      {/* Technologies Section - Updated with Web-dev.jsx styling */}
      <section
        ref={addToRefs}
        className="py-20 bg-[#100232] relative opacity-0 translate-y-8 transition-all duration-700"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-white font-['Poppins'] relative inline-block">
              Our Design Stack
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              We use industry-leading tools and technologies to bring your
              vision to life with precision and creativity
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

          {/* Tech Cards Grid - Updated with white icon backgrounds */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {technologies[selectedTechCategory].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-[#100232] p-8 rounded-2xl text-center shadow-xl transition-all duration-400 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 hover:border-[#4a7dff] border border-[#2d3b5b] relative overflow-hidden group h-full flex flex-col items-center justify-center font-['Poppins']">
                  {/* Top gradient border on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"></div>

                  {/* Icon container with WHITE background for clear visibility */}
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-360 transition-all duration-300 p-4">
                    <img
                      src={tech.logo}
                      alt={`${tech.name} logo`}
                      className="w-10 h-10 object-contain"
                    />
                  </div>

                  {/* Technology name */}
                  <span className="text-gray-100 font-semibold font-['Poppins'] text-lg group-hover:text-white transition-colors duration-300">
                    {tech.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Updated with Web-dev.jsx styling */}
      <section
        ref={addToRefs}
        className="py-20 bg-white relative opacity-0 translate-y-8 transition-all duration-700"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Our Design Process
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              A user-centered approach that ensures we deliver designs that are
              both beautiful and functional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                className="bg-[#100232] p-12 rounded-2xl text-center shadow-xl transition-all duration-400 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 hover:border-[#4a7dff] border border-[#2d3b5b] relative overflow-hidden group font-['Poppins']"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"></div>

                <div className="text-5xl font-extrabold mb-4 bg-gradient-to-br from-[#362B6A] to-[#5355A0] bg-clip-text text-transparent font-['Poppins'] leading-none">
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

      {/* Solutions Section - Updated with Web-dev.jsx styling */}
      <section
        ref={addToRefs}
        className="py-20 bg-[#100232] relative opacity-0 translate-y-8 transition-all duration-700"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-white font-['Poppins'] relative inline-block">
              Our Design Solutions
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              Comprehensive UI/UX design services tailored to your specific
              platform and user needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                className="bg-white p-10 rounded-2xl border border-gray-200 transition-all duration-400 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 hover:border-[#362B6A] relative overflow-hidden group flex flex-col h-full font-['Poppins']"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#362B6A]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>

                <div className="w-20 h-20 bg-gradient-to-br from-[#362B6A] to-[#5355A0] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  <solution.icon size={32} color="white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4 font-['Poppins'] group-hover:text-[#362B6A] transition-colors duration-300">
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

      {/* Stats Section - Updated with Web-dev.jsx styling */}
      <section
        ref={addToRefs}
        className="py-20 bg-white relative opacity-0 translate-y-8 transition-all duration-700"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Our Design Impact
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-16 leading-relaxed font-['Poppins']">
              The numbers that demonstrate our commitment to creating
              exceptional user experiences
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-9 rounded-2xl border border-gray-200 shadow-xl transition-all duration-400 hover:-translate-y-2 hover:scale-105 hover:border-[#362B6A] hover:shadow-2xl hover:shadow-blue-500/15 min-h-[200px] flex flex-col justify-center items-center relative overflow-hidden group font-['Poppins']"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#362B6A]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>

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
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Updated with Web-dev.jsx styling */}
      <section
        ref={addToRefs}
        className="py-20 bg-gradient-to-br from-[#0d1933] to-[#1a2b4d] relative overflow-hidden opacity-0 translate-y-8 transition-all duration-700"
      >
        {/* Spinning Animation */}
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-radial-gradient from-white/10 to-transparent animate-spin-medium"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white font-['Poppins'] leading-tight">
              Ready to Transform Your User Experience?
            </h2>

            <p className="text-xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed font-['Poppins']">
              Let's collaborate to create stunning, user-friendly designs that
              drive engagement and growth
            </p>

            <Link
              to="/contact"
              className="relative bg-black border border-white text-white text-lg px-12 py-6 rounded-xl font-semibold inline-flex items-center gap-2 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/30 hover:scale-105 group mx-auto"
            >
              <span className="relative z-10">Start Your Design Project</span>
              <ArrowRight size={20} className="relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes spin-medium {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
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

export default UiUx;
