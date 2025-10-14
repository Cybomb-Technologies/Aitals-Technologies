const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    admin: {
      login: `${API_BASE_URL}/admin/login`,
      contacts: `${API_BASE_URL}/admin/contacts`,
      enquiries: `${API_BASE_URL}/admin/enquiries`,
      applications: `${API_BASE_URL}/admin/applications`,
      blogs: `${API_BASE_URL}/admin/blogs`,
    }
  }
};

export default apiConfig;