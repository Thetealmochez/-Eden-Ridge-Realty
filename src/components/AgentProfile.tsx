
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, Mail, MapPin, Star, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AgentProfileProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  image?: string;
  bio?: string;
  specializations?: string[];
  experience?: number;
  propertiesSold?: number;
  rating?: number;
  location?: string;
  languages?: string[];
}

const AgentProfile: React.FC<AgentProfileProps> = ({
  id,
  name,
  email,
  phone,
  whatsapp,
  image,
  bio,
  specializations = [],
  experience = 0,
  propertiesSold = 0,
  rating = 5,
  location,
  languages = []
}) => {
  const handleWhatsAppClick = () => {
    const message = `Hi ${name}, I'm interested in discussing properties with you.`;
    const whatsappNumber = whatsapp || phone;
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCallClick = () => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <Card className="overflow-hidden hover-lift border-0 shadow-lg">
      <CardContent className="p-0">
        {/* Agent Header */}
        <div className="bg-gradient-to-r from-luxury-navy to-luxury-slate p-6 text-white">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="relative">
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white/20"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-luxury-gold flex items-center justify-center text-luxury-navy font-bold text-2xl border-4 border-white/20">
                  {name.charAt(0)}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 bg-luxury-gold rounded-full p-1">
                <Award className="h-4 w-4 text-luxury-navy" />
              </div>
            </div>
            
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-xl font-semibold mb-1">{name}</h3>
              <p className="text-white/80 text-sm mb-2">Licensed Real Estate Agent</p>
              
              {location && (
                <div className="flex items-center justify-center sm:justify-start text-white/70 text-sm mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {location}
                </div>
              )}
              
              <div className="flex items-center justify-center sm:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < rating ? 'text-luxury-gold fill-current' : 'text-white/30'}`}
                  />
                ))}
                <span className="ml-1 text-sm text-white/80">({rating}.0)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Agent Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-lg font-bold text-luxury-navy">{experience}+</div>
              <div className="text-xs text-luxury-slate">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-luxury-navy">{propertiesSold}+</div>
              <div className="text-xs text-luxury-slate">Properties Sold</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-luxury-navy">5★</div>
              <div className="text-xs text-luxury-slate">Client Rating</div>
            </div>
          </div>

          {/* Bio */}
          {bio && (
            <div className="mb-6">
              <p className="text-sm text-luxury-slate leading-relaxed">{bio}</p>
            </div>
          )}

          {/* Specializations */}
          {specializations.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-luxury-navy mb-2">Specializations</h4>
              <div className="flex flex-wrap gap-2">
                {specializations.map((spec, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-luxury-navy mb-2">Languages</h4>
              <p className="text-sm text-luxury-slate">{languages.join(', ')}</p>
            </div>
          )}

          {/* Contact Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={handleCallClick}
                variant="outline"
                className="text-luxury-navy border-luxury-navy hover:bg-luxury-navy/10"
              >
                <Phone className="h-4 w-4 mr-1" />
                Call
              </Button>
              
              <Button
                onClick={handleEmailClick}
                variant="outline"
                className="text-luxury-navy border-luxury-navy hover:bg-luxury-navy/10"
              >
                <Mail className="h-4 w-4 mr-1" />
                Email
              </Button>
            </div>
            
            <Link to={`/agent/${id}`} className="block">
              <Button variant="ghost" className="w-full text-luxury-navy hover:bg-luxury-navy/10">
                <TrendingUp className="h-4 w-4 mr-2" />
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentProfile;
