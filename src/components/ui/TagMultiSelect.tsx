'use client';

import React from 'react';

type Props = {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
};

export default function TagMultiSelect({ options, value, onChange }: Props) {
  const toggleTag = (tag: string) => {
    if (value.includes(tag)) {
      onChange(value.filter((t) => t !== tag));
    } else {
      onChange([...value, tag]);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {options.map((tag) => {
        const isSelected = value.includes(tag);

        return (
          <button
            type="button"
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-4 py-2 rounded-full border text-sm transition-all
              ${
                isSelected
                  ? 'bg-[#4285f4] text-white border-[#4285f4]'
                  : 'bg-transparent text-gray-700 dark:text-white border-gray-300 dark:border-white/30 hover:border-gray-500 dark:hover:border-white'
              }
            `}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
