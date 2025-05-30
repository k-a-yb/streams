import Hero from '../components/Hero';
import FeaturedContent from '../components/FeaturedContent';
import SubscriptionPlans from '../components/SubscriptionPlans';
import Header from '../components/Header';
import Footer from '../components/Foot';

const Index = () => {
  return (
    <>
      <Header/>
      <Hero />
      <FeaturedContent />
      <SubscriptionPlans />
      <Footer/>
    </>
  );
};

export default Index;
