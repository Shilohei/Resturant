import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import MenuList from "@/components/menu/MenuList";
import { OnlineOrdering } from "@/components/OnlineOrdering";
import { SmartRecommendations } from "@/components/SmartRecommendations";
import TableReservation from "@/components/booking/TableReservation";
import SocialFeed from '@/components/social/SocialFeed';
import PhotoGallery from '@/components/gallery/PhotoGallery';
import { Contact } from "@/components/Contact";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";

const Index = () => {
  const [searchParams] = useSearchParams();
  const showPerfMonitor = searchParams.get('perf') === 'true';

  return (
    <div className="min-h-screen bg-charcoal">
      <Header />
      <Hero />
      <MenuList />
      <SmartRecommendations />
      <OnlineOrdering />
      <TableReservation />
      <SocialFeed />
      <PhotoGallery />
      <Contact />
      <PWAInstallPrompt />
      {showPerfMonitor && <PerformanceMonitor />}
    </div>
  );
};

export default Index;
