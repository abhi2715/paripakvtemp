import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import VisionSection from '../components/VisionSection';
import AboutSection from '../components/AboutSection';
import FoundersSection from '../components/FoundersSection';
import OurProgrammes from '../components/OurProgrammes';
import NirmalaBrightScholar from '../components/NirmalaBrightScholar';
import SamajhSection from '../components/SamajhSection';

import BlogsSection from '../components/BlogsSection';
import GetInvolvedSection from '../components/GetInvolvedSection';
import ContactSection from '../components/ContactSection';
import AIChatbot from '../components/chatbot/AIChatbot';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <VisionSection />
        <AboutSection />
        <FoundersSection />
        <OurProgrammes />
        <NirmalaBrightScholar />
        <SamajhSection />

        <BlogsSection />
        <GetInvolvedSection />
        <ContactSection />
      </main>
      <Footer />
      <AIChatbot />
    </>
  );
}
