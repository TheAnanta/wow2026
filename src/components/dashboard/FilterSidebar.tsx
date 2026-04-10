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
  { title: 'Topics', items: [
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
    <aside className="border border-[#000000] rounded-xl bg-white w-full overflow-hidden">
      {SECTIONS.map((section, idx) => {
        const isExpanded = expandedSections.includes(section.title);
        return (
          <div key={idx} className="border-b border-[#000000] last:border-b-0">
            <button
              className={`w-full px-5 py-5 flex justify-between items-center cursor-pointer font-bold text-sm transition-colors ${
                isExpanded
                  ? 'bg-[#202124] text-white hover:bg-[#3c4043]'
                  : 'bg-white text-[#000000] hover:bg-[#f1f3f4]'
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
                        className="flex items-center gap-3 cursor-pointer text-sm font-medium"
                        onClick={() => toggleItem(item.id, item.name)}
                      >
                        <div className={`w-5 h-5 border border-[#000000] rounded-[4px] flex justify-center items-center ${isChecked ? 'bg-[#202124] checkbox-checked' : 'bg-white'}`} />
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
