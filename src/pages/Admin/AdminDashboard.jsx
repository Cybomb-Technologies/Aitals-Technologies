// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut, Loader } from 'lucide-react';
import Overview from './Overview';
import EnquiryManager from './EnquiryManager';
import ContactManager from './ContactManager';
import ApplicationManager from './ApplicationManager';
import JobOpeningManager from './JobOpeningManager';
import BlogManager from './BlogManager';

const useAuth = () => ({
  user: { email: 'admin@aitals.com', uid: 'mock_admin_id' },
  logout: () => {
    console.log("Mock Logout triggered.");
    localStorage.removeItem('adminToken');
    window.location.href = '/login';
  }
});

const API_BASE_URL = 'http://localhost:5000';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const { logout, user } = useAuth();

  // Data States
  const [contacts, setContacts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [jobOpenings, setJobOpenings] = useState([]);

  const navItems = [
    { id: 'Overview', label: 'Dashboard Overview', icon: Menu },
    { id: 'Enquiries', label: 'Enquiry Data', icon: Menu },
    { id: 'Contacts', label: 'Contact Forms', icon: Menu },
    { id: 'Application', label: 'Applications', icon: Menu },
    { id: 'JobOpenings', label: 'Job Openings', icon: Menu },
    { id: 'Blogs', label: 'Blog Manager', icon: Menu },
  ];
  
  // NEW: Function to change the active tab
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false); // Close sidebar after navigation on mobile
  };

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const token = localStorage.getItem('adminToken');
      
      const [contactsRes, applicationsRes, enquiriesRes, blogsRes, jobOpeningsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/contact`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE_URL}/api/application`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE_URL}/api/enquiry`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE_URL}/api/blog`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE_URL}/api/applications`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (contactsRes.ok) {
        const contactsData = await contactsRes.json();
        setContacts(contactsData.data || contactsData);
      }
      if (applicationsRes.ok) {
        const applicationsData = await applicationsRes.json();
        setApplications(applicationsData.data || applicationsData);
      }
      if (enquiriesRes.ok) {
        const enquiriesData = await enquiriesRes.json();
        setEnquiries(enquiriesData.data || enquiriesData);
      }
      if (blogsRes.ok) {
        const blogsData = await blogsRes.json();
        setBlogs(blogsData.data || blogsData);
      }
      if (jobOpeningsRes.ok) {
        const jobOpeningsData = await jobOpeningsRes.json();
        setJobOpenings(jobOpeningsData.data || jobOpeningsData);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/${type}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        fetchData();
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Error deleting item');
    }
  };

  // Stats for Overview (MOCK DATA REMOVED, BUT STATS CALCULATED LOCALLY ARE NOT USED BY OVERVIEW.JSX)
  // These local stats are now only for potential local use. Overview.jsx uses the API data.
  const stats = {
    enquiries: enquiries.length,
    contacts: contacts.length,
    applications: applications.length,
    blogs: blogs.length,
    jobOpenings: jobOpenings.length,
    total: enquiries.length + contacts.length + applications.length,
   
  };

  const recentActivities = [
    // This mock data is unnecessary and should be removed if not used by Overview
    {
      type: 'enquiry',
      title: 'New enquiry from John Doe',
      description: 'Interested in web development services',
      time: '2 hours ago'
    },
    {
      type: 'application',
      title: 'New job application received',
      description: 'Senior Developer position',
      time: '4 hours ago'
    },
    {
      type: 'contact',
      title: 'Contact form submitted',
      description: 'General inquiry about services',
      time: '6 hours ago'
    },
    {
      type: 'blog',
      title: 'New blog post published',
      description: 'React Best Practices 2024',
      time: '1 day ago'
    }
  ];

  const renderContent = () => {
    if (loadingData) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader className="w-8 h-8 animate-spin text-[#6666CC]" />
          <span className="ml-3 text-lg font-medium text-gray-900">Loading Data...</span>
        </div>
      );
    }

    switch (activeTab) {
      case 'Overview':
        // Pass the internal navigation function
        return <Overview onNavigateToTab={handleTabChange} />;
      case 'Contacts':
        return <ContactManager contacts={contacts} onDelete={handleDelete} />;
      case 'Application':
        return <ApplicationManager applications={applications} onDelete={handleDelete} />;
      case 'JobOpenings':
        return <JobOpeningManager applications={jobOpenings} onApplicationsUpdate={fetchData} />;
      case 'Enquiries':
        return <EnquiryManager enquiries={enquiries} onDelete={handleDelete} />;
      case 'Blogs':
        return <BlogManager blogs={blogs} onBlogsUpdate={fetchData} />;
      default:
        return <Overview onNavigateToTab={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-[#6666CC] text-white rounded-full shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-[#1A173A] text-white z-30 flex flex-col shadow-2xl`}
      >
        <div className="p-6 text-2xl font-bold border-b border-[#6666CC]/30 bg-[#6666CC] flex items-center">
          <Menu className="w-6 h-6 mr-2" />
          Aitals Admin
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                activeTab === id
                  ? 'bg-[#6666CC] text-white shadow-md font-semibold'
                  : 'text-gray-300 hover:bg-[#6666CC]/20 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[#6666CC]/30">
          <button
            onClick={logout}
            className="w-full flex items-center p-3 text-gray-300 hover:bg-[#6666CC]/20 hover:text-white rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
          <div className="text-xs text-gray-400 mt-2">
            <p>Logged in as: {user?.email}</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 p-4 sm:p-8 pt-16 lg:pt-8 overflow-y-auto">
        <header className="mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-extrabold text-gray-900">{activeTab}</h1>
          <p className="text-gray-500 mt-1">
            {activeTab === 'Overview' 
              ? 'Welcome to your dashboard overview' 
              : `Manage all data related to your company's ${activeTab.toLowerCase()}`}
          </p>
        </header>
        <main className="min-h-[70vh]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;