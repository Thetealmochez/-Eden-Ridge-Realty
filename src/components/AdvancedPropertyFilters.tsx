
import React, { useState } from 'react';
import { SearchBar } from './property-filters/SearchBar';
import { FiltersHeader } from './property-filters/FiltersHeader';
import { FilterTabs } from './property-filters/FilterTabs';
import { FilterButtons } from './property-filters/FilterButtons';

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
        <FiltersHeader 
          activeFiltersCount={getActiveFiltersCount()}
          viewType={viewType}
          setViewType={setViewType}
          onClearFilters={clearAllFilters}
        />

        <form onSubmit={handleSearch} className="space-y-6">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          <FilterTabs
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            location={location}
            setLocation={setLocation}
            locations={locations}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            bedrooms={bedrooms}
            setBedrooms={setBedrooms}
            bathrooms={bathrooms}
            setBathrooms={setBathrooms}
            minArea={minArea}
            setMinArea={setMinArea}
            maxArea={maxArea}
            setMaxArea={setMaxArea}
            yearBuilt={yearBuilt}
            setYearBuilt={setYearBuilt}
            amenities={amenities}
            setAmenities={setAmenities}
            availableAmenities={availableAmenities}
            featuredOnly={featuredOnly}
            setFeaturedOnly={setFeaturedOnly}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          
          <FilterButtons onSearch={handleSearch} onReset={clearAllFilters} />
        </form>
      </div>
    </div>
  );
};

export default AdvancedPropertyFilters;
