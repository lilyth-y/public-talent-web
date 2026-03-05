import Hero from '../components/home/Hero';
import IntroSection from '../components/home/IntroSection';
import NewsSection from '../components/home/NewsSection';
import QuickLinks from '../components/home/QuickLinks';

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroSection />
      <NewsSection />
      <QuickLinks />
    </>
  );
}
