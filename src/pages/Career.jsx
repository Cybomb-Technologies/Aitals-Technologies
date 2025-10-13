
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, DollarSign, Users, TrendingUp, Heart, Award, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Career = () => {
  const { toast } = useToast();
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const benefits = [
    { icon: TrendingUp, title: 'Career Growth', desc: 'Clear path for advancement and skill development' },
    { icon: Users, title: 'Collaborative Culture', desc: 'Work with talented professionals worldwide' },
    { icon: Heart, title: 'Work-Life Balance', desc: 'Flexible hours and remote work options' },
    { icon: Award, title: 'Competitive Benefits', desc: 'Health insurance, bonuses, and perks' },
  ];

  const openings = [
    {
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Bangalore / Remote',
      type: 'Full-time',
      salary: '₹15-25 LPA',
      description: 'Looking for experienced developers with React, Node.js expertise'
    },
    {
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Mumbai / Remote',
      type: 'Full-time',
      salary: '₹10-18 LPA',
      description: 'Creative designer with strong portfolio in web and mobile design'
    },
    {
      title: 'Mobile App Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '₹12-20 LPA',
      description: 'React Native or Flutter developer for cross-platform apps'
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Bangalore',
      type: 'Full-time',
      salary: '₹14-22 LPA',
      description: 'AWS/Azure expert with CI/CD and containerization experience'
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'Bangalore / Remote',
      type: 'Full-time',
      salary: '₹18-30 LPA',
      description: 'Strategic thinker to lead product development initiatives'
    },
    {
      title: 'QA Engineer',
      department: 'Quality',
      location: 'Remote',
      type: 'Full-time',
      salary: '₹8-15 LPA',
      description: 'Automation testing expert with Selenium/Cypress knowledge'
    },
  ];

  const departments = ['All', 'Engineering', 'Design', 'Product', 'Quality'];

  const filteredOpenings = selectedDepartment === 'All' 
    ? openings 
    : openings.filter(job => job.department === selectedDepartment);

  const handleApply = (jobTitle) => {
    toast({
      title: "🚧 Application Feature Coming Soon!",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Careers - Join Aitals Technologies | Current Openings</title>
        <meta name="description" content="Join our innovative team at Aitals Technologies. Explore career opportunities in software development, design, and technology." />
      </Helmet>

      <section className="pt-32 pb-20 gradient-bg text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-gray-100">
              Be part of a dynamic, innovative team that's shaping the future of technology. 
              We're always looking for talented individuals who are passionate about making a difference.
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
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Why Join Aitals?</h2>
            <p className="text-xl text-gray-600">Benefits that make a difference</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl text-center card-hover"
              >
                <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
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
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Current Openings</h2>
            <p className="text-xl text-gray-600 mb-8">Find your perfect role</p>

            <div className="flex flex-wrap justify-center gap-4">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedDepartment === dept
                      ? 'gradient-bg text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:shadow-md'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredOpenings.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg card-hover"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                      {job.department}
                    </span>
                  </div>
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>

                <p className="text-gray-600 mb-6">{job.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                    <span>{job.salary}</span>
                  </div>
                </div>

                <Button 
                  className="w-full gradient-bg text-white"
                  onClick={() => handleApply(job.title)}
                >
                  Apply Now
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 gradient-text">Employee Testimonials</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                  <p className="text-gray-700 italic mb-4">
                    "Working at Aitals has been transformative. The culture of innovation and the opportunity 
                    to work on cutting-edge projects has accelerated my career growth tremendously."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 gradient-bg rounded-full mr-4"></div>
                    <div>
                      <div className="font-bold">Ananya Reddy</div>
                      <div className="text-sm text-gray-600">Senior Developer</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                  <p className="text-gray-700 italic mb-4">
                    "The work-life balance and flexible remote options make Aitals stand out. 
                    Plus, the team is incredibly supportive and collaborative."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 gradient-bg rounded-full mr-4"></div>
                    <div>
                      <div className="font-bold">Michael Chen</div>
                      <div className="text-sm text-gray-600">UX Designer</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img alt="Team collaboration" className="w-full rounded-2xl shadow-2xl" src="https://images.unsplash.com/photo-1681184025442-1517cb9319c1" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 gradient-bg text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Don't See Your Role?</h2>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-10 py-6"
              onClick={() => handleApply('General Application')}
            >
              <Upload className="mr-2 w-5 h-5" />
              Submit Your CV
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Career;
  