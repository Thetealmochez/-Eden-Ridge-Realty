import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MessageSquare, Send } from 'lucide-react';

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your interest. Our team will contact you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: '',
        budget: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-luxury-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-luxury-cream text-lg mb-8">
              Get in touch with our expert team today. We're here to help you navigate 
              Kenya's luxury real estate market and find the perfect property for your needs.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-luxury-gold p-3 rounded-full">
                  <Phone className="w-6 h-6 text-luxury-navy" />
                </div>
                <div>
                  <h3 className="font-semibold">Call Us</h3>
                  <p className="text-luxury-cream">+254 700 123 456</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-luxury-gold p-3 rounded-full">
                  <Mail className="w-6 h-6 text-luxury-navy" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <p className="text-luxury-cream">info@edenridgerealty.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-luxury-gold p-3 rounded-full">
                  <MessageSquare className="w-6 h-6 text-luxury-navy" />
                </div>
                <div>
                  <h3 className="font-semibold">Available</h3>
                  <p className="text-luxury-cream">Monday - Saturday, 8AM - 6PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-luxury-navy mb-6">Get Expert Consultation</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select value={formData.interest} onValueChange={(value) => handleInputChange('interest', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Property Interest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buying">Buying</SelectItem>
                    <SelectItem value="selling">Selling</SelectItem>
                    <SelectItem value="renting">Renting</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Budget Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-10m">Up to 10M</SelectItem>
                    <SelectItem value="10m-25m">10M - 25M</SelectItem>
                    <SelectItem value="25m-50m">25M - 50M</SelectItem>
                    <SelectItem value="50m-100m">50M - 100M</SelectItem>
                    <SelectItem value="100m+">100M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Textarea
                placeholder="Tell us about your property requirements..."
                rows={4}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
              />
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-navy h-12"
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;