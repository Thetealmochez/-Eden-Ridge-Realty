
import { Button } from "@/components/ui/button";
import { Check, PhoneCall, MapPin, Clock } from "lucide-react";

const features = [
  "Premium Residential Properties",
  "High-End Commercial Real Estate",
  "Exclusive Gated Communities",
  "Investment Opportunities",
  "Serviced Apartments",
  "Beachfront & Lakeside Estates",
  "Smart Home Technologies",
  "Bespoke Property Management"
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-luxury-navy mb-4 gold-underline">
              About Evans Kenya Homes
            </h2>
            <p className="text-luxury-slate mb-6 leading-relaxed">
              For over a decade, Evans Kenya Homes has been the premier luxury real estate agency serving Kenya's most discerning clients. We specialize in high-end residential homes, luxury estates, commercial properties, and investment opportunities across the country's most prestigious locations.
            </p>
            <p className="text-luxury-slate mb-8 leading-relaxed">
              Led by Evans, a licensed real estate professional with extensive knowledge of Kenya's premium property market, our team provides personalized service and expert guidance to ensure you find the perfect property that meets your unique needs and investment goals.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-luxury-gold shrink-0 mr-2 mt-1" />
                  <span className="text-luxury-slate">{feature}</span>
                </div>
              ))}
            </div>
            
            <Button className="bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-navy px-8 py-6 h-auto">
              Learn More About Us
            </Button>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-xl">
            <div className="relative h-full w-full">
              <img 
                src="/images/agent.jpg" 
                alt="Evans - Luxury Real Estate Agent" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-luxury-navy/90 p-8">
                <h3 className="text-xl font-semibold text-white mb-2">Evans Mwangi</h3>
                <p className="text-white/80 mb-6">Founder & Lead Real Estate Consultant</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <PhoneCall className="h-5 w-5 text-luxury-gold mr-3" />
                    <div>
                      <p className="text-white/70 text-xs">Call Us</p>
                      <p className="text-white">+254 700 123 456</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-luxury-gold mr-3" />
                    <div>
                      <p className="text-white/70 text-xs">Location</p>
                      <p className="text-white">Nairobi, Kenya</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-luxury-gold mr-3" />
                    <div>
                      <p className="text-white/70 text-xs">Hours</p>
                      <p className="text-white">24/7 Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
