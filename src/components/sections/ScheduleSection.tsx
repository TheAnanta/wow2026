'use client';

import React, { useEffect, useState } from 'react';
import { fetchSessions, Session } from '@/services/stubs';
import EventMetricsSection from './EventMetricsSection';

interface MarqueeSession {
  title: string;
  speaker: string;
  time: string;
  track: string;
  color: string; // Brand color highlight
  emoji: string;
}

const TRACK_COLORS: Record<string, string> = {
  'AI/ML': '#EA4335',  // Google Red
  'Cloud': '#4285F4',   // Google Blue
  'Web': '#FBBC04',     // Google Yellow
  'Mobile': '#34A853',  // Google Green
  'Design': '#FBBC04',  // Google Yellow
  'General': '#4285F4', // Google Blue
  'Other': '#EA4335'    // Google Red
};

const TRACK_EMOJIS: Record<string, string> = {
  'AI/ML': '🤖',
  'Cloud': '☁️',
  'Web': '🌐',
  'Mobile': '📱',
  'Design': '🎨',
  'General': '🎙',
  'Other': '⚙️'
};

const COLORS_LIST = ['#4285F4', '#EA4335', '#FBBC04', '#34A853'];

const getSessionDetails = (session: Session, index: number): MarqueeSession => {
  const track = session.tags[0] || 'General';
  const venue = session.tags.find(t => t.includes('Auditorium') || t.includes('Kalinga')) || 'Main Hall';

  // Choose emoji based on track or title keyword
  let emoji = TRACK_EMOJIS[track] || '💡';
  if (session.title.toLowerCase().includes('lunch') || session.title.toLowerCase().includes('breakfast') || session.title.toLowerCase().includes('dinner')) {
    emoji = '🍽';
  } else if (session.title.toLowerCase().includes('check-in')) {
    emoji = '✅';
  } else if (session.title.toLowerCase().includes('awards') || session.title.toLowerCase().includes('closing')) {
    emoji = '🎬';
  } else if (session.title.toLowerCase().includes('swag')) {
    emoji = '🎁';
  }

  return {
    title: session.title,
    speaker: venue,
    time: session.time || 'TBA',
    track: track,
    color: '', // Assigned later to guarantee row rotation
    emoji: emoji
  };
};

const SessionCard = ({ session }: { session: MarqueeSession }) => {
  return (
    <div className="relative w-[280px] sm:w-[320px] md:w-[350px] h-[130px] sm:h-[150px] shrink-0 mx-3">
      {/* Retro Shadow Card */}
      <div
        className="absolute inset-0 bg-grey-900 dark:bg-white rounded-xl transition-all duration-200 translate-x-[4px] translate-y-[4px]"
      />
      {/* Front Card */}
      <div className="relative h-full border-2 border-grey-900 dark:border-white rounded-xl p-4 bg-white dark:bg-[#1B1B21] flex flex-col justify-between overflow-hidden">
        <div>
          <div className="flex items-center justify-between gap-3 mb-2">
            <div
              className="px-2.5 py-0.5 rounded-md border-2 border-grey-900 dark:border-white text-[10px] sm:text-xs font-black uppercase tracking-wider text-white shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,1)]"
              style={{ backgroundColor: session.color }}
            >
              {session.time}
            </div>
            <span className="text-xl">{session.emoji}</span>
          </div>
          <h4 className="font-bold text-sm sm:text-base text-grey-900 dark:text-white truncate leading-tight">
            {session.title}
          </h4>
          <p className="text-xs text-slate-500 dark:text-grey-text truncate mt-1">
            {session.speaker}
          </p>
        </div>
        <div className="flex">
          <span
            className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide border-2 border-grey-900 dark:border-white rounded-full bg-slate-50 dark:bg-grey-950 text-grey-700 dark:text-grey-text"
          >
            #{session.track}
          </span>
        </div>
      </div>
    </div>
  );
};

export const ScheduleSection = () => {
  const [row1, setRow1] = useState<MarqueeSession[]>([]);
  const [row2, setRow2] = useState<MarqueeSession[]>([]);
  const [row3, setRow3] = useState<MarqueeSession[]>([]);

  useEffect(() => {
    fetchSessions({}).then((res) => {
      if (res && res.length > 0) {
        // Map all to Marquee format
        const mapped = res.map(getSessionDetails);

        // Shuffle the array
        const shuffled = [...mapped];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Distribute round-robin to rows
        const r1: MarqueeSession[] = [];
        const r2: MarqueeSession[] = [];
        const r3: MarqueeSession[] = [];

        shuffled.forEach((session, index) => {
          if (index % 3 === 0) r1.push(session);
          else if (index % 3 === 1) r2.push(session);
          else r3.push(session);
        });

        // Assign colors sequentially to each row's items to guarantee rotation within the row
        const r1Colored = r1.map((s, idx) => ({ ...s, color: COLORS_LIST[idx % COLORS_LIST.length] }));
        const r2Colored = r2.map((s, idx) => ({ ...s, color: COLORS_LIST[(idx + 1) % COLORS_LIST.length] }));
        const r3Colored = r3.map((s, idx) => ({ ...s, color: COLORS_LIST[(idx + 2) % COLORS_LIST.length] }));

        // Repeat items to ensure smooth continuous marquee flow
        setRow1([...r1Colored, ...r1Colored, ...r1Colored]);
        setRow2([...r2Colored, ...r2Colored, ...r2Colored]);
        setRow3([...r3Colored, ...r3Colored, ...r3Colored]);
      }
    });
  }, []);

  const hasData = row1.length > 0 && row2.length > 0 && row3.length > 0;

  return (
    <section id="schedule" className="py-20 md:py-28  relative overflow-hidden">

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-8 px-4">
          <span className="inline-block px-4 py-1.5 rounded-full border-2 border-grey-900 dark:border-white text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-grey-900 dark:text-white mb-4">
            event agenda
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-grey-900 dark:text-white tracking-tighter mb-4">
            A Day of Wonder
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-grey-text max-w-2xl mx-auto">
            From inspiring keynotes to hands-on workshops and panel discussions, every moment is designed to spark innovation and fuel your passion for technology.
          </p>
        </div>

        <div className="page-wrapper py-0! my-0! flex flex-col">
          <EventMetricsSection />
        </div>

        {/* 3 Scrolling Marquees */}
        {hasData && (
          <div className="flex flex-col gap-4 md:gap-5 overflow-hidden py-4 w-full">
            {/* Row 1: Scrolling Left */}
            <div className="flex w-full overflow-hidden">
              <div
                className="flex whitespace-nowrap animate-marquee py-2"
                style={{ animationDuration: '160s' }}
              >
                {row1.map((session, i) => (
                  <SessionCard key={`row1-${i}`} session={session} />
                ))}
              </div>
            </div>

            {/* Row 2: Scrolling Right */}
            <div className="flex w-full overflow-hidden">
              <div
                className="flex whitespace-nowrap animate-marquee py-2"
                style={{ animationDirection: 'reverse', animationDuration: '160s' }}
              >
                {row2.map((session, i) => (
                  <SessionCard key={`row2-${i}`} session={session} />
                ))}
              </div>
            </div>

            {/* Row 3: Scrolling Left */}
            <div className="flex w-full overflow-hidden">
              <div
                className="flex whitespace-nowrap animate-marquee py-2"
                style={{ animationDuration: '160s' }}
              >
                {row3.map((session, i) => (
                  <SessionCard key={`row3-${i}`} session={session} />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-6 md:mt-8">
          <a
            href="/explore"
            className="inline-block text-base font-bold px-8 py-3.5 rounded-full border-2 border-grey-900 dark:border-white bg-[#4285F4] hover:bg-[#3574e2] text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
          >
            Explore Full Schedule
          </a>
        </div>

      </div>
    </section>
  );
};
