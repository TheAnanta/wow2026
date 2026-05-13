'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../../components/sections/Header';
import { SpeakerCard } from '../../components/speakers/SpeakerCard';
import { FilterSidebar } from '../../components/speakers/FilterSidebar';
import { SearchBar } from '../../components/speakers/SearchBar';
import { Speaker, getSpeakers, searchSpeakers } from '../../services/speakerStubs';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

// Toggle this variable to switch between the 'Coming Soon' announcement and the active speakers list
const isSpeakersSectionActive = true;

const TOPICS = [
  'Accessibility', 'Ads', 'AI/Machine Learning', 'Android', 'AR/VR',
  'Chrome OS', 'Cloud', 'Design', 'Firebase', 'Web', 'Mobile'
];

const GRADIENTS = [
  'linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)',
  'linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)',
  'linear-gradient(90deg, #EA4335 -36.98%, #EA4335 22.31%, #4285F4 78.95%, #4285F4 132.93%)',
  'linear-gradient(270deg, #34A853 6.94%, #34A853 27.99%, #FFCB32 73.59%, #FFCB32 94.64%)',
];

export default function SpeakersPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center"><p className="sm:l-h4">Loading speakers...</p></div>}>
      <SpeakersContent />
    </Suspense>
  );
}

function SpeakersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qParam = searchParams.get('q') || '';

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSpeakersSectionActive) return;
    // Handle initial query params
    if (qParam) {
      const queryTopics = qParam.toLowerCase().split(',').filter(Boolean);
      const initialTopics = TOPICS.filter(t => queryTopics.includes(t.toLowerCase().replace(/\s+/g, '-').replace('/', '-')));
      setSelectedTopics(initialTopics);
    }
    fetchInitially();
  }, [qParam]);

  useEffect(() => {
    if (!isSpeakersSectionActive) return;
    applyFilters();
  }, [searchQuery, selectedTopics]);

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

  const updateUrl = (topics: string[]) => {
    const slugs = topics.map(t => t.toLowerCase().replace(/\s+/g, '-').replace('/', '-'));
    const newQuery = slugs.join(',');
    router.push(`/speakers/${newQuery ? `?q=${newQuery}` : ''}`, { scroll: false });
  };

  const toggleTopic = (topic: string) => {
    const updated = selectedTopics.includes(topic)
      ? selectedTopics.filter(t => t !== topic)
      : [...selectedTopics, topic];
    setSelectedTopics(updated);
    updateUrl(updated);
  };

  const removeTopic = (topic: string) => {
    const updated = selectedTopics.filter(t => t !== topic);
    setSelectedTopics(updated);
    updateUrl(updated);
  };

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header onRegisterClick={() => router.push('/register')} />

      <main id="content" className="dark:bg-grey-900! flex-1">
        {/* Speakers Hero */}
        <section id="speakers-hero">
          <div className="w-full flex flex-col md:flex-row md:h-[407px] overflow-hidden bg-grey-bg dark:bg-grey! border-b md:border-b-2 border-grey dark:border-grey-bg!">
            <div className="flex flex-col md:text-left md:justify-center px-4 py-8 w-full md:w-2/5 md:p-10 md:pr-0 dark:text-white! z-10">
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
                src="/images/io24-speakers-hero.webp"
                alt="Speakers hero"
              />
              <img
                className="hidden dark:md:inline-block h-full object-cover object-left max-h-[407px] text-md:pl-[74px] lg:pl-0"
                src="/images/io24-speakers-hero-dark.webp"
                alt="Speakers hero dark"
              />
              <img
                className="block md:hidden dark:hidden "
                src="/images/io24-speakers-hero-mobile.webp"
                alt="Speakers hero mobile"
              />
              <img
                className="hidden dark:inline-block dark:md:hidden "
                src="/images/io24-speakers-hero-mobile-dark.webp"
                alt="Speakers hero mobile dark"
              />
            </div>
          </div>
        </section>

        {/* Active Speakers List Layout */}
        <div className="page-wrapper flex flex-col pt-6 text-md:flex-row speaker-list max-lg:px-4 animate-slide-down">
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
                  onClick={() => { setSelectedTopics([]); updateUrl([]); }}
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
                    href={`/speakers/${speaker.id}`}
                  />
                ))
              ) : (
                <div className="col-span-full py-10 text-center">
                  <p className="sm:l-h5">No speakers found matching your filters.</p>
                </div>
              )}
            </div>

            {/* Teaser Cards at the bottom of the list */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12">
              {/* Main Bento Card */}
              <div className="md:col-span-12 lg:col-span-8 bg-grey-bg dark:bg-grey! border-2 border-grey dark:border-white rounded-[16px] p-8 md:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 min-h-[400px]">
                <div className="absolute top-0 right-0 p-8 md:p-12">
                  <div className="w-16 h-16 rounded-full border-2 border-grey dark:border-white flex items-center justify-center animate-spin-slow">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="dark:text-white">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                  </div>
                </div>

                <div className="relative z-10">
                  <span className="inline-block px-4 py-1 rounded-full border-2  tracking-tight border-grey-900 dark:border-white text-sm font-medium mb-6 dark:text-white">
                    Announcing More Soon
                  </span>
                  <h2 className="l-h2 md:text-[60px] md:leading-[65px] tracking-tight mb-4 dark:text-white">
                    More Speakers <br />
                    <span className="text-[#2563eb] dark:text-white">to be revealed</span>
                  </h2>
                  <p className="tracking-tight sm:l-h6 md:l-h6 mb-6 text-grey-600 dark:text-grey-400 max-w-lg" style={{
                    fontWeight: 400,
                    fontFamily: 'Google Sans Text'
                  }}>
                    We&apos;re still curating more exceptional experts to share insights. Check back soon for more roster updates.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="cta-primary bg-black! dark:bg-white! dark:text-black!" onClick={() => router.push('/become-a-speaker')}>Become a Speaker</button>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-2 md:h-3 z-20" style={{ backgroundImage: GRADIENTS[0] }}></div>
              </div>

              {/* Sidebar Teasers moved to bottom right */}
              <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-8">
                <div className="bg-grey-bg dark:bg-grey! border-2 border-grey dark:border-white rounded-[16px] p-8 md:p-10 flex-1 flex flex-col justify-center group overflow-hidden relative shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="relative z-10">
                    <h3 className="s-h3 text-[32px] dark:text-white mb-4">30+ Sessions</h3>
                    <p className="text-[18px] text-grey-600 dark:text-grey-400 leading-relaxed">From deep dives into Gemini and AI to hands-on workshops in Android and Web.</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-2 md:h-3 z-20" style={{ backgroundImage: GRADIENTS[1] }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <section className="page-wrapper pb-16">
          <div className="flex flex-col">
            <div className="flex flex-col align-center items-stretch justify-center mt-4 md:mt-10 gap-y-4 md:gap-x-8 md:flex-row ml:min-h-[400px]">
              {/* Join Community Card */}
              <div className="flex w-full md:w-2/3">
                <div className="h-full flex flex-col lg:flex-row bg-grey-bg dark:bg-grey! border md:border-2 border-grey rounded-[16px] overflow-hidden dark:border-white justify-end flex-1">
                  <div className="flex flex-col items-start p-6 pb-0 ml:p-10 -mb-4 lg:mb-0 lg:w-1/2">
                    <span className="text-grey dark:text-white mb-3 text-md:mb-4 sm:s-h4 md:l-h4 lg:-mr-40">
                      Join a community group
                    </span>
                    <p className="text-grey dark:text-white mb-3 text-md:mb-6 sm:s-cta1 md:l-cta1 lg:-mr-40">
                      Meet developers, discover local groups, and build your global network.
                    </p>
                    <button
                      onClick={() => router.push('/community')}
                      className="cta-secondary"
                      aria-label="Get started with joining a community group"
                    >
                      Get started
                    </button>
                  </div>
                  <div className="flex justify-end lg:items-end rounded-br-[16px] lg:w-1/2">
                    <img
                      src="https://io.google/2024/app/images/io24-join-community-cta-mobile.svg"
                      className="block md:hidden dark:hidden mr-[-2px]"
                      alt=""
                      loading="lazy"
                      width="283"
                      height="172"
                    />
                    <img
                      src="https://io.google/2024/app/images/io24-join-community-cta-mobile-dark.svg"
                      className="hidden dark:block dark:md:hidden mr-[-2px]"
                      alt=""
                      loading="lazy"
                      width="283"
                      height="172"
                    />
                    <img
                      src="https://io.google/2024/app/images/io24-join-community-cta.svg"
                      className="hidden md:block object-cover lg:object-contain object-left lg:object-right dark:hidden mr-[-2px]"
                      alt=""
                      loading="lazy"
                      width="437"
                      height="270"
                    />
                    <img
                      src="https://io.google/2024/app/images/io24-join-community-cta-dark.svg"
                      className="hidden dark:md:block object-cover lg:object-contain object-left lg:object-right mr-[-2px]"
                      alt=""
                      loading="lazy"
                      width="437"
                      height="270"
                    />
                  </div>
                </div>
              </div>

              {/* Plan your WOW Card */}
              <div className="flex w-full md:w-[38%] md:max-w-[484px]">
                <div className="h-full flex flex-col bg-grey-bg dark:bg-grey! border md:border-2 border-grey rounded-[16px] overflow-hidden dark:border-white justify-between lg:justify-center lg:items-end flex-1">
                  <div className="flex flex-col items-start p-6 pb-0 ml:p-10 ml:pb-0">
                    <span className="text-grey dark:text-white mb-3 text-md:mb-4 sm:l-h5 md:l-h4">
                      Plan your WOW
                    </span>
                    <p className="text-grey dark:text-white mb-3 text-md:mb-6 sm:s-h6 md:l-h6">
                      Visit My WOW for saved content and recommendations based on your personal interests.
                    </p>
                    <button
                      onClick={() => router.push('/explore')}
                      className="cta-secondary"
                      aria-label="Get started with planning your WOW"
                    >
                      Get started
                    </button>
                  </div>
                  <div className="flex justify-end lg:mt-[-63px]">
                    <img
                      src="https://io.google/2024/app/images/io24-planio-cta-mobile.webp"
                      className="inline-block dark:hidden mb-4 mr-4"
                      alt=""
                      loading="lazy"
                      width="219"
                      height="168"
                    />
                    <img
                      src="https://io.google/2024/app/images/io24-planio-cta-mobile-dark.webp"
                      className="hidden dark:inline-block mr-4 w-[228px] mb-[20px] mt-[-9px]"
                      alt=""
                      loading="lazy"
                      width="219"
                      height="168"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {showMobileFilters && isSpeakersSectionActive && (
        <div className="fixed inset-0 z-2000 bg-white dark:bg-grey-900! p-8 flex flex-col overflow-y-auto animate-slide-down">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#000000] dark:border-white">
            <span className="font-bold text-xl dark:text-white">Topics</span>
            <button className="bg-transparent border-none text-3xl cursor-pointer dark:text-white" onClick={() => setShowMobileFilters(false)}>&times;</button>
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
      {isSpeakersSectionActive && (
        <button
          className="hidden max-md:flex fixed bottom-8 right-6 cta-primary items-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.3)] z-100"
          onClick={() => setShowMobileFilters(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 21V14M4 10V3M12 21V12M12 8V3M20 21V16M20 12V3M1 14h6M9 8h6M17 16h6" />
          </svg>
          Filter
        </button>
      )}
    </div>
  );
}
