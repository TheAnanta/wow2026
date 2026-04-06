// src/components/sections/Header.tsx
'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { signInWithGoogle } from '../../services/firebase';

interface HeaderProps {
  onRegisterClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onRegisterClick }) => {
  const { user, profile, isLoggedIn, isUnregistered } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAction = () => {
    if (isLoggedIn && (isUnregistered || !profile)) {
      onRegisterClick();
    } else if (!isLoggedIn) {
      signInWithGoogle().catch(console.error);
    }
  };

  const navLinks = [
    { label: 'Explore', href: '/explore' },
    { label: 'Speakers', href: '/speakers' },
    { label: 'Team', href: '/team' },
    { label: 'Community', href: '/community' },
    { label: 'About', href: '/faq' },
  ];

  return (
    <header id="main-header" className="bg-white border-grey-900 border-b-[1.2px] md:border-b-2 w-full">
      <nav className="max-w-[1640px] mx-auto h-[66px] px-[20px] md:px-[60px] flex items-center justify-between">
        <div className="flex items-center">
          {/* Logo */}
          <a href="/" className="mr-[24px]" aria-label="Google WOW homepage">
            GDG<span className='font-black'>WOW</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-links text-[16px] font-medium mr-[24px]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center">
            <span className="mr-4 text-[14px] font-medium hidden xl:block">English</span>
          </div>

          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <button
                onClick={handleAction}
                className="nav-cta-btn px-[24px] py-[8px] rounded-full bg-google-blue text-white font-medium text-[14px] md:text-[20px]"
              >
                Sign in
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={handleAction}
                  className="text-[16px] font-medium hover:underline"
                >
                  {isUnregistered ? 'Complete registration' : 'Sign out'}
                </button>
                <img
                  src={profile?.profile_url || user?.photoURL || ''}
                  alt="Profile"
                  className="w-[40px] h-[40px] rounded-full border-[1.2px] border-grey-900 object-cover bg-white"
                />
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            id="hamburger"
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="#202124" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div className="drawer-mask md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu Drawer */}
      <div className={`drawer-nav md:hidden ${isMobileMenuOpen ? 'show' : ''}`}>
        <div className="p-[20px]">
          <div className="flex justify-between items-center mb-[32px]">
            <img src="https://io.google/2024/app/images/io24-logo-mobile.svg" alt="Google WOW" className="h-[30px]" />
            <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#202124" /></svg>
            </button>
          </div>
          <div className="flex flex-col gap-[16px]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[20px] font-medium text-grey-900 py-3 border-b border-grey-bg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-8">
              {!isLoggedIn ? (
                <button
                  onClick={() => { setIsMobileMenuOpen(false); handleAction(); }}
                  className="nav-cta-btn w-full py-4 text-[20px] rounded-full bg-google-blue text-white font-medium"
                >
                  Sign in
                </button>
              ) : (
                <button
                  onClick={() => { setIsMobileMenuOpen(false); handleAction(); }}
                  className="text-center w-full py-4 text-[20px] font-medium border-2 border-grey-900 rounded-full"
                >
                  Sign out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
