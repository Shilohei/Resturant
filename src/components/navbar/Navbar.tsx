import React from 'react';
import { Link } from 'react-router-dom';
import SettingsMenu from './SettingsMenu';
import ShoppingCart from './ShoppingCart';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="text-lg font-bold">
          <Link to="/">Food Delivery</Link>
        </div>
        <div className="flex flex-1 items-center justify-center space-x-6 text-sm font-medium">
          <Link to="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Home</Link>
          <Link to="/settings" className="transition-colors hover:text-foreground/80 text-foreground/60">Settings</Link>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <ShoppingCart />
          <SettingsMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
