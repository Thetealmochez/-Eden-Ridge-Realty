
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Bed, Bath, Home, MapPin, ArrowRight, Info } from 'lucide-react';
import { useState } from 'react';

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
  propertyType: 'Residential' | 'Commercial';
  description?: string;
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
  description
}: PropertyCardProps) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <Card className="overflow-hidden border-0 shadow-lg luxury-transition hover:shadow-xl group">
      <div className="relative">
        <div className="h-64 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover luxury-transition group-hover:scale-105"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              (e.target as HTMLImageElement).src = '/images/placeholder.svg';
            }}
          />
        </div>
        
        {featured && (
          <Badge className="absolute top-4 left-4 bg-luxury-gold text-luxury-navy border-0">
            Featured
          </Badge>
        )}
        
        <Badge className={`absolute top-4 right-4 ${propertyType === 'Residential' ? 'bg-luxury-navy' : 'bg-luxury-slate'} border-0`}>
          {propertyType}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-2 flex items-center text-luxury-slate">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        
        <h3 className="text-xl font-serif font-semibold mb-2 luxury-transition group-hover:text-luxury-gold">
          {title}
        </h3>
        
        <p className="text-luxury-navy font-semibold text-xl mb-4">
          {price}
        </p>
        
        {description && showDescription && (
          <div className="mb-4 p-3 bg-luxury-cream/30 rounded-md text-sm text-luxury-slate">
            <p>{description}</p>
          </div>
        )}
        
        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
          <div className="flex space-x-4">
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
          
          <div className="flex items-center space-x-2">
            {description && (
              <button
                onClick={() => setShowDescription(prev => !prev)}
                className="p-1 rounded-full bg-luxury-navy/10 text-luxury-navy hover:bg-luxury-navy/20 transition-colors"
                title={showDescription ? "Hide details" : "Show details"}
              >
                <Info className="h-4 w-4" />
              </button>
            )}
            <a 
              href={`/property/${id}`} 
              className="text-luxury-navy luxury-transition hover:text-luxury-gold flex items-center text-sm font-medium"
            >
              Details 
              <ArrowRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
