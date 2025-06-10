
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Filter, X } from 'lucide-react';

interface FiltersHeaderProps {
  activeFiltersCount: number;
  viewType: string;
  setViewType: (value: string) => void;
  onClearFilters: () => void;
}

export const FiltersHeader: React.FC<FiltersHeaderProps> = ({
  activeFiltersCount,
  viewType,
  setViewType,
  onClearFilters
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <Filter className="h-5 w-5 text-luxury-navy" />
        <h2 className="text-lg font-semibold text-luxury-navy">Advanced Search</h2>
        {activeFiltersCount > 0 && (
          <Badge variant="secondary" className="bg-luxury-navy/10 text-luxury-navy">
            {activeFiltersCount} active
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
        
        {activeFiltersCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClearFilters}
            className="text-luxury-slate hover:text-luxury-navy"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
};
