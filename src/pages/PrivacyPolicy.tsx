
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import SkipToContent from "@/components/SkipToContent";

const PrivacyPolicy = () => {
  return (
    <>
      <PageMeta 
        title="Privacy Policy | Eden Ridge Realty - Data Protection & Privacy"
        description="Learn about how Eden Ridge Realty collects, uses, and protects your personal information in compliance with GDPR and Kenyan Data Protection Act."
        keywords="privacy policy, data protection, GDPR, Kenya Data Protection Act, Eden Ridge Realty privacy"
      />
      <SkipToContent />
      <Navbar />
      
      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-semibold text-luxury-navy mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none text-luxury-slate">
              <p className="text-luxury-slate mb-8 text-lg">
                <strong>Last Updated:</strong> January 2, 2025
              </p>
              
              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-luxury-navy mt-8 mb-4">1. Introduction</h2>
                <p>
                  Eden Ridge Realty ("we," "our," or "us") is committed to protecting your privacy and personal data. 
                  This privacy policy explains how we collect, use, store, and protect your information when you visit 
                  our website or use our services. We comply with the General Data Protection Regulation (GDPR) and 
                  the Kenya Data Protection Act, 2019.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-luxury-navy mt-8 mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-medium text-luxury-navy mt-6 mb-3">2.1 Personal Information</h3>
                <p>We collect the following personal information when you interact with our website or services:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li><strong>Contact Information:</strong> Name, email address, phone number, and physical address</li>
                  <li><strong>Property Preferences:</strong> Budget range, preferred locations, property type, and specific requirements</li>
                  <li><strong>Communication Data:</strong> Messages, inquiries, and correspondence through contact forms, WhatsApp, or email</li>
                  <li><strong>Identification Data:</strong> Information required for property transactions and legal compliance</li>
                </ul>

                <h3 className="text-xl font-medium text-luxury-navy mt-6 mb-3">2.2 Technical Information</h3>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li><strong>Device Information:</strong> IP address, browser type and version, operating system</li>
                  <li><strong>Usage Data:</strong> Pages visited, time spent on site, click patterns, and navigation paths</li>
                  <li><strong>Cookies and Tracking:</strong> Website performance data, user preferences, and session information</li>
                </ul>

                <h3 className="text-xl font-medium text-luxury-navy mt-6 mb-3">2.3 Third-Party Data</h3>
                <p>We may receive information about you from:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Social media platforms when you interact with our profiles</li>
                  <li>Property listing platforms and partner websites</li>
                  <li>Public records and property databases</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-luxury-navy mt-8 mb-4">3. How We Use Your Information</h2>
                <p>We use your personal information for the following purposes:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li><strong>Property Services:</strong> To provide property search, valuation, and transaction services</li>
                  <li><strong>Communication:</strong> To respond to inquiries, provide updates, and maintain customer relationships</li>
                  <li><strong>Marketing:</strong> To send relevant property listings, market updates, and promotional materials (with your consent)</li>
                  <li><strong>Legal Compliance:</strong> To meet regulatory requirements and prevent fraud</li>
                  <li><strong>Website Improvement:</strong> To analyze usage patterns and enhance user experience</li>
                  <li><strong>Customer Support:</strong> To provide assistance and resolve issues</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-luxury-navy mt-8 mb-4">4. Data Storage and Protection</h2>
                
                <h3 className="text-xl font-medium text-luxury-navy mt-6 mb-3">4.1 Storage Location</h3>
                <p>
                  Your data is stored securely on servers provided by Supabase, with data centers that comply with 
                  international security standards. Some data may be processed in the European Union and United States.
                </p>

                <h3 className="text-xl font-medium text-luxury-navy mt-6 mb-3">4.2 Security Measures</h3>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>SSL/TLS encryption for data transmission</li>
                  <li>Secure database storage with access controls</li>
                  <li>Regular security audits and updates</li>
                  <li>Staff training on data protection practices</li>
                  <li>Multi-factor authentication for administrative access</li>
                </ul>

                <h3 className="text-xl font-medium text-luxury-navy mt-6 mb-3">4.3 Data Retention</h3>
                <p>
                  We retain your personal data for as long as necessary to provide our services and comply with legal 
                  obligations. Typically, we keep contact information for 7 years after the last interaction, unless 
                  you request earlier deletion.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-luxury-navy mt-8 mb-4">5. Third-Party Tools and Integrations</h2>
                <p>We use the following third-party services that may collect or process your data:</p>
                
                <h3 className="text-xl font-medium text-luxury-navy mt-6 mb-3">5.1 Website Analytics</h3>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li><strong>Google Analytics:</strong> For website traffic analysis and user behavior insights</li>
                  <li><strong>Cookie tracking:</strong> To improve website performance and user experience</li>
                </ul>

                <h3 className="text-xl font-medium text-luxury-navy mt-6 mb-3">5.2 Communication Tools</h3>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li><strong>WhatsApp Business:</strong> For instant customer communication</li>
                  <li><strong>Email services:</strong> For sending property updates and correspondence</li>
                  <li><strong>AI Chat Assistant:</strong> For automated customer support and lead qualification</li>
                </ul>

                <h3 className="text-xl font-medium text-luxury-navy mt-6 mb-3">5.3 Infrastructure Services</h3>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li><strong>Supabase:</strong> Database and authentication services</li>
                  <li><strong>Lovable:</strong> Website hosting and deployment</li>
                  <li><strong>CDN services:</strong> For fast content delivery</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-luxury-navy mt-8 mb-4">6. Cookies and Tracking Technologies</h2>
                <p>
                  We use cookies and similar technologies to enhance your browsing experience. You can control cookie 
                  preferences through our cookie consent banner or your browser settings. Essential cookies are necessary 
                  for website functionality and cannot be disabled.
                </p>
                
                <h3 className="text-xl font-medium text-luxury-navy mt-6 mb-3">Types of Cookies We Use:</h3>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand website usage</li>
                  <li><strong>Marketing Cookies:</strong> Used for targeted advertising (with consent)</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-luxury-navy mt-8 mb-4">7. Your Rights</h2>
                <p>Under GDPR and the Kenya Data Protection Act, you have the following rights:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li><strong>Right of Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                  <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                  <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
                  <li><strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
                  <li><strong>Right to Object:</strong> Opt-out of marketing communications and data processing</li>
                  <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
                </ul>
                
                <p className="mt-4">
                  To exercise any of these rights, please contact us using the information provided below. 
                  We will respond to your request within 30 days.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-luxury-navy mt-8 mb-4">8. Data Sharing and Disclosure</h2>
                <p>We do not sell your personal data. We may share your information in the following circumstances:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li><strong>Service Providers:</strong> With trusted partners who help us provide our services</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our legal rights</li>
                  <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
                  <li><strong>Consent:</strong> When you have given explicit consent for data sharing</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-luxury-navy mt-8 mb-4">9. International Data Transfers</h2>
                <p>
                  Some of our service providers may be located outside Kenya. When we transfer your data internationally, 
                  we ensure appropriate safeguards are in place to protect your privacy rights in accordance with 
                  applicable data protection laws.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-luxury-navy mt-8 mb-4">10. Children's Privacy</h2>
                <p>
                  Our services are not intended for individuals under 18 years of age. We do not knowingly collect 
                  personal information from children. If we become aware that we have collected information from a 
                  child, we will take steps to delete such information promptly.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-luxury-navy mt-8 mb-4">11. Changes to This Privacy Policy</h2>
                <p>
                  We may update this privacy policy from time to time to reflect changes in our practices or legal 
                  requirements. We will notify you of any material changes by posting the updated policy on our website 
                  and updating the "Last Updated" date. Your continued use of our services after such changes constitutes 
                  acceptance of the updated policy.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-luxury-navy mt-8 mb-4">12. Contact Information</h2>
                <p>
                  If you have any questions, concerns, or requests regarding this privacy policy or our data practices, 
                  please contact us:
                </p>
                
                <div className="bg-luxury-navy/5 rounded-lg p-6 mt-6">
                  <p className="mb-4"><strong>Eden Ridge Realty</strong></p>
                  <p className="mb-2">
                    <strong>Address:</strong> Eden Ridge Towers, 5th Floor, Upperhill, Nairobi, Kenya
                  </p>
                  <p className="mb-2">
                    <strong>Phone:</strong> <a href="tel:+254791942327" className="text-luxury-navy hover:underline">+254 791 942 327</a>
                  </p>
                  <p className="mb-2">
                    <strong>Email:</strong> <a href="mailto:privacy@evanaproperties.co.ke" className="text-luxury-navy hover:underline">privacy@evanaproperties.co.ke</a>
                  </p>
                  <p className="mb-2">
                    <strong>General Inquiries:</strong> <a href="mailto:info@evanaproperties.co.ke" className="text-luxury-navy hover:underline">info@evanaproperties.co.ke</a>
                  </p>
                  <p className="mb-2">
                    <strong>Data Protection Officer:</strong> <a href="mailto:dpo@evanaproperties.co.ke" className="text-luxury-navy hover:underline">dpo@evanaproperties.co.ke</a>
                  </p>
                </div>
                
                <p className="mt-6">
                  <strong>Regulatory Authorities:</strong>
                </p>
                <p className="mt-2">
                  You also have the right to lodge a complaint with the Office of the Data Protection Commissioner 
                  of Kenya if you believe we have not handled your personal data appropriately.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-luxury-navy mt-8 mb-4">13. Consent</h2>
                <p>
                  By using our website and services, you consent to the collection, use, and processing of your 
                  personal data as described in this privacy policy. You may withdraw your consent at any time by 
                  contacting us using the information provided above.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
