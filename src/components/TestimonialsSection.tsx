
import React from 'react';
import TestimonialCard from './TestimonialCard';

const TestimonialsSection = () => {
  // Empty testimonials array - ready for future content
  const testimonials: any[] = [];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-luxury-navy mb-4">
            What Our Clients Say
          </h2>
          <div className="mx-auto w-20 h-1 bg-luxury-gold mb-6"></div>
          <p className="text-luxury-slate max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience with Eden Ridge Realty.
          </p>
        </div>
        
        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-luxury-slate text-lg">
              Client testimonials will be displayed here soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
