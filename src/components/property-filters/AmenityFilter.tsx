
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X } from 'lucide-react';

interface AmenityFilterProps {
  amenities: string[];
  setAmenities: React.Dispatch<React.SetStateAction<string[]>>;
  availableAmenities: string[];
}

export const AmenityFilter: React.FC<AmenityFilterProps> = ({
  amenities,
  setAmenities,
  availableAmenities
}) => {
  const handleAmenityToggle = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
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
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setAmenities(prev => [...prev, amenity]);
                } else {
                  setAmenities(prev => prev.filter(a => a !== amenity));
                }
              }}
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
  );
};
