
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Smartphone, Palette, Cloud, Brain, Shield, Globe, Users, Award, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  const services = [
    { icon: Code, title: 'Web Development', desc: 'Custom websites built with cutting-edge technologies' },
    { icon: Smartphone, title: 'Mobile Apps', desc: 'Native iOS & Android applications' },
    { icon: Palette, title: 'UI/UX Design', desc: 'Beautiful, user-centric design solutions' },
    { icon: Cloud, title: 'Cloud Integration', desc: 'Scalable cloud infrastructure & DevOps' },
    { icon: Brain, title: 'AI Solutions', desc: 'Intelligent automation & machine learning' },
    { icon: Shield, title: 'Quality Assurance', desc: 'Comprehensive testing & maintenance' },
  ];

  const whyChooseUs = [
    { icon: Award, title: 'Quality Excellence', desc: 'Industry-leading standards in every project' },
    { icon: Users, title: 'Expert Team', desc: '50+ skilled developers and designers' },
    { icon: TrendingUp, title: '24/7 Support', desc: 'Round-the-clock technical assistance' },
  ];

  const projects = [
    { title: 'E-Commerce Platform', category: 'Web Development', image: 'Modern e-commerce website with shopping cart' },
    { title: 'Healthcare App', category: 'Mobile Development', image: 'Medical appointment booking mobile application' },
    { title: 'Finance Dashboard', category: 'UI/UX Design', image: 'Financial analytics dashboard interface' },
    { title: 'AI Chatbot', category: 'AI Solutions', image: 'Intelligent customer service chatbot interface' },
  ];

  return (
    <>
      <Helmet>
        <title>Aitals Technologies - Innovating Ideas Into Digital Excellence</title>
        <meta name="description" content="Leading software and web development company specializing in custom mobile apps, website design, and digital solutions. Transform your ideas into reality." />
      </Helmet>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient">
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Innovating Ideas Into<br />
              <span className="text-yellow-300">Digital Excellence</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100"
            >
              We transform your vision into powerful digital solutions with cutting-edge technology and creative innovation
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
                  Let's Build Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                  View Our Work
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-16"
            >
              <img alt="Technology innovation illustration" className="mx-auto max-w-2xl w-full floating" src="https://images.unsplash.com/photo-1666336356089-15855f42ddb3" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">About Aitals Technologies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A global leader in software development, delivering innovative digital solutions to clients worldwide. 
              We combine technical expertise with creative vision to build products that drive business growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl card-hover border border-blue-100"
              >
                <div className="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center mb-4 pulse-glow">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Why Choose Us</h2>
            <p className="text-xl text-gray-600">Your success is our mission</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-xl text-center card-hover"
              >
                <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Recent Projects</h2>
            <p className="text-xl text-gray-600">Showcasing our latest innovations</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg card-hover"
              >
                <img alt={project.title} className="w-full h-64 object-cover" src="https://images.unsplash.com/photo-1572177812156-58036aae439c" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <span className="text-blue-300 text-sm mb-2">{project.category}</span>
                  <h3 className="text-white text-xl font-bold">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/portfolio">
              <Button size="lg" className="gradient-bg text-white">
                View All Projects
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 gradient-bg text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Trusted by Global Clients</h2>
              <p className="text-xl mb-8 text-gray-100">
                We've delivered successful projects to clients across USA, Europe, Asia, and beyond. 
                Our commitment to excellence has made us a preferred technology partner worldwide.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-4xl font-bold mb-2">500+</div>
                  <div className="text-gray-200">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">50+</div>
                  <div className="text-gray-200">Countries Served</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">98%</div>
                  <div className="text-gray-200">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <div className="text-gray-200">Support Available</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img alt="Global connectivity" className="w-full rounded-2xl shadow-2xl" src="https://images.unsplash.com/photo-1643101807331-21a4a3f081d5" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Ready to Transform Your Idea Into Reality?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's collaborate and build something extraordinary together. Your next big thing starts here.
            </p>
            <Link to="/contact">
              <Button size="lg" className="gradient-bg text-white text-lg px-10 py-6">
                Work With Aitals – Your Tech Innovation Partner
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
  