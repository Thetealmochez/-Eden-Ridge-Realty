
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";

const PrivacyPolicy = () => {
  return (
    <>
      <PageMeta 
        title="Privacy Policy | Eden Ridge Realty"
        description="Learn about how Eden Ridge Realty collects, uses, and protects your personal information."
      />
      <Navbar />
      <div className="pt-24 pb-16" id="main-content">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-semibold text-luxury-navy mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-luxury-slate mb-6">Last Updated: May 10, 2025</p>
            
            <h2 className="text-2xl font-semibold text-luxury-navy mt-8 mb-4">1. Introduction</h2>
            <p>At Eden Ridge Realty ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
            
            <h2 className="text-2xl font-semibold text-luxury-navy mt-8 mb-4">2. Information We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes email address, telephone numbers, and address.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
              <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
              <li><strong>Marketing and Communications Data</strong> includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-luxury-navy mt-8 mb-4">3. How We Use Your Information</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>To register you as a new customer.</li>
              <li>To provide and manage the services you request.</li>
              <li>To manage our relationship with you.</li>
              <li>To improve our website, products/services, marketing, or customer relationships.</li>
              <li>To recommend properties or services that may be of interest to you.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-luxury-navy mt-8 mb-4">4. Cookies</h2>
            <p>We use cookies and similar tracking technologies to track the activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
            
            <h2 className="text-2xl font-semibold text-luxury-navy mt-8 mb-4">5. Data Security</h2>
            <p>We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, accessed, altered, or disclosed in an unauthorized way.</p>
            
            <h2 className="text-2xl font-semibold text-luxury-navy mt-8 mb-4">6. Your Legal Rights</h2>
            <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, or to object to processing.</p>
            
            <h2 className="text-2xl font-semibold text-luxury-navy mt-8 mb-4">7. Contact Us</h2>
            <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
            <p className="mt-2">
              <strong>Eden Ridge Realty</strong><br />
              Westlands Business Park<br />
              Nairobi, Kenya<br />
              Email: privacy@edenridgerealty.com<br />
              Phone: +254 700 123 456
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
