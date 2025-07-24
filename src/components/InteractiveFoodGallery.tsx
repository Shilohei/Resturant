import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Maximize } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    name: 'Gourmet Burger',
    description: 'A juicy burger with all the fixings.',
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    '360_image_placeholder': 'path/to/burger-360.jpg'
  },
  {
    id: 2,
    name: 'Fresh Pasta',
    description: 'Homemade pasta with a rich tomato sauce.',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    '360_image_placeholder': 'path/to/pasta-360.jpg'
  },
  {
    id: 3,
    name: 'Chocolate Lava Cake',
    description: 'A decadent dessert with a molten chocolate center.',
    image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    '360_image_placeholder': 'path/to/cake-360.jpg'
  },
  {
    id: 4,
    name: 'Healthy Salad',
    description: 'A mix of fresh greens and vegetables.',
    image: 'https://images.pexels.com/photos/2862154/pexels-photo-2862154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    '360_image_placeholder': 'path/to/salad-360.jpg'
  }
];

export const InteractiveFoodGallery: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedItem = selectedId ? galleryItems.find(item => item.id === selectedId) : null;

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Interactive Food Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map(item => (
            <motion.div
              key={item.id}
              layoutId={`card-container-${item.id}`}
              onClick={() => setSelectedId(item.id)}
              className="cursor-pointer"
            >
              <Card className="overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedItem && (
            <motion.div
              layoutId={`card-container-${selectedItem.id}`}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            >
              <Card className="w-11/12 max-w-3xl overflow-hidden">
                <CardContent className="p-0 relative">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 z-10 bg-white/50 hover:bg-white"
                    onClick={() => setSelectedId(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  <div className="p-8 bg-gray-100 dark:bg-gray-800 text-center">
                    <Maximize className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">360° View Coming Soon!</h3>
                    <p className="text-muted-foreground">Imagine rotating this delicious {selectedItem.name} with your mouse!</p>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-2xl mb-2">{selectedItem.name}</h3>
                    <p>{selectedItem.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
