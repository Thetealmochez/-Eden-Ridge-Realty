
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  SearchIcon, 
  Filter, 
  X, 
  MapPin, 
  Home, 
  Bed, 
  Bath, 
  Square,
  Calendar,
  Star
} from 'lucide-react';

interface AdvancedPropertyFiltersProps {
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

const AdvancedPropertyFilters: React.FC<AdvancedPropertyFiltersProps> = ({
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
  const [bathrooms, setBathrooms] = useState('any');
  const [minArea, setMinArea] = useState(0);
  const [maxArea, setMaxArea] = useState(10000);
  const [yearBuilt, setYearBuilt] = useState('any');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [viewType, setViewType] = useState('list');

  const availableAmenities = [
    'Swimming Pool', 'Garden', 'Security', 'Parking', 'Gym', 
    'Balcony', 'Terrace', 'Fireplace', 'Air Conditioning', 
    'Generator', 'Borehole', 'CCTV', 'Elevator', 'Backup Power'
  ];

  const handleAmenityToggle = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (propertyType !== 'all') count++;
    if (location !== 'all') count++;
    if (minPrice > 0 || maxPrice < 200000000) count++;
    if (bedrooms !== 'any') count++;
    if (bathrooms !== 'any') count++;
    if (minArea > 0 || maxArea < 10000) count++;
    if (yearBuilt !== 'any') count++;
    if (amenities.length > 0) count++;
    if (featuredOnly) count++;
    return count;
  };

  const clearAllFilters = () => {
    resetFilters();
    setBathrooms('any');
    setMinArea(0);
    setMaxArea(10000);
    setYearBuilt('any');
    setAmenities([]);
    setFeaturedOnly(false);
    setSortBy('newest');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-luxury-navy" />
            <h2 className="text-lg font-semibold text-luxury-navy">Advanced Search</h2>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="bg-luxury-navy/10 text-luxury-navy">
                {getActiveFiltersCount()} active
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <ToggleGroup type="single" value={viewType} onValueChange={setViewType}>
              <ToggleGroupItem value="list" aria-label="List view">
                List
              </ToggleGroupItem>
              <ToggleGroupItem value="grid" aria-label="Grid view">
                Grid
              </ToggleGroupItem>
              <ToggleGroupItem value="map" aria-label="Map view">
                Map
              </ToggleGroupItem>
            </ToggleGroup>
            
            {getActiveFiltersCount() > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={clearAllFilters}
                className="text-luxury-slate hover:text-luxury-navy"
              >
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        <form onSubmit={handleSearch} className="space-y-6">
          {/* Main Search */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by location, property type, or keyword..."
              className="pl-10 h-12 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Filters</TabsTrigger>
              <TabsTrigger value="details">Property Details</TabsTrigger>
              <TabsTrigger value="amenities">Amenities & Features</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4 mt-4">
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
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Price Range</span>
                    <span className="text-sm text-luxury-navy font-medium">
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

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="featured"
                    checked={featuredOnly}
                    onCheckedChange={setFeaturedOnly}
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-gray-700 flex items-center">
                    <Star className="h-4 w-4 mr-1 text-luxury-gold" />
                    Featured Properties Only
                  </label>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Bed className="inline h-4 w-4 mr-1" />
                    Bedrooms
                  </label>
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
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Bath className="inline h-4 w-4 mr-1" />
                    Bathrooms
                  </label>
                  <Select value={bathrooms} onValueChange={setBathrooms}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Year Built
                  </label>
                  <Select value={yearBuilt} onValueChange={setYearBuilt}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Year</SelectItem>
                      <SelectItem value="2020+">2020 or Newer</SelectItem>
                      <SelectItem value="2015+">2015 or Newer</SelectItem>
                      <SelectItem value="2010+">2010 or Newer</SelectItem>
                      <SelectItem value="2000+">2000 or Newer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    <Square className="inline h-4 w-4 mr-1" />
                    Area (sq ft)
                  </span>
                  <span className="text-sm text-luxury-navy font-medium">
                    {minArea.toLocaleString()} - {maxArea.toLocaleString()} sq ft
                  </span>
                </div>
                <Slider
                  defaultValue={[minArea, maxArea]}
                  min={0}
                  max={10000}
                  step={100}
                  value={[minArea, maxArea]}
                  onValueChange={(values) => {
                    setMinArea(values[0]);
                    setMaxArea(values[1]);
                  }}
                  className="my-4"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="amenities" className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Amenities
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {availableAmenities.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox 
                        id={amenity}
                        checked={amenities.includes(amenity)}
                        onCheckedChange={() => handleAmenityToggle(amenity)}
                      />
                      <label 
                        htmlFor={amenity} 
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
                
                {amenities.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Selected amenities:</p>
                    <div className="flex flex-wrap gap-2">
                      {amenities.map((amenity) => (
                        <Badge 
                          key={amenity} 
                          variant="secondary"
                          className="bg-luxury-navy/10 text-luxury-navy hover:bg-luxury-navy/20 cursor-pointer"
                          onClick={() => handleAmenityToggle(amenity)}
                        >
                          {amenity}
                          <X className="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
            <Button 
              type="submit" 
              className="bg-luxury-navy hover:bg-luxury-navy/90 flex-1 h-12"
            >
              <SearchIcon className="h-5 w-5 mr-2" />
              Search Properties
            </Button>
            <Button 
              type="button"
              variant="outline" 
              onClick={clearAllFilters}
              className="border-luxury-navy text-luxury-navy hover:bg-luxury-navy/10 h-12"
            >
              Reset All Filters
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdvancedPropertyFilters;
