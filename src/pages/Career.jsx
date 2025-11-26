import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  Heart,
  Award,
  Upload,
  X,
  Send,
  User,
  Mail,
  Phone,
  Code,
  FileText,
  Download,
  Check,
  ChevronDown,
  ChevronUp,
  List,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Metatags from "../SEO/metatags";
const API_BASE_URL1 = import.meta.env.VITE_API_BASE_URL;

// Define API base URL (consistent with other files)
const API_BASE_URL = `${API_BASE_URL1}/api`;

// --- Custom/Mock Toast Notification ---
const useMockToast = () => {
  const [toastState, setToastState] = useState(null);

  const toast = useCallback(({ title, description, variant = "default" }) => {
    setToastState({ title, description, variant });
    setTimeout(() => setToastState(null), 5000);
  }, []);

  const ToastDisplay = () => {
    if (!toastState) return null;

    const baseClasses =
      "fixed bottom-4 right-4 p-4 rounded-xl shadow-2xl text-white max-w-sm z-50 transition-transform duration-300";
    let colorClasses = "";

    switch (toastState.variant) {
      case "destructive":
        colorClasses = "bg-red-600";
        break;
      default:
        colorClasses = "bg-green-600";
        break;
    }

    return (
      <div className={`${baseClasses} ${colorClasses}`}>
        <h3 className="font-bold text-lg mb-1 font-['Poppins']">
          {toastState.title}
        </h3>
        <p className="text-sm font-['Poppins']">{toastState.description}</p>
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
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full bg-white/50 z-10 font-['Poppins']"
          aria-label="Close job details"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 font-['Poppins']">
                {job.title}
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium font-['Poppins']">
                  {job.department}
                </span>
                {job.experienceLevel && (
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium font-['Poppins']">
                    {job.experienceLevel}
                  </span>
                )}
              </div>
            </div>
            <Briefcase className="w-10 h-10 text-blue-600 mt-2 sm:mt-0 flex-shrink-0" />
          </div>

          <p className="text-gray-600 text-lg mb-8 font-['Poppins']">
            {job.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg font-['Poppins']">
              <MapPin className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium">{job.location}</span>
            </div>
            <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg font-['Poppins']">
              <Clock className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium">{job.type}</span>
            </div>
            <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg font-['Poppins']">
              <DollarSign className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium">{job.salary}</span>
            </div>
          </div>

          <div className="space-y-8">
            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div>
                <h4 className="font-bold text-xl mb-4 flex items-center text-gray-800 font-['Poppins']">
                  <List className="w-6 h-6 mr-3 text-blue-600" />
                  Requirements
                </h4>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-start font-['Poppins']"
                    >
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
                <h4 className="font-bold text-xl mb-4 flex items-center text-gray-800 font-['Poppins']">
                  <Briefcase className="w-6 h-6 mr-3 text-blue-600" />
                  Key Responsibilities
                </h4>
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, index) => (
                    <li
                      key={index}
                      className="flex items-start font-['Poppins']"
                    >
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
                <h4 className="font-bold text-xl mb-4 flex items-center text-gray-800 font-['Poppins']">
                  <Award className="w-6 h-6 mr-3 text-green-600" />
                  Benefits & Perks
                </h4>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-start font-['Poppins']"
                    >
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
    name: "",
    email: "",
    phone: "",
    role: jobTitle,
    experience: "",
    coverLetter: "",
    resume: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const experienceOptions = [
    "Less than 1 year",
    "1 - 3 years",
    "3 - 5 years",
    "5 - 10 years",
    "10+ years",
  ];

  React.useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      role: jobTitle,
      resume: null,
    }));
    setFileName("");
  }, [jobTitle]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF or Word document (PDF, DOC, DOCX).",
          variant: "destructive",
        });
        e.target.value = "";
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive",
        });
        e.target.value = "";
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
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("experience", formData.experience);
    formDataToSend.append("coverLetter", formData.coverLetter);

    if (formData.resume) {
      formDataToSend.append("resume", formData.resume);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/application`, {
        method: "POST",
        body: formDataToSend, // Send as FormData for file upload
      });

      const responseData = await response.json();

      if (response.ok) {
        toast({
          title: "Application Submitted! 🎉",
          description:
            "Thank you for applying. We'll review your submission shortly.",
        });
        // Reset form data
        setFormData({
          name: "",
          email: "",
          phone: "",
          role: jobTitle,
          experience: "",
          coverLetter: "",
          resume: null,
        });
        setFileName("");
        onClose();
      } else {
        throw new Error(responseData.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Application submission error:", error);
      toast({
        title: "Submission Error",
        description:
          error.message ||
          "There was an issue submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return <ToastDisplay />;

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
        className="bg-white rounded-xl w-full max-w-lg lg:max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full bg-white/50 font-['Poppins']"
          aria-label="Close application form"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 md:p-8 lg:p-10">
          <h2 className="text-3xl font-bold mb-2 text-gray-800 flex items-center font-['Poppins']">
            <Briefcase className="w-7 h-7 mr-3 text-indigo-600" />
            Apply for {jobTitle}
          </h2>
          <p className="text-gray-500 mb-8 font-['Poppins']">
            Please fill out the form below to submit your application.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center font-['Poppins']">
                  <User className="w-4 h-4 mr-2" /> Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-['Poppins']"
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center font-['Poppins']">
                  <Mail className="w-4 h-4 mr-2" /> Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-['Poppins']"
                  placeholder="jane.doe@example.com"
                />
              </div>
            </div>

            {/* Phone and Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center font-['Poppins']">
                  <Phone className="w-4 h-4 mr-2" /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-['Poppins']"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center font-['Poppins']">
                  <Code className="w-4 h-4 mr-2" /> Applying For *
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  readOnly
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed font-['Poppins']"
                />
              </div>
            </div>

            {/* Experience & Resume File Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center font-['Poppins']">
                  <Clock className="w-4 h-4 mr-2" /> Total Experience
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-['Poppins']"
                >
                  <option value="" className="font-['Poppins']">
                    Select experience level
                  </option>
                  {experienceOptions.map((opt) => (
                    <option key={opt} value={opt} className="font-['Poppins']">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Resume File Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center font-['Poppins']">
                  <Upload className="w-4 h-4 mr-2" /> Resume (PDF/Word) *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 font-['Poppins']"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500 font-['Poppins']">
                  Upload your resume (PDF or Word, max 5MB)
                  {fileName && (
                    <span className="text-green-600 ml-2 flex items-center font-['Poppins']">
                      <Check className="w-3 h-3 mr-1" /> {fileName}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center font-['Poppins']">
                <FileText className="w-4 h-4 mr-2" /> Cover Letter / Message
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none font-['Poppins']"
                placeholder="Tell us why you are a great fit for this role..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full text-white shadow-lg font-['Poppins']"
              style={{
                background: "linear-gradient(to right, #362B6A, #5355A0)",
              }}
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
            <p className="text-xs text-center text-gray-400 font-['Poppins']">
              * By clicking submit, you agree to the processing of your data for
              recruitment purposes.
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
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentJobTitle, setCurrentJobTitle] = useState("");
  const [currentJobDetails, setCurrentJobDetails] = useState(null);
  const [openings, setOpenings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Careers - Join Aitals Technologies | Current Openings";
    fetchJobOpenings();
  }, []);

  // Fetch job openings from API - ONLY API, NO STATIC DATA
  const fetchJobOpenings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/applications/openings`);
      const data = await response.json();

      if (response.ok) {
        // Filter only active job openings and parse string arrays
        const activeOpenings = (data.data || data || [])
          .filter((job) => job.isActive)
          .map((job) => ({
            ...job,
            requirements: Array.isArray(job.requirements)
              ? job.requirements
              : job.requirements
              ? job.requirements.split(", ").filter((r) => r.trim())
              : [],
            responsibilities: Array.isArray(job.responsibilities)
              ? job.responsibilities
              : job.responsibilities
              ? job.responsibilities.split(", ").filter((r) => r.trim())
              : [],
            benefits: Array.isArray(job.benefits)
              ? job.benefits
              : job.benefits
              ? job.benefits.split(", ").filter((r) => r.trim())
              : [],
          }));
        setOpenings(activeOpenings);
      } else {
        console.error("Error fetching job openings:", data.message);
        // No fallback to static data - just set empty array
        setOpenings([]);
      }
    } catch (error) {
      console.error("Error fetching job openings:", error);
      // No fallback to static data - just set empty array
      setOpenings([]);
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: "Career Growth",
      desc: "Clear path for advancement and skill development",
    },
    {
      icon: Users,
      title: "Collaborative Culture",
      desc: "Work with talented professionals worldwide",
    },
    {
      icon: Heart,
      title: "Work-Life Balance",
      desc: "Flexible hours and remote work options",
    },
    {
      icon: Award,
      title: "Competitive Benefits",
      desc: "Health insurance, bonuses, and perks",
    },
  ];

  // Get unique departments from openings
  const departments = [
    "All",
    ...new Set(openings.map((job) => job.department)),
  ];

  const filteredOpenings =
    selectedDepartment === "All"
      ? openings
      : openings.filter((job) => job.department === selectedDepartment);

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
    setCurrentJobTitle("");
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setCurrentJobDetails(null);
  };

  const metaPropsData = {
    title: "Careers - Join Aitals Technologies | Current Job Openings",
    description:
      "Explore career opportunities at Aitals Technologies. Join our innovative team of developers, designers, and technology professionals. View current job openings and apply today.",
    keyword:
      "Aitals Careers, Job Openings, Tech Jobs, Software Developer Jobs, UI/UX Designer Jobs, IT Careers, Remote Jobs, Join Our Team",
    url: "https://aitals.com/careers",
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

      {/* Hero Section - Updated with Purple Background Shading */}
      <section className="pt-32 pb-20 text-white relative overflow-hidden bg-[#0d1933]">
        {/* Background Image with Purple Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(16, 2, 50, 0.9), rgba(16, 2, 50, 0.8)), url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80")`,
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 font-['Poppins']">
              Join Our
              <span className="block mt-6 bg-gradient-to-b from-[#6b4faf] to-[#ffffff] bg-clip-text text-transparent font-semibold">
                Team
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed font-['Poppins']">
              Be part of a dynamic, innovative team that's shaping the future of
              technology. We're always looking for talented individuals who are
              passionate about making a difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-[#100232]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white font-['Poppins']">
              Why Join Aitals?
            </h2>
            <p className="text-xl text-gray-300 font-['Poppins']">
              Benefits that make a difference
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl text-center card-hover bg-white font-['Poppins']"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: "linear-gradient(to right, #362B6A, #5355A0)",
                  }}
                >
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-['Poppins']">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 font-['Poppins']">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#362B6A] via-[#5355A0] to-[#362B6A] bg-clip-text text-transparent font-['Poppins']">
              Current Openings
            </h2>
            <p className="text-xl text-gray-600 mb-8 font-['Poppins']">
              Find your perfect role
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-6 py-2 rounded-full font-medium transition-all font-['Poppins'] ${
                    selectedDepartment === dept
                      ? "text-white shadow-lg"
                      : "bg-white text-gray-700 hover:shadow-md border border-gray-200"
                  }`}
                  style={
                    selectedDepartment === dept
                      ? {
                          background:
                            "linear-gradient(to right, #362B6A, #5355A0)",
                        }
                      : {}
                  }
                >
                  {dept}
                </button>
              ))}
            </div>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#362B6A]"></div>
              <span className="ml-3 text-lg text-gray-600 font-['Poppins']">
                Loading job openings...
              </span>
            </div>
          ) : filteredOpenings.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2 font-['Poppins']">
                No current openings
              </h3>
              <p className="text-gray-500 font-['Poppins']">
                Check back later for new opportunities.
              </p>
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
                  className="bg-white p-6 rounded-2xl shadow-lg card-hover flex flex-col h-full border border-gray-200 font-['Poppins']"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2 font-['Poppins']">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium font-['Poppins']">
                          {job.department}
                        </span>
                        {job.experienceLevel && (
                          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium font-['Poppins']">
                            {job.experienceLevel}
                          </span>
                        )}
                      </div>
                    </div>
                    <Briefcase className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3 flex-1 font-['Poppins']">
                    {job.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-700 text-sm font-['Poppins']">
                      <MapPin className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-700 text-sm font-['Poppins']">
                      <Clock className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center text-gray-700 text-sm font-['Poppins']">
                      <DollarSign className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <Button
                      variant="outline"
                      className="flex-1 text-gray-700 border-gray-300 hover:bg-gray-50 font-['Poppins']"
                      onClick={() => handleViewDetails(job)}
                    >
                      View Details
                    </Button>
                    <Button
                      className="flex-1 text-white font-['Poppins']"
                      style={{
                        background:
                          "linear-gradient(to right, #362B6A, #5355A0)",
                      }}
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

      {/* CTA Section */}
      <section className="py-20 text-white bg-[#100232]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-extrabold mb-6 font-['Poppins']">
              Can't Find Your Perfect Role?
            </h2>
            <p className="text-xl mb-8 text-gray-100 leading-relaxed font-['Poppins']">
              We're always interested in meeting talented people. Send us your
              resume and we'll contact you when a suitable position opens up.
            </p>
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-medium font-['Poppins']"
              onClick={() => handleApply("General Application")}
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
