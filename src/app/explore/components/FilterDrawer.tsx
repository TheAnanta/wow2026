'use client';

import React from 'react';
import { FilterCategory } from '../constants';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: FilterCategory[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (id: string, checked: boolean, categoryId: string) => void;
  onClearAll: () => void;
  resultsCount: number;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  categories,
  selectedFilters,
  onFilterChange,
  onClearAll,
  resultsCount,
}: FilterDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-[400px] bg-white dark:bg-grey-900! shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform translate-x-0 rounded-l-2xl border-l-2 border-grey-900 dark:border-grey-bg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b dark:border-grey-bg bg-white dark:bg-grey-900!">
          <h2 className="sm:l-h5 md:l-h4 font-medium dark:text-white">Filter</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-grey-100 dark:hover:bg-grey-800! rounded-full transition-colors"
            aria-label="Close filters"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" className="fill-current text-grey-900 w-6 h-6 dark:text-white">
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-white dark:bg-grey-900!">
          {categories.map((category) => (
            <div key={category.id} className="mb-8">
              <h3 className="sm:l-cta1 font-medium mb-4 dark:text-white">{category.title}</h3>
              <div className="space-y-4">
                {category.items.map((option) => (
                  <div key={option.id} className="flex items-center">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        id={`mobile-${option.id}`}
                        checked={selectedFilters[category.classification]?.includes(option.id) || false}
                        onChange={(e) => onFilterChange(option.id, e.target.checked, category.classification)}
                        className="peer appearance-none border-2 border-grey-900 dark:border-white h-5 w-5 rounded focus:outline-none focus:ring-2 focus:ring-google-blue transition-all cursor-pointer checked:bg-google-blue checked:border-google-blue dark:checked:bg-white dark:checked:border-white"
                      />
                      <svg
                        className="absolute w-3 h-3 text-white dark:text-grey-900 pointer-events-none hidden peer-checked:block left-1 top-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <label
                      htmlFor={`mobile-${option.id}`}
                      className="ml-3 sm:l-cta2 font-medium dark:text-grey-bg cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-5 border-t dark:border-grey-bg bg-white dark:bg-grey-900!">
          <div className="flex gap-4">
            <button
              onClick={onClearAll}
              className="flex-1 py-3 px-4 rounded-full border-2 border-grey-900 dark:border-white text-grey-900 dark:text-white font-medium hover:bg-grey-100 dark:hover:bg-grey-800! transition-colors"
            >
              Clear all
            </button>
            <button
              onClick={onClose}
              className="flex-[2] py-3 px-4 rounded-full bg-grey-900 dark:bg-white text-white dark:text-grey-900 font-medium hover:opacity-90 transition-opacity"
            >
              Show {resultsCount} results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
