import React from 'react';
import { Mail, Trash2, User, MessageSquare, Calendar } from 'lucide-react';

const DataTableView = ({ title, icon: Icon, data, headers, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderCellContent = (item, header) => {
    const key = header.toLowerCase().replace(/\s/g, '');
    let content = item[key] || 'N/A';

    // Special formatting for different fields
    switch (key) {
      case 'name':
        return (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#6666CC] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-medium text-gray-900">{content}</div>
              {item.createdAt && (
                <div className="text-xs text-gray-500 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(item.createdAt)}
                </div>
              )}
            </div>
          </div>
        );
      
      case 'email':
        return (
          <a 
            href={`mailto:${content}`}
            className="text-[#6666CC] hover:text-[#1A173A] hover:underline transition-colors"
          >
            {content}
          </a>
        );
      
      case 'message':
        return (
          <div className="group relative">
            <div className="line-clamp-2 text-gray-600">
              {content}
            </div>
            {content.length > 100 && (
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center">
                <span className="text-xs text-[#6666CC] font-medium bg-white px-2 py-1 rounded border">
                  Click to expand
                </span>
              </div>
            )}
          </div>
        );
      
      default:
        if (content && content.length > 50) {
          content = content.substring(0, 47) + '...';
        }
        return content;
    }
  };

  const handleRowClick = (item) => {
    // Create a modal or expandable view for detailed message
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div class="p-6 border-b border-gray-200 bg-[#1A173A] text-white">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold flex items-center">
              <MessageSquare class="w-5 h-5 mr-2" />
              Contact Message Details
            </h3>
            <button onclick="this.closest('.fixed').remove()" class="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div class="p-6 space-y-4 overflow-y-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <div class="p-3 bg-gray-50 rounded-lg font-medium">${item.name || 'N/A'}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div class="p-3 bg-gray-50 rounded-lg">
                <a href="mailto:${item.email}" class="text-[#6666CC] hover:underline">${item.email || 'N/A'}</a>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <div class="p-3 bg-gray-50 rounded-lg whitespace-pre-wrap">${item.message || 'N/A'}</div>
          </div>
          ${item.createdAt ? `
         
          ` : ''}
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#1A173A] to-[#6666CC]">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Icon className="w-6 h-6 mr-3" />
          {title} Messages ({data.length})
        </h2>
        <p className="text-blue-100 mt-1">Manage all contact form submissions from your website</p>
      </div>
      
      <div className="overflow-x-auto">
        {data.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No {title.toLowerCase()} messages yet</h3>
            <p className="text-gray-600">Contact form submissions will appear here once users start submitting.</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr 
                  key={item._id || index} 
                  className="hover:bg-gray-50 transition duration-150 cursor-pointer"
                  onClick={() => handleRowClick(item)}
                >
                  {headers.map((header) => (
                    <td
                      key={`${item._id}-${header}`}
                      className="px-6 py-4 text-sm"
                    >
                      {renderCellContent(item, header)}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item._id, title.toLowerCase());
                      }}
                      className="text-red-600 hover:text-red-900 transition-colors duration-200 p-2 hover:bg-red-50 rounded-lg"
                      title="Delete message"
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

const ContactManager = ({ contacts, onDelete }) => {
  return (
    <DataTableView 
      title="Contact" 
      icon={Mail} 
      data={contacts} 
      headers={['Name', 'Email', 'Message']} 
      onDelete={onDelete} 
    />
  );
};

export default ContactManager;