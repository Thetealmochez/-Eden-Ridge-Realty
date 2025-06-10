
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PropertyImageGalleryProps {
  images: string[];
  title: string;
  className?: string;
}

const PropertyImageGallery: React.FC<PropertyImageGalleryProps> = ({
  images,
  title,
  className = ""
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };
  
  if (!images || images.length === 0) {
    return (
      <div className={cn("relative rounded-lg overflow-hidden bg-gray-100 h-[400px] md:h-[500px] flex items-center justify-center", className)}>
        <div className="text-center">
          <div className="text-luxury-slate">No images available</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={cn("relative", className)}>
      {/* Main Image Display */}
      <div className="relative rounded-lg overflow-hidden bg-gray-100 h-[400px] md:h-[500px]">
        <img
          src={images[currentImageIndex]}
          alt={`${title} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder.svg';
          }}
        />
        
        {/* Navigation Controls */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage} 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-luxury-navy rounded-full p-3 shadow-lg transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button 
              onClick={nextImage} 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-luxury-navy rounded-full p-3 shadow-lg transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}
        
        {/* Fullscreen Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-luxury-navy"
            >
              <Maximize2 className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] max-h-[95vh] p-0">
            <div className="relative">
              <img
                src={images[currentImageIndex]}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full max-h-[90vh] object-contain"
              />
              
              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage} 
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  
                  <button 
                    onClick={nextImage} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2 mt-4">
          {images.slice(0, 5).map((img, index) => (
            <div 
              key={index}
              className={cn(
                "h-20 rounded-md overflow-hidden cursor-pointer transition-all",
                currentImageIndex === index 
                  ? "ring-2 ring-luxury-gold" 
                  : "hover:opacity-80 ring-1 ring-gray-200"
              )}
              onClick={() => goToImage(index)}
            >
              <img
                src={img}
                alt={`${title} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/placeholder.svg';
                }}
              />
            </div>
          ))}
          
          {/* Show remaining count if more than 5 images */}
          {images.length > 5 && (
            <div className="h-20 rounded-md bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
              <span className="text-luxury-navy font-medium text-sm">
                +{images.length - 5}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyImageGallery;
