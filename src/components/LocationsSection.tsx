
import { ArrowRight } from 'lucide-react';

const locations = [
  {
    id: "nairobi",
    name: "Nairobi",
    properties: 120,
    image: "/images/nairobi.jpg"
  },
  {
    id: "mombasa",
    name: "Mombasa",
    properties: 85,
    image: "/images/mombasa.jpg"
  },
  {
    id: "kisumu",
    name: "Kisumu",
    properties: 42,
    image: "/images/kisumu.jpg"
  },
  {
    id: "naivasha",
    name: "Naivasha",
    properties: 28,
    image: "/images/naivasha.jpg"
  }
];

const LocationsSection = () => {
  return (
    <section id="locations" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-luxury-navy mb-4">
            Premium Locations
          </h2>
          <div className="mx-auto w-20 h-1 bg-luxury-gold mb-6"></div>
          <p className="text-luxury-slate max-w-2xl mx-auto">
            Discover exceptional properties in Kenya's most prestigious locations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location) => (
            <div key={location.id} className="group relative overflow-hidden rounded-lg shadow-lg h-80">
              <div className="absolute inset-0">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover luxury-transition group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-luxury-navy/80"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-semibold text-white mb-1">{location.name}</h3>
                <p className="text-white/80 text-sm mb-4">{location.properties} Properties</p>
                
                <a 
                  href={`/locations/${location.id}`} 
                  className="inline-flex items-center text-white text-sm luxury-transition hover:text-luxury-gold"
                >
                  View Properties
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
