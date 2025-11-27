// faq.jsx
import React from "react";
import styles from "./faq.module.css";
import { Container, Accordion } from "react-bootstrap";

const FAQSection = () => {
  return (
    <section className={styles.faq}>
      <Container>
        <div className={styles.faqContent}>
          <h2 className="text-center mb-5">Frequently Asked Questions</h2>
          <Accordion flush>
            <Accordion.Item className="mb-2" eventKey="0">
              <Accordion.Header>How long does a typical project take?</Accordion.Header>
              <Accordion.Body>
                Project timelines vary based on complexity. A Starter website typically takes 2-3 weeks, 
                Business websites 4-6 weeks, and Enterprise solutions 8+ weeks. We'll provide a detailed 
                timeline during our initial consultation.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className="mb-2" eventKey="1">
              <Accordion.Header>Do you provide content creation services?</Accordion.Header>
              <Accordion.Body>
                We focus on web development but can recommend excellent content creators. For an additional fee, 
                we can also help organize and implement provided content.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className="mb-2" eventKey="2">
              <Accordion.Header>What about website maintenance?</Accordion.Header>
              <Accordion.Body>
                We offer ongoing maintenance plans starting at $100/month. This includes updates, backups, 
                security monitoring, and minor content changes.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className="mb-2" eventKey="3">
              <Accordion.Header>Will my website be mobile-friendly?</Accordion.Header>
              <Accordion.Body>
                Absolutely! All our websites are built with a mobile-first approach and are fully responsive 
                across all devices and screen sizes.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className="mb-2" eventKey="4">
              <Accordion.Header>What happens after the support period ends?</Accordion.Header>
              <Accordion.Body>
                After your included support period, we offer affordable maintenance plans. You can also contact 
                us for any additional work at our standard hourly rate.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;