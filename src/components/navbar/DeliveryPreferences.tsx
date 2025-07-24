import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

const DeliveryPreferences = () => {
  return (
    <div className="grid gap-6 py-4">
      {/* Delivery Time Slot Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Preferred Delivery Time</h4>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a time slot" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asap">As Soon as Possible</SelectItem>
            <SelectItem value="evening">5:00 PM - 7:00 PM</SelectItem>
            <SelectItem value="night">7:00 PM - 9:00 PM</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Contact Preferences Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Contact Preferences</h4>
        <RadioGroup defaultValue="leave-at-door">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="leave-at-door" id="leave-at-door" />
            <Label htmlFor="leave-at-door">Leave at my door</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hand-to-me" id="hand-to-me" />
            <Label htmlFor="hand-to-me">Hand it to me</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Special Instructions Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Special Instructions</h4>
        <Textarea placeholder="e.g., Ring the bell twice." />
      </div>

      <Separator />

      {/* Eco-Friendly Option Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Sustainability</h4>
        <div className="flex items-center justify-between">
          <Label htmlFor="eco-friendly">Eco-Friendly Packaging</Label>
          <Switch id="eco-friendly" />
        </div>
      </div>

      <Button type="submit" className="mt-4">Save Changes</Button>
    </div>
  );
};

export default DeliveryPreferences;
