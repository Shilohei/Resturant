import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChefHat, Users, Utensils, Award } from "lucide-react";
import heroDish from "@/assets/hero-dish.jpg";
import restaurantInterior from "@/assets/restaurant-interior.jpg";
import menuSteak from "@/assets/menu-steak.jpg";
import menuPasta from "@/assets/menu-pasta.jpg";

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: string;
  description: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: heroDish,
    title: "Signature Wagyu",
    category: "dishes",
    description: "Our acclaimed Wagyu beef with truffle reduction"
  },
  {
    id: "2",
    src: restaurantInterior,
    title: "Main Dining Room",
    category: "interior",
    description: "Elegant atmosphere with warm ambient lighting"
  },
  {
    id: "3",
    src: menuSteak,
    title: "Premium Steaks",
    category: "dishes",
    description: "Perfectly cooked to your preference"
  },
  {
    id: "4",
    src: menuPasta,
    title: "House-made Pasta",
    category: "dishes",
    description: "Fresh pasta crafted daily by our chefs"
  }
];

const categories = [
  { id: "all", name: "All", icon: <Utensils size={16} /> },
  { id: "dishes", name: "Culinary Arts", icon: <ChefHat size={16} /> },
  { id: "interior", name: "Ambiance", icon: <Users size={16} /> },
  { id: "events", name: "Events", icon: <Award size={16} /> }
];

export const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-charcoal to-charcoal-light">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-cormorant font-bold text-warm-white mb-4">
            Visual <span className="text-luxury">Experience</span>
          </h2>
          <p className="text-xl text-warm-gray max-w-2xl mx-auto">
            Step into our world through images that capture the essence of fine dining
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "luxury" : "ghost-gold"}
              size="lg"
              onClick={() => setSelectedCategory(category.id)}
              className="font-medium"
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredImages.map((image, index) => (
            <div 
              key={image.id}
              className={`group cursor-pointer animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Badge className="mb-2 bg-gold/90 text-charcoal">
                    {image.category}
                  </Badge>
                  <h3 className="text-xl font-cormorant font-semibold text-warm-white mb-2">
                    {image.title}
                  </h3>
                  <p className="text-warm-gray text-sm">
                    {image.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Experience Highlights */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-charcoal-light/50 rounded-lg border border-gold/20">
            <ChefHat className="mx-auto mb-4 text-gold" size={48} />
            <h3 className="text-xl font-cormorant font-semibold text-gold mb-2">
              Master Chefs
            </h3>
            <p className="text-warm-gray">
              Award-winning culinary team with Michelin-star experience
            </p>
          </div>

          <div className="text-center p-6 bg-charcoal-light/50 rounded-lg border border-gold/20">
            <Award className="mx-auto mb-4 text-gold" size={48} />
            <h3 className="text-xl font-cormorant font-semibold text-gold mb-2">
              Awards & Recognition
            </h3>
            <p className="text-warm-gray">
              Featured in top culinary publications and restaurant guides
            </p>
          </div>

          <div className="text-center p-6 bg-charcoal-light/50 rounded-lg border border-gold/20">
            <Users className="mx-auto mb-4 text-gold" size={48} />
            <h3 className="text-xl font-cormorant font-semibold text-gold mb-2">
              Private Events
            </h3>
            <p className="text-warm-gray">
              Exclusive venue for weddings, corporate events, and celebrations
            </p>
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-charcoal/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-[90vh] bg-charcoal-light rounded-lg overflow-hidden">
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-charcoal/80 backdrop-blur-sm text-gold p-2 rounded-full hover:bg-gold hover:text-charcoal transition-colors duration-300"
              >
                <X size={24} />
              </button>

              {/* Image */}
              <div className="relative">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                
                {/* Image Info */}
                <div className="p-6 bg-charcoal-light">
                  <Badge className="mb-3 bg-gold text-charcoal">
                    {selectedImage.category}
                  </Badge>
                  <h3 className="text-2xl font-cormorant font-bold text-gold mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-warm-gray">
                    {selectedImage.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};