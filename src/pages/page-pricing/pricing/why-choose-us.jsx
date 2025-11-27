// why-choose-us.jsx
import React, { useState, useEffect } from "react";
import styles from "./why-choose-us.module.css";
import { Container, Row, Col } from "react-bootstrap";

const benefits = [
  { 
    title: "Quality Code", 
    desc: "Clean, maintainable code following industry best practices.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
      </svg>
    )
  },
  { 
    title: "Responsive Design", 
    desc: "Websites that look great on all devices and screen sizes.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    )
  },
  { 
    title: "SEO Optimized", 
    desc: "Built with search engine optimization best practices from day one.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l6-6-6-6M6 19l6-6-6-6"/>
        <circle cx="19" cy="5" r="2"/>
        <circle cx="5" cy="19" r="2"/>
      </svg>
    )
  },
  { 
    title: "Ongoing Support", 
    desc: "We provide support after delivery to ensure everything works perfectly.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
      </svg>
    )
  },
];

const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.benefits} id="why-choose-us">
      <Container>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Choose Our Web Development Services?</h2>
          <p className={styles.sectionSubtitle}>We deliver exceptional value through our comprehensive approach to web development</p>
        </div>
        <Row>
          {benefits.map((item, index) => (
            <Col lg={3} md={6} key={index} className="mb-4">
              <div 
                className={`${styles.benefitCard} ${isVisible ? styles.visible : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={styles.iconWrapper}>
                  {item.icon}
                </div>
                <h5 className={styles.benefitTitle}>{item.title}</h5>
                <p className={styles.benefitDesc}>{item.desc}</p>
                <div className={styles.hoverEffect}></div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default WhyChooseUs;