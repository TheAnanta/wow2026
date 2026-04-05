// src/components/team/TeamCard.tsx
'use client';

import React, { useState } from 'react';
import { SpeakerSocialLinks } from './SpeakerSocialLinks';
import { TeamMember } from '../../services/teamStubs';

interface TeamCardProps {
  member: TeamMember;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const avatarSrc = member.image && member.image.startsWith('http')
    ? member.image
    : `/images/team/${member.image || 'avatar.png'}`;

  // Premium background gradient based on team type
  const getGradient = () => {
    if (member.type === 'Core') return 'linear-gradient(135deg, #4285F4 0%, #EA4335 100%)';
    return 'linear-gradient(135deg, #FBBC04 0%, #34A853 100%)';
  };

  const googleGlow = 'linear-gradient(to right, #4285F4, #EA4335, #FBBC04, #34A853)';

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="group relative flex flex-col items-center text-center p-6 cursor-pointer transform hover:-translate-y-2 transition-all duration-300 rounded-[32px] bg-white/5 backdrop-blur-xl border border-white/10 hover:border-google-blue/50 hover:shadow-[0_0_30px_rgba(66,133,244,0.2)]"
      >
        {/* Glow Blend Background (Hidden initially) */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-[32px]" style={{ background: googleGlow }} />

        {/* Avatar Container with Premium Border */}
        <div className="relative w-32 h-32 mb-6 p-1 rounded-full overflow-hidden">
          <div 
            className="absolute inset-0 opacity-40 group-hover:opacity-80 transition-opacity duration-300 animate-pulse"
            style={{ background: getGradient() }}
          />
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#121212] shadow-2xl bg-[#121212]">
            <img
              src={avatarSrc}
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=random&color=fff'; 
              }}
            />
          </div>
        </div>

        {/* Name & Title */}
        <div className="space-y-1 relative z-10">
          <h3 className="text-xl font-bold text-white group-hover:text-google-blue transition-colors duration-300">
            {member.name}
          </h3>
          <p className="text-sm font-medium text-grey-400 line-clamp-1">
            {member.community_title || member.company.designation || 'Team Member'}
          </p>
          <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-black text-google-blue drop-shadow-[0_0_10px_rgba(66,133,244,0.5)]">View Profile</span>
          </div>
        </div>
      </div>

      {/* Premium Detail Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Backdrop with Heavy Blur */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-2xl animate-in fade-in duration-500"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-[#0a0a0a] w-full max-w-2xl rounded-[40px] shadow-[0_0_100px_rgba(66,133,244,0.15)] overflow-hidden animate-in fade-in zoom-in duration-300 border border-white/10">
            
            {/* Top Glow Blend Brading Bar */}
            <div className="h-1.5 w-full relative">
               <div className="absolute inset-0 blur-[2px]" style={{ background: googleGlow }} />
               <div className="relative h-full w-full" style={{ background: googleGlow }} />
            </div>

            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all z-10"
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="p-10 md:p-14 flex flex-col md:flex-row gap-10 items-center md:items-start relative">
              {/* Background Accent Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-google-blue/20 rounded-full blur-[100px] -z-10 opacity-30" />

              {/* Profile Side */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="relative w-44 h-44 p-1.5 rounded-full" style={{ background: getGradient() }}>
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0a0a0a] shadow-2xl bg-[#0a0a0a]">
                    <img
                      src={avatarSrc}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=random&color=fff'; 
                      }}
                    />
                  </div>
                </div>
                <SpeakerSocialLinks socialLinks={member.social} dark={true} />
              </div>

              {/* Info Side */}
              <div className="flex-1 text-center md:text-left relative">
                <h2 className="text-4xl font-black text-white mb-2 leading-none">{member.name}</h2>
                <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-google-blue text-sm font-bold mb-6 shadow-[0_0_15px_rgba(66,133,244,0.1)]">
                  {member.community_title || member.company.designation || 'Team Member'}
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-grey-500">Biography</h4>
                  <p className="text-grey-300 leading-relaxed text-lg font-medium italic">
                    "{member.bio || 'Passionate about building the next generation of technology and empowering developers globally.'}"
                  </p>
                </div>

                {member.company.name && (
                   <div className="mt-8 pt-8 border-t border-white/5">
                      <p className="text-xs text-grey-500 uppercase tracking-widest">
                        Organization
                      </p>
                      <p className="text-lg font-black text-white mt-1">
                        {member.company.name}
                      </p>
                   </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
