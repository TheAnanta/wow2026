// src/components/sections/Footer.tsx
'use client';

import Link from 'next/link';
import React from 'react';
import { analyticsService } from '../../services/analytics';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="pt-10 pb-16 lg:py-12 px-6 lg:px-12 bg-text flex flex-col lg:flex-row lg:justify-between lg:items-center w-full mt-10">
      <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-8 lg:space-y-0 lg:space-x-10 text-[#9aa0a6] text-base font-medium flex-1">
        <div className="flex justify-between w-full lg:w-auto items-center mb-4 lg:mb-0">
          <a
            href="https://developers.google.com/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Google Developers homepage"
            onClick={() => analyticsService.trackNavigation('Google Developers', 'Footer', 'https://developers.google.com/')}
          >
            <img
              className="block"
              src="/images/Logo-GoogleForDevelopers.svg"
              aria-hidden="true"
              role="presentation"
              width="180"
              height="20"
              loading="lazy"
              alt="Google for Developers"
            />
          </a>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-4">
          <Link href="/" className="hover:text-white transition-colors duration-200" onClick={() => analyticsService.trackNavigation('WOW 2026', 'Footer')}>WOW 2026</Link>
          <Link href="/terms" className="hover:text-white transition-colors duration-200" onClick={() => analyticsService.trackNavigation('Privacy & terms', 'Footer', '/terms')}>Privacy & terms</Link>
          <Link href="/code-of-conduct" className="hover:text-white transition-colors duration-200" onClick={() => analyticsService.trackNavigation('Community guidelines', 'Footer', '/code-of-conduct')}>Community guidelines</Link>
          <Link href="/about" className="hover:text-white transition-colors duration-200" onClick={() => analyticsService.trackNavigation('FAQ', 'Footer', '/about')}>FAQ</Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center mt-10 lg:mt-0 gap-6 lg:gap-8">
        <div className="flex items-center gap-2">
          <a href="#" className="p-2 opacity-70 hover:opacity-100 transition-opacity"><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M10 15L15.19 12L10 9V15ZM21.56 7.17C21.6 7.64 21.68 8.22 21.72 8.83C21.77 9.44 21.79 10.15 21.79 10.96V13.04C21.79 13.85 21.77 14.56 21.72 15.17C21.68 15.78 21.6 16.36 21.56 16.83C21.46 17.64 21.16 18.23 20.66 18.6C20.16 18.97 19.51 19.22 18.72 19.34C17.93 19.46 16.92 19.55 15.71 19.62C14.5 19.69 13.26 19.72 12 19.72C10.74 19.72 9.5 19.69 8.29 19.62C7.08 19.55 6.07 19.46 5.28 19.34C4.49 19.22 3.84 18.97 3.34 18.6C2.84 18.23 2.54 17.64 2.44 16.83C2.39 16.36 2.32 15.78 2.28 15.17C2.23 14.56 2.21 13.85 2.21 13.04V10.96C2.21 10.15 2.23 9.44 2.28 8.83C2.32 8.22 2.39 7.64 2.44 7.17C2.54 6.36 2.84 5.77 3.34 5.4C3.84 5.03 4.49 4.78 5.28 4.66C6.07 4.54 7.08 4.45 8.29 4.38C9.5 4.31 10.74 4.28 12 4.28C13.26 4.28 14.5 4.31 15.71 4.38C16.92 4.45 17.93 4.54 18.72 4.66C19.51 4.78 20.16 5.03 20.66 5.4C21.16 5.77 21.46 6.36 21.56 7.17Z" /></svg></a>
          <a href="#" className="p-2 opacity-70 hover:opacity-100 transition-opacity"><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2.16C15.2 2.16 15.58 2.17 16.85 2.23C18.02 2.28 18.65 2.48 19.07 2.64C19.63 2.86 20.03 3.12 20.45 3.55C20.88 3.97 21.14 4.37 21.36 4.93C21.52 5.35 21.72 5.98 21.77 7.15C21.83 8.42 21.84 8.8 21.84 12C21.84 15.2 21.83 15.58 21.77 16.85C21.72 18.02 21.52 18.65 21.36 19.07C21.14 19.63 20.88 20.03 20.45 20.45C20.03 20.88 19.63 21.14 19.07 21.36C18.65 21.52 18.02 21.72 16.85 21.77C15.58 21.83 15.2 21.84 12 21.84C8.8 21.84 8.42 21.83 7.15 21.77C5.98 21.72 5.35 21.52 4.93 21.36C4.37 21.14 3.97 20.88 3.55 20.45C3.12 20.03 2.86 19.63 2.64 19.07C2.48 18.65 2.28 18.02 2.23 16.85C2.17 15.58 2.16 15.2 2.16 12C2.16 8.8 2.17 8.42 2.23 7.15C2.28 5.98 2.48 5.35 2.64 4.93C2.86 4.37 3.12 3.97 3.55 3.55C3.97 3.12 4.37 2.86 4.93 2.64C5.35 2.48 5.98 2.28 7.15 2.23C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33 0.01 7.05 0.07C5.77 0.13 4.9 0.33 4.14 0.63C3.36 0.93 2.7 1.33 2.04 1.99C1.38 2.65 0.98 3.31 0.68 4.09C0.38 4.85 0.18 5.72 0.12 7C0.06 8.28 0.05 8.69 0.05 11.95C0.05 15.21 0.06 15.62 0.12 16.9C0.18 18.18 0.38 19.05 0.68 19.81C0.98 20.59 1.38 21.25 2.04 21.91C2.7 22.57 3.36 22.97 4.14 23.27C4.9 23.57 5.77 23.77 7.05 23.83C8.33 23.89 8.74 23.9 12 23.9C15.26 23.9 15.67 23.89 16.95 23.83C18.23 23.77 19.1 23.57 19.86 23.27C20.64 22.97 21.3 22.57 21.96 21.91C22.62 21.25 23.02 20.59 23.32 19.81C23.62 19.05 23.82 18.18 23.88 16.9C23.94 15.62 23.95 15.21 23.95 11.95C23.95 8.69 23.94 8.28 23.88 7C23.82 5.72 23.62 4.85 23.32 4.09C23.02 3.31 22.62 2.65 21.96 1.99C21.3 1.33 20.64 0.93 19.86 0.63C19.1 0.33 18.23 0.13 16.95 0.07C15.67 0.01 15.26 0 12 0Z" /><path d="M12 5.83C8.59 5.83 5.83 8.59 5.83 12C5.83 15.41 8.59 18.17 12 18.17C15.41 18.17 18.17 15.41 18.17 12C18.17 8.59 15.41 5.83 12 5.83ZM12 16.01C9.79 16.01 7.99 14.21 7.99 12C7.99 9.79 9.79 7.99 12 7.99C14.21 7.99 16.01 9.79 16.01 12C16.01 14.21 14.21 16.01 12 16.01Z" /><path d="M18.41 4.15C17.61 4.15 16.96 4.8 16.96 5.6C16.96 6.4 17.61 7.05 18.41 7.05C19.21 7.05 19.86 6.4 19.86 5.6C19.86 4.8 19.21 4.15 18.41 4.15Z" /></svg></a>
          <a href="#" className="p-2 opacity-70 hover:opacity-100 transition-opacity"><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM8.339 18.337H5.667V10.158H8.339V18.337ZM7.003 9.041C6.145 9.041 5.451 8.347 5.451 7.489C5.451 6.63 6.145 5.937 7.003 5.937C7.861 5.937 8.555 6.63 8.555 7.489C8.555 8.347 7.861 9.041 7.003 9.041ZM18.338 18.337H15.668V14.152C15.668 13.153 15.649 11.87 14.277 11.87C12.885 11.87 12.671 12.956 12.671 14.079V18.337H10.003V10.158H12.565V11.275H12.601C12.958 10.6 13.826 9.888 15.122 9.888C17.82 9.888 18.338 11.664 18.338 13.978V18.337Z" /></svg></a>
          <a href="#" className="p-2 opacity-70 hover:opacity-100 transition-opacity"><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M22.162 5.6559C21.3985 5.9936 20.589 6.216 19.76 6.3139C20.6265 5.8143 21.2718 5.0145 21.579 4.0759C20.77 4.5429 19.88 4.8699 18.96 5.0459C18.3308 4.394 17.5113 3.9926 16.635 3.9079C14.73 3.9079 13.19 5.3469 13.19 7.1259C13.19 7.3759 13.22 7.6159 13.28 7.8559C10.41 7.7259 7.86 6.4459 6.16 4.4959C5.87 4.9759 5.71 5.5159 5.71 6.1059C5.71 7.2159 6.32 8.1959 7.24 8.7659C6.68 8.7559 6.16 8.6059 5.71 8.3659V8.4059C5.71 9.9459 6.89 11.2359 8.46 11.5359C8.17 11.6059 7.87 11.6359 7.58 11.6359C7.38 11.6359 7.18 11.6259 6.99 11.5959C7.43 12.8759 8.72 13.8059 10.25 13.8359C9.05 14.7159 7.54 15.2359 5.91 15.2359C5.63 15.2359 5.35 15.2259 5.08 15.1959C6.63 16.1259 8.44 16.6659 10.39 16.6659C16.76 16.6659 20.24 11.8359 20.24 7.5859V7.1759C20.94 6.6659 21.6 6.0159 22.162 5.6559Z" /></svg></a>
        </div>
        <div className="flex items-center gap-6 mt-4 lg:mt-0">
          <button className="text-[#9aa0a6] hover:text-white transition-colors duration-200 text-sm font-medium">Manage cookies</button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3V4M12 20V21M21 12H20M4 12H3M18.364 18.364L17.6569 17.6569M6.34315 6.34315L5.63604 5.63604M18.364 5.63604L17.6569 6.34315M6.34315 17.6569L5.63604 18.364M12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8Z" stroke="#9AA0A6" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>
    </footer>

  );
};
