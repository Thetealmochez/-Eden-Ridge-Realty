
import React from 'react';
import { Slider } from "@/components/ui/slider";

interface PriceRangeFilterProps {
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
}

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice
}) => {
  return (
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
  );
};
