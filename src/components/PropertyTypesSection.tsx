import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Crown, Building, Bed, MapPin } from 'lucide-react';

interface PropertyType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  value: string; // Value to filter by in database
}

interface PropertyTypesSectionProps {
  onTypeSelect: (type: string) => void;
  selectedType?: string;
}

const propertyTypes: PropertyType[] = [
  {
    id: 'luxury-villas',
    name: 'Luxury Villas',
    description: 'Exclusive standalone homes with premium finishes',
    icon: <Crown className="w-8 h-8" />,
    value: 'Villa'
  },
  {
    id: 'penthouses',
    name: 'Penthouses',
    description: 'Sky-high luxury with panoramic city views',
    icon: <Building2 className="w-8 h-8" />,
    value: 'Penthouse'
  },
  {
    id: 'commercial-spaces',
    name: 'Commercial Spaces',
    description: 'Prime business locations for growth',
    icon: <Building className="w-8 h-8" />,
    value: 'Commercial'
  },
  {
    id: 'serviced-apartments',
    name: 'Serviced Apartments',
    description: 'Fully furnished with concierge services',
    icon: <Bed className="w-8 h-8" />,
    value: 'Apartment'
  },
  {
    id: 'premium-land',
    name: 'Premium Land',
    description: 'Development-ready plots in prime locations',
    icon: <MapPin className="w-8 h-8" />,
    value: 'Land'
  }
];

const PropertyTypesSection: React.FC<PropertyTypesSectionProps> = ({ 
  onTypeSelect, 
  selectedType 
}) => {
  /**
   * Handle property type selection and scroll to featured properties
   * @param type - The property type value to filter by
   * @param id - The property type id for hash navigation
   */
  const handleTypeClick = (type: string, id: string) => {
    // Update URL hash for SEO and sharing
    window.history.pushState(null, '', `#${id}`);
    
    // Call the parent handler to update state and trigger filtering
    onTypeSelect(type);
    
    // Smooth scroll to featured properties section
    const featuredSection = document.getElementById('featured-properties');
    if (featuredSection) {
      featuredSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="py-16 bg-luxury-cream">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-luxury-navy mb-4">
            Property Types
          </h2>
          <div className="mx-auto w-20 h-1 bg-luxury-gold mb-6"></div>
          <p className="text-luxury-slate max-w-2xl mx-auto text-lg">
            Discover your perfect property type from our curated selection of luxury real estate
          </p>
        </div>

        {/* Property Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {propertyTypes.map((propertyType) => (
            <Card
              key={propertyType.id}
              className={`
                cursor-pointer luxury-transition hover-lift group
                ${selectedType === propertyType.value 
                  ? 'ring-2 ring-luxury-gold bg-luxury-navy text-white' 
                  : 'bg-white hover:bg-luxury-navy hover:text-white'
                }
              `}
              onClick={() => handleTypeClick(propertyType.value, propertyType.id)}
            >
              <CardContent className="p-6 text-center">
                {/* Icon */}
                <div className={`
                  mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-full
                  ${selectedType === propertyType.value 
                    ? 'bg-luxury-gold text-luxury-navy' 
                    : 'bg-luxury-cream text-luxury-navy group-hover:bg-luxury-gold group-hover:text-luxury-navy'
                  }
                  luxury-transition
                `}>
                  {propertyType.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold mb-2 font-serif">
                  {propertyType.name}
                </h3>
                
                {/* Description */}
                <p className={`
                  text-sm
                  ${selectedType === propertyType.value 
                    ? 'text-luxury-cream' 
                    : 'text-luxury-slate group-hover:text-luxury-cream'
                  }
                  luxury-transition
                `}>
                  {propertyType.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-luxury-slate text-lg">
            Can't find what you're looking for? 
            <span className="text-luxury-navy font-semibold ml-1">
              Contact our experts for personalized assistance.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PropertyTypesSection;