import React, { useState, useEffect } from 'react';
import { Menu, X, Users, BookOpen, Mail, Briefcase, TrendingUp, Edit, Trash2, PlusCircle, CheckCircle, Loader, LogOut, Image, Tag, Star, Clock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// CSS Variables for the color theme
const themeStyles = {
  '--color-primary': '#261C40',
  '--color-secondary': '#6561B2', 
  '--color-text': '#261C40',
  '--color-background': '#FFFFFF',
  '--color-subtle-accent': '#8A85CC',
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
// Reusable table component
const DataTableView = ({ title, icon: Icon, data, headers, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl border border-[var(--color-subtle-accent)]/20">
      <h2 className="text-2xl font-bold mb-4 flex items-center text-[var(--color-primary)]">
        <Icon className="w-6 h-6 mr-3 text-[var(--color-secondary)]" />
        {title} Data ({data.length})
      </h2>
      <div className="overflow-x-auto">
        {data.length === 0 ? (
          <p className="text-gray-500 italic p-4 border rounded-lg bg-gray-50">No {title.toLowerCase()} records found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[var(--color-subtle-accent)]/10">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text)] uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text)] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={item._id || index} className="hover:bg-[var(--color-subtle-accent)]/5 transition duration-150">
                  {headers.map((header) => (
                    <td
                      key={`${item._id}-${header}`}
                      className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text)]"
                    >
                      {item[header.toLowerCase().replace(/\s/g, '')] || 'N/A'}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => onDelete(item._id, title.toLowerCase())}
                      className="text-red-600 hover:text-red-900 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// Blog Form Component
const BlogForm = ({ blogToEdit, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(blogToEdit?.title || '');
  const [content, setContent] = useState(blogToEdit?.content || '');
  const [author, setAuthor] = useState(blogToEdit?.author || '');
  const [image, setImage] = useState(blogToEdit?.image || '');
  const [tags, setTags] = useState(blogToEdit?.tags?.join(', ') || '');
  const [readTime, setReadTime] = useState(blogToEdit?.readTime || '');
  const [featured, setFeatured] = useState(blogToEdit?.featured || false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const isEditMode = !!blogToEdit;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !author) {
      setMessage('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    const blogData = {
      title,
      content,
      author,
      image: image || '',
      tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
      readTime: readTime || '',
      featured
    };

    try {
 
      const url = isEditMode ? `${API_BASE_URL}/api/blog/${blogToEdit._id}` : '/api/blog';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(isEditMode ? 'Blog post updated successfully!' : 'Blog post created successfully!');
        if (!isEditMode) {
          // Reset form for new posts
          setTitle('');
          setContent('');
          setAuthor('');
          setImage('');
          setTags('');
          setReadTime('');
          setFeatured(false);
        }
        setTimeout(() => {
          onSubmit();
        }, 1500);
      } else {
        throw new Error(data.message || 'Failed to save blog');
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl border border-[var(--color-subtle-accent)]/20">
      <h3 className="text-xl font-semibold mb-4 text-[var(--color-primary)]">
        {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
              Title *
            </label>
            <input
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-[var(--color-subtle-accent)]/30 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition duration-150"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
              Author *
            </label>
            <input
              type="text"
              placeholder="Author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-3 border border-[var(--color-subtle-accent)]/30 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition duration-150"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Image URL
          </label>
          <div className="flex items-center space-x-3">
            <Image className="w-5 h-5 text-[var(--color-subtle-accent)]" />
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="flex-1 p-3 border border-[var(--color-subtle-accent)]/30 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition duration-150"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
              Tags
            </label>
            <div className="flex items-center space-x-3">
              <Tag className="w-5 h-5 text-[var(--color-subtle-accent)]" />
              <input
                type="text"
                placeholder="react, javascript, webdev"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="flex-1 p-3 border border-[var(--color-subtle-accent)]/30 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition duration-150"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
              Read Time
            </label>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-[var(--color-subtle-accent)]" />
              <input
                type="text"
                placeholder="5 min read"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="flex-1 p-3 border border-[var(--color-subtle-accent)]/30 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition duration-150"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Content *
          </label>
          <textarea
            placeholder="Write your blog content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="8"
            className="w-full p-3 border border-[var(--color-subtle-accent)]/30 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition duration-150"
            required
          ></textarea>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 text-[var(--color-secondary)] border-[var(--color-subtle-accent)] rounded focus:ring-[var(--color-secondary)]"
          />
          <label htmlFor="featured" className="flex items-center text-sm font-medium text-[var(--color-text)]">
            <Star className="w-4 h-4 mr-2 text-yellow-500" />
            Mark as featured post
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-[var(--color-secondary)] text-white font-semibold rounded-lg shadow-md hover:bg-[var(--color-primary)] disabled:opacity-50 transition duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <Loader className="animate-spin w-5 h-5 mr-2" />
            ) : isEditMode ? (
              <Edit className="w-5 h-5 mr-2" />
            ) : (
              <PlusCircle className="w-5 h-5 mr-2" />
            )}
            {isEditMode ? 'Update Blog' : 'Publish Blog'}
          </button>
        </div>
        {message && (
          <p className={`mt-3 text-center p-3 rounded-lg ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700 flex items-center justify-center'}`}>
            {message.includes('Error') ? message : <><CheckCircle className="w-4 h-4 mr-2"/> {message}</>}
          </p>
        )}
      </form>
    </div>
  );
};

// Blog Manager Component
const BlogManager = ({ blogs, onBlogsUpdate }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState(null);
  const [message, setMessage] = useState('');

  const handleEdit = (blog) => {
    setBlogToEdit(blog);
    setIsFormVisible(true);
  };

  const handleCreateNew = () => {
    setBlogToEdit(null);
    setIsFormVisible(true);
    setMessage('');
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setBlogToEdit(null);
    onBlogsUpdate();
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/blog/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
      });

      if (response.ok) {
        setMessage('Blog post deleted successfully!');
        onBlogsUpdate();
        setTimeout(() => setMessage(''), 3000);
      } else {
        throw new Error('Failed to delete blog');
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      setMessage(`Error deleting blog: ${error.message}`);
    }
  };

  const toggleFeatured = async (blogId, currentFeatured) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blog/${blogId}/featured`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
      });

      if (response.ok) {
        setMessage(`Blog ${!currentFeatured ? 'marked as featured' : 'removed from featured'}!`);
        onBlogsUpdate();
        setTimeout(() => setMessage(''), 3000);
      } else {
        throw new Error('Failed to update featured status');
      }
    } catch (error) {
      console.error("Error toggling featured:", error);
      setMessage(`Error: ${error.message}`);
    }
  };

  if (isFormVisible) {
    return <BlogForm blogToEdit={blogToEdit} onSubmit={handleCancel} onCancel={handleCancel} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-[var(--color-subtle-accent)]/20">
        <h2 className="text-2xl font-bold flex items-center text-[var(--color-primary)]">
          <BookOpen className="w-6 h-6 mr-3 text-[var(--color-secondary)]" />
          Blog Management ({blogs.length})
        </h2>
        <button
          onClick={handleCreateNew}
          className="px-6 py-3 bg-[var(--color-secondary)] text-white font-semibold rounded-lg shadow-lg hover:bg-[var(--color-primary)] transition duration-300 flex items-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          New Post
        </button>
      </div>
      
      {message && (
        <p className={`p-3 rounded-lg text-sm ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </p>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {blogs.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-[var(--color-subtle-accent)]" />
            <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">No blog posts yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first blog post!</p>
            <button
              onClick={handleCreateNew}
              className="px-6 py-3 bg-[var(--color-secondary)] text-white font-semibold rounded-lg hover:bg-[var(--color-primary)] transition duration-200"
            >
              Create First Post
            </button>
          </div>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-xl shadow-md border border-[var(--color-subtle-accent)]/20 hover:shadow-xl transition duration-300 overflow-hidden group">
              {/* Blog Image */}
              {blog.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  {blog.featured && (
                    <div className="absolute top-3 right-3">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    </div>
                  )}
                </div>
              )}
              
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    blog.featured 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-[var(--color-subtle-accent)]/10 text-[var(--color-text)]'
                  }`}>
                    {blog.featured ? 'Featured' : 'Standard'}
                  </span>
                  {blog.readTime && (
                    <span className="flex items-center text-sm text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {blog.readTime}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-[var(--color-text)] mb-2 line-clamp-2 group-hover:text-[var(--color-secondary)] transition-colors duration-200">
                  {blog.title}
                </h3>
                
                <p className="text-sm text-[var(--color-secondary)] mb-3">by {blog.author}</p>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {blog.content}
                </p>

                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {blog.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-[var(--color-subtle-accent)]/10 text-[var(--color-text)] rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <span>Created: {new Date(blog.createdAt).toLocaleDateString()}</span>
                  {blog.updatedAt !== blog.createdAt && (
                    <span>Updated: {new Date(blog.updatedAt).toLocaleDateString()}</span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="flex-1 flex items-center justify-center p-2 text-sm bg-[var(--color-subtle-accent)]/10 text-[var(--color-text)] rounded-lg hover:bg-[var(--color-secondary)] hover:text-white transition duration-150"
                  >
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => toggleFeatured(blog._id, blog.featured)}
                    className={`flex items-center justify-center p-2 text-sm rounded-lg transition duration-150 ${
                      blog.featured
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${blog.featured ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="flex items-center justify-center p-2 text-sm bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition duration-150"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Main Admin Component
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Enquiries');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const { logout, user } = useAuth();

  // Data States
  const [contacts, setContacts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const navItems = [
    { id: 'Enquiries', label: 'Enquiry Data', icon: TrendingUp, headers: ['Email', 'Subject', 'Message'] },
    { id: 'Contacts', label: 'Contact Forms', icon: Mail, headers: ['Name', 'Email', 'Message'] },
    { id: 'Careers', label: 'Career Applications', icon: Briefcase, headers: ['Name', 'Email', 'Role'] },
    { id: 'Blogs', label: 'Blog Manager', icon: BookOpen, headers: [] },
  ];

// In your fetchData function, update all API calls:
const API_BASE_URL = 'http://localhost:5000';

const fetchData = async () => {
  setLoadingData(true);
  try {
    const token = localStorage.getItem('adminToken');
    
    const [contactsRes, applicationsRes, enquiriesRes, blogsRes] = await Promise.all([
      fetch(`${API_BASE_URL}/api/admin/contacts`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }),
      fetch(`${API_BASE_URL}/api/admin/applications`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }),
      fetch(`${API_BASE_URL}/api/admin/enquiries`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }),
      fetch(`${API_BASE_URL}/api/blog`, {
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
      const response = await fetch(`${API_BASE_URL}/api/admin/${type}/${id}`, {
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

  const renderContent = () => {
    if (loadingData) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader className="w-8 h-8 animate-spin text-[var(--color-secondary)]" />
          <span className="ml-3 text-lg font-medium text-[var(--color-text)]">Loading Data...</span>
        </div>
      );
    }

    switch (activeTab) {
      case 'Contacts':
        return <DataTableView title="Contact" icon={Mail} data={contacts} headers={['Name', 'Email', 'Message']} onDelete={handleDelete} />;
      case 'Careers':
        return <DataTableView title="Career Application" icon={Briefcase} data={applications} headers={['Name', 'Email', 'Role']} onDelete={handleDelete} />;
      case 'Enquiries':
        return <DataTableView title="Enquiry" icon={TrendingUp} data={enquiries} headers={['Email', 'Subject', 'Message']} onDelete={handleDelete} />;
      case 'Blogs':
        return <BlogManager blogs={blogs} onBlogsUpdate={fetchData} />;
      default:
        return (
          <div className="p-6 bg-white rounded-xl shadow-lg border border-[var(--color-subtle-accent)]/20">
            <h2 className="text-2xl font-bold text-[var(--color-primary)]">Welcome to the Aitals Admin Dashboard!</h2>
            <p className="mt-2 text-gray-600">Use the navigation menu to manage your website data, forms, and blog posts.</p>
            <p className="mt-4 text-sm text-gray-500">Logged in as: <span className="font-mono text-[var(--color-secondary)]">{user?.email}</span></p>
          </div>
        );
    }
  };

  return (
    <div style={themeStyles} className="min-h-screen flex bg-gray-50 font-sans">
      <script src="https://cdn.tailwindcss.com"></script>
      
      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-[var(--color-secondary)] text-white rounded-full shadow-lg"
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
        } lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-[var(--color-primary)] text-white z-30 flex flex-col shadow-2xl`}
      >
        <div className="p-6 text-2xl font-bold border-b border-[var(--color-subtle-accent)]/30 bg-[var(--color-secondary)] flex items-center">
          <Users className="w-6 h-6 mr-2" />
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
                  ? 'bg-[var(--color-secondary)] text-white shadow-md font-semibold'
                  : 'text-gray-300 hover:bg-[var(--color-subtle-accent)]/20 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[var(--color-subtle-accent)]/30">
          <button
            onClick={logout}
            className="w-full flex items-center p-3 text-gray-300 hover:bg-[var(--color-subtle-accent)]/20 hover:text-white rounded-lg transition-colors duration-200"
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
        <header className="mb-8 border-b border-[var(--color-subtle-accent)]/20 pb-4">
          <h1 className="text-3xl font-extrabold text-[var(--color-text)]">{activeTab}</h1>
          <p className="text-gray-500 mt-1">Manage all data related to your company's {activeTab.toLowerCase()}.</p>
        </header>
        <main className="min-h-[70vh]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;