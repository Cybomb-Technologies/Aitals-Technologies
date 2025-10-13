
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
// 
// 
// 
// 
// 
// 
// dharshini
// ------------
// 
// 
// 
// 
// 
// 
// 
// devashree
// ----------------
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// santhosh
//-------------------- 

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/career" element={<Career />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/portfolio" element={<Portfolio />} />


            {/* Dharshini
            
            
            
            
            
            
            
            
            
            
            
            
            */}
            {/* devashree
            
            
            
            
            
            
            
            
            
            
            
            
            
            */}
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
  