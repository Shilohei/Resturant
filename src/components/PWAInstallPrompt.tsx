import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Download, Smartphone, Monitor, Zap, Wifi } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppMode = (window.navigator as any).standalone === true;
    
    if (isInStandaloneMode || isInWebAppMode) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show install prompt after a delay to avoid being intrusive
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 10000); // Show after 10 seconds
    };

    // Listen for app installation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      toast.success("App installed successfully!", {
        description: "You can now access the restaurant directly from your home screen."
      });
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        toast.success("Installing app...", {
          description: "The app will be available on your home screen shortly."
        });
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    } catch (error) {
      console.error('Error during installation:', error);
      toast.error("Installation failed", {
        description: "Please try again or install manually from your browser menu."
      });
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Don't show if already installed or dismissed this session
  if (isInstalled || sessionStorage.getItem('pwa-prompt-dismissed')) {
    return null;
  }

  return (
    <AnimatePresence>
      {showInstallPrompt && deferredPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm"
        >
          <Card className="bg-charcoal-light/95 backdrop-blur-md border-gold/20 shadow-2xl">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-gold/20 rounded-lg">
                    <Download className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <CardTitle className="text-cream text-lg">Install Our App</CardTitle>
                    <CardDescription className="text-warm-gray text-sm">
                      Get the full restaurant experience
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                  className="h-8 w-8 p-0 text-warm-gray hover:text-cream"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center space-x-2 text-warm-gray">
                    <Zap className="h-3 w-3 text-green-400" />
                    <span>Faster loading</span>
                  </div>
                  <div className="flex items-center space-x-2 text-warm-gray">
                    <Wifi className="h-3 w-3 text-blue-400" />
                    <span>Works offline</span>
                  </div>
                  <div className="flex items-center space-x-2 text-warm-gray">
                    <Smartphone className="h-3 w-3 text-purple-400" />
                    <span>Home screen access</span>
                  </div>
                  <div className="flex items-center space-x-2 text-warm-gray">
                    <Monitor className="h-3 w-3 text-orange-400" />
                    <span>Full screen mode</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={handleInstallClick}
                    className="flex-1 bg-gold text-charcoal hover:bg-gold/90 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Install
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDismiss}
                    className="border-warm-gray/20 text-warm-gray hover:text-cream hover:bg-warm-gray/10"
                  >
                    Later
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
