
import { supabase } from '@/integrations/supabase/client';
import { PropertyCardProps } from '@/components/PropertyCard';

export const fetchAllProperties = async () => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    throw error;
  }
  
  return formatPropertiesData(data);
};

export const formatPropertiesData = (data: any[]): PropertyCardProps[] => {
  return data.map(prop => {
    // Safely handle the images property
    let mainImage = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"; // default image
    
    if (prop.images) {
      // Handle various cases for images data
      if (Array.isArray(prop.images) && prop.images.length > 0) {
        // If it's an array, take the first item
        const firstImage = prop.images[0];
        if (typeof firstImage === 'string') {
          mainImage = firstImage;
        }
      } else if (typeof prop.images === 'string') {
        // If it's directly a string
        mainImage = prop.images;
      }
    }
    
    return {
      id: prop.id,
      title: prop.title || 'Luxury Property',
      price: prop.price ? `KSh ${prop.price.toLocaleString()}` : 'Price on Request',
      numericPrice: prop.price || 0,
      location: prop.location || 'Kenya',
      bedrooms: prop.bedrooms || 0,
      bathrooms: prop.bathrooms || 0,
      area: prop.size_sqft || 0,
      image: mainImage,
      propertyType: prop.property_type || 'Residential',
      description: prop.description || 'Luxury property in prime location',
      yearBuilt: 2023,
      amenities: ['Luxury', 'Premium', 'Exclusive'],
      // Handle multiple images for property cards
      images: Array.isArray(prop.images) ? 
        prop.images.filter(img => typeof img === 'string') as string[] : 
        [mainImage]
    };
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
  let filtered = [...properties];
  
  // Filter by property type
  if (propertyType !== 'all') {
    filtered = filtered.filter(property => 
      property.propertyType.toLowerCase() === propertyType.toLowerCase()
    );
  }
  
  // Filter by location
  if (location !== 'all') {
    filtered = filtered.filter(property => 
      property.location.toLowerCase() === location.toLowerCase()
    );
  }
  
  // Filter by price range
  filtered = filtered.filter(property => {
    const price = property.numericPrice !== undefined ? property.numericPrice : 0;
    return price >= minPrice && price <= maxPrice;
  });
  
  // Filter by bedrooms
  if (bedrooms !== 'any') {
    const bedroomCount = parseInt(bedrooms);
    if (bedrooms === '5+') {
      filtered = filtered.filter(property => property.bedrooms >= 5);
    } else {
      filtered = filtered.filter(property => property.bedrooms === bedroomCount);
    }
  }
  
  // Filter by search term (check title, description, and location)
  if (searchTerm.trim().length > 0) {
    const searchLower = searchTerm.toLowerCase();
    filtered = filtered.filter(property => 
      property.title.toLowerCase().includes(searchLower) ||
      (property.description && property.description.toLowerCase().includes(searchLower)) ||
      property.location.toLowerCase().includes(searchLower)
    );
  }
  
  return filtered;
};
