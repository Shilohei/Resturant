import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import PexelsImage from '../PexelsImage';
import { Leaf, Wheat, PlusCircle, Info } from 'lucide-react';

// Define the props for the component
interface MenuCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;

  dietaryTags: ('vegan' | 'gluten-free' | 'keto')[];
  ingredients: string[];
  onAddToCart: (id: number) => void;
}

// Dietary tag components for visual representation
const dietaryIcons = {
  vegan: <Leaf className="h-4 w-4 text-green-500" />,
  'gluten-free': <Wheat className="h-4 w-4 text-yellow-600" />,
  keto: <div className="text-xs font-bold text-blue-500">K</div>,
};

const dietaryTooltips = {
  vegan: 'Vegan',
  'gluten-free': 'Gluten-Free',
  keto: 'Keto Friendly',
};

const MenuCard3D: React.FC<MenuCardProps> = ({
  id,
  name,
  description,
  price,
  discountedPrice,
  dietaryTags = [],
  ingredients,
  onAddToCart,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D hover effect logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  const rotateX = useTransform(mouseY, [-150, 150], [15, -15]);
  const rotateY = useTransform(mouseX, [-150, 150], [-15, 15]);
  const cardScale = useSpring(1, { stiffness: 400, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - left - width / 2);
    y.set(e.clientY - top - height / 2);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    cardScale.set(1.05);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    cardScale.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, scale: cardScale, transformStyle: 'preserve-3d' }}
      className="relative w-full max-w-sm h-[480px] rounded-3xl perspective-1000"
    >
      {/* Main Card Content */}
      <div
        style={{ transform: 'translateZ(0px)' }}
        className="absolute inset-0 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-lg border border-white/20 dark:border-neutral-800/80 rounded-3xl shadow-2xl shadow-black/20 overflow-hidden"
      >
        {/* Image Section */}
        <motion.div
          style={{ transform: 'translateZ(50px)' }}
          className="relative h-1/2"
        >
          <PexelsImage 
                query={`gourmet ${name} plating`}
                orientation="portrait"
                fallbackType="menu"
                className="absolute inset-0 w-full h-full object-cover rounded-3xl"
              />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {/* Dietary Tags */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            {dietaryTags.map((tag) => (
              <div key={tag} className="relative group">
                <div className="p-1.5 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-full">
                  {dietaryIcons[tag]}
                </div>
                <span className="absolute top-full mt-2 right-1/2 translate-x-1/2 px-2 py-1 text-xs text-white bg-neutral-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {dietaryTooltips[tag]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Text Content Section */}
        <div className="p-6 h-1/2 flex flex-col justify-between">
          <div>
            <motion.h3
              style={{ transform: 'translateZ(40px)' }}
              className="text-2xl font-playfair font-bold text-neutral-800 dark:text-neutral-100"
            >
              {name}
            </motion.h3>
            <motion.p
              style={{ transform: 'translateZ(30px)' }}
              className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 font-inter line-clamp-2"
            >
              {description}
            </motion.p>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex justify-between items-center mt-4">
            <motion.div style={{ transform: 'translateZ(20px)' }} className="font-inter">
              {discountedPrice ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-coral-red">${discountedPrice.toFixed(2)}</span>
                  <span className="text-lg text-neutral-500 line-through">${price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">${price.toFixed(2)}</span>
              )}
            </motion.div>
            <motion.button
              style={{ transform: 'translateZ(20px)' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAddToCart(id)}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white font-semibold rounded-full shadow-lg hover:bg-amber-600 transition-colors"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Add</span>
            </motion.button>
          </div>
        </div>

        {/* Ingredient Info Button */}
        <motion.button
          style={{ transform: 'translateZ(60px)' }}
          onClick={() => setShowIngredients(!showIngredients)}
          className="absolute top-1/2 -translate-y-1/2 right-4 p-2 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm rounded-full hover:bg-white/80 dark:hover:bg-neutral-700/80 transition-colors"
          aria-label="Show ingredients"
        >
          <Info className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
        </motion.button>
      </div>

      {/* Ingredients Overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: showIngredients ? 1 : 0, scale: showIngredients ? 1 : 0.9, y: showIngredients ? 0 : 20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ transform: 'translateZ(80px)' }}
        className={`absolute inset-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-3xl p-6 flex flex-col items-center justify-center text-center pointer-events-none ${showIngredients ? 'pointer-events-auto' : ''}`}
      >
        <h4 className="text-lg font-playfair font-bold text-neutral-800 dark:text-neutral-100">Ingredients</h4>
        <ul className="mt-4 text-sm text-neutral-600 dark:text-neutral-400 font-inter space-y-1">
          {ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
        </ul>
        <button
          onClick={() => setShowIngredients(false)}
          className="mt-6 px-4 py-2 text-sm bg-amber-500 text-white font-semibold rounded-full"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default MenuCard3D;
