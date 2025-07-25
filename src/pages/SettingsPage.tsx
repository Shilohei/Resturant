import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import UserSettings from '@/components/navbar/UserSettings';
import NotificationSettings from '@/components/navbar/NotificationSettings';
import AccessibilitySettings from '@/components/navbar/AccessibilitySettings';
import PaymentAndSecuritySettings from '@/components/navbar/PaymentAndSecuritySettings';
import DeliveryPreferences from '@/components/navbar/DeliveryPreferences';
import FoodPreferences from '@/components/navbar/FoodPreferences';
import SocialAndCommunity from '@/components/navbar/SocialAndCommunity';
import CurrencySelector from '@/components/navbar/CurrencySelector';
import { 
  User, Bell, Accessibility, CreditCard, Truck, Utensils, Users, DollarSign 
} from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Settings & Preferences
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Customize your dining experience with personalized settings and preferences
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Quick Settings</h3>
                  <p className="text-sm text-muted-foreground">Frequently used preferences</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Currency:</span>
                    <CurrencySelector />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Settings Grid */}
        <div className="grid gap-6 md:gap-8">
          {/* Row 1: User & Notifications */}
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xl">User Profile</div>
                      <div className="text-sm text-muted-foreground font-normal">
                        Personal information & account settings
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  <UserSettings />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Bell className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-xl">Notifications</div>
                      <div className="text-sm text-muted-foreground font-normal">
                        Communication & alert preferences
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  <NotificationSettings />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Row 2: Accessibility & Payment */}
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Accessibility className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <div className="text-xl">Accessibility</div>
                      <div className="text-sm text-muted-foreground font-normal">
                        Display & usability options
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  <AccessibilitySettings />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <CreditCard className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <div className="text-xl">Payment & Security</div>
                      <div className="text-sm text-muted-foreground font-normal">
                        Payment methods & security settings
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  <PaymentAndSecuritySettings />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Row 3: Delivery & Food Preferences */}
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                      <Truck className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <div className="text-xl">Delivery Preferences</div>
                      <div className="text-sm text-muted-foreground font-normal">
                        Delivery options & instructions
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  <DeliveryPreferences />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/10 rounded-lg">
                      <Utensils className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <div className="text-xl">Food Preferences</div>
                      <div className="text-sm text-muted-foreground font-normal">
                        Dietary restrictions & cuisine preferences
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  <FoodPreferences />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Row 4: Social & Community (Full Width) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-pink-500/10 rounded-lg">
                    <Users className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <div className="text-xl">Social & Community</div>
                    <div className="text-sm text-muted-foreground font-normal">
                      Social features, sharing & community settings
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <SocialAndCommunity />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full">
            <Badge variant="secondary" className="text-xs">
              Settings Auto-Save
            </Badge>
            <span className="text-sm text-muted-foreground">
              Your preferences are automatically saved
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
          <CardHeader>
            <CardTitle>User Profile & Personalization</CardTitle>
          </CardHeader>
          <CardContent>
            <UserSettings />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <NotificationSettings />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Accessibility</CardTitle>
          </CardHeader>
          <CardContent>
            <AccessibilitySettings />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment & Security</CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentAndSecuritySettings />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Delivery Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <DeliveryPreferences />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Food Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <FoodPreferences />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Social & Community</CardTitle>
          </CardHeader>
          <CardContent>
            <SocialAndCommunity />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
