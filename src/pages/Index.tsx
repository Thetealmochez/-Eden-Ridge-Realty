
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import LocationsSection from "@/components/LocationsSection";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageMeta from "@/components/PageMeta";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <div id="properties">
          <FeaturedProperties />
        </div>
        <LocationsSection />
        <AboutSection />
        <CTASection />
        <div id="contact">
          <ContactForm />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
