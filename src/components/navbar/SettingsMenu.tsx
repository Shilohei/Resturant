import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Settings, Gauge, DollarSign, Package, Map as MapIcon, User, Bell, Accessibility, CreditCard, Truck, Utensils, Users } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import PerformanceStats from './PerformanceStats';
import CurrencySelector from './CurrencySelector';
import OrderTracking from './OrderTracking';
import InteractiveMap from './InteractiveMap';
import UserSettings from './UserSettings';
import NotificationSettings from './NotificationSettings';
import AccessibilitySettings from './AccessibilitySettings';
import PaymentAndSecuritySettings from './PaymentAndSecuritySettings';
import DeliveryPreferences from './DeliveryPreferences';
import FoodPreferences from './FoodPreferences';
import SocialAndCommunity from './SocialAndCommunity';

const SettingsMenu = () => {
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

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 w-10 hover:bg-accent hover:text-accent-foreground cursor-pointer">
            <Settings className="h-5 w-5 text-white" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onSelect={() => setIsUserSettingsModalOpen(true)}>
            <User className="mr-2 h-4 w-4" />
            <span>User Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsNotificationSettingsModalOpen(true)}>
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsAccessibilitySettingsModalOpen(true)}>
            <Accessibility className="mr-2 h-4 w-4" />
            <span>Accessibility</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsPaymentAndSecurityModalOpen(true)}>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Payment & Security</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsDeliveryPreferencesModalOpen(true)}>
            <Truck className="mr-2 h-4 w-4" />
            <span>Delivery Preferences</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsFoodPreferencesModalOpen(true)}>
            <Utensils className="mr-2 h-4 w-4" />
            <span>Food Preferences</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsSocialAndCommunityModalOpen(true)}>
            <Users className="mr-2 h-4 w-4" />
            <span>Social & Community</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <ThemeToggle />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setIsPerformanceModalOpen(true)}>
            <Gauge className="mr-2 h-4 w-4" />
            <span>Performance</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4" />
                <span>Currency</span>
              </div>
              <CurrencySelector />
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setIsOrderTrackingModalOpen(true)}>
            <Package className="mr-2 h-4 w-4" />
            <span>Order Tracking</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setIsMapModalOpen(true)}>
            <MapIcon className="mr-2 h-4 w-4" />
            <span>Interactive Map</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isPerformanceModalOpen} onOpenChange={setIsPerformanceModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Performance Statistics</DialogTitle>
          </DialogHeader>
          <PerformanceStats />
        </DialogContent>
      </Dialog>

      <Dialog open={isOrderTrackingModalOpen} onOpenChange={setIsOrderTrackingModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Order Tracking</DialogTitle>
          </DialogHeader>
          <OrderTracking />
        </DialogContent>
      </Dialog>

      <Dialog open={isMapModalOpen} onOpenChange={setIsMapModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Interactive Map</DialogTitle>
          </DialogHeader>
          <InteractiveMap />
        </DialogContent>
      </Dialog>

      <Dialog open={isUserSettingsModalOpen} onOpenChange={setIsUserSettingsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>User Profile & Personalization</DialogTitle>
          </DialogHeader>
          <UserSettings />
        </DialogContent>
      </Dialog>

      <Dialog open={isNotificationSettingsModalOpen} onOpenChange={setIsNotificationSettingsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Advanced Notification Settings</DialogTitle>
          </DialogHeader>
          <NotificationSettings />
        </DialogContent>
      </Dialog>

      <Dialog open={isAccessibilitySettingsModalOpen} onOpenChange={setIsAccessibilitySettingsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Accessibility & Usability</DialogTitle>
          </DialogHeader>
          <AccessibilitySettings />
        </DialogContent>
      </Dialog>

      <Dialog open={isPaymentAndSecurityModalOpen} onOpenChange={setIsPaymentAndSecurityModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Payment & Security</DialogTitle>
          </DialogHeader>
          <PaymentAndSecuritySettings />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeliveryPreferencesModalOpen} onOpenChange={setIsDeliveryPreferencesModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delivery Preferences</DialogTitle>
          </DialogHeader>
          <DeliveryPreferences />
        </DialogContent>
      </Dialog>

      <Dialog open={isFoodPreferencesModalOpen} onOpenChange={setIsFoodPreferencesModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Restaurant & Food Preferences</DialogTitle>
          </DialogHeader>
          <FoodPreferences />
        </DialogContent>
      </Dialog>

      <Dialog open={isSocialAndCommunityModalOpen} onOpenChange={setIsSocialAndCommunityModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
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
