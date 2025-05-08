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
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      propertyType: "Residential" as const,
      description: "This exclusive 5-bedroom villa features a private swimming pool, landscaped gardens, and modern interiors with high-end finishes. The property includes a home office, staff quarters, and state-of-the-art security systems.",
      yearBuilt: 2020,
      amenities: ["Swimming Pool", "Home Office", "Garden", "Security Systems", "Staff Quarters"]
    },
    {
      id: "prop2",
      title: "Modern Apartment",
      price: "KES 25,000,000",
      location: "Westlands, Nairobi",
      bedrooms: 3,
      bathrooms: 2,
      area: 210,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      propertyType: "Residential" as const,
      description: "Located in the heart of Westlands, this contemporary apartment offers panoramic city views, open-plan living spaces, and premium amenities including a gym, rooftop pool, and 24-hour concierge service.",
      yearBuilt: 2021,
      amenities: ["Gym", "Rooftop Pool", "Concierge", "Security", "Parking"]
    },
    {
      id: "prop7",
      title: "Penthouse with City Views",
      price: "KES 38,000,000",
      location: "Kilimani, Nairobi",
      bedrooms: 4,
      bathrooms: 3.5,
      area: 320,
      image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      propertyType: "Residential" as const,
      description: "Spectacular penthouse featuring floor-to-ceiling windows with breathtaking views of Nairobi's skyline. Includes a chef's kitchen, home automation system, entertainment terrace, and two secure parking spaces.",
      yearBuilt: 2022,
      amenities: ["Chef's Kitchen", "Smart Home", "Entertainment Terrace", "Secure Parking"]
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
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      propertyType: "Residential" as const,
      description: "Direct beach access from this stunning oceanfront home. Features include an infinity pool overlooking the Indian Ocean, spacious verandas, tropical gardens, and a private beach area. Perfect for luxury living or as a vacation retreat.",
      yearBuilt: 2019,
      amenities: ["Beachfront", "Infinity Pool", "Private Beach", "Ocean View", "Tropical Gardens"]
    },
    {
      id: "prop8",
      title: "Resort-Style Villa",
      price: "KES 85,000,000",
      location: "Diani Beach, Mombasa",
      bedrooms: 6,
      bathrooms: 6.5,
      area: 520,
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      propertyType: "Residential" as const,
      description: "Luxurious villa set in lush tropical gardens with a large swimming pool and outdoor entertainment areas. Features include Swahili-inspired architecture, a fully equipped modern kitchen, and staff quarters. Just minutes from Diani's white sandy beaches.",
      yearBuilt: 2018,
      amenities: ["Swahili Architecture", "Swimming Pool", "Outdoor Entertainment", "Staff Quarters", "Beach Proximity"]
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
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
      propertyType: "Residential" as const,
      description: "Set on 1.5 acres of prime Karen land, this magnificent estate home offers unparalleled luxury with a tennis court, stable facilities, and manicured English gardens. The main house features high ceilings, hardwood floors, and a gourmet kitchen.",
      yearBuilt: 2015,
      amenities: ["Tennis Court", "Stables", "English Garden", "Hardwood Floors", "Gourmet Kitchen"]
    },
    {
      id: "prop9",
      title: "Colonial-Style Manor",
      price: "KES 98,000,000",
      location: "Karen, Nairobi",
      bedrooms: 5,
      bathrooms: 4.5,
      area: 650,
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      propertyType: "Residential" as const,
      description: "Classic colonial residence with modern amenities, surrounded by mature trees on a half-acre plot. Features include a library, wine cellar, heated pool, and guest cottage. Located near Karen Country Club.",
      yearBuilt: 2010,
      amenities: ["Library", "Wine Cellar", "Heated Pool", "Guest Cottage", "Country Club Proximity"]
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
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      propertyType: "Residential" as const,
      description: "Architectural masterpiece in Runda featuring double-height ceilings, a grand staircase, and extensive use of marble and granite. Amenities include a home theater, indoor pool, sauna, and smart home technology throughout.",
      yearBuilt: 2017,
      amenities: ["Home Theater", "Indoor Pool", "Sauna", "Smart Home", "Marble & Granite Finishes"]
    },
    {
      id: "prop10",
      title: "Modern Family Home",
      price: "KES 85,000,000",
      location: "Runda, Nairobi",
      bedrooms: 5,
      bathrooms: 5,
      area: 750,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      propertyType: "Residential" as const,
      description: "Contemporary family residence with open concept interiors, floor-to-ceiling windows, and a seamless indoor-outdoor living experience. Features include a children's play area, home gym, and outdoor kitchen.",
      yearBuilt: 2019,
      amenities: ["Open Concept", "Children's Play Area", "Home Gym", "Outdoor Kitchen", "Indoor-Outdoor Living"]
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
      image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80",
      propertyType: "Residential" as const,
      description: "Prestigious estate in Nairobi's most exclusive neighborhood. This colonial-era property has been meticulously restored with modern amenities while preserving its historical charm. Set on 2 acres with mature gardens.",
      yearBuilt: 1935,
      amenities: ["Historical Property", "Mature Gardens", "Restored Features", "Outdoor Pool", "Staff Quarters"]
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
      image: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      propertyType: "Residential" as const,
      description: "Elegant family home in a secure gated community featuring tropical gardens, a swimming pool, and spacious entertainment areas. The property includes staff quarters and a home office/study.",
      yearBuilt: 2016,
      amenities: ["Gated Community", "Tropical Gardens", "Swimming Pool", "Entertainment Areas", "Home Office"]
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
      image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      propertyType: "Residential" as const,
      description: "Luxury townhouse with serene views of Kileleshwa's green spaces. Features include a rooftop terrace, vertical garden, and intelligent home systems. Located in a secure compound with shared amenities.",
      yearBuilt: 2020,
      amenities: ["Rooftop Terrace", "Vertical Garden", "Smart Home", "Secure Compound", "Shared Amenities"]
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
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      propertyType: "Commercial" as const,
      description: "Prime commercial property in Westlands' business district. Modern office building with multiple floors, underground parking, high-speed elevators, and energy-efficient systems. Excellent investment opportunity.",
      yearBuilt: 2018,
      amenities: ["Underground Parking", "High-Speed Elevators", "Energy Efficient", "Conference Center", "Security Systems"]
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
      image: "https://images.unsplash.com/photo-1558605144-abf8066794b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      propertyType: "Residential" as const,
      description: "Investment opportunity: residential apartment building with 6 two-bedroom units. Fully occupied with consistent rental income. Includes secure parking, backup power, and water storage systems.",
      yearBuilt: 2015,
      amenities: ["Rental Income", "Secure Parking", "Backup Power", "Water Storage", "Full Occupancy"]
    }
  ],
  // Add new locations with detailed properties
  gigiri: [
    {
      id: "prop16",
      title: "Diplomatic Residence",
      price: "KES 160,000,000",
      location: "Gigiri, Nairobi",
      bedrooms: 5,
      bathrooms: 5.5,
      area: 600,
      image: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      propertyType: "Residential" as const,
      description: "Exclusive property in Nairobi's diplomatic district, featuring enhanced security, expansive garden, and luxurious finishes. Perfect for diplomats or executives seeking privacy and prestige.",
      yearBuilt: 2012,
      amenities: ["Diplomatic Area", "Enhanced Security", "Expansive Garden", "Guest House", "Staff Quarters"]
    }
  ],
  nyali: [
    {
      id: "prop17",
      title: "Ocean View Penthouse",
      price: "KES 48,000,000",
      location: "Nyali, Mombasa",
      bedrooms: 3,
      bathrooms: 3,
      area: 280,
      image: "https://images.unsplash.com/photo-1581974206967-93856b25aa13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2536&q=80",
      propertyType: "Residential" as const,
      description: "Stunning penthouse with panoramic Indian Ocean views, located in an exclusive beachfront development. Features include a private terrace, designer kitchen, and access to resort-style amenities.",
      yearBuilt: 2020,
      amenities: ["Ocean Views", "Private Terrace", "Resort Amenities", "Designer Kitchen", "Beach Access"]
    }
  ],
  diani: [
    {
      id: "prop18",
      title: "Beach Villa Retreat",
      price: "KES 95,000,000",
      location: "Diani Beach, Mombasa",
      bedrooms: 5,
      bathrooms: 5,
      area: 420,
      image: "https://images.unsplash.com/photo-1499916078039-922301b0eb9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2580&q=80",
      propertyType: "Residential" as const,
      description: "Luxurious beachfront villa on Diani's famous white sand beach. Perfect as a vacation home or investment property with strong rental potential. Features include private pool, tropical garden, and direct beach access.",
      yearBuilt: 2017,
      amenities: ["Beachfront", "Private Pool", "Tropical Garden", "Beach Access", "Rental Potential"]
    }
  ],
  naivasha: [
    {
      id: "prop19",
      title: "Lakeside Country Home",
      price: "KES 55,000,000",
      location: "Naivasha",
      bedrooms: 4,
      bathrooms: 3.5,
      area: 350,
      image: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      propertyType: "Residential" as const,
      description: "Charming country home with stunning views of Lake Naivasha. The property features a boat dock, spacious outdoor living areas, and guest cottages. Perfect for weekend getaways or permanent living.",
      yearBuilt: 2015,
      amenities: ["Lake Views", "Boat Dock", "Guest Cottages", "Outdoor Living", "Wildlife Viewing"]
    }
  ],
  nanyuki: [
    {
      id: "prop20",
      title: "Mt. Kenya View Estate",
      price: "KES 70,000,000",
      location: "Nanyuki",
      bedrooms: 4,
      bathrooms: 4,
      area: 380,
      image: "https://images.unsplash.com/photo-1630519407760-f6525c819240?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
      propertyType: "Residential" as const,
      description: "Spectacular property with unobstructed views of Mt. Kenya. Features include a fireplace, wraparound veranda, landscaped garden, and solar power system. Located close to premium golf courses and conservancies.",
      yearBuilt: 2018,
      amenities: ["Mountain Views", "Fireplace", "Wraparound Veranda", "Solar Power", "Golf Proximity"]
    }
  ],
  kilifi: [
    {
      id: "prop21",
      title: "Clifftop Beach House",
      price: "KES 78,000,000",
      location: "Kilifi",
      bedrooms: 4,
      bathrooms: 4,
      area: 320,
      image: "https://images.unsplash.com/photo-1602075432748-82d264e2b463?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
      propertyType: "Residential" as const,
      description: "Modern beach house perched on a cliff with panoramic views of Kilifi Creek. Open-plan design with infinity pool that blends with the horizon. Features private steps down to a secluded beach.",
      yearBuilt: 2019,
      amenities: ["Clifftop Location", "Infinity Pool", "Creek Views", "Private Beach Access", "Open Plan Design"]
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
