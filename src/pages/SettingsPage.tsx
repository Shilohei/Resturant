import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserSettings from '@/components/navbar/UserSettings';
import NotificationSettings from '@/components/navbar/NotificationSettings';
import AccessibilitySettings from '@/components/navbar/AccessibilitySettings';
import PaymentAndSecuritySettings from '@/components/navbar/PaymentAndSecuritySettings';
import DeliveryPreferences from '@/components/navbar/DeliveryPreferences';
import FoodPreferences from '@/components/navbar/FoodPreferences';
import SocialAndCommunity from '@/components/navbar/SocialAndCommunity';

const SettingsPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
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
