// pricing-banner.jsx
import React from "react";
import styles from "./pricing-banner.module.css";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Pricingbanner = () => {
  return (
    <section className={styles.intro}>
      <Container className="text-center">
        <div className={styles.contentWrapper}>
          <h1 className={styles.heading}>Web Development Solutions</h1>
          <h2 className={styles.subheading}>Transparent Pricing for Every Business</h2>
          <p className={styles.description}>
            Choose the perfect web development package for your needs. From startup websites to 
            enterprise applications, we deliver quality code and exceptional results.
          </p>
          <div className={styles.ctaButtons}>
<Button as="a" href="#pricingsection" className={styles.primaryBtn}>
  View Plans
</Button>
  <Link to="/contact-us" className={`${styles.secondaryBtn} btn`}>
    Contact Us
  </Link>
</div>
        </div>
      </Container>
    </section>
  );
};

export default Pricingbanner;