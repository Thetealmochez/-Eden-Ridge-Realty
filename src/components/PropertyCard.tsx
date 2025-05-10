
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Bed, Bath, Home, MapPin, ArrowRight, Info, Heart, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ScheduleViewing from './ScheduleViewing';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export interface PropertyCardProps {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  featured?: boolean;
  propertyType: string;
  description?: string;
  yearBuilt?: number;
  amenities?: string[];
  numericPrice?: number;
  images?: string[];
}

const PropertyCard = ({
  id,
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  area,
  image,
  featured = false,
  propertyType,
  description,
  yearBuilt,
  amenities = [],
  images = []
}: PropertyCardProps) => {
  const [showDescription, setShowDescription] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  
  // Use the images array if it exists and has items, otherwise use the single image
  const imageArray = images && images.length > 0 ? images : [image];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
  };
  
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on buttons or description
    if (
      (e.target as HTMLElement).closest('button') ||
      showDescription
    ) {
      return;
    }
    
    navigate(`/property/${id}`);
  };

  return (
    <Card className="overflow-hidden border-0 shadow-lg hover-lift group">
      <div className="relative">
        <div 
          className="h-64 overflow-hidden cursor-pointer"
          onClick={handleCardClick}
        >
          <img
            src={imageArray[currentImageIndex]}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              (e.target as HTMLImageElement).src = '/images/placeholder.svg';
            }}
          />
          
          {/* Image navigation controls */}
          {imageArray.length > 1 && (
            <>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }} 
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-1.5 transition-all opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ArrowRight className="h-4 w-4 transform rotate-180" />
              </button>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }} 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-1.5 transition-all opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                {imageArray.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all",
                      index === currentImageIndex ? "bg-luxury-gold w-3" : "bg-white/70"
                    )}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        {featured && (
          <Badge className="absolute top-4 left-4 bg-luxury-gold text-luxury-navy border-0">
            Featured
          </Badge>
        )}
        
        <Badge className={`absolute top-4 right-4 ${propertyType === 'Residential' ? 'bg-luxury-navy' : 'bg-luxury-slate'} border-0`}>
          {propertyType}
        </Badge>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }} 
          className="absolute bottom-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-luxury-slate'}`} />
        </button>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-2 flex items-center text-luxury-slate">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        
        <h3 
          className="text-xl font-serif font-semibold mb-2 transition-colors group-hover:text-luxury-gold cursor-pointer"
          onClick={handleCardClick}
        >
          {title}
        </h3>
        
        <p className="text-luxury-navy font-semibold text-xl mb-4">
          {price}
        </p>
        
        {description && showDescription && (
          <div className="mb-4 p-4 bg-luxury-cream/30 rounded-md text-sm text-luxury-slate animate-fade-in">
            <p>{description}</p>
            
            {yearBuilt && (
              <p className="mt-2"><span className="font-medium">Year Built:</span> {yearBuilt}</p>
            )}
            
            {amenities && amenities.length > 0 && (
              <div className="mt-2">
                <span className="font-medium">Amenities:</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="bg-luxury-cream/50 text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="border-t border-gray-100 pt-4 flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap gap-4">
            {bedrooms > 0 && (
              <div className="flex items-center text-sm text-luxury-slate">
                <Bed className="h-4 w-4 mr-1" />
                <span>{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
              </div>
            )}
            
            {bathrooms > 0 && (
              <div className="flex items-center text-sm text-luxury-slate">
                <Bath className="h-4 w-4 mr-1" />
                <span>{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
              </div>
            )}
            
            <div className="flex items-center text-sm text-luxury-slate">
              <Home className="h-4 w-4 mr-1" />
              <span>{area} m²</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-auto">
            {description && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDescription(prev => !prev);
                }}
                className="p-1.5 rounded-full bg-luxury-navy/10 text-luxury-navy hover:bg-luxury-navy/20 transition-colors"
                title={showDescription ? "Hide details" : "Show details"}
                aria-label={showDescription ? "Hide property details" : "Show property details"}
              >
                <Info className="h-4 w-4" />
              </button>
            )}
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-luxury-navy border-luxury-navy hover:bg-luxury-navy/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  View
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Schedule a Viewing</DialogTitle>
                  <DialogDescription>
                    Complete the form below to schedule a viewing for {title}
                  </DialogDescription>
                </DialogHeader>
                <ScheduleViewing propertyId={id} propertyTitle={title} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
