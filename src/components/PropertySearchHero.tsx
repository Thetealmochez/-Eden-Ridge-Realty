
import React from 'react';
import { Search, MapPin, Home, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const PropertySearchHero = () => {
  return (
    <div className="relative bg-gradient-to-br from-luxury-navy via-luxury-navy to-luxury-slate text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Find Your Perfect
            <span className="block text-luxury-gold">Dream Home</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Discover premium properties across Kenya's most desirable locations
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-luxury-gold mb-1">500+</div>
              <div className="text-sm text-white/80">Properties Listed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-luxury-gold mb-1">50+</div>
              <div className="text-sm text-white/80">Locations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-luxury-gold mb-1">1000+</div>
              <div className="text-sm text-white/80">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-luxury-gold mb-1">24/7</div>
              <div className="text-sm text-white/80">Support</div>
            </div>
          </div>

          {/* Quick Search */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
            <h2 className="text-xl font-semibold mb-6">Quick Property Search</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Enter location or keyword..."
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30"
                />
              </div>
              
              <select className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-luxury-gold">
                <option value="" className="text-gray-900">Property Type</option>
                <option value="residential" className="text-gray-900">Residential</option>
                <option value="commercial" className="text-gray-900">Commercial</option>
              </select>
              
              <select className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-luxury-gold">
                <option value="" className="text-gray-900">Price Range</option>
                <option value="0-10000000" className="text-gray-900">Under KSh 10M</option>
                <option value="10000000-50000000" className="text-gray-900">KSh 10M - 50M</option>
                <option value="50000000-100000000" className="text-gray-900">KSh 50M - 100M</option>
                <option value="100000000-999999999" className="text-gray-900">Above KSh 100M</option>
              </select>
            </div>
            
            <Button 
              className="w-full md:w-auto bg-luxury-gold text-luxury-navy hover:bg-luxury-gold/90 font-semibold px-8 py-3 text-lg"
            >
              <Search className="h-5 w-5 mr-2" />
              Search Properties
            </Button>
          </div>

          {/* Featured Locations */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-6">Popular Locations</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Nairobi', 'Karen', 'Runda', 'Westlands', 'Kilimani', 'Mombasa'].map((location) => (
                <Button
                  key={location}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/20 hover:border-white/50"
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  {location}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySearchHero;
