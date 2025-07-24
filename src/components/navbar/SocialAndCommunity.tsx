import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const SocialAndCommunity = () => {
  return (
    <div className="grid gap-6 py-4">
      {/* Social Media Connections Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Connect Your Accounts</h4>
        <div className="flex items-center justify-between">
          <Label>Facebook</Label>
          <Button variant="outline">Connect</Button>
        </div>
        <div className="flex items-center justify-between">
          <Label>Twitter</Label>
          <Button variant="outline">Connect</Button>
        </div>
      </div>

      <Separator />

      {/* Sharing Preferences Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Sharing Preferences</h4>
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-share-reviews">Auto-share new reviews</Label>
          <Switch id="auto-share-reviews" />
        </div>
      </div>

      <Separator />

      {/* Loyalty Program Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Loyalty Program</h4>
        <div className="flex items-center justify-between">
          <Label htmlFor="loyalty-program">Join the Loyalty Program</Label>
          <Switch id="loyalty-program" defaultChecked />
        </div>
        <p className="text-sm text-muted-foreground">
          Earn points on every order and get exclusive rewards.
        </p>
      </div>

      <Button type="submit" className="mt-4">Save Changes</Button>
    </div>
  );
};

export default SocialAndCommunity;
