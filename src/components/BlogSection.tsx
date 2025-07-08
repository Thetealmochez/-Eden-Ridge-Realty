import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Calendar, ArrowRight, Clock, Tag } from 'lucide-react';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Kenya's Real Estate Market Outlook for 2024",
      excerpt: "Explore the latest trends and investment opportunities in Kenya's growing real estate sector.",
      image: "/api/placeholder/400/250",
      category: "Market Analysis",
      date: "December 15, 2024",
      readTime: "5 min read",
      slug: "kenya-real-estate-outlook-2024"
    },
    {
      id: 2,
      title: "Top 5 Luxury Neighborhoods in Nairobi",
      excerpt: "Discover the most prestigious areas for luxury living and investment in Nairobi.",
      image: "/api/placeholder/400/250",
      category: "Location Guide",
      date: "December 10, 2024",
      readTime: "7 min read",
      slug: "top-luxury-neighborhoods-nairobi"
    },
    {
      id: 3,
      title: "Investment Tips for First-Time Property Buyers",
      excerpt: "Essential guidance for making your first property investment in Kenya's market.",
      image: "/api/placeholder/400/250",
      category: "Investment Tips",
      date: "December 5, 2024",
      readTime: "6 min read",
      slug: "first-time-buyer-investment-tips"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-luxury-cream to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-luxury-navy mb-4">
            Latest Insights & Market Updates
          </h2>
          <p className="text-luxury-slate text-lg max-w-3xl mx-auto">
            Stay informed with expert analysis, market trends, and valuable insights 
            from Kenya's luxury real estate sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-luxury-gold text-luxury-navy px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="flex items-center text-sm text-luxury-slate mb-3 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-luxury-navy mb-3 group-hover:text-luxury-gold transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-luxury-slate leading-relaxed">
                  {post.excerpt}
                </p>
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <Button
                  variant="outline"
                  className="w-full border-luxury-navy text-luxury-navy hover:bg-luxury-navy hover:text-white group"
                  onClick={() => window.location.href = `/blog/${post.slug}`}
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            className="bg-luxury-navy hover:bg-luxury-navy/90 text-white px-8 py-3"
            onClick={() => window.location.href = '/blog'}
          >
            <Tag className="w-5 h-5 mr-2" />
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;