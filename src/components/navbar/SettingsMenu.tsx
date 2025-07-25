import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Settings, 
  Gauge, 
  Package, 
  Map as MapIcon, 
  User, 
  Bell, 
  Accessibility, 
  CreditCard, 
  Truck, 
  Utensils, 
  Users,
  Smartphone,
  Monitor
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import PerformanceStats from './PerformanceStats';
import OrderTracking from './OrderTracking';
import InteractiveMap from './InteractiveMap';
import UserSettings from './UserSettings';
import NotificationSettings from './NotificationSettings';
import AccessibilitySettings from './AccessibilitySettings';
import PaymentAndSecuritySettings from './PaymentAndSecuritySettings';
import DeliveryPreferences from './DeliveryPreferences';
import FoodPreferences from './FoodPreferences';
import SocialAndCommunity from './SocialAndCommunity';
import { useIsMobile } from '@/hooks/use-mobile';

const SettingsMenu = () => {
  const isMobile = useIsMobile();
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false);
  const [isOrderTrackingModalOpen, setIsOrderTrackingModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isUserSettingsModalOpen, setIsUserSettingsModalOpen] = useState(false);
  const [isNotificationSettingsModalOpen, setIsNotificationSettingsModalOpen] = useState(false);
  const [isAccessibilitySettingsModalOpen, setIsAccessibilitySettingsModalOpen] = useState(false);
  const [isPaymentAndSecurityModalOpen, setIsPaymentAndSecurityModalOpen] = useState(false);
  const [isDeliveryPreferencesModalOpen, setIsDeliveryPreferencesModalOpen] = useState(false);
  const [isFoodPreferencesModalOpen, setIsFoodPreferencesModalOpen] = useState(false);
  const [isSocialAndCommunityModalOpen, setIsSocialAndCommunityModalOpen] = useState(false);

  const iconSize = isMobile ? "h-4 w-4" : "h-5 w-5";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" size={isMobile ? "sm" : "default"} className="relative">
            <Settings className={iconSize} />
            {isMobile && <span className="sr-only">Settings</span>}
            {!isMobile && <span className="ml-2">Settings</span>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 max-h-[80vh] overflow-y-auto">
          <DropdownMenuLabel className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings & Preferences
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {/* User & Account */}
          <DropdownMenuItem onSelect={() => setIsUserSettingsModalOpen(true)}>
            <User className="mr-2 h-4 w-4" />
            <div className="flex-1">
              <div className="font-medium">User Profile</div>
              <div className="text-xs text-muted-foreground">Personal info & preferences</div>
            </div>
          </DropdownMenuItem>
          
          {/* Notifications */}
          <DropdownMenuItem onSelect={() => setIsNotificationSettingsModalOpen(true)}>
            <Bell className="mr-2 h-4 w-4" />
            <div className="flex-1">
              <div className="font-medium">Notifications</div>
              <div className="text-xs text-muted-foreground">Alerts & communication</div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          {/* Accessibility */}
          <DropdownMenuItem onSelect={() => setIsAccessibilitySettingsModalOpen(true)}>
            <Accessibility className="mr-2 h-4 w-4" />
            <div className="flex-1">
              <div className="font-medium">Accessibility</div>
              <div className="text-xs text-muted-foreground">Display & usability options</div>
            </div>
          </DropdownMenuItem>
          
          {/* Payment */}
          <DropdownMenuItem onSelect={() => setIsPaymentAndSecurityModalOpen(true)}>
            <CreditCard className="mr-2 h-4 w-4" />
            <div className="flex-1">
              <div className="font-medium">Payment & Security</div>
              <div className="text-xs text-muted-foreground">Cards & security settings</div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          {/* Delivery & Food */}
          <DropdownMenuItem onSelect={() => setIsDeliveryPreferencesModalOpen(true)}>
            <Truck className="mr-2 h-4 w-4" />
            <div className="flex-1">
              <div className="font-medium">Delivery</div>
              <div className="text-xs text-muted-foreground">Delivery preferences</div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem onSelect={() => setIsFoodPreferencesModalOpen(true)}>
            <Utensils className="mr-2 h-4 w-4" />
            <div className="flex-1">
              <div className="font-medium">Food Preferences</div>
              <div className="text-xs text-muted-foreground">Dietary & cuisine preferences</div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem onSelect={() => setIsSocialAndCommunityModalOpen(true)}>
            <Users className="mr-2 h-4 w-4" />
            <div className="flex-1">
              <div className="font-medium">Social & Community</div>
              <div className="text-xs text-muted-foreground">Social features & sharing</div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          {/* Theme Toggle */}
          <div className="px-2 py-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isMobile ? <Smartphone className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
                <span className="text-sm font-medium">Theme</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
          
          <DropdownMenuSeparator />
          
          {/* Tools & Utilities */}
          <DropdownMenuItem onSelect={() => setIsOrderTrackingModalOpen(true)}>
            <Package className="mr-2 h-4 w-4" />
            <div className="flex-1">
              <div className="font-medium">Order Tracking</div>
              <div className="text-xs text-muted-foreground">Track your orders</div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem onSelect={() => setIsMapModalOpen(true)}>
            <MapIcon className="mr-2 h-4 w-4" />
            <div className="flex-1">
              <div className="font-medium">Interactive Map</div>
              <div className="text-xs text-muted-foreground">Find nearby locations</div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          {/* Developer Tools */}
          <DropdownMenuItem onSelect={() => setIsPerformanceModalOpen(true)}>
            <Gauge className="mr-2 h-4 w-4" />
            <div className="flex-1">
              <div className="font-medium">Performance</div>
              <div className="text-xs text-muted-foreground">App performance metrics</div>
            </div>
            <Badge variant="secondary" className="text-xs">Dev</Badge>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal Dialogs */}
      <Dialog open={isPerformanceModalOpen} onOpenChange={setIsPerformanceModalOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Performance Statistics</DialogTitle>
          </DialogHeader>
          <PerformanceStats />
        </DialogContent>
      </Dialog>

      <Dialog open={isOrderTrackingModalOpen} onOpenChange={setIsOrderTrackingModalOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Tracking</DialogTitle>
          </DialogHeader>
          <OrderTracking />
        </DialogContent>
      </Dialog>

      <Dialog open={isMapModalOpen} onOpenChange={setIsMapModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Interactive Map</DialogTitle>
          </DialogHeader>
          <InteractiveMap />
        </DialogContent>
      </Dialog>

      <Dialog open={isUserSettingsModalOpen} onOpenChange={setIsUserSettingsModalOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Profile & Personalization</DialogTitle>
          </DialogHeader>
          <UserSettings />
        </DialogContent>
      </Dialog>

      <Dialog open={isNotificationSettingsModalOpen} onOpenChange={setIsNotificationSettingsModalOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Advanced Notification Settings</DialogTitle>
          </DialogHeader>
          <NotificationSettings />
        </DialogContent>
      </Dialog>

      <Dialog open={isAccessibilitySettingsModalOpen} onOpenChange={setIsAccessibilitySettingsModalOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Accessibility & Usability</DialogTitle>
          </DialogHeader>
          <AccessibilitySettings />
        </DialogContent>
      </Dialog>

      <Dialog open={isPaymentAndSecurityModalOpen} onOpenChange={setIsPaymentAndSecurityModalOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Payment & Security</DialogTitle>
          </DialogHeader>
          <PaymentAndSecuritySettings />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeliveryPreferencesModalOpen} onOpenChange={setIsDeliveryPreferencesModalOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Delivery Preferences</DialogTitle>
          </DialogHeader>
          <DeliveryPreferences />
        </DialogContent>
      </Dialog>

      <Dialog open={isFoodPreferencesModalOpen} onOpenChange={setIsFoodPreferencesModalOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Restaurant & Food Preferences</DialogTitle>
          </DialogHeader>
          <FoodPreferences />
        </DialogContent>
      </Dialog>

      <Dialog open={isSocialAndCommunityModalOpen} onOpenChange={setIsSocialAndCommunityModalOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Social & Community</DialogTitle>
          </DialogHeader>
          <SocialAndCommunity />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SettingsMenu;
