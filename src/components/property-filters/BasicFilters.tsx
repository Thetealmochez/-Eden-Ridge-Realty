
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, Home, MapPin } from 'lucide-react';
import { PriceRangeFilter } from './PriceRangeFilter';

interface BasicFiltersProps {
  propertyType: string;
  setPropertyType: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  locations: string[];
  sortBy: string;
  setSortBy: (value: string) => void;
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  featuredOnly: boolean;
  setFeaturedOnly: (value: boolean) => void;
}

export const BasicFilters: React.FC<BasicFiltersProps> = ({
  propertyType,
  setPropertyType,
  location,
  setLocation,
  locations,
  sortBy,
  setSortBy,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  featuredOnly,
  setFeaturedOnly
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Home className="inline h-4 w-4 mr-1" />
            Property Type
          </label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Residential">Residential</SelectItem>
              <SelectItem value="Commercial">Commercial</SelectItem>
              <SelectItem value="Land">Land</SelectItem>
              <SelectItem value="Industrial">Industrial</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline h-4 w-4 mr-1" />
            Location
          </label>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="size-large">Size: Largest First</SelectItem>
              <SelectItem value="size-small">Size: Smallest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <PriceRangeFilter 
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="featured"
            checked={featuredOnly}
            onCheckedChange={(checked) => setFeaturedOnly(checked === true)}
          />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700 flex items-center">
            <Star className="h-4 w-4 mr-1 text-luxury-gold" />
            Featured Properties Only
          </label>
        </div>
      </div>
    </div>
  );
};
