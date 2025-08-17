import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface SectionLoaderProps {
  height?: string;
  text?: string;
}

const SectionLoader: React.FC<SectionLoaderProps> = ({ 
  height = "h-64", 
  text = "Loading..." 
}) => {
  return (
    <div className={`${height} flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100`}>
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
};

export default SectionLoader;