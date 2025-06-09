
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  content,
  rating,
  image
}) => {
  return (
    <Card className="h-full shadow-lg hover-lift">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? 'text-luxury-gold fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        
        <blockquote className="text-luxury-slate mb-4 italic">
          "{content}"
        </blockquote>
        
        <div className="flex items-center">
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-12 w-12 rounded-full object-cover mr-4"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-luxury-navy flex items-center justify-center mr-4">
              <span className="text-white font-bold text-lg">
                {name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h4 className="font-semibold text-luxury-navy">{name}</h4>
            <p className="text-sm text-luxury-slate">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
