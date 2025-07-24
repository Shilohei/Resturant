import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { CreditCard } from 'lucide-react';

const PaymentAndSecuritySettings = () => {
  return (
    <div className="grid gap-6 py-4">
      {/* Saved Payment Methods Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Saved Payment Methods</h4>
        <div className="flex items-center justify-between rounded-md border p-4">
          <div className="flex items-center gap-4">
            <CreditCard className="h-6 w-6" />
            <div>
              <p className="font-medium">Visa ending in 1234</p>
              <p className="text-sm text-muted-foreground">Expires 12/2025</p>
            </div>
          </div>
          <Button variant="outline" size="sm">Remove</Button>
        </div>
        <Button>Add New Card</Button>
      </div>

      <Separator />

      {/* Billing Address Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Billing Address</h4>
        <div className="rounded-md border p-4">
          <p className="font-medium">John Doe</p>
          <p className="text-sm text-muted-foreground">123 Main St, Anytown, USA 12345</p>
        </div>
        <Button variant="outline">Edit Address</Button>
      </div>

      <Separator />

      {/* Security Settings Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Security</h4>
        <div className="flex items-center justify-between">
          <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
          <Switch id="two-factor-auth" />
        </div>
      </div>

      <Button type="submit" className="mt-4">Save Changes</Button>
    </div>
  );
};

export default PaymentAndSecuritySettings;
