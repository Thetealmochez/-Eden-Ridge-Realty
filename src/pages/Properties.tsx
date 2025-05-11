
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PropertySearchHero from '@/components/PropertySearchHero';
import PropertyFilters from '@/components/PropertyFilters';
import PropertyResults from '@/components/PropertyResults';
import { PropertyCardProps } from '@/components/PropertyCard';

import { fetchAllProperties, filterProperties } from '@/services/PropertyDataService';

const Properties = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<PropertyCardProps[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<PropertyCardProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter states
  const [propertyType, setPropertyType] = useState('all');
  const [location, setLocation] = useState('all');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000000); // 200M
  const [bedrooms, setBedrooms] = useState('any');
  const [locations, setLocations] = useState<string[]>([]);

  // Initialize filters from URL parameters
  useEffect(() => {
    const typeParam = searchParams.get('type');
    const locationParam = searchParams.get('location');
    const priceParam = searchParams.get('price');
    const bedroomsParam = searchParams.get('bedrooms');
    
    if (typeParam) setPropertyType(typeParam);
    if (locationParam) setLocation(locationParam);
    if (bedroomsParam) setBedrooms(bedroomsParam);
    
    // Handle price range parameters
    if (priceParam) {
      const [min, max] = priceParam.split('-').map(Number);
      if (!isNaN(min)) setMinPrice(min);
      if (!isNaN(max)) setMaxPrice(max);
    }
  }, [searchParams]);

  // Fetch all properties
  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const formattedProperties = await fetchAllProperties();
        
        // Extract all unique locations for filter dropdown
        const uniqueLocations = [...new Set(formattedProperties.map(item => item.location))].filter(Boolean) as string[];
        setLocations(uniqueLocations);
        
        setProperties(formattedProperties);
        setFilteredProperties(formattedProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
        toast({
          title: "Failed to load properties",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadProperties();
  }, [toast]);

  // Apply filters whenever filter values change
  useEffect(() => {
    if (properties.length === 0) return;
    
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
  }, [properties, propertyType, location, minPrice, maxPrice, bedrooms, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useEffect filter
  };

  const resetFilters = () => {
    setPropertyType('all');
    setLocation('all');
    setMinPrice(0);
    setMaxPrice(200000000);
    setBedrooms('any');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <PropertySearchHero />
        
        <div className="container mx-auto px-4 -mt-10 relative z-10">
          <PropertyFilters
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
        
        <PropertyResults 
          loading={loading}
          filteredProperties={filteredProperties}
          resetFilters={resetFilters}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Properties;
