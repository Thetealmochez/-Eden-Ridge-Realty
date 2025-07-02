
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PropertyCardProps } from '@/components/PropertyCard';
import ScheduleViewing from '@/components/ScheduleViewing';
import {
  Bed,
  Bath,
  Home,
  MessageSquare,
  Calendar,
  Phone,
  Mail,
  Info,
  Heart,
  Share2
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PropertyContactSidebarProps {
  property: PropertyCardProps;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
}

const PropertyContactSidebar: React.FC<PropertyContactSidebarProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onShare
}) => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in the property: ${property.title} (${property.location}). Could you please provide more information?`
    );
    window.open(`https://wa.me/254791942327?text=${message}`, '_blank');
  };

  const handleCallClick = () => {
    window.open('tel:+254791942327');
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent(`Inquiry about ${property.title}`);
    const body = encodeURIComponent(
      `Hi,\n\nI'm interested in the property: ${property.title} located in ${property.location}.\n\nProperty ID: ${property.id}\nPrice: ${property.price}\n\nCould you please provide more information?\n\nThank you!`
    );
    window.open(`mailto:info@evanaproperties.co.ke?subject=${subject}&body=${body}`);
  };

  return (
    <div className="sticky top-24 space-y-6">
      {/* Price & Quick Info */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="text-2xl md:text-3xl font-bold text-luxury-navy mb-4">
          {property.price}
        </div>
        
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
          <div className="flex items-center text-luxury-slate">
            <Bed className="h-5 w-5 mr-1.5" />
            <span className="text-sm">{property.bedrooms}</span>
          </div>
          <div className="flex items-center text-luxury-slate">
            <Bath className="h-5 w-5 mr-1.5" />
            <span className="text-sm">{property.bathrooms}</span>
          </div>
          <div className="flex items-center text-luxury-slate">
            <Home className="h-5 w-5 mr-1.5" />
            <span className="text-sm">{property.area}m²</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleWhatsAppClick}
            className="w-full bg-luxury-gold text-luxury-navy hover:bg-luxury-gold/90 h-12"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            WhatsApp Inquiry
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={handleCallClick}
              variant="outline" 
              className="border-luxury-navy text-luxury-navy hover:bg-luxury-navy/10"
            >
              <Phone className="h-4 w-4 mr-1" />
              Call
            </Button>
            <Button 
              onClick={handleEmailClick}
              variant="outline" 
              className="border-luxury-navy text-luxury-navy hover:bg-luxury-navy/10"
            >
              <Mail className="h-4 w-4 mr-1" />
              Email
            </Button>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* Additional Actions */}
        <div className="flex justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={onToggleFavorite}
                  className="text-luxury-slate hover:text-red-500"
                >
                  <Heart className={isFavorite ? "h-5 w-5 fill-red-500 text-red-500" : "h-5 w-5"} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={onShare}
                  className="text-luxury-slate hover:text-luxury-navy"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share this property</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Schedule Viewing Form */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-luxury-navy p-6 text-white">
          <h3 className="text-xl font-serif font-semibold mb-1">
            Schedule a Viewing
          </h3>
          <p className="text-white/80 text-sm">
            Book an appointment to view this property
          </p>
        </div>
        <ScheduleViewing 
          propertyId={property.id} 
          propertyTitle={property.title}
          className="p-6"
        />
      </div>
      
      {/* Agent Contact */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-luxury-navy rounded-full mr-4 flex items-center justify-center text-white font-bold">
            ER
          </div>
          <div>
            <h3 className="font-medium text-luxury-navy">Eden Ridge Realty</h3>
            <p className="text-sm text-luxury-slate">Premium Properties</p>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <p className="text-luxury-slate flex items-center">
            <Info className="h-4 w-4 mr-2" />
            Professional real estate services
          </p>
          <p className="text-luxury-navy">
            <Mail className="h-4 w-4 inline mr-2" />
            <a href="mailto:info@evanaproperties.co.ke" className="hover:underline">
              info@evanaproperties.co.ke
            </a>
          </p>
          <p className="text-luxury-navy">
            <Phone className="h-4 w-4 inline mr-2" />
            <a href="tel:+254791942327" className="hover:underline">
              +254 791 942 327
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyContactSidebar;
