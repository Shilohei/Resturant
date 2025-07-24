import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';

const AccessibilitySettings = () => {
  return (
    <div className="grid gap-6 py-4">
      {/* Font Size Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Font Size</h4>
        <div className="flex items-center gap-4">
          <Label>Small</Label>
          <Slider defaultValue={[2]} max={3} step={1} />
          <Label>Large</Label>
        </div>
      </div>

      <Separator />

      {/* High Contrast Mode Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Display</h4>
        <div className="flex items-center justify-between">
          <Label htmlFor="high-contrast-mode">High Contrast Mode</Label>
          <Switch id="high-contrast-mode" />
        </div>
      </div>

      <Separator />

      {/* Language Selection Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Language</h4>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Separator />

      {/* Voice Navigation Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Navigation</h4>
        <div className="flex items-center justify-between">
          <Label htmlFor="voice-navigation">Enable Voice Navigation</Label>
          <Switch id="voice-navigation" />
        </div>
      </div>

      <Button type="submit" className="mt-4">Save Changes</Button>
    </div>
  );
};

export default AccessibilitySettings;
