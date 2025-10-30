import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  User,
  ArrowRight,
  Clock,
  Share2,
  BookOpen,
  Search,
  Filter,
  TrendingUp,
  Eye,
  Heart,
  Send,
  Check,
} from "lucide-react";

const API_BASE_URL1 = import.meta.env.VITE_API_BASE_URL;

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(9);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  // Newsletter states
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [subscribeError, setSubscribeError] = useState("");

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL1}/api/blog`);

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();

        if (data.success) {
          const blogsWithImages = data.data.map((blog) => ({
            ...blog,
            image: blog.image
              ? blog.image.startsWith("http")
                ? blog.image
                : `${window.location.origin}${blog.image}`
              : `https://picsum.photos/600/400?random=${blog._id}`,
          }));
          setBlogs(blogsWithImages);
          setFilteredBlogs(blogsWithImages);
        } else {
          throw new Error(data.message || "Failed to load blogs");
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter and sort blogs
  useEffect(() => {
    let filtered = [...blogs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (blog.tags &&
            blog.tags.some((tag) =>
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            ))
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (blog) => blog.tags && blog.tags.includes(selectedCategory)
      );
    }

    // Sort blogs
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "popular":
        // Assuming you have viewCount field in your blog data
        filtered.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
        break;
      case "trending":
        // Assuming you have likeCount field in your blog data
        filtered.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
        break;
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredBlogs(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCategory, sortBy, blogs]);

  // Extract unique categories from tags
  const categories = [
    "all",
    ...new Set(blogs.flatMap((blog) => blog.tags || [])),
  ];

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate read time
  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Share blog post
  const handleShare = async (blog, e) => {
    e.preventDefault();
    e.stopPropagation();

    const shareUrl = `${window.location.origin}/blog/${blog.slug || blog._id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt || blog.content.substring(0, 100),
          url: shareUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  // Newsletter subscription
  const handleNewsletterSubscribe = async (e) => {
    e.preventDefault();

    if (!newsletterEmail) {
      setSubscribeError("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setSubscribeError("Please enter a valid email address");
      return;
    }

    setIsSubscribing(true);
    setSubscribeError("");
    setSubscribeMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newsletterEmail,
          source: "blog",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscribeMessage(
          data.message || "Successfully subscribed to our newsletter!"
        );
        setNewsletterEmail("");
      } else {
        setSubscribeError(
          data.message || "Subscription failed. Please try again."
        );
      }
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      setSubscribeError("Network error. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  // Like functionality
  const handleLike = async (blogId, e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await fetch(`${API_BASE_URL1}/api/blog/${blogId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Update the local state to reflect the like
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === blogId
              ? {
                  ...blog,
                  likeCount: (blog.likeCount || 0) + 1,
                  liked: true,
                }
              : blog
          )
        );
        setFilteredBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === blogId
              ? {
                  ...blog,
                  likeCount: (blog.likeCount || 0) + 1,
                  liked: true,
                }
              : blog
          )
        );
      }
    } catch (err) {
      console.error("Error liking blog:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading latest articles...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-[#362B6A] to-[#5355A0] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl backdrop-blur-sm mb-8">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Aitals Blog
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover insights, tutorials, and cutting-edge technology updates
              from our expert team. Stay ahead in the digital landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles, topics, or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-3 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white/60 text-gray-900 placeholder-gray-500 text-lg shadow-sm transition-all duration-200"
              />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-4">
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <div className="w-5 h-5 flex flex-col justify-between">
                    <div className="w-full h-1 bg-current rounded"></div>
                    <div className="w-full h-1 bg-current rounded"></div>
                    <div className="w-full h-1 bg-current rounded"></div>
                  </div>
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700 text-sm font-medium"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                selectedCategory === "all"
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/25"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              }`}
            >
              All Topics
            </button>
            {categories.slice(0, 8).map(
              (category) =>
                category !== "all" && (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                      selectedCategory === category
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/25"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                )
            )}
            {categories.length > 8 && (
              <button className="px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
                +{categories.length - 8} More
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-center backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
                {error}
              </div>
            </div>
          )}

          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Latest Articles
              </h2>
              <p className="text-gray-600">
                {filteredBlogs.length}{" "}
                {filteredBlogs.length === 1 ? "article" : "articles"} found
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== "all" && ` in ${selectedCategory}`}
              </p>
            </div>

            {filteredBlogs.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Filter className="w-4 h-4" />
                <span>
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            )}
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                No articles found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                {searchTerm || selectedCategory !== "all"
                  ? "Try adjusting your search terms or browse different categories."
                  : "Our team is working on new content. Check back soon!"}
              </p>
              {(searchTerm || selectedCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors duration-200 shadow-lg shadow-indigo-500/25"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Blog Grid/List */}
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    : "grid grid-cols-1 gap-6"
                }
              >
                {currentBlogs.map((blog) => (
                  <Link
                    key={blog._id}
                    to={`/blog/${blog.slug || blog._id}`}
                    className="group block"
                  >
                    <article
                      className={`
                      bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-gray-200 hover:border-indigo-300
                      ${
                        viewMode === "grid"
                          ? "shadow-sm hover:shadow-2xl h-full flex flex-col"
                          : "shadow-xs hover:shadow-lg flex flex-col sm:flex-row"
                      }
                    `}
                    >
                      {/* Blog Image */}
                      <div
                        className={`
                        relative overflow-hidden bg-gray-200
                        ${
                          viewMode === "grid"
                            ? "h-48"
                            : "sm:w-48 sm:h-48 h-48 sm:h-auto"
                        }
                      `}
                      >
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = `https://picsum.photos/600/400?random=${blog._id}`;
                          }}
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-indigo-600 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
                            {blog.tags?.[0] || "General"}
                          </span>
                        </div>
                        <div className="absolute bottom-4 right-4 flex gap-2">
                          {blog.featured && (
                            <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Blog Content */}
                      <div
                        className={`flex-1 p-6 ${
                          viewMode === "list" ? "sm:flex-1" : ""
                        }`}
                      >
                        <div className="flex items-center text-sm text-gray-500 mb-3 flex-wrap gap-2">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{formatDate(blog.createdAt)}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>
                              {blog.readTime || calculateReadTime(blog.content)}
                            </span>
                          </div>
                          {(blog.viewCount > 0 || blog.likeCount > 0) && (
                            <>
                              <span>•</span>
                              <div className="flex items-center gap-3">
                                {blog.viewCount > 0 && (
                                  <div className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    <span>{blog.viewCount}</span>
                                  </div>
                                )}
                                {blog.likeCount > 0 && (
                                  <div className="flex items-center gap-1">
                                    <Heart className="w-4 h-4" />
                                    <span>{blog.likeCount}</span>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
                          {blog.title}
                        </h2>

                        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                          {blog.excerpt || blog.content}
                        </p>

                        <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                              {blog.author?.charAt(0) || "A"}
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-900 block">
                                {blog.author || "Anonymous"}
                              </span>
                              {blog.authorRole && (
                                <span className="text-xs text-gray-500">
                                  {blog.authorRole}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <button
                              className="text-gray-400 hover:text-indigo-600 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100"
                              onClick={(e) => handleShare(blog, e)}
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                            <button
                              className={`p-2 rounded-lg transition-colors duration-200 ${
                                blog.liked
                                  ? "text-red-500 hover:text-red-600 hover:bg-red-50"
                                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                              }`}
                              onClick={(e) => handleLike(blog._id, e)}
                            >
                              <Heart
                                className={`w-4 h-4 ${
                                  blog.liked ? "fill-current" : ""
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                            {blog.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors duration-200"
                              >
                                #{tag}
                              </span>
                            ))}
                            {blog.tags.length > 3 && (
                              <span className="px-2.5 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs">
                                +{blog.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-16">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="p-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ArrowRight className="w-5 h-5 rotate-180" />
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-12 h-12 rounded-xl font-medium transition-all duration-200 ${
                          currentPage === pageNum
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                            : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="p-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-sm mb-6">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Stay Ahead of the Curve</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get exclusive access to our latest research, industry insights, and
            expert analysis. Join thousands of professionals who read our
            newsletter.
          </p>

          <form
            onSubmit={handleNewsletterSubscribe}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your work email"
              value={newsletterEmail}
              onChange={(e) => {
                setNewsletterEmail(e.target.value);
                setSubscribeError("");
                setSubscribeMessage("");
              }}
              className="flex-1 px-6 py-4 rounded-2xl border border-gray-600 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-indigo-500/30 backdrop-blur-sm"
              disabled={isSubscribing}
            />
            <button
              type="submit"
              disabled={isSubscribing}
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-indigo-500/25 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubscribing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Subscribing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Subscribe
                </>
              )}
            </button>
          </form>

          {/* Success/Error Messages */}
          {subscribeMessage && (
            <div className="mt-4 p-4 bg-green-500/20 border border-green-400 rounded-2xl text-green-300 flex items-center justify-center gap-2">
              <Check className="w-5 h-5" />
              {subscribeMessage}
            </div>
          )}

          {subscribeError && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-400 rounded-2xl text-red-300">
              {subscribeError}
            </div>
          )}

          <p className="text-sm text-gray-400 mt-4">
            No spam, unsubscribe at any time. Read our{" "}
            <a
              href="/privacy-policy"
              className="text-indigo-300 hover:text-white"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Blog;
