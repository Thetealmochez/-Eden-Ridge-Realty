
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bed, Bath, Calendar } from 'lucide-react';
import { AreaRangeFilter } from './AreaRangeFilter';

interface PropertyDetailsFiltersProps {
  bedrooms: string;
  setBedrooms: (value: string) => void;
  bathrooms: string;
  setBathrooms: (value: string) => void;
  yearBuilt: string;
  setYearBuilt: (value: string) => void;
  minArea: number;
  setMinArea: (value: number) => void;
  maxArea: number;
  setMaxArea: (value: number) => void;
}

export const PropertyDetailsFilters: React.FC<PropertyDetailsFiltersProps> = ({
  bedrooms,
  setBedrooms,
  bathrooms,
  setBathrooms,
  yearBuilt,
  setYearBuilt,
  minArea,
  setMinArea,
  maxArea,
  setMaxArea
}) => {
  return (
    <div className="space-y-4">
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

      <AreaRangeFilter
        minArea={minArea}
        setMinArea={setMinArea}
        maxArea={maxArea}
        setMaxArea={setMaxArea}
      />
    </div>
  );
};
