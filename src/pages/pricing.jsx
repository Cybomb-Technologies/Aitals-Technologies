
import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Star,
  HelpCircle,
  Code2,
  Smartphone,
  Search,
  LifeBuoy,
  ChevronDown,
} from "lucide-react";

import Metatags from "../SEO/metatags";

const Pricing = () => {
  const sectionRefs = useRef([]);
  const [activeFAQ, setActiveFAQ] = useState(0);
  const navigate = useNavigate();

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const toggleFAQ = (index) => {
    setActiveFAQ((prev) => (prev === index ? null : index));
  };

  const handlePlanSelect = (plan) => {
    const planData = {
      planType: plan.tag.toLowerCase(),
      planName: plan.name,
      price: parseInt(plan.price.replace("₹", "").replace(",", "")),
    };
    
    navigate("/checkout", { state: planData });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const plans = [
    {
      tag: "ECONOMY",
      name: "Economy Website",
      subtitle: "One page website",
      price: "₹6,000",
      highlight: "One-time Fee – No Hidden Charges",
      features: [
        "Onepage website",
        "500 MB hosting",
        "Mobile responsive",
        "Enquiry form",
        "Click to call option",
        "1 Content revision",
      ],
      cta: "Launch Your Website",
      popular: false,
    },
    {
      tag: "PROFESSIONAL",
      name: "Professional Website",
      subtitle: "5 page web design",
      price: "₹10,700",
      highlight: "One-time Fee – No Hidden Charges",
      features: [
        "Professional web design",
        "1 GB hosting",
        "2 Business email",
        "Professional SSL certificate",
        "Mobile responsive",
        "Enquiry form",
        "Click to call option",
        "WhatsApp Chat options",
        "2 Content revision",
      ],
      cta: "Get Professional Website",
      popular: true,
    },
    {
      tag: "CMS",
      name: "Custom Website",
      subtitle: "Upto 10 pages & CMS admin",
      price: "₹18,000",
      highlight: "One-time Fee – No Hidden Charges",
      features: [
        "CMS admin login",
        "Custom web design",
        "1 GB hosting",
        "2 Business email",
        "Professional SSL certificate",
        "Mobile responsive",
        "Enquiry form",
        "Click to call option",
        "WhatsApp Chat options",
        "3 Content revision",
      ],
      cta: "Build Custom CMS Website",
      popular: false,
    },
  ];

  const reasons = [
    {
      icon: Code2,
      title: "Quality Code",
      desc: "Clean, maintainable code following industry best practices.",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      desc: "Pixel-perfect layouts that look great on all devices.",
    },
    {
      icon: Search,
      title: "SEO Optimized",
      desc: "Technical SEO foundations implemented from day one.",
    },
    {
      icon: LifeBuoy,
      title: "Ongoing Support",
      desc: "Reliable post-launch support to keep everything running smoothly.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Aitals delivered beyond our expectations. The team was professional, responsive, and truly understood our vision.",
      name: "Suresh Johnson",
      role: "Founder, FinTech Inc.",
    },
    {
      quote:
        "Our e-commerce platform has seen a 200% increase in sales since launch. Outstanding work!",
      name: "Michael Chen",
      role: "E-commerce Owner",
    },
    {
      quote:
        "The mobile app they built has transformed how we serve our patients. Highly recommended!",
      name: "Priya Sharma",
      role: "Director, HealthCare Plus",
    },
  ];

  const faqs = [
    {
      q: "How long does a typical project take?",
      a: "Most standard websites are delivered within 2–4 weeks, depending on the scope, content readiness, and feedback cycles.",
    },
    {
      q: "Do you provide content creation services?",
      a: "Yes, we can help with website copy, basic branding content, and structure recommendations as an add-on service.",
    },
    {
      q: "What about website maintenance?",
      a: "We offer optional maintenance plans for updates, backups, performance checks, and security monitoring.",
    },
    {
      q: "Will my website be mobile-friendly?",
      a: "Absolutely. Every website we build is fully responsive and tested across modern devices and browsers.",
    },
    {
      q: "What happens after the support period ends?",
      a: "You can either extend the support plan or manage the website in-house. We'll provide handover and documentation.",
    },
  ];

  const metaPropsData = {
    title: "Web Development Packages - Transparent Pricing | Aitals Technologies",
    description:
      "Explore Aitals Technologies web development packages with simple, transparent, and scalable pricing. From one-page sites to custom CMS solutions, choose a plan that fits your business.",
    keyword:
      "web development pricing, website packages, Aitals Technologies plans, custom CMS website cost, professional website cost",
    url: "https://aitals.com/pricing",
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

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d1933] pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(16, 2, 50, 0.9), rgba(16, 2, 50, 0.8)), url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80")`,
          }}
        ></div>

        <div className="relative z-10 text-center w-full px-4 max-w-7xl mx-auto py-20">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-white font-['Poppins']"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Web Development Packages
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-200 mb-4 font-['Poppins']"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Simple. Transparent. Scalable.
          </motion.p>

          <motion.p
            className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-gray-200 leading-relaxed font-['Poppins']"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Choose a plan that fits your business needs — from startups to
            enterprise-grade platforms. No hidden charges, only clear value.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <a href="#plans">
              <button className="relative bg-white text-[#100232] text-base md:text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105 group font-['Poppins'] inline-flex items-center gap-3 overflow-hidden">
                <span className="relative z-10">View Plans</span>
                <ArrowRight size={20} className="relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#100232]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </button>
            </a>

            <Link to="/contact">
              <button className="relative border border-white text-white text-base md:text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-white hover:text-[#100232] hover:shadow-2xl hover:scale-105 group font-['Poppins'] inline-flex items-center gap-3 overflow-hidden">
                <span className="relative z-10">Contact Us</span>
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PRICING PLANS */}
      <section
        id="plans"
        ref={addToRefs}
        className="pb-10 pt-10 bg-[#f7f5ff] relative"
      >
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#100232] font-['Poppins']">
              Web Development Packages
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-['Poppins']">
              Transparent pricing with no hidden fees. All packages include responsive
              design, SEO optimization, and dedicated support.
            </p>
          </motion.div>

          {/* Plans */}
          <motion.div
            className="grid gap-8 md:grid-cols-3 items-stretch"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {plans.map((plan) => (
              <motion.article
                key={plan.name}
                variants={itemVariants}
                className={`
                  relative flex flex-col h-full rounded-[32px]
                  shadow-[0_20px_60px_rgba(15,23,42,0.14)]
                  ${
                    plan.popular
                      ? "bg-[#100232] text-white border-2 border-[#100232] z-10"
                      : "bg-white text-[#100232] border border-gray-200"
                  }
                `}
              >
                {/* Top label pill (ECONOMY / PROFESSIONAL / CMS) */}
                <div
                  className={`
                    absolute -top-4 left-1/2 -translate-x-1/2
                    px-6 py-1 rounded-full text-xs font-semibold
                    tracking-[0.18em] uppercase font-['Poppins']
                    shadow-[0_0_20px_rgba(109,75,255,0.65)]
                    z-30
                    ${
                      plan.popular
                        ? "bg-[#2b1f63] text-white"
                        : "bg-[#100232] text-white"
                    }
                  `}
                >
                  {plan.tag}
                </div>

                {/* CARD HEADER */}
                {plan.popular ? (
                  // Middle card – solid header, no slant
                  <div className="pt-10 pb-6 px-8 text-center font-['Poppins']">
                    <h3 className="text-2xl md:text-3xl font-extrabold mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm md:text-base text-gray-200 mb-5">
                      {plan.subtitle}
                    </p>
                    <p className="text-4xl md:text-5xl font-extrabold mb-2">
                      {plan.price}
                    </p>
                    <p className="text-xs md:text-sm text-gray-200">
                      {plan.highlight}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* angled purple header like reference */}
                    <div className="relative rounded-t-[32px] overflow-hidden">
                      <div
                        className="h-24 md:h-28 bg-[#221547]"
                        style={{
                          clipPath:
                            plan.tag === "ECONOMY"
                              ? "polygon(0 0, 100% 0, 100% 75%, 0 100%)" // slants down to the right
                              : "polygon(0 0, 100% 0, 100% 100%, 0 75%)", // slants down to the left (CMS)
                        }}
                      ></div>

                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-['Poppins'] px-4">
                        <h3 className="text-2xl md:text-3xl font-extrabold text-center">
                          {plan.name}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-200 mt-1 text-center">
                          {plan.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* price / highlight */}
                    <div className="px-8 pt-8 pb-4 text-center font-['Poppins']">
                      <p className="text-4xl md:text-5xl font-extrabold text-[#100232] mb-2">
                        {plan.price}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500">
                        {plan.highlight}
                      </p>
                    </div>
                  </>
                )}

                {/* FEATURES */}
                <div
                  className={`
                    flex-1 px-8 pb-6
                    ${
                      plan.popular
                        ? "text-gray-100"
                        : "text-gray-700"
                    }
                  `}
                >
                  <ul className="space-y-3 text-sm md:text-base font-['Poppins']">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle2
                          size={18}
                          className={
                            plan.popular
                              ? "mt-1 text-[#b296ff]"
                              : "mt-1 text-[#100232]"
                          }
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA BUTTON – sticks to bottom for equal visual height */}
                <div className="px-8 pb-8 mt-auto font-['Poppins']">
                  <button
                    onClick={() => handlePlanSelect(plan)}
                    className={`
                      w-full py-3.5 rounded-xl text-sm md:text-base font-semibold
                      inline-flex items-center justify-center gap-2
                      transition-all duration-300
                      ${
                        plan.popular
                          ? "bg-white text-[#100232] hover:bg-gray-100"
                          : "bg-[#100232] text-white hover:bg-[#181b4a]"
                      }
                    `}
                  >
                    {plan.cta}
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Bottom text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10 text-sm md:text-base text-gray-700 font-['Poppins']"
          >
            Need a custom solution?{" "}
            <Link
              to="/contact"
              className="font-semibold text-[#100232] underline-offset-2 hover:underline"
            >
              Contact us for a tailored proposal
            </Link>
          </motion.p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section
        ref={addToRefs}
        className="pb-10 bg-[#f6f6ff] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#100232] font-['Poppins']">
              Why Choose Our Web Development Services?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-['Poppins']">
              We deliver exceptional value through our comprehensive approach to
              web development.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {reasons.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="bg-gradient-to-b from-[#bfb3ff] to-[#f4f1ff] rounded-2xl p-8 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 text-center font-['Poppins']"
              >
                <div className="w-14 h-14 rounded-full bg-[#100232] flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#100232]">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-gray-700">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        ref={addToRefs}
        className="py-20 bg-[#100232] text-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 font-['Poppins']">
              Client Testimonials
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-['Poppins']">
              What our clients say about us
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={itemVariants}
                className="bg-white rounded-2xl p-8 shadow-xl border border-[#262b61] font-['Poppins'] text-black flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-sm md:text-base text-gray-700 mb-6 leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                {/* FOOTER FIXED AT BOTTOM */}
                <div className="text-sm mt-4">
                  <p className="font-semibold text-black">{t.name}</p>
                  <p className="text-gray-600">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ SECTION - Now fully functional */}
      <section
        ref={addToRefs}
        className="py-20 bg-white relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#100232] font-['Poppins']">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="border-2 border-[#100232] rounded-3xl p-6 md:p-8 space-y-3 md:space-y-4">
            {faqs.map((f, index) => {
              const isOpen = activeFAQ === index;

              return (
                <motion.div
                  key={f.q}
                  initial={false}
                  animate={isOpen ? { backgroundColor: "#f7f6ff" } : { backgroundColor: "#ffffff" }}
                  className="rounded-xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-start justify-between gap-4 px-4 py-3 md:py-4 rounded-xl cursor-pointer hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-start gap-3 text-left">
                      <HelpCircle className="mt-1 text-[#4a7dff]" size={20} />
                      <span className="font-['Poppins'] text-sm md:text-base font-medium text-[#100232]">
                        {f.q}
                      </span>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-1 shrink-0"
                    >
                      <ChevronDown size={20} className="text-[#100232]" />
                    </motion.div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-11 md:px-12 pb-3 md:pb-4">
                      <p className="text-sm md:text-base text-gray-700 font-['Poppins'] leading-relaxed">
                        {f.a}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
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

        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-white font-['Poppins'] leading-tight">
              Ready to Transform Your Idea Into Reality?
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed font-['Poppins']">
              Let's collaborate and build something extraordinary together. Your
              next big thing starts here with Aitals Technologies.
            </p>

            <Link to="/contact">
              <button className="relative bg-black border border-white text-white text-base md:text-lg px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 hover:scale-105 group font-['Poppins'] inline-flex items-center gap-3 overflow-hidden">
                <span className="relative z-10">Start Your Project Today</span>
                <ArrowRight size={22} className="relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
