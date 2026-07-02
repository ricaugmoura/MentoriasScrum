import Hero from '../components/Hero';
import Mentorias from '../components/Mentorias';
import Mentores from '../components/Mentores';
import Reviews from '../components/Reviews';
import Newsletter from '../components/Newsletter';

const Home = () => {
  return (
    <div className="space-y-4">
      {/* Hero Header Presentation */}
      <Hero />

      {/* Grid of mentoring courses */}
      <Mentorias />

      {/* Profiles of Ricardo Augusto & team */}
      <Mentores />

      {/* Real-time Google Reviews carousel */}
      <Reviews />

      {/* Newsletter signup for leads capture */}
      <Newsletter />
    </div>
  );
};

export default Home;
