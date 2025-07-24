import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import MenuCard3D from './MenuCard3D';
import MenuSearch from './MenuSearch';
import MenuFilter from './MenuFilter';

// Define a type for menu items to ensure type safety
type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  imageUrl: string;
  dietaryTags: ('vegan' | 'gluten-free' | 'keto')[];
  ingredients: string[];
};

// Sample Data
const sampleMenuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Avocado Toast Deluxe',
    description: 'Toasted sourdough with fresh avocado, cherry tomatoes, and a balsamic glaze.',
    price: 14.50,
    imageUrl: 'https://images.unsplash.com/photo-1584365685547-9a5fb6f3a70c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    dietaryTags: ['vegan'],
    ingredients: ['Sourdough Bread', 'Avocado', 'Cherry Tomatoes', 'Balsamic Glaze', 'Microgreens'],
  },
  {
    id: 2,
    name: 'Keto Salmon Salad',
    description: 'Grilled salmon on a bed of mixed greens with a lemon-dill vinaigrette.',
    price: 22.00,
    discountedPrice: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    dietaryTags: ['keto', 'gluten-free'],
    ingredients: ['Salmon Fillet', 'Mixed Greens', 'Cucumber', 'Lemon', 'Dill', 'Olive Oil'],
  },
  {
    id: 3,
    name: 'Gluten-Free Pasta Primavera',
    description: 'A delightful mix of spring vegetables and gluten-free penne in a light cream sauce.',
    price: 18.00,
    imageUrl: 'https://images.unsplash.com/photo-1598866594240-a71619161782?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    dietaryTags: ['gluten-free'],
    ingredients: ['Gluten-Free Penne', 'Asparagus', 'Peas', 'Heavy Cream', 'Parmesan Cheese'],
  },
];

const MenuList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleAddToCart = (id: number) => {
    console.log(`Added item ${id} to cart.`);
    // Here you would typically update a global state for the cart
  };

  const filteredMenuItems = sampleMenuItems.filter(item => {
    const searchMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const filterMatch = selectedFilters.length === 0 || selectedFilters.every(filter => item.dietaryTags.includes(filter as 'vegan' | 'gluten-free' | 'keto'));
    return searchMatch && filterMatch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

    const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <MenuSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <MenuFilter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
      >
        {filteredMenuItems.length > 0 ? (
          filteredMenuItems.map(item => (
            <motion.div key={item.id} variants={itemVariants}>
              <MenuCard3D {...item} onAddToCart={handleAddToCart} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-neutral-500 dark:text-neutral-400 font-inter">No dishes match your search.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MenuList;
