// src/components/speakers/SearchBar.tsx
import React from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = 'Search for a speaker' }) => {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>&#8981;</span>
      <input 
        type="text" 
        className={styles.input} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
      />
    </div>
  );
};
