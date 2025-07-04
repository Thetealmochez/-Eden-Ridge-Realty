
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { secureStorage } from "@/lib/security";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = secureStorage.getItem("cookie-consent");
    if (!consent) {
      // Only show banner after a short delay to improve UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    secureStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    secureStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg md:flex md:items-center md:justify-between">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="flex-1 max-w-2xl mr-4">
          <p className="text-sm text-luxury-slate">
            We use cookies to enhance your experience on our website. By continuing to browse, you agree to our{" "}
            <a href="/privacy-policy" className="text-luxury-navy underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <button
          onClick={() => setShowBanner(false)}
          className="p-1 rounded-full hover:bg-gray-100 md:hidden"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>
      <div className="flex space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={declineCookies}
          className="border-luxury-navy text-luxury-navy"
        >
          Decline
        </Button>
        <Button
          size="sm"
          onClick={acceptCookies}
          className="bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-navy"
        >
          Accept All
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;
