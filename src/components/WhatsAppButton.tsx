
import { MessageSquare, X } from "lucide-react";
import { useState, useEffect } from "react";

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const phoneNumber = "+254791942327";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hello,%20I'm%20interested%20in%20learning%20more%20about%20your%20luxury%20properties%20in%20Kenya.`;
  
  // Show WhatsApp button after a short delay (better UX)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Close chat window when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.whatsapp-container') && !target.closest('.whatsapp-button')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  if (!isVisible) return null;
  
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="whatsapp-button fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-all hover:scale-110"
        aria-label="Contact via WhatsApp"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
      
      {isOpen && (
        <div className="whatsapp-container fixed bottom-24 right-6 z-50 bg-white rounded-lg shadow-xl w-80 animate-fade-in">
          <div className="bg-green-500 rounded-t-lg p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-white rounded-full p-1.5 mr-3">
                <MessageSquare className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-white">WhatsApp Chat</h3>
                <p className="text-xs text-white/80">Online | Reply within 10 min</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-white/80"
              aria-label="Close chat window"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-4">
            <div className="bg-gray-100 rounded-lg p-3 mb-3 ml-0 mr-8">
              <p className="text-sm font-medium text-gray-800">Eden Ridge Realty</p>
              <p className="text-sm text-gray-600">
                Hello! 👋 Looking for your dream property in Kenya? I'm here to help! How can I assist you today?
              </p>
              <p className="text-xs text-gray-500 text-right">10:30 AM</p>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-100">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Common Inquiries:</h4>
              <div className="flex flex-wrap gap-2">
                <button 
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs rounded-full px-3 py-1"
                  onClick={() => window.open(`${whatsappUrl} I'd like to inquire about available properties in Nairobi.`, '_blank', 'noopener,noreferrer')}
                >
                  Properties in Nairobi
                </button>
                <button 
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs rounded-full px-3 py-1"
                  onClick={() => window.open(`${whatsappUrl} I'm interested in scheduling a property viewing.`, '_blank', 'noopener,noreferrer')}
                >
                  Schedule a viewing
                </button>
                <button 
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs rounded-full px-3 py-1"
                  onClick={() => window.open(`${whatsappUrl} Do you have any investment opportunities available?`, '_blank', 'noopener,noreferrer')}
                >
                  Investment opportunities
                </button>
              </div>
            </div>
            
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white w-full py-3 px-4 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Start Conversation
            </a>
            
            <p className="text-xs text-center text-gray-500 mt-3">
              Our team is available 24/7 to assist you
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;
