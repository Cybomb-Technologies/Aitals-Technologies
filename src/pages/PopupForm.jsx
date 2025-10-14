import React, { useState, useEffect } from 'react';
// 1. Import the country codes list library
import * as countryCodes from 'country-codes-list'; 

// Function to generate the required country list format
const getCountryDialCodes = () => {
    // This creates an object where:
    // key is the dial code (e.g., '+1')
    // value is the label (e.g., '+1 (United States)')
    const list = countryCodes.customList(
        // Key: countryCallingCode (the phone code)
        'countryCallingCode', 
        // Value format: {countryCallingCode} ({countryNameEn})
        '{countryCallingCode} ({countryNameEn})'
    );

    // Convert the object to an array of objects for easier rendering
    // and filtering out duplicate codes (e.g., US/Canada are both +1)
    const uniqueCodes = {};
    Object.keys(list).forEach(code => {
        // Group by the actual dial code to avoid duplicates in the <select>
        const dialCode = code; // The key already is the dial code in this custom list
        const label = list[code];
        
        // This logic simplifies the list by keeping only the first country found for a given dial code.
        // For example, if both US and Canada are '+1', only the first one found in the object keys will be kept.
        if (!uniqueCodes[dialCode]) {
            uniqueCodes[dialCode] = {
                code: dialCode,
                label: label.replace(` (${countryCodes.findOne(dialCode).countryNameEn})`, ''), // Keep just the code for the value
                name: label // Full label for display
            };
        }
    });

    // Final array for React rendering
    return Object.values(uniqueCodes).sort((a, b) => a.code.localeCompare(b.code));
};


const ContactPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  // 2. Add state for the full list of codes
  const [countryCodeList, setCountryCodeList] = useState([]); 
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    countryCode: '+91', // Default to a common code
    source: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Show popup after 3 seconds (3000ms) and load country codes
  useEffect(() => {
    // Load the country codes once
    setCountryCodeList(getCountryDialCodes());

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Prepare data for API call
      const submissionData = {
        email: formData.email,
        subject: `Enquiry from ${formData.firstName}`,
        // Use the selected country code in the message
        message: `Name: ${formData.firstName}\nPhone: ${formData.countryCode} ${formData.phone}\nSource: ${formData.source}\n\nMessage: ${formData.message}`,
        company: formData.firstName,
        budget: ''
      };
      
      // API call to your backend
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage('Thank you! Your enquiry has been submitted successfully.');
        setFormData(prev => ({ // Keep default country code on successful reset
          ...prev,
          firstName: '',
          email: '',
          phone: '',
          source: '',
          message: ''
        }));
        
        // Close popup after successful submission
        setTimeout(() => setIsOpen(false), 3000);
      } else {
        setSubmitMessage(result.message || 'Sorry, there was an error submitting your enquiry. Please try again.');
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  // Close popup when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  // Don't render anything if popup is closed
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-70 animate-fadeIn font-sans"
      onClick={handleBackdropClick}
    >
      <div 
        className="relative w-full max-w-sm sm:max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 ring-2 sm:ring-4 ring-purple-400/50 my-2 sm:my-4"
        style={{ backgroundColor: '#ffffff', maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Header Section (Dark Purple) */}
        <div 
          className="px-4 sm:px-6 py-4 sm:py-5 text-white shadow-lg sticky top-0 z-10"
          style={{ backgroundColor: '#1A173A' }}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Let's Connect</h2>
            <button 
              onClick={closePopup}
              className="text-white hover:text-purple-300 transition-colors p-1 rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close popup"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-light opacity-90">
            Send us a message and we'll be in touch quickly!
          </p>
        </div>

        {/* Form Body (White) */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          {submitMessage && (
            <div 
              className={`mb-3 sm:mb-4 p-3 rounded-lg text-sm sm:text-base font-semibold ${
                submitMessage.includes('Thank you') 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}
            >
              {submitMessage}
            </div>
          )}

          <div className="space-y-3 sm:space-y-4">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                placeholder="e.g., Alex Johnson"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                placeholder="you@example.com"
              />
            </div>

{/* Phone (Updated Alignment Fixed) */}
<div>
  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
    Phone Number (Optional)
  </label>
  <div className="flex">
    {/* Country Code Select */}
    <select
      id="countryCode"
      name="countryCode"
      value={formData.countryCode}
      onChange={handleInputChange}
      className="px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow bg-gray-50"
      style={{ width: '30%', minWidth: '90px' }}
    >
      {countryCodeList.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </select>

    {/* Phone Number Input */}
    <input
      type="tel"
      id="phone"
      name="phone"
      value={formData.phone}
      onChange={handleInputChange}
      className="flex-1 px-3 py-2 text-sm sm:text-base border-t border-b border-gray-300 rounded-r-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
      placeholder="98765 43210"
    />
  </div>
</div>


            {/* Source */}
            <div>
              <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
                How did you hear about us?
              </label>
              <select
                id="source"
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow appearance-none bg-white pr-8"
              >
                <option value="">Select an option</option>
                <option value="Google Search">Google Search</option>
                <option value="Social Media">Social Media</option>
                <option value="Friend Referral">Friend Referral</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Your Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="3"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow resize-none"
                placeholder="Tell us about your project or query..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg text-white font-bold text-base sm:text-lg transition-all duration-300 shadow-md ${
                isSubmitting 
                  ? 'bg-purple-300 cursor-not-allowed' 
                  : 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800 shadow-purple-500/50 hover:shadow-lg'
              } focus:outline-none focus:ring-4 focus:ring-purple-500/50`}
              style={{ backgroundColor: isSubmitting ? '#A78BFA' : '#6666CC' }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center text-sm sm:text-base">
                  <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </div>
              ) : 'Send Message'}
            </button>
          </div>
        </form>
      </div>

      {/* Add custom styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        /* Custom scrollbar for the popup */
        .overflow-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .overflow-auto::-webkit-scrollbar-thumb {
          background: #c4b5fd;
          border-radius: 3px;
        }
        .overflow-auto::-webkit-scrollbar-thumb:hover {
          background: #a78bfa;
        }
      `}</style>
    </div>
  );
};

export default ContactPopup;