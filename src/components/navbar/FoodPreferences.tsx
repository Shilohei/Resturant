import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';

const FoodPreferences = () => {
  return (
    <div className="grid gap-6 py-4">
      {/* Preferred Cuisines Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Preferred Cuisines</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="italian" />
            <Label htmlFor="italian">Italian</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="mexican" />
            <Label htmlFor="mexican">Mexican</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="chinese" />
            <Label htmlFor="chinese">Chinese</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="indian" />
            <Label htmlFor="indian">Indian</Label>
          </div>
        </div>
      </div>

      <Separator />

      {/* Price Range Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Price Range</h4>
        <RadioGroup defaultValue="any">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="any" id="price-any" />
            <Label htmlFor="price-any">Any</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cheap" id="price-cheap" />
            <Label htmlFor="price-cheap">$</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="moderate" id="price-moderate" />
            <Label htmlFor="price-moderate">$$</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="expensive" id="price-expensive" />
            <Label htmlFor="price-expensive">$$$</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Restaurant Rating Section */}
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Minimum Restaurant Rating</h4>
        <div className="flex items-center gap-4">
          <Label>1 Star</Label>
          <Slider defaultValue={[4]} max={5} step={1} />
          <Label>5 Stars</Label>
        </div>
      </div>

      <Button type="submit" className="mt-4">Save Changes</Button>
    </div>
  );
};

export default FoodPreferences;
