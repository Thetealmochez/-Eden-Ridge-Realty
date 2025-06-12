
-- Insert comprehensive sample property data for Kenya's premium locations
INSERT INTO public.properties (
  title, 
  description, 
  price, 
  location, 
  property_type, 
  bedrooms, 
  bathrooms, 
  size_sqft, 
  is_featured, 
  images
) VALUES

-- Karen Properties (Luxury Residential)
(
  'Magnificent 5-Bedroom Villa in Karen',
  'Stunning contemporary villa set on 2 acres of manicured gardens in the prestigious Karen suburb. Features include a chef''s kitchen with granite countertops, spacious living areas with high ceilings, master suite with walk-in closet, swimming pool, staff quarters, and 24/7 security. Perfect for families seeking luxury and tranquility just minutes from Nairobi CBD.',
  85000000,
  'Karen',
  'Residential',
  5,
  4,
  4500,
  true,
  '[
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
    "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800",
    "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800"
  ]'
),

(
  'Elegant 4-Bedroom Townhouse Karen',
  'Beautifully designed townhouse in a gated community featuring modern finishes, open-plan living, private garden, double garage, and access to community amenities including gym and children''s play area. Located near international schools and shopping centers.',
  45000000,
  'Karen',
  'Residential',
  4,
  3,
  3200,
  true,
  '[
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
  ]'
),

-- Westlands Properties (Mixed Use)
(
  'Modern 3-Bedroom Apartment Westlands',
  'Contemporary apartment in prestigious Westlands tower with panoramic city views. Features include floor-to-ceiling windows, premium finishes, balcony, parking, backup generator, and access to rooftop infinity pool. Walking distance to shopping malls and business district.',
  22000000,
  'Westlands',
  'Residential',
  3,
  2,
  1800,
  true,
  '[
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
  ]'
),

(
  'Prime Commercial Office Space Westlands',
  'Premium office space in Grade A building featuring modern infrastructure, high-speed elevators, backup power, ample parking, and 24/7 security. Ideal for multinational corporations and growing businesses. Excellent connectivity to major roads and public transport.',
  180000000,
  'Westlands',
  'Commercial',
  0,
  6,
  12000,
  true,
  '[
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800"
  ]'
),

-- Runda Properties (Ultra Luxury)
(
  'Spectacular 6-Bedroom Mansion Runda',
  'Architectural masterpiece on 1.5 acres featuring imported finishes, wine cellar, home theater, infinity pool, tennis court, staff quarters, and 3-car garage. This ultra-luxury home represents the pinnacle of sophisticated living in Nairobi''s most exclusive neighborhood.',
  150000000,
  'Runda',
  'Residential',
  6,
  5,
  6500,
  true,
  '[
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800"
  ]'
),

-- Kilimani Properties (Urban Living)
(
  'Stylish 2-Bedroom Apartment Kilimani',
  'Modern apartment in vibrant Kilimani featuring contemporary design, open kitchen, balcony with city views, gym access, and secure parking. Perfect for young professionals seeking urban convenience with easy access to restaurants, bars, and business centers.',
  15000000,
  'Kilimani',
  'Residential',
  2,
  2,
  1200,
  false,
  '[
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
  ]'
),

-- Kileleshwa Properties
(
  'Contemporary 4-Bedroom House Kileleshwa',
  'Beautifully appointed family home featuring spacious rooms, modern kitchen, private garden, DSQ, carport, and excellent security. Located in quiet residential area with easy access to schools, hospitals, and shopping centers.',
  35000000,
  'Kileleshwa',
  'Residential',
  4,
  3,
  2800,
  false,
  '[
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
  ]'
),

-- Muthaiga Properties (Prestigious)
(
  'Classic 5-Bedroom Colonial Home Muthaiga',
  'Timeless colonial architecture on expansive grounds featuring original hardwood floors, fireplaces, veranda, mature gardens, swimming pool, and staff quarters. Rich in history and character, perfect for those who appreciate heritage and elegance.',
  95000000,
  'Muthaiga',
  'Residential',
  5,
  4,
  5000,
  true,
  '[
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
  ]'
),

-- Spring Valley Properties
(
  'Modern 3-Bedroom Bungalow Spring Valley',
  'Single-level living at its finest with open-plan design, large windows, private garden, double garage, and modern amenities. Ideal for families or individuals seeking comfortable living in a well-established neighborhood.',
  28000000,
  'Spring Valley',
  'Residential',
  3,
  2,
  2200,
  false,
  '[
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
  ]'
),

-- CBD Commercial Properties
(
  'Premium Retail Space Nairobi CBD',
  'High-visibility retail space in the heart of Nairobi''s business district. Features include modern storefronts, excellent foot traffic, proximity to banks and government offices, and flexible layout options. Perfect for flagship stores and professional services.',
  75000000,
  'Nairobi CBD',
  'Commercial',
  0,
  4,
  5000,
  true,
  '[
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"
  ]'
),

-- Mombasa Properties (Coastal)
(
  'Luxury Beach Villa Diani Mombasa',
  'Breathtaking beachfront villa with direct beach access, infinity pool, open-air living spaces, and tropical gardens. Features include 4 en-suite bedrooms, gourmet kitchen, staff quarters, and spectacular ocean views. The ultimate coastal retreat.',
  120000000,
  'Diani, Mombasa',
  'Residential',
  4,
  4,
  4000,
  true,
  '[
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
    "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800"
  ]'
),

(
  'Oceanfront Apartment Nyali Mombasa',
  'Stunning 3-bedroom apartment with unobstructed ocean views, spacious balcony, modern finishes, and access to private beach. Building amenities include swimming pool, gym, and 24/7 security. Perfect holiday home or rental investment.',
  35000000,
  'Nyali, Mombasa',
  'Residential',
  3,
  2,
  1600,
  false,
  '[
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"
  ]'
),

-- Kisumu Properties (Lakeside)
(
  'Lakefront Family Home Kisumu',
  'Charming 4-bedroom home overlooking Lake Victoria with private jetty, garden, and stunning sunset views. Features include spacious living areas, modern kitchen, and outdoor entertainment space. Perfect for lake enthusiasts and nature lovers.',
  25000000,
  'Kisumu',
  'Residential',
  4,
  3,
  2500,
  false,
  '[
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
  ]'
),

-- Nakuru Properties
(
  'Executive 4-Bedroom House Nakuru',
  'Well-designed family home in secure neighborhood featuring modern amenities, large compound, garage, and excellent finishes. Close to schools, hospitals, and business centers. Ideal for families relocating to this growing city.',
  18000000,
  'Nakuru',
  'Residential',
  4,
  3,
  2200,
  false,
  '[
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
  ]'
),

-- Additional Premium Properties
(
  'Penthouse Suite Upper Hill',
  'Exclusive penthouse with 360-degree city views, private elevator access, rooftop terrace, jacuzzi, and premium finishes throughout. Building features include concierge service, gym, spa, and business center. The epitome of luxury urban living.',
  65000000,
  'Upper Hill',
  'Residential',
  3,
  3,
  2800,
  true,
  '[
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
  ]'
);
