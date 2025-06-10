
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PropertyCardProps } from '@/components/PropertyCard';
import {
  Bed,
  Bath,
  Home,
  MapPin,
  Calendar,
  Building,
  Ruler,
  Car,
  Wifi,
  Shield,
  Trees,
  Dumbbell
} from 'lucide-react';

interface PropertyDetailsInfoProps {
  property: PropertyCardProps;
}

const PropertyDetailsInfo: React.FC<PropertyDetailsInfoProps> = ({ property }) => {
  const features = [
    { icon: Bed, label: 'Bedrooms', value: property.bedrooms },
    { icon: Bath, label: 'Bathrooms', value: property.bathrooms },
    { icon: Home, label: 'Area', value: `${property.area} m²` },
    { icon: Calendar, label: 'Year Built', value: property.yearBuilt || 'N/A' },
    { icon: Building, label: 'Property Type', value: property.propertyType },
    { icon: MapPin, label: 'Location', value: property.location },
  ];

  const defaultAmenities = [
    { icon: Car, name: 'Parking' },
    { icon: Wifi, name: 'High-Speed Internet' },
    { icon: Shield, name: '24/7 Security' },
    { icon: Trees, name: 'Garden' },
    { icon: Dumbbell, name: 'Gym' },
  ];

  return (
    <div className="space-y-8">
      {/* Property Overview */}
      <div>
        <h2 className="text-2xl font-serif font-semibold text-luxury-navy mb-4">
          Property Overview
        </h2>
        <div className="prose max-w-none text-luxury-slate">
          <p>{property.description}</p>
        </div>
      </div>

      <Separator />

      {/* Key Features Grid */}
      <div>
        <h3 className="text-xl font-serif font-semibold text-luxury-navy mb-4">
          Key Features
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-luxury-cream rounded-lg flex items-center justify-center">
                  <Icon className="h-5 w-5 text-luxury-navy" />
                </div>
                <div>
                  <div className="text-sm text-luxury-slate">{feature.label}</div>
                  <div className="font-medium text-luxury-navy">{feature.value}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Amenities */}
      <div>
        <h3 className="text-xl font-serif font-semibold text-luxury-navy mb-4">
          Amenities & Features
        </h3>
        
        {/* Custom amenities if available */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-luxury-slate mb-2">Included Features</h4>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity, index) => (
                <Badge key={index} variant="outline" className="bg-luxury-cream/50">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Standard amenities */}
        <div>
          <h4 className="text-sm font-medium text-luxury-slate mb-3">Standard Amenities</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {defaultAmenities.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <div key={index} className="flex items-center space-x-2">
                  <Icon className="h-4 w-4 text-luxury-gold" />
                  <span className="text-luxury-slate text-sm">{amenity.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Separator />

      {/* Property Type Badge */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-luxury-slate mb-1">Property Classification</h4>
          <Badge className={`${property.propertyType === 'Residential' ? 'bg-luxury-navy' : 'bg-luxury-slate'} text-white`}>
            {property.propertyType}
          </Badge>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-luxury-slate">Property ID</div>
          <div className="font-mono text-sm text-luxury-navy">{property.id.slice(0, 8).toUpperCase()}</div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsInfo;
