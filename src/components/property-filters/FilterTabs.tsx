
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicFilters } from './BasicFilters';
import { PropertyDetailsFilters } from './PropertyDetailsFilters';
import { AmenityFilter } from './AmenityFilter';

interface FilterTabsProps {
  propertyType: string;
  setPropertyType: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  locations: string[];
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  bedrooms: string;
  setBedrooms: (value: string) => void;
  bathrooms: string;
  setBathrooms: (value: string) => void;
  minArea: number;
  setMinArea: (value: number) => void;
  maxArea: number;
  setMaxArea: (value: number) => void;
  yearBuilt: string;
  setYearBuilt: (value: string) => void;
  amenities: string[];
  setAmenities: React.Dispatch<React.SetStateAction<string[]>>;
  availableAmenities: string[];
  featuredOnly: boolean;
  setFeaturedOnly: (value: boolean) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  propertyType,
  setPropertyType,
  location,
  setLocation,
  locations,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  bedrooms,
  setBedrooms,
  bathrooms,
  setBathrooms,
  minArea,
  setMinArea,
  maxArea,
  setMaxArea,
  yearBuilt,
  setYearBuilt,
  amenities,
  setAmenities,
  availableAmenities,
  featuredOnly,
  setFeaturedOnly,
  sortBy,
  setSortBy
}) => {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="basic">Basic Filters</TabsTrigger>
        <TabsTrigger value="details">Property Details</TabsTrigger>
        <TabsTrigger value="amenities">Amenities & Features</TabsTrigger>
      </TabsList>
      
      <TabsContent value="basic" className="space-y-4 mt-4">
        <BasicFilters
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          location={location}
          setLocation={setLocation}
          locations={locations}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          featuredOnly={featuredOnly}
          setFeaturedOnly={setFeaturedOnly}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </TabsContent>
      
      <TabsContent value="details" className="space-y-4 mt-4">
        <PropertyDetailsFilters
          bedrooms={bedrooms}
          setBedrooms={setBedrooms}
          bathrooms={bathrooms}
          setBathrooms={setBathrooms}
          yearBuilt={yearBuilt}
          setYearBuilt={setYearBuilt}
          minArea={minArea}
          setMinArea={setMinArea}
          maxArea={maxArea}
          setMaxArea={setMaxArea}
        />
      </TabsContent>
      
      <TabsContent value="amenities" className="space-y-4 mt-4">
        <AmenityFilter
          amenities={amenities}
          setAmenities={setAmenities}
          availableAmenities={availableAmenities}
        />
      </TabsContent>
    </Tabs>
  );
};
