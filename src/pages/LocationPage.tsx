
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Grid, Map as MapIcon, SlidersHorizontal, X } from 'lucide-react';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PropertyFilters from '@/components/PropertyFilters';
import PropertyResults from '@/components/PropertyResults';
import PropertyCard, { PropertyCardProps } from '@/components/PropertyCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import SEOHelmet from '@/components/SEOHelmet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { fetchAllProperties, filterProperties } from '@/services/PropertyDataService';

const LocationPage = () => {
  const { locationName } = useParams<{ locationName: string }>();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<PropertyCardProps[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<PropertyCardProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  
  // Filter states
  const [propertyType, setPropertyType] = useState('all');
  const [location, setLocation] = useState(locationName || 'all');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000000);
  const [bedrooms, setBedrooms] = useState('any');
  const [locations, setLocations] = useState<string[]>([]);

  // Format location name for display
  const formatLocationName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const formattedLocationName = locationName ? formatLocationName(locationName) : 'All Locations';

  // Fetch properties for this location
  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const allProperties = await fetchAllProperties();
        
        // Filter properties by location if specified
        let locationProperties = allProperties;
        if (locationName && locationName !== 'all') {
          locationProperties = allProperties.filter(property => 
            property.location.toLowerCase().includes(locationName.toLowerCase())
          );
        }
        
        // Extract unique locations
        const uniqueLocations = [...new Set(allProperties.map(item => item.location))].filter(Boolean) as string[];
        setLocations(uniqueLocations);
        
        setProperties(locationProperties);
        setFilteredProperties(locationProperties);
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
  }, [locationName, toast]);

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
    // Search is handled by useEffect
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
        <p className="text-luxury-slate mb-4">Properties will be displayed on an interactive map</p>
        <p className="text-sm text-luxury-slate">Map integration coming soon with Google Maps or Mapbox</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <LoadingSpinner text="Loading properties..." />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHelmet 
        title={`Properties in ${formattedLocationName} | Evans Kenya Homes`}
        description={`Find the best real estate properties in ${formattedLocationName}, Kenya. Browse apartments, houses, and commercial properties for sale and rent.`}
        keywords={`${formattedLocationName} properties, ${formattedLocationName} real estate, Kenya properties, houses for sale ${formattedLocationName}`}
      />
      
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
              <Link to="/" className="text-luxury-slate hover:text-luxury-navy transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link to="/properties" className="text-luxury-slate hover:text-luxury-navy transition-colors">
                Properties
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-luxury-navy font-medium">{formattedLocationName}</span>
            </nav>
          </div>
        </div>

        {/* Location Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-semibold text-luxury-navy mb-2">
                  Properties in {formattedLocationName}
                </h1>
                <div className="flex items-center text-luxury-slate mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{formattedLocationName}, Kenya</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="text-luxury-navy">
                    {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'}
                  </Badge>
                </div>
              </div>
              
              {/* View Toggle */}
              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  onClick={() => setViewMode('grid')}
                  className="bg-luxury-navy hover:bg-luxury-navy/90"
                >
                  <Grid className="h-4 w-4 mr-1" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  onClick={() => setViewMode('map')}
                  className="bg-luxury-navy hover:bg-luxury-navy/90"
                >
                  <MapIcon className="h-4 w-4 mr-1" />
                  Map
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden bg-white border-b px-4 py-3">
          <Button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            variant="outline"
            className="w-full justify-center"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters & Search
          </Button>
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
                    Apply Filters
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
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-luxury-navy mb-6">Search & Filters</h2>
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
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              {viewMode === 'grid' ? (
                <div>
                  {filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredProperties.map((property) => (
                        <PropertyCard key={property.id} {...property} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <h3 className="text-xl font-semibold text-luxury-navy mb-2">
                        No properties found in {formattedLocationName}
                      </h3>
                      <p className="text-luxury-slate mb-6">
                        Try adjusting your filters or search in other locations.
                      </p>
                      <div className="space-y-4">
                        <Button onClick={resetFilters} variant="outline">
                          Reset Filters
                        </Button>
                        <div>
                          <Link to="/properties">
                            <Button className="bg-luxury-navy hover:bg-luxury-navy/90">
                              Browse All Properties
                            </Button>
                          </Link>
                        </div>
                      </div>
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

export default LocationPage;
