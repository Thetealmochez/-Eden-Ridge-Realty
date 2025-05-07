
import { MessageSquare } from "lucide-react";
import { useState } from "react";

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "+254791942327";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hello,%20I'm%20interested%20in%20learning%20more%20about%20your%20luxury%20properties%20in%20Kenya.`;
  
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 luxury-transition"
        aria-label="Contact via WhatsApp"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
      
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 bg-white rounded-lg shadow-xl p-6 w-72 animate-fade-in">
          <div className="flex items-center mb-4">
            <div className="bg-green-500 rounded-full p-2 mr-3">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Chat with Evans</h3>
              <p className="text-sm text-gray-500">Available 24/7</p>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4 text-sm">
            Ask about our premium properties or schedule a viewing at your convenience.
          </p>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white w-full py-3 px-4 rounded-lg flex items-center justify-center hover:bg-green-600 luxury-transition"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Start Chat
          </a>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;
