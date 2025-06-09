
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHelmetProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHelmet: React.FC<SEOHelmetProps> = ({
  title,
  description,
  keywords,
  image = '/images/og-image.jpg',
  url,
  type = 'website'
}) => {
  const siteUrl = window.location.origin;
  const currentUrl = url || window.location.href;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="Eden Ridge Realty" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <link rel="canonical" href={currentUrl} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Eden Ridge Realty",
          "description": "Luxury real estate services in Kenya",
          "url": siteUrl,
          "logo": `${siteUrl}/images/logo.png`,
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
        })}
      </script>
    </Helmet>
  );
};

export default SEOHelmet;
