import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Career from '@/pages/Career';
import Contact from '@/pages/Contact';
import Portfolio from '@/pages/Portfolio';
import Admin from '@/pages/Admin/AdminDashboard';

import ProtectedRoute from '@/components/ProtectedRoute';
import { AuthProvider } from '@/context/AuthContext';
import AdminLogin from '@/pages/Admin/AdminLogin';
import Blog from './pages/Blogs/Blog';
import BlogPost from './pages/Blogs/BlogPost';
import ContactPopup from './pages/PopupForm';
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Routes>
            {/* Public routes with layout */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/career" element={<Career />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/portfolio" element={<Portfolio />} />
                      <Route path="/admin-login" element={<AdminLogin />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:id" element={<BlogPost />} />
                      
                    </Routes>
                  </main>
                  <ContactPopup/>
                  <Footer />
                </>
              }
            />

            {/* Admin Login Route (without Navbar/Footer) */}
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Protected Admin Route (without Navbar/Footer) */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;