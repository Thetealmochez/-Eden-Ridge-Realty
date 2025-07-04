
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageMeta from "@/components/PageMeta";
import SkipToContent from "@/components/SkipToContent";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import PropertyImageGallery from "@/components/PropertyImageGallery";
import PropertyDetailsInfo from "@/components/PropertyDetailsInfo";
import PropertyContactSidebar from "@/components/PropertyContactSidebar";
import PropertyCard from "@/components/PropertyCard";
import PropertyMap from "@/components/PropertyMap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { PropertyCardProps } from '@/components/PropertyCard';
import { formatPropertiesData } from '@/services/PropertyDataService';
import {
  MapPin,
  ArrowLeft,
  Loader2,
  Share2
} from "lucide-react";

const PropertyDetail = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const { toast } = useToast();
  const [property, setProperty] = useState<PropertyCardProps | null>(null);
  const [relatedProperties, setRelatedProperties] = useState<PropertyCardProps[]>([]);
  const [loading, setLoading] = useState(true);
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
          // Use the same formatting logic as PropertyDataService
          const formattedProperties = formatPropertiesData([data]);
          if (formattedProperties.length > 0) {
            setProperty(formattedProperties[0]);
            
            // Fetch related properties
            await fetchRelatedProperties(data.location, data.property_type, data.id);
          }
        }
      } catch (error) {
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

  const fetchRelatedProperties = async (location: string, propertyType: string, currentId: string) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .or(`location.eq.${location},property_type.eq.${propertyType}`)
        .neq('id', currentId)
        .limit(3);
      
      if (error) throw error;
      
      if (data) {
        // Use the same formatting logic as PropertyDataService to ensure proper types
        const formatted = formatPropertiesData(data);
        setRelatedProperties(formatted);
      }
    } catch (error) {
      // Related properties error handled silently
    }
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title || 'Property Listing',
        text: `Check out this property: ${property?.title}`,
        url: window.location.href,
      })
      .catch((error) => {
        // Handle sharing error silently
        toast({
          title: "Sharing failed",
          description: "Unable to share this property listing",
          variant: "destructive",
        });
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this property listing",
      });
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite 
        ? "Property removed from your favorites" 
        : "Property added to your favorites",
    });
  };

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

  const breadcrumbPaths = [
    { label: 'Home', href: '/' },
    { label: 'Properties', href: '/properties' },
    { label: property?.title }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta 
        title={`${property?.title} | Eden Ridge Realty`} 
        description={`${property?.description?.substring(0, 150)}...`}
        keywords={`${property?.title}, ${property?.location}, ${property?.propertyType}, luxury property, Kenya real estate`}
        ogImage={property?.image}
      />
      <SkipToContent />
      <Navbar />
      
      <main id="main-content" className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="py-4">
            <BreadcrumbNav customPaths={breadcrumbPaths} />
          </div>
          
          {/* Back button */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="flex items-center text-luxury-slate hover:text-luxury-navy transition-colors"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to listings
            </Button>
          </div>

          {/* Property Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-semibold text-luxury-navy mb-2">
                  {property?.title}
                </h1>
                <div className="flex items-center text-luxury-slate">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{property?.location}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge className={`${property?.propertyType === 'Residential' ? 'bg-luxury-navy' : 'bg-luxury-slate'} text-white`}>
                  {property?.propertyType}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShareClick}
                  className="border-luxury-navy text-luxury-navy hover:bg-luxury-navy/10"
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Property Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <PropertyImageGallery 
                images={property?.images || [property?.image || '']}
                title={property?.title || ''}
                className="group"
              />
              
              {/* Property Details */}
              <PropertyDetailsInfo property={property} />
              
              {/* Interactive Map */}
              <div>
                <h2 className="text-2xl font-serif font-semibold text-luxury-navy mb-4">
                  Location & Neighborhood
                </h2>
                <PropertyMap 
                  location={property?.location || 'Nairobi'}
                  title={property?.title}
                  className="mb-4"
                />
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <h3 className="font-semibold text-luxury-navy mb-2">About this area</h3>
                  <p className="text-luxury-slate text-sm">
                    {property?.location} is a prime location in Kenya known for its excellent infrastructure, 
                    security, and proximity to major amenities. The area offers easy access to shopping centers, 
                    schools, hospitals, and business districts.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <PropertyContactSidebar 
                property={property}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
                onShare={handleShareClick}
              />
            </div>
          </div>
          
          {/* Related Properties */}
          {relatedProperties.length > 0 && (
            <div className="border-t border-gray-100 pt-12">
              <h2 className="text-2xl font-serif font-semibold text-luxury-navy mb-6">
                Similar Properties
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProperties.map((relProp) => (
                  <PropertyCard key={relProp.id} {...relProp} />
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Link to="/properties">
                  <Button variant="outline" className="border-luxury-navy text-luxury-navy hover:bg-luxury-navy/10">
                    View All Properties
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PropertyDetail;
