import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Zap,
  Shield,
  Database,
  Cpu,
  Bot,
  Workflow,
  CheckCircle,
  Users,
  Award,
  Clock,
  BarChart,
  MessageCircle,
  Palette,
} from "lucide-react";
import Metatags from "../../../SEO/metatags";

const AiAutomation = () => {
  const sectionRefs = useRef([]);
  const [selectedTechCategory, setSelectedTechCategory] =
    useState("LLMs & NLP");

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
      icon: Brain,
      title: "AI-Powered Insights",
      desc: "Leverage machine learning to uncover patterns and make data-driven decisions",
    },
    {
      icon: Zap,
      title: "Intelligent Automation",
      desc: "Automate complex workflows and business processes with AI-driven solutions",
    },
    {
      icon: Shield,
      title: "Secure AI Integration",
      desc: "Enterprise-grade security for all AI models and automation workflows",
    },
    {
      icon: Database,
      title: "Data Intelligence",
      desc: "Transform raw data into actionable intelligence with advanced analytics",
    },
    {
      icon: Bot,
      title: "Smart Chatbots",
      desc: "AI-powered conversational agents that provide 24/7 customer support",
    },
    {
      icon: Workflow,
      title: "Process Optimization",
      desc: "Streamline operations and reduce costs through intelligent automation",
    },
  ];

  const technologies = {
    "LLMs & NLP": [
      {
        name: "OpenAI GPT-4",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/OpenAI_logo_2025_%28symbol%29.svg/250px-OpenAI_logo_2025_%28symbol%29.svg.png",
      },
      {
        name: "Claude",
        logo: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/claude-color.png",
      },
      {
        name: "Mistral",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Mistral_AI_logo_%282025%E2%80%93%29.svg/768px-Mistral_AI_logo_%282025%E2%80%93%29.svg.png?20250207103322",
      },
      {
        name: "Cohere",
        logo: "https://cdn.brandfetch.io/idfDTLvPCK/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B",
      },
      {
        name: "Google Gemini",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Google-gemini-icon.svg/2048px-Google-gemini-icon.svg.png",
      },
    ],
    "ML Platforms": [
      {
        name: "TensorFlow",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
      },
      {
        name: "PyTorch",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
      },
      {
        name: "Vertex AI",
        logo: "https://images.seeklogo.com/logo-png/52/2/vertex-ai-logo-png_seeklogo-523075.png",
      },
      {
        name: "Azure ML",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
      },
      {
        name: "Hugging Face",
        logo: "https://huggingface.co/front/assets/huggingface_logo.svg",
      },
    ],
    Automation: [
      {
        name: "Zapier",
        logo: "https://img.icons8.com/color/512/zapier.png",
      },
      {
        name: "Make",
        logo: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/make-color.png",
      },
      {
        name: "LangChain",
        logo: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/langchain-ipuhh4qo1jz5ssl4x0g2a.png/langchain-dp1uxj2zn3752pntqnpfu2.png?_a=DATAg1AAZAA0",
      },
      {
        name: "AutoGPT",
        logo: "https://upload.wikimedia.org/wikipedia/commons/8/80/Auto_GPT_Logo.png",
      },
      {
        name: "Airflow",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apacheairflow/apacheairflow-original.svg",
      },
    ],
    "Vision & Voice": [
      {
        name: "Google Vision",
        logo: "https://www.svgrepo.com/show/375395/cloud-vision-api.svg",
      },
      {
        name: "AWS Rekognition",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/768px-Amazon_Web_Services_Logo.svg.png",
      },
      {
        name: "ElevenLabs",
        logo: "https://cdn.brandfetch.io/idl_sWY35e/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B",
      },
      {
        name: "Speechly",
        logo: "https://dreamy-cori-a02de1.netlify.app/logo512.png",
      },
      {
        name: "Twilio",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twilio/twilio-original.svg",
      },
    ],
    Deployment: [
      {
        name: "Docker",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        name: "FastAPI",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
      },
      {
        name: "Flask",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
      },
      {
        name: "Streamlit",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg",
      },
      {
        name: "Kubernetes",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
      },
    ],
  };

  const process = [
    {
      number: "01",
      title: "AI Strategy & Discovery",
      desc: "Analyze your business processes and identify AI automation opportunities",
    },
    {
      number: "02",
      title: "Data Preparation",
      desc: "Clean, structure, and prepare your data for AI model training",
    },
    {
      number: "03",
      title: "Model Development",
      desc: "Build and train custom AI models tailored to your specific needs",
    },
    {
      number: "04",
      title: "Integration & Testing",
      desc: "Seamlessly integrate AI solutions into your existing workflows",
    },
    {
      number: "05",
      title: "Deployment & Monitoring",
      desc: "Deploy AI models with continuous performance monitoring",
    },
    {
      number: "06",
      title: "Optimization & Scaling",
      desc: "Continuously improve and scale your AI capabilities",
    },
  ];

  const solutions = [
    {
      icon: Bot,
      title: "Intelligent Chatbots",
      desc: "AI-powered conversational agents that provide 24/7 customer support and lead generation",
      features: [
        "Natural Language Processing",
        "Multi-language Support",
        "Sentiment Analysis",
      ],
    },
    {
      icon: Workflow,
      title: "Process Automation",
      desc: "Automate complex business workflows with AI-driven decision making and robotic process automation",
      features: [
        "Workflow Automation",
        "Decision Intelligence",
        "Process Mining",
      ],
    },
    {
      icon: BarChart,
      title: "Predictive Analytics",
      desc: "Leverage machine learning to forecast trends, identify opportunities, and mitigate risks",
      features: [
        "Forecasting Models",
        "Anomaly Detection",
        "Pattern Recognition",
      ],
    },
    {
      icon: Cpu,
      title: "Computer Vision",
      desc: "Implement image and video analysis for quality control, security, and automation",
      features: ["Object Detection", "Image Classification", "OCR Processing"],
    },
  ];

  const stats = [
    { number: "150+", label: "AI Projects Deployed" },
    { number: "95%", label: "Process Efficiency Gain" },
    { number: "40+", label: "AI Experts" },
    { number: "24/7", label: "AI Monitoring" },
  ];

  const techCategories = Object.keys(technologies);

  const metaPropsData = {
    title: "AI & Automation Integration Services | Aitals Technologies",
    description:
      "Transform your business with Aitals Technologies' AI and automation solutions. Machine learning, intelligent automation, chatbots, and AI-powered business transformation.",
    keyword:
      "AI Integration, Automation Solutions, Machine Learning, Intelligent Chatbots, Business Automation, AI Development, Predictive Analytics, Computer Vision",
    url: "https://aitals.com/services/ai-automation",
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
            backgroundImage: `linear-gradient(rgba(16, 2, 50, 0.9), rgba(16, 2, 50, 0.8)), url("https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80")`,
          }}
        ></div>

        <div className="relative z-10 text-center w-full px-4 max-w-7xl mx-auto py-20">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight text-white font-['Poppins']"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            AI &
            <span className="block mt-6 bg-gradient-to-b from-[#6b4faf] to-[#ffffff] bg-clip-text text-transparent font-semibold">
              Automation
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-200 leading-relaxed font-['Poppins'] font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transform your business with intelligent automation and AI-powered
            solutions that drive efficiency, innovation, and growth
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
              <span className="relative z-10">Start AI Project</span>
              <ArrowRight size={20} className="relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </Link>

            <Link
              to="/portfolio"
              className="relative bg-black border border-white text-white text-lg px-10 py-5 rounded-xl font-semibold flex items-center gap-3 min-w-[200px] justify-center overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 hover:scale-105 group"
            >
              <span className="relative z-10">View AI Projects</span>
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
              Why Choose Our AI Services
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              We combine cutting-edge AI technologies with deep industry
              expertise to deliver intelligent solutions that transform
              businesses
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

      {/* Technologies Section - Updated with white icon backgrounds */}
      <section
        ref={addToRefs}
        className="py-20 bg-[#100232] relative opacity-0 translate-y-8 transition-all duration-700"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-white font-['Poppins'] relative inline-block">
              Technologies We Use
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              We leverage the latest AI and automation technologies to build
              intelligent, scalable solutions
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
              Our AI Development Process
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              A structured methodology for developing and deploying AI solutions
              that deliver measurable business value
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
              Our AI Solutions
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-['Poppins']">
              Comprehensive AI and automation services tailored to transform
              your business operations
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
              Our AI Achievements
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#4a7dff] to-[#3a6df0] rounded-full"></div>
            </h2>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-16 leading-relaxed font-['Poppins']">
              Proven results in delivering AI solutions that drive business
              transformation and innovation
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

      {/* CTA Section - Updated with original animations and black button */}
      <section
        ref={addToRefs}
        className="py-20 bg-gradient-to-br from-[#0d1933] to-[#1a2b4d] relative overflow-hidden opacity-0 translate-y-8 transition-all duration-700"
      >
        {/* Spinning Animation */}
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-radial-gradient from-white/10 to-transparent animate-spin-medium"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white font-['Poppins'] leading-tight">
              Ready to Transform with AI?
            </h2>

            <p className="text-xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed font-['Poppins']">
              Let's discuss how AI and automation can revolutionize your
              business operations and drive growth
            </p>

            <Link
              to="/contact"
              className="relative bg-black border border-white text-white text-lg px-12 py-6 rounded-xl font-semibold inline-flex items-center gap-2 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/30 hover:scale-105 group mx-auto"
            >
              <span className="relative z-10">Start AI Transformation</span>
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

export default AiAutomation;
