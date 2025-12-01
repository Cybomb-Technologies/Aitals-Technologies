import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Career from "@/pages/Career";
import Contact from "@/pages/Contact";
import Portfolio from "@/pages/Portfolio";
import Admin from "@/pages/Admin/AdminDashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";
import AdminLogin from "@/pages/Admin/AdminLogin";
import Blog from "./pages/Blogs/Blog";
import BlogPost from "./pages/Blogs/BlogPost";
import ContactPopup from "./pages/PopupForm";
import WebDev from "./pages/services/Web-Development/Web-dev";
import MobileApp from "./pages/services/Mobile-App-Development/Mobile-app";
import UiUx from "./pages/services/UI-UX-Design/Ui-Ux";
import Ecommerce from "./pages/services/Ecommerce/Ecommerce";
import AiAutomation from "./pages/services/Ai-Automation/Ai-Automation";
import CloudDevops from "./pages/services/Cloud-Devops/Cloud-Devops";
import SoftwareTesting from "./pages/services/Software-Testing/Software-Testing";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsConditions from "./components/TermsConditions";
import RefundPolicy from "./components/RefundPolicy";
import CookiePolicy from "./components/CookiePolicy";
import PricingPage from "./pages/pricing";
import CheckoutPage from "./pages/checkoutpage";
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
                      <Route path="/pricing" element={<PricingPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route
                        path="/services/web-development"
                        element={<WebDev />}
                      />
                      <Route
                        path="/services/mobile-development"
                        element={<MobileApp />}
                      />
                      <Route path="/services/ui-ux-design" element={<UiUx />} />
                      <Route
                        path="/services/ecommerce"
                        element={<Ecommerce />}
                      />
                      <Route
                        path="/services/ai-automation"
                        element={<AiAutomation />}
                      />
                      <Route
                        path="/services/cloud-devops"
                        element={<CloudDevops />}
                      />
                      <Route
                        path="/services/software-testing"
                        element={<SoftwareTesting />}
                      />
                      <Route
                        path="/privacy-policy"
                        element={<PrivacyPolicy />}
                      />
                      <Route
                        path="/terms-conditions"
                        element={<TermsConditions />}
                      />
                      <Route path="/refund-policy" element={<RefundPolicy />} />
                      <Route path="/cookie-policy" element={<CookiePolicy />} />
                    </Routes>
                  </main>
                  <ContactPopup />
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
