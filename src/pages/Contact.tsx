
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageMeta from "@/components/PageMeta";
import ContactForm from "@/components/ContactForm";
import SkipToContent from "@/components/SkipToContent";
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      details: [
        "Eden Ridge Towers, 5th Floor",
        "Upperhill, Nairobi",
        "Kenya"
      ]
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [
        "+254 791 942 327",
        "+254 791 942 327"
      ]
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "info@evanaproperties.co.ke",
        "sales@evanaproperties.co.ke"
      ]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 8:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 4:00 PM",
        "Sunday: Closed"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta 
        title="Contact Us | Eden Ridge Realty - Get in Touch" 
        description="Contact Eden Ridge Realty for all your real estate needs. Visit our office, call us, or send a message. We're here to help you find your perfect property."
        keywords="contact Eden Ridge Realty, Nairobi real estate contact, property consultation, real estate agent contact"
      />
      <SkipToContent />
      <Navbar />
      
      <main id="main-content" className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-luxury-navy py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              Ready to find your dream property? We're here to help you every step of the way
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover-lift">
                    <div className="bg-luxury-gold/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-luxury-gold" />
                    </div>
                    <h3 className="text-lg font-semibold text-luxury-navy mb-3">
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-luxury-slate text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Form and Map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-serif font-semibold text-luxury-navy mb-6">
                  Send us a Message
                </h2>
                <ContactForm />
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-full bg-gray-200 flex items-center justify-center min-h-[400px]">
                  <div className="text-center p-8">
                    <MapPin className="h-16 w-16 text-luxury-navy/50 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-luxury-navy mb-2">
                      Find Us Here
                    </h3>
                    <p className="text-luxury-slate">
                      Eden Ridge Towers, 5th Floor<br />
                      Upperhill, Nairobi, Kenya
                    </p>
                    <p className="text-sm text-luxury-slate mt-4">
                      Interactive map coming soon
                    </p>
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

export default Contact;
