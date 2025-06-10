
import React from 'react';
import { Button } from "@/components/ui/button";
import { SearchIcon } from 'lucide-react';

interface FilterButtonsProps {
  onSearch: (e: React.FormEvent) => void;
  onReset: () => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({ onSearch, onReset }) => {
  return (
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
        onClick={onReset}
        className="border-luxury-navy text-luxury-navy hover:bg-luxury-navy/10 h-12"
      >
        Reset All Filters
      </Button>
    </div>
  );
};
