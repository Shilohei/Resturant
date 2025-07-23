import React from 'react';
import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp, Leaf, Wheat } from 'lucide-react';

// Define the filter options
const filterOptions = [
  { value: 'vegan', label: 'Vegan', icon: <Leaf className="h-4 w-4 text-green-500" /> },
  { value: 'gluten-free', label: 'Gluten-Free', icon: <Wheat className="h-4 w-4 text-yellow-600" /> },
  { value: 'keto', label: 'Keto', icon: <div className="text-xs font-bold text-blue-500">K</div> },
];

interface MenuFilterProps {
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
}

const MenuFilter: React.FC<MenuFilterProps> = ({ selectedFilters, setSelectedFilters }) => {
  const handleValueChange = (value: string) => {
    const newFilters = selectedFilters.includes(value)
      ? selectedFilters.filter((item) => item !== value)
      : [...selectedFilters, value];
    setSelectedFilters(newFilters);
  };

  return (
    <Select.Root onValueChange={handleValueChange}>
      <Select.Trigger 
        className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium font-inter bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm border border-white/20 dark:border-neutral-700/60 text-neutral-800 dark:text-neutral-200 hover:bg-white/70 dark:hover:bg-neutral-800/70 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-60 transition-all duration-300 shadow-sm hover:shadow-md data-[placeholder]:text-neutral-500"
        aria-label="Filter Menu"
      >
        <Select.Value placeholder="Filter by diet..." />
        <Select.Icon className="ml-2">
          <ChevronDown className="h-4 w-4" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content 
          position="popper" 
          sideOffset={5}
          className="overflow-hidden bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-white/20 dark:border-neutral-700/60 rounded-2xl shadow-lg z-50 w-[--radix-select-trigger-width]"
        >
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 cursor-default">
            <ChevronUp className="h-4 w-4" />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-2">
            <Select.Label className="px-4 py-2 text-xs text-neutral-500 font-inter">Dietary Options</Select.Label>
            {filterOptions.map(option => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="text-sm leading-none text-neutral-800 dark:text-neutral-200 rounded-lg flex items-center h-[35px] px-4 relative select-none data-[disabled]:text-neutral-400 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-amber-500/20 dark:data-[highlighted]:bg-amber-500/30 data-[highlighted]:text-amber-900 dark:data-[highlighted]:text-amber-100 cursor-pointer"
              >
                <Select.ItemText>
                  <div className="flex items-center gap-3">
                    {option.icon}
                    <span>{option.label}</span>
                  </div>
                </Select.ItemText>
                <Select.ItemIndicator className="absolute right-4 inline-flex items-center">
                  <Check className="h-4 w-4" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>

          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 cursor-default">
            <ChevronDown className="h-4 w-4" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default MenuFilter;
