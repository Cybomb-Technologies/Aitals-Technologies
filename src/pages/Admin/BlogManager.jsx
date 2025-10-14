import React, { useState } from 'react';
import { 
  BookOpen, PlusCircle, Edit, Trash2, Clock, 
  Star, Image, Tag, Loader, CheckCircle 
} from 'lucide-react';

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
      const API_BASE_URL = 'http://localhost:5000';
      const url = isEditMode ? `${API_BASE_URL}/api/blog/${blogToEdit._id}` : `${API_BASE_URL}/api/blog`;
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
    <div className="p-6 bg-white rounded-xl shadow-2xl border border-gray-200">
      <h3 className="text-xl font-semibold mb-4 text-gray-900">
        {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6666CC] focus:border-transparent transition duration-150"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author *
            </label>
            <input
              type="text"
              placeholder="Author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6666CC] focus:border-transparent transition duration-150"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <div className="flex items-center space-x-3">
            <Image className="w-5 h-5 text-gray-400" />
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6666CC] focus:border-transparent transition duration-150"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex items-center space-x-3">
              <Tag className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="react, javascript, webdev"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6666CC] focus:border-transparent transition duration-150"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Read Time
            </label>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="5 min read"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6666CC] focus:border-transparent transition duration-150"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content *
          </label>
          <textarea
            placeholder="Write your blog content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="8"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6666CC] focus:border-transparent transition duration-150"
            required
          ></textarea>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 text-[#6666CC] border-gray-300 rounded focus:ring-[#6666CC]"
          />
          <label htmlFor="featured" className="flex items-center text-sm font-medium text-gray-700">
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
            className="px-6 py-3 bg-[#6666CC] text-white font-semibold rounded-lg shadow-md hover:bg-[#1A173A] disabled:opacity-50 transition duration-200 flex items-center justify-center"
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
      const API_BASE_URL = 'http://localhost:5000';
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
      const API_BASE_URL = 'http://localhost:5000';
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
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold flex items-center text-gray-900">
          <BookOpen className="w-6 h-6 mr-3 text-[#6666CC]" />
          Blog Management ({blogs.length})
        </h2>
        <button
          onClick={handleCreateNew}
          className="px-6 py-3 bg-[#6666CC] text-white font-semibold rounded-lg shadow-lg hover:bg-[#1A173A] transition duration-300 flex items-center"
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
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first blog post!</p>
            <button
              onClick={handleCreateNew}
              className="px-6 py-3 bg-[#6666CC] text-white font-semibold rounded-lg hover:bg-[#1A173A] transition duration-200"
            >
              Create First Post
            </button>
          </div>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition duration-300 overflow-hidden group">
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
                      : 'bg-gray-100 text-gray-600'
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

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#6666CC] transition-colors duration-200">
                  {blog.title}
                </h3>
                
                <p className="text-sm text-[#6666CC] mb-3">by {blog.author}</p>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {blog.content}
                </p>

                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {blog.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
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
                    className="flex-1 flex items-center justify-center p-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-[#6666CC] hover:text-white transition duration-150"
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

export default BlogManager;