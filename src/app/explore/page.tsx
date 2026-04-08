// src/app/explore/page.tsx
"use client";
import React, { useState, useEffect, useMemo, Suspense } from "react";
import { Header } from "../../components/sections/Header";
import { fetchSessions, Session } from "../../services/stubs";
import { useSearchParams, useRouter } from "next/navigation";
import { ExploreHero } from "./components/ExploreHero";
import { MyIOSection } from "./components/MyIOSection";
import { FilterSection } from "./components/FilterSection";
import FilterDrawer from "./components/FilterDrawer";
import { SessionCard } from "./components/SessionCard";
import { FILTER_CATEGORIES } from "./constants";
import { parseTime } from "../../utils/timeutils";

export default function ExplorePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExploreContent />
    </Suspense>
  );
}

function ExploreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("q") || "";

  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    stack: [],
    topic: [],
    type: [],
    level: []
  });

  const [isFocusExpanded, setIsFocusExpanded] = useState(true);
  const [isTopicsExpanded, setIsTopicsExpanded] = useState(false);
  const [isTypeExpanded, setIsTypeExpanded] = useState(false);
  const [isLevelExpanded, setIsLevelExpanded] = useState(false);

  const [isMyIoVisible, setIsMyIoVisible] = useState(false);
  const [isSavedVisible, setIsSavedVisible] = useState(true);
  const [isRecommendedVisible, setIsRecommendedVisible] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dataLayer = (globalThis as any).dataLayer || { push: () => { } };
  const trackEvent = (globalThis as any).trackEvent || (() => { });
  const trackFilter = (globalThis as any).trackFilter || (() => { });
  const trackFilterCategory = (globalThis as any).trackFilterCategory || (() => { });

  useEffect(() => {
    const loadSessions = async () => {
      setLoading(true);
      const data = await fetchSessions({ q: searchQuery });
      setSessions(data as Session[]);
      setLoading(false);

      // Recursive sync logic for checkboxes
      const queryFilters = searchQuery ? searchQuery.toLowerCase().split(',').filter(Boolean) : [];
      const newFilters: Record<string, string[]> = {
        stack: [],
        topic: [],
        type: [],
        level: []
      };

      FILTER_CATEGORIES.forEach(cat => {
        cat.items.forEach(item => {
          const slug = item.label.toLowerCase().replace(/\s+/g, '-');
          if (queryFilters.includes(slug)) {
            newFilters[cat.classification].push(item.id);
            if (cat.classification === "stack") setIsFocusExpanded(true);
            if (cat.classification === "topic") setIsTopicsExpanded(true);
            if (cat.classification === "type") setIsTypeExpanded(true);
            if (cat.classification === "level") setIsLevelExpanded(true);
          }
        });
      });
      setActiveFilters(newFilters);
    };
    loadSessions();
  }, [searchQuery]);

  const filteredSessions = useMemo(() => {
    return sessions.filter(session => {
      for (const [cls, activeIds] of Object.entries(activeFilters)) {
        if (activeIds.length > 0) {
          const sessionIds = (session as any)[cls] || [];
          const hasMatch = sessionIds.some((id: string) => activeIds.includes(id));
          if (!hasMatch) return false;
        }
      }
      return true;
    }).sort((a, b) => {
      const dateA = a.tags?.[3] || ""; // Date from tags
      const dateB = b.tags?.[3] || "";
      if (dateA !== dateB) return dateA.localeCompare(dateB);

      const timeA = a.time || "00:00 AM";
      const timeB = b.time || "00:00 AM";
      const [startA] = parseTime(timeA);
      const [startB] = parseTime(timeB);
      return startA.getTime() - startB.getTime();
    });
  }, [sessions, activeFilters]);

  const handleFilterChange = (id: string, checked: boolean, classification: string) => {
    setActiveFilters(prev => {
      const current = prev[classification] || [];
      const updated = checked
        ? [...new Set([...current, id])]
        : current.filter(fid => fid !== id);

      const newFilters = { ...prev, [classification]: updated };

      const queryFilters: string[] = [];
      FILTER_CATEGORIES.forEach(cat => {
        cat.items.forEach(item => {
          if (newFilters[cat.classification]?.includes(item.id)) {
            queryFilters.push(item.label.toLowerCase().replace(/\s+/g, '-'));
          }
        });
      });
      const newQuery = queryFilters.join(',');
      router.push(`/explore/${newQuery ? `?q=${newQuery}` : ''}`, { scroll: false });

      return newFilters;
    });
  };

  const handleCategoryToggle = (title: string, event: React.MouseEvent) => {
    trackFilterCategory(title, event);
    if (title === 'Focus') setIsFocusExpanded(!isFocusExpanded);
    if (title === 'Topics') setIsTopicsExpanded(!isTopicsExpanded);
    if (title === 'Content type') setIsTypeExpanded(!isTypeExpanded);
    if (title === 'Level') setIsLevelExpanded(!isLevelExpanded);
  };

  const handleStackClick = (e: React.MouseEvent<HTMLAnchorElement>, query: string, filterId: string) => {
    e.preventDefault();
    router.push(`/explore/?q=${query}`, { scroll: false });

    setTimeout(() => {
      setIsFocusExpanded(true);
      document.querySelector('.program-content')?.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  };

  return (
    <div className="w-full min-h-screen bg-white">

      <Header onRegisterClick={() => { }} />

      <main id="content" className="dark:bg-grey-900 flex-1">
        <ExploreHero />

        <div className="page-wrapper flex flex-col program">
          <div id="program-stacks" className="flex flex-col mt-4 md:mt-0 mb-8">
            <div className="flex flex-col justify-between md:flex-row mb-2">
              <span className="sm:s-h4 md:l-h3">
                What are you building for?
              </span>
              <a
                className="cta-link-btn mt-4 md:mt-0 p-0! md:self-end"
                href="/speakers"
                aria-label="View all speakers"
              >
                Meet the WOW speakers
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-stack-cards-2 ml:grid-cols-stack-cards-4 md:justify-around ml:justify-between gap-y-8 md:gap-3 mt-4 md:mt-10">
              {/* Stack Cards */}
              {[
                { id: 'mobile', label: 'Mobile', desc: 'Develop for a range of audiences and form factors.', color: 'linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)', fid: 'b31f8e49-c3ba-438e-a7e1-589b4da62640', img: 'io24-stacks-m.svg' },
                { id: 'web', label: 'Web', desc: 'Create fast, secure sites and apps for the open web.', color: 'linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)', fid: '13eba1ea-1c78-47b8-86ef-c7808d2507db', img: 'io24-stacks-w.svg' },
                { id: 'ai', label: 'ML/AI', desc: 'Access cutting-edge AI models and open source tools.', color: 'linear-gradient(90deg, #FFCB32 -0.15%, #FFCB32 17.85%, #F46831 52.85%, #EA4335 78.85%, #EA4335 99.85%)', fid: '14574666-1892-4a0e-b305-44d6e3f66c56', img: 'io24-stacks-a.png' },
                { id: 'cloud', label: 'Cloud', desc: 'Simplify and scale end-to-end development.', color: 'linear-gradient(270.11deg, #5382EB 1.91%, #5382EB 25.69%, #9F6CD4 51.37%, #EA4335 79.9%, #EA4335 97.02%)', fid: '622b18d9-a6c2-4d31-b506-a2d58e034186', img: 'io24-stacks-c.svg' }
              ].map(stack => (
                <a
                  key={stack.id}
                  href={`/explore/?q=${stack.id}`}
                  onClick={(e) => handleStackClick(e, stack.id, stack.fid)}
                  aria-label={`Jumplink Filter content by ${stack.id} focus.`}
                  className="relative rounded-[20px] md:border-2 dark:md:border-transparent md:border-transparent min-h-[135px] md:min-h-[297px] hover:border-grey! group dark:hover:border-grey!-bg transition-all"
                >
                  <div style={{ background: stack.color }} className="absolute w-full h-full top-[11px] rounded-[20px] border-[1.2px] border-grey dark:border-grey-bg md:border-0 md:hidden" />
                  <div className="absolute md:relative w-full h-full flex flex-row md:flex-col p-4 md:p-3 bg-white dark:bg-grey rounded-[20px] border-[1.2px] border-grey dark:border-grey-bg md:border-0">
                    <img className="hidden md:inline-block w-full group-hover:hidden dark:hidden" src={`https://io.google/2024/app/images/${stack.img}`} alt={stack.label} />
                    <img className="hidden dark:md:inline-block w-full group-hover:md:block dark:hidden" src={`https://io.google/2024/app/images/${stack.img.replace('.svg', '-dark.webp')}`} alt={stack.label} />
                    <div className="flex-1 flex flex-col md:mt-6">
                      <span className="sm:s-h5 md:l-h6">{stack.label === 'ML/AI' ? 'Mobile' : stack.label}</span>
                      <p className="sm:s-p2 md:l-p1 mt-1 md:mt-2">{stack.desc}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <MyIOSection
            isMyIoVisible={isMyIoVisible}
            isSavedVisible={isSavedVisible}
            isRecommendedVisible={isRecommendedVisible}
            setIsMyIoVisible={setIsMyIoVisible}
            setIsSavedVisible={setIsSavedVisible}
            setIsRecommendedVisible={setIsRecommendedVisible}
          />

          <div className="program-content pt-4 md:pt-10">
            <div className="program-content__left">
              <FilterSection
                categories={FILTER_CATEGORIES}
                expandedCategories={{
                  stack: isFocusExpanded,
                  topic: isTopicsExpanded,
                  type: isTypeExpanded,
                  level: isLevelExpanded
                }}
                selectedFilters={activeFilters}
                onCategoryClick={handleCategoryToggle}
                onFilterChange={handleFilterChange}
                trackFilter={trackFilter}
              />
            </div>

            <div className="program-content__right" id="sessions-results" data-role="region" aria-live="polite">
              <div className="h-pill-board">
                <div className={`flex w-full h-auto ${searchQuery ? "pb-8" : ""}`}>
                  <div className="z-10 block fixed bottom-4 right-0 md:hidden">
                    <button
                      id="filter-burger"
                      onClick={() => setIsFilterDrawerOpen(true)}
                      className={`m-filter__chip w-[102px] ring-offset-2 focus:outline-none focus:ring focus:ring-blue dark:focus:ring-blue-dark bg-grey-900 dark:bg-white rounded-full px-3 py-2 ${isScrolled
                        ? ""
                        : "hidden"
                        }`}
                      aria-expanded={isFilterDrawerOpen}
                      aria-label="Filter button"
                      aria-controls="filter-drawer"
                    >
                      <img
                        className="dark:hidden"
                        aria-hidden="true"
                        src="https://io.google/2024/app/images/filter-icon.svg"
                        width="24"
                        height="24"
                      />
                      <img
                        className="hidden dark:block"
                        aria-hidden="true"
                        src="https://io.google/2024/app/images/filter-icon-dark.svg"
                        width="24"
                        height="24"
                      />
                      <span className="font-medium text-white dark:text-grey-900 ml-3">
                        Filter
                      </span>
                    </button>
                  </div>
                  {searchQuery && (
                    <div className="w-full overflow-x-auto flex gap-1 py-3 px-2 md:flex-wrap items-center">
                      {searchQuery.split(',').filter(Boolean).map(term => {
                        let title = term;
                        for (const cat of FILTER_CATEGORIES) {
                          const found = cat.items.find(item => item.label.toLowerCase().replace(/\s+/g, '-') === term);
                          if (found) {
                            title = found.label;
                            break;
                          }
                        }

                        return (
                          <button
                            key={term}
                            role="presentation"
                            data-chip="true"
                            className="m-filter__chip flex flex-row items-center ring-offset-2 focus:outline-none focus:ring focus:ring-blue dark:focus:ring-blue-dark dark:bg-white bg-grey-900 rounded-lg py-3 px-5 gap-2"
                            aria-label={`remove filter for ${term}`}
                            onClick={() => {
                              const newQuery = searchQuery.split(',').filter(q => q !== term).join(',');
                              router.push(`/explore/${newQuery ? `?q=${newQuery}` : ''}`, { scroll: false });
                            }}
                          >
                            <span className="m-filter__chip-title text-white font-medium dark:text-grey">
                              {title}
                            </span>
                            <img
                              aria-hidden="true"
                              className="dark:block hidden"
                              src="https://io.google/2024/app/images/program-close-icon.svg"
                              width="16"
                              height="16"
                            />
                            <img
                              aria-hidden="true"
                              className="block dark:hidden"
                              src="https://io.google/2024/app/images/program-close-icon-white.svg"
                              width="16"
                              height="16"
                            />
                          </button>
                        );
                      })}
                      <button
                        className="font-medium underline-link ml-2 dark:text-white"
                        onClick={() => router.push('/explore/', { scroll: false })}
                        aria-label="Clear all"
                      >
                        Clear all
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {loading ? (
                <div className="w-full flex justify-center py-20">
                  <span className="title">Loading...</span>
                </div>
              ) : (
                <div role="list" className="w-full grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredSessions.map(session => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      trackEvent={trackEvent}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>


      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        categories={FILTER_CATEGORIES}
        selectedFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearAll={() => setActiveFilters({ stack: [], topic: [], type: [], level: [] })}
        resultsCount={filteredSessions.length}
      />

    </div>
  );
}
