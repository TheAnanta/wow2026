// src/components/speakers/FilterSidebar.tsx
import React from 'react';

interface FilterSidebarProps {
  title?: string;
  items: string[];
  selectedItems: string[];
  onToggleItem: (item: string) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  title = 'Topics', 
  items, 
  selectedItems, 
  onToggleItem 
}) => {
  return (
    <aside className="w-full rounded-2xl border-2 border-grey-900 dark:border-white overflow-hidden bg-white dark:bg-grey-900">
      <h2 className="text-white font-medium bg-grey-900 dark:text-grey dark:bg-white py-4 px-5 sm:l-cta1">
        {title}
      </h2>
      
      <div className="flex flex-col gap-4 p-5 max-h-[525px] overflow-y-auto myio-scrollbar">
        {items.map(item => {
          const isChecked = selectedItems.includes(item);
          return (
            <label key={item} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggleItem(item)}
                className="checkbox"
              />
              <span className="sm:l-cta2 font-medium text-grey-900 dark:text-white group-hover:underline">
                {item}
              </span>
            </label>
          );
        })}
      </div>
    </aside>
  );
};
