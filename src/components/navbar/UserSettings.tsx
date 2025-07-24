import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

const UserSettings = () => {
  return (
    <div className="grid gap-6 py-4">
      {/* User Profile Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">User Profile</h4>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Full Name
          </Label>
          <Input id="name" defaultValue="John Doe" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input id="email" type="email" defaultValue="john.doe@example.com" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            Phone
          </Label>
          <Input id="phone" type="tel" defaultValue="+1 234 567 890" className="col-span-3" />
        </div>
      </div>

      <Separator />

      {/* Dietary Preferences Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Dietary Preferences</h4>
        <div className="flex items-center space-x-2">
          <Checkbox id="vegetarian" />
          <Label htmlFor="vegetarian">Vegetarian</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="vegan" />
          <Label htmlFor="vegan">Vegan</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="gluten-free" />
          <Label htmlFor="gluten-free">Gluten-Free</Label>
        </div>
      </div>

      <Separator />

      {/* Allergies Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Allergies</h4>
        <Textarea id="allergies" placeholder="e.g., Peanuts, Shellfish, Dairy" />
      </div>

      <Button type="submit" className="mt-4">Save Changes</Button>
    </div>
  );
};

export default UserSettings;
