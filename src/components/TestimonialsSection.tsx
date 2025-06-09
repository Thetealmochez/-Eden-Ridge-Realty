
import React from 'react';
import TestimonialCard from './TestimonialCard';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Property Buyer",
      content: "Eden Ridge Realty helped me find my dream home in Karen. Their professionalism and attention to detail made the entire process seamless.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786"
    },
    {
      name: "Michael Ochieng",
      role: "Commercial Investor",
      content: "Exceptional service and market knowledge. They guided me through multiple commercial property investments with great success.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    },
    {
      name: "Grace Wanjiku",
      role: "First-time Buyer",
      content: "As a first-time buyer, I was nervous about the process. The team at Eden Ridge made everything clear and stress-free.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956"
    }
  ];

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
