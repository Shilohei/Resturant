import React from 'react';
import { motion } from 'framer-motion';
import { RecipeGenerator } from '../components/RecipeGenerator';

export const AiRecipeGeneratorPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="container mx-auto py-8">
        <RecipeGenerator />
      </div>
    </motion.div>
  );
};
