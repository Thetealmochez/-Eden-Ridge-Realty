
import { useState } from 'react';
import PropertyCard, { PropertyCardProps } from './PropertyCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Sample property data
const properties: PropertyCardProps[] = [
  {
    id: "1",
    title: "Luxury Villa in Karen",
    price: "KSh 85,000,000",
    location: "Karen, Nairobi",
    bedrooms: 5,
    bathrooms: 5.5,
    area: 450,
    image: "/images/property1.jpg",
    featured: true,
    propertyType: "Residential"
  },
  {
    id: "2",
    title: "Penthouse with City Views",
    price: "KSh 45,000,000",
    location: "Westlands, Nairobi",
    bedrooms: 3,
    bathrooms: 3,
    area: 250,
    image: "/images/property2.jpg",
    featured: true,
    propertyType: "Residential"
  },
  {
    id: "3",
    title: "Modern Office Complex",
    price: "KSh 150,000,000",
    location: "Upper Hill, Nairobi",
    bedrooms: 0,
    bathrooms: 6,
    area: 1200,
    image: "/images/property3.jpg",
    featured: true,
    propertyType: "Commercial"
  },
  {
    id: "4",
    title: "Beachfront Villa",
    price: "KSh 120,000,000",
    location: "Diani Beach, Mombasa",
    bedrooms: 4,
    bathrooms: 4.5,
    area: 350,
    image: "/images/property4.jpg",
    propertyType: "Residential"
  },
  {
    id: "5",
    title: "Retail Space in Business District",
    price: "KSh 75,000,000",
    location: "CBD, Nairobi",
    bedrooms: 0,
    bathrooms: 2,
    area: 300,
    image: "/images/property5.jpg",
    propertyType: "Commercial"
  },
  {
    id: "6",
    title: "Lake View Estate",
    price: "KSh 65,000,000",
    location: "Naivasha",
    bedrooms: 4,
    bathrooms: 3,
    area: 320,
    image: "/images/property6.jpg",
    propertyType: "Residential"
  }
];

const FeaturedProperties = () => {
  const [filter, setFilter] = useState('all');
  
  const filteredProperties = properties.filter(property => 
    filter === 'all' || 
    (filter === 'residential' && property.propertyType === 'Residential') ||
    (filter === 'commercial' && property.propertyType === 'Commercial')
  );

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="residential" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="commercial" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center">
          <Button className="bg-luxury-navy hover:bg-luxury-navy/90 text-white px-8 py-6 h-auto text-lg">
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
