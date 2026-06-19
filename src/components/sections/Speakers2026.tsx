'use client';

import React, { useEffect, useState } from 'react';
import { getSpeakers, Speaker } from '@/services/speakerStubs';

const COLORS = ['#4285F4', '#EA4335', '#34A853', '#FBBC04'];

const SpeakerCard = ({ speaker, index }: { speaker: Speaker; index: number }) => {
  const color = COLORS[index % COLORS.length];
  const avatar = speaker.avatar || null;

  return (
    <div className="relative group cursor-pointer transition-transform duration-300 hover:-translate-y-1">
      {/* Retro Shadow */}
      <div className="absolute inset-0 bg-grey-900 dark:bg-white rounded-2xl transition-transform duration-300 translate-x-[6px] translate-y-[6px]" />

      {/* Hover Background Flash */}
      <div
        className="absolute inset-0 rounded-2xl border-2 border-grey-900 dark:border-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-[6px] translate-y-[6px]"
        style={{ backgroundColor: color }}
      />

      {/* Main Content */}
      <div className="relative bg-white dark:bg-[#1B1B21] border-2 border-grey-900 dark:border-white rounded-2xl overflow-hidden z-10">
        <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-grey-950 flex items-center justify-center">
          {avatar ? (
            <img
              alt={speaker.name}
              loading="lazy"
              className="object-cover w-full h-full transition-all duration-500 scale-100 grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105"
              src={'/images/speakers/' + avatar}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center font-bold text-7xl md:text-8xl text-white select-none transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundColor: color }}
            >
              {speaker.name.charAt(0)}
            </div>
          )}
          {/* Overlay Color Filter on Hover */}
          <div
            className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-15 pointer-events-none"
            style={{ backgroundColor: color }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          {/* Top Line Brand Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: color }} />
        </div>

        {/* Name and Title details */}
        <div className="px-4 py-3 border-t-2 border-grey-900 dark:border-white relative overflow-hidden bg-white dark:bg-[#1B1B21]">
          <h3 className="font-bold text-sm sm:text-base text-grey-900 dark:text-white truncate relative z-10">
            {speaker.name}
          </h3>
          <p
            className="text-[10px] sm:text-xs font-bold truncate relative z-10 mt-0.5"
            style={{ color: color }}
          >
            {speaker.title}
          </p>
          <div
            className="h-0.5 mt-1.5 rounded-full transition-all duration-300"
            style={{ backgroundColor: color, width: '24px' }}
          />
        </div>
      </div>
    </div>
  );
};

export const Speakers2026 = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    getSpeakers().then((res) => {
      if (res && res.length > 0) {
        // Show first 8 speakers
        setSpeakers(res.slice(0, 8));
      }
    });
  }, []);

  return (
    <section id="speakers-2026" className="bg-white dark:bg-grey-900 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full border-[40px] border-[#4285F4]/5 dark:border-[#4285F4]/10" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full border-[32px] border-[#EA4335]/5 dark:border-[#EA4335]/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-[50px] border-[#34A853]/[0.02] dark:border-[#34A853]/[0.04]" />
      </div>

      <div className="page-wrapper relative z-10 px-4 sm:px-6 md:px-8">
        {/* Title */}
        <div className="mb-12 sm:mb-16 flex flex-col items-center text-center relative z-20">
          <span className="inline-block px-4 py-1.5 rounded-full border-2 border-grey-900 dark:border-white text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-grey-900 dark:text-white mb-4">
            this year's lineup
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-grey-900 dark:text-white tracking-tighter">
            Our <span className="text-[#EA4335]">Speakers</span>
          </h2>
        </div>

        {/* Desktop grid (displayed on sm and larger) */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {speakers.map((speaker, index) => (
            <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="relative sm:hidden">
          <div className="absolute left-0 top-0 bottom-6 w-8 bg-gradient-to-r from-white dark:from-grey-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-6 w-8 bg-gradient-to-l from-white dark:from-grey-900 to-transparent z-10 pointer-events-none" />
          <div className="flex gap-4 overflow-x-auto pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {speakers.map((speaker, index) => (
              <div key={speaker.id} className="flex-shrink-0 w-[220px]">
                <SpeakerCard speaker={speaker} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 md:mt-16">
          <a
            href="/speakers"
            className="inline-block text-base font-bold px-8 py-3.5 rounded-full border-2 border-grey-900 dark:border-white bg-[#EA4335] hover:bg-[#d93025] text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
          >
            View All Speakers
          </a>
        </div>

      </div>
    </section>
  );
};
