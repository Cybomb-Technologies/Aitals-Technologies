import React, { useEffect, useRef } from "react";
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
import "./About.css";

const About = () => {
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

  const milestones = [
    {
      year: "2018",
      title: "Company Founded",
      desc: "Started with a vision to innovate digital solutions",
    },
    {
      year: "2019",
      title: "First 100 Clients",
      desc: "Reached our first major milestone with global clients",
    },
    {
      year: "2021",
      title: "Global Expansion",
      desc: "Opened offices in 5 countries across continents",
    },
    {
      year: "2023",
      title: "AI Integration",
      desc: "Launched cutting-edge AI-powered solutions",
    },
    {
      year: "2025",
      title: "Industry Leader",
      desc: "500+ successful projects delivered worldwide",
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

  return (
    <>
      <Helmet>
        <title>About Us - Aitals Technologies | Our Story & Team</title>
        <meta
          name="description"
          content="Learn about Aitals Technologies - our vision, mission, values, and the talented team driving digital innovation worldwide."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="about-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="about-hero-content"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="about-hero-title"
            >
              About Aitals Technologies
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="about-hero-subtitle"
            >
              We are a global software development company committed to
              transforming ideas into powerful digital solutions. With
              innovation at our core, we deliver excellence across web, mobile,
              and cloud technologies.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section
        ref={addToRefs}
        className="about-section about-vision-mission-section"
      >
        <div className="about-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-section-header"
          >
            <h2 className="about-section-main-title">Our Vision & Mission</h2>
            <p className="about-section-main-description">
              Guiding principles that drive our innovation and success
            </p>
          </motion.div>

          <div className="about-vision-mission-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="about-vision-content"
            >
              <div className="about-icon-container">
                <Eye className="about-icon" size={32} />
              </div>
              <h2 className="about-section-title">
                Shaping the Future of Technology
              </h2>
              <p className="about-section-description">
                To be the world's most trusted technology partner, empowering
                businesses with innovative digital solutions that drive growth,
                efficiency, and transformation in the digital age.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="about-mission-content"
            >
              <div className="about-icon-container">
                <Target className="about-icon" size={32} />
              </div>
              <h2 className="about-section-title">
                Delivering Excellence in Every Project
              </h2>
              <p className="about-section-description">
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
      <section ref={addToRefs} className="about-section about-values-section">
        <div className="about-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-section-header"
          >
            <h2 className="about-section-main-title">Our Core Values</h2>
            <p
              className="about-section-main-description"
              style={{ color: "#6b7280" }}
            >
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            className="about-values-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="about-value-card about-scroll-reveal"
              >
                <div className="about-value-icon-container">
                  <value.icon className="about-value-icon" size={28} />
                </div>
                <h3 className="about-value-title">{value.title}</h3>
                <p className="about-value-description">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Journey Section */}
      <section ref={addToRefs} className="about-section about-journey-section">
        <div className="about-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-section-header"
          >
            <h2 className="about-section-main-title">Our Journey</h2>
            <p className="about-section-main-description">
              Milestones that shaped our success story
            </p>
          </motion.div>

          <div className="about-journey-timeline">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="about-milestone about-scroll-reveal"
              >
                <div className="about-milestone-year">{milestone.year}</div>
                <div className="about-milestone-content">
                  <h3 className="about-milestone-title">{milestone.title}</h3>
                  <p className="about-milestone-description">
                    {milestone.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section
        ref={addToRefs}
        className="about-section about-expertise-section"
      >
        <div className="about-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-section-header"
          >
            <h2 className="about-section-main-title">Our Expertise</h2>
            <p className="about-section-main-description">
              Comprehensive technology solutions across all domains
            </p>
          </motion.div>

          <motion.div
            className="about-expertise-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {expertise.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="about-expertise-card about-scroll-reveal"
              >
                <div className="about-expertise-icon-container">
                  <skill.icon className="about-expertise-icon" size={28} />
                </div>
                <h3 className="about-expertise-title">{skill.title}</h3>
                <p className="about-expertise-description">{skill.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={addToRefs} className="about-section about-team-section">
        <div className="about-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-section-header"
          >
            <h2 className="about-section-main-title">Meet Our Team</h2>
            <p className="about-section-main-description">
              The brilliant minds behind our success and innovation
            </p>
          </motion.div>

          <motion.div
            className="about-team-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="about-team-card about-scroll-reveal"
              >
                <div className="about-team-image-container">
                  <img
                    alt={member.name}
                    className="about-team-image"
                    src={member.image}
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
                      e.target.alt = "Team member placeholder";
                    }}
                  />
                </div>
                <div className="about-team-content">
                  <h3 className="about-team-name">{member.name}</h3>
                  <p className="about-team-role">{member.role}</p>
                  <p className="about-team-desc">{member.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
      <section ref={addToRefs} className="about-section about-culture-section">
        <div className="about-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-section-header"
          >
            <h2 className="about-section-main-title">Life at Aitals</h2>
            <p
              className="about-section-main-description"
              style={{ color: "#6b7280" }}
            >
              A culture of innovation, growth, and collaboration
            </p>
          </motion.div>

          <motion.div
            className="about-culture-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {culture.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="about-culture-card about-scroll-reveal"
              >
                <div className="about-culture-icon-container">
                  <item.icon className="about-culture-icon" size={28} />
                </div>
                <h3 className="about-culture-title">{item.title}</h3>
                <p className="about-culture-description">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-culture-gallery"
          >
            <div className="about-gallery-grid">
              <img
                alt="Team collaboration"
                className="about-gallery-image"
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              />
              <img
                alt="Innovation workspace"
                className="about-gallery-image"
                src="https://images.unsplash.com/photo-1565841327798-694bc2074762?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              />
              <img
                alt="Team celebration"
                className="about-gallery-image"
                src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={addToRefs} className="about-cta-section">
        <div className="about-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="about-cta-title">
              Ready to Join Our Success Story?
            </h2>
            <p className="about-cta-description">
              Let's collaborate and build something extraordinary together. Your
              next big project starts here with Aitals Technologies.
            </p>
            <Link to="/contact">
              <button className="about-cta-button">
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

export default About;
