import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Phone, Globe } from 'lucide-react';

const GoogleMapSection = () => {
  const locations = [
    {
      name: "Karen Office",
      address: "Karen Shopping Centre, Karen Road",
      phone: "+254 700 123 456",
      coordinates: { lat: -1.3197, lng: 36.7077 }
    },
    {
      name: "Westlands Branch",
      address: "Westlands Square, Waiyaki Way",
      phone: "+254 700 123 457",
      coordinates: { lat: -1.2675, lng: 36.8079 }
    }
  ];

  const openGoogleMaps = (location: typeof locations[0]) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.coordinates.lat},${location.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-luxury-navy mb-4">
            Find Us Across Nairobi
          </h2>
          <p className="text-luxury-slate text-lg max-w-3xl mx-auto">
            Visit our conveniently located offices to discuss your property needs 
            with our expert team in person.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map Placeholder */}
          <div className="relative">
            <div className="bg-gradient-to-br from-luxury-cream to-luxury-gold/20 rounded-2xl shadow-lg overflow-hidden h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-luxury-navy mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-luxury-navy mb-2">Interactive Map</h3>
                <p className="text-luxury-slate mb-6">
                  Click below to view our locations on Google Maps
                </p>
                <Button
                  onClick={() => openGoogleMaps(locations[0])}
                  className="bg-luxury-navy hover:bg-luxury-navy/90 text-white"
                >
                  <Navigation className="w-5 h-5 mr-2" />
                  View on Google Maps
                </Button>
              </div>
            </div>
          </div>

          {/* Office Locations */}
          <div className="space-y-6">
            {locations.map((location, index) => (
              <div key={index} className="bg-gradient-to-r from-luxury-cream to-white p-6 rounded-xl border border-luxury-gold/20 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-luxury-navy mb-3">
                  {location.name}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-luxury-gold mt-0.5" />
                    <p className="text-luxury-slate">{location.address}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-luxury-gold" />
                    <a href={`tel:${location.phone}`} className="text-luxury-navy hover:text-luxury-gold transition-colors">
                      {location.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openGoogleMaps(location)}
                    className="border-luxury-navy text-luxury-navy hover:bg-luxury-navy hover:text-white"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`tel:${location.phone}`)}
                    className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-navy"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="bg-gradient-to-r from-luxury-navy to-luxury-navy/90 p-6 rounded-xl text-white">
              <h3 className="text-xl font-semibold mb-3">Service Areas</h3>
              <p className="text-luxury-cream mb-4">
                We serve clients across Nairobi and surrounding areas including:
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span>• Karen</span>
                <span>• Runda</span>
                <span>• Westlands</span>
                <span>• Kilimani</span>
                <span>• Lavington</span>
                <span>• Muthaiga</span>
                <span>• Kileleshwa</span>
                <span>• Spring Valley</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMapSection;