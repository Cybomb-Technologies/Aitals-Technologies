// pricing-content.jsx
import Pricingbanner from './pricing-banner';
import WhyChooseUs from "./why-choose-us";
import PricingSection from './pricing-section';
import TestimonialsSection from './testimonials';
import FAQSection from './faq';

export default function PricingContent() {
  return (
    <div className="pricing-page">
      <Pricingbanner/>
      <PricingSection/>
      <WhyChooseUs/>
      <TestimonialsSection/>
      <FAQSection/>
    </div>
  );
}   