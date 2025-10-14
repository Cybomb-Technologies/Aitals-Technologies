import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Navigation
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: `Service: ${formData.service}\n\nMessage: ${formData.message}`
      }),
    });

    const data = await response.json();

    if (response.ok) {
      toast({
        title: 'Message Sent! ✉️',
        description: "Thank you for reaching out. We'll get back to you within 24 hours!"
      });
      setFormData({ name: '', email: '', service: '', message: '' });
    } else {
      throw new Error(data.message || 'Failed to send message');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    toast({
      title: 'Error',
      description: 'Failed to send message. Please try again.',
      variant: 'destructive'
    });
  }
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const services = [
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'E-commerce Solutions',
    'Cloud Services',
    'AI Integration',
    'Other'
  ];

  const openGoogleMaps = () => {
    window.open('https://maps.google.com/?q=13.008408,80.201841', '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Aitals Technologies | Get In Touch</title>
        <meta
          name="description"
          content="Contact Aitals Technologies for your software development needs. We're here to help transform your ideas into reality."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20 gradient-bg text-white" style={{background: 'linear-gradient(to right, #1A173A, #6666CC)'}}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-gray-100">
              Ready to start your project? We'd love to hear from you. Let's
              discuss how we can help bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 gradient-text">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Service Interest
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-white"
                  style={{background: 'linear-gradient(to right, #1A173A, #6666CC)'}}
                >
                  <Send className="mr-2 w-5 h-5" />
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6 gradient-text">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{background: 'linear-gradient(to right, #1A173A, #6666CC)'}}
                    >
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Office Address</h3>
                      <p className="text-gray-600">
                        146, Sterling Rd, Nungambakkam
                        <br />
                        Chennai, Tamil Nadu 600034
                        <br />
                        India
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{background: 'linear-gradient(to right, #1A173A, #6666CC)'}}
                    >
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Email Us</h3>
                      <p className="text-gray-600">info@aitals.com</p>
                      <p className="text-gray-600">support@aitals.com</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{background: 'linear-gradient(to right, #1A173A, #6666CC)'}}
                    >
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Call Us</h3>
                      <p className="text-gray-600">+91 1234567890</p>
                      <p className="text-gray-600">+91 0987654321</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {[Linkedin, Facebook, Instagram, Twitter].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                      style={{background: 'linear-gradient(to right, #1A173A, #6666CC)'}}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div 
                className="p-8 rounded-2xl"
                style={{background: 'linear-gradient(135deg, #EFF6FF, #EDE9FE)'}}
              >
                <h3 className="font-bold text-xl mb-4">Business Hours</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="relative w-full h-[500px] bg-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{background: 'linear-gradient(135deg, #EFF6FF, #EDE9FE)'}}
        >
          <div className="text-center max-w-2xl mx-auto px-4">
            <MapPin className="w-16 h-16 mb-4 mx-auto" style={{color: '#6666CC'}} />
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Visit Our Office</h3>
            <p className="text-gray-600 mb-6 text-lg">
              146, Sterling Rd, Nungambakkam<br />
              Chennai, Tamil Nadu 600034, India
            </p>
            <Button
              onClick={openGoogleMaps}
              size="lg"
              className="text-white px-8 py-3"
              style={{background: 'linear-gradient(to right, #1A173A, #6666CC)'}}
            >
              <Navigation className="mr-2 w-5 h-5" />
              Open in Google Maps
            </Button>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Contact;