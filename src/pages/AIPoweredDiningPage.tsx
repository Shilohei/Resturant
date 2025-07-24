import React, { useState } from 'react';
import { AIMenuRecommendations } from '@/components/AIMenuRecommendations';
import { AIChatbot } from '@/components/AIChatbot';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MessageCircle, ChefHat, BarChart, Calendar } from 'lucide-react';
import { IntelligentReservation } from '@/components/IntelligentReservation';
import { PredictiveAnalyticsDashboard } from '@/components/PredictiveAnalyticsDashboard';

const AIPoweredDiningPage: React.FC = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('recommendations');

  const toggleChatbot = () => setIsChatbotOpen(!isChatbotOpen);

  const renderContent = () => {
    switch (activeTab) {
      case 'recommendations':
        return <AIMenuRecommendations customerId="user123" />;
      case 'reservations':
        return <IntelligentReservation />;
      case 'analytics':
        return <PredictiveAnalyticsDashboard />;
      default:
        return <AIMenuRecommendations customerId="user123" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI-Powered Dining Experience
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover personalized recommendations, chat with our AI assistant, and more.
          </p>
        </header>

        <div className="flex justify-center mb-8">
          <div className="flex p-1 bg-muted rounded-lg">
            <TabButton icon={<ChefHat />} label="Recommendations" active={activeTab === 'recommendations'} onClick={() => setActiveTab('recommendations')} />
            <TabButton icon={<Calendar />} label="Reservations" active={activeTab === 'reservations'} onClick={() => setActiveTab('reservations')} />
            <TabButton icon={<BarChart />} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          </div>
        </div>

        <main>
          {renderContent()}
        </main>

        <AIChatbot isOpen={isChatbotOpen} onToggle={toggleChatbot} customerId="user123" />
      </motion.div>
    </div>
  );
};

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ icon, label, active, onClick }) => {
  return (
    <Button
      variant={active ? 'default' : 'ghost'}
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 transition-colors duration-200"
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
};

export default AIPoweredDiningPage;
