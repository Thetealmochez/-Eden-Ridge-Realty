
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Grid, Map as MapIcon, SlidersHorizontal, X } from 'lucide-react';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PropertySearchHero from '@/components/PropertySearchHero';
import PropertyFilters from '@/components/PropertyFilters';
import PropertyResults from '@/components/PropertyResults';
import PropertyCard, { PropertyCardProps } from '@/components/PropertyCard';
import SEOHelmet from '@/components/SEOHelmet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { fetchAllProperties, filterProperties } from '@/services/PropertyDataService';

const Properties = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<PropertyCardProps[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<PropertyCardProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  
  // Filter states
  const [propertyType, setPropertyType] = useState('all');
  const [location, setLocation] = useState('all');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000000);
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

  // Apply filters
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
  };

  const resetFilters = () => {
    setPropertyType('all');
    setLocation('all');
    setMinPrice(0);
    setMaxPrice(200000000);
    setBedrooms('any');
    setSearchTerm('');
  };

  // Map placeholder component
  const MapView = () => (
    <div className="h-[600px] w-full bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center p-8">
        <MapIcon className="h-16 w-16 text-luxury-navy/30 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-luxury-navy mb-2">Interactive Map View</h3>
        <p className="text-luxury-slate mb-4">All properties will be displayed on an interactive map</p>
        <p className="text-sm text-luxury-slate">Map integration coming soon with Google Maps or Mapbox</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHelmet 
        title="Properties for Sale & Rent in Kenya | Evans Kenya Homes"
        description="Browse premium properties for sale and rent across Kenya. Find your dream home with our comprehensive real estate listings."
        keywords="Kenya properties, houses for sale Kenya, apartments for rent Kenya, real estate Kenya"
      />
      
      <Navbar />
      
      <main className="flex-grow">
        <PropertySearchHero />
        
        {/* Enhanced Search & Filter Section */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-semibold text-luxury-navy">
                  All Properties
                </h1>
                <Badge variant="outline" className="text-luxury-navy">
                  {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'}
                </Badge>
              </div>
              
              {/* Desktop View Toggle */}
              <div className="hidden lg:flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  onClick={() => setViewMode('grid')}
                  className="bg-luxury-navy hover:bg-luxury-navy/90"
                >
                  <Grid className="h-4 w-4 mr-1" />
                  Grid View
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  onClick={() => setViewMode('map')}
                  className="bg-luxury-navy hover:bg-luxury-navy/90"
                >
                  <MapIcon className="h-4 w-4 mr-1" />
                  Map View
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden bg-white border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              variant="outline"
              className="flex-1 mr-2"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters & Search
            </Button>
            
            <div className="flex space-x-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
                size="sm"
                className="bg-luxury-navy hover:bg-luxury-navy/90"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                onClick={() => setViewMode('map')}
                size="sm"
                className="bg-luxury-navy hover:bg-luxury-navy/90"
              >
                <MapIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Filters Overlay */}
        {showMobileFilters && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
            <div className="absolute inset-x-0 top-0 bg-white h-full overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-luxury-navy">Filters & Search</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowMobileFilters(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
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
                
                <div className="mt-6 pt-6 border-t">
                  <Button
                    onClick={() => setShowMobileFilters(false)}
                    className="w-full bg-luxury-navy hover:bg-luxury-navy/90"
                  >
                    Apply Filters ({filteredProperties.length} properties)
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-luxury-navy p-6 text-white">
                    <h2 className="text-xl font-semibold">Search & Filters</h2>
                  </div>
                  <div className="p-6">
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
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              {viewMode === 'grid' ? (
                <div>
                  {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-lg shadow-lg h-96 animate-pulse">
                          <div className="h-64 bg-gray-200 rounded-t-lg"></div>
                          <div className="p-6 space-y-3">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredProperties.map((property) => (
                        <PropertyCard key={property.id} {...property} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <h3 className="text-xl font-semibold text-luxury-navy mb-2">
                        No properties match your criteria
                      </h3>
                      <p className="text-luxury-slate mb-6">
                        Try adjusting your filters to see more results.
                      </p>
                      <Button onClick={resetFilters} className="bg-luxury-navy hover:bg-luxury-navy/90">
                        Reset All Filters
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <MapView />
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Properties;
