
import React from 'react';
import PropertyCard, { PropertyCardProps } from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface PropertyResultsProps {
  loading: boolean;
  filteredProperties: PropertyCardProps[];
  resetFilters: () => void;
}

const PropertyResults: React.FC<PropertyResultsProps> = ({
  loading,
  filteredProperties,
  resetFilters
}) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-semibold text-luxury-navy mb-2">
        {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
      </h2>
      <div className="w-20 h-1 bg-luxury-gold mb-10"></div>
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-luxury-navy" />
        </div>
      ) : filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-luxury-navy mb-2">No properties match your criteria</h3>
          <p className="text-luxury-slate mb-6">Try adjusting your filters to see more results.</p>
          <Button onClick={resetFilters} className="bg-luxury-navy hover:bg-luxury-navy/90">
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default PropertyResults;
