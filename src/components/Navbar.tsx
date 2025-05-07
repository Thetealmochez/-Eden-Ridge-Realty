
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 luxury-transition ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <h1 className={`text-2xl md:text-3xl font-semibold luxury-transition ${isScrolled ? 'text-luxury-navy' : 'text-white'}`}>
              <span className="font-bold">Evans</span> Kenya Homes
            </h1>
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#properties" className={`luxury-transition font-medium ${isScrolled ? 'text-luxury-navy hover:text-luxury-gold' : 'text-white hover:text-luxury-gold'}`}>Properties</a>
          <a href="#locations" className={`luxury-transition font-medium ${isScrolled ? 'text-luxury-navy hover:text-luxury-gold' : 'text-white hover:text-luxury-gold'}`}>Areas</a>
          <a href="#about" className={`luxury-transition font-medium ${isScrolled ? 'text-luxury-navy hover:text-luxury-gold' : 'text-white hover:text-luxury-gold'}`}>About</a>
          <a href="#contact" className={`luxury-transition font-medium ${isScrolled ? 'text-luxury-navy hover:text-luxury-gold' : 'text-white hover:text-luxury-gold'}`}>Contact</a>
          <Button variant="outline" className={`border-2 luxury-transition ${isScrolled ? 'border-luxury-navy text-luxury-navy hover:bg-luxury-navy hover:text-white' : 'border-white text-white hover:bg-white hover:text-luxury-navy'}`}>
            <Phone className="mr-2 h-4 w-4" />
            <span>+254 700 123 456</span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? 
            <X className={`h-6 w-6 ${isScrolled ? 'text-luxury-navy' : 'text-white'}`} /> : 
            <Menu className={`h-6 w-6 ${isScrolled ? 'text-luxury-navy' : 'text-white'}`} />
          }
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <a href="#properties" className="text-luxury-navy hover:text-luxury-gold py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Properties</a>
            <a href="#locations" className="text-luxury-navy hover:text-luxury-gold py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Areas</a>
            <a href="#about" className="text-luxury-navy hover:text-luxury-gold py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#contact" className="text-luxury-navy hover:text-luxury-gold py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            <Button variant="outline" className="border-2 border-luxury-navy text-luxury-navy hover:bg-luxury-navy hover:text-white w-full justify-center">
              <Phone className="mr-2 h-4 w-4" />
              <span>+254 700 123 456</span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
