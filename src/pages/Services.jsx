
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Code, Smartphone, Palette, ShoppingCart, TestTube, Cloud, Brain, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: Code,
      title: 'Custom Web Development',
      desc: 'Build powerful, scalable web applications tailored to your business needs',
      features: ['React & Next.js', 'Node.js Backend', 'RESTful APIs', 'Progressive Web Apps'],
      image: 'Modern web development workspace with code on multiple screens'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      desc: 'Native iOS and Android applications with seamless user experiences',
      features: ['React Native', 'Flutter', 'Native iOS/Android', 'Cross-platform Solutions'],
      image: 'Mobile app development with smartphone mockups and UI designs'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      desc: 'Beautiful, intuitive designs that users love and convert',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
      image: 'UI/UX designer working on interface designs and prototypes'
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce Solutions',
      desc: 'Complete online store solutions with payment integration',
      features: ['Shopify Development', 'WooCommerce', 'Custom Platforms', 'Payment Gateways'],
      image: 'E-commerce platform with shopping cart and product displays'
    },
    {
      icon: TestTube,
      title: 'Software Testing & Maintenance',
      desc: 'Comprehensive QA and ongoing support for your applications',
      features: ['Automated Testing', 'Manual QA', 'Performance Testing', '24/7 Support'],
      image: 'Software testing and quality assurance process visualization'
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps Services',
      desc: 'Scalable cloud infrastructure and continuous deployment',
      features: ['AWS/Azure/GCP', 'CI/CD Pipelines', 'Docker & Kubernetes', 'Infrastructure as Code'],
      image: 'Cloud infrastructure and DevOps workflow diagram'
    },
    {
      icon: Brain,
      title: 'AI & Automation Integration',
      desc: 'Intelligent solutions powered by machine learning and AI',
      features: ['Machine Learning', 'Natural Language Processing', 'Chatbots', 'Process Automation'],
      image: 'AI and machine learning visualization with neural networks'
    },
  ];

  const processSteps = [
    { title: 'Discovery', desc: 'Understanding your vision and requirements', icon: '🔍' },
    { title: 'Design', desc: 'Creating beautiful, functional designs', icon: '🎨' },
    { title: 'Development', desc: 'Building with cutting-edge technology', icon: '⚙️' },
    { title: 'Deployment', desc: 'Launching your product to the world', icon: '🚀' },
    { title: 'Support', desc: 'Ongoing maintenance and updates', icon: '🛠️' },
  ];

  return (
    <>
      <Helmet>
        <title>Our Services - Aitals Technologies | Web & Mobile Development</title>
        <meta name="description" content="Comprehensive software development services including web development, mobile apps, UI/UX design, cloud solutions, and AI integration." />
      </Helmet>

      <section className="pt-32 pb-20 gradient-bg text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-100">
              Comprehensive digital solutions to transform your business. From concept to deployment, 
              we deliver excellence at every step.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center mr-4">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold gradient-text">{service.title}</h2>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">{service.desc}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact">
                    <Button className="gradient-bg text-white">
                      Get Started
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <img alt={service.title} className="w-full rounded-2xl shadow-2xl" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Our Development Process</h2>
            <p className="text-xl text-gray-600">A proven methodology for successful project delivery</p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform -translate-y-1/2 hidden lg:block"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg relative z-10">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's discuss how we can help bring your vision to life with our expert services
            </p>
            <Link to="/contact">
              <Button size="lg" className="gradient-bg text-white text-lg px-10 py-6">
                Let's Build Your Next Big Thing
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
  