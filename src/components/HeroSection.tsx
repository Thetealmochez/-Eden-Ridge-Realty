
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const HeroSection = () => {
  const [propertyType, setPropertyType] = useState('residential');
  const [location, setLocation] = useState('');

  return (
    <div className="relative h-screen w-full bg-[url('/images/hero-bg.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-navy/70 to-luxury-navy/50 flex flex-col justify-center items-center px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6">
            Discover Luxury Living in Kenya
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
            Premium properties in Nairobi, Mombasa, Kisumu and beyond
          </p>
          
          <div className="bg-white rounded-lg p-4 md:p-6 max-w-4xl mx-auto shadow-xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="mb-2 text-sm font-medium text-left text-luxury-slate">Property Type</div>
                <div className="flex rounded-md overflow-hidden border border-gray-200">
                  <button
                    onClick={() => setPropertyType('residential')}
                    className={`flex-1 py-2 px-4 text-sm font-medium ${propertyType === 'residential' ? 'bg-luxury-navy text-white' : 'bg-white text-luxury-navy'}`}
                  >
                    Residential
                  </button>
                  <button
                    onClick={() => setPropertyType('commercial')}
                    className={`flex-1 py-2 px-4 text-sm font-medium ${propertyType === 'commercial' ? 'bg-luxury-navy text-white' : 'bg-white text-luxury-navy'}`}
                  >
                    Commercial
                  </button>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="mb-2 text-sm font-medium text-left text-luxury-slate">Location</div>
                <select 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
                >
                  <option value="">Any location</option>
                  <option value="nairobi">Nairobi</option>
                  <option value="mombasa">Mombasa</option>
                  <option value="kisumu">Kisumu</option>
                  <option value="naivasha">Naivasha</option>
                  <option value="nanyuki">Nanyuki</option>
                </select>
              </div>
              
              <Button className="bg-luxury-gold text-luxury-navy hover:bg-luxury-gold/80 h-auto py-3">
                <Search className="mr-2 h-4 w-4" />
                Find Properties
              </Button>
            </div>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <p className="text-white text-sm"><span className="font-bold">500+</span> Premium Listings</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <p className="text-white text-sm"><span className="font-bold">200+</span> Happy Clients</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <p className="text-white text-sm"><span className="font-bold">10+</span> Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
