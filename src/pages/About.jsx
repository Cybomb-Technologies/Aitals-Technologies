import React, { useRef } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Target,
  Eye,
  Heart,
  Users,
  Award,
  TrendingUp,
  Globe,
  Zap,
  Code,
  Smartphone,
  Palette,
  Cloud,
  Brain,
  Shield,
} from "lucide-react";
import Metatags from "../SEO/metatags";

const About = () => {
  const sectionRefs = useRef([]);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const milestones = [
    {
      year: "2025",
      title: "Company Founded",
      desc: "Aitals Technologies was born with a vision to revolutionize digital solutions",
    },
    {
      year: "2025",
      title: "First Major Project",
      desc: "Successfully delivered our first enterprise solution within months of inception",
    },
    {
      year: "2025",
      title: "Team Expansion",
      desc: "Grew to a dedicated team of industry experts and innovators",
    },
    {
      year: "2025",
      title: "Technology Partnerships",
      desc: "Established strategic partnerships with leading tech platforms",
    },
    {
      year: "Present",
      title: "Rapid Growth Phase",
      desc: "Currently serving clients across multiple industries with cutting-edge solutions",
    },
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      desc: "Visionary leader with 15+ years in tech innovation",
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      desc: "Tech expert specializing in scalable architectures",
    },
    {
      name: "Amit Patel",
      role: "Head of Design",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      desc: "Creative director with award-winning design portfolio",
    },
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      desc: "PMP certified with 100+ successful project deliveries",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Innovation",
      desc: "Pushing boundaries with cutting-edge technology and creative solutions",
    },
    {
      icon: Heart,
      title: "Passion",
      desc: "Dedicated to excellence and outstanding results in every project",
    },
    {
      icon: Users,
      title: "Collaboration",
      desc: "Working together as partners to achieve shared success",
    },
    {
      icon: Award,
      title: "Quality",
      desc: "Delivering world-class solutions that exceed expectations",
    },
  ];

  const culture = [
    {
      icon: Zap,
      title: "Innovation-Driven",
      desc: "Encouraging creative thinking and continuous experimentation",
    },
    {
      icon: Globe,
      title: "Global Exposure",
      desc: "Work with international clients and diverse teams worldwide",
    },
    {
      icon: TrendingUp,
      title: "Growth Opportunities",
      desc: "Continuous learning and career advancement programs",
    },
    {
      icon: Users,
      title: "Flexible Work",
      desc: "Remote-friendly environment with work-life balance focus",
    },
  ];

  const expertise = [
    {
      icon: Code,
      title: "Web Development",
      desc: "React, Next.js, Node.js, Full-stack solutions",
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      desc: "iOS, Android, React Native, Cross-platform",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      desc: "User-centered design, prototyping, design systems",
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      desc: "AWS, Azure, Docker, Kubernetes, CI/CD",
    },
    {
      icon: Brain,
      title: "AI & ML",
      desc: "Machine Learning, NLP, Computer Vision, Automation",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      desc: "Testing, Security, Performance optimization",
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
    title: "About Aitals Technologies - Our Story, Team & Vision",
    description:
      "Learn about Aitals Technologies - our journey since 2025, talented team, core values, and vision to transform ideas into digital excellence through innovative solutions.",
    keyword:
      "Aitals Technologies About, Our Story, Company Team, Vision Mission, Software Development Company, Digital Solutions",
    url: "https://aitals.com/about",
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

      {/* Hero Section - Updated with Purple Effect */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d1933] pt-16">
        {/* Background Image with Purple Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(16, 2, 50, 0.9), rgba(16, 2, 50, 0.8)), url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80")`,
          }}
        ></div>

        <div className="relative z-10 text-center w-full px-4 max-w-7xl mx-auto py-20">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight text-white font-['Poppins']"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About Aitals
            <span className="block mt-6 bg-gradient-to-b from-[#6b4faf] to-[#ffffff] bg-clip-text text-transparent font-semibold">
              Technologies
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-200 leading-relaxed font-['Poppins'] font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We are a forward-thinking software development company founded in
            2025, committed to transforming ideas into powerful digital
            solutions. With innovation at our core, we deliver excellence across
            web, mobile, and cloud technologies.
          </motion.p>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section
        ref={addToRefs}
        className="py-20 bg-[#100232] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-white font-['Poppins'] relative inline-block">
              Our Vision & Mission
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              Guiding principles that drive our innovation and success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-2xl border border-gray-200 transition-all duration-400 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 hover:border-[#362B6A] relative overflow-hidden group font-['Poppins']"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#362B6A]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>

              <div className="w-20 h-20 bg-gradient-to-br from-[#362B6A] to-[#5355A0] rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/30 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <Eye size={32} color="white" />
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-6 font-['Poppins'] group-hover:text-[#362B6A] transition-colors duration-300">
                Shaping the Future of Technology
              </h2>

              <p className="text-gray-600 leading-relaxed font-['Poppins'] text-lg">
                To be the world's most trusted technology partner, empowering
                businesses with innovative digital solutions that drive growth,
                efficiency, and transformation in the digital age.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-2xl border border-gray-200 transition-all duration-400 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 hover:border-[#362B6A] relative overflow-hidden group font-['Poppins']"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#362B6A]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>

              <div className="w-20 h-20 bg-gradient-to-br from-[#362B6A] to-[#5355A0] rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/30 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <Target size={32} color="white" />
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-6 font-['Poppins'] group-hover:text-[#362B6A] transition-colors duration-300">
                Delivering Excellence in Every Project
              </h2>

              <p className="text-gray-600 leading-relaxed font-['Poppins'] text-lg">
                To deliver exceptional software solutions that exceed client
                expectations through innovation, quality, and dedication. We
                build long-term partnerships by understanding unique business
                needs and providing tailored technology solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={addToRefs} className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#4a7dff] via-[#3a6df0] to-[#4a7dff] bg-clip-text text-transparent font-['Poppins'] relative inline-block">
              Our Core Values
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-[#100232] p-12 rounded-2xl text-center shadow-xl transition-all duration-400 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 hover:border-[#4a7dff] border border-[#2d3b5b] relative overflow-hidden group font-['Poppins']"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"></div>

                <div className="w-20 h-20 bg-gradient-to-br from-[#362B6A] to-[#5355A0] rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-360 transition-all duration-300">
                  <value.icon size={24} color="white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-100 mb-4 font-['Poppins']">
                  {value.title}
                </h3>

                <p className="text-gray-300 leading-relaxed font-['Poppins']">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Journey Section */}
      <section
        ref={addToRefs}
        className="py-20 bg-[#100232] relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-white font-['Poppins'] relative inline-block">
              Our Journey
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              Our exciting beginning and rapid progress in 2025
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#4a7dff] to-[#3a6df0] transform -translate-x-1/2 md:block hidden"></div>

            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center mb-16 relative ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:flex-row`}
              >
                <div className="w-32 h-32 bg-gradient-to-br from-[#362B6A] to-[#5355A0] rounded-full flex items-center justify-center text-white text-2xl font-bold font-['Poppins'] shadow-lg shadow-blue-500/30 relative z-10 mx-8 md:mx-4 mb-4 md:mb-0">
                  {milestone.year}
                </div>

                <div className="flex-1 bg-white p-8 rounded-2xl border border-gray-200 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-[#362B6A]">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 font-['Poppins'] group-hover:text-[#362B6A] transition-colors duration-300">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-['Poppins']">
                    {milestone.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section ref={addToRefs} className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#4a7dff] via-[#3a6df0] to-[#4a7dff] bg-clip-text text-transparent font-['Poppins'] relative inline-block">
              Our Expertise
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              Comprehensive technology solutions across all domains
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {expertise.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-[#100232] p-8 rounded-2xl border border-[#2d3b5b] shadow-xl transition-all duration-400 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 hover:border-[#4a7dff] relative overflow-hidden group text-center font-['Poppins']"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#362B6A]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>

                <div className="w-16 h-16 bg-gradient-to-br from-[#362B6A] to-[#5355A0] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 mx-auto group-hover:scale-110 group-hover:rotate-5 transition-transform duration-300">
                  <skill.icon size={28} color="white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-100 mb-4 font-['Poppins']">
                  {skill.title}
                </h3>

                <p className="text-gray-300 leading-relaxed font-['Poppins']">
                  {skill.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section
        ref={addToRefs}
        className="py-20 bg-[#100232] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-white font-['Poppins'] relative inline-block">
              Meet Our Team
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              The brilliant minds behind our success and innovation
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-400 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/15 border border-gray-200 font-['Poppins']"
              >
                <div className="w-full h-80 overflow-hidden">
                  <img
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
                    src={member.image}
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
                      e.target.alt = "Team member placeholder";
                    }}
                  />
                </div>

                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 font-['Poppins']">
                    {member.name}
                  </h3>
                  <p className="text-lg text-[#4a7dff] mb-4 font-semibold font-['Poppins']">
                    {member.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed font-['Poppins']">
                    {member.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
      <section ref={addToRefs} className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#4a7dff] via-[#3a6df0] to-[#4a7dff] bg-clip-text text-transparent font-['Poppins'] relative inline-block">
              Life at Aitals
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              A culture of innovation, growth, and collaboration
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {culture.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-[#100232] p-8 rounded-2xl border border-[#2d3b5b] shadow-xl transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/25 hover:border-[#4a7dff] relative overflow-hidden group text-center font-['Poppins']"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#362B6A]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>

                <div className="w-16 h-16 bg-gradient-to-br from-[#362B6A] to-[#5355A0] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <item.icon size={28} color="white" />
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <img
                alt="Team collaboration"
                className="w-full h-64 object-cover rounded-2xl shadow-lg transition-all duration-400 hover:scale-105 hover:shadow-2xl"
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              />
              <img
                alt="Innovation workspace"
                className="w-full h-64 object-cover rounded-2xl shadow-lg transition-all duration-400 hover:scale-105 hover:shadow-2xl"
                src="https://images.unsplash.com/photo-1565841327798-694bc2074762?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              />
              <img
                alt="Team celebration"
                className="w-full h-64 object-cover rounded-2xl shadow-lg transition-all duration-400 hover:scale-105 hover:shadow-2xl"
                src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={addToRefs}
        className="py-24 bg-[#100232] relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80")`,
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white font-['Poppins'] leading-tight">
              Ready to Join Our Success Story?
            </h2>

            <p className="text-xl text-gray-200 max-w-4xl mx-auto mb-12 leading-relaxed font-['Poppins']">
              Let's collaborate and build something extraordinary together. Your
              next big project starts here with Aitals Technologies.
            </p>

            <Link to="/contact">
              <button className="relative bg-black border border-white text-white text-lg px-10 py-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 hover:scale-105 group font-['Poppins'] inline-flex items-center gap-3 overflow-hidden">
                <span className="relative z-10">Get Started Today</span>
                <ArrowRight size={24} className="relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
