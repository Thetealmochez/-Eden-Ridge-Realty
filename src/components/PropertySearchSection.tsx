import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Filter } from 'lucide-react';

const PropertySearchSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSearch = () => {
    // Navigate to properties page with filters
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (propertyType) params.set('type', propertyType);
    if (location) params.set('location', location);
    if (priceRange) params.set('price', priceRange);
    
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-luxury-cream to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-luxury-navy mb-4">
            Find Your Perfect Property
          </h2>
          <p className="text-luxury-slate max-w-2xl mx-auto">
            Search through our exclusive collection of luxury properties across Kenya's most prestigious locations.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-luxury-slate" />
              <Input
                placeholder="Search properties..."
                className="pl-10 h-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
              </SelectContent>
            </Select>

            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="karen">Karen</SelectItem>
                <SelectItem value="runda">Runda</SelectItem>
                <SelectItem value="westlands">Westlands</SelectItem>
                <SelectItem value="kilimani">Kilimani</SelectItem>
                <SelectItem value="lavington">Lavington</SelectItem>
                <SelectItem value="muthaiga">Muthaiga</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-10m">Up to 10M</SelectItem>
                <SelectItem value="10m-25m">10M - 25M</SelectItem>
                <SelectItem value="25m-50m">25M - 50M</SelectItem>
                <SelectItem value="50m-100m">50M - 100M</SelectItem>
                <SelectItem value="100m+">100M+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button 
              onClick={handleSearch}
              className="bg-luxury-navy hover:bg-luxury-navy/90 text-white flex-1 h-12"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Properties
            </Button>
            <Button 
              variant="outline"
              className="border-luxury-navy text-luxury-navy hover:bg-luxury-navy/10 h-12"
            >
              <Filter className="w-5 h-5 mr-2" />
              Advanced Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertySearchSection;