
import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard, { PropertyCardProps } from '@/components/PropertyCard';
import WhatsAppButton from "@/components/WhatsAppButton";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Loader2, Search as SearchIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Properties = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Extract all unique locations for filter dropdown
          const uniqueLocations = [...new Set(data.map(item => item.location))].filter(Boolean) as string[];
          setLocations(uniqueLocations);
          
          const formattedProperties = data.map(prop => {
            // Safely handle the images property
            let mainImage = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"; // default image
            
            if (prop.images) {
              // Handle various cases for images data
              if (Array.isArray(prop.images) && prop.images.length > 0) {
                // If it's an array, take the first item
                const firstImage = prop.images[0];
                if (typeof firstImage === 'string') {
                  mainImage = firstImage;
                }
              } else if (typeof prop.images === 'string') {
                // If it's directly a string
                mainImage = prop.images;
              }
            }
            
            return {
              id: prop.id,
              title: prop.title || 'Luxury Property',
              price: prop.price ? `KSh ${prop.price.toLocaleString()}` : 'Price on Request',
              numericPrice: prop.price || 0,
              location: prop.location || 'Kenya',
              bedrooms: prop.bedrooms || 0,
              bathrooms: prop.bathrooms || 0,
              area: prop.size_sqft || 0,
              image: mainImage,
              propertyType: prop.property_type || 'Residential',
              description: prop.description || 'Luxury property in prime location',
              yearBuilt: 2023,
              amenities: ['Luxury', 'Premium', 'Exclusive'],
              // Handle multiple images for property cards
              images: Array.isArray(prop.images) ? 
                prop.images.filter(img => typeof img === 'string') as string[] : 
                [mainImage]
            };
          });
          
          setProperties(formattedProperties);
          setFilteredProperties(formattedProperties);
        }
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
    
    fetchProperties();
  }, [toast]);

  // Apply filters whenever filter values change
  useEffect(() => {
    if (properties.length === 0) return;
    
    let filtered = [...properties];
    
    // Filter by property type
    if (propertyType !== 'all') {
      filtered = filtered.filter(property => 
        property.propertyType.toLowerCase() === propertyType.toLowerCase()
      );
    }
    
    // Filter by location
    if (location !== 'all') {
      filtered = filtered.filter(property => 
        property.location.toLowerCase() === location.toLowerCase()
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(property => {
      const price = property.numericPrice !== undefined ? property.numericPrice : 0;
      return price >= minPrice && price <= maxPrice;
    });
    
    // Filter by bedrooms
    if (bedrooms !== 'any') {
      const bedroomCount = parseInt(bedrooms);
      if (bedrooms === '5+') {
        filtered = filtered.filter(property => property.bedrooms >= 5);
      } else {
        filtered = filtered.filter(property => property.bedrooms === bedroomCount);
      }
    }
    
    // Filter by search term (check title, description, and location)
    if (searchTerm.trim().length > 0) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(searchLower) ||
        (property.description && property.description.toLowerCase().includes(searchLower)) ||
        property.location.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredProperties(filtered);
  }, [properties, propertyType, location, minPrice, maxPrice, bedrooms, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useEffect above
  };

  const resetFilters = () => {
    setPropertyType('all');
    setLocation('all');
    setMinPrice(0);
    setMaxPrice(200000000);
    setBedrooms('any');
    setSearchTerm('');
  };

  // Handler to navigate to properties page
  const handleViewAllClick = () => {
    navigate('/properties');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-luxury-navy py-20 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">Find Your Dream Property</h1>
            <p className="text-white/80 text-center max-w-2xl mx-auto mb-10">
              Discover exclusive properties in Kenya's most prestigious locations
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-4xl mx-auto">
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search by location, property type or keyword"
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Residential">Residential</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                    <Select value={bedrooms} onValueChange={setBedrooms}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5+">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700">Price Range</span>
                    <span className="text-sm text-luxury-navy">
                      KSh {minPrice.toLocaleString()} - KSh {maxPrice.toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[minPrice, maxPrice]}
                    min={0}
                    max={200000000}
                    step={1000000}
                    value={[minPrice, maxPrice]}
                    onValueChange={(values) => {
                      setMinPrice(values[0]);
                      setMaxPrice(values[1]);
                    }}
                    className="my-4"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" className="bg-luxury-navy hover:bg-luxury-navy/90 flex-1">
                    Search Properties
                  </Button>
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={resetFilters}
                    className="border-luxury-navy text-luxury-navy hover:bg-luxury-navy/10"
                  >
                    Reset Filters
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-semibold text-luxury-navy mb-2">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
          </h2>
          <div className="w-20 h-1 bg-luxury-gold mb-10"></div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-luxury-navy" />
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-luxury-navy mb-2">No properties match your criteria</h3>
              <p className="text-luxury-slate mb-6">Try adjusting your filters to see more results.</p>
              <Button onClick={resetFilters} className="bg-luxury-navy hover:bg-luxury-navy/90">
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Properties;
