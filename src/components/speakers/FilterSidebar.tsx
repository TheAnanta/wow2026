// src/components/speakers/FilterSidebar.tsx
import React from 'react';

interface FilterSidebarProps {
  topics: string[];
  selectedTopics: string[];
  onToggleTopic: (topic: string) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ topics, selectedTopics, onToggleTopic }) => {
  return (
    <aside className="border border-[#000000] rounded-xl bg-[#F8F9FA] p-6 w-full">
      <div className="text-lg font-semibold mb-6 pb-4 border-b border-[#000000]">Topics</div>
      <div className="flex flex-col gap-4">
        {topics.map(topic => {
          const isChecked = selectedTopics.includes(topic);
          return (
            <label key={topic} className="flex items-center gap-3 cursor-pointer">
              <div
                className={`w-5 h-5 border border-[#000000] rounded-[4px] flex items-center justify-center cursor-pointer ${isChecked ? 'bg-[#202124] text-white' : 'bg-white'}`}
                onClick={() => onToggleTopic(topic)}
              >
                {isChecked && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className="text-sm font-medium text-[#202124]">{topic}</span>
            </label>
          );
        })}
      </div>
    </aside>
  );
};
