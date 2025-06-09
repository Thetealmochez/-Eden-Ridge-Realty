
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageMeta from "@/components/PageMeta";
import BlogCard from "@/components/BlogCard";
import SkipToContent from "@/components/SkipToContent";

const Blog = () => {
  const blogPosts = [
    {
      id: "kenyan-real-estate-trends-2024",
      title: "Kenyan Real Estate Market Trends for 2024",
      excerpt: "Discover the latest trends shaping Kenya's real estate market, from sustainable development to smart home technology integration.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
      author: "Eden Ridge Team",
      date: "March 15, 2024",
      category: "Market Insights",
      readTime: "5 min"
    },
    {
      id: "investing-in-nairobi-property",
      title: "A Complete Guide to Investing in Nairobi Property",
      excerpt: "Everything you need to know about property investment in Nairobi, from location analysis to legal considerations.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      author: "Property Expert",
      date: "March 10, 2024",
      category: "Investment",
      readTime: "8 min"
    },
    {
      id: "luxury-home-features-2024",
      title: "Top Luxury Home Features Buyers Want in 2024",
      excerpt: "From smart home automation to sustainable energy solutions, discover what luxury home buyers are looking for.",
      image: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff",
      author: "Design Specialist",
      date: "March 5, 2024",
      category: "Luxury Living",
      readTime: "6 min"
    },
    {
      id: "first-time-buyer-guide-kenya",
      title: "First-Time Home Buyer's Guide to Kenya",
      excerpt: "Navigate the Kenyan property market with confidence. A comprehensive guide for first-time buyers.",
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
      author: "Buyer's Agent",
      date: "February 28, 2024",
      category: "Buying Guide",
      readTime: "10 min"
    },
    {
      id: "commercial-property-opportunities",
      title: "Commercial Property Investment Opportunities in Kenya",
      excerpt: "Explore the growing commercial real estate sector and identify profitable investment opportunities.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
      author: "Commercial Expert",
      date: "February 20, 2024",
      category: "Commercial",
      readTime: "7 min"
    },
    {
      id: "sustainable-living-eco-homes",
      title: "Sustainable Living: The Rise of Eco-Friendly Homes",
      excerpt: "How sustainable architecture and green building practices are transforming Kenya's residential landscape.",
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
      author: "Sustainability Expert",
      date: "February 15, 2024",
      category: "Sustainability",
      readTime: "6 min"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta 
        title="Blog | Eden Ridge Realty - Real Estate Insights & Market Trends" 
        description="Stay informed with the latest real estate market insights, investment tips, and property trends in Kenya from Eden Ridge Realty experts."
        keywords="Kenya real estate blog, property investment tips, Nairobi market trends, luxury home features, first-time buyer guide"
      />
      <SkipToContent />
      <Navbar />
      
      <main id="main-content" className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-luxury-navy py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Real Estate Insights & Market Trends
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              Stay updated with the latest insights, tips, and trends in Kenya's dynamic real estate market
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Blog;
