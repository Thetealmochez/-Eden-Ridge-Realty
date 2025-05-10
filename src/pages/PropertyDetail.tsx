
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageMeta from "@/components/PageMeta";
import SkipToContent from "@/components/SkipToContent";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ScheduleViewing from "@/components/ScheduleViewing";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { PropertyCardProps } from '@/components/PropertyCard';
import {
  Bed,
  Bath,
  Home,
  MapPin,
  Calendar,
  Share2,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Heart,
  Info,
  ArrowLeft,
  Loader2
} from "lucide-react";
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PropertyDetail = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const { toast } = useToast();
  const [property, setProperty] = useState<PropertyCardProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        
        if (!propertyId) {
          throw new Error("Property ID is missing");
        }
        
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', propertyId)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Format the property data
          const formattedProperty: PropertyCardProps = {
            id: data.id,
            title: data.title || 'Luxury Property',
            price: data.price ? `KSh ${data.price.toLocaleString()}` : 'Price on Request',
            numericPrice: data.price || 0,
            location: data.location || 'Kenya',
            bedrooms: data.bedrooms || 0,
            bathrooms: data.bathrooms || 0,
            area: data.size_sqft || 0,
            image: data.images && data.images[0] ? data.images[0] : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
            images: data.images || [],
            propertyType: data.property_type || 'Residential',
            description: data.description || 'Luxury property in prime location',
            yearBuilt: 2023,
            amenities: ['Swimming Pool', 'Garden', 'Security', 'Parking', 'Gym']
          };
          
          setProperty(formattedProperty);
        }
      } catch (error) {
        console.error('Error fetching property:', error);
        toast({
          title: "Failed to load property",
          description: "Please try again or contact us for assistance",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperty();
  }, [propertyId, toast]);

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title || 'Property Listing',
        text: `Check out this property: ${property?.title}`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this property listing",
      });
    }
  };

  const nextImage = () => {
    if (!property?.images?.length) return;
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };
  
  const prevImage = () => {
    if (!property?.images?.length) return;
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  // Related properties would be implemented with actual data in a real application
  const relatedProperties = [
    {
      id: 'related-1',
      title: 'Similar Luxury Villa',
      price: 'KSh 35,000,000',
      location: property?.location || 'Nairobi',
      image: 'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff'
    },
    {
      id: 'related-2',
      title: 'Modern Apartment',
      price: 'KSh 28,500,000',
      location: property?.location || 'Nairobi',
      image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224'
    },
    {
      id: 'related-3',
      title: 'Spacious Family Home',
      price: 'KSh 42,000,000',
      location: property?.location || 'Nairobi',
      image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 animate-spin text-luxury-navy mb-4" />
            <h2 className="text-xl text-luxury-navy">Loading property details...</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <PageMeta 
          title="Property Not Found | Eden Ridge Realty" 
          description="The property you are looking for could not be found."
        />
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-lg px-4">
            <h1 className="text-3xl font-bold text-luxury-navy mb-4">Property Not Found</h1>
            <p className="text-luxury-slate mb-8">The property you are looking for could not be found or may have been removed.</p>
            <Link to="/properties">
              <Button className="bg-luxury-navy hover:bg-luxury-navy/90">
                Browse All Properties
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta 
        title={`${property.title} | Eden Ridge Realty`} 
        description={`${property.description?.substring(0, 150)}...`}
        keywords={`${property.title}, ${property.location}, ${property.propertyType}, luxury property, Kenya real estate`}
        ogImage={property.image}
      />
      <SkipToContent />
      <Navbar />
      
      <main id="main-content" className="flex-grow pt-24 pb-16">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4">
          <div className="py-4">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link to="/" className="text-luxury-slate hover:text-luxury-navy transition-colors">
                    Home
                  </Link>
                </li>
                <span className="text-gray-400">/</span>
                <li>
                  <Link to="/properties" className="text-luxury-slate hover:text-luxury-navy transition-colors">
                    Properties
                  </Link>
                </li>
                <span className="text-gray-400">/</span>
                <li>
                  <span className="text-luxury-navy font-medium">{property.title}</span>
                </li>
              </ol>
            </nav>
          </div>
          
          {/* Back button */}
          <div className="mb-4">
            <Button 
              variant="ghost" 
              className="flex items-center text-luxury-slate hover:text-luxury-navy transition-colors"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to listings
            </Button>
          </div>

          {/* Property Title & Location */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-luxury-navy mb-2">
              {property.title}
            </h1>
            <div className="flex items-center text-luxury-slate">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.location}</span>
            </div>
          </div>
          
          {/* Property Gallery & Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Property Images */}
            <div className="lg:col-span-2">
              <div className="relative rounded-lg overflow-hidden bg-gray-100 h-[400px] md:h-[500px]">
                {property.images && property.images.length > 0 ? (
                  <img
                    src={property.images[currentImageIndex]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/placeholder.svg';
                    }}
                  />
                ) : (
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/placeholder.svg';
                    }}
                  />
                )}
                
                {property.images && property.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage} 
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-luxury-navy rounded-full p-3 shadow-md transition-all"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    
                    <button 
                      onClick={nextImage} 
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-luxury-navy rounded-full p-3 shadow-md transition-all"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {property.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={cn(
                            "w-2 h-2 rounded-full transition-all",
                            index === currentImageIndex ? "bg-luxury-gold w-6" : "bg-white"
                          )}
                          aria-label={`View image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
                
                <div className="absolute top-4 right-4 flex space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button 
                          onClick={() => setIsFavorite(!isFavorite)} 
                          className="p-2.5 rounded-full bg-white/90 hover:bg-white text-luxury-navy shadow-md transition-colors"
                          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                          <Heart className={isFavorite ? "h-5 w-5 fill-red-500 text-red-500" : "h-5 w-5"} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button 
                          onClick={handleShareClick}
                          className="p-2.5 rounded-full bg-white/90 hover:bg-white text-luxury-navy shadow-md transition-colors"
                          aria-label="Share property"
                        >
                          <Share2 className="h-5 w-5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Share this property</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                {/* Property Type Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className={`${property.propertyType === 'Residential' ? 'bg-luxury-navy' : 'bg-luxury-slate'} text-white`}>
                    {property.propertyType}
                  </Badge>
                </div>
              </div>
              
              {/* Thumbnail preview */}
              {property.images && property.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2 mt-4">
                  {property.images.slice(0, 5).map((img, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "h-20 rounded-md overflow-hidden cursor-pointer transition-all",
                        currentImageIndex === index ? "ring-2 ring-luxury-gold" : "hover:opacity-80"
                      )}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={img}
                        alt={`${property.title} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/placeholder.svg';
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {/* Property Description */}
              <div className="mt-8">
                <h2 className="text-2xl font-serif font-semibold text-luxury-navy mb-4">
                  About This Property
                </h2>
                <div className="prose max-w-none text-luxury-slate">
                  <p>{property.description}</p>
                </div>
              </div>
              
              {/* Property Details */}
              <div className="mt-8">
                <h2 className="text-2xl font-serif font-semibold text-luxury-navy mb-4">
                  Property Details
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Property Type</h3>
                    <p className="text-luxury-navy">{property.propertyType}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Year Built</h3>
                    <p className="text-luxury-navy">{property.yearBuilt || 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Size</h3>
                    <p className="text-luxury-navy">{property.area} m²</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Bedrooms</h3>
                    <p className="text-luxury-navy">{property.bedrooms}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Bathrooms</h3>
                    <p className="text-luxury-navy">{property.bathrooms}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                    <p className="text-luxury-navy">{property.location}</p>
                  </div>
                </div>
              </div>
              
              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-serif font-semibold text-luxury-navy mb-4">
                    Amenities
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold mr-2"></div>
                        <span className="text-luxury-slate">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Map placeholder - in a real app, this would be an actual map */}
              <div className="mt-8">
                <h2 className="text-2xl font-serif font-semibold text-luxury-navy mb-4">
                  Location
                </h2>
                <div className="rounded-lg overflow-hidden border border-gray-200 h-[300px] bg-gray-200 flex items-center justify-center">
                  <div className="text-center p-4">
                    <MapPin className="h-12 w-12 text-luxury-navy/50 mb-4 mx-auto" />
                    <p className="text-luxury-navy font-medium">
                      {property.location}
                    </p>
                    <p className="text-luxury-slate text-sm mt-1">
                      Map view available on request for privacy reasons
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Price & Actions */}
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                  <div className="text-2xl md:text-3xl font-bold text-luxury-navy mb-6">
                    {property.price}
                  </div>
                  
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                    <div className="flex items-center text-luxury-slate">
                      <Bed className="h-5 w-5 mr-1.5" />
                      <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                    </div>
                    <div className="flex items-center text-luxury-slate">
                      <Bath className="h-5 w-5 mr-1.5" />
                      <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
                    </div>
                    <div className="flex items-center text-luxury-slate">
                      <Home className="h-5 w-5 mr-1.5" />
                      <span>{property.area}m²</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-luxury-gold text-luxury-navy hover:bg-luxury-gold/90 h-12 mb-4">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    WhatsApp Inquiry
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-luxury-navy text-luxury-navy hover:bg-luxury-navy/10 h-12"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Schedule a Viewing
                  </Button>
                </div>
                
                {/* Schedule Viewing Form */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="bg-luxury-navy p-6 text-white">
                    <h3 className="text-xl font-serif font-semibold mb-1">
                      Schedule a Viewing
                    </h3>
                    <p className="text-white/80 text-sm">
                      Fill out the form below to book a viewing appointment
                    </p>
                  </div>
                  <ScheduleViewing 
                    propertyId={property.id} 
                    propertyTitle={property.title}
                    className="p-6"
                  />
                </div>
                
                {/* Contact Info */}
                <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
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
                    <p className="text-luxury-slate">
                      <Info className="h-4 w-4 inline-block mr-1.5" />
                      <span>For more information, please don't hesitate to contact us.</span>
                    </p>
                    <p className="text-luxury-navy">
                      Email: <a href="mailto:info@evanaproperties.co.ke" className="hover:underline font-medium">info@evanaproperties.co.ke</a>
                    </p>
                    <p className="text-luxury-navy">
                      Phone: <a href="tel:+254700000000" className="hover:underline font-medium">+254 700 000 000</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Properties */}
          <div className="border-t border-gray-100 pt-12">
            <h2 className="text-2xl font-serif font-semibold text-luxury-navy mb-6">
              Similar Properties
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((relProp) => (
                <div key={relProp.id} className="group">
                  <div className="relative h-56 rounded-lg overflow-hidden mb-3">
                    <img
                      src={relProp.image}
                      alt={relProp.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-medium text-luxury-navy group-hover:text-luxury-gold transition-colors">
                    {relProp.title}
                  </h3>
                  <div className="flex justify-between mt-1">
                    <span className="text-luxury-slate text-sm">{relProp.location}</span>
                    <span className="font-medium text-luxury-navy">{relProp.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PropertyDetail;
