// src/components/sections/Header.tsx
'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { signInWithGoogle, logout } from '../../services/firebase';
import { analyticsService } from '../../services/analytics';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface HeaderProps {
  onRegisterClick: () => void;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ onRegisterClick, className }) => {
  const { user, profile, isLoggedIn, isUnregistered } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleAction = () => {
    if (!isLoggedIn) {
      analyticsService.trackCTA('Sign in', 'Header');
      signInWithGoogle().catch(console.error);
    } else if (isUnregistered || !profile) {
      analyticsService.trackCTA('Complete registration', 'Header');
      router.push('/register');
    } else {
      analyticsService.trackCTA('Sign out', 'Header');
      logout().catch(console.error);
    }
  };

  const navLinks = [
    { label: 'WOW+', href: '/wow-plus' },
    { label: 'Explore', href: '/explore' },
    { label: 'Speakers', href: '/speakers' },
    { label: 'Team', href: '/team' },
    { label: 'Community', href: '/community' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header id="main-header" className={`bg-white dark:bg-grey-900! border-grey-900 dark:border-grey-bg! border-b-[1.2px] md:border-b-2 w-full ${className}`}>
      <nav className="max-w-[1640px] mx-auto h-[66px] px-[20px] md:px-[60px] flex items-center justify-between">
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/" className="mr-[24px]" aria-label="Google WOW homepage">
            GDG<span className='font-black'>WOW</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => analyticsService.trackNavigation(link.label, 'Header', link.href)}
                className="nav-links text-[16px] font-medium mr-[24px]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden text-md:flex items-center">
            <div className="h-choose-language group relative" data-in-footer="">
              <select
                name="language-select"
                aria-label="Drop down to select language"
                className="font-medium language-select focus-trapped text-grey-900 dark:text-white w-full border-none pl-0 ml:w-32 ml:pl-4 sm:s-cta2 md:s-cta1 cursor-pointer appearance-none bg-transparent"
                defaultValue="en"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="bn">বাংলা</option>
                <option value="te">తెలుగు</option>
                <option value="mr">मराठी</option>
                <option value="ta">தமிழ்</option>
                <option value="gu">ગુજરાતી</option>
                <option value="kn">ಕನ್ನಡ</option>
                <option value="ml">മലയാളം</option>
                <option value="pa">ਪੰਜਾਬੀ</option>
              </select>
              <div style={{ zIndex: 10, top: '48px', right: '0' }} className="absolute invisible group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                <div className="bg-white dark:bg-grey-900! dark:text-grey-200 border-2 border-grey-900 dark:border-grey-200 text-grey-900 sm:l-cta2 font-medium p-3 pr-6 w-max relative shadow-xl space-x-4!">
                  <span>In-person content is available in English only </span>
                  <button type="button" className="absolute top-0 bottom-0 right-0 px-2" aria-label="Close">
                    <svg className="fill-current dark:fill-white text-grey-900 w-6 h-6 forced-white-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                      <path d="m14.53 4.53-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                    </svg>
                  </button>
                </div>
                <svg width="32" height="20" viewBox="-2 -2 37 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scale(-1, 1)', right: '10px', top: '-18px' }} aria-hidden="true" className="absolute block dark:hidden hcm-hidden">
                  <path d="M0.138981 4.44226C0.0834319 1.0678 3.97439 -0.854559 6.62079 1.23988L35.9246 24.4317C37.4112 25.6083 36.5792 28 34.6834 28L2.49412 28C1.40238 28 0.512363 27.1245 0.494394 26.0329L0.138981 4.44226Z" fill="#fff" stroke="#202124" strokeWidth="2.5"></path>
                </svg>
                <svg width="32" height="20" viewBox="-2 -2 37 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scale(-1, 1)', right: '10px', top: '-18px' }} aria-hidden="true" className="absolute hidden dark:block hcm-block">
                  <path d="M0.138981 4.44226C0.0834319 1.0678 3.97439 -0.854559 6.62079 1.23988L35.9246 24.4317C37.4112 25.6083 36.5792 28 34.6834 28L2.49412 28C1.40238 28 0.512363 27.1245 0.494394 26.0329L0.138981 4.44226Z" fill="#202124" stroke="#E8EAED" strokeWidth="2.5"></path>
                </svg>
              </div>
            </div>
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
                <Link href="/profile">
                  <img
                    src={profile?.profile_url.replaceAll('=s96-c', '') || user?.photoURL?.replaceAll('=s96-c', '') || ''}
                    alt="Profile"
                    referrerPolicy='no-referrer'
                    className="w-[40px] h-[40px] rounded-full border-[1.2px] border-grey-900 object-cover bg-white"
                  />
                </Link>
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
              <Link
                key={link.label}
                href={link.href}
                className="text-[20px] font-medium text-grey-900 py-3 border-b border-grey-bg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
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
