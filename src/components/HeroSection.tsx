import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [propertyType, setPropertyType] = useState('residential');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('any');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Build query parameters
    const params = new URLSearchParams();
    if (propertyType !== 'any') params.append('type', propertyType);
    
    // If a specific location is selected, navigate to that location page
    if (location && location !== 'any') {
      // If it's one of our specific location pages, go to that page
      if (['nairobi', 'karen', 'westlands', 'kileleshwa', 'runda', 'mombasa', 'kisumu', 'naivasha', 'nanyuki'].includes(location.toLowerCase())) {
        navigate(`/locations/${location.toLowerCase()}`);
        return;
      } else {
        // Otherwise use it as a filter on the properties page
        params.append('location', location);
      }
    }
    
    if (priceRange !== 'any') params.append('price', priceRange);
    
    // Navigate to properties page with filters
    navigate(`/properties?${params.toString()}`);
  };

  const scrollToProperties = () => {
    document.getElementById('properties')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="relative h-screen w-full bg-[url('/images/hero-bg.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-navy/70 to-luxury-navy/50 flex flex-col justify-center items-center px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            Find Your Dream <span className="text-luxury-gold">Kenyan</span> Home
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto animate-fade-in delay-150">
            Exclusive properties in Nairobi, Mombasa, and Kenya's most prestigious locations
          </p>
          
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 md:p-6 max-w-4xl mx-auto shadow-xl animate-fade-in delay-300">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="mb-2 text-sm font-medium text-left text-luxury-slate">Property Type</div>
                <div className="flex rounded-md overflow-hidden border border-gray-200">
                  <button
                    onClick={() => setPropertyType('residential')}
                    className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${propertyType === 'residential' ? 'bg-luxury-navy text-white' : 'bg-white text-luxury-navy hover:bg-gray-50'}`}
                    aria-label="Search for residential properties"
                  >
                    Residential
                  </button>
                  <button
                    onClick={() => setPropertyType('commercial')}
                    className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${propertyType === 'commercial' ? 'bg-luxury-navy text-white' : 'bg-white text-luxury-navy hover:bg-gray-50'}`}
                    aria-label="Search for commercial properties"
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
                  aria-label="Select location"
                >
                  <option value="">Any location</option>
                  <option value="nairobi">Nairobi</option>
                  <option value="karen">Karen</option>
                  <option value="westlands">Westlands</option>
                  <option value="kileleshwa">Kileleshwa</option>
                  <option value="runda">Runda</option>
                  <option value="mombasa">Mombasa</option>
                  <option value="kisumu">Kisumu</option>
                  <option value="naivasha">Naivasha</option>
                  <option value="nanyuki">Nanyuki</option>
                </select>
              </div>
              
              <div className="flex-1">
                <div className="mb-2 text-sm font-medium text-left text-luxury-slate">Price Range</div>
                <select 
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
                  aria-label="Select price range"
                >
                  <option value="any">Any price</option>
                  <option value="0-5000000">Up to KSh 5M</option>
                  <option value="5000000-10000000">KSh 5M - KSh 10M</option>
                  <option value="10000000-25000000">KSh 10M - KSh 25M</option>
                  <option value="25000000-50000000">KSh 25M - KSh 50M</option>
                  <option value="50000000-100000000">KSh 50M - KSh 100M</option>
                  <option value="100000000-999999999">KSh 100M+</option>
                </select>
              </div>
              
              <Button 
                className="bg-luxury-gold text-luxury-navy hover:bg-luxury-gold/90 h-auto py-3"
                onClick={handleSearch}
              >
                <Search className="mr-2 h-4 w-4" />
                Find Properties
              </Button>
            </div>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6 animate-fade-in delay-500">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/20 transition-colors">
              <p className="text-white text-sm"><span className="font-bold">500+</span> Premium Listings</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/20 transition-colors">
              <p className="text-white text-sm"><span className="font-bold">200+</span> Happy Clients</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/20 transition-colors">
              <p className="text-white text-sm"><span className="font-bold">10+</span> Years Experience</p>
            </div>
          </div>
          
          <button 
            onClick={scrollToProperties}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center animate-pulse hover:animate-none"
            aria-label="Scroll to featured properties"
          >
            <span className="mb-2 text-sm">Explore Featured Properties</span>
            <ChevronDown className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
