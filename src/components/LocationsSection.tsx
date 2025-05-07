
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    id: "karen",
    name: "Karen",
    properties: 36,
    image: "/images/karen.jpg"
  },
  {
    id: "runda",
    name: "Runda",
    properties: 31,
    image: "/images/runda.jpg"
  },
  {
    id: "muthaiga",
    name: "Muthaiga",
    properties: 28,
    image: "/images/muthaiga.jpg"
  },
  {
    id: "lavington",
    name: "Lavington",
    properties: 34,
    image: "/images/lavington.jpg"
  },
  {
    id: "kileleshwa",
    name: "Kileleshwa",
    properties: 29,
    image: "/images/kileleshwa.jpg"
  },
  {
    id: "westlands",
    name: "Westlands",
    properties: 40,
    image: "/images/westlands.jpg"
  },
  {
    id: "kilimani",
    name: "Kilimani",
    properties: 38,
    image: "/images/kilimani.jpg"
  },
  {
    id: "gigiri",
    name: "Gigiri",
    properties: 22,
    image: "/images/gigiri.jpg"
  },
  {
    id: "rosslyn",
    name: "Rosslyn",
    properties: 18,
    image: "/images/rosslyn.jpg"
  },
  {
    id: "kitisuru",
    name: "Kitisuru",
    properties: 25,
    image: "/images/kitisuru.jpg"
  },
  {
    id: "nyari",
    name: "Nyari Estate",
    properties: 16,
    image: "/images/nyari.jpg"
  },
  {
    id: "thigiri",
    name: "Thigiri",
    properties: 14,
    image: "/images/thigiri.jpg"
  },
  {
    id: "upperhill",
    name: "Upper Hill",
    properties: 30,
    image: "/images/upperhill.jpg"
  },
  {
    id: "riverside",
    name: "Riverside Drive",
    properties: 26,
    image: "/images/riverside.jpg"
  },
  {
    id: "nyali",
    name: "Nyali",
    properties: 32,
    image: "/images/nyali.jpg"
  },
  {
    id: "vipingo",
    name: "Vipingo Ridge",
    properties: 20,
    image: "/images/vipingo.jpg"
  },
  {
    id: "diani",
    name: "Diani Beach",
    properties: 24,
    image: "/images/diani.jpg"
  },
  {
    id: "kilifi",
    name: "Kilifi",
    properties: 18,
    image: "/images/kilifi.jpg"
  },
  {
    id: "malindi",
    name: "Malindi",
    properties: 22,
    image: "/images/malindi.jpg"
  },
  {
    id: "naivasha",
    name: "Naivasha",
    properties: 28,
    image: "/images/naivasha.jpg"
  },
  {
    id: "nanyuki",
    name: "Nanyuki",
    properties: 17,
    image: "/images/nanyuki.jpg"
  },
  {
    id: "elementaita",
    name: "Elementaita",
    properties: 12,
    image: "/images/elementaita.jpg"
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
                
                <Link 
                  to={`/locations/${location.id}`}
                  className="inline-flex items-center text-white text-sm luxury-transition hover:text-luxury-gold"
                >
                  View Properties
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
