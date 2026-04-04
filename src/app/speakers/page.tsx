'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../../components/sections/Header';
import { Footer } from '../../components/sections/Footer';
import { SpeakerCard } from '../../components/speakers/SpeakerCard';
import { FilterSidebar } from '../../components/speakers/FilterSidebar';
import { SearchBar } from '../../components/speakers/SearchBar';
import { BentoCard } from '../../components/sections/BentoCard';
import { RegistrationWizard } from '../../components/registration/RegistrationWizard';
import { Speaker, getSpeakers, searchSpeakers } from '../../services/speakerStubs';

const TOPICS = [
  'Accessibility', 'Ads', 'AI/Machine Learning', 'Android', 'AR/VR',
  'Chrome OS', 'Cloud', 'Design', 'Firebase', 'Web', 'Mobile'
];

export default function SpeakersPage() {
  const [showRegistration, setShowRegistration] = useState(false);
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
    <div className="w-full max-w-[1440px] mx-auto">
      <Header onRegisterClick={() => setShowRegistration(true)} />

      {/* Hero */}
      <section className="flex justify-between items-center px-8 pt-24 pb-16 border-b border-[#000000] relative overflow-hidden">
        <div className="max-w-[500px] z-10">
          <h1 className="text-[4rem] font-medium leading-[1.1] mb-4">Meet the speakers</h1>
          <p className="text-lg text-[#202124]">Learn about the Googlers presenting at Google I/O.</p>
        </div>

        {/* Mic Graphic */}
        <div className="w-[500px] h-[300px] absolute right-0 bottom-0 flex items-end">
          {/* Left grid panel */}
          <div
            className="flex-1 h-full relative border-r border-t border-[#000000] rounded-tl-[40px]"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          >
            {/* Mic icon */}
            <div className="absolute top-10 right-10 w-12 h-12 border-4 border-[#000000] rounded-[24px]" />
          </div>
          {/* Right gradient panel */}
          <div
            className="flex-[2] h-full border-t border-[#000000] rounded-tl-[60px] relative -ml-5"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(135deg, #FBBC04 0%, #34A853 25%, #4285F4 50%, #EA4335 75%, #FBBC04 100%)',
              backgroundSize: '40px 40px, 40px 40px, 100% 100%',
            }}
          />
        </div>
      </section>

      {/* Two-column layout */}
      <div className="grid px-8 py-16 items-start gap-12 max-lg:gap-8 max-md:flex max-md:flex-col max-md:px-4 max-md:py-4 max-md:gap-4" style={{ gridTemplateColumns: '280px 1fr' }}>

        {/* Sidebar */}
        <div className={`max-md:hidden ${showMobileFilters ? 'max-md:!flex max-md:fixed max-md:inset-0 max-md:bg-white max-md:z-[2000] max-md:p-8 max-md:flex-col max-md:overflow-y-auto' : ''}`}>
          {showMobileFilters && (
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#000000]">
              <span className="font-bold text-xl">Topics</span>
              <button className="bg-transparent border-none text-2xl cursor-pointer" onClick={() => setShowMobileFilters(false)}>&times;</button>
            </div>
          )}
          <FilterSidebar
            topics={TOPICS}
            selectedTopics={selectedTopics}
            onToggleTopic={toggleTopic}
          />
          {showMobileFilters && (
            <div className="mt-auto py-8">
              <button
                className="w-full flex justify-center bg-[#202124] text-white py-3 px-6 rounded-full font-bold shadow-[0_4px_12px_rgba(0,0,0,0.3)] border-none cursor-pointer"
                onClick={() => setShowMobileFilters(false)}
              >
                Show {speakers.length} results
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex flex-col w-full">
          <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

          {/* Active Filter Chips */}
          <div className="flex flex-wrap items-center gap-3 mt-4 mb-4">
            {selectedTopics.map(topic => (
              <div
                key={topic}
                className="inline-flex items-center py-2 px-4 bg-[#202124] text-white rounded-full text-sm font-medium cursor-pointer"
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
                className="text-sm font-medium underline text-[#202124] ml-2 cursor-pointer"
                onClick={() => setSelectedTopics([])}
              >
                Clear all
              </span>
            )}
          </div>

          <div className="grid grid-cols-4 gap-8 max-md:flex max-md:flex-col max-md:gap-0">
            {loading ? (
              <p>Loading speakers...</p>
            ) : speakers.length > 0 ? (
              speakers.map(speaker => (
                <SpeakerCard key={speaker.id} name={speaker.name} title={speaker.title} />
              ))
            ) : (
              <p>No speakers found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile FAB */}
      <button
        className="hidden max-md:flex fixed bottom-8 right-6 bg-[#202124] text-white py-3 px-6 rounded-full font-bold shadow-[0_4px_12px_rgba(0,0,0,0.3)] z-[100] items-center gap-2 border-none cursor-pointer"
        onClick={() => setShowMobileFilters(true)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
        Filter
      </button>

      {/* Bottom Promo Grid */}
      <div className="grid grid-cols-2 gap-6 mt-16 px-8 max-md:grid-cols-1">
        <BentoCard
          title="Join a community group"
          description="Meet developers, discover local groups, and build your global network."
          buttonText="Get started"
          onButtonClick={() => {}}
        />
        <BentoCard
          title="Plan your I/O"
          description="Visit My I/O for saved content and recommendations based on your personal interests."
          buttonText="Get started"
          onButtonClick={() => {}}
        />
      </div>

      <Footer />

      {showRegistration && (
        <RegistrationWizard onClose={() => setShowRegistration(false)} />
      )}
    </div>
  );
}
