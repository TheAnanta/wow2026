'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../../components/sections/Header';
import { Footer } from '../../components/sections/Footer';
import { SpeakerCard } from '../../components/speakers/SpeakerCard';
import { FilterSidebar } from '../../components/speakers/FilterSidebar';
import { SearchBar } from '../../components/speakers/SearchBar';
import { BentoCard } from '../../components/sections/BentoCard';
import { Speaker, getSpeakers, searchSpeakers } from '../../services/speakerStubs';
import { useRouter } from 'next/navigation';

const TOPICS = [
  'Accessibility', 'Ads', 'AI/Machine Learning', 'Android', 'AR/VR',
  'Chrome OS', 'Cloud', 'Design', 'Firebase', 'Web', 'Mobile'
];

export default function SpeakersPage() {
  const router = useRouter();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchInitially(); }, []);
  useEffect(() => { applyFilters(); }, [searchQuery, selectedTopics]);

  const fetchInitially = async () => {
    setLoading(true);
    const data = await getSpeakers();
    setSpeakers(data);
    setLoading(false);
  };

  const applyFilters = async () => {
    setLoading(true);
    let results = await getSpeakers();
    if (searchQuery.trim().length > 0) results = await searchSpeakers(searchQuery);
    if (selectedTopics.length > 0) results = results.filter(s => s.topics.some(t => selectedTopics.includes(t)));
    setSpeakers(results);
    setLoading(false);
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]);
  };

  const removeTopic = (topic: string) => {
    setSelectedTopics(prev => prev.filter(t => t !== topic));
  };

  return (
    <div className="w-full">
      <Header onRegisterClick={() => router.push('/register')} />

      <main id="content" className="dark:bg-grey-900 flex-1">
        {/* Speakers Hero */}
        <section id="speakers-hero">
          <div className="w-full flex flex-col md:flex-row md:h-[407px] overflow-hidden bg-grey-bg dark:bg-grey border-b md:border-b-2 border-grey dark:border-grey-bg">
            <div className="flex flex-col md:text-left md:justify-center px-4 py-8 w-full md:w-2/5 md:p-10 md:pr-0 dark:text-white z-10">
              <h1 className="font-medium mb-4 sm:s-h2 md:l-h1 text-md:-mr-40">
                Meet the speakers
              </h1>
              <p className="font-medium sm:l-h6 md:l-h6 mb-4">
                Learn about the Googlers presenting at Google WOW.
              </p>
            </div>

            <div className="flex justify-end items-end w-full md:w-3/5">
              <img
                className="hidden md:inline-block h-full object-cover object-left dark:hidden max-h-[407px] text-md:pl-[74px] lg:pl-0"
                src="https://io.google/2024/app/images/io24-speakers-hero.webp"
                alt="Speakers hero"
              />
              <img
                className="hidden dark:md:inline-block h-full object-cover object-left max-h-[407px] text-md:pl-[74px] lg:pl-0"
                src="https://io.google/2024/app/images/io24-speakers-hero-dark.webp"
                alt="Speakers hero dark"
              />
              <img
                className="block md:hidden dark:hidden "
                src="https://io.google/2024/app/images/io24-speakers-hero-mobile.webp"
                alt="Speakers hero mobile"
              />
              <img
                className="hidden dark:inline-block dark:md:hidden "
                src="https://io.google/2024/app/images/io24-speakers-hero-mobile-dark.webp"
                alt="Speakers hero mobile dark"
              />
            </div>
          </div>
        </section>

        {/* Two-column layout */}
        <div className="page-wrapper flex flex-col pt-6 text-md:flex-row speaker-list max-lg:px-4">
          {/* Sidebar Area */}
          <div className="text-md:block hidden w-full md:w-1/5 pr-4">
            <FilterSidebar
              title="Topics"
              items={TOPICS}
              selectedItems={selectedTopics}
              onToggleItem={toggleTopic}
            />
          </div>

          {/* Main Content Area */}
          <div id="speaker-list-section" className="flex flex-col w-full text-md:w-4/5 md:ml-8">
            <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

            {/* Active Filter Chips */}
            <div className="flex flex-wrap items-center gap-3 mt-4 mb-4">
              {selectedTopics.map(topic => (
                <div
                  key={topic}
                  className="inline-flex items-center py-2 px-4 bg-[#202124] dark:bg-white text-white dark:text-grey-900 rounded-full text-sm font-medium cursor-pointer"
                  onClick={() => removeTopic(topic)}
                >
                  {topic}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
              ))}
              {selectedTopics.length > 0 && (
                <span
                  className="text-sm font-medium underline text-[#202124] dark:text-white ml-2 cursor-pointer"
                  onClick={() => setSelectedTopics([])}
                >
                  Clear all
                </span>
              )}
            </div>

            <div className={`grid w-full grid-cols-1 md:mt-6 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
              {speakers.length > 0 ? (
                speakers.sort((a, b) => ((a.isGDE ? -1 : 1) + (b.isGDE ? 1 : -1)) || a.name.localeCompare(b.name)).map(speaker => (
                  <SpeakerCard
                    key={speaker.id}
                    name={speaker.name}
                    title={speaker.title}
                    pronouns={speaker.pronouns || 'They/Them'}
                    image={speaker.avatar ? `/images/speakers/${speaker.avatar}` : ''}
                  />
                ))
              ) : (
                <div className="col-span-full py-10 text-center">
                  <p className="sm:l-h5">No speakers found matching your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Promo Grid */}
        <section className="page-wrapper pb-16">
          <div className="grid grid-cols-2 gap-6 mt-16 max-md:grid-cols-1">
            <BentoCard
              title="Join a community group"
              description="Meet developers, discover local groups, and build your global network."
              buttonText="Get started"
              onButtonClick={() => { router.push('/community') }}
            />
            <BentoCard
              title="Plan your WOW"
              description="Visit My WOW for saved content and recommendations based on your personal interests."
              buttonText="Get started"
              onButtonClick={() => { router.push('/explore') }}
            />
          </div>
        </section>
      </main>

      <Footer />

      {showMobileFilters && (
        <div className="fixed inset-0 z-2000 bg-white p-8 flex flex-col overflow-y-auto animate-slide-down">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#000000]">
            <span className="font-bold text-xl">Topics</span>
            <button className="bg-transparent border-none text-3xl cursor-pointer" onClick={() => setShowMobileFilters(false)}>&times;</button>
          </div>
          <FilterSidebar
            title="Topics"
            items={TOPICS}
            selectedItems={selectedTopics}
            onToggleItem={toggleTopic}
          />
          <div className="mt-8">
            <button
              className="w-full cta-primary flex justify-center max-w-none!"
              onClick={() => setShowMobileFilters(false)}
            >
              Show results
            </button>
          </div>
        </div>
      )}

      {/* Mobile Filter FAB */}
      <button
        className="hidden max-md:flex fixed bottom-8 right-6 cta-primary items-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.3)] z-100"
        onClick={() => setShowMobileFilters(true)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 21V14M4 10V3M12 21V12M12 8V3M20 21V16M20 12V3M1 14h6M9 8h6M17 16h6" />
        </svg>
        Filter
      </button>

      <Footer />
    </div>
  );
}
