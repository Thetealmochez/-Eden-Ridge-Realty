
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, UserCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleSignOut = async () => {
    try {
      await signOut();
      // No need to navigate, the auth listener will handle it
    } catch (error) {
      // Sign out error handled silently
    }
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-luxury-navy">
            Eden <span className="text-luxury-gold">Ridge Realty</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-luxury-slate hover:text-luxury-navy transition-colors ${location.pathname === '/' ? 'font-semibold text-luxury-navy' : ''}`}
            >
              Home
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-luxury-slate hover:text-luxury-navy transition-colors">
                Properties <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/properties" className="w-full">All Properties</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/locations/nairobi" className="w-full">Nairobi</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/locations/karen" className="w-full">Karen</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/locations/runda" className="w-full">Runda</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/locations/mombasa" className="w-full">Mombasa</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link 
              to="/about" 
              className={`text-luxury-slate hover:text-luxury-navy transition-colors ${location.pathname === '/about' ? 'font-semibold text-luxury-navy' : ''}`}
            >
              About
            </Link>

            <Link 
              to="/partners" 
              className={`text-luxury-slate hover:text-luxury-navy transition-colors ${location.pathname === '/partners' ? 'font-semibold text-luxury-navy' : ''}`}
            >
              Partners
            </Link>
            
            <a 
              href="#contact"
              className="text-luxury-slate hover:text-luxury-navy transition-colors"
            >
              Contact
            </a>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center text-luxury-navy">
                    <UserCircle className="mr-1 h-5 w-5" />
                    <span className="max-w-[100px] truncate">
                      {user.email?.split('@')[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isAdmin && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="w-full">Admin Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button className="bg-luxury-navy hover:bg-luxury-navy/90">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-luxury-slate hover:text-luxury-navy ${location.pathname === '/' ? 'font-semibold text-luxury-navy' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/properties" 
                className={`text-luxury-slate hover:text-luxury-navy ${location.pathname === '/properties' ? 'font-semibold text-luxury-navy' : ''}`}
              >
                Properties
              </Link>
              <div className="pl-4 flex flex-col space-y-2">
                <Link 
                  to="/locations/nairobi" 
                  className="text-luxury-slate hover:text-luxury-navy text-sm"
                >
                  Nairobi
                </Link>
                <Link 
                  to="/locations/karen" 
                  className="text-luxury-slate hover:text-luxury-navy text-sm"
                >
                  Karen
                </Link>
                <Link 
                  to="/locations/runda" 
                  className="text-luxury-slate hover:text-luxury-navy text-sm"
                >
                  Runda
                </Link>
                <Link 
                  to="/locations/mombasa" 
                  className="text-luxury-slate hover:text-luxury-navy text-sm"
                >
                  Mombasa
                </Link>
              </div>
              <Link 
                to="/about" 
                className={`text-luxury-slate hover:text-luxury-navy ${location.pathname === '/about' ? 'font-semibold text-luxury-navy' : ''}`}
              >
                About
              </Link>
              <Link 
                to="/partners" 
                className={`text-luxury-slate hover:text-luxury-navy ${location.pathname === '/partners' ? 'font-semibold text-luxury-navy' : ''}`}
              >
                Partners
              </Link>
              <a 
                href="#contact"
                className="text-luxury-slate hover:text-luxury-navy"
              >
                Contact
              </a>
              
              {user ? (
                <>
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className="text-luxury-navy font-medium"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Button 
                    variant="outline" 
                    onClick={handleSignOut}
                    className="justify-start"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link to="/auth" className="w-full">
                  <Button className="w-full bg-luxury-navy hover:bg-luxury-navy/90">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
