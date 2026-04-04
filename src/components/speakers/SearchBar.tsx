// src/components/speakers/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = 'Search for a speaker' }) => {
  return (
    <div className="flex items-center border border-[#000000] rounded-full bg-white py-3 px-6 w-full">
      <span className="mr-4 text-xl text-[#202124] leading-none">&#8981;</span>
      <input
        type="text"
        className="border-none outline-none text-base font-[inherit] w-full bg-transparent text-[#202124]"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};
