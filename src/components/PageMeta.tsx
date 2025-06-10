
import { Helmet } from "react-helmet-async";

interface PageMetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  property?: {
    type?: string;
    price?: string;
    location?: string;
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
  };
}

const PageMeta = ({
  title = "Eden Ridge Realty | Luxury Real Estate in Kenya",
  description = "Discover premium residential and commercial properties across Kenya's most prestigious locations with Eden Ridge Realty.",
  keywords = "luxury real estate, Kenya property, premium homes, Eden Ridge Realty, Nairobi real estate, Karen properties",
  ogImage = "/images/og-image.jpg",
  ogUrl,
  canonical,
  article,
  property
}: PageMetaProps) => {
  const siteUrl = window.location.origin;
  const currentUrl = window.location.href;
  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;
  
  // Generate structured data for real estate
  const structuredData = {
    "@context": "https://schema.org",
    "@type": property ? "RealEstateListing" : "RealEstateAgent",
    "name": property ? title : "Eden Ridge Realty",
    "description": description,
    "url": ogUrl || currentUrl,
    "image": fullImageUrl,
    ...(property && {
      "address": {
        "@type": "PostalAddress",
        "addressLocality": property.location,
        "addressCountry": "Kenya"
      },
      "offers": {
        "@type": "Offer",
        "price": property.price,
        "priceCurrency": "KES"
      },
      "floorSize": property.area ? {
        "@type": "QuantitativeValue",
        "value": property.area,
        "unitText": "SQF"
      } : undefined,
      "numberOfRooms": property.bedrooms,
      "numberOfBathroomsTotal": property.bathrooms
    }),
    ...(!property && {
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Eden Ridge Towers, 5th Floor",
        "addressLocality": "Upperhill",
        "addressRegion": "Nairobi",
        "addressCountry": "Kenya"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+254-700-000-000",
        "contactType": "customer service",
        "email": "info@evanaproperties.co.ke"
      },
      "sameAs": [
        "https://www.facebook.com/edenridgerealty",
        "https://www.instagram.com/edenridgerealty",
        "https://www.linkedin.com/company/edenridgerealty"
      ]
    })
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Robots meta tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={property ? "article" : "website"} />
      <meta property="og:url" content={ogUrl || currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Eden Ridge Realty" />
      <meta property="og:locale" content="en_KE" />
      
      {/* Article specific meta tags */}
      {article && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags && article.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={ogUrl || currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@edenridgerealty" />
      <meta name="twitter:creator" content="@edenridgerealty" />
      
      {/* Additional SEO meta tags */}
      <meta name="author" content="Eden Ridge Realty" />
      <meta name="publisher" content="Eden Ridge Realty" />
      <meta name="copyright" content="Eden Ridge Realty" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="KE" />
      <meta name="geo.country" content="Kenya" />
      <meta name="geo.placename" content="Nairobi" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical || currentUrl} />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Additional meta tags for mobile and PWA */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#1a365d" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Eden Ridge Realty" />
    </Helmet>
  );
};

export default PageMeta;
