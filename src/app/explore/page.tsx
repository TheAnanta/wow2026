// src/app/explore/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Header } from "../../components/sections/Header";
import { fetchSessions } from "../../services/stubs";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

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

  const handleStackClick = (e: React.MouseEvent<HTMLAnchorElement>, query: string, filterId: string) => {
    e.preventDefault();
    router.push(`/explore/?q=${query}`, { scroll: false });

    const clearAll = document.querySelector<HTMLElement>('[data-clear-all]');
    if (clearAll) clearAll.click();

    setTimeout(() => {
      const filter = document.getElementById(filterId);
      if (filter instanceof HTMLInputElement) {
        filter.dataset.analyticsDefer = 'true';
        filter.click();
      }

      setIsFocusExpanded(true);
      document.querySelector('.program-content')?.scrollIntoView({ behavior: 'smooth' });

      const chips = document.querySelectorAll<HTMLElement>('[data-chip]');
      if (chips && chips[0]) {
        chips[0].focus();
      }
    }, 10);
  };
  const dataLayer = (globalThis as any).dataLayer || { push: () => { } };
  const trackEvent = (globalThis as any).trackEvent || (() => { });
  const trackFilterCategory =
    (globalThis as any).trackFilterCategory || (() => { });
  const trackFilter = (globalThis as any).trackFilter || (() => { });
  const trackFilterLabel = (globalThis as any).trackFilterLabel || (() => { });
  const handleDropdown = (globalThis as any).handleDropdown || (() => { });
  const [showRegistration, setShowRegistration] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"saved" | "recommended">(
    "recommended",
  );
  const [isMyIoVisible, setIsMyIoVisible] = useState(false);
  const [isSavedVisible, setIsSavedVisible] = useState(true);
  const [isRecommendedVisible, setIsRecommendedVisible] = useState(true);

  // Client-side filtering logic to mimic Google I/O's vanilla JS approach
  const applyFilters = () => {
    const activeFilters: Record<string, string[]> = {
      stack: [],
      topic: [],
      type: [],
      level: []
    };

    // 1. Traverse desktop checkboxes to gather active filter IDs 
    // (assuming mobile checkboxes are synced or we just use desktop ones for state)
    const desktopCheckboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"][data-classification]');
    desktopCheckboxes.forEach(cb => {
      if (cb.checked) {
        const cls = cb.dataset.classification;
        const id = cb.dataset.id || cb.id;
        if (cls && id && activeFilters[cls]) {
          activeFilters[cls].push(id);
        }
      }
    });

    // 2. Iterate through all rendered sessions and apply AND/OR logic
    const sessionElements = document.querySelectorAll<HTMLElement>('.session');
    sessionElements.forEach(session => {
      let isVisible = true;
      for (const [cls, activeIds] of Object.entries(activeFilters)) {
        if (activeIds.length > 0) {
          const sessionDataAttr = session.getAttribute(`data-${cls}`);
          let sessionIds: string[] = [];
          try {
            sessionIds = sessionDataAttr ? JSON.parse(sessionDataAttr) : [];
          } catch (e) {
            // Failed to parse, assume no tags
          }

          const hasMatch = sessionIds.some(id => activeIds.includes(id));
          if (!hasMatch) {
            isVisible = false;
            break;
          }
        }
      }
      session.style.display = isVisible ? 'block' : 'none';

      // Update parent grid gaps based on visibility if needed (optional)
      if (isVisible) {
        session.classList.remove('hidden-session');
      } else {
        session.classList.add('hidden-session');
      }
    });

    // Check if we need to sync desktop/mobile checkboxes explicitly if one is clicked
    // Here we can assume if this was triggered by a user click, it might be out of sync.
    // For simplicity, just filtering the sessions is enough.
  };

  useEffect(() => {
    // Event delegation on main container for any checkbox change
    const handleGlobalChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target && target.type === 'checkbox') {

        // Sync desktop and mobile checkboxes explicitly if they represent the same filter
        const isMobile = target.hasAttribute('data-mobile-classification');
        const classificationId = isMobile ? target.dataset.mobileClassification : (target.dataset.id || target.id);

        if (classificationId) {
          document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach(cb => {
            if (cb !== target && (cb.id.includes(classificationId) || cb.dataset.id === classificationId || cb.dataset.mobileClassification === classificationId)) {
              cb.checked = target.checked;
            }
          });
        }

        const queryFilters: string[] = [];
        const desktopCheckboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"][data-classification]');
        desktopCheckboxes.forEach(cb => {
          if (cb.checked) {
            const label = cb.dataset.label || cb.dataset.analyticsFilter || "";
            if (label) {
              queryFilters.push(label.toLowerCase().replace(/\s+/g, '-'));
            }
          }
        });
        const newQuery = queryFilters.join(',');

        router.push(`/explore/${newQuery ? `?q=${newQuery}` : ''}`, { scroll: false });
        applyFilters();
      }
    };

    document.addEventListener('change', handleGlobalChange);
    return () => {
      document.removeEventListener('change', handleGlobalChange);
    };
  }, []);

  const [isFocusExpanded, setIsFocusExpanded] = useState(true);
  const [isTopicsExpanded, setIsTopicsExpanded] = useState(false);
  const [isTypeExpanded, setIsTypeExpanded] = useState(false);
  const [isLevelExpanded, setIsLevelExpanded] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  useEffect(() => {
    const loadSessions = async () => {
      setLoading(true);
      const data = await fetchSessions({ q: searchQuery });
      setSessions(data as any[]);
      setLoading(false);

      // Multiple query filters separated by comma
      const queryFilters = searchQuery ? searchQuery.toLowerCase().split(',').filter(Boolean) : [];

      // Use a recursive sync to find all inputs (desktop and mobile drawers)
      const inputs = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
      inputs.forEach(input => {
        const labelAttr = input.dataset.label || input.dataset.analyticsFilter || "";
        const slug = labelAttr.toLowerCase().replace(/\s+/g, '-');

        if (slug && queryFilters.includes(slug)) {
          input.checked = true;
          // Auto expand the focus or categories if a tab is checked
          if (input.dataset.classification === "stack") setIsFocusExpanded(true);
          if (input.dataset.classification === "topic") setIsTopicsExpanded(true);
          if (input.dataset.classification === "type") setIsTypeExpanded(true);
          if (input.dataset.classification === "level") setIsLevelExpanded(true);
        } else {
          input.checked = false;
        }
      });

      // Apply filters after sync
      setTimeout(applyFilters, 10);
    };
    loadSessions();
  }, [searchQuery]);
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Banner */}
      {showBanner && (
        <div className="bg-[#202124] text-white py-3 px-4 text-center text-sm flex justify-center items-center relative">
          <span>All content will be available May 14 at 8 AM PT.</span>
          <button
            className="absolute right-4 bg-transparent border-none text-white text-xl cursor-pointer"
            onClick={() => setShowBanner(false)}
          >
            &times;
          </button>
        </div>
      )}
      <Header onRegisterClick={() => setShowRegistration(true)} />
      {/* Plan your WOW Hero */}
      <main id="content" className="dark:bg-grey-900 flex-1">

        <div className="w-full flex flex-col md:flex-row text-md:h-[407px] overflow-hidden bg-grey-bg dark:bg-grey border-b-[1px] md:border-b-2 border-grey dark:border-grey-bg">
          <div className="flex flex-col md:text-left md:justify-center px-4 py-5 w-full md:w-2/5 md:p-10 md:pr-0 dark:text-white z-10 md:w-[53%] lg:w-[40%]">
            <h1 className="font-medium mb-4 sm:s-h2 md:l-h1 text-md:-mr-40">
              Plan your I/O
            </h1>
            <p className="font-medium sm:s-h6 md:l-h6 mb-4">
              Save keynotes, technical sessions, and learning experiences so you
              don't miss a thing.
            </p>
            <button
              id="hero-anchor-cta"
              className="cta-primary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("my-io-2024")?.scrollIntoView({ behavior: 'smooth' });
                dataLayer.push({
                  'event': "cta_see_all_content",
                  'eventParams': { 'cta_position': 'hero' }
                }, { eventParams: undefined });
              }}
            >
              See all content
            </button>
          </div>
          <div className="flex justify-end items-end w-full md:w-3/5 mb-8 md:mb-0">
            <img
              className="hidden md:inline-block h-full object-cover object-left dark:hidden "
              src="https://io.google/2024/app/images/io24-explore-hero.webp"
              role="img"
              aria-hidden="true"
              fetchPriority="high"
            />
            <img
              className="hidden dark:md:inline-block h-full object-cover object-left "
              src="https://io.google/2024/app/images/io24-explore-hero-dark.webp"
              role="img"
              aria-hidden="true"
              fetchPriority="high"
            />
            <img
              className="block md:hidden dark:hidden w-full"
              src="https://io.google/2024/app/images/io24-explore-hero-mobile.webp"
              role="img"
              aria-hidden="true"
              fetchPriority="high"
            />
            <img
              className="hidden dark:inline-block dark:md:hidden w-full"
              src="https://io.google/2024/app/images/io24-explore-hero-mobile-dark.webp"
              role="img"
              aria-hidden="true"
              fetchPriority="high"
            />
          </div>
        </div>
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
                Meet the I/O speakers
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-stack-cards-2 ml:grid-cols-stack-cards-4 md:justify-around ml:justify-between gap-y-8 md:gap-3 mt-4 md:mt-10">
              <a
                href="/explore/?q=mobile"
                onClick={(e) => handleStackClick(e, "mobile", "b31f8e49-c3ba-438e-a7e1-589b4da62640")}
                aria-label="Jumplink Filter content by mobile focus."
                id="explore-stack-item-mobile"
                data-analytics-event="content_card_select"
                data-analytics-event-data='{"cardName": "mobile"}'
                className="relative rounded-[20px] md:border-2 dark:md:border-transparent md:border-transparent min-h-[135px] md:min-h-[297px] hover:border-grey! group dark:hover:border-grey!-bg group"
              >
                <div
                  style={{
                    background:
                      "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)",
                  }}
                  className="absolute w-full h-full top-[11px] rounded-[20px] border-[1.2px] border-grey dark:border-grey-bg md:border-0 md:hidden"
                ></div>
                <div className="absolute md:relative w-full h-full flex flex-row md:flex-col p-4 md:p-3 bg-white dark:bg-grey rounded-[20px] border-[1.2px] border-grey dark:border-grey-bg md:border-0">
                  <img
                    className="hidden md:inline-block w-full group-hover:hidden dark:hidden dark:group-hover:hidden dark:md:group-hover:block"
                    src="https://io.google/2024/app/images/io24-stacks-m.svg"
                    role="img"
                    aria-hidden="true"
                    width="316"
                    height="170"
                  />
                  <img
                    className="hidden dark:md:inline-block w-full group-hover:md:block dark:hidden dark:group-hover:hidden"
                    src="https://io.google/2024/app/images/io24-stacks-m-dark.webp"
                    role="img"
                    aria-hidden="true"
                    width="316"
                    height="170"
                  />
                  <div className="flex-1 flex flex-col md:mt-6">
                    <span className="sm:s-h5 md:l-h6">Mobile</span>
                    <p className="sm:s-p2 md:l-p1 mt-1 md:mt-2">
                      Develop for a range of audiences and form factors.
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="/explore/?q=web"
                onClick={(e) => handleStackClick(e, "web", "13eba1ea-1c78-47b8-86ef-c7808d2507db")}
                aria-label="Jumplink Filter content by web focus."
                id="explore-stack-item-web"
                data-analytics-event="content_card_select"
                data-analytics-event-data='{"cardName": "web"}'
                className="relative rounded-[20px] md:border-2 dark:md:border-transparent md:border-transparent min-h-[135px] md:min-h-[297px] hover:border-grey! group dark:hover:border-grey!-bg group"
              >
                <div
                  style={{
                    background:
                      "linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)",
                  }}
                  className="absolute w-full h-full top-[11px] rounded-[20px] border-[1.2px] border-grey dark:border-grey-bg md:border-0 md:hidden"
                ></div>
                <div className="absolute md:relative w-full h-full flex flex-row md:flex-col p-4 md:p-3 bg-white dark:bg-grey rounded-[20px] border-[1.2px] border-grey dark:border-grey-bg md:border-0">
                  <img
                    className="hidden md:inline-block w-full group-hover:hidden dark:hidden dark:group-hover:hidden dark:md:group-hover:block"
                    src="https://io.google/2024/app/images/io24-stacks-w.svg"
                    role="img"
                    aria-hidden="true"
                    width="316"
                    height="170"
                  />
                  <img
                    className="hidden dark:md:inline-block w-full group-hover:md:block dark:hidden dark:group-hover:hidden"
                    src="https://io.google/2024/app/images/io24-stacks-w-dark.webp"
                    role="img"
                    aria-hidden="true"
                    width="316"
                    height="170"
                  />
                  <div className="flex-1 flex flex-col md:mt-6">
                    <span className="sm:s-h5 md:l-h6">Web</span>
                    <p className="sm:s-p2 md:l-p1 mt-1 md:mt-2">
                      Create fast, secure sites and apps for the open web.
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="/explore/?q=ai"
                onClick={(e) => handleStackClick(e, "ai", "14574666-1892-4a0e-b305-44d6e3f66c56")}
                aria-label="Jumplink Filter content by AI focus."
                id="explore-stack-item-ai"
                data-analytics-event="content_card_select"
                data-analytics-event-data='{"cardName": "ai"}'
                className="relative rounded-[20px] md:border-2 dark:md:border-transparent md:border-transparent min-h-[135px] md:min-h-[297px] hover:border-grey! group dark:hover:border-grey!-bg group"
              >
                <div
                  style={{
                    background:
                      "linear-gradient(90deg, #FFCB32 -0.15%, #FFCB32 17.85%, #F46831 52.85%, #EA4335 78.85%, #EA4335 99.85%)",
                  }}
                  className="absolute w-full h-full top-[11px] rounded-[20px] border-[1.2px] border-grey dark:border-grey-bg md:border-0 md:hidden"
                ></div>
                <div className="absolute md:relative w-full h-full flex flex-row md:flex-col p-4 md:p-3 bg-white dark:bg-grey rounded-[20px] border-[1.2px] border-grey dark:border-grey-bg md:border-0">
                  <img
                    className="hidden md:inline-block w-full group-hover:hidden dark:hidden dark:group-hover:hidden dark:md:group-hover:block"
                    src="https://io.google/2024/app/images/io24-stacks-a.png"
                    role="img"
                    aria-hidden="true"
                    width="316"
                    height="170"
                  />
                  <img
                    className="hidden dark:md:inline-block w-full group-hover:md:block dark:hidden dark:group-hover:hidden"
                    src="https://io.google/2024/app/images/io24-stacks-a-dark.webp"
                    role="img"
                    aria-hidden="true"
                    width="316"
                    height="170"
                  />
                  <div className="flex-1 flex flex-col md:mt-6">
                    <span className="sm:s-h5 md:l-h6">ML/AI</span>
                    <p className="sm:s-p2 md:l-p1 mt-1 md:mt-2">
                      Access cutting-edge AI models and open source tools for
                      machine learning.
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="/explore/?q=cloud"
                onClick={(e) => handleStackClick(e, "cloud", "622b18d9-a6c2-4d31-b506-a2d58e034186")}
                aria-label="Jumplink Filter content by cloud focus."
                id="explore-stack-item-cloud"
                data-analytics-event="content_card_select"
                data-analytics-event-data='{"cardName": "cloud"}'
                className="relative rounded-[20px] md:border-2 dark:md:border-transparent md:border-transparent min-h-[135px] md:min-h-[297px] hover:border-grey! group dark:hover:border-grey!-bg group"
              >
                <div
                  style={{
                    background:
                      "linear-gradient(270.11deg, #5382EB 1.91%, #5382EB 25.69%, #9F6CD4 51.37%, #EA4335 79.9%, #EA4335 97.02%)",
                  }}
                  className="absolute w-full h-full top-[11px] rounded-[20px] border-[1.2px] border-grey dark:border-grey-bg md:border-0 md:hidden"
                ></div>
                <div className="absolute md:relative w-full h-full flex flex-row md:flex-col p-4 md:p-3 bg-white dark:bg-grey rounded-[20px] border-[1.2px] border-grey dark:border-grey-bg md:border-0">
                  <img
                    className="hidden md:inline-block w-full group-hover:hidden dark:hidden dark:group-hover:hidden dark:md:group-hover:block"
                    src="https://io.google/2024/app/images/io24-stacks-c.svg"
                    role="img"
                    aria-hidden="true"
                    width="316"
                    height="170"
                  />
                  <img
                    className="hidden dark:md:inline-block w-full group-hover:md:block dark:hidden dark:group-hover:hidden"
                    src="https://io.google/2024/app/images/io24-stacks-c-dark.webp"
                    role="img"
                    aria-hidden="true"
                    width="316"
                    height="170"
                  />
                  <div className="flex-1 flex flex-col md:mt-6">
                    <span className="sm:s-h5 md:l-h6">Cloud</span>
                    <p className="sm:s-p2 md:l-p1 mt-1 md:mt-2">
                      Simplify and scale end-to-end development.
                    </p>
                  </div>
                </div>
              </a>

            </div>
          </div>
          <div
            className="h-my-io h-inherit"
            data-myio="True"
            data-resources="False"
            data-allbadges="False"
          >
            <div id="my-io-2024" className="my-io-container">
              <span className="sm:l-h5 md:l-h4 inline-block mb-2 md:mb-4">
                My I/O
              </span>
              <p className="sm:s-h6 md:l-h6 underline-link mb-2 md:mb-4">
                Your saved content is automatically stored in your{" "}
                <a
                  className=""
                  aria-label="Opens Google Developer Profile in new tab - open in new tab"
                  target="_blank"
                  rel="noreferrer"
                  href="https://developers.google.com/profile/u/me"
                >
                  developer profile
                </a>
              </p>
              <div
                id="my-io"
                className="relative flex flex-1 flex-col md:flex-row text-grey bg-grey-bg border-[1.2px] md:border-2 border-grey rounded-[16px]"
              >
                <button
                  className="main-opener z-10 absolute top-[55px] right-[30px] hidden md:flex flex-row items-center justify-center w-auto h-auto cursor-pointer"
                  aria-label={isMyIoVisible ? "Hide saved content and content recommended for you" : "View saved content and content recommended for you"}
                  aria-expanded={isMyIoVisible}
                  aria-controls="recommended-sessions-list"
                  onClick={() => setIsMyIoVisible(!isMyIoVisible)}
                >
                  <span className="hidden md:inline-block mr-2 body">{isMyIoVisible ? "Hide" : "View"}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="8"
                    fill="none"
                    className={isMyIoVisible ? "rotate-180" : ""}
                    aria-hidden="true"
                  >
                    <path
                      fill="#202124"
                      d="M12.363.693a.75.75 0 0 1 1.293.54.758.758 0 0 1-.243.535L7.668 7.414a1 1 0 0 1-1.208.275 1 1 0 0 1-.347-.275L.363 1.768A.755.755 0 0 1 .886.495a.748.748 0 0 1 .527.198l5.5 5.38 5.45-5.38Z"
                    ></path>
                  </svg>
                </button>
                <div className="flex flex-col p-4 py-6 md:p-6 md:border-r-[2px] border-grey md:max-w-[290px] text-md:max-w-[400px] ml:max-w-[440px]">
                  <div className="header md:h-[85px] flex flex-row items-center gap-4 relative">
                    <div className="min-w-[50px] md:min-w-[56px]">
                      <img
                        src="https://io.google/2024/app/images/io24-saved-sessions-icon.svg"
                        role="img"
                        aria-hidden="true"
                        loading="lazy"
                        width="56"
                        height="56"
                        className="w-[50px] md:w-full"
                        alt="Saved sessions icon"
                      />
                    </div>
                    <div className="md:w-[195px] text-md:w-[320px]">
                      <span id="saved-sessions-heading" className="title">
                        Saved content
                      </span>
                    </div>
                    <button
                      className="opener md:hidden flex items-center justify-center ml-auto w-12 h-12 cursor-pointer"
                      aria-label={isSavedVisible ? "Hide Saved content" : "View Saved content"}
                      aria-expanded={isSavedVisible}
                      aria-controls="saved-sessions-list"
                      onClick={() => setIsSavedVisible(!isSavedVisible)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="8"
                        fill="none"
                        className={isSavedVisible ? "rotate-180" : ""}
                        aria-hidden="true"
                      >
                        <path
                          fill="#202124"
                          d="M12.363.693a.75.75 0 0 1 1.293.54.758.758 0 0 1-.243.535L7.668 7.414a1 1 0 0 1-1.208.275 1 1 0 0 1-.347-.275L.363 1.768A.755.755 0 0 1 .886.495a.748.748 0 0 1 .527.198l5.5 5.38 5.45-5.38Z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className={`bg-grey h-[1px] md:h-[2px] w-full mt-5 ${!isSavedVisible ? "hidden" : "block"} ${!isMyIoVisible ? "md:hidden" : "md:block"}`}></div>
                  <div
                    id="saved-sessions-list"
                    aria-labelledby="saved-sessions-heading"
                    className={`flex ${!isSavedVisible ? "hidden" : "flex"} ${!isMyIoVisible ? "md:hidden" : "md:flex"}`}
                    aria-live="polite"
                  >
                    <div className="flex flex-col justify-between pt-2 md:pt-3 w-full overflow-auto myio-scrollbar">
                      <button
                        type="button"
                        className="cta-secondary no-dark-mode ml-2 mb-2 block"
                      >
                        <span>Register to save</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-grey h-[1.2px] w-full md:hidden"></div>
                <div className="flex flex-1 flex-col p-4 py-6 md:p-6">
                  <div className="header md:h-[85px] flex flex-row items-center gap-4 relative md:pr-32">
                    <div className="min-w-[50px] md:min-w-[70px]">
                      <img
                        src="https://io.google/2024/app/images/io24-recommended-sessions-icon.svg"
                        role="img"
                        aria-hidden="true"
                        loading="lazy"
                        width="56"
                        height="56"
                        className="w-[50px] md:w-full"
                        alt="Recommended sessions icon"
                      />
                    </div>
                    <div className="max-w-[195px] sm:max-w-[100%]">
                      <span id="recommended-sessions-heading" className="title">
                        Recommended for you
                      </span>
                    </div>
                    <button
                      className="opener md:hidden flex flex-row items-center justify-center ml-auto w-12 h-12 md:w-auto md:h-auto cursor-pointer"
                      aria-label={isRecommendedVisible ? "Hide Recommended for you" : "View Recommended for you"}
                      aria-expanded={isRecommendedVisible}
                      aria-controls="recommended-sessions-list"
                      onClick={() => setIsRecommendedVisible(!isRecommendedVisible)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="8"
                        fill="none"
                        className={isRecommendedVisible ? "rotate-180" : ""}
                        aria-hidden="true"
                      >
                        <path
                          fill="#202124"
                          d="M12.363.693a.75.75 0 0 1 1.293.54.758.758 0 0 1-.243.535L7.668 7.414a1 1 0 0 1-1.208.275 1 1 0 0 1-.347-.275L.363 1.768A.755.755 0 0 1 .886.495a.748.748 0 0 1 .527.198l5.5 5.38 5.45-5.38Z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className={`bg-grey h-[1px] md:h-[2px] w-full mt-5 ${!isRecommendedVisible ? "hidden" : "block"} ${!isMyIoVisible ? "md:hidden" : "md:block"}`}></div>
                  <div
                    id="recommended-sessions-list"
                    aria-labelledby="recommended-sessions-heading"
                    className={`flex ${!isRecommendedVisible ? "hidden" : "flex"} ${!isMyIoVisible ? "md:hidden" : "md:flex"}`}
                    aria-live="polite"
                  >
                    <div className="flex flex-col justify-between pt-2 md:pt-3 w-full overflow-auto myio-scrollbar">
                      <p className="cta underline-link">
                        Create a{" "}
                        <a
                          className=""
                          aria-label="Opens Google Developer Profile in new tab - open in new tab"
                          target="_blank"
                          rel="noreferrer"
                          href="https://web.archive.org/web/20240427125258mp_/https://developers.google.com/profile/u/me"
                        >
                          Google Developer Profile
                        </a>{" "}
                        to see programming recommended for you
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="program-content pt-4 md:pt-10">
            <div className="program-content__left">
              <div className="filter-box w-full max-h-[525px]">
                <button
                  type="button"
                  className={`filter-box__header bg-grey-900 dark:bg-white py-4 px-5 align-center ${isFocusExpanded ? "border-b-2 border-gray-900" : ""}`}
                  aria-expanded={isFocusExpanded}
                  aria-label="Filter menu for focus."
                  onClick={(event) => {
                    trackFilterCategory("Focus", event);
                    setIsFocusExpanded(!isFocusExpanded);
                  }}
                >
                  <h2
                    id="stack-filters"
                    className="text-white font-medium dark:text-grey"
                  >
                    Focus
                  </h2>
                  <div className={`filter-box__chevron ${!isFocusExpanded ? "transform -scale-y-100" : ""}`}>
                    <img
                      className="hidden dark:block hcm-light-display"
                      src="https://io.google/2024/app/images/chevron-up.svg"
                      aria-hidden="true"
                    />
                    <img
                      className="block dark:hidden hcm-dark-display"
                      src="https://io.google/2024/app/images/chevron-up-white.svg"
                      aria-hidden="true"
                    />
                  </div>
                </button>
                <div
                  className={`filter-box__items ${!isFocusExpanded ? "hide" : ""}`}
                  role="list"
                  aria-labelledby="stack-filters"
                >
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="14574666-1892-4a0e-b305-44d6e3f66c56"
                        name="14574666-1892-4a0e-b305-44d6e3f66c56"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="stack"
                        data-analytics-filter="AI"
                        data-analytics-defer="false"
                        data-label="AI"
                        data-id="14574666-1892-4a0e-b305-44d6e3f66c56"
                        aria-label="AI"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="14574666-1892-4a0e-b305-44d6e3f66c56"
                        aria-hidden="true"
                      >
                        <div className="">
                          <span>AI</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="622b18d9-a6c2-4d31-b506-a2d58e034186"
                        name="622b18d9-a6c2-4d31-b506-a2d58e034186"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="stack"
                        data-analytics-filter="Cloud"
                        data-analytics-defer="false"
                        data-label="Cloud"
                        data-id="622b18d9-a6c2-4d31-b506-a2d58e034186"
                        aria-label="Cloud"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="622b18d9-a6c2-4d31-b506-a2d58e034186"
                        aria-hidden="true"
                      >
                        <div className="">
                          <span>Cloud</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="b31f8e49-c3ba-438e-a7e1-589b4da62640"
                        name="b31f8e49-c3ba-438e-a7e1-589b4da62640"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="stack"
                        data-analytics-filter="Mobile"
                        data-analytics-defer="false"
                        data-label="Mobile"
                        data-id="b31f8e49-c3ba-438e-a7e1-589b4da62640"
                        aria-label="Mobile"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="b31f8e49-c3ba-438e-a7e1-589b4da62640"
                        aria-hidden="true"
                      >
                        <div className="">
                          <span>Mobile</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="13eba1ea-1c78-47b8-86ef-c7808d2507db"
                        name="13eba1ea-1c78-47b8-86ef-c7808d2507db"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="stack"
                        data-analytics-filter="Web"
                        data-analytics-defer="false"
                        data-label="Web"
                        data-id="13eba1ea-1c78-47b8-86ef-c7808d2507db"
                        aria-label="Web"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="13eba1ea-1c78-47b8-86ef-c7808d2507db"
                        aria-hidden="true"
                      >
                        <div className="">
                          <span>Web</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-box w-full max-h-[525px]">
                <button
                  type="button"
                  className={`filter-box__header bg-grey-900 dark:bg-white py-4 px-5 align-center ${isTopicsExpanded ? "border-b-2 border-gray-900" : ""}`}
                  aria-expanded={isTopicsExpanded}
                  aria-label="Filter menu for topic."
                  onClick={(event) => {
                    trackFilterCategory("Topics", event);
                    setIsTopicsExpanded(!isTopicsExpanded);
                  }}
                >
                  <h2
                    id="topic-filters"
                    className="text-white font-medium dark:text-grey"
                  >
                    Topics
                  </h2>
                  <div className={`filter-box__chevron ${!isTopicsExpanded ? "transform -scale-y-100" : ""}`}>
                    <img
                      className="hidden dark:block hcm-light-display"
                      src="https://io.google/2024/app/images/chevron-up.svg"
                      aria-hidden="true"
                    />
                    <img
                      className="block dark:hidden hcm-dark-display"
                      src="https://io.google/2024/app/images/chevron-up-white.svg"
                      aria-hidden="true"
                    />
                  </div>
                </button>
                <div
                  className={`filter-box__items flex flex-col h-full pl-6 py-4 pr-7 overflow-y-auto max-h-[349px] ${!isTopicsExpanded ? "hide" : ""}`}
                  role="list"
                  aria-labelledby="topic-filters"
                >
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="8f5b3990-4b88-45c9-943c-e05531de0f73"
                        name="8f5b3990-4b88-45c9-943c-e05531de0f73"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="topic"
                        data-analytics-filter="Accessibility"
                        data-analytics-defer="false"
                        data-label="Accessibility"
                        data-id="8f5b3990-4b88-45c9-943c-e05531de0f73"
                        aria-label="Accessibility"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="8f5b3990-4b88-45c9-943c-e05531de0f73"
                        aria-hidden="true"
                      >
                        <div className="">
                          <div
                            className="h-translated-category"
                            data-name="Accessibility"
                            data-speaker="False"
                          >
                            <span>Accessibility</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="88574f1d-9051-4f14-9c60-f83160bcd560"
                        name="88574f1d-9051-4f14-9c60-f83160bcd560"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="topic"
                        data-analytics-filter="AI / Machine Learning"
                        data-analytics-defer="false"
                        data-label="AI / Machine Learning"
                        data-id="88574f1d-9051-4f14-9c60-f83160bcd560"
                        aria-label="AI / Machine Learning"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="88574f1d-9051-4f14-9c60-f83160bcd560"
                        aria-hidden="true"
                      >
                        <div className="">
                          <div
                            className="h-translated-category"
                            data-name="AI / Machine Learning"
                            data-speaker="False"
                          >
                            <span>AI / Machine Learning</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="088d506d-5c55-4b15-9b95-0be49b939c2a"
                        name="088d506d-5c55-4b15-9b95-0be49b939c2a"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="topic"
                        data-analytics-filter="Android"
                        data-analytics-defer="false"
                        data-label="Android"
                        data-id="088d506d-5c55-4b15-9b95-0be49b939c2a"
                        aria-label="Android"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="088d506d-5c55-4b15-9b95-0be49b939c2a"
                        aria-hidden="true"
                      >
                        <div className="">
                          <div
                            className="h-translated-category"
                            data-name="Android"
                            data-speaker="False"
                          >
                            <span>Android</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="a349f842-4793-437a-952f-645f2e601c5f"
                        name="a349f842-4793-437a-952f-645f2e601c5f"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="topic"
                        data-analytics-filter="Angular"
                        data-analytics-defer="false"
                        data-label="Angular"
                        data-id="a349f842-4793-437a-952f-645f2e601c5f"
                        aria-label="Angular"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="a349f842-4793-437a-952f-645f2e601c5f"
                        aria-hidden="true"
                      >
                        <div className="">
                          <div
                            className="h-translated-category"
                            data-name="Angular"
                            data-speaker="False"
                          >
                            <span>Angular</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="2610ec1e-3784-48bf-9b7f-a9665f8c5cb6"
                        name="2610ec1e-3784-48bf-9b7f-a9665f8c5cb6"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="topic"
                        data-analytics-filter="AR/VR"
                        data-analytics-defer="false"
                        data-label="AR/VR"
                        data-id="2610ec1e-3784-48bf-9b7f-a9665f8c5cb6"
                        aria-label="AR/VR"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="2610ec1e-3784-48bf-9b7f-a9665f8c5cb6"
                        aria-hidden="true"
                      >
                        <div className="">
                          <div
                            className="h-translated-category"
                            data-name="AR/VR"
                            data-speaker="False"
                          >
                            <span>AR/VR</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="404f9e90-5aa9-41a2-9751-372aa824b8fd"
                        name="404f9e90-5aa9-41a2-9751-372aa824b8fd"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="topic"
                        data-analytics-filter="ChromeOS"
                        data-analytics-defer="false"
                        data-label="ChromeOS"
                        data-id="404f9e90-5aa9-41a2-9751-372aa824b8fd"
                        aria-label="ChromeOS"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="404f9e90-5aa9-41a2-9751-372aa824b8fd"
                        aria-hidden="true"
                      >
                        <div className="">
                          <div
                            className="h-translated-category"
                            data-name="ChromeOS"
                            data-speaker="False"
                          >
                            <span>Chrome OS</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="ad532883-dda3-4066-aa6f-1f858968915d"
                        name="ad532883-dda3-4066-aa6f-1f858968915d"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="topic"
                        data-analytics-filter="Cloud"
                        data-analytics-defer="false"
                        data-label="Cloud"
                        data-id="ad532883-dda3-4066-aa6f-1f858968915d"
                        aria-label="Cloud"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="ad532883-dda3-4066-aa6f-1f858968915d"
                        aria-hidden="true"
                      >
                        <div className="">
                          <div
                            className="h-translated-category"
                            data-name="Cloud"
                            data-speaker="False"
                          >
                            <span>Cloud</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="1177d688-c358-4598-a88e-86fe69f2cfb7"
                        name="1177d688-c358-4598-a88e-86fe69f2cfb7"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="topic"
                        data-analytics-filter="Design"
                        data-analytics-defer="false"
                        data-label="Design"
                        data-id="1177d688-c358-4598-a88e-86fe69f2cfb7"
                        aria-label="Design"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="1177d688-c358-4598-a88e-86fe69f2cfb7"
                        aria-hidden="true"
                      >
                        <div className="">
                          <div
                            className="h-translated-category"
                            data-name="Design"
                            data-speaker="False"
                          >
                            <span>Design</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="d73701c9-6652-4f18-a628-5237920e7415"
                        name="d73701c9-6652-4f18-a628-5237920e7415"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="topic"
                        data-analytics-filter="Firebase"
                        data-analytics-defer="false"
                        data-label="Firebase"
                        data-id="d73701c9-6652-4f18-a628-5237920e7415"
                        aria-label="Firebase"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="d73701c9-6652-4f18-a628-5237920e7415"
                        aria-hidden="true"
                      >
                        <div className="">
                          <div
                            className="h-translated-category"
                            data-name="Firebase"
                            data-speaker="False"
                          >
                            <span>Firebase</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="5fb7f0e0-a6d3-44e5-8e21-d703ef0333a3"
                        name="5fb7f0e0-a6d3-44e5-8e21-d703ef0333a3"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="topic"
                        data-analytics-filter="Flutter"
                        data-analytics-defer="false"
                        data-label="Flutter"
                        data-id="5fb7f0e0-a6d3-44e5-8e21-d703ef0333a3"
                        aria-label="Flutter"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="5fb7f0e0-a6d3-44e5-8e21-d703ef0333a3"
                        aria-hidden="true"
                      >
                        <div className="">
                          <div
                            className="h-translated-category"
                            data-name="Flutter"
                            data-speaker="False"
                          >
                            <span>Flutter</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="a4e28745-3a67-4bbd-820d-36886497c07c"
                        name="a4e28745-3a67-4bbd-820d-36886497c07c"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="topic"
                        data-analytics-filter="Go"
                        data-analytics-defer="false"
                        data-label="Go"
                        data-id="a4e28745-3a67-4bbd-820d-36886497c07c"
                        aria-label="Go"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="a4e28745-3a67-4bbd-820d-36886497c07c"
                        aria-hidden="true"
                      >
                        <div className="">
                          <div
                            className="h-translated-category"
                            data-name="Go"
                            data-speaker="False"
                          >
                            <span>Go</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="503cdf28-8e62-4751-b10e-d9fe5499e10a"
                        name="503cdf28-8e62-4751-b10e-d9fe5499e10a"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="topic"
                        data-analytics-filter="Google Play"
                        data-analytics-defer="false"
                        data-label="Google Play"
                        data-id="503cdf28-8e62-4751-b10e-d9fe5499e10a"
                        aria-label="Google Play"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="503cdf28-8e62-4751-b10e-d9fe5499e10a"
                        aria-hidden="true"
                      >
                        <div className="">
                          <div
                            className="h-translated-category"
                            data-name="Google Play"
                            data-speaker="False"
                          >
                            <span>Google Play </span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="700fed55-dc35-40c0-976b-788a66f332ed"
                        name="700fed55-dc35-40c0-976b-788a66f332ed"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="topic"
                        data-analytics-filter="Location/Maps"
                        data-analytics-defer="false"
                        data-label="Location/Maps"
                        data-id="700fed55-dc35-40c0-976b-788a66f332ed"
                        aria-label="Location/Maps"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="700fed55-dc35-40c0-976b-788a66f332ed"
                        aria-hidden="true"
                      >
                        <div className="">
                          <div
                            className="h-translated-category"
                            data-name="Location/Maps"
                            data-speaker="False"
                          >
                            <span>Location/Maps</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="1232df61-7b3a-4efa-89be-b26714c3d6e4"
                        name="1232df61-7b3a-4efa-89be-b26714c3d6e4"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="topic"
                        data-analytics-filter="Smart Home"
                        data-analytics-defer="false"
                        data-label="Smart Home"
                        data-id="1232df61-7b3a-4efa-89be-b26714c3d6e4"
                        aria-label="Smart Home"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="1232df61-7b3a-4efa-89be-b26714c3d6e4"
                        aria-hidden="true"
                      >
                        <div className="">
                          <span>Smart Home</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="d52ff67c-f7fe-463d-a978-3fcaf989fb21"
                        name="d52ff67c-f7fe-463d-a978-3fcaf989fb21"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="topic"
                        data-analytics-filter="Wear OS"
                        data-analytics-defer="false"
                        data-label="Wear OS"
                        data-id="d52ff67c-f7fe-463d-a978-3fcaf989fb21"
                        aria-label="Wear OS"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="d52ff67c-f7fe-463d-a978-3fcaf989fb21"
                        aria-hidden="true"
                      >
                        <div className="">
                          <div
                            className="h-translated-category"
                            data-name="Wear OS"
                            data-speaker="False"
                          >
                            <span>Wear OS</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="f753bf55-c398-4f4a-941b-329b296bd287"
                        name="f753bf55-c398-4f4a-941b-329b296bd287"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="topic"
                        data-analytics-filter="Web"
                        data-analytics-defer="false"
                        data-label="Web"
                        data-id="f753bf55-c398-4f4a-941b-329b296bd287"
                        aria-label="Web"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="f753bf55-c398-4f4a-941b-329b296bd287"
                        aria-hidden="true"
                      >
                        <div className="">
                          <div
                            className="h-translated-category"
                            data-name="Web"
                            data-speaker="False"
                          >
                            <span>Web</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-box w-full max-h-[525px]">
                <button
                  type="button"
                  className={`filter-box__header bg-grey-900 dark:bg-white py-4 px-5 align-center ${isTypeExpanded ? "border-b-2 border-gray-900" : ""}`}
                  aria-expanded={isTypeExpanded}
                  aria-label="Filter menu for content type."
                  onClick={(event) => {
                    trackFilterCategory("Content type", event);
                    setIsTypeExpanded(!isTypeExpanded);
                  }}
                >
                  <h2
                    id="type-filters"
                    className="text-white font-medium dark:text-grey"
                  >
                    Content type
                  </h2>
                  <div className={`filter-box__chevron ${!isTypeExpanded ? "transform -scale-y-100" : ""}`}>
                    <img
                      className="hidden dark:block hcm-light-display"
                      src="https://io.google/2024/app/images/chevron-up.svg"
                      aria-hidden="true"
                    />
                    <img
                      className="block dark:hidden hcm-dark-display"
                      src="https://io.google/2024/app/images/chevron-up-white.svg"
                      aria-hidden="true"
                    />
                  </div>
                </button>
                <div
                  className={`filter-box__items ${!isTypeExpanded ? "hide" : ""}`}
                  role="list"
                  aria-labelledby="type-filters"
                >
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="keynote-filter"
                        name="keynote-filter"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="type"
                        data-analytics-filter="Keynote"
                        data-analytics-defer="false"
                        data-label="Keynote"
                        data-id="keynote-filter"
                        aria-label="Keynote"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="keynote-filter"
                        aria-hidden="true"
                      >
                        <div className="">
                          <span>Keynote</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="71b9babb-77d8-4a81-b8b3-8d9d7d71081e"
                        name="71b9babb-77d8-4a81-b8b3-8d9d7d71081e"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="type"
                        data-analytics-filter="Technical session"
                        data-analytics-defer="false"
                        data-label="Technical session"
                        data-id="71b9babb-77d8-4a81-b8b3-8d9d7d71081e"
                        aria-label="Technical session"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="71b9babb-77d8-4a81-b8b3-8d9d7d71081e"
                        aria-hidden="true"
                      >
                        <div className="">
                          <span>Technical session</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="98b75245-0ae8-4524-9272-760afbbd1458"
                        name="98b75245-0ae8-4524-9272-760afbbd1458"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="type"
                        data-analytics-filter="Workshop"
                        data-analytics-defer="false"
                        data-label="Workshop"
                        data-id="98b75245-0ae8-4524-9272-760afbbd1458"
                        aria-label="Workshop"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="98b75245-0ae8-4524-9272-760afbbd1458"
                        aria-hidden="true"
                      >
                        <div className="">
                          <span>Workshop</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-box w-full max-h-[525px]">
                <button
                  type="button"
                  className={`filter-box__header bg-grey-900 dark:bg-white py-4 px-5 align-center ${isLevelExpanded ? "border-b-2 border-gray-900" : ""}`}
                  aria-expanded={isLevelExpanded}
                  aria-label="Filter menu for level."
                  onClick={(event) => {
                    trackFilterCategory("Level", event);
                    setIsLevelExpanded(!isLevelExpanded);
                  }}
                >
                  <h2
                    id="level-filters"
                    className="text-white font-medium dark:text-grey"
                  >
                    Level
                  </h2>
                  <div className={`filter-box__chevron ${!isLevelExpanded ? "transform -scale-y-100" : ""}`}>
                    <img
                      className="hidden dark:block hcm-light-display"
                      src="https://io.google/2024/app/images/chevron-up.svg"
                      aria-hidden="true"
                    />
                    <img
                      className="block dark:hidden hcm-dark-display"
                      src="https://io.google/2024/app/images/chevron-up-white.svg"
                      aria-hidden="true"
                    />
                  </div>
                </button>
                <div
                  className={`filter-box__items ${!isLevelExpanded ? "hide" : ""}`}
                  role="list"
                  aria-labelledby="level-filters"
                >
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="e351b55e-b8ab-4b3c-aff9-cee0d294ea29"
                        name="e351b55e-b8ab-4b3c-aff9-cee0d294ea29"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="level"
                        data-analytics-filter="Beginner"
                        data-analytics-defer="false"
                        data-label="Beginner"
                        data-id="e351b55e-b8ab-4b3c-aff9-cee0d294ea29"
                        aria-label="Beginner"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="e351b55e-b8ab-4b3c-aff9-cee0d294ea29"
                        aria-hidden="true"
                      >
                        <div className="">
                          <span>Beginner</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="a0d5636a-51e6-4cd8-a809-85aa7a67d8d3"
                        name="a0d5636a-51e6-4cd8-a809-85aa7a67d8d3"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="level"
                        data-analytics-filter="Intermediate"
                        data-analytics-defer="false"
                        data-label="Intermediate"
                        data-id="a0d5636a-51e6-4cd8-a809-85aa7a67d8d3"
                        aria-label="Intermediate"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="a0d5636a-51e6-4cd8-a809-85aa7a67d8d3"
                        aria-hidden="true"
                      >
                        <div className="">
                          <span>Intermediate</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div role="listitem">
                    <div className="filter-box__item">
                      <input
                        type="checkbox"
                        id="46f60ade-f383-4563-9396-b2855a2f0c68"
                        name="46f60ade-f383-4563-9396-b2855a2f0c68"
                        className="checkbox"
                        onChange={(event) => {
                          trackFilter(event);
                        }}
                        data-classification="level"
                        data-analytics-filter="Advanced"
                        data-analytics-defer="false"
                        data-label="Advanced"
                        data-id="46f60ade-f383-4563-9396-b2855a2f0c68"
                        aria-label="Advanced"
                      />
                      <label
                        className="filter-box__option-text"
                        htmlFor="46f60ade-f383-4563-9396-b2855a2f0c68"
                        aria-hidden="true"
                      >
                        <div className="">
                          <span>Advanced</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="program-content__right">
              <div className="h-pill-board">
                <div className={`flex w-full h-auto ${searchQuery ? "pb-8" : ""}`}>
                  <div className="z-10 block fixed bottom-4 right-0 md:hidden">
                    <button
                      id="filter-burger"
                      className="m-filter__chip w-auto ring-offset-2 focus:outline-none focus:ring focus:ring-blue dark:focus:ring-blue-dark bg-grey-900 dark:bg-white rounded-full px-5 py-3 flex flex-row items-center"
                      aria-expanded={isFilterDrawerOpen}
                      aria-label="Filter button"
                      aria-controls="filter-drawer"
                      onClick={() => setIsFilterDrawerOpen(true)}
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
                        const titleMap: Record<string, string> = {
                          "ai": "ML/AI",
                        };
                        const displayTitle = term.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                        const title = titleMap[term] || displayTitle;

                        return (
                          <button
                            key={term}
                            role="presentation"
                            data-chip="true"
                            className="m-filter__chip flex flex-row items-center ring-offset-2 focus:outline-none focus:ring focus:ring-blue dark:focus:ring-blue-dark dark:bg-white bg-grey-900 rounded-lg py-3 px-5 gap-2"
                            aria-label={`remove filter for ${term}`}
                            onClick={(e) => {
                              if (e.nativeEvent.isTrusted) {
                                const newQuery = searchQuery.split(',').filter(q => q !== term).join(',');
                                router.push(`/explore/${newQuery ? `?q=${newQuery}` : ''}`, { scroll: false });
                              }
                            }}
                          >
                            <span className="m-filter__chip-title text-white font-medium dark:text-grey capitalize">
                              {title}
                            </span>
                            <img
                              aria-hidden="true"
                              className="dark:block hidden hcm-light-display"
                              src="https://io.google/2024/app/images/program-close-icon.svg"
                              width="16"
                              height="16"
                            />
                            <img
                              aria-hidden="true"
                              className="block dark:hidden hcm-dark-display"
                              src="https://io.google/2024/app/images/program-close-icon-white.svg"
                              width="16"
                              height="16"
                            />
                          </button>
                        );
                      })}
                      <button
                        className="font-medium underline-link ml-2 dark:text-white"
                        data-clear-all="data-clear-all"
                        aria-label="Clear all"
                        onClick={(e) => {
                          if (e.nativeEvent.isTrusted) router.push('/explore/', { scroll: false });
                        }}
                      >
                        Clear all
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div
                role="list"
                className="w-full grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <div
                  role="listitem"
                  className="session w-full md:max-w-[484px]"
                  data-session-id="a6eb8619-5c2e-4671-84cb-b938c27103be"
                  data-topic="[]"
                  data-level='["e351b55e-b8ab-4b3c-aff9-cee0d294ea29"]'
                  data-type='["keynote-filter"]'
                  data-stack='["14574666-1892-4a0e-b305-44d6e3f66c56", "b31f8e49-c3ba-438e-a7e1-589b4da62640", "622b18d9-a6c2-4d31-b506-a2d58e034186", "13eba1ea-1c78-47b8-86ef-c7808d2507db"]'
                  style={{ display: "block" }}
                >
                  <div className="w-full ">
                    <a
                      href="/explore/a6eb8619-5c2e-4671-84cb-b938c27103be/"
                      onClick={(event) => {
                        trackEvent("session_select", {
                          sessionName: `Google keynote`,
                          sessionCode: `IO24_GOOGLEKEY_001`,
                          sessionId: `a6eb8619-5c2e-4671-84cb-b938c27103be`,
                        });
                      }}
                      className="focus:outline-none card-link"
                    >
                      <div className="w-full aspect-w-16 aspect-h-9 relative mb-5">
                        <img
                          loading="lazy"
                          role="img"
                          aria-hidden="true"
                          className="absolute h-full w-full object-cover"
                          src="https://io.google/2024/app/images/io24-featured-keynote-google.webp"
                        />
                      </div>
                      <div className="mb-4 md:min-h-[136px] body-outlined">
                        <p className="sm:l-eyebrow uppercase">10:00AM PT</p>
                        <div className="font-medium! sm:s-p1 md:l-h6 mt-2">
                          Google keynote
                        </div>
                        <p className="mt-2 sm:s-p2">
                          Tune in to find out how we're furthering our mission
                          to organize the world's information and make it
                          universally acce...
                        </p>
                      </div>
                    </a>
                    <div className="flex mt-auto justify-between">
                      <div className="card__keywords">
                        <p className="sr-only">Session tags</p>
                        <span className="">
                          <div className="">
                            <span>Beginner</span>
                          </div>
                        </span>
                        <span className="">
                          <div className="">
                            <span>Keynote</span>
                          </div>
                        </span>
                      </div>
                      <div className="flex flex-1 justify-end gap-2 items-center">
                        <div
                          className="h-calendar"
                          data-id="a6eb8619-5c2e-4671-84cb-b938c27103be"
                          data-code="IO24_GOOGLEKEY_001"
                          data-title="Google keynote"
                          data-description="Tune in to find out how we're furthering our mission to organize the world's information and make it universally accessible and useful."
                          data-start-time="0001-01-01T00:00:00"
                          data-end-time="0001-01-01T00:00:00"
                          data-add-label=""
                          data-force-white-color=""
                        >
                          <button aria-label="Add to calendar" className="flex">
                            <span className="flex justify-center items-center w-6 h-6">
                              <svg
                                aria-hidden="true"
                                role="presentation"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M19.5 3H18V2.25C18 2.05109 17.921 1.86032 17.7803 1.71967C17.6397 1.57902 17.4489 1.5 17.25 1.5C17.0511 1.5 16.8603 1.57902 16.7197 1.71967C16.579 1.86032 16.5 2.05109 16.5 2.25V3H7.5V2.25C7.5 2.05109 7.42098 1.86032 7.28033 1.71967C7.13968 1.57902 6.94891 1.5 6.75 1.5C6.55109 1.5 6.36032 1.57902 6.21967 1.71967C6.07902 1.86032 6 2.05109 6 2.25V3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V4.5C21 4.10218 20.842 3.72064 20.5607 3.43934C20.2794 3.15804 19.8978 3 19.5 3ZM19.5 4.5V6H4.5V4.5H19.5ZM4.5 19.5V7.5H19.5V19.5H4.5Z"
                                  className="dark:fill-white forced-white-color fill-grey"
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                        <div
                          className="r-bookmark"
                          data-bm-session-id="a6eb8619-5c2e-4671-84cb-b938c27103be"
                          data-session-path=""
                          data-session-code="IO24_GOOGLEKEY_001"
                          data-disable-dark-mode="False"
                          data-white-spinner=""
                          data-myio-label=""
                          data-label-position=""
                          data-title="Google keynote"
                          data-category=""
                          data-force-white-color=""
                          data-label-style={{ sm: "s-cta1 md:l-cta2" }}
                        >
                          <button
                            type="button"
                            className="flex items-center"
                            aria-label="Bookmark this session"
                          >
                            <span className="flex justify-center items-center w-6 h-6">
                              <svg
                                width="16"
                                height="20"
                                viewBox="0 0 16 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="forced-white-color   "
                              >
                                <path
                                  d="M1 1v18l6.079-4.5 7.184 4.5V1H1Z"
                                  stroke="#000000"
                                  stroke-width="1.5"
                                  stroke-linejoin="round"
                                  className="hcm-link-text-stroke  black dark:stroke-grey-bg"
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  role="listitem"
                  className="session w-full md:max-w-[484px]"
                  data-session-id="af9317b5-1c42-471a-99db-1bc8108d06a8"
                  data-topic="[]"
                  data-level='["e351b55e-b8ab-4b3c-aff9-cee0d294ea29"]'
                  data-type='["keynote-filter"]'
                  data-stack='["14574666-1892-4a0e-b305-44d6e3f66c56", "b31f8e49-c3ba-438e-a7e1-589b4da62640", "622b18d9-a6c2-4d31-b506-a2d58e034186", "13eba1ea-1c78-47b8-86ef-c7808d2507db"]'
                  style={{ display: "block" }}
                >
                  <div className="w-full ">
                    <a
                      href="/explore/af9317b5-1c42-471a-99db-1bc8108d06a8/"
                      onClick={(event) => {
                        trackEvent("session_select", {
                          sessionName: `Developer keynote`,
                          sessionCode: `IO24_DEVKEY_002`,
                          sessionId: `af9317b5-1c42-471a-99db-1bc8108d06a8`,
                        });
                      }}
                      className="focus:outline-none card-link"
                    >
                      <div className="w-full aspect-w-16 aspect-h-9 relative mb-5">
                        <img
                          loading="lazy"
                          role="img"
                          aria-hidden="true"
                          className="absolute h-full w-full object-cover"
                          src="https://io.google/2024/app/images/io24-featured-keynote-developer.webp"
                        />
                      </div>
                      <div className="mb-4 md:min-h-[136px] body-outlined">
                        <p className="sm:l-eyebrow uppercase">1:30PM PT</p>
                        <div className="font-medium! sm:s-p1 md:l-h6 mt-2">
                          Developer keynote
                        </div>
                        <p className="mt-2 sm:s-p2">
                          Learn about Google’s newest developer tools and
                          discover how they fuel innovation and enhance your
                          workflow for maxim...
                        </p>
                      </div>
                    </a>
                    <div className="flex mt-auto justify-between">
                      <div className="card__keywords">
                        <p className="sr-only">Session tags</p>
                        <span className="">
                          <div className="">
                            <span>Beginner</span>
                          </div>
                        </span>
                        <span className="">
                          <div className="">
                            <span>Keynote</span>
                          </div>
                        </span>
                      </div>
                      <div className="flex flex-1 justify-end gap-2 items-center">
                        <div
                          className="h-calendar"
                          data-id="af9317b5-1c42-471a-99db-1bc8108d06a8"
                          data-code="IO24_DEVKEY_002"
                          data-title="Developer keynote"
                          data-description="Learn about Google’s newest developer tools and discover how they fuel innovation and enhance your workflow for maximum productivity."
                          data-start-time="0001-01-01T00:00:00"
                          data-end-time="0001-01-01T00:00:00"
                          data-add-label=""
                          data-force-white-color=""
                        >
                          <button aria-label="Add to calendar" className="flex">
                            <span className="flex justify-center items-center w-6 h-6">
                              <svg
                                aria-hidden="true"
                                role="presentation"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M19.5 3H18V2.25C18 2.05109 17.921 1.86032 17.7803 1.71967C17.6397 1.57902 17.4489 1.5 17.25 1.5C17.0511 1.5 16.8603 1.57902 16.7197 1.71967C16.579 1.86032 16.5 2.05109 16.5 2.25V3H7.5V2.25C7.5 2.05109 7.42098 1.86032 7.28033 1.71967C7.13968 1.57902 6.94891 1.5 6.75 1.5C6.55109 1.5 6.36032 1.57902 6.21967 1.71967C6.07902 1.86032 6 2.05109 6 2.25V3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V4.5C21 4.10218 20.842 3.72064 20.5607 3.43934C20.2794 3.15804 19.8978 3 19.5 3ZM19.5 4.5V6H4.5V4.5H19.5ZM4.5 19.5V7.5H19.5V19.5H4.5Z"
                                  className="dark:fill-white forced-white-color fill-grey"
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                        <div
                          className="r-bookmark"
                          data-bm-session-id="af9317b5-1c42-471a-99db-1bc8108d06a8"
                          data-session-path=""
                          data-session-code="IO24_DEVKEY_002"
                          data-disable-dark-mode="False"
                          data-white-spinner=""
                          data-myio-label=""
                          data-label-position=""
                          data-title="Developer keynote"
                          data-category=""
                          data-force-white-color=""
                          data-label-style={{ sm: "s-cta1 md:l-cta2" }}
                        >
                          <button
                            type="button"
                            className="flex items-center"
                            aria-label="Bookmark this session"
                          >
                            <span className="flex justify-center items-center w-6 h-6">
                              <svg
                                width="16"
                                height="20"
                                viewBox="0 0 16 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="forced-white-color   "
                              >
                                <path
                                  d="M1 1v18l6.079-4.5 7.184 4.5V1H1Z"
                                  stroke="#000000"
                                  stroke-width="1.5"
                                  stroke-linejoin="round"
                                  className="hcm-link-text-stroke  black dark:stroke-grey-bg"
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  role="listitem"
                  className="session w-full md:max-w-[484px]"
                  data-session-id="12782059-aef8-450d-acfd-e1d616fdb48e"
                  data-topic='["088d506d-5c55-4b15-9b95-0be49b939c2a"]'
                  data-level='["e351b55e-b8ab-4b3c-aff9-cee0d294ea29"]'
                  data-type='["keynote-filter"]'
                  data-stack='["b31f8e49-c3ba-438e-a7e1-589b4da62640"]'
                  style={{ display: "block" }}
                >
                  <div className="w-full ">
                    <a
                      href="/explore/12782059-aef8-450d-acfd-e1d616fdb48e/"
                      onClick={(event) => {
                        trackEvent("session_select", {
                          sessionName: `What's new in Android`,
                          sessionCode: `IO24_PAKEY_LIVE_004`,
                          sessionId: `12782059-aef8-450d-acfd-e1d616fdb48e`,
                        });
                      }}
                      className="focus:outline-none card-link"
                    >
                      <div className="w-full aspect-w-16 aspect-h-9 relative mb-5">
                        <img
                          loading="lazy"
                          role="img"
                          aria-hidden="true"
                          className="absolute h-full w-full object-cover"
                          src="https://web.archive.org/web/20240427125258im_/https://io.google/2024/data/im/12782059-aef8-450d-acfd-e1d616fdb48e.webp"
                        />
                      </div>
                      <div className="mb-4 md:min-h-[136px] body-outlined">
                        <div className="font-medium! sm:s-p1 md:l-h6 mt-2">
                          What's new in Android
                        </div>
                        <p className="mt-2 sm:s-p2">
                          The latest in Android development covering generative
                          AI, Android 15, form factors, Jetpack, Compose,
                          tooling, perfor...
                        </p>
                      </div>
                    </a>
                    <div className="flex mt-auto justify-between">
                      <div className="card__keywords">
                        <p className="sr-only">Session tags</p>
                        <span className="">
                          <div className="">
                            <span>Beginner</span>
                          </div>
                        </span>
                        <span className="">
                          <div className="">
                            <div
                              className="h-translated-category"
                              data-name="Android"
                              data-speaker=""
                            >
                              <span>Android</span>
                            </div>
                          </div>
                        </span>
                        <span className="">
                          <div className="">
                            <span>Keynote</span>
                          </div>
                        </span>
                      </div>
                      <div className="flex flex-1 justify-end gap-2 items-center">
                        <div
                          className="r-bookmark"
                          data-bm-session-id="12782059-aef8-450d-acfd-e1d616fdb48e"
                          data-session-path=""
                          data-session-code="IO24_PAKEY_LIVE_004"
                          data-disable-dark-mode="False"
                          data-white-spinner=""
                          data-myio-label=""
                          data-label-position=""
                          data-title="What's new in Android"
                          data-category=""
                          data-force-white-color=""
                          data-label-style={{ sm: "s-cta1 md:l-cta2" }}
                        >
                          <button
                            type="button"
                            className="flex items-center"
                            aria-label="Bookmark this session"
                          >
                            <span className="flex justify-center items-center w-6 h-6">
                              <svg
                                width="16"
                                height="20"
                                viewBox="0 0 16 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="forced-white-color   "
                              >
                                <path
                                  d="M1 1v18l6.079-4.5 7.184 4.5V1H1Z"
                                  stroke="#000000"
                                  stroke-width="1.5"
                                  stroke-linejoin="round"
                                  className="hcm-link-text-stroke  black dark:stroke-grey-bg"
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  role="listitem"
                  className="session w-full md:max-w-[484px]"
                  data-session-id="a646262c-dafd-495c-b5f2-146fefad0df1"
                  data-topic='["88574f1d-9051-4f14-9c60-f83160bcd560"]'
                  data-level='["e351b55e-b8ab-4b3c-aff9-cee0d294ea29"]'
                  data-type='["keynote-filter"]'
                  data-stack='["14574666-1892-4a0e-b305-44d6e3f66c56"]'
                  style={{ display: "block" }}
                >
                  <div className="w-full ">
                    <a
                      href="/explore/a646262c-dafd-495c-b5f2-146fefad0df1/"
                      onClick={(event) => {
                        trackEvent("session_select", {
                          sessionName: `What's new in Google AI`,
                          sessionCode: `IO24_PAKEY_LIVE_003`,
                          sessionId: `a646262c-dafd-495c-b5f2-146fefad0df1`,
                        });
                      }}
                      className="focus:outline-none card-link"
                    >
                      <div className="w-full aspect-w-16 aspect-h-9 relative mb-5">
                        <img
                          loading="lazy"
                          role="img"
                          aria-hidden="true"
                          className="absolute h-full w-full object-cover"
                          src="https://web.archive.org/web/20240427125258im_/https://io.google/2024/data/im/a646262c-dafd-495c-b5f2-146fefad0df1.webp"
                        />
                      </div>
                      <div className="mb-4 md:min-h-[136px] body-outlined">
                        <div className="font-medium! sm:s-p1 md:l-h6 mt-2">
                          What's new in Google AI
                        </div>
                        <p className="mt-2 sm:s-p2">
                          Discover Google's latest AI tools in action and learn
                          about the Gemini API, Google AI Studio, Gemma, and
                          more.
                        </p>
                      </div>
                    </a>
                    <div className="flex mt-auto justify-between">
                      <div className="card__keywords">
                        <p className="sr-only">Session tags</p>
                        <span className="">
                          <div className="">
                            <span>Beginner</span>
                          </div>
                        </span>
                        <span className="">
                          <div className="">
                            <span>Keynote</span>
                          </div>
                        </span>
                      </div>
                      <div className="flex flex-1 justify-end gap-2 items-center">
                        <div
                          className="r-bookmark"
                          data-bm-session-id="a646262c-dafd-495c-b5f2-146fefad0df1"
                          data-session-path=""
                          data-session-code="IO24_PAKEY_LIVE_003"
                          data-disable-dark-mode="False"
                          data-white-spinner=""
                          data-myio-label=""
                          data-label-position=""
                          data-title="What's new in Google AI"
                          data-category=""
                          data-force-white-color=""
                          data-label-style={{ sm: "s-cta1 md:l-cta2" }}
                        >
                          <button
                            type="button"
                            className="flex items-center"
                            aria-label="Bookmark this session"
                          >
                            <span className="flex justify-center items-center w-6 h-6">
                              <svg
                                width="16"
                                height="20"
                                viewBox="0 0 16 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="forced-white-color   "
                              >
                                <path
                                  d="M1 1v18l6.079-4.5 7.184 4.5V1H1Z"
                                  stroke="#000000"
                                  stroke-width="1.5"
                                  stroke-linejoin="round"
                                  className="hcm-link-text-stroke  black dark:stroke-grey-bg"
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  role="listitem"
                  className="session w-full md:max-w-[484px]"
                  data-session-id="9986e95b-c506-40f1-b233-54f7e7092fdb"
                  data-topic='["088d506d-5c55-4b15-9b95-0be49b939c2a", "d73701c9-6652-4f18-a628-5237920e7415"]'
                  data-level='["a0d5636a-51e6-4cd8-a809-85aa7a67d8d3"]'
                  data-type='["keynote-filter"]'
                  data-stack='["b31f8e49-c3ba-438e-a7e1-589b4da62640"]'
                  style={{ display: "block" }}
                >
                  <div className="w-full ">
                    <a
                      href="/explore/9986e95b-c506-40f1-b233-54f7e7092fdb/"
                      onClick={(event) => {
                        trackEvent("session_select", {
                          sessionName: `What's new in Android development tools`,
                          sessionCode: `IO24_TS_LIVE_065`,
                          sessionId: `9986e95b-c506-40f1-b233-54f7e7092fdb`,
                        });
                      }}
                      className="focus:outline-none card-link"
                    >
                      <div className="w-full aspect-w-16 aspect-h-9 relative mb-5">
                        <img
                          loading="lazy"
                          role="img"
                          aria-hidden="true"
                          className="absolute h-full w-full object-cover"
                          src="https://web.archive.org/web/20240427125258im_/https://io.google/2024/data/im/9986e95b-c506-40f1-b233-54f7e7092fdb.webp"
                        />
                      </div>
                      <div className="mb-4 md:min-h-[136px] body-outlined">
                        <div className="font-medium! sm:s-p1 md:l-h6 mt-2">
                          What's new in Android development tools
                        </div>
                        <p className="mt-2 sm:s-p2">
                          Learn about Android developer tool updates to enhance
                          workflow with Android APIs.
                        </p>
                      </div>
                    </a>
                    <div className="flex mt-auto justify-between">
                      <div className="card__keywords">
                        <p className="sr-only">Session tags</p>
                        <span className="">
                          <div className="">
                            <span>Intermediate</span>
                          </div>
                        </span>
                        <span className="">
                          <div className="">
                            <div
                              className="h-translated-category"
                              data-name="Android"
                              data-speaker=""
                            >
                              <span>Android</span>
                            </div>
                          </div>
                        </span>
                        <span className="">
                          <span>+ 2 more</span>
                        </span>
                      </div>
                      <div className="flex flex-1 justify-end gap-2 items-center">
                        <div
                          className="r-bookmark"
                          data-bm-session-id="9986e95b-c506-40f1-b233-54f7e7092fdb"
                          data-session-path=""
                          data-session-code="IO24_TS_LIVE_065"
                          data-disable-dark-mode="False"
                          data-white-spinner=""
                          data-myio-label=""
                          data-label-position=""
                          data-title="What's new in Android development tools"
                          data-category=""
                          data-force-white-color=""
                          data-label-style={{ sm: "s-cta1 md:l-cta2" }}
                        >
                          <button
                            type="button"
                            className="flex items-center"
                            aria-label="Bookmark this session"
                          >
                            <span className="flex justify-center items-center w-6 h-6">
                              <svg
                                width="16"
                                height="20"
                                viewBox="0 0 16 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="forced-white-color   "
                              >
                                <path
                                  d="M1 1v18l6.079-4.5 7.184 4.5V1H1Z"
                                  stroke="#000000"
                                  stroke-width="1.5"
                                  stroke-linejoin="round"
                                  className="hcm-link-text-stroke  black dark:stroke-grey-bg"
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  role="listitem"
                  className="session w-full md:max-w-[484px]"
                  data-session-id="8c3a958c-52f6-4c07-8798-897b260c177c"
                  data-topic='["d73701c9-6652-4f18-a628-5237920e7415"]'
                  data-level='["a0d5636a-51e6-4cd8-a809-85aa7a67d8d3"]'
                  data-type='["keynote-filter"]'
                  data-stack='["b31f8e49-c3ba-438e-a7e1-589b4da62640"]'
                  style={{ display: "block" }}
                >
                  <div className="w-full ">
                    <a
                      href="/explore/8c3a958c-52f6-4c07-8798-897b260c177c/"
                      onClick={(event) => {
                        trackEvent("session_select", {
                          sessionName: `What's new in Firebase for building gen AI features`,
                          sessionCode: `IO24_TS_LIVE_077`,
                          sessionId: `8c3a958c-52f6-4c07-8798-897b260c177c`,
                        });
                      }}
                      className="focus:outline-none card-link"
                    >
                      <div className="w-full aspect-w-16 aspect-h-9 relative mb-5">
                        <img
                          loading="lazy"
                          role="img"
                          aria-hidden="true"
                          className="absolute h-full w-full object-cover"
                          src="https://web.archive.org/web/20240427125258im_/https://io.google/2024/data/im/8c3a958c-52f6-4c07-8798-897b260c177c.webp"
                        />
                      </div>
                      <div className="mb-4 md:min-h-[136px] body-outlined">
                        <div className="font-medium! sm:s-p1 md:l-h6 mt-2">
                          What's new in Firebase for building gen AI features
                        </div>
                        <p className="mt-2 sm:s-p2">
                          Learn how Firebase is evolving to help you harness the
                          power of generative AI to build modern, dynamic apps
                          users love.
                        </p>
                      </div>
                    </a>
                    <div className="flex mt-auto justify-between">
                      <div className="card__keywords">
                        <p className="sr-only">Session tags</p>
                        <span className="">
                          <div className="">
                            <span>Intermediate</span>
                          </div>
                        </span>
                        <span className="">
                          <div className="">
                            <div
                              className="h-translated-category"
                              data-name="Firebase"
                              data-speaker=""
                            >
                              <span>Firebase</span>
                            </div>
                          </div>
                        </span>
                        <span className="">
                          <div className="">
                            <span>Keynote</span>
                          </div>
                        </span>
                      </div>
                      <div className="flex flex-1 justify-end gap-2 items-center">
                        <div
                          className="r-bookmark"
                          data-bm-session-id="8c3a958c-52f6-4c07-8798-897b260c177c"
                          data-session-path=""
                          data-session-code="IO24_TS_LIVE_077"
                          data-disable-dark-mode="False"
                          data-white-spinner=""
                          data-myio-label=""
                          data-label-position=""
                          data-title="What's new in Firebase for building gen AI features"
                          data-category=""
                          data-force-white-color=""
                          data-label-style={{ sm: "s-cta1 md:l-cta2" }}
                        >
                          <button
                            type="button"
                            className="flex items-center"
                            aria-label="Bookmark this session"
                          >
                            <span className="flex justify-center items-center w-6 h-6">
                              <svg
                                width="16"
                                height="20"
                                viewBox="0 0 16 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="forced-white-color   "
                              >
                                <path
                                  d="M1 1v18l6.079-4.5 7.184 4.5V1H1Z"
                                  stroke="#000000"
                                  stroke-width="1.5"
                                  stroke-linejoin="round"
                                  className="hcm-link-text-stroke  black dark:stroke-grey-bg"
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  role="listitem"
                  className="session w-full md:max-w-[484px]"
                  data-session-id="c6185b55-88e6-4b47-b31c-5b1f758a16a7"
                  data-topic='["503cdf28-8e62-4751-b10e-d9fe5499e10a"]'
                  data-level='["e351b55e-b8ab-4b3c-aff9-cee0d294ea29"]'
                  data-type='["keynote-filter"]'
                  data-stack='["b31f8e49-c3ba-438e-a7e1-589b4da62640"]'
                  style={{ display: "block" }}
                >
                  <div className="w-full ">
                    <a
                      href="/explore/c6185b55-88e6-4b47-b31c-5b1f758a16a7/"
                      onClick={(event) => {
                        trackEvent("session_select", {
                          sessionName: `What's new in Google Play`,
                          sessionCode: `IO24_PAKEY_LIVE_005`,
                          sessionId: `c6185b55-88e6-4b47-b31c-5b1f758a16a7`,
                        });
                      }}
                      className="focus:outline-none card-link"
                    >
                      <div className="w-full aspect-w-16 aspect-h-9 relative mb-5">
                        <img
                          loading="lazy"
                          role="img"
                          aria-hidden="true"
                          className="absolute h-full w-full object-cover"
                          src="https://web.archive.org/web/20240427125258im_/https://io.google/2024/data/im/c6185b55-88e6-4b47-b31c-5b1f758a16a7.webp"
                        />
                      </div>
                      <div className="mb-4 md:min-h-[136px] body-outlined">
                        <div className="font-medium! sm:s-p1 md:l-h6 mt-2">
                          What's new in Google Play
                        </div>
                        <p className="mt-2 sm:s-p2">
                          Learn how to grow your business on Google Play with
                          the latest tools and updates.
                        </p>
                      </div>
                    </a>
                    <div className="flex mt-auto justify-between">
                      <div className="card__keywords">
                        <p className="sr-only">Session tags</p>
                        <span className="">
                          <div className="">
                            <span>Beginner</span>
                          </div>
                        </span>
                        <span className="">
                          <div className="">
                            <div
                              className="h-translated-category"
                              data-name="Google Play"
                              data-speaker=""
                            >
                              <span>Google Play </span>
                            </div>
                          </div>
                        </span>
                        <span className="">
                          <div className="">
                            <span>Keynote</span>
                          </div>
                        </span>
                      </div>
                      <div className="flex flex-1 justify-end gap-2 items-center">
                        <div
                          className="r-bookmark"
                          data-bm-session-id="c6185b55-88e6-4b47-b31c-5b1f758a16a7"
                          data-session-path=""
                          data-session-code="IO24_PAKEY_LIVE_005"
                          data-disable-dark-mode="False"
                          data-white-spinner=""
                          data-myio-label=""
                          data-label-position=""
                          data-title="What's new in Google Play"
                          data-category=""
                          data-force-white-color=""
                          data-label-style={{ sm: "s-cta1 md:l-cta2" }}
                        >
                          <button
                            type="button"
                            className="flex items-center"
                            aria-label="Bookmark this session"
                          >
                            <span className="flex justify-center items-center w-6 h-6">
                              <svg
                                width="16"
                                height="20"
                                viewBox="0 0 16 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="forced-white-color   "
                              >
                                <path
                                  d="M1 1v18l6.079-4.5 7.184 4.5V1H1Z"
                                  stroke="#000000"
                                  stroke-width="1.5"
                                  stroke-linejoin="round"
                                  className="hcm-link-text-stroke  black dark:stroke-grey-bg"
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  role="listitem"
                  className="session w-full md:max-w-[484px]"
                  data-session-id="a4da7132-3f33-4723-8bb4-5989011dca7c"
                  data-topic='["88574f1d-9051-4f14-9c60-f83160bcd560"]'
                  data-level='["a0d5636a-51e6-4cd8-a809-85aa7a67d8d3"]'
                  data-type='["98b75245-0ae8-4524-9272-760afbbd1458"]'
                  data-stack='["14574666-1892-4a0e-b305-44d6e3f66c56"]'
                  style={{ display: "block" }}
                >
                  <div className="w-full ">
                    <a
                      href="/explore/a4da7132-3f33-4723-8bb4-5989011dca7c/"
                      onClick={(event) => {
                        trackEvent("session_select", {
                          sessionName: `Visual Blocks: Bring AI ideas to life with custom nodes for your APIs`,
                          sessionCode: `IO24_WS_LIVE_098`,
                          sessionId: `a4da7132-3f33-4723-8bb4-5989011dca7c`,
                        });
                      }}
                      className="focus:outline-none card-link"
                    >
                      <div className="w-full aspect-w-16 aspect-h-9 relative mb-5">
                        <img
                          loading="lazy"
                          role="img"
                          aria-hidden="true"
                          className="absolute h-full w-full object-cover"
                          src="https://web.archive.org/web/20240427125258im_/https://io.google/2024/data/im/a4da7132-3f33-4723-8bb4-5989011dca7c.webp"
                        />
                      </div>
                      <div className="mb-4 md:min-h-[136px] body-outlined">
                        <div className="font-medium! sm:s-p1 md:l-h6 mt-2">
                          Visual Blocks: Bring AI ideas to life with custom
                          nodes for your APIs
                        </div>
                        <p className="mt-2 sm:s-p2">
                          Learn how to make your own custom nodes in our no-code
                          framework, Visual Blocks, and go from idea to
                          prototype faster.
                        </p>
                      </div>
                    </a>
                    <div className="flex mt-auto justify-between">
                      <div className="card__keywords">
                        <p className="sr-only">Session tags</p>
                        <span className="">
                          <div className="">
                            <span>Intermediate</span>
                          </div>
                        </span>
                        <span className="">
                          <div className="">
                            <span>Workshop</span>
                          </div>
                        </span>
                      </div>
                      <div className="flex flex-1 justify-end gap-2 items-center">
                        <div
                          className="r-bookmark"
                          data-bm-session-id="a4da7132-3f33-4723-8bb4-5989011dca7c"
                          data-session-path=""
                          data-session-code="IO24_WS_LIVE_098"
                          data-disable-dark-mode="False"
                          data-white-spinner=""
                          data-myio-label=""
                          data-label-position=""
                          data-title="Visual Blocks: Bring AI ideas to life with custom nodes for your APIs"
                          data-category=""
                          data-force-white-color=""
                          data-label-style={{ sm: "s-cta1 md:l-cta2" }}
                        >
                          <div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  role="listitem"
                  className="session w-full md:max-w-[484px]"
                  data-session-id="21b9116b-3c75-41bf-91c7-ffcaf2163970"
                  data-topic='["ad532883-dda3-4066-aa6f-1f858968915d"]'
                  data-level='["a0d5636a-51e6-4cd8-a809-85aa7a67d8d3"]'
                  data-type='["98b75245-0ae8-4524-9272-760afbbd1458"]'
                  data-stack='["622b18d9-a6c2-4d31-b506-a2d58e034186"]'
                  style={{ display: "block" }}
                >
                  <div className="w-full ">
                    <a
                      href="/explore/21b9116b-3c75-41bf-91c7-ffcaf2163970/"
                      onClick={(event) => {
                        trackEvent("session_select", {
                          sessionName: `How to deploy all the JavaScript frameworks to Cloud Run`,
                          sessionCode: `IO24_WS_LIVE_097`,
                          sessionId: `21b9116b-3c75-41bf-91c7-ffcaf2163970`,
                        });
                      }}
                      className="focus:outline-none card-link"
                    >
                      <div className="w-full aspect-w-16 aspect-h-9 relative mb-5">
                        <img
                          loading="lazy"
                          role="img"
                          aria-hidden="true"
                          className="absolute h-full w-full object-cover"
                          src="https://web.archive.org/web/20240427125258im_/https://io.google/2024/data/im/21b9116b-3c75-41bf-91c7-ffcaf2163970.webp"
                        />
                      </div>
                      <div className="mb-4 md:min-h-[136px] body-outlined">
                        <div className="font-medium! sm:s-p1 md:l-h6 mt-2">
                          How to deploy all the JavaScript frameworks to Cloud
                          Run
                        </div>
                        <p className="mt-2 sm:s-p2">
                          Can I deploy [JavaScript framework] to Google Cloud
                          Run? Yes. Let's prove it by deploying as many as we
                          can.
                        </p>
                      </div>
                    </a>
                    <div className="flex mt-auto justify-between">
                      <div className="card__keywords">
                        <p className="sr-only">Session tags</p>
                        <span className="">
                          <div className="">
                            <span>Intermediate</span>
                          </div>
                        </span>
                        <span className="">
                          <div className="">
                            <div
                              className="h-translated-category"
                              data-name="Cloud"
                              data-speaker=""
                            >
                              <span>Cloud</span>
                            </div>
                          </div>
                        </span>
                        <span className="">
                          <div className="">
                            <span>Workshop</span>
                          </div>
                        </span>
                      </div>
                      <div className="flex flex-1 justify-end gap-2 items-center">
                        <div
                          className="r-bookmark"
                          data-bm-session-id="21b9116b-3c75-41bf-91c7-ffcaf2163970"
                          data-session-path=""
                          data-session-code="IO24_WS_LIVE_097"
                          data-disable-dark-mode="False"
                          data-white-spinner=""
                          data-myio-label=""
                          data-label-position=""
                          data-title="How to deploy all the JavaScript frameworks to Cloud Run"
                          data-category=""
                          data-force-white-color=""
                          data-label-style={{ sm: "s-cta1 md:l-cta2" }}
                        >
                          <div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="h-filter-menu"
              data-learning-content="False"
              data-learninglab=""
            >
              <div
                data-focus-guard=""
                tabIndex={-1}
                style={{
                  width: "1px",
                  height: "0px",
                  padding: "0px",
                  overflow: "hidden",
                  position: "fixed",
                  top: "1px",
                  left: "1px",
                }}
              ></div>
              <div data-focus-lock-disabled="disabled">
                <div className="block lg:hidden w-full">
                  <div className="ml-5 md:ml-0 flex">
                    <div
                      id="filter-drawer"
                      className={`drawer-nav rounded-r-2xl relative border-2 border-solid border-grey-900 ${!isFilterDrawerOpen ? "visually-hidden" : ""}`}
                      role="dialog"
                      aria-modal="true"
                      aria-label="filter menu"
                    >
                      <div
                        role="alert"
                        aria-live="polite"
                        className="visually-hidden"
                      >
                        99 Results
                      </div>
                      <button
                        type="button"
                        aria-label="Exit"
                        className="absolute right-1.5 top-1.5 z-50 p-3"
                        onClick={() => setIsFilterDrawerOpen(false)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 18 18"
                          className="fill-current text-grey-900 w-6 h-6 dark:text-grey-200"
                        >
                          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                        </svg>
                      </button>
                      <div className="stack-filters-container">
                        <h3
                          id="stack-filters"
                          className="sm:l-cta1 ml-5 font-medium block mt-5"
                        >
                          Focus
                        </h3>
                        <ul
                          role="list"
                          aria-labelledby="stack-filters"
                          aria-label=""
                          className="filter-box__items p-0"
                        >
                          <li role="listitem" className="filter-box__item ml-0">
                            <input
                              id="mb31f8e49-c3ba-438e-a7e1-589b4da62640"
                              type="checkbox"
                              data-mobile-classification="b31f8e49-c3ba-438e-a7e1-589b4da62640"
                              aria-label="Mobile"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="mb31f8e49-c3ba-438e-a7e1-589b4da62640"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              Mobile
                            </label>
                          </li>
                          <li role="listitem" className="filter-box__item ml-0">
                            <input
                              id="m13eba1ea-1c78-47b8-86ef-c7808d2507db"
                              type="checkbox"
                              data-mobile-classification="13eba1ea-1c78-47b8-86ef-c7808d2507db"
                              aria-label="Web"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="m13eba1ea-1c78-47b8-86ef-c7808d2507db"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              Web
                            </label>
                          </li>
                          <li role="listitem" className="filter-box__item ml-0">
                            <input
                              id="m14574666-1892-4a0e-b305-44d6e3f66c56"
                              type="checkbox"
                              data-mobile-classification="14574666-1892-4a0e-b305-44d6e3f66c56"
                              aria-label="AI"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="m14574666-1892-4a0e-b305-44d6e3f66c56"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              AI
                            </label>
                          </li>
                          <li role="listitem" className="filter-box__item ml-0">
                            <input
                              id="m622b18d9-a6c2-4d31-b506-a2d58e034186"
                              type="checkbox"
                              data-mobile-classification="622b18d9-a6c2-4d31-b506-a2d58e034186"
                              aria-label="Cloud"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="m622b18d9-a6c2-4d31-b506-a2d58e034186"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              Cloud
                            </label>
                          </li>
                        </ul>
                      </div>
                      <div className="topic-filters-container">
                        <h3
                          id="topic-filters"
                          className="sm:l-cta1 ml-5 font-medium block mt-5"
                        >
                          Topics
                        </h3>
                        <ul
                          id="topic-list-container"
                          role="list"
                          aria-labelledby="topic-filters"
                          aria-label=""
                          className="filter-box__items p-0"
                        >
                          <li role="listitem" className="filter-box__item ml-0">
                            <input
                              id="m8f5b3990-4b88-45c9-943c-e05531de0f73"
                              type="checkbox"
                              data-mobile-classification="8f5b3990-4b88-45c9-943c-e05531de0f73"
                              aria-label="Accessibility"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="m8f5b3990-4b88-45c9-943c-e05531de0f73"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              <span>Accessibility</span>
                            </label>
                          </li>
                          <li role="listitem" className="filter-box__item ml-0">
                            <input
                              id="m88574f1d-9051-4f14-9c60-f83160bcd560"
                              type="checkbox"
                              data-mobile-classification="88574f1d-9051-4f14-9c60-f83160bcd560"
                              aria-label="AI &amp; Machine Learning"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="m88574f1d-9051-4f14-9c60-f83160bcd560"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              <span>AI &amp; Machine Learning</span>
                            </label>
                          </li>
                          <li role="listitem" className="filter-box__item ml-0">
                            <input
                              id="m088d506d-5c55-4b15-9b95-0be49b939c2a"
                              type="checkbox"
                              data-mobile-classification="088d506d-5c55-4b15-9b95-0be49b939c2a"
                              aria-label="Android"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="m088d506d-5c55-4b15-9b95-0be49b939c2a"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              <span>Android</span>
                            </label>
                          </li>
                          <li role="listitem" className="filter-box__item ml-0">
                            <input
                              id="ma349f842-4793-437a-952f-645f2e601c5f"
                              type="checkbox"
                              data-mobile-classification="a349f842-4793-437a-952f-645f2e601c5f"
                              aria-label="Angular"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="ma349f842-4793-437a-952f-645f2e601c5f"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              <span>Angular</span>
                            </label>
                          </li>
                          <li role="listitem" className="filter-box__item ml-0">
                            <input
                              id="m2610ec1e-3784-48bf-9b7f-a9665f8c5cb6"
                              type="checkbox"
                              data-mobile-classification="2610ec1e-3784-48bf-9b7f-a9665f8c5cb6"
                              aria-label="AR/VR"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="m2610ec1e-3784-48bf-9b7f-a9665f8c5cb6"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              <span>AR/VR</span>
                            </label>
                          </li>
                          <li role="listitem" className="filter-box__item ml-0">
                            <input
                              id="m404f9e90-5aa9-41a2-9751-372aa824b8fd"
                              type="checkbox"
                              data-mobile-classification="404f9e90-5aa9-41a2-9751-372aa824b8fd"
                              aria-label="ChromeOS"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="m404f9e90-5aa9-41a2-9751-372aa824b8fd"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              <span>ChromeOS</span>
                            </label>
                          </li>
                          <li role="listitem" className="filter-box__item ml-0">
                            <input
                              id="mad532883-dda3-4066-aa6f-1f858968915d"
                              type="checkbox"
                              data-mobile-classification="ad532883-dda3-4066-aa6f-1f858968915d"
                              aria-label="Cloud"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="mad532883-dda3-4066-aa6f-1f858968915d"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              <span>Cloud</span>
                            </label>
                          </li>
                          <li role="listitem" className="filter-box__item ml-0">
                            <input
                              id="m1177d688-c358-4598-a88e-86fe69f2cfb7"
                              type="checkbox"
                              data-mobile-classification="1177d688-c358-4598-a88e-86fe69f2cfb7"
                              aria-label="Design"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="m1177d688-c358-4598-a88e-86fe69f2cfb7"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              <span>Design</span>
                            </label>
                          </li>
                          <li role="listitem" className="filter-box__item ml-0">
                            <input
                              id="md73701c9-6652-4f18-a628-5237920e7415"
                              type="checkbox"
                              data-mobile-classification="d73701c9-6652-4f18-a628-5237920e7415"
                              aria-label="Firebase"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="md73701c9-6652-4f18-a628-5237920e7415"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              <span>Firebase</span>
                            </label>
                          </li>
                          <li
                            role="listitem"
                            className="filter-box__item ml-0"
                            style={{ display: "none" }}
                          >
                            <input
                              id="m5fb7f0e0-a6d3-44e5-8e21-d703ef0333a3"
                              type="checkbox"
                              data-mobile-classification="5fb7f0e0-a6d3-44e5-8e21-d703ef0333a3"
                              aria-label="Flutter"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="m5fb7f0e0-a6d3-44e5-8e21-d703ef0333a3"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              <span>Flutter</span>
                            </label>
                          </li>
                          <li
                            role="listitem"
                            className="filter-box__item ml-0"
                            style={{ display: "none" }}
                          >
                            <input
                              id="ma4e28745-3a67-4bbd-820d-36886497c07c"
                              type="checkbox"
                              data-mobile-classification="a4e28745-3a67-4bbd-820d-36886497c07c"
                              aria-label="Go"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="ma4e28745-3a67-4bbd-820d-36886497c07c"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              <span>Go</span>
                            </label>
                          </li>
                          <li
                            role="listitem"
                            className="filter-box__item ml-0"
                            style={{ display: "none" }}
                          >
                            <input
                              id="m503cdf28-8e62-4751-b10e-d9fe5499e10a"
                              type="checkbox"
                              data-mobile-classification="503cdf28-8e62-4751-b10e-d9fe5499e10a"
                              aria-label="Google Play"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="m503cdf28-8e62-4751-b10e-d9fe5499e10a"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              <span>Google Play</span>
                            </label>
                          </li>
                          <li
                            role="listitem"
                            className="filter-box__item ml-0"
                            style={{ display: "none" }}
                          >
                            <input
                              id="m700fed55-dc35-40c0-976b-788a66f332ed"
                              type="checkbox"
                              data-mobile-classification="700fed55-dc35-40c0-976b-788a66f332ed"
                              aria-label="Location/Maps"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="m700fed55-dc35-40c0-976b-788a66f332ed"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              <span>Location/Maps</span>
                            </label>
                          </li>
                          <li
                            role="listitem"
                            className="filter-box__item ml-0"
                            style={{ display: "none" }}
                          >
                            <input
                              id="m1232df61-7b3a-4efa-89be-b26714c3d6e4"
                              type="checkbox"
                              data-mobile-classification="1232df61-7b3a-4efa-89be-b26714c3d6e4"
                              aria-label="Smart Home"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="m1232df61-7b3a-4efa-89be-b26714c3d6e4"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              <span>Smart Home</span>
                            </label>
                          </li>
                          <li
                            role="listitem"
                            className="filter-box__item ml-0"
                            style={{ display: "none" }}
                          >
                            <input
                              id="md52ff67c-f7fe-463d-a978-3fcaf989fb21"
                              type="checkbox"
                              data-mobile-classification="d52ff67c-f7fe-463d-a978-3fcaf989fb21"
                              aria-label="Wear OS"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="md52ff67c-f7fe-463d-a978-3fcaf989fb21"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              <span>Wear OS</span>
                            </label>
                          </li>
                          <li
                            role="listitem"
                            className="filter-box__item ml-0"
                            style={{ display: "none" }}
                          >
                            <input
                              id="mf753bf55-c398-4f4a-941b-329b296bd287"
                              type="checkbox"
                              data-mobile-classification="f753bf55-c398-4f4a-941b-329b296bd287"
                              aria-label="Web"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="mf753bf55-c398-4f4a-941b-329b296bd287"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              <span>Web</span>
                            </label>
                          </li>
                        </ul>
                        <button
                          aria-controls="topic-list-container"
                          aria-expanded="false"
                          aria-label=""
                          className="flex items-center ml-5 mb-5"
                        >
                          <svg
                            style={{ transform: "unset" }}
                            aria-hidden="true"
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="chevron fill-grey-900 dark:fill-grey-200 forced-white-color"
                          >
                            <path d="M17.363 8.58a.75.75 0 1 1 1.05 1.07l-5.745 5.62a1 1 0 0 1-1.555 0l-5.75-5.62a.75.75 0 0 1 1.05-1.07l5.5 5.354 5.45-5.354Z"></path>
                          </svg>
                          <span className="more ml-4 sm:l-cta2 text-blue font-medium">
                            <span className="sr-only">Show more topics</span>
                            <span aria-hidden="true">More</span>
                          </span>
                        </button>
                      </div>
                      <div className="type-filters-container">
                        <h3
                          id="type-filters"
                          className="sm:l-cta1 ml-5 font-medium block mt-5"
                        >
                          Content type
                        </h3>
                        <ul
                          id="type-list-container"
                          role="list"
                          aria-labelledby="type-filters"
                          aria-label=""
                          className="filter-box__items p-0"
                        >
                          <li role="listitem" className="filter-box__item ml-0">
                            <input
                              id="mkeynote-filter"
                              type="checkbox"
                              data-mobile-classification="keynote-filter"
                              aria-label="Keynote"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="mkeynote-filter"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              Keynote
                            </label>
                          </li>
                          <li role="listitem" className="filter-box__item ml-0">
                            <input
                              id="m71b9babb-77d8-4a81-b8b3-8d9d7d71081e"
                              type="checkbox"
                              data-mobile-classification="71b9babb-77d8-4a81-b8b3-8d9d7d71081e"
                              aria-label="Technical session"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="m71b9babb-77d8-4a81-b8b3-8d9d7d71081e"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              Technical session
                            </label>
                          </li>
                          <li role="listitem" className="filter-box__item ml-0">
                            <input
                              id="m98b75245-0ae8-4524-9272-760afbbd1458"
                              type="checkbox"
                              data-mobile-classification="98b75245-0ae8-4524-9272-760afbbd1458"
                              aria-label="Workshop"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="m98b75245-0ae8-4524-9272-760afbbd1458"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              Workshop
                            </label>
                          </li>
                        </ul>
                      </div>
                      <div className="level-filters-container">
                        <h3
                          id="level-filters"
                          className="sm:l-cta1 ml-5 font-medium block mt-5"
                        >
                          Level
                        </h3>
                        <ul
                          id="level-list-container"
                          role="list"
                          aria-labelledby="level-filters"
                          aria-label=""
                          className="filter-box__items p-0"
                        >
                          <li role="listitem" className="filter-box__item ml-0">
                            <input
                              id="me351b55e-b8ab-4b3c-aff9-cee0d294ea29"
                              type="checkbox"
                              data-mobile-classification="e351b55e-b8ab-4b3c-aff9-cee0d294ea29"
                              aria-label="Beginner"
                              className="checkbox"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="me351b55e-b8ab-4b3c-aff9-cee0d294ea29"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              Beginner
                            </label>
                          </li>
                          <li role="listitem" className="filter-box__item ml-0">
                            <input
                              id="ma0d5636a-51e6-4cd8-a809-85aa7a67d8d3"
                              type="checkbox"
                              data-mobile-classification="a0d5636a-51e6-4cd8-a809-85aa7a67d8d3"
                              aria-label="Intermediate"
                              className="border-2 border-black! text-gray-900 dark:border-white! hcm-border-highlight dark:bg-black leading-tight h-5 w-5 rounded focus:outline-none focus:ring-blue mt-[2px]"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="ma0d5636a-51e6-4cd8-a809-85aa7a67d8d3"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              Intermediate
                            </label>
                          </li>
                          <li role="listitem" className="filter-box__item ml-0">
                            <input
                              id="m46f60ade-f383-4563-9396-b2855a2f0c68"
                              type="checkbox"
                              data-mobile-classification="46f60ade-f383-4563-9396-b2855a2f0c68"
                              aria-label="Advanced"
                              className="border-2 border-black! text-gray-900 dark:border-white! hcm-border-highlight dark:bg-black leading-tight h-5 w-5 rounded focus:outline-none focus:ring-blue mt-[2px]"
                            />
                            <label
                              aria-hidden="true"
                              htmlFor="m46f60ade-f383-4563-9396-b2855a2f0c68"
                              className="sm:l-cta2 font-medium ml-2.5 dark:text-grey-200"
                            >
                              Advanced
                            </label>
                          </li>
                        </ul>
                      </div>
                      <button className="visually-hidden">
                        Exit filter menu
                      </button>
                    </div>
                    <div className="drawer-mask visually-hidden"></div>
                  </div>
                </div>
              </div>
              <div
                data-focus-guard=""
                tabIndex={-1}
                style={{
                  width: "1px",
                  height: "0px",
                  padding: "0px",
                  overflow: "hidden",
                  position: "fixed",
                  top: "1px",
                  left: "1px",
                }}
              ></div>
            </div>
            <script
              dangerouslySetInnerHTML={{
                __html: `
        (function() {
            const toggles = Array.from(document.querySelectorAll('.filter-box__header'));
            for (const el of toggles) {
                // check if toggle has filters active.
                const checkboxes = Array.from(el.querySelectorAll('[data-classification]'));
                el.addEventListener('click', (event) => {
                    if (event.currentTarget.parentNode instanceof HTMLElement) {
                        const toggleButton = event.currentTarget,
                        chevron = toggleButton.querySelector('.filter-box__chevron'),
                        dropdown = toggleButton.nextElementSibling,
                        isHidden = dropdown.classList.contains('hide');
                        if (isHidden) {
                            dropdown.classList.remove('hide');
                            toggleButton.classList.add('border-b-2', 'border-gray-900');
                            chevron.classList.remove('transform', '-scale-y-100');
                        } else {
                            dropdown.classList.add('hide')
                            toggleButton.classList.remove('border-b-2', 'border-gray-900');
                            chevron.classList.add('transform', '-scale-y-100');
                        }
                        toggleButton.setAttribute('aria-expanded', isHidden);
                    }
                });
            }
            window.filtersLoaded = false;
            document.addEventListener('filters_loaded', () => {
                const toggles = Array.from(document.querySelectorAll('.filter-box__chevron'));
                let filtersToCheck = toggles.length;
                for (const el of toggles) {
                    let shouldOpen = false;
                    dropdown = el.parentElement.nextElementSibling;
                    checkboxes = Array.from(dropdown.querySelectorAll('[data-classification]'));
                    for (const checkbox of checkboxes) {
                        if (checkbox.checked) {
                            shouldOpen = true;
                        }
                    }
                    // make sure the button isn't already open also.
                    if (shouldOpen) {
                        el.click();
                    } else {
                        filtersToCheck--;
                    }
                }
                if (filtersToCheck === 0) {
                    toggles[0].click();
                }
                window.filtersLoaded = true;
            })
        })();
    `,
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
