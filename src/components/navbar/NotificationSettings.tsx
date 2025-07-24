import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const NotificationSettings = () => {
  return (
    <div className="grid gap-6 py-4">
      {/* Notification Channels Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Notification Channels</h4>
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications">Email Notifications</Label>
          <Switch id="email-notifications" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="push-notifications">Push Notifications</Label>
          <Switch id="push-notifications" defaultChecked />
        </div>
      </div>

      <Separator />

      {/* Promotional Messages Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Promotional Messages</h4>
        <div className="flex items-center justify-between">
          <Label htmlFor="promo-messages">Receive Promotions</Label>
          <Switch id="promo-messages" />
        </div>
      </div>

      <Separator />

      {/* Quiet Hours Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Quiet Hours</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="quiet-hours-start">From</Label>
            <Input id="quiet-hours-start" type="time" defaultValue="22:00" />
          </div>
          <div>
            <Label htmlFor="quiet-hours-end">To</Label>
            <Input id="quiet-hours-end" type="time" defaultValue="08:00" />
          </div>
        </div>
      </div>

      <Button type="submit" className="mt-4">Save Changes</Button>
    </div>
  );
};

export default NotificationSettings;
