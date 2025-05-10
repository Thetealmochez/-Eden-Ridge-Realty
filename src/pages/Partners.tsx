
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageMeta from "@/components/PageMeta";
import SkipToContent from "@/components/SkipToContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Building, Users, Handshake, Award, Check } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

const Partners = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    partnerType: '',
    message: '',
    agreeToTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      partnerType: value
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      agreeToTerms: checked
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.partnerType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Terms & Conditions",
        description: "Please agree to our terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Insert the partner request into the database
      const { data, error } = await supabase
        .from('leads')
        .insert([
          { 
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: `Partner request from ${formData.companyName || 'n/a'} | Type: ${formData.partnerType} | Message: ${formData.message}`,
            status: 'partner_request'
          }
        ]);
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Partnership request submitted",
        description: "Thank you for your interest! We'll contact you shortly to discuss partnership opportunities.",
      });
      
      // Reset form
      setFormData({
        name: '',
        companyName: '',
        email: '',
        phone: '',
        partnerType: '',
        message: '',
        agreeToTerms: false
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta 
        title="Partner With Us | Eden Ridge Realty" 
        description="Join Eden Ridge Realty as a partner. We offer collaboration opportunities for real estate agents, developers, and investors in Kenya's premium property market."
        keywords="real estate partnership, property agent collaboration, developer partnership, Kenya real estate, Eden Ridge Realty partners"
      />
      <SkipToContent />
      <Navbar />
      
      <main id="main-content" className="flex-grow">
        {/* Hero Section */}
        <div className="bg-luxury-navy text-white py-20 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Partner With Eden Ridge Realty</h1>
            <p className="text-xl text-white/90 mb-8">
              Join Kenya's premier real estate agency and grow your business through our exclusive partnership network
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-luxury-gold text-luxury-navy hover:bg-luxury-gold/90 h-auto py-3 px-6" 
                onClick={() => document.getElementById('partnership-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Become a Partner
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/20 h-auto py-3 px-6"
                onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Benefits
              </Button>
            </div>
          </div>
        </div>
        
        {/* Partnership Types */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-semibold text-luxury-navy text-center mb-4">Partnership Opportunities</h2>
            <div className="w-20 h-1 bg-luxury-gold mx-auto mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-all">
                <div className="bg-luxury-navy/10 p-4 inline-block rounded-full mb-6">
                  <Building className="h-8 w-8 text-luxury-navy" />
                </div>
                <h3 className="text-xl font-semibold text-luxury-navy mb-4">Real Estate Agents</h3>
                <p className="text-luxury-slate mb-6">
                  Join our network of professional agents and gain access to exclusive listings, premium clients, and industry-leading commission structures.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-luxury-gold mr-2" />
                    <span>Higher commission splits</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-luxury-gold mr-2" />
                    <span>Premium client referrals</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-luxury-gold mr-2" />
                    <span>Professional marketing support</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-all">
                <div className="bg-luxury-navy/10 p-4 inline-block rounded-full mb-6">
                  <Users className="h-8 w-8 text-luxury-navy" />
                </div>
                <h3 className="text-xl font-semibold text-luxury-navy mb-4">Property Developers</h3>
                <p className="text-luxury-slate mb-6">
                  Showcase your development projects to our extensive network of qualified buyers and investors looking for premium properties.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-luxury-gold mr-2" />
                    <span>Featured project listings</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-luxury-gold mr-2" />
                    <span>Development marketing packages</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-luxury-gold mr-2" />
                    <span>Investor network access</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-all">
                <div className="bg-luxury-navy/10 p-4 inline-block rounded-full mb-6">
                  <Handshake className="h-8 w-8 text-luxury-navy" />
                </div>
                <h3 className="text-xl font-semibold text-luxury-navy mb-4">Service Providers</h3>
                <p className="text-luxury-slate mb-6">
                  Partner with us as a preferred provider of property-related services such as furnishing, security, landscaping, or home automation.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-luxury-gold mr-2" />
                    <span>Client referrals</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-luxury-gold mr-2" />
                    <span>Co-branded marketing</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-luxury-gold mr-2" />
                    <span>Event partnership opportunities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section id="benefits" className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-semibold text-luxury-navy text-center mb-4">Why Partner With Us</h2>
            <div className="w-20 h-1 bg-luxury-gold mx-auto mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl font-semibold text-luxury-navy mb-6">Benefits For Our Partners</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-luxury-gold/10 p-3 rounded-full mr-4 mt-1">
                      <Award className="h-5 w-5 text-luxury-gold" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-luxury-navy mb-1">Premium Brand Association</h4>
                      <p className="text-luxury-slate">Align with Kenya's most trusted luxury real estate brand, enhancing your market credibility and reputation.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-luxury-gold/10 p-3 rounded-full mr-4 mt-1">
                      <Users className="h-5 w-5 text-luxury-gold" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-luxury-navy mb-1">Exclusive Network Access</h4>
                      <p className="text-luxury-slate">Connect with high-net-worth clients, international investors, and industry leaders through our extensive network.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-luxury-gold/10 p-3 rounded-full mr-4 mt-1">
                      <Building className="h-5 w-5 text-luxury-gold" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-luxury-navy mb-1">Marketing Support</h4>
                      <p className="text-luxury-slate">Leverage our professional marketing resources, including photography, virtual tours, and social media promotion.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-luxury-gold/10 p-3 rounded-full mr-4 mt-1">
                      <Handshake className="h-5 w-5 text-luxury-gold" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-luxury-navy mb-1">Growth Opportunities</h4>
                      <p className="text-luxury-slate">Expand your business through collaborative projects, co-branded initiatives, and exclusive partnership events.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-semibold text-luxury-navy">Partnership Stats</h3>
                  <p className="text-luxury-slate">Our partnership program in numbers</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-4xl font-bold text-luxury-gold mb-2">45+</div>
                    <div className="text-luxury-navy">Active Partners</div>
                  </div>
                  
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-4xl font-bold text-luxury-gold mb-2">KSh 2B+</div>
                    <div className="text-luxury-navy">Transaction Value</div>
                  </div>
                  
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-4xl font-bold text-luxury-gold mb-2">120+</div>
                    <div className="text-luxury-navy">Closed Deals</div>
                  </div>
                  
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-4xl font-bold text-luxury-gold mb-2">15%</div>
                    <div className="text-luxury-navy">Avg. Commission</div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <p className="text-center text-sm text-luxury-slate">
                    Join our growing network of successful partners and elevate your real estate business
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Form */}
        <section id="partnership-form" className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold text-luxury-navy text-center mb-4">Become A Partner</h2>
            <div className="w-20 h-1 bg-luxury-gold mx-auto mb-12"></div>
            
            <div className="bg-white shadow-lg rounded-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name*</Label>
                    <Input 
                      id="name" 
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input 
                      id="companyName" 
                      name="companyName"
                      placeholder="Your company name"
                      value={formData.companyName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address*</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number*</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      placeholder="+254 XXX XXX XXX"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="partnerType">Partnership Type*</Label>
                  <Select value={formData.partnerType} onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select partnership type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agent">Real Estate Agent</SelectItem>
                      <SelectItem value="developer">Property Developer</SelectItem>
                      <SelectItem value="service_provider">Service Provider</SelectItem>
                      <SelectItem value="investor">Investor</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Tell Us About Yourself*</Label>
                  <Textarea 
                    id="message" 
                    name="message"
                    placeholder="Share your experience, what you're looking for in a partnership, and how we can collaborate."
                    className="min-h-32"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="agreeToTerms" 
                    checked={formData.agreeToTerms} 
                    onCheckedChange={handleCheckboxChange} 
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm">
                    I agree to the Eden Ridge Realty partner terms and conditions, and consent to being contacted about partnership opportunities.
                  </Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-luxury-navy hover:bg-luxury-navy/90 h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Partnership Application"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-semibold text-luxury-navy text-center mb-4">Partner Testimonials</h2>
            <div className="w-20 h-1 bg-luxury-gold mx-auto mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="text-luxury-gold text-4xl mb-4">"</div>
                <p className="text-luxury-slate mb-6">
                  Partnering with Eden Ridge Realty transformed my real estate business. Their marketing support and client network have helped me close deals I wouldn't have accessed otherwise.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-luxury-navy rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-luxury-navy">James Mwangi</h4>
                    <p className="text-sm text-luxury-slate">Independent Agent</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="text-luxury-gold text-4xl mb-4">"</div>
                <p className="text-luxury-slate mb-6">
                  As a developer, having Eden Ridge Realty handle our property marketing has been exceptional. They understand the luxury market and consistently deliver qualified buyers.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-luxury-navy rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-luxury-navy">Sarah Njeri</h4>
                    <p className="text-sm text-luxury-slate">Apex Developments</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="text-luxury-gold text-4xl mb-4">"</div>
                <p className="text-luxury-slate mb-6">
                  Our interior design firm has gained significant exposure through Eden Ridge Realty's partner network. Their client referrals have become a major source of our business.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-luxury-navy rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-luxury-navy">Daniel Ochieng</h4>
                    <p className="text-sm text-luxury-slate">Urban Interiors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Partners;
