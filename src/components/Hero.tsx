import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Award, Clock } from "lucide-react";
import { usePexelsImages } from '@/hooks/usePexels';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Skeleton } from "@/components/ui/skeleton";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: pexelsData, isLoading, isError } = usePexelsImages({
    query: 'restaurant interior modern',
    orientation: 'landscape',
    perPage: 5,
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gallery */}
      <div className="absolute inset-0 z-0"> 
        {isLoading && <Skeleton className="w-full h-full" />}
        {isError && (
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('/src/assets/fallbacks/hero-restaurant.jpg')` }}
          />
        )}
        {pexelsData && (
          <ImageGallery
            items={pexelsData.photos.map(p => ({ original: p.src.large2x, thumbnail: p.src.tiny }))}
            showNav={false}
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
            autoPlay={true}
            slideInterval={5000}
            slideDuration={1500}
            renderItem={(item) => (
              <div
                className="h-screen w-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${item.original})` }}
              />
            )}
          />
        )}
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center lg:text-left">
        <div className="max-w-4xl mx-auto lg:mx-0">
          {/* Awards & Recognition */}
          <div className={`flex justify-center lg:justify-start items-center space-x-6 mb-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="flex items-center space-x-1">
              <Star className="text-gold fill-gold" size={20} />
              <Star className="text-gold fill-gold" size={20} />
              <Star className="text-gold fill-gold" size={20} />
              <span className="text-warm-gray ml-2">Michelin Guide</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="text-gold" size={20} />
              <span className="text-warm-gray">2024 Restaurant of the Year</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className={`font-cormorant text-5xl md:text-7xl lg:text-8xl font-bold text-warm-white mb-6 leading-tight ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
            Culinary
            <span className="block text-luxury glow">Theatre</span>
          </h1>
          
          {/* Subtitle */}
          <p className={`text-xl md:text-2xl text-warm-gray mb-8 max-w-2xl ${isVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-1000 delay-500`}>
            Where every dish tells a story and every meal becomes an unforgettable performance of flavors, artistry, and passion.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'} transition-all duration-1000 delay-700`}>
            <Button 
              variant="luxury"
              size="xl"
              onClick={() => scrollToSection('reservations')}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              Reserve Your Table
            </Button>
            <Button 
              variant="hero"
              size="xl"
              onClick={() => scrollToSection('menu')}
              className="backdrop-blur-sm"
            >
              Explore Menu
            </Button>
          </div>

          {/* Restaurant Stats */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto lg:mx-0 ${isVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-1000 delay-1000`}>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-cormorant font-bold text-gold mb-1">15+</div>
              <div className="text-warm-gray text-sm">Years of Excellence</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-cormorant font-bold text-gold mb-1">50K+</div>
              <div className="text-warm-gray text-sm">Happy Guests</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-cormorant font-bold text-gold mb-1">4.9★</div>
              <div className="text-warm-gray text-sm">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hours Badge */}
      <div className="absolute bottom-8 right-8 bg-charcoal-light/80 backdrop-blur-sm border border-gold/30 rounded-lg p-4 animate-float">
        <div className="flex items-center space-x-2 text-gold">
          <Clock size={20} />
          <div>
            <div className="font-semibold">Open Now</div>
            <div className="text-sm text-warm-gray">5:00 PM - 11:00 PM</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gold animate-bounce">
        <div className="w-6 h-10 border-2 border-gold rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};