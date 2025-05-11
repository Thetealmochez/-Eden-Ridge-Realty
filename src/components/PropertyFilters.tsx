
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { SearchIcon } from 'lucide-react';

interface PropertyFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  propertyType: string;
  setPropertyType: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  bedrooms: string;
  setBedrooms: (value: string) => void;
  locations: string[];
  handleSearch: (e: React.FormEvent) => void;
  resetFilters: () => void;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  propertyType,
  setPropertyType,
  location,
  setLocation,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  bedrooms,
  setBedrooms,
  locations,
  handleSearch,
  resetFilters
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="space-y-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search by location, property type or keyword"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Residential">Residential</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5+">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-700">Price Range</span>
            <span className="text-sm text-luxury-navy">
              KSh {minPrice.toLocaleString()} - KSh {maxPrice.toLocaleString()}
            </span>
          </div>
          <Slider
            defaultValue={[minPrice, maxPrice]}
            min={0}
            max={200000000}
            step={1000000}
            value={[minPrice, maxPrice]}
            onValueChange={(values) => {
              setMinPrice(values[0]);
              setMaxPrice(values[1]);
            }}
            className="my-4"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button type="submit" className="bg-luxury-navy hover:bg-luxury-navy/90 flex-1">
            Search Properties
          </Button>
          <Button 
            type="button"
            variant="outline" 
            onClick={resetFilters}
            className="border-luxury-navy text-luxury-navy hover:bg-luxury-navy/10"
          >
            Reset Filters
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertyFilters;
