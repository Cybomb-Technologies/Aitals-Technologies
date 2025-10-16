import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Trash2,
  FileText,
  X,
  Loader,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
const API_BASE_URL1 = import.meta.env.VITE_API_BASE_URL;

const DataTableView = ({ title, icon: Icon, data, headers, onDelete }) => {
  const [resumePopup, setResumePopup] = useState({
    isOpen: false,
    content: null,
    fileName: "",
    isLoading: false,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filteredData, setFilteredData] = useState(data);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [expandedRows, setExpandedRows] = useState(new Set());

  const API_BASE_URL = `${API_BASE_URL1}`;

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter and sort data
  useEffect(() => {
    let result = [...data];

    // Apply search filter
    if (searchTerm) {
      result = result.filter((item) =>
        headers.some((header) => {
          const key = header.toLowerCase().replace(/\s/g, "");
          const value = item[key]?.toString().toLowerCase() || "";
          return value.includes(searchTerm.toLowerCase());
        })
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
        const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredData(result);
  }, [data, searchTerm, sortConfig, headers]);

  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const toggleRowExpand = (id) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleViewResume = async (applicationId, fileName) => {
    try {
      setResumePopup((prev) => ({
        ...prev,
        isOpen: true,
        isLoading: true,
        fileName,
      }));

      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${API_BASE_URL}/api/application/${applicationId}/resume`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        setResumePopup((prev) => ({
          ...prev,
          content: url,
          isLoading: false,
        }));
      } else {
        throw new Error("Failed to fetch resume");
      }
    } catch (error) {
      console.error("Error viewing resume:", error);
      alert("Error opening resume file");
      closeResumePopup();
    }
  };

  const closeResumePopup = () => {
    if (resumePopup.content) {
      window.URL.revokeObjectURL(resumePopup.content);
    }

    setResumePopup({
      isOpen: false,
      content: null,
      fileName: "",
      isLoading: false,
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeResumePopup();
    }
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && resumePopup.isOpen) {
        closeResumePopup();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [resumePopup.isOpen]);

  const renderCellContent = (item, header) => {
    const key = header.toLowerCase().replace(/\s/g, "");
    let content = item[key] || "N/A";

    if (key === "resume") {
      if (item.resume && item.resume.filename) {
        return (
          <button
            onClick={() => handleViewResume(item._id, item.resume.originalName)}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors duration-200 flex items-center justify-center w-full sm:w-auto"
          >
            <FileText className="w-3 h-3 mr-1 flex-shrink-0" />
            <span className="truncate">View Resume</span>
          </button>
        );
      } else {
        return (
          <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium inline-block text-center w-full sm:w-auto">
            No Resume
          </span>
        );
      }
    }

    if (content && content.length > 50 && !isMobile) {
      content = content.substring(0, 47) + "...";
    }

    return content;
  };

  const renderMobileCard = (item, index) => (
    <div
      key={item._id || index}
      className="bg-gray-50 rounded-lg p-4 mb-3 border border-gray-200"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900 truncate flex-1 mr-2">
          {item.name || "N/A"}
        </h3>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={() => onDelete(item._id, title.toLowerCase())}
            className="text-red-600 hover:text-red-900 transition-colors duration-200 p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleRowExpand(item._id)}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-1"
          >
            {expandedRows.has(item._id) ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 font-medium">Email:</span>
          <span className="text-sm text-gray-900 truncate ml-2">
            {item.email || "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 font-medium">Role:</span>
          <span className="text-sm text-gray-900">{item.role || "N/A"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 font-medium">Resume:</span>
          <div className="ml-2">{renderCellContent(item, "Resume")}</div>
        </div>
      </div>

      {expandedRows.has(item._id) && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          {headers
            .filter(
              (header) => !["Name", "Email", "Role", "Resume"].includes(header)
            )
            .map((header) => {
              const key = header.toLowerCase().replace(/\s/g, "");
              const value = item[key] || "N/A";
              return (
                <div key={header} className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600 font-medium">
                    {header}:
                  </span>
                  <span className="text-sm text-gray-900 text-right ml-2">
                    {value}
                  </span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronDown className="w-4 h-4 opacity-30" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-200">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold flex items-center text-gray-900">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-[#6666CC]" />
          {title} Data ({filteredData.length})
        </h2>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6666CC] focus:border-transparent transition-all duration-200"
            />
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 whitespace-nowrap"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Data Display */}
      <div className="overflow-x-auto">
        {filteredData.length === 0 ? (
          <div className="text-center py-8 border rounded-lg bg-gray-50">
            <p className="text-gray-500 italic">
              {searchTerm
                ? `No ${title.toLowerCase()} records match your search.`
                : `No ${title.toLowerCase()} records found.`}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-2 px-4 py-2 bg-[#6666CC] text-white rounded-lg hover:bg-[#1A173A] transition-colors duration-200"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : isMobile ? (
          // Mobile Card View
          <div className="space-y-3">
            {filteredData.map((item, index) => renderMobileCard(item, index))}
          </div>
        ) : (
          // Desktop Table View
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((header) => {
                  const key = header.toLowerCase().replace(/\s/g, "");
                  return (
                    <th
                      key={header}
                      className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => handleSort(key)}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{header}</span>
                        <SortIcon columnKey={key} />
                      </div>
                    </th>
                  );
                })}
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item, index) => (
                <tr
                  key={item._id || index}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  {headers.map((header) => (
                    <td
                      key={`${item._id}-${header}`}
                      className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {renderCellContent(item, header)}
                    </td>
                  ))}
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => onDelete(item._id, title.toLowerCase())}
                      className="text-red-600 hover:text-red-900 transition-colors duration-200 p-1 rounded hover:bg-red-50"
                      title="Delete"
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

      {/* Resume Popup Modal */}
      {resumePopup.isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col m-2">
            <div className="flex justify-between items-center p-3 sm:p-4 border-b border-gray-200 bg-[#1A173A] text-white">
              <h3 className="text-base sm:text-lg font-semibold flex items-center truncate">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                <span className="truncate">Resume: {resumePopup.fileName}</span>
              </h3>
              <button
                onClick={closeResumePopup}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200 flex-shrink-0"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-3 sm:p-4">
              {resumePopup.isLoading ? (
                <div className="flex justify-center items-center h-48 sm:h-64">
                  <Loader className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-[#6666CC]" />
                  <span className="ml-3 text-base sm:text-lg font-medium text-gray-900">
                    Loading Resume...
                  </span>
                </div>
              ) : resumePopup.content ? (
                <div className="w-full h-full">
                  <iframe
                    src={resumePopup.content}
                    className="w-full h-64 sm:h-96 border border-gray-300 rounded-lg"
                    title="Resume Preview"
                  />
                  <div className="mt-4 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <a
                      href={resumePopup.content}
                      download={resumePopup.fileName}
                      className="px-4 py-2 bg-[#6666CC] text-white rounded-lg hover:bg-[#1A173A] transition-colors duration-200 flex items-center justify-center"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Download Resume
                    </a>
                    <button
                      onClick={closeResumePopup}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8 text-gray-500">
                  <FileText className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-400" />
                  <p>Unable to load resume content.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ApplicationManager = ({ applications, onDelete }) => {
  return (
    <DataTableView
      title="Application"
      icon={Briefcase}
      data={applications}
      headers={["Name", "Email", "Role", "Resume"]}
      onDelete={onDelete}
    />
  );
};

export default ApplicationManager;
