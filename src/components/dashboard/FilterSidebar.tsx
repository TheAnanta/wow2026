// src/components/dashboard/FilterSidebar.tsx
'use client';

import React, { useState } from 'react';
import { analyticsService } from '../../services/analytics';

interface FilterItem {
  id: string;
  name: string;
}

interface FilterSection {
  title: string;
  items: FilterItem[];
}

const SECTIONS: FilterSection[] = [
  { title: 'Focus', items: [] },
  {
    title: 'Topics', items: [
      { id: '1', name: 'Accessibility' },
      { id: '2', name: 'Ads' },
      { id: '3', name: 'Android Ecosystem' },
      { id: '4', name: 'Augmented Reality' },
      { id: '5', name: 'Chrome OS' },
      { id: '6', name: 'Cloud' },
      { id: '7', name: 'Design' },
      { id: '8', name: 'Firebase' },
      { id: '9', name: 'Flutter' },
    ]
  },
  { title: 'Content type', items: [] },
  { title: 'Level', items: [] }
];

export const FilterSidebar: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['Topics']);
  const [selectedItems, setSelectedItems] = useState<string[]>(['6']);

  const toggleSection = (title: string) => {
    analyticsService.trackUI('dashboard_filter_section', title, 'Dashboard');
    setExpandedSections(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const toggleItem = (id: string, name: string) => {
    analyticsService.trackUI('dashboard_filter_item', name, 'Dashboard');
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <aside className="border border-[#000000] dark:border-white rounded-xl bg-white dark:bg-grey-900 w-full overflow-hidden">
      {SECTIONS.map((section, idx) => {
        const isExpanded = expandedSections.includes(section.title);
        return (
          <div key={idx} className="border-b border-[#000000] dark:border-white last:border-b-0">
            <button
              className={`w-full px-5 py-5 flex justify-between items-center cursor-pointer font-bold text-sm transition-colors ${isExpanded
                  ? 'bg-[#202124] text-white hover:bg-[#3c4043] dark:bg-white dark:text-grey-900 dark:hover:bg-grey-bg'
                  : 'bg-white text-[#000000] hover:bg-[#f1f3f4] dark:bg-grey-900 dark:text-white dark:hover:bg-grey'
                }`}
              onClick={() => toggleSection(section.title)}
            >
              {section.title}
              <span>{isExpanded ? '▲' : '▼'}</span>
            </button>
            {isExpanded && section.items.length > 0 && (
              <div className="p-5">
                <div className="flex flex-col gap-3">
                  {section.items.map(item => {
                    const isChecked = selectedItems.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 cursor-pointer text-sm font-medium dark:text-white"
                        onClick={() => toggleItem(item.id, item.name)}
                      >
                        <div className={`w-5 h-5 border border-[#000000] dark:border-white rounded-[4px] flex justify-center items-center transition-colors ${isChecked ? 'bg-[#202124] dark:bg-white' : 'bg-white dark:bg-transparent'}`}>
                          {isChecked && (
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" fill="currentColor" className="text-white dark:text-grey-900" />
                            </svg>
                          )}
                        </div>
                        <span>{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
};
