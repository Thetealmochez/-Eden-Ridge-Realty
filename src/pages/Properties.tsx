
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from "@/components/Navbar";
import PropertySearchHero from "@/components/PropertySearchHero";
import AdvancedPropertyFilters from "@/components/AdvancedPropertyFilters";
import PropertyResults from "@/components/PropertyResults";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AIAssistant from "@/components/AIAssistant";
import PageMeta from "@/components/PageMeta";
import SkipToContent from "@/components/SkipToContent";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { fetchAllProperties, filterProperties } from '@/services/PropertyDataService';
import { PropertyCardProps } from '@/components/PropertyCard';

const Properties = () => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [location, setLocation] = useState('all');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000000);
  const [bedrooms, setBedrooms] = useState('any');
  const [filteredProperties, setFilteredProperties] = useState<PropertyCardProps[]>([]);
  
  // Fetch properties using React Query
  const { 
    data: properties = [], 
    isLoading: loading, 
    error 
  } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchAllProperties,
  });

  // Extract unique locations from properties
  const locations = Array.from(new Set(
    properties
      .map(prop => prop.location)
      .filter(Boolean)
  )).sort();

  // Filter properties whenever filters or properties change
  useEffect(() => {
    if (properties && Array.isArray(properties)) {
      const filtered = filterProperties(
        properties,
        propertyType,
        location,
        minPrice,
        maxPrice,
        bedrooms,
        searchTerm
      );
      setFilteredProperties(filtered);
    }
  }, [properties, propertyType, location, minPrice, maxPrice, bedrooms, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is already handled by useEffect above
    console.log('Search triggered with current filters');
  };

  const resetFilters = () => {
    setSearchTerm('');
    setPropertyType('all');
    setLocation('all');
    setMinPrice(0);
    setMaxPrice(200000000);
    setBedrooms('any');
  };

  // Handle errors gracefully
  if (error) {
    console.error('Error loading properties:', error);
  }

  const breadcrumbPaths = [
    { label: 'Home', href: '/' },
    { label: 'Properties' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta 
        title="Properties | Eden Ridge Realty - Luxury Real Estate Listings"
        description="Browse our extensive collection of luxury residential and commercial properties across Kenya. Find your dream home with Eden Ridge Realty."
        keywords="Kenya properties, luxury homes, real estate listings, Nairobi properties, Karen homes, Westlands apartments"
      />
      <SkipToContent />
      <Navbar />
      
      <main id="main-content" className="flex-grow">
        <PropertySearchHero />
        
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <BreadcrumbNav customPaths={breadcrumbPaths} />
          </div>
          
          {/* Advanced Filters Section */}
          <div className="mb-12">
            <AdvancedPropertyFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              propertyType={propertyType}
              setPropertyType={setPropertyType}
              location={location}
              setLocation={setLocation}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              bedrooms={bedrooms}
              setBedrooms={setBedrooms}
              locations={locations}
              handleSearch={handleSearch}
              resetFilters={resetFilters}
            />
          </div>
        </div>
        
        {/* Results Section */}
        <PropertyResults 
          loading={loading}
          filteredProperties={filteredProperties}
          resetFilters={resetFilters}
        />
      </main>
      
      <Footer />
      <WhatsAppButton />
      <AIAssistant />
    </div>
  );
};

export default Properties;
