
import { useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import AboutSection from "@/components/AboutSection";
import LocationsSection from "@/components/LocationsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageMeta from "@/components/PageMeta";
import NotificationBanner from "@/components/NotificationBanner";
import SkipToContent from "@/components/SkipToContent";
import PropertySearchSection from "@/components/PropertySearchSection";
import ContactFormSection from "@/components/ContactFormSection";
import BlogSection from "@/components/BlogSection";
import GoogleMapSection from "@/components/GoogleMapSection";

const AIAssistant = lazy(() => import('@/components/AIAssistant'));

const Index = () => {
  useEffect(() => {
    // Remove console logging for production security
  }, []);

  return (
    <>
      <PageMeta 
        title="Eden Ridge Realty | Luxury Real Estate in Kenya - Premium Properties"
        description="Discover luxury residential and commercial properties across Kenya's most prestigious locations. Expert real estate services in Nairobi, Mombasa, Karen, and beyond."
        keywords="luxury real estate Kenya, premium properties Nairobi, Karen homes, Westlands apartments, commercial property Kenya, Eden Ridge Realty"
      />
      <SkipToContent />
      
      <div className="min-h-screen">
        <NotificationBanner 
          type="info" 
          message="🎉 New luxury properties now available in Karen and Runda! Contact us for exclusive viewings."
          className="sticky top-0 z-50"
        />
        
        <Navbar />
        <main id="main-content">
          <HeroSection />
          <PropertySearchSection />
          <FeaturedProperties />
          <AboutSection />
          <LocationsSection />
          <GoogleMapSection />
          <TestimonialsSection />
          <BlogSection />
          <CTASection />
          <ContactFormSection />
        </main>
        <Footer />
        <WhatsAppButton />
        <Suspense fallback={<div>Loading assistant...</div>}>
          <AIAssistant />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
