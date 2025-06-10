
import React from 'react';
import { Input } from "@/components/ui/input";
import { SearchIcon } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <Input
        placeholder="Search by location, property type, or keyword..."
        className="pl-10 h-12 text-base"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};
