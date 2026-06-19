'use client';

import React, { useState } from 'react';

interface YearData {
  year: number;
  label: string;
  color: string;
  title: string;
  description: string;
  image: string;
  stats: {
    attendees: string;
    workshops: string;
    speakers: string;
  };
}

const historyData: Record<number, YearData> = {
  2025: {
    year: 2025,
    label: "25",
    color: "#4285F4", // Google Blue
    title: "The Two-Day Extravaganza",
    description: "GDGoC WOW Andhra transformed into a monumental two-day festival held on June 28-29. Breaking all previous records, the event welcomed over 1,000+ tech enthusiasts and featured a lineup of 20+ industry leaders. Day 1 focused on visionary keynote sessions, panel discussions, and networking. Day 2 was dedicated to 'Learn & Build', with 4 hands-on workshops where participants built real-world solutions.",
    image: "/images/past-wow/gallery_10.jpg",
    stats: {
      attendees: "1000+",
      workshops: "4",
      speakers: "20+"
    }
  },
  2024: {
    year: 2024,
    label: "24",
    color: "#EA4335", // Google Red
    title: "Expanding the Horizon",
    description: "WOW 2024 expanded its reach to bring together students and developers from across the region. With interactive hands-on labs, a bustling career zone, and direct mentorship from Google engineers, the event set a new benchmark for community-driven tech conferences, focusing on cloud computing and early generative AI tools.",
    image: "/images/past-wow/gallery_12.jpg",
    stats: {
      attendees: "800+",
      workshops: "3",
      speakers: "20+"
    }
  },
  2023: {
    year: 2023,
    label: "23",
    color: "#34A853", // Google Green
    title: "The Inception of WOW",
    description: "The inaugural edition of Google on Campus WOW sparked a wave of collaborative learning. Started as a unified initiative to bridge the gap between academic learning and industry standards, the event brought foundational technology concepts, coding challenges, and career preparation resources to hundreds of aspiring engineers.",
    image: "https://lh3.googleusercontent.com/pw/AP1GczOQjb1LtgjSAHbHXcAE583Gh0hnw6mvQD5lJsZy_4iu03Vs1POlGBiFWPajBwXs_BfqL3SBIshCajkcMBcCkCbWGMTt8cvhdMT-WBH1jLrk3zIjhlYHOYS1YkdapaENZ1DMPXWAKyifyPeZlbQFqfnGbA=w2160-h1436-s-no?authuser=0",
    stats: {
      attendees: "500+",
      workshops: "2",
      speakers: "15+"
    }
  }
};

export const HistorySection = () => {
  const [activeYear, setActiveYear] = useState<number>(2025);
  const currentData = historyData[activeYear];

  // Calculate timeline scale based on active year (2025 is left, 2023 is right)
  const getScaleX = () => {
    if (activeYear === 2025) return 0;
    if (activeYear === 2024) return 0.5;
    return 1;
  };

  return (
    <section id="history" className="pb-12 bg-gradient-to-b from-white to-slate-50 dark:from-grey-900 dark:to-grey-950 relative overflow-hidden border-y-2 border-grey-900 dark:border-white/10">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-5 dark:opacity-10" style={{ backgroundColor: '#4285F4' }} />
        <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full opacity-5 dark:opacity-10" style={{ backgroundColor: '#EA4335' }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full opacity-5 dark:opacity-10" style={{ backgroundColor: '#34A853' }} />
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="page-wrapper relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border-2 border-grey-900 dark:border-white text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-grey-900 dark:text-white mb-4">
            the journey
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-grey-900 dark:text-white tracking-tighter">
            3 Years of WOW
          </h2>
        </div>

        {/* Timeline Navigation */}
        <div className="flex justify-center mb-16 sm:mb-20">
          <div className="relative inline-flex items-center w-full max-w-[280px] sm:max-w-[400px] md:max-w-[480px]">
            {/* Timeline track */}
            <div className="absolute top-1/2 left-6 right-6 h-1 bg-slate-200 dark:bg-grey-800 -translate-y-1/2 rounded-full w-[calc(100%-48px)]" />
            {/* Progress line */}
            <div
              className="absolute top-1/2 left-6 h-1 bg-grey-900 dark:bg-white -translate-y-1/2 rounded-full origin-left transition-transform duration-500 ease-out"
              style={{
                width: 'calc(100% - 48px)',
                transform: `scaleX(${getScaleX()})`
              }}
            />
            {/* Timeline buttons */}
            <div className="relative flex justify-between w-full">
              {[2025, 2024, 2023].map((year) => {
                const isSelected = activeYear === year;
                const yearInfo = historyData[year];
                return (
                  <button
                    key={year}
                    onClick={() => setActiveYear(year)}
                    className="relative group focus:outline-none"
                    tabIndex={0}
                  >
                    {/* Retro Border/Shadow Effect */}
                    <div className="absolute inset-0 bg-grey-900 dark:bg-white rounded-full transition-transform translate-x-0.5 translate-y-0.5 sm:translate-x-1 sm:translate-y-1" />
                    <div
                      className={`relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 sm:border-3 border-grey-900 dark:border-white flex items-center justify-center font-black text-base sm:text-lg md:text-xl transition-all duration-300 ${isSelected
                        ? 'text-white'
                        : 'bg-white dark:bg-grey-900 text-grey-900 dark:text-white hover:-translate-x-0.5 hover:-translate-y-0.5'
                        }`}
                      style={{
                        backgroundColor: isSelected ? yearInfo.color : undefined
                      }}
                    >
                      {yearInfo.label}
                    </div>
                    <span
                      className={`absolute -bottom-7 sm:-bottom-8 left-1/2 -translate-x-1/2 text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${isSelected
                        ? 'text-grey-900 dark:text-white'
                        : 'text-slate-400 dark:text-grey-600'
                        }`}
                    >
                      {year}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="max-w-5xl mx-auto transition-all duration-500 ease-in-out">
          <div className="relative">
            {/* Retro Shadow Card */}
            <div className="absolute inset-0 bg-grey-900 dark:bg-white translate-x-1.5 translate-y-1.5 sm:translate-x-3 sm:translate-y-3 rounded-2xl sm:rounded-3xl" />

            {/* Main Card */}
            <div className="relative bg-white dark:bg-[#1B1B21] border-2 sm:border-3 border-grey-900 dark:border-white rounded-2xl sm:rounded-3xl overflow-hidden z-10">
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="md:w-1/2 relative min-h-[250px] sm:min-h-[300px] md:min-h-[400px]">
                  <img
                    alt={`WOW ${currentData.year}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    src={currentData.image}
                  />
                  {/* Badge */}
                  <div
                    className="absolute top-4 left-4 px-4 py-2 rounded-full border-2 border-grey-900 dark:border-white font-black text-white text-sm sm:text-base md:text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                    style={{ backgroundColor: currentData.color }}
                  >
                    {currentData.year}
                  </div>
                </div>

                {/* Text and Stats Section */}
                <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-grey-900 dark:text-white mb-4">
                    {currentData.title}
                  </h3>
                  <p className="text-sm sm:text-base text-grey-700 dark:text-grey-text mb-6 sm:mb-8 leading-relaxed">
                    {currentData.description}
                  </p>

                  {/* Stats Grid */}
                  <div className="relative">
                    {/* Retro Shadow for Stats Grid */}
                    <div className="absolute inset-0 bg-grey-900 dark:bg-white translate-x-1 translate-y-1 rounded-xl sm:rounded-2xl" />

                    <div className="relative grid grid-cols-3 divide-x divide-grey-900/10 dark:divide-white/10 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-grey-950 dark:via-grey-900 dark:to-grey-950 rounded-xl sm:rounded-2xl border-2 border-grey-900 dark:border-white overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 0.5px, transparent 0.5px)', backgroundSize: '16px 16px' }} />

                      {/* Attendees Stat */}
                      <div className="flex flex-col items-center gap-1 p-3 sm:p-4 rounded-xl transition-transform hover:-translate-y-1">
                        <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-grey-900 dark:text-white">
                          {currentData.stats.attendees}
                        </span>
                        <span className="text-[9px] sm:text-xs font-bold text-slate-400 dark:text-grey-600 uppercase tracking-wider">
                          Attendees
                        </span>
                      </div>

                      {/* Workshops Stat */}
                      <div className="flex flex-col items-center gap-1 p-3 sm:p-4 rounded-xl transition-transform hover:-translate-y-1">
                        <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-grey-900 dark:text-white">
                          {currentData.stats.workshops}
                        </span>
                        <span className="text-[9px] sm:text-xs font-bold text-slate-400 dark:text-grey-600 uppercase tracking-wider">
                          Workshops
                        </span>
                      </div>

                      {/* Speakers Stat */}
                      <div className="flex flex-col items-center gap-1 p-3 sm:p-4 rounded-xl transition-transform hover:-translate-y-1">
                        <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-grey-900 dark:text-white">
                          {currentData.stats.speakers}
                        </span>
                        <span className="text-[9px] sm:text-xs font-bold text-slate-400 dark:text-grey-600 uppercase tracking-wider">
                          Speakers
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
