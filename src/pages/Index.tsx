
import { useEffect, useState, useRef, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PropertyTypesSection from "@/components/PropertyTypesSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import AboutSection from "@/components/AboutSection";
import PageMeta from "@/components/PageMeta";
import NotificationBanner from "@/components/NotificationBanner";
import SkipToContent from "@/components/SkipToContent";
import PropertySearchSection from "@/components/PropertySearchSection";
import SecurityHeaders from "@/components/SecurityHeaders";
import LoadingSpinner from "@/components/LoadingSpinner";

// Lazy load heavy components for better performance
const LocationsSection = lazy(() => import('@/components/LocationsSection'));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'));
const CTASection = lazy(() => import('@/components/CTASection'));
const ContactFormSection = lazy(() => import('@/components/ContactFormSection'));
const BlogSection = lazy(() => import('@/components/BlogSection'));
const GoogleMapSection = lazy(() => import('@/components/GoogleMapSection'));
const Footer = lazy(() => import('@/components/Footer'));
const WhatsAppButton = lazy(() => import('@/components/WhatsAppButton'));
const AIAssistant = lazy(() => import('@/components/AIAssistant'));

const Index = () => {
  // State for managing selected property type
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('all');
  
  // Ref for the featured properties section
  const featuredPropertiesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Initialize security monitoring
    import('@/lib/security-monitor').then(({ securityMonitor }) => {
      // Log page access
      securityMonitor.logEvent({
        type: 'data_access',
        severity: 'low',
        details: { page: 'home', action: 'page_view' }
      });
    });
  }, []);

  useEffect(() => {
    // Handle hash-based navigation for SEO and direct linking
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const hashToTypeMap: { [key: string]: string } = {
        'luxury-villas': 'Villa',
        'penthouses': 'Penthouse',
        'commercial-spaces': 'Commercial',
        'serviced-apartments': 'Apartment',
        'premium-land': 'Land'
      };
      
      if (hashToTypeMap[hash]) {
        setSelectedPropertyType(hashToTypeMap[hash]);
        // Scroll to featured properties after a short delay to ensure rendering
        setTimeout(() => {
          featuredPropertiesRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    };

    // Check hash on component mount
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  /**
   * Handle property type selection from PropertyTypesSection
   * @param type - The selected property type
   */
  const handlePropertyTypeSelect = (type: string) => {
    setSelectedPropertyType(type);
  };

  return (
    <>
      <SecurityHeaders />
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
          <PropertyTypesSection 
            onTypeSelect={handlePropertyTypeSelect}
            selectedType={selectedPropertyType}
          />
          <FeaturedProperties 
            ref={featuredPropertiesRef}
            selectedPropertyType={selectedPropertyType}
            onTypeSelect={handlePropertyTypeSelect}
          />
          <AboutSection />
          
          {/* Lazy loaded sections with smooth loading */}
          <Suspense fallback={<LoadingSpinner size="lg" text="Loading locations..." />}>
            <LocationsSection />
          </Suspense>
          
          <Suspense fallback={<LoadingSpinner size="lg" text="Loading map..." />}>
            <GoogleMapSection />
          </Suspense>
          
          <Suspense fallback={<LoadingSpinner size="lg" text="Loading testimonials..." />}>
            <TestimonialsSection />
          </Suspense>
          
          <Suspense fallback={<LoadingSpinner size="lg" text="Loading blog..." />}>
            <BlogSection />
          </Suspense>
          
          <Suspense fallback={<LoadingSpinner size="lg" text="Loading..." />}>
            <CTASection />
          </Suspense>
          
          <Suspense fallback={<LoadingSpinner size="lg" text="Loading contact form..." />}>
            <ContactFormSection />
          </Suspense>
        </main>
        
        <Suspense fallback={<div className="h-20 bg-luxury-navy animate-pulse" />}>
          <Footer />
        </Suspense>
        
        <Suspense fallback={null}>
          <WhatsAppButton />
        </Suspense>
        
        <Suspense fallback={null}>
          <AIAssistant />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
