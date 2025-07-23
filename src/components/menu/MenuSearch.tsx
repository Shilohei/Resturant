import React from 'react';
import { Search } from 'lucide-react';

interface MenuSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
}

const MenuSearch: React.FC<MenuSearchProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  placeholder = 'Search for a dish...'
}) => {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm border border-white/20 dark:border-neutral-700/60 rounded-full font-inter text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-60 transition-all duration-300 shadow-sm hover:shadow-md"
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 pointer-events-none">
        <Search className="h-5 w-5" />
      </div>
    </div>
  );
};

export default MenuSearch;
