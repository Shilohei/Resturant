import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, UtensilsCrossed, Wine, AlertTriangle } from 'lucide-react';
import { usePexelsImages } from '@/hooks/usePexels';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import PexelsImage from '@/components/PexelsImage';

const galleryCategories = [
  { name: 'Cuisine', query: 'gourmet food plating', icon: UtensilsCrossed },
  { name: 'Ambiance', query: 'luxury restaurant interior', icon: Wine },
  { name: 'Behind the Scenes', query: 'chef cooking in kitchen', icon: Camera },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const PhotoGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(galleryCategories[0]);

  const { data, isLoading, isError } = usePexelsImages({
    query: activeCategory.query,
    perPage: 12,
    orientation: 'landscape',
  });

  return (
    <section id="gallery" className="py-16 bg-neutral-100 dark:bg-charcoal-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-cormorant text-5xl font-bold text-charcoal-light dark:text-warm-white">Visual Feast</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-2 max-w-2xl mx-auto">
            A glimpse into the artistry and atmosphere that define our dining experience.
          </p>
        </motion.div>

        <div className="flex justify-center items-center gap-2 md:gap-4 mb-8">
          {galleryCategories.map((category) => (
            <Button
              key={category.name}
              variant={activeCategory.name === category.name ? 'luxury' : 'outline'}
              onClick={() => setActiveCategory(category)}
              className="flex items-center gap-2 transition-all duration-300"
            >
              <category.icon className="h-4 w-4" />
              <span className="hidden md:inline">{category.name}</span>
            </Button>
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4"
        >
          {isLoading && Array.from({ length: 12 }).map((_, i) => (
            <motion.div key={i} variants={itemVariants} className="mb-4 break-inside-avoid">
              <Skeleton className="w-full h-64 rounded-lg" />
            </motion.div>
          ))}
          {isError && (
             <div className="col-span-full flex flex-col items-center justify-center text-center py-12 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle className="h-10 w-10 text-red-500 mb-4" />
              <p className="font-semibold text-red-600 dark:text-red-400">Could not load images</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">There was an issue fetching photos from Pexels.</p>
            </div>
          )}
          {data?.photos.map((photo) => (
            <motion.div
              key={photo.id}
              variants={itemVariants}
              className="mb-4 break-inside-avoid overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <PexelsImage
                photo={photo}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PhotoGallery;
