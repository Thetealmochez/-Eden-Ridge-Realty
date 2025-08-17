
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { contactFormSchema } from '@/lib/validation';
import { rateLimiter, SECURITY_CONFIG } from '@/lib/security';
import { sanitizeInput } from '@/lib/validation';
import { securityValidation } from '@/lib/security-validation';

interface ScheduleViewingProps {
  propertyId?: string;
  propertyTitle?: string;
  className?: string;
}

const ScheduleViewing = ({ propertyId, propertyTitle, className }: ScheduleViewingProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredTime: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = name !== 'message' ? sanitizeInput(value) : value;
    setFormData({
      ...formData,
      [name]: sanitizedValue
    });
  };

  const handleTimeChange = (value: string) => {
    setFormData({
      ...formData,
      preferredTime: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast({
        title: "Please select a date",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Rate limiting check
      const clientId = window.navigator.userAgent + window.navigator.language;
      const isAllowed = await rateLimiter.isAllowed(
        clientId, 
        SECURITY_CONFIG.RATE_LIMITS.contact
      );
      
      if (!isAllowed) {
        toast({
          title: "Too many requests",
          description: "Please wait before submitting another request.",
          variant: "destructive",
        });
        return;
      }

      // Comprehensive validation using Zod
      const validationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      };

      const validationResult = contactFormSchema.safeParse(validationData);
      if (!validationResult.success) {
        const errorMessage = validationResult.error.errors[0]?.message || "Please check your input";
        toast({
          title: "Validation Error",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      // Additional security validation
      const nameValidation = securityValidation.validateInput(formData.name, 'string');
      const emailValidation = securityValidation.validateInput(formData.email, 'string');
      const phoneValidation = securityValidation.validateInput(formData.phone, 'string');
      const messageValidation = securityValidation.validateInput(formData.message || '', 'string');

      if (!nameValidation.isValid || !emailValidation.isValid || !phoneValidation.isValid || !messageValidation.isValid) {
        toast({
          title: "Security Validation Failed",
          description: "Please check your input for invalid characters.",
          variant: "destructive",
        });
        return;
      }

      // Format the date
      const formattedDate = format(date, 'yyyy-MM-dd');
      
      // Sanitize all inputs before database insertion
      const sanitizedData = {
        name: nameValidation.sanitized,
        email: emailValidation.sanitized,
        phone: phoneValidation.sanitized,
        message: `Viewing request for ${propertyTitle || 'property'} on ${formattedDate} at ${formData.preferredTime}. ${messageValidation.sanitized}`,
        property_id: propertyId,
        status: 'new'
      };

      // Insert the viewing request into the database
      const { data, error } = await supabase
        .from('leads')
        .insert([sanitizedData]);
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Viewing request submitted",
        description: "We'll contact you shortly to confirm your appointment.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferredTime: '',
        message: ''
      });
      setDate(undefined);
    } catch (error) {
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
    <div className={cn("bg-white shadow-lg rounded-lg p-6", className)}>
      <h3 className="text-xl font-semibold text-luxury-navy mb-4">
        Schedule a Viewing
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Preferred Date*</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 3))}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label>Preferred Time*</Label>
            <Select value={formData.preferredTime} onValueChange={handleTimeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</SelectItem>
                <SelectItem value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</SelectItem>
                <SelectItem value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</SelectItem>
                <SelectItem value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Additional Notes</Label>
          <Textarea 
            id="message" 
            name="message"
            placeholder="Any special requests or questions?"
            className="min-h-24"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-luxury-navy hover:bg-luxury-navy/90 h-12"
          disabled={isSubmitting || !date || !formData.preferredTime}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Schedule Viewing"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ScheduleViewing;
