
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Eye, EyeOff } from 'lucide-react';
import { secureStorage } from '@/lib/security';

interface PropertyMapProps {
  location: string;
  title?: string;
  className?: string;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ 
  location, 
  title = "Property Location",
  className = "" 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Get coordinates for Kenya locations (fallback coordinates)
  const getLocationCoordinates = (locationName: string): [number, number] => {
    const locationMap: { [key: string]: [number, number] } = {
      'nairobi': [36.8219, -1.2921],
      'karen': [36.6850, -1.3197],
      'westlands': [36.8065, -1.2676],
      'kilimani': [36.7823, -1.2921],
      'runda': [36.7644, -1.2085],
      'kileleshwa': [36.7644, -1.2921],
      'lavington': [36.7644, -1.2921],
      'mombasa': [39.6682, -4.0435],
      'kisumu': [34.7617, -0.0917],
      'nakuru': [36.0800, -0.3031],
      'eldoret': [35.2699, 0.5143],
      'thika': [37.0692, -1.0332],
      'nyeri': [36.9478, -0.4187],
      'machakos': [37.2634, -1.5177],
      'meru': [37.6558, 0.0467],
      'kitale': [35.0063, 1.0167]
    };
    
    const normalizedLocation = locationName.toLowerCase().trim();
    return locationMap[normalizedLocation] || [36.8219, -1.2921]; // Default to Nairobi
  };

  const initializeMap = (token: string) => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = token;
    
    const coordinates = getLocationCoordinates(location);
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: coordinates,
      zoom: 13,
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add a marker for the property location
    const marker = new mapboxgl.Marker({
      color: '#1a365d', // luxury-navy color
      scale: 1.2
    })
      .setLngLat(coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div class="p-2">
              <h3 class="font-semibold text-luxury-navy">${title}</h3>
              <p class="text-sm text-luxury-slate">${location}</p>
            </div>
          `)
      )
      .addTo(map.current);

    map.current.on('load', () => {
      setMapLoaded(true);
      
      // Add some styling to make the map look more premium
      if (map.current) {
        map.current.setFog({
          color: 'rgb(255, 255, 255)',
          'high-color': 'rgb(200, 200, 225)',
          'horizon-blend': 0.1,
        });
      }
    });

    // Cleanup function
    return () => {
      map.current?.remove();
      map.current = null;
    };
  };

  useEffect(() => {
    // Check if we have a stored token
    const storedToken = secureStorage.getItem('mapbox_token');
    if (storedToken) {
      setMapboxToken(storedToken);
      initializeMap(storedToken);
    } else {
      setShowTokenInput(true);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [location]);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      secureStorage.setItem('mapbox_token', mapboxToken);
      setShowTokenInput(false);
      initializeMap(mapboxToken);
    }
  };

  const toggleTokenInput = () => {
    setShowTokenInput(!showTokenInput);
  };

  return (
    <div className={`relative ${className}`}>
      {showTokenInput && (
        <div className="absolute inset-0 bg-white z-10 p-6 rounded-lg border border-gray-200 flex flex-col items-center justify-center">
          <div className="max-w-md w-full space-y-4">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-luxury-navy mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-luxury-navy mb-2">
                Enable Interactive Map
              </h3>
              <p className="text-sm text-luxury-slate mb-4">
                To display an interactive map, please enter your Mapbox public token. 
                You can get one free at{' '}
                <a 
                  href="https://mapbox.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-luxury-navy underline hover:text-luxury-navy/80"
                >
                  mapbox.com
                </a>
              </p>
            </div>
            
            <div className="space-y-3">
              <Input
                type="text"
                placeholder="pk.eyJ1IjoieW91cnVzZXJuYW1lIiwi..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="w-full"
              />
              <div className="flex gap-2">
                <Button 
                  onClick={handleTokenSubmit}
                  className="flex-1 bg-luxury-navy hover:bg-luxury-navy/90"
                  disabled={!mapboxToken.trim()}
                >
                  Load Map
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowTokenInput(false)}
                  className="border-luxury-navy text-luxury-navy hover:bg-luxury-navy/10"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {!showTokenInput && (
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTokenInput}
            className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white"
          >
            {mapboxToken ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </Button>
        </div>
      )}
      
      <div 
        ref={mapContainer} 
        className="w-full h-[400px] rounded-lg border border-gray-200"
        style={{ 
          backgroundColor: mapLoaded ? 'transparent' : '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {!mapboxToken && !showTokenInput && (
          <div className="text-center p-4">
            <MapPin className="h-12 w-12 text-luxury-navy/50 mb-4 mx-auto" />
            <p className="text-luxury-navy font-medium mb-2">{location}</p>
            <p className="text-luxury-slate text-sm mb-4">
              Click to enable interactive map
            </p>
            <Button 
              variant="outline"
              onClick={() => setShowTokenInput(true)}
              className="border-luxury-navy text-luxury-navy hover:bg-luxury-navy/10"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Enable Map
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyMap;
