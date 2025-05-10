
import { Button } from "@/components/ui/button";
import { PhoneCall, MessageSquare } from "lucide-react";

const CTASection = () => {
  // Define safe contact methods with properly formatted phone number
  const phoneNumber = "+254700000000"; // Replace with your actual phone number
  const whatsappMessage = "Hello Eden Ridge Realty, I'm interested in learning more about your properties.";
  
  // Format phone number for tel link (remove any spaces)
  const formattedPhoneNumber = phoneNumber.replace(/\s/g, "");
  
  // Create safe WhatsApp link with properly encoded message
  const whatsappLink = `https://wa.me/${formattedPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="bg-luxury-navy py-16 lg:py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
          Ready to Find Your Dream Property in Kenya?
        </h2>
        <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
          Connect with Eden Ridge Realty today for personalized assistance with premium residential and commercial properties across Kenya's most prestigious locations.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-navy h-auto py-6 px-8 text-lg"
            onClick={() => {
              // Use safe method to initiate phone call
              window.location.href = `tel:${formattedPhoneNumber}`;
            }}
          >
            <PhoneCall className="mr-2 h-5 w-5" />
            Call Us Now
          </Button>
          
          <Button 
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white hover:text-luxury-navy h-auto py-6 px-8 text-lg"
            onClick={() => {
              // Open WhatsApp in new tab with security attributes
              window.open(whatsappLink, "_blank", "noopener,noreferrer");
            }}
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Message on WhatsApp
          </Button>
        </div>

        <p className="text-white/70 mt-8">
          Available 24/7 for all your real estate inquiries
        </p>
      </div>
    </section>
  );
};

export default CTASection;
