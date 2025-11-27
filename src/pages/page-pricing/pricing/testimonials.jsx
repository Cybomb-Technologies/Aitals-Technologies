// testimonials.jsx
import React, { useState, useEffect } from "react";
import styles from "./testimonials.module.css";
import { Container, Row, Col } from "react-bootstrap";

const testimonials = [
  { 
    name: "John D.", 
    role: "Startup Founder",
    text: "The Starter package was perfect for our new business. We got a professional website that really represents our brand.",
    rating: 5,
    avatar: null
  },
  { 
    name: "Sarah K.", 
    role: "Marketing Director",
    text: "Our Business website has helped us triple our online leads. The team was professional and delivered on time.",
    rating: 5,
    avatar: null
  },
  { 
    name: "Michael R.", 
    role: "CEO, Tech Company",
    text: "The Enterprise solution gave us exactly the custom web application we needed to streamline our operations.",
    rating: 4,
    avatar: null
  }
];

const StarRating = ({ rating }) => {
  return (
    <div className={styles.rating}>
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>
          ★
        </span>
      ))}
    </div>
  );
};

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate testimonials
useEffect(() => {
  const interval = setInterval(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, 5000);

  return () => clearInterval(interval);
}, []);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <section className={styles.testimonials} id="testimonials">
      <Container>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Client Testimonials</h2>
          <p className={styles.sectionSubtitle}>Hear what our clients say about our web development services</p>
        </div>
        
        {/* Universal Carousel (1 card per view, all devices) */}
<div className={styles.carousel}>
  <div 
    className={styles.carouselTrack} 
    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
  >
    {testimonials.map((t, i) => (
      <div key={i} className={styles.carouselSlide}>
        <div className={styles.testimonialCard}>
          {/* <div className={styles.quoteIcon}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
            </svg>
          </div> */}

          <StarRating rating={t.rating} />

          <p>"{t.text}"</p>

          <div className={styles.author}>
            <div className={styles.avatar}>
              {t.avatar ? (
                <img src={t.avatar} alt={t.name} />
              ) : (
                <span>{getInitials(t.name)}</span>
              )}
            </div>
            <div className={styles.authorInfo}>
              <h6>{t.name}</h6>
              <span>{t.role}</span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Indicators */}
  <div className={styles.carouselIndicators}>
    {testimonials.map((_, i) => (
      <button
        key={i}
        className={i === activeIndex ? styles.active : ''}
        onClick={() => setActiveIndex(i)}
      />
    ))}
  </div>
</div>          
      </Container>
    </section>
  );
};

export default TestimonialsSection;