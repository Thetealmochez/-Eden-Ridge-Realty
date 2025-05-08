import { useParams } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PropertyCard from "@/components/PropertyCard";
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Enhanced mock data for properties in each location with detailed information
const mockProperties = {
  nairobi: [
    {
      id: "prop1",
      title: "Luxury Villa with Pool",
      price: "KES 45,000,000",
      location: "Karen, Nairobi",
      bedrooms: 5,
      bathrooms: 4,
      area: 450,
      image: "/images/nairobi-property1.jpg",
      propertyType: "Residential" as const,
      description: "This exclusive 5-bedroom villa features a private swimming pool, landscaped gardens, and modern interiors with high-end finishes. The property includes a home office, staff quarters, and state-of-the-art security systems."
    },
    {
      id: "prop2",
      title: "Modern Apartment",
      price: "KES 25,000,000",
      location: "Westlands, Nairobi",
      bedrooms: 3,
      bathrooms: 2,
      area: 210,
      image: "/images/nairobi-property2.jpg",
      propertyType: "Residential" as const,
      description: "Located in the heart of Westlands, this contemporary apartment offers panoramic city views, open-plan living spaces, and premium amenities including a gym, rooftop pool, and 24-hour concierge service."
    },
    {
      id: "prop7",
      title: "Penthouse with City Views",
      price: "KES 38,000,000",
      location: "Kilimani, Nairobi",
      bedrooms: 4,
      bathrooms: 3.5,
      area: 320,
      image: "/images/nairobi-property3.jpg",
      propertyType: "Residential" as const,
      description: "Spectacular penthouse featuring floor-to-ceiling windows with breathtaking views of Nairobi's skyline. Includes a chef's kitchen, home automation system, entertainment terrace, and two secure parking spaces."
    }
  ],
  mombasa: [
    {
      id: "prop3",
      title: "Beachfront Property",
      price: "KES 65,000,000",
      location: "Nyali, Mombasa",
      bedrooms: 4,
      bathrooms: 4,
      area: 380,
      image: "/images/mombasa-property1.jpg",
      propertyType: "Residential" as const,
      description: "Direct beach access from this stunning oceanfront home. Features include an infinity pool overlooking the Indian Ocean, spacious verandas, tropical gardens, and a private beach area. Perfect for luxury living or as a vacation retreat."
    },
    {
      id: "prop8",
      title: "Resort-Style Villa",
      price: "KES 85,000,000",
      location: "Diani Beach, Mombasa",
      bedrooms: 6,
      bathrooms: 6.5,
      area: 520,
      image: "/images/mombasa-property2.jpg",
      propertyType: "Residential" as const,
      description: "Luxurious villa set in lush tropical gardens with a large swimming pool and outdoor entertainment areas. Features include Swahili-inspired architecture, a fully equipped modern kitchen, and staff quarters. Just minutes from Diani's white sandy beaches."
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
      image: "/images/karen-property1.jpg",
      propertyType: "Residential" as const,
      description: "Set on 1.5 acres of prime Karen land, this magnificent estate home offers unparalleled luxury with a tennis court, stable facilities, and manicured English gardens. The main house features high ceilings, hardwood floors, and a gourmet kitchen."
    },
    {
      id: "prop9",
      title: "Colonial-Style Manor",
      price: "KES 98,000,000",
      location: "Karen, Nairobi",
      bedrooms: 5,
      bathrooms: 4.5,
      area: 650,
      image: "/images/karen-property2.jpg",
      propertyType: "Residential" as const,
      description: "Classic colonial residence with modern amenities, surrounded by mature trees on a half-acre plot. Features include a library, wine cellar, heated pool, and guest cottage. Located near Karen Country Club."
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
      image: "/images/runda-property1.jpg",
      propertyType: "Residential" as const,
      description: "Architectural masterpiece in Runda featuring double-height ceilings, a grand staircase, and extensive use of marble and granite. Amenities include a home theater, indoor pool, sauna, and smart home technology throughout."
    },
    {
      id: "prop10",
      title: "Modern Family Home",
      price: "KES 85,000,000",
      location: "Runda, Nairobi",
      bedrooms: 5,
      bathrooms: 5,
      area: 750,
      image: "/images/runda-property2.jpg",
      propertyType: "Residential" as const,
      description: "Contemporary family residence with open concept interiors, floor-to-ceiling windows, and a seamless indoor-outdoor living experience. Features include a children's play area, home gym, and outdoor kitchen."
    }
  ],
  muthaiga: [
    {
      id: "prop11",
      title: "Historic Muthaiga Estate",
      price: "KES 180,000,000",
      location: "Muthaiga, Nairobi",
      bedrooms: 6,
      bathrooms: 7,
      area: 950,
      image: "/images/muthaiga-property1.jpg",
      propertyType: "Residential" as const,
      description: "Prestigious estate in Nairobi's most exclusive neighborhood. This colonial-era property has been meticulously restored with modern amenities while preserving its historical charm. Set on 2 acres with mature gardens."
    }
  ],
  lavington: [
    {
      id: "prop12",
      title: "Lavington Garden Home",
      price: "KES 75,000,000",
      location: "Lavington, Nairobi",
      bedrooms: 4,
      bathrooms: 4.5,
      area: 450,
      image: "/images/lavington-property1.jpg",
      propertyType: "Residential" as const,
      description: "Elegant family home in a secure gated community featuring tropical gardens, a swimming pool, and spacious entertainment areas. The property includes staff quarters and a home office/study."
    }
  ],
  kileleshwa: [
    {
      id: "prop13",
      title: "Riverside Residence",
      price: "KES 68,000,000",
      location: "Kileleshwa, Nairobi",
      bedrooms: 4,
      bathrooms: 3.5,
      area: 350,
      image: "/images/kileleshwa-property1.jpg",
      propertyType: "Residential" as const,
      description: "Luxury townhouse with serene views of Kileleshwa's green spaces. Features include a rooftop terrace, vertical garden, and intelligent home systems. Located in a secure compound with shared amenities."
    }
  ],
  westlands: [
    {
      id: "prop14",
      title: "Corporate Headquarters",
      price: "KES 220,000,000",
      location: "Westlands, Nairobi",
      bedrooms: 0,
      bathrooms: 8,
      area: 2500,
      image: "/images/westlands-property1.jpg",
      propertyType: "Commercial" as const,
      description: "Prime commercial property in Westlands' business district. Modern office building with multiple floors, underground parking, high-speed elevators, and energy-efficient systems. Excellent investment opportunity."
    }
  ],
  kilimani: [
    {
      id: "prop15",
      title: "Kilimani Apartment Complex",
      price: "KES 150,000,000",
      location: "Kilimani, Nairobi",
      bedrooms: 12,
      bathrooms: 14,
      area: 1200,
      image: "/images/kilimani-property1.jpg",
      propertyType: "Residential" as const,
      description: "Investment opportunity: residential apartment building with 6 two-bedroom units. Fully occupied with consistent rental income. Includes secure parking, backup power, and water storage systems."
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
