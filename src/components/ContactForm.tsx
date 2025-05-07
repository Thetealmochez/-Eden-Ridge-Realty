
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PhoneCall, Mail, MapPin } from "lucide-react";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prevData => ({
      ...prevData,
      interest: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Form Submitted",
      description: "Thank you for your inquiry. Evans will contact you soon!",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      interest: "",
      message: ""
    });
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-luxury-navy mb-4">
            Contact Us
          </h2>
          <div className="mx-auto w-20 h-1 bg-luxury-gold mb-6"></div>
          <p className="text-luxury-slate max-w-2xl mx-auto">
            Reach out to us for personalized assistance with your real estate needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-xl font-semibold text-luxury-navy mb-6">Get in Touch</h3>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-luxury-gold/10 p-3 rounded-full mr-4">
                    <PhoneCall className="h-5 w-5 text-luxury-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium text-luxury-navy mb-1">Phone</h4>
                    <p className="text-luxury-slate">+254 700 123 456</p>
                    <p className="text-luxury-slate">+254 700 789 012</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-luxury-gold/10 p-3 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-luxury-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium text-luxury-navy mb-1">Email</h4>
                    <p className="text-luxury-slate">info@evanskenyahomes.com</p>
                    <p className="text-luxury-slate">sales@evanskenyahomes.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-luxury-gold/10 p-3 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-luxury-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium text-luxury-navy mb-1">Office</h4>
                    <p className="text-luxury-slate">Westlands Business Park</p>
                    <p className="text-luxury-slate">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="font-medium text-luxury-navy mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-luxury-navy text-white p-2 rounded-full hover:bg-luxury-gold luxury-transition">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="bg-luxury-navy text-white p-2 rounded-full hover:bg-luxury-gold luxury-transition">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="bg-luxury-navy text-white p-2 rounded-full hover:bg-luxury-gold luxury-transition">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" className="bg-luxury-navy text-white p-2 rounded-full hover:bg-luxury-gold luxury-transition">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6.135 3H17.865C20.694 3 23 5.306 23 8.135V17.865C23 20.694 20.694 23 17.865 23H6.135C3.306 23 1 20.694 1 17.865V8.135C1 5.306 3.306 3 6.135 3ZM0 8.135C0 4.753 2.753 2 6.135 2H17.865C21.247 2 24 4.753 24 8.135V17.865C24 21.247 21.247 24 17.865 24H6.135C2.753 24 0 21.247 0 17.865V8.135Z" clipRule="evenodd"></path>
                      <path d="M12.149 8.63c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0-1.756c2.901 0 5.256 2.355 5.256 5.256s-2.355 5.256-5.256 5.256-5.256-2.355-5.256-5.256 2.355-5.256 5.256-5.256zm6.285-.316a1.309 1.309 0 11-2.618 0 1.309 1.309 0 012.618 0z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-xl font-semibold text-luxury-navy mb-6">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
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
                    <Label htmlFor="email">Email Address</Label>
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
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      placeholder="+254 XXX XXX XXX"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interest">Property Interest</Label>
                    <Select value={formData.interest} onValueChange={handleSelectChange}>
                      <SelectTrigger id="interest">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential Property</SelectItem>
                        <SelectItem value="commercial">Commercial Property</SelectItem>
                        <SelectItem value="investment">Investment Opportunity</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    name="message"
                    placeholder="Tell us about your property requirements"
                    className="min-h-32"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-luxury-navy hover:bg-luxury-navy/90 h-12">
                  Send Message
                </Button>
                
                <p className="text-xs text-center text-luxury-slate">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
