import { supabase } from '@/integrations/supabase/client';
import { PropertyCardProps } from '@/components/PropertyCard';

export const fetchAllProperties = async () => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    // Handle case where data is null or empty
    if (!data || data.length === 0) {
      console.log('No properties found in database');
      return [];
    }
    
    return formatPropertiesData(data);
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

export const formatPropertiesData = (data: any[]): PropertyCardProps[] => {
  // Handle empty or null data
  if (!data || !Array.isArray(data)) {
    console.warn('Invalid data passed to formatPropertiesData:', data);
    return [];
  }

  return data.map(prop => {
    try {
      // Safely handle the images property and ensure image is always a string
      let mainImage = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"; // default image
      let imageArray: string[] = [mainImage];
      
      if (prop.images) {
        // Handle various cases for images data
        if (Array.isArray(prop.images) && prop.images.length > 0) {
          // Filter out any non-string values and ensure we have valid URLs
          const validImages = prop.images.filter(img => 
            typeof img === 'string' && img.trim().length > 0
          );
          if (validImages.length > 0) {
            mainImage = validImages[0];
            imageArray = validImages;
          }
        } else if (typeof prop.images === 'string' && prop.images.trim().length > 0) {
          // If it's directly a string
          mainImage = prop.images;
          imageArray = [prop.images];
        }
      }
      
      return {
        id: prop.id || '',
        title: prop.title || 'Luxury Property',
        price: prop.price ? `KSh ${Number(prop.price).toLocaleString()}` : 'Price on Request',
        numericPrice: Number(prop.price) || 0,
        location: prop.location || 'Kenya',
        bedrooms: Number(prop.bedrooms) || 0,
        bathrooms: Number(prop.bathrooms) || 0,
        area: Number(prop.size_sqft) || 0,
        image: mainImage, // Ensure this is always a string
        propertyType: prop.property_type || 'Residential',
        description: prop.description || 'Luxury property in prime location',
        yearBuilt: 2023,
        amenities: ['Luxury', 'Premium', 'Exclusive'],
        images: imageArray
      };
    } catch (error) {
      console.error('Error formatting property:', prop, error);
      // Return a fallback property object to prevent crashes
      return {
        id: prop.id || 'fallback',
        title: 'Property',
        price: 'Price on Request',
        numericPrice: 0,
        location: 'Kenya',
        bedrooms: 0,
        bathrooms: 0,
        area: 0,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9", // Ensure fallback is also a string
        propertyType: 'Residential',
        description: 'Property details unavailable',
        yearBuilt: 2023,
        amenities: [],
        images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"]
      };
    }
  });
};

export const filterProperties = (
  properties: PropertyCardProps[],
  propertyType: string,
  location: string,
  minPrice: number,
  maxPrice: number,
  bedrooms: string,
  searchTerm: string
): PropertyCardProps[] => {
  // Handle empty properties array
  if (!properties || !Array.isArray(properties) || properties.length === 0) {
    return [];
  }

  let filtered = [...properties];
  
  // Filter by property type
  if (propertyType && propertyType !== 'all') {
    filtered = filtered.filter(property => 
      property.propertyType && property.propertyType.toLowerCase() === propertyType.toLowerCase()
    );
  }
  
  // Filter by location
  if (location && location !== 'all') {
    filtered = filtered.filter(property => 
      property.location && property.location.toLowerCase() === location.toLowerCase()
    );
  }
  
  // Filter by price range
  if (minPrice >= 0 && maxPrice > 0) {
    filtered = filtered.filter(property => {
      const price = property.numericPrice !== undefined ? property.numericPrice : 0;
      return price >= minPrice && price <= maxPrice;
    });
  }
  
  // Filter by bedrooms
  if (bedrooms && bedrooms !== 'any') {
    const bedroomCount = parseInt(bedrooms);
    if (bedrooms === '5+') {
      filtered = filtered.filter(property => property.bedrooms >= 5);
    } else if (!isNaN(bedroomCount)) {
      filtered = filtered.filter(property => property.bedrooms === bedroomCount);
    }
  }
  
  // Filter by search term (check title, description, and location)
  if (searchTerm && searchTerm.trim().length > 0) {
    const searchLower = searchTerm.toLowerCase();
    filtered = filtered.filter(property => 
      (property.title && property.title.toLowerCase().includes(searchLower)) ||
      (property.description && property.description.toLowerCase().includes(searchLower)) ||
      (property.location && property.location.toLowerCase().includes(searchLower))
    );
  }
  
  return filtered;
};
