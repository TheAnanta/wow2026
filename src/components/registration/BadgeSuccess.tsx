// src/components/registration/BadgeSuccess.tsx
import React from 'react';

interface BadgeSuccessProps {
  onClose?: () => void;
  badgeName: string;
}

export const BadgeSuccess: React.FC<BadgeSuccessProps> = ({ onClose, badgeName }) => {
  // Determine badge subtitle/visuals based on name
  const isArcade = badgeName === 'Arcade Insider';

  return (
    <div className="flex flex-col items-center text-center py-6 px-4 max-w-[500px] mx-auto animate-fade-in">
      <h2 className="text-[1.5rem] md:text-[2rem] font-bold mb-2 text-grey-900 dark:text-white">You earned a badge!</h2>
      <p className="text-[1rem] md:text-[1.125rem] text-grey-600 dark:text-grey-400 mb-8 font-medium">{badgeName}</p>

      <p className="text-[0.875rem] md:text-[1rem] text-grey-500 dark:text-grey-500 mb-8 leading-relaxed">
        This badge was saved to your Google Developer Profile.
      </p>

      {/* 3D Isometric Badge */}
      <div className="[perspective:1000px] my-4 md:my-8 w-[240px] h-[240px] flex justify-center items-center">
        <div
          className="w-[200px] h-[200px] relative [transform-style:preserve-3d] [transform:rotateX(45deg)_rotateZ(-25deg)] transition-transform duration-500 hover:[transform:rotateX(40deg)_rotateZ(-20deg)_scale(1.05)]"
        >
          {/* Side/thickness */}
          <div className="absolute w-full h-full bg-[#1A73E8] rounded-full border-4 border-[#1A73E8] [transform:translateZ(0px)]" />

          {/* Main face */}
          <div
            className="absolute w-full h-full rounded-full border-4 border-white dark:border-grey-900 flex flex-col justify-center items-center [transform:translateZ(20px)] shadow-[0_10px_30px_rgba(0,0,0,0.2)] overflow-hidden"
            style={{
              background: isArcade
                ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)' // Gold/Orange for Arcade
                : 'linear-gradient(135deg, #4285F4 0%, #34A853 40%, #FBBC05 70%, #EA4335 100%)' // Google colors for Attendee
            }}
          >
            {/* Wireframe overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at center, transparent 65%, white 66%, transparent 67%), linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                backgroundSize: '100% 100%, 20px 20px, 20px 20px',
              }}
            />
            <p className="text-white text-[3.5rem] font-extrabold leading-none m-0 z-[2] [text-shadow:0_4px_15px_rgba(0,0,0,0.4)]">
              {isArcade ? 'ARC' : 'WOW'}
            </p>
            <p className="text-white text-lg font-bold mt-1 z-[2] [text-shadow:0_2px_8px_rgba(0,0,0,0.3)]">
              {isArcade ? 'INSIDER' : '2026'}
            </p>
          </div>
        </div>
      </div>

      <p className="text-[1.125rem] md:text-[1.25rem] font-bold my-6 text-grey-900 dark:text-white uppercase tracking-tight">
        {badgeName}
      </p>

      <div className="text-[0.75rem] font-bold uppercase text-grey-500 tracking-[0.1em] mt-8 mb-4">Share your badge</div>
      <div className="flex gap-4">
        {['f', 't', 'in', '🔗'].map((icon, i) => (
          <div
            key={i}
            className="w-10 h-10 border border-grey-300 dark:border-grey-700 rounded-full flex justify-center items-center cursor-pointer font-semibold bg-white dark:bg-grey-800 text-grey-900 dark:text-white transition-all duration-200 hover:bg-grey-100 dark:hover:bg-grey-700 hover:-translate-y-1 shadow-sm"
          >
            {icon}
          </div>
        ))}
      </div>

      {/* Done Button */}
      <div className="mt-10 w-full flex flex-col items-center gap-4">
        <button
          className="px-12 py-3 bg-[#1a73e8] text-white rounded-full text-[1rem] font-semibold hover:bg-[#1557b0] transition-all transform active:scale-95 shadow-md"
          onClick={onClose}
        >
          Check out my profile
        </button>
        <span onClick={onClose} className="text-[0.875rem] text-grey-600 dark:text-grey-400 cursor-pointer hover:underline">
          Return to dashboard
        </span>
      </div>

      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
