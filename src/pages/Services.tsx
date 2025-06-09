
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageMeta from "@/components/PageMeta";
import SkipToContent from "@/components/SkipToContent";
import { Home, Building, Search, FileText, Calculator, Users } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Residential Sales",
      description: "Find your perfect home with our extensive residential property portfolio across Kenya's most desirable locations.",
      features: ["Property valuation", "Home staging", "Negotiation support", "Legal assistance"]
    },
    {
      icon: Building,
      title: "Commercial Real Estate",
      description: "Comprehensive commercial property solutions for businesses looking to buy, sell, or lease office and retail spaces.",
      features: ["Market analysis", "Investment consultation", "Lease negotiations", "Property management"]
    },
    {
      icon: Search,
      title: "Property Search & Acquisition",
      description: "Personalized property search services to help you find exactly what you're looking for within your budget.",
      features: ["Custom search criteria", "Market research", "Property tours", "Due diligence"]
    },
    {
      icon: FileText,
      title: "Legal & Documentation",
      description: "Complete legal support and documentation services to ensure smooth and secure property transactions.",
      features: ["Title verification", "Contract preparation", "Legal compliance", "Transfer processing"]
    },
    {
      icon: Calculator,
      title: "Property Valuation",
      description: "Professional property valuation services using the latest market data and industry-standard methodologies.",
      features: ["Market value assessment", "Investment analysis", "Comparative studies", "Detailed reports"]
    },
    {
      icon: Users,
      title: "Investment Consultation",
      description: "Expert guidance on real estate investment opportunities to help you make informed financial decisions.",
      features: ["Portfolio analysis", "ROI calculations", "Risk assessment", "Growth projections"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta 
        title="Our Services | Eden Ridge Realty - Comprehensive Real Estate Solutions" 
        description="Explore our comprehensive real estate services including residential sales, commercial properties, investment consultation, and legal support in Kenya."
        keywords="real estate services Kenya, property sales, commercial real estate, investment consultation, property valuation, legal documentation"
      />
      <SkipToContent />
      <Navbar />
      
      <main id="main-content" className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-luxury-navy py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Services
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              Comprehensive real estate solutions tailored to meet your unique needs and investment goals
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover-lift">
                    <div className="bg-luxury-gold/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                      <Icon className="h-8 w-8 text-luxury-gold" />
                    </div>
                    
                    <h3 className="text-xl font-serif font-semibold text-luxury-navy mb-4">
                      {service.title}
                    </h3>
                    
                    <p className="text-luxury-slate mb-6">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-luxury-slate">
                          <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-luxury-navy">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
              Contact us today to discuss your real estate needs and discover how we can help you achieve your property goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-luxury-gold text-luxury-navy px-8 py-3 rounded-md font-medium hover:bg-luxury-gold/90 transition-colors"
              >
                Contact Us Today
              </a>
              <a
                href="/properties"
                className="border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                Browse Properties
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Services;
