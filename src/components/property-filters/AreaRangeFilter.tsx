
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Square } from 'lucide-react';

interface AreaRangeFilterProps {
  minArea: number;
  setMinArea: (value: number) => void;
  maxArea: number;
  setMaxArea: (value: number) => void;
}

export const AreaRangeFilter: React.FC<AreaRangeFilterProps> = ({
  minArea,
  setMinArea,
  maxArea,
  setMaxArea
}) => {
  return (
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
  );
};
