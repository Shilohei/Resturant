import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import MenuList from "@/components/menu/MenuList";
import { OnlineOrdering } from "@/components/OnlineOrdering";
import { SmartRecommendations } from "@/components/SmartRecommendations";
import TableReservation from "@/components/booking/TableReservation";
import SocialFeed from '@/components/social/SocialFeed';
import PhotoGallery from '@/components/gallery/PhotoGallery';
import { InteractiveFoodGallery } from '@/components/InteractiveFoodGallery';
import { ParallaxSection } from '@/components/ParallaxSection';
import { Contact } from "@/components/Contact";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";

const Index = () => {
  const [searchParams] = useSearchParams();
  const showPerfMonitor = searchParams.get('perf') === 'true';

  return (
    <div className="min-h-screen bg-charcoal">
      <Header />
      <HeroSection />
      <div className="text-center py-8">
        <Link to="/ai-dining">
          <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-white">
            <Sparkles className="mr-2 h-5 w-5" />
            Explore AI Dining Experience
          </Button>
        </Link>
      </div>
      <ParallaxSection backgroundImage="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
        <MenuList />
      </ParallaxSection>
      <SmartRecommendations />
      <OnlineOrdering />
      <ParallaxSection backgroundImage="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
        <TableReservation />
      </ParallaxSection>
      <SocialFeed />
      <InteractiveFoodGallery />
      <PhotoGallery />
      <Contact />
      <PWAInstallPrompt />
      {showPerfMonitor && <PerformanceMonitor />}
    </div>
  );
};

export default Index;
