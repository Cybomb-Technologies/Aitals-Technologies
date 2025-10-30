import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Navigation,
  Shield,
  Award,
  Users,
} from "lucide-react";
import Metatags from "../SEO/metatags";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `Service: ${formData.service}\n\nMessage: ${formData.message}`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success message (you can replace this with your toast implementation)
        alert(
          "Message Sent! ✉️\nThank you for reaching out. We'll get back to you within 24 hours!"
        );
        setFormData({ name: "", email: "", service: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Show error message (you can replace this with your toast implementation)
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const services = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "E-commerce Solutions",
    "Cloud Services",
    "AI Integration",
    "Other",
  ];

  const openGoogleMaps = () => {
    window.open(
      "https://maps.google.com/?q=Prime+Plaza+No.54/1,+1st+street,+Sripuram+colony,+St.+Thomas+Mount,+Chennai,+Tamil+Nadu+600016,+India",
      "_blank"
    );
  };

  const openAddressInMaps = () => {
    window.open(
      "https://maps.google.com/?q=Prime+Plaza+No.54/1,+1st+street,+Sripuram+colony,+St.+Thomas+Mount,+Chennai,+Tamil+Nadu+600016,+India",
      "_blank"
    );
  };

  const openEmail = () => {
    window.location.href = "mailto:support@aitals.com";
  };

  const openPhone = () => {
    window.location.href = "tel:+919715092104";
  };

  const metaPropsData = {
    title:
      "Contact Aitals Technologies | Get In Touch for Software Development",
    description:
      "Contact Aitals Technologies for your software development needs. Reach out for web development, mobile apps, UI/UX design, and custom software solutions. We're here to help transform your ideas into reality.",
    keyword:
      "Contact Aitals, Software Development Contact, Web Development Company, Mobile App Development, UI/UX Design Services, Get Quote, Project Inquiry",
    url: "https://aitals.com/contact",
    image: "https://aitals.com/assets/logo-B8Q2-6qZ.png",
  };

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

  const trustIndicators = [
    {
      icon: Award,
      number: "50+",
      text: "Projects Delivered Successfully",
    },
    {
      icon: Users,
      number: "98%",
      text: "Client Satisfaction Rate",
    },
    {
      icon: Shield,
      number: "100%",
      text: "Security & Privacy Assured",
    },
  ];

  return (
    <>
      <Metatags metaProps={metaPropsData} />
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      {/* Hero Section - Updated with same styling as other pages */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d1933] pt-16">
        {/* Background Image with Purple Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(16, 2, 50, 0.9), rgba(16, 2, 50, 0.8)), url("https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80")`,
          }}
        ></div>

        <div className="relative z-10 text-center w-full px-4 max-w-7xl mx-auto py-20">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight text-white font-['Poppins']"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get In
            <span className="block mt-6 bg-gradient-to-b from-[#6b4faf] to-[#ffffff] bg-clip-text text-transparent font-semibold">
              Touch
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-200 leading-relaxed font-['Poppins'] font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to start your project? We'd love to hear from you. Let's
            discuss how we can help bring your vision to life with our expert
            services and innovative solutions.
          </motion.p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#362B6A] via-[#5355A0] to-[#362B6A] bg-clip-text text-transparent font-['Poppins'] relative inline-block">
              Send Us a Message
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#100232] p-12 rounded-2xl border border-[#2d3b5b] shadow-xl transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/25 hover:border-[#4a7dff] relative overflow-hidden group font-['Poppins']"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#362B6A]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                  <label className="block text-gray-200 font-medium mb-3 text-lg">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-[#0d1933] border border-[#2d3b5b] rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#4a7dff] focus:border-transparent outline-none transition-all duration-300 hover:border-[#4a7dff]"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-gray-200 font-medium mb-3 text-lg">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-[#0d1933] border border-[#2d3b5b] rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#4a7dff] focus:border-transparent outline-none transition-all duration-300 hover:border-[#4a7dff]"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-200 font-medium mb-3 text-lg">
                    Service Interest
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-[#0d1933] border border-[#2d3b5b] rounded-xl text-white focus:ring-2 focus:ring-[#4a7dff] focus:border-transparent outline-none transition-all duration-300 hover:border-[#4a7dff]"
                  >
                    <option value="" className="bg-[#0d1933]">
                      Select a service
                    </option>
                    {services.map((service) => (
                      <option
                        key={service}
                        value={service}
                        className="bg-[#0d1933]"
                      >
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-200 font-medium mb-3 text-lg">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-6 py-4 bg-[#0d1933] border border-[#2d3b5b] rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#4a7dff] focus:border-transparent outline-none transition-all duration-300 hover:border-[#4a7dff] resize-none"
                    placeholder="Tell us about your project requirements, timeline, and any specific features you need..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative bg-black border border-white text-white text-lg px-10 py-5 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 hover:scale-105 group w-full font-['Poppins'] inline-flex items-center justify-center gap-3 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  <span className="relative z-10">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                  <Send size={20} className="relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                </button>

                {/* Trust Indicators Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="pt-8 mt-8 border-t border-[#2d3b5b]"
                >
                  <h3 className="text-xl font-bold text-white mb-6 text-center font-['Poppins']">
                    Why Clients Trust Us
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    {trustIndicators.map((indicator, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 bg-[#0d1933] rounded-xl border border-[#2d3b5b] hover:border-[#4a7dff] transition-all duration-300 group/indicator"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-[#362B6A] to-[#5355A0] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 transition-all duration-300 group-hover/indicator:scale-110 group-hover/indicator:rotate-5">
                          <indicator.icon size={20} color="white" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white font-['Poppins']">
                              {indicator.number}
                            </span>
                            <span className="text-gray-300 font-medium font-['Poppins'] text-sm">
                              {indicator.text}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Additional Assurance Text */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 text-center"
                  >
                    <p className="text-gray-400 text-sm font-['Poppins'] leading-relaxed">
                      Your information is secure and protected. We respect your
                      privacy and never share your data with third parties.
                    </p>
                  </motion.div>
                </motion.div>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-[#362B6A] via-[#5355A0] to-[#362B6A] bg-clip-text text-transparent font-['Poppins']">
                  Contact Information
                </h2>

                <motion.div
                  className="space-y-6"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {/* Address */}
                  <motion.div
                    variants={itemVariants}
                    className="flex items-start space-x-6 cursor-pointer hover:bg-[#100232] p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-transparent hover:border-[#4a7dff] group"
                    onClick={openAddressInMaps}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#362B6A] to-[#5355A0] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-5">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-white transition-colors duration-300">
                        Office Address
                      </h3>
                      <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                        Prime Plaza No.54/1, 1st street, Sripuram colony,
                        <br />
                        St. Thomas Mount, Chennai, Tamil Nadu - 600 016,
                        <br />
                        India
                      </p>
                    </div>
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    variants={itemVariants}
                    className="flex items-start space-x-6 cursor-pointer hover:bg-[#100232] p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-transparent hover:border-[#4a7dff] group"
                    onClick={openEmail}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#362B6A] to-[#5355A0] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-5">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-white transition-colors duration-300">
                        Email Us
                      </h3>
                      <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-300">
                        support@aitals.com
                      </p>
                    </div>
                  </motion.div>

                  {/* Phone */}
                  <motion.div
                    variants={itemVariants}
                    className="flex items-start space-x-6 cursor-pointer hover:bg-[#100232] p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-transparent hover:border-[#4a7dff] group"
                    onClick={openPhone}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#362B6A] to-[#5355A0] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-5">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-white transition-colors duration-300">
                        Call Us
                      </h3>
                      <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-300">
                        +91 9715092104
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#100232] p-8 rounded-2xl border border-[#2d3b5b]"
              >
                <h3 className="font-bold text-2xl mb-6 text-white font-['Poppins']">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  {[
                    {
                      Icon: Linkedin,
                      url: "https://linkedin.com/company/aitals",
                    },
                    { Icon: Facebook, url: "https://facebook.com/aitals" },
                    { Icon: Instagram, url: "https://instagram.com/aitals" },
                    { Icon: Twitter, url: "https://twitter.com/aitals" },
                  ].map(({ Icon, url }, i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-gradient-to-br from-[#362B6A] to-[#5355A0] rounded-2xl flex items-center justify-center hover:scale-110 hover:rotate-5 transition-all duration-300 shadow-lg shadow-blue-500/30"
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Business Hours */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#362B6A] to-[#5355A0] p-8 rounded-2xl text-white"
              >
                <h3 className="font-bold text-2xl mb-6 font-['Poppins']">
                  Business Hours
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="font-medium">Monday - Friday:</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="font-medium">Saturday:</span>
                    <span className="font-semibold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Sunday:</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 bg-[#100232] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-white font-['Poppins'] relative inline-block">
              Visit Our Office
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              Come meet us at our Chennai office and discuss your project in
              person
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-12 text-center shadow-2xl border border-gray-200 transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/25"
          >
            <MapPin className="w-20 h-20 mx-auto mb-6 text-[#4a7dff]" />
            <h3 className="text-3xl font-bold text-gray-800 mb-4 font-['Poppins']">
              Prime Plaza, Chennai
            </h3>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              Prime Plaza No.54/1, 1st street, Sripuram colony,
              <br />
              St. Thomas Mount, Chennai, Tamil Nadu - 600 016, India
            </p>
            <button
              onClick={openGoogleMaps}
              className="relative bg-black border border-white text-white text-lg px-10 py-5 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 hover:scale-105 group font-['Poppins'] inline-flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">Open in Google Maps</span>
              <Navigation size={20} className="relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;
