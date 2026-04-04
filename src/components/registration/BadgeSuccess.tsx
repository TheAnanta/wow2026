// src/components/registration/BadgeSuccess.tsx
import React from 'react';

interface BadgeSuccessProps {
  onClose?: () => void;
}

export const BadgeSuccess: React.FC<BadgeSuccessProps> = ({ onClose }) => {
  return (
    <div className="flex flex-col items-center text-center py-6">
      <h2 className="text-2xl font-bold mb-1">You earned a badge!</h2>
      <p className="text-sm text-[#5f6368] mb-8">I/O 2026 - Registered</p>

      <p className="text-sm text-[#5f6368] mb-8">
        This badge was saved to your Google Developer Profile.
      </p>

      {/* 3D Isometric Badge */}
      <div className="[perspective:1000px] my-12 w-[240px] h-[240px] flex justify-center items-center">
        <div
          className="w-[200px] h-[200px] relative [transform-style:preserve-3d] [transform:rotateX(45deg)_rotateZ(-25deg)] transition-transform duration-500 hover:[transform:rotateX(40deg)_rotateZ(-20deg)_scale(1.05)]"
        >
          {/* Side/thickness */}
          <div className="absolute w-full h-full bg-[#1A73E8] rounded-full border-4 border-[#1A73E8] [transform:translateZ(0px)]" />
          {/* Main face */}
          <div
            className="absolute w-full h-full rounded-full border-4 border-white flex flex-col justify-center items-center [transform:translateZ(20px)] shadow-[0_0_20px_rgba(0,0,0,0.1)] overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #00BCD4 0%, #1A73E8 30%, #E91E63 70%, #8BC34A 100%)' }}
          >
            {/* Wireframe overlay */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle at center, transparent 65%, rgba(255,255,255,0.2) 66%, transparent 67%), linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '100% 100%, 20px 20px, 20px 20px',
              }}
            />
            <p className="text-white text-[4rem] font-extrabold leading-none m-0 z-[2] [text-shadow:0_2px_10px_rgba(0,0,0,0.3)]">I/O</p>
            <p className="text-white text-xl font-semibold mt-[5px] z-[2] [text-shadow:0_2px_5px_rgba(0,0,0,0.3)]">2026</p>
          </div>
        </div>
      </div>

      <p className="text-lg font-bold my-6 text-[#202124]">I/O 2026 - Registered</p>

      <div className="text-xs font-bold uppercase text-[#5f6368] tracking-[0.05em] mt-8">Share your badge</div>
      <div className="flex gap-5 mt-4">
        {['f', 't', 'in', '🔗'].map((icon, i) => (
          <div
            key={i}
            className="w-11 h-11 border border-[#000000] rounded-full flex justify-center items-center cursor-pointer font-semibold bg-white transition-all duration-200 hover:bg-[#f1f3f4] hover:-translate-y-0.5"
          >
            {icon}
          </div>
        ))}
      </div>

      {/* Done Button */}
      <div className="mt-8 w-full flex justify-center">
        <button
          className="w-[140px] h-12 bg-[#1a73e8] text-white border-none rounded-[24px] text-base font-semibold cursor-pointer transition-colors duration-200 flex justify-center items-center hover:bg-[#1557b0] active:scale-[0.98]"
          onClick={onClose}
        >
          Done
        </button>
      </div>

      <div className="mt-12 text-sm">
        or go to your <a href="#" className="text-[#1A73E8] no-underline font-bold">developer profile</a>
      </div>
    </div>
  );
};
