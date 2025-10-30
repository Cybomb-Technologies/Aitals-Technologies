import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  TestTube,
  Shield,
  Zap,
  Clock,
  Users,
  CheckCircle,
  Bug,
  Monitor,
  Server,
  Database,
  Cloud,
  Award,
  BarChart,
  MessageCircle,
  Palette,
} from "lucide-react";
import Metatags from "../../../SEO/metatags";

const SoftwareTesting = () => {
  const sectionRefs = useRef([]);
  const [selectedTechCategory, setSelectedTechCategory] =
    useState("Testing Tools");

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
      icon: Shield,
      title: "Quality Assurance",
      desc: "Comprehensive testing to ensure your software meets the highest quality standards",
    },
    {
      icon: Zap,
      title: "Performance Testing",
      desc: "Identify bottlenecks and optimize your application for maximum speed",
    },
    {
      icon: Bug,
      title: "Bug Detection",
      desc: "Thorough testing to identify and resolve issues before deployment",
    },
    {
      icon: Monitor,
      title: "Cross-Platform Testing",
      desc: "Ensure consistent performance across all devices and browsers",
    },
    {
      icon: Server,
      title: "Load Testing",
      desc: "Test your application under heavy traffic conditions to ensure stability",
    },
    {
      icon: Users,
      title: "User Experience Testing",
      desc: "Validate user workflows and ensure intuitive application behavior",
    },
  ];

  const technologies = {
    "Testing Tools": [
      {
        name: "Selenium",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
      },
      {
        name: "Jest",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
      },
      {
        name: "Cypress",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg",
      },
      {
        name: "JUnit",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/junit/junit-original.svg",
      },
      {
        name: "Postman",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
      },
    ],
    Automation: [
      {
        name: "Jenkins",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
      },
      {
        name: "Docker",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        name: "GitHub Actions",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg",
      },
      {
        name: "Appium",
        logo: "https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_4db5713c991f58ae5a2241277f06cd2e/appium.png",
      },
      {
        name: "Playwright",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg",
      },
    ],
    Monitoring: [
      {
        name: "Grafana",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg",
      },
      {
        name: "Prometheus",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg",
      },
      {
        name: "New Relic",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/newrelic/newrelic-original.svg",
      },
      {
        name: "Datadog",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/datadog/datadog-original.svg",
      },
      {
        name: "Splunk",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeq4ALF8XsOGUaY3SCjkSQY1MVTakii5Z2Sw&s",
      },
    ],
  };

  const process = [
    {
      number: "01",
      title: "Requirement Analysis",
      desc: "Understand your software requirements and define testing objectives",
    },
    {
      number: "02",
      title: "Test Planning",
      desc: "Create comprehensive test strategies and detailed test cases",
    },
    {
      number: "03",
      title: "Test Development",
      desc: "Develop automated test scripts and manual test scenarios",
    },
    {
      number: "04",
      title: "Test Execution",
      desc: "Execute tests across multiple environments and platforms",
    },
    {
      number: "05",
      title: "Defect Tracking",
      desc: "Identify, log, and track defects through resolution",
    },
    {
      number: "06",
      title: "Reporting & Maintenance",
      desc: "Provide detailed reports and ongoing maintenance support",
    },
  ];

  const solutions = [
    {
      icon: Monitor,
      title: "Functional Testing",
      desc: "Comprehensive testing of all software functions and features",
      features: [
        "Unit Testing",
        "Integration Testing",
        "System Testing",
        "User Acceptance Testing",
      ],
    },
    {
      icon: Zap,
      title: "Performance Testing",
      desc: "Ensure optimal performance under various load conditions",
      features: [
        "Load Testing",
        "Stress Testing",
        "Endurance Testing",
        "Spike Testing",
      ],
    },
    {
      icon: Shield,
      title: "Security Testing",
      desc: "Identify vulnerabilities and ensure robust security measures",
      features: [
        "Penetration Testing",
        "Vulnerability Assessment",
        "Security Scanning",
        "Risk Assessment",
      ],
    },
    {
      icon: Cloud,
      title: "API Testing",
      desc: "Thorough testing of APIs for functionality and performance",
      features: [
        "REST API Testing",
        "SOAP Testing",
        "Performance Testing",
        "Security Testing",
      ],
    },
  ];

  const stats = [
    { number: "1K+", label: "Bugs Identified" },
    { number: "99%", label: "Test Coverage" },
    { number: "50+", label: "Testing Experts" },
    { number: "24/7", label: "Monitoring" },
  ];

  const techCategories = Object.keys(technologies);

  const metaPropsData = {
    title:
      "Software Testing & Quality Assurance Services | Aitals Technologies",
    description:
      "Aitals Technologies provides comprehensive software testing services including quality assurance, performance testing, security testing, automation testing, and ongoing maintenance support.",
    keyword:
      "Software Testing, Quality Assurance, QA Services, Performance Testing, Security Testing, Automation Testing, Bug Detection, Test Automation",
    url: "https://aitals.com/services/software-testing",
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
            backgroundImage: `linear-gradient(rgba(16, 2, 50, 0.9), rgba(16, 2, 50, 0.8)), url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`,
          }}
        ></div>

        <div className="relative z-10 text-center w-full px-4 max-w-7xl mx-auto py-20">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight text-white font-['Poppins']"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Software
            <span className="block mt-6 bg-gradient-to-b from-[#6b4faf] to-[#ffffff] bg-clip-text text-transparent font-semibold">
              Testing
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-200 leading-relaxed font-['Poppins'] font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Comprehensive quality assurance and ongoing support to ensure your
            software runs flawlessly with our rigorous testing protocols
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
              <span className="relative z-10">View Case Studies</span>
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
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#362B6A] via-[#5355A0] to-[#362B6A] bg-clip-text text-transparent font-['Poppins'] relative inline-block">
              Our Testing Services
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              Comprehensive testing solutions to ensure your software meets the
              highest standards of quality and performance
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
              Technologies & Tools
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              We leverage industry-leading testing tools and frameworks to
              deliver comprehensive quality assurance
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
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#362B6A] via-[#5355A0] to-[#362B6A] bg-clip-text text-transparent font-['Poppins'] relative inline-block">
              Our Testing Process
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              A structured methodology that ensures comprehensive testing
              coverage and timely delivery
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
              Testing Solutions
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              Comprehensive testing services tailored to your specific software
              requirements
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
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#362B6A] via-[#5355A0] to-[#362B6A] bg-clip-text text-transparent font-['Poppins'] relative inline-block">
              Our Testing Excellence
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-16 leading-relaxed font-['Poppins']">
              Delivering exceptional quality assurance results through rigorous
              testing methodologies
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
              Ensure Your Software Quality
            </h2>

            <p className="text-xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed font-['Poppins']">
              Let's work together to deliver flawless software that exceeds user
              expectations
            </p>

            <Link
              to="/contact"
              className="relative bg-black border border-white text-white text-lg px-12 py-6 rounded-xl font-semibold inline-flex items-center gap-2 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/30 hover:scale-105 group mx-auto"
            >
              <span className="relative z-10">Start Testing Today</span>
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

export default SoftwareTesting;
