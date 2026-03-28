// src/components/dashboard/FilterSidebar.tsx
'use client';

import React, { useState } from 'react';
import styles from './FilterSidebar.module.css';

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
  const [selectedItems, setSelectedItems] = useState<string[]>(['6']); // Initial Cloud selected as per screen

  const toggleSection = (title: string) => {
    setExpandedSections(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const toggleItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <aside className={styles.sidebar}>
      {SECTIONS.map((section, idx) => {
        const isExpanded = expandedSections.includes(section.title);
        return (
          <div key={idx} className={styles.section}>
            <button 
              className={`${styles.header} ${!isExpanded ? styles.collapsed : ''}`} 
              onClick={() => toggleSection(section.title)}
            >
              {section.title}
              <span>{isExpanded ? '▲' : '▼'}</span>
            </button>
            {isExpanded && section.items.length > 0 && (
              <div className={styles.content}>
                <div className={styles.list}>
                  {section.items.map(item => {
                    const isChecked = selectedItems.includes(item.id);
                    return (
                      <div key={item.id} className={styles.item} onClick={() => toggleItem(item.id)}>
                        <div className={`${styles.checkbox} ${isChecked ? styles.checkboxChecked : ''}`}></div>
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
