
import { useParams } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PropertyCard from "@/components/PropertyCard";
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Mock data for properties in each location
const mockProperties = {
  nairobi: [
    {
      id: "prop1",
      title: "Luxury Villa with Pool",
      price: "KES 45,000,000",
      location: "Nairobi",
      bedrooms: 5,
      bathrooms: 4,
      area: 450,
      image: "/images/nairobi.jpg",
      propertyType: "Residential" as const
    },
    {
      id: "prop2",
      title: "Modern Apartment",
      price: "KES 25,000,000",
      location: "Nairobi",
      bedrooms: 3,
      bathrooms: 2,
      area: 210,
      image: "/images/nairobi.jpg",
      propertyType: "Residential" as const
    }
  ],
  mombasa: [
    {
      id: "prop3",
      title: "Beachfront Property",
      price: "KES 65,000,000",
      location: "Mombasa",
      bedrooms: 4,
      bathrooms: 4,
      area: 380,
      image: "/images/mombasa.jpg",
      propertyType: "Residential" as const
    }
  ],
  karen: [
    {
      id: "prop4",
      title: "Karen Estate Home",
      price: "KES 120,000,000",
      location: "Karen, Nairobi",
      bedrooms: 6,
      bathrooms: 6,
      area: 800,
      image: "/images/karen.jpg",
      propertyType: "Residential" as const
    }
  ],
  runda: [
    {
      id: "prop5",
      title: "Executive Runda Mansion",
      price: "KES 150,000,000",
      location: "Runda, Nairobi",
      bedrooms: 7,
      bathrooms: 8,
      area: 1200,
      image: "/images/runda.jpg",
      propertyType: "Residential" as const
    }
  ]
};

// Mapping of location IDs to their full names
const locationNames: Record<string, string> = {
  nairobi: "Nairobi",
  mombasa: "Mombasa",
  kisumu: "Kisumu",
  karen: "Karen",
  runda: "Runda",
  muthaiga: "Muthaiga",
  lavington: "Lavington",
  kileleshwa: "Kileleshwa",
  westlands: "Westlands",
  kilimani: "Kilimani",
  gigiri: "Gigiri",
  rosslyn: "Rosslyn",
  kitisuru: "Kitisuru",
  nyari: "Nyari Estate",
  thigiri: "Thigiri",
  upperhill: "Upper Hill",
  riverside: "Riverside Drive",
  nyali: "Nyali",
  vipingo: "Vipingo Ridge",
  diani: "Diani Beach",
  kilifi: "Kilifi",
  malindi: "Malindi",
  naivasha: "Naivasha",
  nanyuki: "Nanyuki",
  elementaita: "Elementaita"
};

const LocationPage = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  
  // Get the location name from the ID, with fallback for unknown locations
  const locationName = locationId 
    ? locationNames[locationId] || locationId.charAt(0).toUpperCase() + locationId.slice(1)
    : "Unknown Location";
  
  // Get properties for this location or an empty array if none exists
  const locationProperties = (locationId && mockProperties[locationId as keyof typeof mockProperties]) || [];

  // Validate that the location exists in our records
  useEffect(() => {
    if (locationId && !Object.keys(locationNames).includes(locationId)) {
      // Log for monitoring but don't redirect - we'll show a generic page
      console.log(`Warning: Unknown location ID accessed: ${locationId}`);
    }
  }, [locationId]);

  // Default fallback background image
  const fallbackImage = '/images/placeholder.svg';

  // Dynamic background image URL based on locationId with error handling
  const backgroundImageStyle = {
    backgroundImage: imageError || !locationId 
      ? `url('${fallbackImage}')`
      : `url('/images/${locationId}.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  // Image error handler for background
  const handleImageError = () => {
    setImageError(true);
    console.log(`Image for location ${locationId} could not be loaded.`);
  };

  // Preload the image to detect loading errors
  useEffect(() => {
    if (locationId) {
      const img = new Image();
      img.src = `/images/${locationId}.jpg`;
      img.onerror = handleImageError;
    }
  }, [locationId]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <div className="relative h-64 md:h-96 w-full" style={backgroundImageStyle}>
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-navy/70 to-luxury-navy/50 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-white">
              {locationName}
            </h1>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)} 
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Locations
            </Button>
            
            <h2 className="text-3xl font-semibold text-luxury-navy mb-2">Properties in {locationName}</h2>
            <div className="w-20 h-1 bg-luxury-gold mb-6"></div>
            <p className="text-luxury-slate">
              Discover our exclusive selection of premium properties in {locationName}.
            </p>
          </div>
          
          {locationProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locationProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <h3 className="text-2xl font-medium text-luxury-slate mb-4">Coming Soon</h3>
              <p className="text-luxury-slate max-w-lg mx-auto">
                We're currently updating our listings for {locationName}. Please check back soon or contact us for more information about properties in this area.
              </p>
            </div>
          )}
          
          <div className="mt-16 bg-luxury-navy/5 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-luxury-navy mb-4">About {locationName}</h3>
            <p className="text-luxury-slate mb-4">
              {locationName} is one of Kenya's premium real estate areas, known for its exceptional properties and favorable living environment.
            </p>
            <p className="text-luxury-slate">
              Contact us today to learn more about investment and living opportunities in {locationName}.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default LocationPage;
