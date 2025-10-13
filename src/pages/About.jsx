
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Users, Award, TrendingUp, Globe, Zap } from 'lucide-react';

const About = () => {
  const milestones = [
    { year: '2018', title: 'Company Founded', desc: 'Started with a vision to innovate' },
    { year: '2019', title: 'First 100 Clients', desc: 'Reached our first major milestone' },
    { year: '2021', title: 'Global Expansion', desc: 'Opened offices in 5 countries' },
    { year: '2023', title: 'AI Integration', desc: 'Launched AI-powered solutions' },
    { year: '2025', title: 'Industry Leader', desc: '500+ successful projects delivered' },
  ];

  const team = [
    { name: 'Rajesh Kumar', role: 'CEO & Founder', image: 'Professional CEO portrait in modern office' },
    { name: 'Priya Sharma', role: 'CTO', image: 'Female technology leader portrait' },
    { name: 'Amit Patel', role: 'Head of Design', image: 'Creative design director portrait' },
    { name: 'Sarah Johnson', role: 'Project Manager', image: 'Professional project manager portrait' },
  ];

  const values = [
    { icon: Target, title: 'Innovation', desc: 'Pushing boundaries with cutting-edge technology' },
    { icon: Heart, title: 'Passion', desc: 'Dedicated to excellence in every project' },
    { icon: Users, title: 'Collaboration', desc: 'Working together to achieve greatness' },
    { icon: Award, title: 'Quality', desc: 'Delivering world-class solutions' },
  ];

  const culture = [
    { icon: Zap, title: 'Innovation-Driven', desc: 'Encouraging creative thinking and experimentation' },
    { icon: Globe, title: 'Global Exposure', desc: 'Work with international clients and teams' },
    { icon: TrendingUp, title: 'Growth Opportunities', desc: 'Continuous learning and career advancement' },
    { icon: Users, title: 'Flexible Work', desc: 'Remote-friendly with work-life balance' },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Aitals Technologies | Our Story & Team</title>
        <meta name="description" content="Learn about Aitals Technologies - our vision, mission, values, and the talented team driving digital innovation worldwide." />
      </Helmet>

      <section className="pt-32 pb-20 gradient-bg text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Aitals Technologies</h1>
            <p className="text-xl text-gray-100">
              We are a global software development company committed to transforming ideas into powerful digital solutions. 
              With innovation at our core, we deliver excellence across web, mobile, and cloud technologies.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <Eye className="w-12 h-12 text-blue-600 mr-4" />
                <h2 className="text-4xl font-bold gradient-text">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To be the world's most trusted technology partner, empowering businesses with innovative digital solutions 
                that drive growth, efficiency, and transformation in the digital age.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img alt="Vision illustration" className="w-full rounded-2xl shadow-xl" src="https://images.unsplash.com/photo-1666336356089-15855f42ddb3" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <img alt="Mission illustration" className="w-full rounded-2xl shadow-xl" src="https://images.unsplash.com/photo-1681992894234-6db66a592c29" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <div className="flex items-center mb-6">
                <Target className="w-12 h-12 text-purple-600 mr-4" />
                <h2 className="text-4xl font-bold gradient-text">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To deliver exceptional software solutions that exceed client expectations through innovation, quality, 
                and dedication. We strive to build long-term partnerships by understanding unique business needs and 
                providing tailored technology solutions.
              </p>
            </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center card-hover"
              >
                <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Our Journey</h2>
            <p className="text-xl text-gray-600">Milestones that shaped our success</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center mb-12 last:mb-0"
              >
                <div className="flex-shrink-0 w-24 text-right mr-8">
                  <div className="text-3xl font-bold gradient-text">{milestone.year}</div>
                </div>
                <div className="flex-shrink-0 w-4 h-4 gradient-bg rounded-full"></div>
                <div className="flex-grow ml-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.desc}</p>
                </div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The brilliant minds behind our success</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover"
              >
                <img alt={member.name} className="w-full h-64 object-cover" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium">{member.role}</p>
                </div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Life at Aitals</h2>
            <p className="text-xl text-gray-600">A culture of innovation, growth, and collaboration</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {culture.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl text-center"
              >
                <div className="w-14 h-14 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <img alt="Team collaboration" className="w-full h-64 object-cover rounded-xl shadow-lg" src="https://images.unsplash.com/photo-1651009188116-bb5f80eaf6aa" />
            <img alt="Innovation workspace" className="w-full h-64 object-cover rounded-xl shadow-lg" src="https://images.unsplash.com/photo-1565841327798-694bc2074762" />
            <img alt="Team celebration" className="w-full h-64 object-cover rounded-xl shadow-lg" src="https://images.unsplash.com/photo-1604398094327-cb34d258d473" />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
  