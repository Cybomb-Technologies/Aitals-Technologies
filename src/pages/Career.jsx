import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, MapPin, Clock, DollarSign, Users, TrendingUp, Heart, Award, Upload, X, Send, User, Mail, Phone, Code, FileText, Download, Check, ChevronDown, ChevronUp, List, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button'; 

// Define API base URL (consistent with other files)
const API_BASE_URL = 'http://localhost:5000/api';

// --- Custom/Mock Toast Notification ---
const useMockToast = () => {
    const [toastState, setToastState] = useState(null);

    const toast = useCallback(({ title, description, variant = 'default' }) => {
        setToastState({ title, description, variant });
        setTimeout(() => setToastState(null), 5000);
    }, []);

    const ToastDisplay = () => {
        if (!toastState) return null;
        
        const baseClasses = "fixed bottom-4 right-4 p-4 rounded-xl shadow-2xl text-white max-w-sm z-50 transition-transform duration-300";
        let colorClasses = "";

        switch (toastState.variant) {
            case 'destructive':
                colorClasses = "bg-red-600";
                break;
            default:
                colorClasses = "bg-green-600";
                break;
        }

        return (
            <div className={`${baseClasses} ${colorClasses}`}>
                <h3 className="font-bold text-lg mb-1">{toastState.title}</h3>
                <p className="text-sm">{toastState.description}</p>
            </div>
        );
    };

    return { toast, ToastDisplay };
};

// --- Job Details Popup Modal Component ---
const JobDetailsModal = ({ job, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full bg-white/50 z-10"
          aria-label="Close job details"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                  {job.department}
                </span>
                {job.experienceLevel && (
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
                    {job.experienceLevel}
                  </span>
                )}
              </div>
            </div>
            <Briefcase className="w-10 h-10 text-blue-600 mt-2 sm:mt-0 flex-shrink-0" />
          </div>

          <p className="text-gray-600 text-lg mb-8">{job.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
              <MapPin className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium">{job.location}</span>
            </div>
            <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
              <Clock className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium">{job.type}</span>
            </div>
            <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
              <DollarSign className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium">{job.salary}</span>
            </div>
          </div>

          <div className="space-y-8">
            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div>
                <h4 className="font-bold text-xl mb-4 flex items-center text-gray-800">
                  <List className="w-6 h-6 mr-3 text-blue-600" />
                  Requirements
                </h4>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-base">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div>
                <h4 className="font-bold text-xl mb-4 flex items-center text-gray-800">
                  <Briefcase className="w-6 h-6 mr-3 text-blue-600" />
                  Key Responsibilities
                </h4>
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-base">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div>
                <h4 className="font-bold text-xl mb-4 flex items-center text-gray-800">
                  <Award className="w-6 h-6 mr-3 text-green-600" />
                  Benefits & Perks
                </h4>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-base">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Application Modal Component ---
const ApplicationModal = ({ isOpen, onClose, jobTitle }) => {
  const { toast, ToastDisplay } = useMockToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: jobTitle,
    experience: '',
    coverLetter: '',
    resume: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  
  const experienceOptions = [
    'Less than 1 year',
    '1 - 3 years',
    '3 - 5 years',
    '5 - 10 years',
    '10+ years'
  ];
  
  React.useEffect(() => {
    setFormData(prevData => ({
        ...prevData,
        role: jobTitle,
        resume: null
    }));
    setFileName('');
  }, [jobTitle]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: 'Invalid File Type',
          description: 'Please upload a PDF or Word document (PDF, DOC, DOCX).',
          variant: 'destructive'
        });
        e.target.value = '';
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File Too Large',
          description: 'Please upload a file smaller than 5MB.',
          variant: 'destructive'
        });
        e.target.value = '';
        return;
      }
      
      setFormData({ ...formData, resume: file });
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Create FormData for file upload
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('role', formData.role);
    formDataToSend.append('experience', formData.experience);
    formDataToSend.append('coverLetter', formData.coverLetter);
    
    if (formData.resume) {
      formDataToSend.append('resume', formData.resume);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/application`, {
        method: 'POST',
        body: formDataToSend, // Send as FormData for file upload
      });

      const responseData = await response.json();

      if (response.ok) {
        toast({
          title: 'Application Submitted! 🎉',
          description: "Thank you for applying. We'll review your submission shortly.",
        });
        // Reset form data
        setFormData({ 
          name: '', email: '', phone: '', 
          role: jobTitle, experience: '', 
          coverLetter: '', resume: null
        });
        setFileName('');
        onClose();
      } else {
        throw new Error(responseData.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Application submission error:', error);
      toast({
        title: 'Submission Error',
        description: error.message || 'There was an issue submitting your application. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return <ToastDisplay />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl w-full max-w-lg lg:max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full bg-white/50"
          aria-label="Close application form"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 md:p-8 lg:p-10">
          <h2 className="text-3xl font-bold mb-2 text-gray-800 flex items-center">
            <Briefcase className="w-7 h-7 mr-3 text-indigo-600" />
            Apply for {jobTitle}
          </h2>
          <p className="text-gray-500 mb-8">
            Please fill out the form below to submit your application.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <User className="w-4 h-4 mr-2" /> Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Jane Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Mail className="w-4 h-4 mr-2" /> Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="jane.doe@example.com"
                />
              </div>
            </div>

            {/* Phone and Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Phone className="w-4 h-4 mr-2" /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Code className="w-4 h-4 mr-2" /> Applying For *
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  readOnly
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Experience & Resume File Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Clock className="w-4 h-4 mr-2" /> Total Experience
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  <option value="">Select experience level</option>
                  {experienceOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Resume File Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Upload className="w-4 h-4 mr-2" /> Resume (PDF/Word) *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Upload your resume (PDF or Word, max 5MB)
                  {fileName && (
                    <span className="text-green-600 ml-2 flex items-center">
                      <Check className="w-3 h-3 mr-1" /> {fileName}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FileText className="w-4 h-4 mr-2" /> Cover Letter / Message
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
                placeholder="Tell us why you are a great fit for this role..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full text-white shadow-lg"
              style={{background: 'linear-gradient(to right, #1A173A, #6666CC)'}}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 animate-spin" /> Submitting...
                </span>
              ) : (
                <span className="flex items-center">
                  <Send className="w-5 h-5 mr-2" />
                  Submit Application
                </span>
              )}
            </Button>
            <p className="text-xs text-center text-gray-400">
              * By clicking submit, you agree to the processing of your data for recruitment purposes.
            </p>
          </form>
        </div>
      </motion.div>
      <ToastDisplay />
    </div>
  );
};

// --- Main Career Component ---
const Career = () => {
  const { ToastDisplay } = useMockToast();
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentJobTitle, setCurrentJobTitle] = useState('');
  const [currentJobDetails, setCurrentJobDetails] = useState(null);
  const [openings, setOpenings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Careers - Join Aitals Technologies | Current Openings";
    fetchJobOpenings();
  }, []);

  // Fetch job openings from API
  const fetchJobOpenings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/applications/openings`);
      const data = await response.json();
      
      if (response.ok) {
        // Filter only active job openings and parse string arrays
        const activeOpenings = (data.data || data || []).filter(job => job.isActive).map(job => ({
          ...job,
          requirements: Array.isArray(job.requirements) ? job.requirements : 
                       (job.requirements ? job.requirements.split(', ').filter(r => r.trim()) : []),
          responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities : 
                          (job.responsibilities ? job.responsibilities.split(', ').filter(r => r.trim()) : []),
          benefits: Array.isArray(job.benefits) ? job.benefits : 
                   (job.benefits ? job.benefits.split(', ').filter(r => r.trim()) : [])
        }));
        setOpenings(activeOpenings);
      } else {
        console.error('Error fetching job openings:', data.message);
        // Fallback to sample data if API fails
        setOpenings(getSampleOpenings());
      }
    } catch (error) {
      console.error('Error fetching job openings:', error);
      // Fallback to sample data
      setOpenings(getSampleOpenings());
    } finally {
      setLoading(false);
    }
  };

  // Enhanced sample data with full details
  const getSampleOpenings = () => [
    {
      _id: '1',
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Bangalore / Remote',
      type: 'Full-time',
      salary: '₹15-25 LPA',
      description: 'Looking for experienced developers with React, Node.js expertise to build scalable web applications.',
      experienceLevel: 'Senior',
      requirements: [
        '5+ years of experience in full-stack development',
        'Strong proficiency in React.js and Node.js',
        'Experience with databases (MongoDB, PostgreSQL)',
        'Knowledge of cloud platforms (AWS, Azure)',
        'Experience with RESTful APIs and microservices'
      ],
      responsibilities: [
        'Design and develop scalable web applications',
        'Collaborate with cross-functional teams',
        'Write clean, maintainable code',
        'Participate in code reviews',
        'Mentor junior developers'
      ],
      benefits: [
        'Flexible work hours',
        'Remote work options',
        'Health insurance',
        'Learning and development budget',
        'Annual performance bonuses'
      ],
      isActive: true
    },
    {
      _id: '2',
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Mumbai / Remote',
      type: 'Full-time',
      salary: '₹10-18 LPA',
      description: 'Creative designer with strong portfolio in web and mobile design to create intuitive user experiences.',
      experienceLevel: 'Mid',
      requirements: [
        '3+ years of UI/UX design experience',
        'Proficiency in Figma, Adobe Creative Suite',
        'Strong portfolio showcasing design process',
        'Understanding of user-centered design principles',
        'Experience with prototyping tools'
      ],
      responsibilities: [
        'Create wireframes, prototypes, and high-fidelity designs',
        'Conduct user research and usability testing',
        'Collaborate with product and development teams',
        'Maintain design systems and style guides',
        'Stay updated with design trends and best practices'
      ],
      benefits: [
        'Creative freedom and ownership',
        'Latest design tools and software',
        'Conference and workshop allowances',
        'Flexible work arrangements',
        'Comprehensive health coverage'
      ],
      isActive: true
    }
  ];

  const benefits = [
    { icon: TrendingUp, title: 'Career Growth', desc: 'Clear path for advancement and skill development' },
    { icon: Users, title: 'Collaborative Culture', desc: 'Work with talented professionals worldwide' },
    { icon: Heart, title: 'Work-Life Balance', desc: 'Flexible hours and remote work options' },
    { icon: Award, title: 'Competitive Benefits', desc: 'Health insurance, bonuses, and perks' },
  ];

  // Get unique departments from openings
  const departments = ['All', ...new Set(openings.map(job => job.department))];

  const filteredOpenings = selectedDepartment === 'All' 
    ? openings 
    : openings.filter(job => job.department === selectedDepartment);

  const handleApply = (jobTitle) => {
    setCurrentJobTitle(jobTitle);
    setIsModalOpen(true);
  };

  const handleViewDetails = (job) => {
    setCurrentJobDetails(job);
    setIsDetailsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentJobTitle('');
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setCurrentJobDetails(null);
  };

  return (
    <>
      {/* Application Modal */}
      <ApplicationModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        jobTitle={currentJobTitle} 
      />

      {/* Job Details Modal */}
      <JobDetailsModal 
        job={currentJobDetails}
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
      />
      
      {/* Toast Display */}
      <ToastDisplay />

      <section className="pt-32 pb-20 text-white" style={{background: 'linear-gradient(to right, #1A173A, #6666CC)'}}>
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
                className="p-8 rounded-2xl text-center card-hover"
                style={{background: 'linear-gradient(135deg, #EFF6FF, #EDE9FE)'}}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{background: 'linear-gradient(to right, #1A173A, #6666CC)'}}
                >
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{background: 'linear-gradient(135deg, #F9FAFB, #EFF6FF)'}}>
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
                      ? 'text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:shadow-md'
                  }`}
                  style={selectedDepartment === dept ? {background: 'linear-gradient(to right, #1A173A, #6666CC)'} : {}}
                >
                  {dept}
                </button>
              ))}
            </div>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <span className="ml-3 text-lg text-gray-600">Loading job openings...</span>
            </div>
          ) : filteredOpenings.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No current openings</h3>
              <p className="text-gray-500">Check back later for new opportunities.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {filteredOpenings.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-lg card-hover flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                          {job.department}
                        </span>
                        {job.experienceLevel && (
                          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
                            {job.experienceLevel}
                          </span>
                        )}
                      </div>
                    </div>
                    <Briefcase className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3 flex-1">{job.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-700 text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-700 text-sm">
                      <Clock className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center text-gray-700 text-sm">
                      <DollarSign className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <Button 
                      variant="outline"
                      className="flex-1 text-gray-700 border-gray-300 hover:bg-gray-50"
                      onClick={() => handleViewDetails(job)}
                    >
                      View Details
                    </Button>
                    <Button 
                      className="flex-1 text-white"
                      style={{background: 'linear-gradient(to right, #1A173A, #6666CC)'}}
                      onClick={() => handleApply(job.title)}
                    >
                      Apply Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
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
                <div 
                  className="p-6 rounded-xl"
                  style={{background: 'linear-gradient(135deg, #EFF6FF, #EDE9FE)'}}
                >
                  <p className="text-gray-700 italic mb-4">
                    "Working at Aitals has been transformative. The culture of innovation and the opportunity 
                    to work on cutting-edge projects has accelerated my career growth tremendously."
                  </p>
                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-full mr-4"
                      style={{background: 'linear-gradient(to right, #1A173A, #6666CC)'}}
                    ></div>
                    <div>
                      <div className="font-bold">Ananya Reddy</div>
                      <div className="text-sm text-gray-600">Senior Developer</div>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-6 rounded-xl"
                  style={{background: 'linear-gradient(135deg, #EFF6FF, #EDE9FE)'}}
                >
                  <p className="text-gray-700 italic mb-4">
                    "The work-life balance and flexible remote options make Aitals stand out. 
                    Plus, the team is incredibly supportive and collaborative."
                  </p>
                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-full mr-4"
                      style={{background: 'linear-gradient(to right, #1A173A, #6666CC)'}}
                    ></div>
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
              <img 
                alt="Team collaboration" 
                className="w-full rounded-2xl shadow-2xl object-cover" 
                style={{height:'25rem' }} 
                src="https://img.freepik.com/free-photo/businessman-black-suit-makes-thumb-up-sign_114579-18993.jpg?t=st=1760440521~exp=1760444121~hmac=deb835c301c74f8ad5f6d7f908479afb41887c6ebe0f8676bacc46eaf963a41e&w=1480" 
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/800x400/1A173A/FFFFFF?text=Image+Unavailable" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 text-white" style={{background: 'linear-gradient(to right, #1A173A, #6666CC)'}}>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Can't Find Your Perfect Role?</h2>
            <p className="text-xl mb-8 text-gray-100">
              We're always interested in meeting talented people. Send us your resume and we'll 
              contact you when a suitable position opens up.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-medium"
              onClick={() => handleApply('General Application')}
            >
              <Upload className="w-5 h-5 mr-2" />
              Submit General Application
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Career;