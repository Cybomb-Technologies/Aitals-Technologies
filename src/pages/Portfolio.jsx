
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ExternalLink, Code, Smartphone, Palette, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web Development', 'Mobile Apps', 'UI/UX Design', 'E-commerce'];

  const projects = [
    {
      title: 'FinTech Dashboard',
      category: 'Web Development',
      description: 'Comprehensive financial analytics platform with real-time data visualization',
      image: 'Modern financial dashboard with charts and analytics',
      tech: ['React', 'Node.js', 'MongoDB'],
      results: '40% increase in user engagement'
    },
    {
      title: 'Healthcare Mobile App',
      category: 'Mobile Apps',
      description: 'Patient management and appointment booking application',
      image: 'Healthcare mobile app interface with appointment scheduling',
      tech: ['React Native', 'Firebase', 'Redux'],
      results: '50K+ downloads in 3 months'
    },
    {
      title: 'E-Learning Platform',
      category: 'Web Development',
      description: 'Interactive online learning platform with video streaming',
      image: 'E-learning platform with course catalog and video player',
      tech: ['Next.js', 'PostgreSQL', 'AWS'],
      results: '10K+ active students'
    },
    {
      title: 'Fashion E-commerce',
      category: 'E-commerce',
      description: 'Modern online fashion store with AR try-on feature',
      image: 'Fashion e-commerce website with product gallery',
      tech: ['Shopify', 'React', 'Stripe'],
      results: '200% sales increase'
    },
    {
      title: 'Fitness Tracking App',
      category: 'Mobile Apps',
      description: 'Comprehensive fitness and nutrition tracking application',
      image: 'Fitness tracking app with workout statistics',
      tech: ['Flutter', 'Firebase', 'ML Kit'],
      results: '4.8★ rating on stores'
    },
    {
      title: 'Restaurant Booking System',
      category: 'Web Development',
      description: 'Table reservation and menu management platform',
      image: 'Restaurant booking interface with table layout',
      tech: ['Vue.js', 'Express', 'MySQL'],
      results: '500+ restaurants onboarded'
    },
    {
      title: 'Travel App Redesign',
      category: 'UI/UX Design',
      description: 'Complete UI/UX overhaul for travel booking application',
      image: 'Modern travel app interface with destination cards',
      tech: ['Figma', 'Adobe XD', 'Prototyping'],
      results: '60% better user retention'
    },
    {
      title: 'Real Estate Platform',
      category: 'Web Development',
      description: 'Property listing and virtual tour platform',
      image: 'Real estate website with property listings',
      tech: ['React', 'Django', 'PostgreSQL'],
      results: '1M+ property views/month'
    },
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Portfolio - Aitals Technologies | Our Work & Case Studies</title>
        <meta name="description" content="Explore our portfolio of successful projects including web applications, mobile apps, and digital solutions delivered to clients worldwide." />
      </Helmet>

      <section className="pt-32 pb-20 gradient-bg text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Portfolio</h1>
            <p className="text-xl text-gray-100">
              Showcasing our best work and the impact we've created for clients across industries. 
              Each project represents our commitment to excellence and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
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
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'gradient-bg text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg card-hover"
              >
                <div className="relative overflow-hidden">
                  <img alt={project.title} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1572177812156-58036aae439c" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-green-600">✓ {project.results}</p>
                  </div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Our Impact in Numbers</h2>
            <p className="text-xl text-gray-600">Real results for real businesses</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Projects Completed' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '50+', label: 'Countries Served' },
              { number: '24/7', label: 'Support Available' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Client Testimonials</h2>
            <p className="text-xl text-gray-600">What our clients say about us</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Sarah Johnson',
                company: 'TechStart Inc.',
                text: 'Aitals delivered beyond our expectations. The team was professional, responsive, and truly understood our vision.',
                rating: 5
              },
              {
                name: 'Michael Chen',
                company: 'Global Retail Co.',
                text: 'Our e-commerce platform has seen a 200% increase in sales since launch. Outstanding work!',
                rating: 5
              },
              {
                name: 'Priya Sharma',
                company: 'HealthCare Plus',
                text: 'The mobile app they built has transformed how we serve our patients. Highly recommended!',
                rating: 5
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 gradient-bg rounded-full mr-4"></div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
  