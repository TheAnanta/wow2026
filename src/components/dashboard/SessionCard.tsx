// src/components/dashboard/SessionCard.tsx
'use client';

import { useTranslations } from "next-intl";
import React, { useState } from 'react';
import { toggleBookmark } from '../../services/stubs';
import { analyticsService } from '../../services/analytics';
interface SessionCardProps {
  id: string;
  title: string;
  time: string;
  tags: string[];
  bookmarkedInitial?: boolean;
}
export const SessionCard: React.FC<SessionCardProps> = ({
  id,
  title,
  time,
  tags,
  bookmarkedInitial = false
}) => {
  const t = useTranslations();
  const [isBookmarked, setIsBookmarked] = useState(bookmarkedInitial);
  const handleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await toggleBookmark(id);
    analyticsService.trackUI('bookmark_session', {
      status: !isBookmarked,
      session_id: id
    }, 'Dashboard');
    setIsBookmarked(!isBookmarked);
  };
  return <div className="border border-[#000000] rounded-xl bg-white overflow-hidden flex flex-col h-full">
    {/* Graphic Area */}
    <div className="h-[140px] border-b border-[#000000] relative flex justify-center items-center" style={{
      backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)',
      backgroundSize: '20px 20px'
    }}>
      <div className="w-[80px] h-[48px] border border-[#000000] rounded-[24px] shadow-[0_4px_10px_rgba(0,0,0,0.1)]" style={{
        background: 'linear-gradient(135deg, #a4f21d 0%, #00ffff 33%, #4169e1 66%, #ff00ff 100%)'
      }} />
    </div>

    {/* Content */}
    <div className="p-5 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <div className="text-base font-bold mb-1 leading-[1.4]">{title}</div>
        <button className={`bg-transparent border-none p-1 cursor-pointer flex items-center justify-center transition-transform duration-200 hover:scale-110`} onClick={handleBookmark} aria-label={t("bookmark_session")}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" stroke="#000000" strokeWidth="1.5" style={{
            fill: isBookmarked ? '#000000' : 'none'
          }}>
            <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" />
          </svg>
        </button>
      </div>
      <div className="text-xs text-[#5f6368] font-semibold uppercase">{time}</div>
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {tags.map((tag, idx) => <span key={idx} className="text-xs text-[#5f6368] font-medium">{tag}</span>)}
      </div>
    </div>
  </div>;
};