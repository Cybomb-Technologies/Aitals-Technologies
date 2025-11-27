import PricingContent from './pricing-content';
import Metatags from '../../../SEO/metatags';

function PricingPage() {
  const metaPropsData = {
  title: "AWS Cloud Services - Cybomb Technologies | Cloud Solutions & Deployment",
  description:
    "Discover Cybomb Technologies' AWS Cloud Services, offering secure, scalable, and cost-effective cloud solutions. From migration to deployment, we help businesses leverage AWS for performance, reliability, and innovation.",
  keyword:
    "AWS Cloud Services, AWS Migration, AWS Deployment, AWS Cloud Consulting, Cloud Infrastructure Management, AWS Solutions India, Secure Cloud Hosting, Scalable Cloud Applications",
  url: "https://www.cybomb.com/Services/aws-cloud",
  image: "https://www.cybomb.com", 
};

  return (
    <>
      <PricingContent />

      <Metatags  metaProps={metaPropsData}/>
    </>
  );
}

export default PricingPage;