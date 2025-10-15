import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar, User, Clock, Share2, ArrowLeft, Heart, Eye,
  BookOpen, Tag, MessageCircle, Bookmark, ExternalLink,
  Facebook, Twitter, Linkedin, Link2, Copy, Send, Check
} from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- State Variables ---
  const [blog,           setBlog]           = useState(null);
  const [loading,        setLoading]        = useState(true);
  const [error,          setError]          = useState('');
  const [relatedBlogs,   setRelatedBlogs]   = useState([]);
  const [isLiking,       setIsLiking]       = useState(false);
  const [isSharing,      setIsSharing]      = useState(false);
  const [isBookmarked,   setIsBookmarked]   = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied,         setCopied]         = useState(false);

  // Newsletter states
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [subscribeError, setSubscribeError] = useState('');

  // --- Memoized Fetch Functions ---
  const fetchBlogPost = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`/api/blog/${id}`);

      if (!response.ok) {
        throw new Error('Blog post not found');
      }

      const data = await response.json();

      if (data.success) {
        const blogData = {
          ...data.data,
          image: data.data.image
            ? data.data.image.startsWith('http')
              ? data.data.image
              : `${window.location.origin}${data.data.image}`
            : `https://picsum.photos/800/400?random=${data.data._id}&grayscale`,
          liked: data.data.userLiked || false,
          bookmarked: data.data.userBookmarked || false
        };
        setBlog(blogData);
        setIsBookmarked(blogData.bookmarked);

        // Increment view count
        await fetch(`/api/blog/${id}/view`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        // Fetch related blogs
        fetchRelatedBlogs(data.data.tags, data.data._id);
      } else {
        throw new Error(data.message || 'Failed to load blog post');
      }
    } catch (err) {
      console.error('Error fetching blog post:', err);
      setError('Blog post not found. It may have been removed or the link might be broken.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchRelatedBlogs = async (tags, currentBlogId) => {
    try {
      const response = await fetch('/api/blog?limit=6');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const related = data.data
            .filter(b => b._id !== currentBlogId && b.tags && b.tags.some(tag => tags.includes(tag)))
            .slice(0, 3)
            .map(blog => ({
              ...blog,
              image: blog.image
                ? blog.image.startsWith('http')
                  ? blog.image
                  : `${window.location.origin}${blog.image}`
                : `https://picsum.photos/400/250?random=${blog._id}&grayscale`
            }));
          setRelatedBlogs(related);
        }
      }
    } catch (err) {
      console.error('Error fetching related blogs:', err);
    }
  };

  useEffect(() => {
    fetchBlogPost();
  }, [fetchBlogPost]); // Clean dependency array

  // --- Utility Functions ---

  // Format date with relative time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate read time with emoji based on length
  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);

    let emoji = '📖';
    if (minutes > 10) emoji = '☕';
    if (minutes > 20) emoji = '📚';

    return `${emoji} ${minutes} min read`;
  };

  // Advanced share functionality
  const handleShare = async (platform = null) => {
    setIsSharing(true);
    const shareUrl = window.location.href;
    const title = blog.title;
    const text = blog.excerpt || blog.content.substring(0, 100);

    try {
      if (platform === 'copy') {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      }

      if (platform === 'twitter') {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
          '_blank'
        );
        return;
      }

      if (platform === 'linkedin') {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
          '_blank'
        );
        return;
      }

      if (platform === 'facebook') {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          '_blank'
        );
        return;
      }

      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
      } else {
        setShowShareModal(true);
      }
    } catch (err) {
      console.log('Error sharing:', err);
    } finally {
      setIsSharing(false);
    }
  };

  // Like functionality with optimistic updates
  const handleLike = async () => {
    if (isLiking) return;

    setIsLiking(true);
    const previousLikeCount = blog.likeCount;
    const previousLiked = blog.liked;

    // Optimistic update
    setBlog(prev => ({
      ...prev,
      likeCount: previousLiked ? prev.likeCount - 1 : prev.likeCount + 1,
      liked: !prev.liked
    }));

    try {
      const response = await fetch(`/api/blog/${id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update like');
      }
    } catch (err) {
      console.error('Error liking blog:', err);
      // Revert optimistic update
      setBlog(prev => ({
        ...prev,
        likeCount: previousLikeCount,
        liked: previousLiked
      }));
    } finally {
      setIsLiking(false);
    }
  };

  // Bookmark functionality
  const handleBookmark = async () => {
    try {
      const response = await fetch(`/api/blog/${id}/bookmark`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsBookmarked(!isBookmarked);
      }
    } catch (err) {
      console.error('Error bookmarking blog:', err);
    }
  };

  // Newsletter subscription
  const handleNewsletterSubscribe = async (e) => {
    e.preventDefault();
    
    if (!newsletterEmail) {
      setSubscribeError('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setSubscribeError('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);
    setSubscribeError('');
    setSubscribeMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: newsletterEmail,
          source: 'blog'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscribeMessage(data.message || 'Successfully subscribed to our newsletter!');
        setNewsletterEmail('');
      } else {
        setSubscribeError(data.message || 'Subscription failed. Please try again.');
      }
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      setSubscribeError('Network error. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  // Table of contents generation
  const generateTableOfContents = (content) => {
    if (!content) return null;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    // Targeting h2 and h3 elements within the content
    const headings = tempDiv.querySelectorAll('h2, h3');

    if (headings.length === 0) return null;

    return (
      <div className="bg-white rounded-2xl p-6 mb-8 sticky top-24 shadow-md border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center border-b pb-3">
          <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
          Table of Contents
        </h3>
        <nav className="space-y-2">
          {Array.from(headings).map((heading, index) => {
            const level = heading.tagName.toLowerCase();
            const text = heading.textContent;
            // Create a simple slug for the ID
            const id = `section-${text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') || index}`;

            // Add ID to heading for linking
            // Note: This modifies the DOM, which is generally acceptable when using
            // dangerouslySetInnerHTML on the content later.
            heading.id = id; 

            return (
              <a
                key={id}
                href={`#${id}`}
                className={`block text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-sm ${
                  level === 'h3' ? 'ml-4' : 'font-medium'
                }`}
              >
                {text}
              </a>
            );
          })}
        </nav>
      </div>
    );
  };

  // Reading progress indicator
  const ReadingProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const updateProgress = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        // Calculate scrollable distance
        const scrollable = scrollHeight - clientHeight;
        if (scrollable > 0) {
            const scrollPercentage = (scrollTop / scrollable) * 100;
            setProgress(scrollPercentage);
        }
      };

      window.addEventListener('scroll', updateProgress);
      // Run once on mount to handle initial state
      updateProgress();
      return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  // --- Render Loading and Error States ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <ReadingProgress />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The article you are looking for does not exist.'}</p>
          <Link
            to="/blog"
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors duration-200"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // --- Generate TOC before main render ---
  // We need to call this here so the IDs are added to the headings
  // before the content is rendered with dangerouslySetInnerHTML.
  const tableOfContents = generateTableOfContents(blog.fullContent || blog.content);


  // --- Main Component Render ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ReadingProgress />

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Share this article</h3>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <button
                onClick={() => handleShare('twitter')}
                className="flex flex-col items-center p-3 rounded-xl hover:bg-blue-50 transition-colors"
              >
                <Twitter className="w-6 h-6 text-blue-400 mb-2" />
                <span className="text-sm">Twitter</span>
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="flex flex-col items-center p-3 rounded-xl hover:bg-blue-50 transition-colors"
              >
                <Linkedin className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-sm">LinkedIn</span>
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="flex flex-col items-center p-3 rounded-xl hover:bg-blue-50 transition-colors"
              >
                <Facebook className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-sm">Facebook</span>
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {copied ? (
                  <Copy className="w-6 h-6 text-green-500 mb-2" />
                ) : (
                  <Link2 className="w-6 h-6 text-gray-600 mb-2" />
                )}
                <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Blog Content */}
      <article className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header (Full Width) */}
          <header className="text-center mb-12">
            <div className="flex justify-center flex-wrap gap-2 pt-5 mt-3 mb-6">
              {blog.tags?.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {blog.excerpt || blog.content.substring(0, 160) + '...'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-500 mb-8">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span className="font-medium text-gray-700">{blog.author}</span>
                {blog.authorRole && (
                  <span className="ml-2 text-sm text-gray-500">• {blog.authorRole}</span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>

                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{blog.readTime || calculateReadTime(blog.content)}</span>
                </div>

                {blog.viewCount > 0 && (
                  <div className="flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    <span>{blog.viewCount} views</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => setShowShareModal(true)}
                disabled={isSharing}
                className="flex items-center px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
              >
                <Share2 className="w-5 h-5 mr-2" />
                {isSharing ? 'Sharing...' : 'Share'}
              </button>

              <button
                onClick={handleBookmark}
                className={`flex items-center px-6 py-3 rounded-xl transition-colors duration-200 ${
                  isBookmarked
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Bookmark className={`w-5 h-5 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                Save
              </button>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover"
              onError={(e) => {
                e.target.src = `https://picsum.photos/800/400?random=${blog._id}&grayscale`;
              }}
            />
          </div>

          {/* New Grid for Content and Sidebar */}
          <div className="grid grid-cols-1  gap-12">
            
           

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Blog Content */}
              <div className="prose prose-lg max-w-none">
                {/* TOC for smaller screens - render here if you want it above content on mobile */}
                <div className="lg:hidden">
                    {tableOfContents}
                </div>

                <div
                  className="text-gray-700 leading-relaxed text-lg"
                  dangerouslySetInnerHTML={{
                    __html: blog.fullContent ||
                    `<p>${blog.content}</p>`
                  }}
                />
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-5 h-5 text-gray-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map(tag => (
                      <Link
                        key={tag}
                        to={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio */}
              <div className="mt-12 p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                    {blog.author?.charAt(0) || 'A'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{blog.author}</h3>
                    {blog.authorRole && (
                      <p className="text-gray-600 mb-3">{blog.authorRole}</p>
                    )}
                    <p className="text-gray-600 mb-4">
                      {blog.authorBio || `Author of this article. Discover more insights from ${blog.author} in our blog.`}
                    </p>
                    <div className="flex gap-3">
                      <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                        View Profile
                      </button>
                      <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
                        More Articles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map(relatedBlog => (
                <Link
                  key={relatedBlog._id}
                  to={`/blog/${relatedBlog.slug || relatedBlog._id}`}
                  className="group block"
                >
                  <article className="bg-gray-50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg h-full border border-gray-200">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedBlog.image}
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 bg-black bg-opacity-50 text-white text-xs rounded-md">
                          {formatDate(relatedBlog.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {relatedBlog.excerpt || relatedBlog.content}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{relatedBlog.readTime || calculateReadTime(relatedBlog.content).replace('📖 ', '')}</span>
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          <span>{relatedBlog.viewCount || 0}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-indigo-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Enjoyed this article?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Subscribe to get notified when we publish new content. No spam, unsubscribe anytime.
          </p>
          
          <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => {
                setNewsletterEmail(e.target.value);
                setSubscribeError('');
                setSubscribeMessage('');
              }}
              className="flex-1 px-6 py-3 rounded-xl border border-gray-600 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={isSubscribing}
            />
            <button 
              type="submit"
              disabled={isSubscribing}
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors duration-200 shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
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
            Join 10,000+ readers getting insights every week
          </p>
        </div>
      </section>

      {/* Tailwind Prose Styles (No changes needed, already well-structured) */}
      <style>{`
        .prose {
          line-height: 1.75;
        }
        .prose h2 {
          font-size: 1.875em;
          font-weight: bold;
          margin-top: 2em;
          margin-bottom: 1em;
          color: #1f2937;
          scroll-margin-top: 100px;
        }
        .prose h3 {
          font-size: 1.5em;
          font-weight: bold;
          margin-top: 1.6em;
          margin-bottom: 0.8em;
          color: #1f2937;
          scroll-margin-top: 100px;
        }
        .prose p {
          margin-bottom: 1.5em;
        }
        .prose ul, .prose ol {
          margin-bottom: 1.5em;
          padding-left: 1.625em;
        }
        .prose li {
          margin-bottom: 0.5em;
        }
        .prose pre {
          background: #1f2937;
          color: #f9fafb;
          padding: 1.5em;
          border-radius: 0.75em;
          overflow-x: auto;
          margin-bottom: 1.5em;
        }
        .prose code {
          background: #f3f4f6;
          padding: 0.2em 0.4em;
          border-radius: 0.375em;
          font-family: 'Courier New', monospace;
          font-size: 0.875em;
        }
        .prose pre code {
          background: none;
          padding: 0;
          border-radius: 0;
        }
        .prose blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1.5em;
          margin: 2em 0;
          font-style: italic;
          color: #6b7280;
          background: #f9fafb;
          padding: 1.5em;
          border-radius: 0.5em;
        }
        .prose img {
          border-radius: 0.75em;
          margin: 2em 0;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BlogPost;