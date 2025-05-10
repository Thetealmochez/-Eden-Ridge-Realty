
import { Helmet } from "react-helmet-async";

interface PageMetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
}

const PageMeta = ({
  title = "Eden Ridge Realty | Luxury Real Estate in Kenya",
  description = "Discover premium residential and commercial properties across Kenya's most prestigious locations with Eden Ridge Realty.",
  keywords = "luxury real estate, Kenya property, premium homes, Eden Ridge Realty, Nairobi real estate, Karen properties",
  ogImage = "/images/og-image.jpg",
  ogUrl,
  canonical
}: PageMetaProps) => {
  const siteUrl = window.location.origin;
  const currentUrl = window.location.href;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl || currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={ogUrl || currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
};

export default PageMeta;
