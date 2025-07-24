import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Award, Clock } from "lucide-react";
import { usePexelsSearch } from '@/hooks/usePexelsSearch';
import { getRandomImageKeyword } from '@/constants/pexelsConfig';
import PexelsImage from './PexelsImage';
import { ARMenuPreview } from './ARMenuPreview';
import { Skeleton } from "@/components/ui/skeleton";

export const Hero = () => {
  const [isArViewerOpen, setIsArViewerOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [query] = useState(() => getRandomImageKeyword('hero'));

  const { 
    data,
    isLoading,
    isError,
  } = usePexelsSearch<'photos'>({
    mediaType: 'photos',
    options: {
      query,
      orientation: 'landscape',
      per_page: 5,
    }
  });

  const images = data?.pages.flatMap(page => page.photos) ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [images.length]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featureImageQuery = getRandomImageKeyword('food');

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Gallery */}
      <div className="absolute inset-0 z-0">
        {isLoading && <Skeleton className="w-full h-full" />}
        {isError && (
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('/src/assets/fallbacks/hero-restaurant.jpg')` }}
          />
        )}
        {images.length > 0 && (
          <div className="w-full h-full">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
              >
                <PexelsImage
                  photo={image}
                  alt={image.alt || 'Hero background image'}
                  className="w-full h-full object-cover animate-ken-burns"
                  loading="eager"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left">
            <div className={`mb-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="inline-flex items-center bg-gold/10 text-gold border border-gold/30 rounded-full px-4 py-1 text-sm">
                <Award className="mr-2" size={16} />
                <span>2024's Restaurant of the Year</span>
              </div>
            </div>

            <h1 className={`font-cormorant text-5xl md:text-7xl font-bold text-warm-white mb-6 leading-tight ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
              A Symphony of
              <span className="block text-luxury glow">Exquisite Flavors</span>
            </h1>
            
            <p className={`text-lg md:text-xl text-warm-gray mb-10 max-w-xl mx-auto lg:mx-0 ${isVisible ? 'animate-fade-in' : 'opacity-0'} transition-opacity duration-1000 delay-300`}>
              Experience a culinary journey where tradition meets innovation, crafted with passion and the finest ingredients.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start ${isVisible ? 'animate-fade-in' : 'opacity-0'} transition-opacity duration-1000 delay-500`}>
              <Button variant="luxury" size="xl" onClick={() => scrollToSection('reservations')}>
                Reserve Your Table
              </Button>
              <Button variant="hero" size="xl" onClick={() => scrollToSection('menu')}>
                Explore Menu
              </Button>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className={`hidden lg:block relative ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-2xl shadow-black/50 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <PexelsImage 
                query={featureImageQuery} 
                alt="A featured dish from Otsu restaurant"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-cormorant text-2xl font-bold">Chef's Special</h3>
                <p className="text-sm opacity-80">Try our seasonal masterpiece</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isArViewerOpen && <ARMenuPreview />} 
    </section>
  );
};