import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle, AlertTriangle } from 'lucide-react';
import { usePexelsImages } from '@/hooks/usePexels';
import { Skeleton } from '@/components/ui/skeleton';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const SocialFeed: React.FC = () => {
  const { data: pexelsData, isLoading, isError } = usePexelsImages({
    query: 'fine dining restaurant food',
    perPage: 6,
  });
  return (
    <div className="py-16 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-neutral-800 dark:text-neutral-100">From Our Kitchen to Your Feed</h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 font-inter">Follow our culinary journey on Instagram</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4"
        >
          {isLoading && Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
          {isError && (
            <div className="col-span-full flex flex-col items-center justify-center text-center py-12 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle className="h-10 w-10 text-red-500 mb-4" />
              <p className="font-semibold text-red-600 dark:text-red-400">Could not load images</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Please check your Pexels API key or network connection.</p>
            </div>
          )}
          {pexelsData?.photos.map((photo) => (
            <motion.div
              key={photo.id}
              variants={itemVariants}
              className="relative aspect-square overflow-hidden rounded-lg group"
            >
              <img src={photo.src.large} alt={photo.alt || 'Social feed image'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    <span className="font-bold text-sm">{Math.floor(Math.random() * 1000)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-bold text-sm">{Math.floor(Math.random() * 100)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <motion.a
            href="#" // Replace with your actual Instagram profile URL
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold rounded-full shadow-lg"
          >
            <Instagram className="h-5 w-5" />
            <span>Follow on Instagram</span>
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default SocialFeed;
