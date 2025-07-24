import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import SettingsMenu from "./navbar/SettingsMenu";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", to: "home", isScrollLink: true },
    { label: "Menu", to: "menu", isScrollLink: true },
    { label: "Order Online", to: "ordering", isScrollLink: true },
    { label: "Reservations", to: "reservations", isScrollLink: true },
    { label: "Gallery", to: "gallery", isScrollLink: true },
    { label: "AI Recipes", to: "/ai-recipe-generator", isScrollLink: false },
    { label: "Contact", to: "contact", isScrollLink: true },
  ];

  const renderNavLink = (link: typeof navLinks[0], mobile = false) => {
    const className = `text-warm-white hover:text-gold transition-colors duration-300 ${mobile ? 'text-left py-2' : ''}`;
    if (link.isScrollLink) {
      return (
        <button onClick={() => scrollToSection(link.to)} className={className}>
          {link.label}
        </button>
      );
    }
    return (
      <Link to={link.to} className={className} onClick={() => setIsMenuOpen(false)}>
        {link.label}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-md border-b border-gold/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center">
              <span className="text-charcoal font-bold text-xl">O</span>
            </div>
            <div>
              <h1 className="text-xl font-cormorant font-bold text-gold">Otsu</h1>
              <p className="text-xs text-warm-gray">Fine Dining Experience</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => <div key={link.label}>{renderNavLink(link)}</div>)}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-warm-gray">
              <Phone size={16} />
              <span className="text-sm">dikxay goldfish</span>
            </div>
            <ThemeToggle />
            <SettingsMenu />
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
        <div className={`md:hidden absolute top-full left-0 right-0 bg-charcoal/98 backdrop-blur-lg border-b border-gold/20 transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
            <nav className="flex flex-col p-4 space-y-4">
              {navLinks.map(link => <div key={link.label}>{renderNavLink(link, true)}</div>)}
              <div className="flex flex-col space-y-4 pt-4 border-t border-gold/20">
                <div className="flex items-center space-x-2 text-warm-gray">
                  <Phone size={16} />
                  <span className="text-sm">dikxay goldfish</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-warm-gray">Switch Theme</span>
                  <ThemeToggle />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-warm-gray">Advanced Settings</span>
                  <SettingsMenu />
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
      </div>
    </header>
  );
};