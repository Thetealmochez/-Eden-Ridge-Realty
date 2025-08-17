import { useState, useEffect, forwardRef } from 'react';
import PropertyCard, { PropertyCardProps } from './PropertyCard';
import SkeletonCard from './SkeletonCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { formatPropertiesData } from '@/services/PropertyDataService';

interface FeaturedPropertiesProps {
  selectedPropertyType?: string;
  onTypeSelect?: (type: string) => void;
}

const FeaturedProperties = forwardRef<HTMLElement, FeaturedPropertiesProps>(
  ({ selectedPropertyType, onTypeSelect }, ref) => {
    const [filter, setFilter] = useState('all');
    const [properties, setProperties] = useState<PropertyCardProps[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const navigate = useNavigate();
    
    useEffect(() => {
      // Fetch featured properties from Supabase
      const fetchProperties = async () => {
        try {
          setLoading(true);
          
          const { data, error } = await supabase
            .from('properties')
            .select('*')
            .eq('is_featured', true)
            .order('created_at', { ascending: false });
          
          if (error) {
            throw error;
          }
          
          if (data && Array.isArray(data)) {
            const formattedProperties = formatPropertiesData(data);
            setProperties(formattedProperties);
          } else {
            setProperties([]);
          }
        } catch (error) {
          // Handle error gracefully without exposing details
          setProperties([]); // Set empty array instead of crashing
          toast({
            title: "Failed to load featured properties",
            description: "Please try again later",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };
      
      fetchProperties();
    }, [toast]);
    
    // Effect to handle external property type selection
    useEffect(() => {
      if (selectedPropertyType) {
        // Map property types to internal filter values
        const typeMap: { [key: string]: string } = {
          'Villa': 'residential',
          'Penthouse': 'residential', 
          'Commercial': 'commercial',
          'Apartment': 'residential',
          'Land': 'residential'
        };
        
        const mappedFilter = typeMap[selectedPropertyType] || 'all';
        setFilter(mappedFilter);
      }
    }, [selectedPropertyType]);
    
    /**
     * Filter properties based on current filter and selected property type
     */
    const filteredProperties = properties.filter(property => {
      if (!property) return false;
      
      // If a specific property type is selected from PropertyTypesSection, filter by that
      if (selectedPropertyType && selectedPropertyType !== 'all') {
        return property.propertyType === selectedPropertyType || 
               (selectedPropertyType === 'Villa' && property.propertyType === 'Residential') ||
               (selectedPropertyType === 'Penthouse' && property.propertyType === 'Residential') ||
               (selectedPropertyType === 'Apartment' && property.propertyType === 'Residential') ||
               (selectedPropertyType === 'Land' && property.propertyType === 'Residential') ||
               (selectedPropertyType === 'Commercial' && property.propertyType === 'Commercial');
      }
      
      // Otherwise use the internal tab filter
      return filter === 'all' || 
      (filter === 'residential' && property.propertyType === 'Residential') ||
      (filter === 'commercial' && property.propertyType === 'Commercial');
    });

    const handleViewAllClick = () => {
      navigate('/properties');
    };

    /**
     * Handle internal tab selection
     */
    const handleTabSelect = (value: string) => {
      setFilter(value);
      // Clear external property type selection when using internal tabs
      if (onTypeSelect) {
        onTypeSelect('all');
      }
    };

    /**
     * Get appropriate fallback message based on current filter
     */
    const getFallbackMessage = () => {
      if (selectedPropertyType && selectedPropertyType !== 'all') {
        const typeNames: { [key: string]: string } = {
          'Villa': 'luxury villas',
          'Penthouse': 'penthouses',
          'Commercial': 'commercial properties',
          'Apartment': 'serviced apartments',
          'Land': 'premium land'
        };
        return `No featured ${typeNames[selectedPropertyType] || 'properties'} available at the moment.`;
      }
      
      if (filter === 'residential') {
        return 'No featured residential properties available at the moment.';
      }
      
      if (filter === 'commercial') {
        return 'No featured commercial properties available at the moment.';
      }
      
      return 'No featured properties available at the moment.';
    };

    return (
      <section 
        id="featured-properties" 
        ref={ref}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-luxury-navy mb-4">
              Featured Properties
            </h2>
            <div className="mx-auto w-20 h-1 bg-luxury-gold mb-6"></div>
            <p className="text-luxury-slate max-w-2xl mx-auto">
              {selectedPropertyType && selectedPropertyType !== 'all' 
                ? `Discover our premium ${selectedPropertyType.toLowerCase()} properties across Kenya's most prestigious locations`
                : 'Explore our hand-picked selection of premium properties across Kenya\'s most sought-after locations'
              }
            </p>
          </div>
          
          {/* Show internal tabs only when no external type is selected */}
          {(!selectedPropertyType || selectedPropertyType === 'all') && (
            <Tabs value={filter} onValueChange={handleTabSelect} className="mb-12">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                <TabsTrigger 
                  value="all"
                  className="data-[state=active]:bg-luxury-navy data-[state=active]:text-white"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="residential"
                  className="data-[state=active]:bg-luxury-navy data-[state=active]:text-white"
                >
                  Residential
                </TabsTrigger>
                <TabsTrigger 
                  value="commercial"
                  className="data-[state=active]:bg-luxury-navy data-[state=active]:text-white"
                >
                  Commercial
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}
          
          {/* Property Grid */}
          <div className="mt-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={index} className="animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]" />
                ))}
              </div>
            ) : filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property, index) => (
                  <div 
                    key={property.id} 
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <PropertyCard {...property} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-luxury-slate">{getFallbackMessage()}</p>
                <p className="text-sm text-luxury-slate mt-2">
                  Properties will appear here once they are added to the database.
                </p>
                {selectedPropertyType && selectedPropertyType !== 'all' && (
                  <Button
                    onClick={() => onTypeSelect && onTypeSelect('all')}
                    variant="outline"
                    className="mt-4 border-luxury-navy text-luxury-navy hover:bg-luxury-navy hover:text-white"
                  >
                    View All Properties
                  </Button>
                )}
              </div>
            )}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              onClick={handleViewAllClick}
              className="bg-luxury-navy hover:bg-luxury-navy/90 text-white px-8 py-6 h-auto text-lg"
            >
              View All Properties
            </Button>
          </div>
        </div>
      </section>
    );
  }
);

FeaturedProperties.displayName = 'FeaturedProperties';

export default FeaturedProperties;
