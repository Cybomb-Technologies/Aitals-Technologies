import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Code,
  Smartphone,
  Palette,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Web Development",
    "Mobile Apps",
    "UI/UX Design",
    "E-commerce",
  ];

  const projects = [
    {
      title: "FinTech Dashboard",
      category: "Web Development",
      description:
        "Comprehensive financial analytics platform with real-time data visualization",
      image: "src/assets/Fintech.png",
      portfolioLink: "portfolio/Fintech/index.html",
      tech: ["React", "Node.js", "MongoDB"],
      results: "40% increase in user engagement",
    },
    {
      title: "Healthcare Mobile App",
      category: "Mobile Apps",
      description: "Patient management and appointment booking application",
      image: "/src/assets/Healthcare.png",
      portfolioLink: "portfolio/Healthcare/index.html",
      tech: ["React Native", "Firebase", "Redux"],
      results: "50K+ downloads in 3 months",
    },
    {
      title: "E-Learning Platform",
      category: "Web Development",
      description: "Interactive online learning platform with video streaming",
      image: "/src/assets/E-Learning.png",
      portfolioLink: "portfolio/E-Learning/index.html",
      tech: ["Next.js", "PostgreSQL", "AWS"],
      results: "10K+ active students",
    },
    // {
    //   title: 'Fashion E-commerce',
    //   category: 'E-commerce',
    //   description: 'Modern online fashion store with AR try-on feature',
    //   image: '/src/assets/fashion-ecommerce.jpg',
    //   portfolioLink: '/portfolios/fashion-ecommerce.html',
    //   tech: ['Shopify', 'React', 'Stripe'],
    //   results: '200% sales increase'
    // },
    {
      title: "Fitness Tracking App",
      category: "Mobile Apps",
      description: "Comprehensive fitness and nutrition tracking application",
      image: "/src/assets/Fitness.png",
      portfolioLink: "portfolio/Fitness/index.html",
      tech: ["Flutter", "Firebase", "ML Kit"],
      results: "4.8★ rating on stores",
    },
    {
      title: "Restaurant Booking System",
      category: "Web Development",
      description: "Table reservation and menu management platform",
      image: "/src/assets/Restaurant.png",
      portfolioLink: "portfolio/Restaurant/index.html",
      tech: ["Vue.js", "Express", "MySQL"],
      results: "500+ restaurants onboarded",
    },
    {
      title: "Art Gallery",
      category: "UI/UX Design",
      description: "Complete UI/UX overhaul for Art Customization application",
      image: "/src/assets/Painting.png",
      portfolioLink: "/portfolio/Painting/index.html",
      tech: ["Figma", "Adobe XD", "Prototyping"],
      results: "100% user needs satisfied",
    },
    // {
    //   title: 'Real Estate Platform',
    //   category: 'Web Development',
    //   description: 'Property listing and virtual tour platform',
    //   image: '/src/assets/real-estate.jpg',
    //   portfolioLink: '/portfolios/real-estate.html',
    //   tech: ['React', 'Django', 'PostgreSQL'],
    //   results: '1M+ property views/month'
    // },
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  // Fallback images for demo purposes
  const fallbackImages = {
    "FinTech Dashboard":
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "Healthcare Mobile App":
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "E-Learning Platform":
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "Fashion E-commerce":
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "Fitness Tracking App":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "Restaurant Booking System":
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "Travel App Redesign":
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "Real Estate Platform":
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  };

  const handleImageError = (e, projectTitle) => {
    e.target.src =
      fallbackImages[projectTitle] ||
      "https://images.unsplash.com/photo-1572177812156-58036aae439c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
  };

  return (
    <>
      <Helmet>
        <title>Portfolio - Aitals Technologies | Our Work & Case Studies</title>
        <meta
          name="description"
          content="Explore our portfolio of successful projects including web applications, mobile apps, and digital solutions delivered to clients worldwide."
        />
      </Helmet>

      <section className="pt-32 pb-20 gradient-bg text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Our Portfolio
            </h1>
            <p className="text-lg sm:text-xl text-gray-100 px-4">
              Showcasing our best work and the impact we've created for clients
              across industries. Each project represents our commitment to
              excellence and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all text-sm sm:text-base ${
                    selectedCategory === category
                      ? "gradient-bg text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg card-hover hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    alt={project.title}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    src={project.image}
                    onError={(e) => handleImageError(e, project.title)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 sm:p-6">
                    <a
                      href={project.portfolioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-white text-white hover:bg-white hover:text-blue-600"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </a>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-medium mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 sm:px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs sm:text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-gray-200">
                    <p className="text-xs sm:text-sm font-medium text-green-600">
                      ✓ {project.results}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Our Impact in Numbers
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Real results for real businesses
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
            {[
              { number: "500+", label: "Projects Completed" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "50+", label: "Countries Served" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Client Testimonials
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              What our clients say about us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Johnson",
                company: "TechStart Inc.",
                text: "Aitals delivered beyond our expectations. The team was professional, responsive, and truly understood our vision.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                company: "Global Retail Co.",
                text: "Our e-commerce platform has seen a 200% increase in sales since launch. Outstanding work!",
                rating: 5,
              },
              {
                name: "Priya Sharma",
                company: "HealthCare Plus",
                text: "The mobile app they built has transformed how we serve our patients. Highly recommended!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 sm:p-8 rounded-2xl"
              >
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span
                      key={i}
                      className="text-yellow-400 text-lg sm:text-xl"
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4 sm:mb-6 text-sm sm:text-base">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-bg rounded-full mr-3 sm:mr-4"></div>
                  <div>
                    <div className="font-bold text-sm sm:text-base">
                      {testimonial.name}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {testimonial.company}
                    </div>
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
