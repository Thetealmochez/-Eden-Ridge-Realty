
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  excerpt,
  image,
  author,
  date,
  category,
  readTime
}) => {
  return (
    <Card className="overflow-hidden shadow-lg hover-lift group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-4 left-4 bg-luxury-gold text-luxury-navy">
          {category}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center text-sm text-luxury-slate mb-3">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="mr-4">{date}</span>
          <User className="h-4 w-4 mr-1" />
          <span className="mr-4">{author}</span>
          <span>{readTime} read</span>
        </div>
        
        <h3 className="text-xl font-serif font-semibold text-luxury-navy mb-3 group-hover:text-luxury-gold transition-colors">
          {title}
        </h3>
        
        <p className="text-luxury-slate mb-4 line-clamp-3">
          {excerpt}
        </p>
        
        <Link 
          to={`/blog/${id}`}
          className="inline-flex items-center text-luxury-navy hover:text-luxury-gold transition-colors font-medium"
        >
          Read More
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
