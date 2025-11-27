import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaCheck, FaGlobe, FaMobile, FaEnvelope, FaCode, FaCogs } from "react-icons/fa";
import styles from "./pricing-section.module.css";
import { Link, useNavigate } from "react-router-dom";

const PricingSection = () => {
  const navigate = useNavigate();

  const handleCheckout = (planType, price, planName) => {
    navigate('/checkout', { 
      state: { 
        planType, 
        price, 
        planName 
      } 
    });
  };

  return (
    <section id="pricingsection" className={styles.pricingSection}>
      <Container>
        <div className={`text-center mb-5 ${styles.sectionHeader}`}>
          <h2 className={styles.sectionHeading}>Web Development Packages</h2>
          <p className={styles.sectionSubheading}>
            Transparent pricing with no hidden fees. All packages include responsive design,
            SEO optimization, and dedicated support.
          </p>
        </div>

        <Row className={styles.scrollRow}>
          {/* Economy Website */}
          <Col lg={4} md={12} className="mb-4">
            <div className={`${styles.pricingCard} ${styles.starter}`}>
              <div className={styles.popularBadge}>Economy</div>
              <h4 className={styles.planTitle}>Economy Website</h4>
              <p className={styles.planSubtitle}>One page website</p>
              <h3 className={styles.planPrice}>₹6,000<span className={styles.pricePeriod}></span></h3>
              <p className={styles.priceNote}>One-time Fee – No Hidden Charges</p>

              <ul className={styles.featuresList}>
                <li><FaCode className={styles.featureIcon} /> Onepage website</li>
                <li><FaGlobe className={styles.featureIcon} /> 500 MB hosting</li>
                <li><FaMobile className={styles.featureIcon} /> Mobile responsive</li>
                <li><FaEnvelope className={styles.featureIcon} /> Enquiry form</li>
                <li><FaCheck className={styles.featureIcon} /> Click to call option</li>
                <li><FaCheck className={styles.featureIcon} /> 1 Content revision</li>
              </ul>

              <Button 
                variant="outline-primary" 
                className={styles.ctaBtn}
                onClick={() => handleCheckout('economy', 6000, 'Economy Website')}
              >
                Launch Your Website
              </Button>
            </div>
          </Col>

          {/* Professional Website */}
          <Col lg={4} md={12} className="mb-4">
            <div className={`${styles.pricingCard} ${styles.popular}`}>
              <div className={styles.popularBadge}>Professional</div>

              <h4 className={styles.planTitle}>Professional Website</h4>
              <p className={styles.planSubtitle}>5 page web design</p>
              <h3 className={styles.planPrice}>₹10,700<span className={styles.pricePeriod}> </span></h3>
              <p className={styles.priceNote}>One-time Fee – No Hidden Charges</p>

              <ul className={styles.featuresList}>
                <li><FaCheck className={styles.featureIcon} /> Professional web design</li>
                <li><FaGlobe className={styles.featureIcon} /> 1 GB hosting</li>
                <li><FaEnvelope className={styles.featureIcon} /> 2 Business email</li>
                <li><FaCheck className={styles.featureIcon} /> Professional SSL certificate</li>
                <li><FaMobile className={styles.featureIcon} /> Mobile responsive</li>
                <li><FaEnvelope className={styles.featureIcon} /> Enquiry form</li>
                <li><FaCheck className={styles.featureIcon} /> Click to call option</li>
                <li><FaCheck className={styles.featureIcon} /> WhatsApp Chat options</li>
                <li><FaCheck className={styles.featureIcon} /> 2 Content revision</li>
              </ul>

              <Button 
                variant="primary" 
                className={styles.ctaBtn}
                onClick={() => handleCheckout('professional', 10700, 'Professional Website')}
              >
                Get Professional Website
              </Button>
            </div>
          </Col>

          {/* Custom CMS Website */}
          <Col lg={4} md={12} className="mb-4">
            <div className={`${styles.pricingCard} ${styles.enterprise}`}>
              <div className={styles.popularBadge}>CMS</div>

              <h4 className={styles.planTitle}>Custom CMS Website</h4>
              <p className={styles.planSubtitle}>Upto 10 pages & CMS admin</p>
              <h3 className={styles.planPrice}>₹18,000<span className={styles.pricePeriod}></span></h3>
              <p className={styles.priceNote}>One-time Fee – No Hidden Charges</p>

              <ul className={styles.featuresList}>
                <li><FaCogs className={styles.featureIcon} /> CMS admin login</li>
                <li><FaCode className={styles.featureIcon} /> Custom web design</li>
                <li><FaGlobe className={styles.featureIcon} /> 1 GB hosting</li>
                <li><FaEnvelope className={styles.featureIcon} /> 2 Business email</li>
                <li><FaCheck className={styles.featureIcon} /> Professional SSL certificate</li>
                <li><FaMobile className={styles.featureIcon} /> Mobile responsive</li>
                <li><FaEnvelope className={styles.featureIcon} /> Enquiry form</li>
                <li><FaCheck className={styles.featureIcon} /> Click to call option</li>
                <li><FaCheck className={styles.featureIcon} /> WhatsApp Chat options</li>
                <li><FaCheck className={styles.featureIcon} /> 3 Content revision</li>
              </ul>

              <Button 
                variant="outline-primary" 
                className={styles.ctaBtn}
                onClick={() => handleCheckout('cms', 18000, 'Custom CMS Website')}
              >
                Build Custom CMS Website
              </Button>
            </div>
          </Col>
        </Row>

        <div className={`text-center mt-5 ${styles.customSection}`}>
          <p className={styles.customText}>
            Need a custom solution?{" "}
            <Link to="/contact-us" className={styles.customLink}>
              Contact us for a tailored proposal
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
};

export default PricingSection;