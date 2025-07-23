import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-md border-b border-gold/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center">
              <span className="text-charcoal font-bold text-xl">B</span>
            </div>
            <div>
              <h1 className="text-xl font-cormorant font-bold text-gold">Bistro Luxe</h1>
              <p className="text-xs text-warm-gray">Fine Dining Experience</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-warm-white hover:text-gold transition-colors duration-300"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('menu')}
              className="text-warm-white hover:text-gold transition-colors duration-300"
            >
              Menu
            </button>
            <button 
              onClick={() => scrollToSection('ordering')}
              className="text-warm-white hover:text-gold transition-colors duration-300"
            >
              Order Online
            </button>
            <button 
              onClick={() => scrollToSection('reservations')}
              className="text-warm-white hover:text-gold transition-colors duration-300"
            >
              Reservations
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="text-warm-white hover:text-gold transition-colors duration-300"
            >
              Gallery
            </button>
            <Link 
              to="/ai-recipe-generator"
              className="text-warm-white hover:text-gold transition-colors duration-300"
            >
              AI Recipe Generator
            </Link>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-warm-white hover:text-gold transition-colors duration-300"
            >
              Contact
            </button>
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-warm-gray">
              <Phone size={16} />
              <span className="text-sm">(555) 123-4567</span>
            </div>
            <ThemeToggle />
            <Button 
              variant="luxury"
              size="sm"
              onClick={() => scrollToSection('reservations')}
            >
              Reserve Table
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gold"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-charcoal/98 backdrop-blur-lg border-b border-gold/20 animate-slide-up">
            <nav className="flex flex-col p-4 space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-warm-white hover:text-gold transition-colors duration-300 text-left py-2"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('menu')}
                className="text-warm-white hover:text-gold transition-colors duration-300 text-left py-2"
              >
                Menu
              </button>
              <button 
                onClick={() => scrollToSection('reservations')}
                className="text-warm-white hover:text-gold transition-colors duration-300 text-left py-2"
              >
                Reservations
              </button>
              <button 
                onClick={() => scrollToSection('gallery')}
                className="text-warm-white hover:text-gold transition-colors duration-300 text-left py-2"
              >
                Gallery
              </button>
              <Link 
                to="/ai-recipe-generator"
                className="text-warm-white hover:text-gold transition-colors duration-300 text-left py-2"
              >
                AI Recipe Generator
              </Link>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-warm-white hover:text-gold transition-colors duration-300 text-left py-2"
              >
                Contact
              </button>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gold/20">
                <div className="flex items-center space-x-2 text-warm-gray">
                  <Phone size={16} />
                  <span className="text-sm">(555) 123-4567</span>
                </div>
                <Button 
                  variant="luxury"
                  size="sm"
                  onClick={() => scrollToSection('reservations')}
                  className="w-full"
                >
                  Reserve Table
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};