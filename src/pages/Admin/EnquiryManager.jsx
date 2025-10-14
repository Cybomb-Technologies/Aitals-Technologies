import React from 'react';
import { TrendingUp, Trash2, Mail, User, Building, Phone, Calendar, MessageSquare } from 'lucide-react';

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

  const parseEnquiryMessage = (message) => {
    if (!message) return {};
    
    const lines = message.split('\n');
    const parsed = {};
    
    lines.forEach(line => {
      if (line.includes('Name:')) parsed.name = line.replace('Name:', '').trim();
      if (line.includes('Phone:')) parsed.phone = line.replace('Phone:', '').trim();
      if (line.includes('Source:')) parsed.source = line.replace('Source:', '').trim();
      if (line.includes('Message:')) parsed.mainMessage = line.replace('Message:', '').trim();
    });
    
    return parsed;
  };

  const renderCellContent = (item, header) => {
    const key = header.toLowerCase().replace(/\s/g, '');
    let content = item[key] || 'N/A';

    // Special formatting for different fields
    switch (key) {
      case 'email':
        return (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#6666CC] to-[#1A173A] rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <a 
                href={`mailto:${content}`}
                className="text-[#6666CC] hover:text-[#1A173A] hover:underline font-medium block"
              >
                {content}
              </a>
              {item.company && item.company !== 'N/A' && (
                <div className="text-xs text-gray-500 flex items-center">
                  <Building className="w-3 h-3 mr-1" />
                  {item.company}
                </div>
              )}
            </div>
          </div>
        );
      
      case 'subject':
        const enquiryData = parseEnquiryMessage(item.message);
        return (
          <div>
            <div className="font-semibold text-gray-900">{content}</div>
            {enquiryData.name && (
              <div className="text-sm text-gray-600 flex items-center mt-1">
                <User className="w-3 h-3 mr-1" />
                {enquiryData.name}
                {enquiryData.phone && (
                  <>
                    <Phone className="w-3 h-3 ml-2 mr-1" />
                    {enquiryData.phone}
                  </>
                )}
              </div>
            )}
          </div>
        );
      
      case 'message':
        const parsedMessage = parseEnquiryMessage(content);
        return (
          <div className="group relative">
            <div className="space-y-2">
              {parsedMessage.mainMessage ? (
                <>
                  <div className="line-clamp-2 text-gray-600">
                    {parsedMessage.mainMessage}
                  </div>
                  {parsedMessage.source && (
                    <div className="text-xs">
                      <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                        Source: {parsedMessage.source}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="line-clamp-3 text-gray-600">
                  {content}
                </div>
              )}
            </div>
            
            {(content.length > 100 || parsedMessage.mainMessage) && (
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center">
                <span className="text-xs text-[#6666CC] font-medium bg-white px-2 py-1 rounded border shadow-sm">
                  View Details
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
    const parsedMessage = parseEnquiryMessage(item.message);
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-[#1A173A] to-[#6666CC] text-white">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold flex items-center">
              <TrendingUp class="w-5 h-5 mr-2" />
              Enquiry Details
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
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div class="p-3 bg-gray-50 rounded-lg">
                <a href="mailto:${item.email}" class="text-[#6666CC] hover:underline font-medium">${item.email || 'N/A'}</a>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <div class="p-3 bg-gray-50 rounded-lg font-medium">${item.subject || 'N/A'}</div>
            </div>
          </div>
          
          ${parsedMessage.name ? `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
              <div class="p-3 bg-gray-50 rounded-lg flex items-center">
                <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                ${parsedMessage.name}
              </div>
            </div>
            ${parsedMessage.phone ? `
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <div class="p-3 bg-gray-50 rounded-lg flex items-center">
                <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                ${parsedMessage.phone}
              </div>
            </div>
            ` : ''}
          </div>
          ` : ''}
          
          ${parsedMessage.source ? `
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Source</label>
            <div class="p-3 bg-gray-50 rounded-lg">
              <span class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                ${parsedMessage.source}
              </span>
            </div>
          </div>
          ` : ''}
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <div class="p-3 bg-gray-50 rounded-lg whitespace-pre-wrap">${parsedMessage.mainMessage || item.message || 'N/A'}</div>
          </div>
          
          ${item.company && item.company !== 'N/A' ? `
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <div class="p-3 bg-gray-50 rounded-lg flex items-center">
              <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              ${item.company}
            </div>
          </div>
          ` : ''}
          
          ${item.createdAt ? `
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Submitted</label>
            <div class="p-3 bg-gray-50 rounded-lg flex items-center">
              <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              ${formatDate(item.createdAt)}
            </div>
          </div>
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
          {title} Management ({data.length})
        </h2>
        <p className="text-blue-100 mt-1">Track and manage all enquiry submissions from your website</p>
      </div>
      
      <div className="overflow-x-auto">
        {data.length === 0 ? (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No enquiries yet</h3>
            <p className="text-gray-600">Enquiry submissions will appear here once users start contacting you.</p>
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
                  className="hover:bg-gray-50 transition duration-150 cursor-pointer group"
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
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(item._id, title.toLowerCase());
                        }}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200 p-2 hover:bg-red-50 rounded-lg"
                        title="Delete enquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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

const EnquiryManager = ({ enquiries, onDelete }) => {
  return (
    <DataTableView 
      title="Enquiry" 
      icon={TrendingUp} 
      data={enquiries} 
      headers={['Email', 'Subject', 'Message']} 
      onDelete={onDelete} 
    />
  );
};

export default EnquiryManager;