"use client";
import React from 'react';

interface FilterItem {
  id: string;
  label: string;
  classification: string;
  analyticsFilter: string;
}

interface FilterCategory {
  id: string;
  title: string;
  classification: string;
  items: FilterItem[];
}

interface FilterSectionProps {
  categories: FilterCategory[];
  expandedCategories: Record<string, boolean>;
  onCategoryClick: (id: string, event: React.MouseEvent) => void;
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  trackFilter?: (e: any) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  categories,
  expandedCategories,
  onCategoryClick,
  onFilterChange,
  trackFilter
}) => {
  return (
    <div className="flex flex-col">
      {categories.map((category) => (
        <div key={category.id} className="filter-box w-full max-h-[525px]">
          <button
            type="button"
            className={`filter-box__header bg-grey-900 dark:bg-white py-4 px-5 align-center ${expandedCategories[category.classification] ? "border-b-2 border-gray-900" : ""}`}
            aria-expanded={expandedCategories[category.classification]}
            aria-label={`Filter menu for ${category.classification}.`}
            onClick={(event) => onCategoryClick(category.title, event)}
          >
            <h2
              id={`${category.classification}-filters`}
              className="text-white font-medium dark:text-grey"
            >
              {category.title}
            </h2>
            <div className={`filter-box__chevron ${!expandedCategories[category.classification] ? "transform -scale-y-100" : ""}`}>
              <img
                className="hidden dark:block hcm-light-display"
                src="https://io.google/2024/app/images/chevron-up.svg"
                aria-hidden="true"
              />
              <img
                className="block dark:hidden hcm-dark-display"
                src="https://io.google/2024/app/images/chevron-up-white.svg"
                aria-hidden="true"
              />
            </div>
          </button>
          <div
            className={`filter-box__items ${category.classification === 'topic' ? 'flex flex-col h-full pl-6 py-4 pr-7 overflow-y-auto max-h-[349px]' : ''} ${!expandedCategories[category.classification] ? "hide" : ""}`}
            role="list"
            aria-labelledby={`${category.classification}-filters`}
          >
            {category.items.map((item) => (
              <div key={item.id} role="listitem">
                <div className="filter-box__item">
                  <input
                    type="checkbox"
                    id={item.id}
                    name={item.id}
                    className="checkbox"
                    onChange={(e) => {
                       if (trackFilter) trackFilter(e);
                       onFilterChange(e);
                    }}
                    data-classification={item.classification}
                    data-analytics-filter={item.analyticsFilter}
                    data-analytics-defer="false"
                    data-label={item.label}
                    data-id={item.id}
                    aria-label={item.label}
                  />
                  <label
                    className="filter-box__option-text"
                    htmlFor={item.id}
                    aria-hidden="true"
                  >
                    <div className="">
                      {category.classification === 'topic' ? (
                        <div className="h-translated-category" data-name={item.label} data-speaker="False">
                          <span>{item.label}</span>
                        </div>
                      ) : (
                        <span>{item.label}</span>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
