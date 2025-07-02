
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, Mail, MapPin, Star, Award, TrendingUp, Users, Calendar } from 'lucide-react';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PropertyCard, { PropertyCardProps } from '@/components/PropertyCard';
import TestimonialCard from '@/components/TestimonialCard';
import SEOHelmet from '@/components/SEOHelmet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// Mock agent data - in real app this would come from your backend
const mockAgent = {
  id: '1',
  name: 'Sarah Wanjiku',
  email: 'sarah@evanskenya.com',
  phone: '+254791942327',
  whatsapp: '+254791942327',
  image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  bio: 'With over 8 years of experience in the Kenyan real estate market, Sarah specializes in luxury residential properties and commercial investments. She has a deep understanding of the Nairobi market and has helped over 200 families find their perfect homes.',
  specializations: ['Luxury Homes', 'Commercial Properties', 'Investment Properties', 'First-time Buyers'],
  experience: 8,
  propertiesSold: 250,
  rating: 4.9,
  location: 'Nairobi, Kenya',
  languages: ['English', 'Swahili', 'Kikuyu'],
  achievements: [
    'Top Agent 2023',
    'Excellence in Customer Service',
    'Real Estate License #RE2021001'
  ]
};

const mockTestimonials = [
  {
    name: 'John Kamau',
    role: 'Property Investor',
    content: 'Sarah helped me find the perfect investment property in Westlands. Her market knowledge and negotiation skills saved me over KSh 2M on the purchase.',
    rating: 5
  },
  {
    name: 'Mary Ochieng',
    role: 'First-time Buyer',
    content: 'As a first-time buyer, I was nervous about the process. Sarah guided me through every step and made sure I understood everything. Highly recommended!',
    rating: 5
  },
  {
    name: 'David Mwangi',
    role: 'Commercial Client',
    content: 'Professional, knowledgeable, and always available. Sarah found us the perfect office space in record time.',
    rating: 5
  }
];

const AgentPage = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const [agentProperties, setAgentProperties] = useState<PropertyCardProps[]>([]);

  // Mock agent properties - in real app, fetch from backend
  useEffect(() => {
    // Mock data for agent properties
    const mockProperties: PropertyCardProps[] = [
      {
        id: '1',
        title: 'Luxury Villa in Karen',
        price: 'KSh 85,000,000',
        location: 'Karen, Nairobi',
        bedrooms: 5,
        bathrooms: 4,
        area: 450,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
        propertyType: 'Residential',
        description: 'Stunning luxury villa with panoramic views'
      },
      {
        id: '2',
        title: 'Modern Apartment in Westlands',
        price: 'KSh 15,000,000',
        location: 'Westlands, Nairobi',
        bedrooms: 3,
        bathrooms: 2,
        area: 180,
        image: 'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff',
        propertyType: 'Residential',
        description: 'Contemporary apartment in prime location'
      },
      {
        id: '3',
        title: 'Commercial Office Space',
        price: 'KSh 45,000,000',
        location: 'CBD, Nairobi',
        bedrooms: 0,
        bathrooms: 3,
        area: 320,
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
        propertyType: 'Commercial',
        description: 'Prime office space in the heart of Nairobi'
      }
    ];
    
    setAgentProperties(mockProperties);
  }, [agentId]);

  const handleWhatsAppClick = () => {
    const message = `Hi ${mockAgent.name}, I'm interested in discussing properties with you.`;
    const cleanNumber = mockAgent.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCallClick = () => {
    window.location.href = `tel:${mockAgent.phone}`;
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${mockAgent.email}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHelmet 
        title={`${mockAgent.name} - Real Estate Agent | Evans Kenya Homes`}
        description={`Connect with ${mockAgent.name}, experienced real estate agent specializing in ${mockAgent.specializations.join(', ')}. View properties and get expert advice.`}
        keywords={`${mockAgent.name}, real estate agent Kenya, property agent Nairobi, ${mockAgent.specializations.join(', ')}`}
      />
      
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
              <Link to="/" className="text-luxury-slate hover:text-luxury-navy transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link to="/agents" className="text-luxury-slate hover:text-luxury-navy transition-colors">
                Agents
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-luxury-navy font-medium">{mockAgent.name}</span>
            </nav>
          </div>
        </div>

        {/* Back Button */}
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            className="flex items-center text-luxury-slate hover:text-luxury-navy transition-colors"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to agents
          </Button>
        </div>

        {/* Agent Profile Header */}
        <div className="bg-gradient-to-r from-luxury-navy to-luxury-slate text-white">
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Agent Photo */}
              <div className="relative">
                <img
                  src={mockAgent.image}
                  alt={mockAgent.name}
                  className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-white/20"
                />
                <div className="absolute -bottom-2 -right-2 bg-luxury-gold rounded-full p-2">
                  <Award className="h-6 w-6 text-luxury-navy" />
                </div>
              </div>
              
              {/* Agent Info */}
              <div className="text-center lg:text-left flex-1">
                <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-2">{mockAgent.name}</h1>
                <p className="text-xl text-white/90 mb-4">Licensed Real Estate Professional</p>
                
                <div className="flex items-center justify-center lg:justify-start text-white/80 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{mockAgent.location}</span>
                </div>
                
                <div className="flex items-center justify-center lg:justify-start mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(mockAgent.rating) ? 'text-luxury-gold fill-current' : 'text-white/30'}`}
                    />
                  ))}
                  <span className="ml-2 text-white/90">{mockAgent.rating} ({mockAgent.propertiesSold}+ reviews)</span>
                </div>

                {/* Contact Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Button
                    onClick={handleWhatsAppClick}
                    className="bg-green-600 hover:bg-green-700 text-white px-6"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp Chat
                  </Button>
                  
                  <Button
                    onClick={handleCallClick}
                    variant="outline"
                    className="border-white text-white hover:bg-white/20 px-6"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  
                  <Button
                    onClick={handleEmailClick}
                    variant="outline"
                    className="border-white text-white hover:bg-white/20 px-6"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-serif font-semibold text-luxury-navy mb-4">About {mockAgent.name}</h2>
                  <p className="text-luxury-slate leading-relaxed mb-6">{mockAgent.bio}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-luxury-cream/30 rounded-lg">
                      <div className="text-2xl font-bold text-luxury-navy">{mockAgent.experience}+</div>
                      <div className="text-sm text-luxury-slate">Years Experience</div>
                    </div>
                    <div className="text-center p-4 bg-luxury-cream/30 rounded-lg">
                      <div className="text-2xl font-bold text-luxury-navy">{mockAgent.propertiesSold}+</div>
                      <div className="text-sm text-luxury-slate">Properties Sold</div>
                    </div>
                    <div className="text-center p-4 bg-luxury-cream/30 rounded-lg">
                      <div className="text-2xl font-bold text-luxury-navy">{mockAgent.rating}★</div>
                      <div className="text-sm text-luxury-slate">Client Rating</div>
                    </div>
                    <div className="text-center p-4 bg-luxury-cream/30 rounded-lg">
                      <div className="text-2xl font-bold text-luxury-navy">100%</div>
                      <div className="text-sm text-luxury-slate">Satisfaction</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-luxury-navy mb-2">Specializations</h3>
                      <div className="flex flex-wrap gap-2">
                        {mockAgent.specializations.map((spec, index) => (
                          <Badge key={index} variant="outline" className="bg-luxury-cream/50">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-luxury-navy mb-2">Languages</h3>
                      <p className="text-luxury-slate">{mockAgent.languages.join(', ')}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-luxury-navy mb-2">Achievements</h3>
                      <ul className="list-disc list-inside text-luxury-slate space-y-1">
                        {mockAgent.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Properties Section */}
              <div>
                <h2 className="text-2xl font-serif font-semibold text-luxury-navy mb-6">
                  Properties by {mockAgent.name}
                </h2>
                
                {agentProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {agentProperties.map((property) => (
                      <PropertyCard key={property.id} {...property} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="h-12 w-12 text-luxury-navy/30 mx-auto mb-4" />
                    <p className="text-luxury-slate">No properties currently listed by this agent.</p>
                  </div>
                )}
              </div>

              {/* Testimonials */}
              <div>
                <h2 className="text-2xl font-serif font-semibold text-luxury-navy mb-6">
                  Client Testimonials
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockTestimonials.map((testimonial, index) => (
                    <TestimonialCard key={index} {...testimonial} />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-luxury-navy mb-4">Get in Touch</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-luxury-navy mr-3" />
                      <span className="text-luxury-slate">{mockAgent.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-luxury-navy mr-3" />
                      <span className="text-luxury-slate">{mockAgent.email}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-luxury-navy mr-3" />
                      <span className="text-luxury-slate">{mockAgent.location}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handleWhatsAppClick}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                    
                    <Button
                      onClick={handleCallClick}
                      variant="outline"
                      className="w-full text-luxury-navy border-luxury-navy hover:bg-luxury-navy/10"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                    
                    <Button
                      onClick={handleEmailClick}
                      variant="outline"
                      className="w-full text-luxury-navy border-luxury-navy hover:bg-luxury-navy/10"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-xs text-luxury-slate text-center">
                      Available Monday - Saturday<br />
                      9:00 AM - 6:00 PM EAT
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Facts */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-luxury-navy mb-4">Quick Facts</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-luxury-slate">License #:</span>
                      <span className="font-medium">RE2021001</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-luxury-slate">Response Time:</span>
                      <span className="font-medium">&lt; 30 mins</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-luxury-slate">Active Listings:</span>
                      <span className="font-medium">{agentProperties.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-luxury-slate">Service Areas:</span>
                      <span className="font-medium">Nairobi &amp; Suburbs</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AgentPage;
