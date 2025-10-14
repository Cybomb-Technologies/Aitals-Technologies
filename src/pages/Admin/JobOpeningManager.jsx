import React, { useState } from 'react';
import { 
  Briefcase, PlusCircle, Edit, Trash2, Clock, 
  Users, MapPin, DollarSign, Loader, CheckCircle 
} from 'lucide-react';

const ApplicationForm = ({ applicationToEdit, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: applicationToEdit?.title || '',
    department: applicationToEdit?.department || 'Engineering',
    location: applicationToEdit?.location || '',
    type: applicationToEdit?.type || 'Full-time',
    salary: applicationToEdit?.salary || '',
    description: applicationToEdit?.description || '',
    requirements: applicationToEdit?.requirements?.join(', ') || '',
    responsibilities: applicationToEdit?.responsibilities?.join(', ') || '',
    benefits: applicationToEdit?.benefits?.join(', ') || '',
    experienceLevel: applicationToEdit?.experienceLevel || 'Mid',
    isActive: applicationToEdit?.isActive ?? true
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const departments = ['Engineering', 'Design', 'Product', 'Quality', 'Marketing', 'Sales', 'Operations'];
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];
  const experienceLevels = ['Entry', 'Mid', 'Senior', 'Lead', 'Executive'];

  const isEditMode = !!applicationToEdit;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.department || !formData.location || !formData.type || !formData.salary || !formData.description) {
      setMessage('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const API_BASE_URL = 'http://localhost:5000';
      const url = isEditMode 
        ? `${API_BASE_URL}/api/applications/${applicationToEdit._id}`
        : `${API_BASE_URL}/api/applications`;
      
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({
          ...formData,
          requirements: formData.requirements ? formData.requirements.split(',').map(req => req.trim()).filter(req => req) : [],
          responsibilities: formData.responsibilities ? formData.responsibilities.split(',').map(resp => resp.trim()).filter(resp => resp) : [],
          benefits: formData.benefits ? formData.benefits.split(',').map(benefit => benefit.trim()).filter(benefit => benefit) : []
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(isEditMode ? 'Job opening updated successfully!' : 'Job opening created successfully!');
        setTimeout(() => {
          onSubmit();
        }, 1500);
      } else {
        throw new Error(data.message || 'Failed to save job opening');
      }
    } catch (error) {
      console.error("Error submitting job opening:", error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl border border-gray-200">
      <h3 className="text-xl font-semibold mb-4 text-gray-900">
        {isEditMode ? 'Edit Job Opening' : 'Create New Job Opening'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              name="title"
              placeholder="Senior Full Stack Developer"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6666CC] focus:border-transparent transition duration-150"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department *
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6666CC] focus:border-transparent transition duration-150"
              required
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              placeholder="Bangalore / Remote"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6666CC] focus:border-transparent transition duration-150"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6666CC] focus:border-transparent transition duration-150"
              required
            >
              {jobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary Range *
            </label>
            <input
              type="text"
              name="salary"
              placeholder="₹15-25 LPA"
              value={formData.salary}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6666CC] focus:border-transparent transition duration-150"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience Level
            </label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6666CC] focus:border-transparent transition duration-150"
            >
              {experienceLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Description *
          </label>
          <textarea
            name="description"
            placeholder="Describe the role, responsibilities, and what you're looking for..."
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6666CC] focus:border-transparent transition duration-150"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Requirements
          </label>
          <textarea
            name="requirements"
            placeholder="List requirements separated by commas..."
            value={formData.requirements}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6666CC] focus:border-transparent transition duration-150"
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">Separate requirements with commas</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Responsibilities
          </label>
          <textarea
            name="responsibilities"
            placeholder="List key responsibilities separated by commas..."
            value={formData.responsibilities}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6666CC] focus:border-transparent transition duration-150"
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">Separate responsibilities with commas</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Benefits
          </label>
          <textarea
            name="benefits"
            placeholder="List benefits separated by commas..."
            value={formData.benefits}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6666CC] focus:border-transparent transition duration-150"
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">Separate benefits with commas</p>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="w-4 h-4 text-[#6666CC] border-gray-300 rounded focus:ring-[#6666CC]"
          />
          <label htmlFor="isActive" className="flex items-center text-sm font-medium text-gray-700">
            Active Job Opening
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
            {isEditMode ? 'Update Opening' : 'Create Opening'}
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

const JobOpeningManager = ({ applications, onApplicationsUpdate }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [applicationToEdit, setApplicationToEdit] = useState(null);
  const [message, setMessage] = useState('');

  const handleEdit = (application) => {
    setApplicationToEdit(application);
    setIsFormVisible(true);
  };

  const handleCreateNew = () => {
    setApplicationToEdit(null);
    setIsFormVisible(true);
    setMessage('');
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setApplicationToEdit(null);
    onApplicationsUpdate();
  };

  const handleDelete = async (applicationId) => {
    if (!window.confirm('Are you sure you want to delete this job opening?')) return;

    try {
      const API_BASE_URL = 'http://localhost:5000';
      const response = await fetch(`${API_BASE_URL}/api/applications/${applicationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
      });

      if (response.ok) {
        setMessage('Job opening deleted successfully!');
        onApplicationsUpdate();
        setTimeout(() => setMessage(''), 3000);
      } else {
        throw new Error('Failed to delete job opening');
      }
    } catch (error) {
      console.error("Error deleting job opening:", error);
      setMessage(`Error deleting job opening: ${error.message}`);
    }
  };

  const toggleStatus = async (applicationId, currentStatus) => {
    try {
      const API_BASE_URL = 'http://localhost:5000';
      const response = await fetch(`${API_BASE_URL}/api/applications/${applicationId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
      });

      if (response.ok) {
        setMessage(`Job opening ${!currentStatus ? 'activated' : 'deactivated'} successfully!`);
        onApplicationsUpdate();
        setTimeout(() => setMessage(''), 3000);
      } else {
        throw new Error('Failed to update job status');
      }
    } catch (error) {
      console.error("Error toggling job status:", error);
      setMessage(`Error: ${error.message}`);
    }
  };

  if (isFormVisible) {
    return <ApplicationForm applicationToEdit={applicationToEdit} onSubmit={handleCancel} onCancel={handleCancel} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold flex items-center text-gray-900">
          <Briefcase className="w-6 h-6 mr-3 text-[#6666CC]" />
          Job Openings Management ({applications.length})
        </h2>
        <button
          onClick={handleCreateNew}
          className="px-6 py-3 bg-[#6666CC] text-white font-semibold rounded-lg shadow-lg hover:bg-[#1A173A] transition duration-300 flex items-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          New Opening
        </button>
      </div>
      
      {message && (
        <p className={`p-3 rounded-lg text-sm ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </p>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {applications.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No job openings yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first job opening!</p>
            <button
              onClick={handleCreateNew}
              className="px-6 py-3 bg-[#6666CC] text-white font-semibold rounded-lg hover:bg-[#1A173A] transition duration-200"
            >
              Create First Opening
            </button>
          </div>
        ) : (
          applications.map((application) => (
            <div key={application._id} className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition duration-300 overflow-hidden group">
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    application.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {application.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(application.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#6666CC] transition-colors duration-200">
                  {application.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {application.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {application.department}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    {application.salary}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {application.description}
                </p>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(application)}
                    className="flex-1 flex items-center justify-center p-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-[#6666CC] hover:text-white transition duration-150"
                  >
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => toggleStatus(application._id, application.isActive)}
                    className={`flex items-center justify-center p-2 text-sm rounded-lg transition duration-150 ${
                      application.isActive
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {application.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDelete(application._id)}
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

export default JobOpeningManager;