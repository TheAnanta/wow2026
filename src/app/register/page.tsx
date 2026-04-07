'use client';

import React from 'react';
import { RegistrationForm } from '../../components/registration/RegistrationForm';
import { Header } from '../../components/sections/Header';
import { Footer } from '../../components/sections/Footer';

export default function RegisterPage() {
  return (
    <div className="w-full min-h-screen bg-grey-bg dark:bg-grey text-grey-900 dark:text-white flex flex-col transition-colors duration-300">
      <Header onRegisterClick={() => {}} />
      
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Subtle Mesh Gradient Overlay - Refined for both modes */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 0% 0%, #4285F4 0%, transparent 50%), radial-gradient(circle at 100% 0%, #34A853 0%, transparent 50%), radial-gradient(circle at 100% 100%, #FBBC04 0%, transparent 50%), radial-gradient(circle at 0% 100%, #EA4335 0%, transparent 50%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 py-8 md:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Column: Branding & Illustration */}
            <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left items-center lg:items-start animate-fade-in">
              <div className="mb-6">
                <img 
                  src="https://io.google/2024/app/images/io24-logo-mobile.svg" 
                  alt="GDG WOW" 
                  className="h-10 md:h-12 dark:brightness-0 dark:invert transition-all"
                />
              </div>
              
              <h1 className="font-medium mb-6 sm:s-h2 md:l-h1 tracking-tight leading-tight">
                Register for <span className="text-google-blue">WOW</span> 2026
              </h1>
              
              <p className="font-medium sm:s-h6 md:l-h6 text-grey-text dark:text-grey-bg/80 mb-8 max-w-[500px]">
                Join us for an immersive developer experience. Tune in for live keynotes, technical sessions, and community highlights.
              </p>

              <div className="hidden lg:block w-full max-w-[550px] relative">
                 <img 
                   src="https://io.google/2024/app/images/io24-explore-hero.webp" 
                   alt="Explore WOW" 
                   className="w-full h-auto object-contain dark:hidden"
                 />
                 <img 
                   src="https://io.google/2024/app/images/io24-explore-hero-dark.webp" 
                   alt="Explore WOW" 
                   className="w-full h-auto object-contain hidden dark:block"
                 />
              </div>
            </div>

            {/* Right Column: Registration Form Card */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end animate-slide-up">
              <div className="w-full max-w-[620px] bg-white dark:bg-grey-900 rounded-[24px] border-[1.5px] md:border-2 border-grey-900 dark:border-grey-bg shadow-[8px_8px_0px_rgba(32,33,36,1)] dark:shadow-[8px_8px_0px_rgba(241,243,244,1)] overflow-hidden">
                <div className="p-6 md:p-10 lg:p-12">
                   <RegistrationForm />
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
