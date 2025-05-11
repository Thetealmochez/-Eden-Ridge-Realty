import { useState, useEffect } from 'react';
import PropertyCard, { PropertyCardProps } from './PropertyCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const FeaturedProperties = () => {
  const [filter, setFilter] = useState('all');
  const [properties, setProperties] = useState<PropertyCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch properties from Supabase
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
        
        if (data) {
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
  
  const filteredProperties = properties.filter(property => 
    filter === 'all' || 
    (filter === 'residential' && property.propertyType === 'Residential') ||
    (filter === 'commercial' && property.propertyType === 'Commercial')
  );

  const handleViewAllClick = () => {
    navigate('/properties');
  };

  return (
    <section id="properties" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-luxury-navy mb-4">
            Featured Properties
          </h2>
          <div className="mx-auto w-20 h-1 bg-luxury-gold mb-6"></div>
          <p className="text-luxury-slate max-w-2xl mx-auto">
            Explore our hand-picked selection of premium properties across Kenya's most sought-after locations
          </p>
        </div>
        
        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger 
              value="all"
              onClick={() => setFilter('all')}
              className="data-[state=active]:bg-luxury-navy data-[state=active]:text-white"
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="residential"
              onClick={() => setFilter('residential')}
              className="data-[state=active]:bg-luxury-navy data-[state=active]:text-white"
            >
              Residential
            </TabsTrigger>
            <TabsTrigger 
              value="commercial"
              onClick={() => setFilter('commercial')}
              className="data-[state=active]:bg-luxury-navy data-[state=active]:text-white"
            >
              Commercial
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-8">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-luxury-navy" />
              </div>
            ) : filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-luxury-slate">No featured properties available at the moment.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="residential" className="mt-8">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-luxury-navy" />
              </div>
            ) : filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-luxury-slate">No featured residential properties available at the moment.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="commercial" className="mt-8">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-luxury-navy" />
              </div>
            ) : filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-luxury-slate">No featured commercial properties available at the moment.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="text-center">
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
};

export default FeaturedProperties;
