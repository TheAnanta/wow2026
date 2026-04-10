'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../../components/sections/Header';
import { Footer } from '../../components/sections/Footer';
import { SpeakerCard as TeamMemberCard } from '../../components/speakers/SpeakerCard';
import { SearchBar } from '../../components/speakers/SearchBar';
import { FilterSidebar } from '../../components/speakers/FilterSidebar';
import { BentoCard } from '../../components/sections/BentoCard';
import { TeamMember, getTeam } from '../../services/teamStubs';
import { analyticsService } from '../../services/analytics';
import { useRouter } from 'next/navigation';

export default function TeamPage() {
  const router = useRouter();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [filteredTeam, setFilteredTeam] = useState<TeamMember[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResponsibilities, setSelectedResponsibilities] = useState<string[]>([]);
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getTeam();
      setTeam(data);
      setFilteredTeam(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let results = [...team];

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      results = results.filter(m => m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q));
    }

    if (selectedResponsibilities.length > 0) {
      results = results.filter(m => selectedResponsibilities.includes(m.responsibility));
    }

    if (selectedUniversities.length > 0) {
      results = results.filter(m => selectedUniversities.includes(m.university));
    }

    setFilteredTeam(results);
  }, [searchQuery, selectedResponsibilities, selectedUniversities, team]);

  const responsibilities = Array.from(new Set(team.map(m => m.responsibility))).sort();
  const universities = Array.from(new Set(team.map(m => m.university))).sort();

  const organizers = filteredTeam.filter(m => m.category === 'Organizer');
  const leads = filteredTeam.filter(m => m.category === 'Lead');
  const coreTeam = filteredTeam.filter(m => m.category === 'Core Team');

  const toggleResponsibility = (val: string) => {
    analyticsService.trackUI('filter_responsibility', val, 'TeamPage');
    setSelectedResponsibilities(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  const toggleUniversity = (val: string) => {
    analyticsService.trackUI('filter_university', val, 'TeamPage');
    setSelectedUniversities(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  const removeResponsibility = (val: string) => {
    setSelectedResponsibilities(prev => prev.filter(v => v !== val));
  };

  const removeUniversity = (val: string) => {
    setSelectedUniversities(prev => prev.filter(v => v !== val));
  };

  return (
    <div className="w-full">
      <Header onRegisterClick={() => router.push('/register')} />

      <main id="content" className="dark:bg-grey-900 flex-1">
        {/* Team Hero */}
        <section id="team-hero">
          <div className="w-full flex flex-col md:flex-row md:h-[407px] overflow-hidden bg-grey-bg dark:bg-grey border-b md:border-b-2 border-grey dark:border-grey-bg">
            <div className="flex flex-col md:text-left md:justify-center px-4 py-8 w-full md:w-2/5 md:p-10 md:pr-0 dark:text-white z-10">
              <h1 className="font-medium mb-4 sm:s-h2 md:l-h1 text-md:-mr-40">
                Meet the Team
              </h1>
              <p className="font-medium sm:l-h6 md:l-h6 mb-4">
                The people behind Google WOW 2026.
              </p>
            </div>

            <div className="flex justify-end items-end w-full md:w-3/5">
              <img
                className="hidden md:inline-block h-full object-cover object-left dark:hidden max-h-[407px] text-md:pl-[74px] lg:pl-0"
                src="/images/io24-about-hero.webp"
                alt="Team hero"
              />
              <img
                className="hidden dark:md:inline-block h-full object-cover object-left max-h-[407px] text-md:pl-[74px] lg:pl-0"
                src="/images/io24-about-hero-dark.webp"
                alt="Team hero dark"
              />
              <img
                className="block md:hidden dark:hidden "
                src="/images/io24-about-hero-mobile.webp"
                alt="Team hero mobile"
              />
              <img
                className="hidden dark:inline-block dark:md:hidden "
                src="/images/io24-about-hero-mobile-dark.webp"
                alt="Team hero mobile dark"
              />
            </div>
          </div>
        </section>

        <div className="page-wrapper pt-12 pb-24">
          <div className="flex flex-col text-md:flex-row gap-8">

            {/* Sidebar Filters */}
            <div className="hidden text-md:block w-full md:w-1/4">
              <div className="flex flex-col gap-6">
                <FilterSidebar
                  title="Responsibility"
                  items={responsibilities}
                  selectedItems={selectedResponsibilities}
                  onToggleItem={toggleResponsibility}
                />
                <FilterSidebar
                  title="University"
                  items={universities}
                  selectedItems={selectedUniversities}
                  onToggleItem={toggleUniversity}
                />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              <SearchBar value={searchQuery} onChange={(e) => {
                setSearchQuery(e.target.value);
                analyticsService.trackUI('search_team', e.target.value, 'TeamPage');
              }} />

              {/* Active Filter Chips */}
              <div className="flex flex-wrap items-center gap-3 mt-4 mb-8">
                {selectedResponsibilities.map(val => (
                  <div
                    key={val}
                    className="inline-flex items-center py-2 px-4 bg-[#202124] dark:bg-white text-white dark:text-grey-900 rounded-full text-sm font-medium cursor-pointer"
                    onClick={() => removeResponsibility(val)}
                  >
                    {val}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                ))}
                {selectedUniversities.map(val => (
                  <div
                    key={val}
                    className="inline-flex items-center py-2 px-4 bg-[#202124] dark:bg-white text-white dark:text-grey-900 rounded-full text-sm font-medium cursor-pointer"
                    onClick={() => removeUniversity(val)}
                  >
                    {val}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                ))}
                {(selectedResponsibilities.length > 0 || selectedUniversities.length > 0) && (
                  <span
                    className="text-sm font-medium underline text-[#202124] dark:text-white ml-2 cursor-pointer"
                    onClick={() => { setSelectedResponsibilities([]); setSelectedUniversities([]); analyticsService.trackUI('clear_filters', 'all', 'TeamPage'); }}
                  >
                    Clear all
                  </span>
                )}
              </div>

              {loading ? (
                <div className="py-20 text-center">
                  <p className="sm:l-h4">Gathering the crew...</p>
                </div>
              ) : (
                <div className="flex flex-col gap-24">
                  {organizers.length > 0 && (
                    <section>
                      <div className="mb-12 border-b-2 border-grey-900 dark:border-white pb-4">
                        <h2 className="sm:l-h3 md:l-h2">Organizers</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {organizers.map(member => (
                          <TeamMemberCard key={member.id} name={member.name} title={member.role} pronouns={member.pronouns} image={member.avatar} href={`/team/${member.id}`} />
                        ))}
                      </div>
                    </section>
                  )}

                  {leads.length > 0 && (
                    <section>
                      <div className="mb-12 border-b-2 border-grey-900 dark:border-white pb-4">
                        <h2 className="sm:l-h3 md:l-h2">Leads</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {leads.sort((a, b) => { return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1 }).map(member => (
                          <TeamMemberCard key={member.id} name={member.name} title={member.role} pronouns={member.pronouns} image={member.avatar} href={`/team/${member.id}`} />
                        ))}
                      </div>
                    </section>
                  )}

                  {coreTeam.length > 0 && (
                    <section>
                      <div className="mb-12 border-b-2 border-grey-900 dark:border-white pb-4">
                        <h2 className="sm:l-h3 md:l-h2">Core Team</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {coreTeam.sort((a, b) => { return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1 }).map(member => (
                          <TeamMemberCard key={member.id} name={member.name} title={member.role} pronouns={member.pronouns} image={member.avatar} href={`/team/${member.id}`} />
                        ))}
                      </div>
                    </section>
                  )}

                  {organizers.length === 0 && leads.length === 0 && coreTeam.length === 0 && (
                    <div className="py-20 text-center">
                      <p className="sm:l-h5">No team members found matching your filters.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <section className="page-wrapper pb-16">
          <div className="flex flex-col">
            <div className="flex flex-col align-center items-stretch justify-center mt-4 md:mt-10 gap-y-4 md:gap-x-8 md:flex-row ml:min-h-[400px]">
              {/* Join Community Card */}
              <div className="flex w-full md:w-2/3">
                <div className="h-full flex flex-col lg:flex-row bg-grey-bg dark:bg-grey border md:border-2 border-grey rounded-[16px] overflow-hidden dark:border-white justify-end flex-1">
                  <div className="flex flex-col items-start p-6 pb-0 ml:p-10 -mb-4 lg:mb-0 lg:w-1/2">
                    <span className="text-grey dark:text-white mb-3 text-md:mb-4 sm:s-h4 md:l-h4 lg:-mr-40">
                      Join a community group
                    </span>
                    <p className="text-grey dark:text-white mb-3 text-md:mb-6 sm:s-cta1 md:l-cta1 lg:-mr-40">
                      Meet developers, discover local groups, and build your global network.
                    </p>
                    <button
                      onClick={() => {
                        analyticsService.trackCTA('Get started', 'TeamPage_JoinCommunity');
                        router.push('/community');
                      }}
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
                <div className="h-full flex flex-col bg-grey-bg dark:bg-grey border md:border-2 border-grey rounded-[16px] overflow-hidden dark:border-white justify-between lg:justify-center lg:items-end flex-1">
                  <div className="flex flex-col items-start p-6 pb-0 ml:p-10 ml:pb-0">
                    <span className="text-grey dark:text-white mb-3 text-md:mb-4 sm:l-h5 md:l-h4">
                      Plan your WOW
                    </span>
                    <p className="text-grey dark:text-white mb-3 text-md:mb-6 sm:s-h6 md:l-h6">
                      Visit My WOW for saved content and recommendations based on your personal interests.
                    </p>
                    <button
                      onClick={() => {
                        analyticsService.trackCTA('Get started', 'TeamPage_PlanWOW');
                        router.push('/explore');
                      }}
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

      {/* Mobile Filters UI */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-2000 bg-white p-8 flex flex-col overflow-y-auto animate-slide-down">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#000000]">
            <span className="font-bold text-xl">Filters</span>
            <button className="bg-transparent border-none text-3xl cursor-pointer" onClick={() => setShowMobileFilters(false)}>&times;</button>
          </div>
          <div className="flex flex-col gap-8">
            <FilterSidebar title="Responsibility" items={responsibilities} selectedItems={selectedResponsibilities} onToggleItem={toggleResponsibility} />
            <FilterSidebar title="University" items={universities} selectedItems={selectedUniversities} onToggleItem={toggleUniversity} />
          </div>
          <div className="mt-12">
            <button className="w-full cta-primary flex justify-center max-w-none!" onClick={() => setShowMobileFilters(false)}>Show results</button>
          </div>
        </div>
      )}

      {/* Mobile Filter FAB */}
      <button className="hidden max-md:flex fixed bottom-8 right-6 cta-primary items-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.3)] z-100" onClick={() => setShowMobileFilters(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 21V14M4 10V3M12 21V12M12 8V3M20 21V16M20 12V3M1 14h6M9 8h6M17 16h6" /></svg>
        Filter
      </button>

    </div>
  );
}
