// src/components/speakers/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = 'Search for a speaker' }) => {
  return (
    <div className="flex flex-col md:flex-row md:gap-7 mb-6">
      <div className="md:flex-1 w-full">
        <div className="flex relative w-full">
          <div className="flex items-center border-l-2 border-r-2 border-t-2 border-black dark:border-white dark:text-grey rounded-[100px] w-full h-[46px] md:h-14 bg-grey-bg dark:bg-white border-b-2">
            <div className="flex ml-4 w-8 items-center justify-center">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.0149 13.5249L20.7449 19.2549L19.2549 20.7449L13.5249 15.0149C12.4549 15.7849 11.1649 16.2549 9.75488 16.2549C6.16488 16.2549 3.25488 13.3449 3.25488 9.75488C3.25488 6.16488 6.16488 3.25488 9.75488 3.25488C13.3449 3.25488 16.2549 6.16488 16.2549 9.75488C16.2549 11.1649 15.7849 12.4549 15.0149 13.5249ZM9.75488 5.25488C7.26488 5.25488 5.25488 7.26488 5.25488 9.75488C5.25488 12.2449 7.26488 14.2549 9.75488 14.2549C12.2449 14.2549 14.2549 12.2449 14.2549 9.75488C14.2549 7.26488 12.2449 5.25488 9.75488 5.25488Z" fill="currentColor" />
              </svg>
            </div>
            <input
              type="text"
              className="focus:outline-none focus:ring-0 border-0 bg-transparent p-0 text-lg font-medium w-full placeholder:text-black dark:placeholder:text-grey-600 placeholder-shown:text-black placeholder:text-ellipsis placeholder-shown:text-ellipsis"
              value={value}
              onChange={onChange}
              placeholder={placeholder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
