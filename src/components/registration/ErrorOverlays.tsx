// src/components/registration/ErrorOverlays.tsx
import React from 'react';

interface ErrorOverlayProps {
  type: 'signin' | 'account' | 'general';
  onTryAgain: () => void;
  errorMessage?: string;
}

export const ErrorOverlay: React.FC<ErrorOverlayProps> = ({ type, onTryAgain, errorMessage }) => {
  const content = {
    signin: {
      title: 'Whoops!',
      subtitle: 'Unable to sign in.',
      text: 'To register, grant permission to view, edit and create your Google Developer Profile.',
      description: 'A developer profile will allow you to get custom recommendations and create your own agenda with save sessions and learning material in My WOW.',
      button: 'Try again',
    },
    account: {
      title: 'Uh oh.',
      subtitle: 'Something went wrong.',
      text: 'The user account type is not allowed.',
      description: 'To learn more or get help, visit the FAQ.',
      button: 'Back to home',
    },
    general: {
      title: 'Uh oh.',
      subtitle: 'Something went wrong.',
      text: 'An error occurred while processing your request.',
      description: 'Please try again in a few moments or visit the FAQ for more help.',
      button: 'Try again',
    }
  };

  const activeContent = content[type];

  return (
    <div className="flex flex-col bg-white dark:bg-grey-900! overflow-hidden animate-fade-in w-full h-full md:h-auto md:flex-none">
      {/* Dynamic Header with assets */}
      <div className="relative h-48 md:h-56 bg-[#F1F3F4] dark:bg-grey-800! flex flex-col items-center justify-center overflow-hidden px-8 border-b border-grey-200 dark:border-grey-700">
        {/* Decorative Assets - Desktop */}
        <picture className="absolute left-0 top-0 h-full select-none pointer-events-none hidden md:block">
          <source srcSet="/images/io24-loc-modal-header-left.webp" type="image/webp" />
          <img src="/images/io24-loc-modal-header-left.webp" alt="" className="h-full object-contain object-left" />
        </picture>
        <picture className="absolute right-0 top-0 h-full select-none pointer-events-none hidden md:block">
          <source srcSet="/images/io24-loc-modal-header-right.webp" type="image/webp" />
          <img src="/images/io24-loc-modal-header-right.webp" alt="" className="h-full object-contain object-right" />
        </picture>

        {/* Decorative Assets - Mobile */}
        <img src="/images/io24-loc-modal-header-left-mobile.svg" alt="" className="absolute left-0 top-0 h-full select-none pointer-events-none md:hidden object-contain object-left" />
        <img src="/images/io24-loc-modal-header-right-mobile.svg" alt="" className="absolute right-0 top-0 h-full select-none pointer-events-none md:hidden object-contain object-right" />

        {/* Close button (optional, but in screenshot) */}
        <button
          onClick={onTryAgain}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors z-20"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-grey-700 dark:text-grey-300">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="relative z-10 text-center flex flex-col items-center">
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-medium text-grey-900 dark:text-white leading-tight">
            {activeContent.title}
          </h2>
          <p className="text-[1.25rem] md:text-[1.5rem] font-medium text-grey-900 dark:text-white leading-tight">
            {activeContent.subtitle}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-8 md:p-12 flex flex-col items-center text-center">
        <h3 className="text-[1.125rem] md:text-[1.25rem] font-medium text-grey-900 dark:text-white mb-4 max-w-[340px]">
          {errorMessage || activeContent.text}
        </h3>
        <p className="text-[0.875rem] md:text-[1rem] text-grey-600 dark:text-grey-400 leading-relaxed mb-10 max-w-[420px]">
          {activeContent.description}
          {(type === 'account' || type === 'general') && (
            <a href="/about" className="block mt-4 decoration-2 underline underline-offset-4 cursor-pointer hover:no-underline font-medium text-grey-900 dark:text-white">visit the FAQ.</a>
          )}
        </p>

        <button
          onClick={onTryAgain}
          className="px-8 py-3 bg-grey-900 dark:bg-white text-white dark:text-grey-900 rounded-full font-medium hover:bg-black dark:hover:bg-grey-100! transition-all text-[0.9375rem] min-w-[124px]"
        >
          {activeContent.button}
        </button>
      </div>

      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
