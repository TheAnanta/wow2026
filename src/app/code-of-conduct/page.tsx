"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

const SECTION_IDS = [
  "coc-intro",
  "coc-nice",
  "coc-respectful",
  "coc-collaborative",
  "coc-participate",
  "coc-online",
  "coc-opportunities",
];

export default function CodeOfConductPage() {
  const [activeSection, setActiveSection] = useState("coc-intro");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const pills = [
    { id: "coc-intro", label: "Introduction" },
    { id: "coc-nice", label: "Be nice" },
    { id: "coc-respectful", label: "Be respectful" },
    { id: "coc-collaborative", label: "Be collaborative" },
    { id: "coc-participate", label: "Participate" },
    { id: "coc-online", label: "Online etiquette" },
    { id: "coc-opportunities", label: "Opportunities" },
  ];

  return (
    <div className="dark:bg-grey-900! min-h-screen flex flex-col font-sans text-[#202124] dark:text-white bg-white">
      <Header onRegisterClick={() => { }} />

      <main id="content" className="dark:bg-grey-900! flex-1">
        {/* Hero Banner */}
        <div className="w-full flex flex-col md:flex-row md:h-[407px] overflow-hidden bg-grey-bg dark:bg-grey! border-b md:border-b-2 border-grey dark:border-grey-bg">
          <div className="flex flex-col md:text-left md:justify-center px-4 py-5 w-full md:w-2/5 md:p-10 md:pr-0 dark:text-white z-10">
            <h1 className="font-medium mb-4 sm:s-h2 md:l-h1">
              Code of Conduct
            </h1>
            <p className="font-medium sm:s-h6 md:l-h6 mb-4">
              All participants of GDGoC WOW AP 2025 event, attendees, event staff, and speakers, must abide by the following policy.
            </p>
          </div>
          <div className="flex items-end w-full md:w-3/5 justify-start! xl:justify-end! xl:pr-5">
            <img
              className="hidden md:inline-block h-full object-cover object-left dark:hidden md:max-h-[200px] text-md:max-h-[350px] -mb-[2px]"
              src="/images/io__-about-hero.webp"
              role="img"
              aria-hidden="true"
              fetchPriority="high"
              width="800"
              height="350"
              alt=""
            />
            <img
              className="hidden dark:md:inline-block h-full object-cover object-left md:max-h-[200px] text-md:max-h-[350px] -mb-[2px]"
              src="/images/io24-about-hero-dark.webp"
              role="img"
              aria-hidden="true"
              fetchPriority="high"
              width="800"
              height="350"
              alt=""
            />
            <img
              className="block md:hidden dark:hidden max-w-[90%]"
              src="/images/io24-about-hero-mobile.webp"
              role="img"
              aria-hidden="true"
              fetchPriority="high"
              width="800"
              height="350"
              alt=""
            />
            <img
              className="hidden dark:inline-block dark:md:hidden max-w-[90%]"
              src="/images/io24-about-hero-mobile-dark.webp"
              role="img"
              aria-hidden="true"
              fetchPriority="high"
              width="800"
              height="350"
              alt=""
            />
          </div>
        </div>

        {/* Content Layout */}
        <div className="w-full max-w-[1640px] mx-auto px-5 md:px-10 pt-4 md:pt-10 text-grey-900 dark:text-white flex flex-col">
          <div className="faq-container flex flex-row gap-12 mt-[60px]">

            {/* Left: Sticky Pills Nav */}
            <div className="faq-pills__container">
              <h2 className="font-medium mb-8 sm:l-h2 block faq-title__desktop text-grey-900 dark:text-white">
                Code of Conduct
              </h2>
              <div className="flex flex-col faq-pills">
                {pills.map((pill, i) => (
                  <button
                    key={pill.id}
                    onClick={() => scrollToSection(pill.id)}
                    className={`${i === pills.length - 1 ? "last-pill " : ""}faq-pill ${activeSection === pill.id ? "faq-pill__active" : ""}`}
                    style={{ borderRadius: "8px", minWidth: "fit-content" }}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Content sections */}
            <div className="flex-1 flex flex-col w-full max-w-xl mx-auto faq-sections">

              {/* Section 1 — Introduction */}
              <section id="coc-intro" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                  <div
                    className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                    style={{ background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)" }}
                  >
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Introduction</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 text-grey-900 dark:text-white">
                      <dd className="faq-entry">
                        <p className="mb-2">
                          All participants of GDGoC WOW AP 2025 event, attendees, event staff, and speakers, must abide by the following policy.
                        </p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 2 — Be nice */}
              <section id="coc-nice" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                  <div
                    className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                    style={{ background: "linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)" }}
                  >
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Be nice to the other attendees</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 text-grey-900 dark:text-white">
                      <dd className="faq-entry">
                        <p>
                          We're all part of the same community, so be friendly, welcoming, and generally a nice person. Be someone that other people want to be around.
                        </p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 3 — Be respectful */}
              <section id="coc-respectful" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                  <div
                    className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                    style={{ background: "linear-gradient(90deg, #FFCB32 -0.15%, #FFCB32 17.85%, #F46831 52.85%, #EA4335 78.85%, #EA4335 99.85%)" }}
                  >
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Be respectful and constructive</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 text-grey-900 dark:text-white">
                      <dd className="faq-entry">
                        <p>
                          Remember to be respectful and constructive with your communication in discussions to fellow attendees. Don't get into flame wars, make personal attacks, vent, or rant unconstructively. Everyone should take responsibility for the community and take the initiative to diffuse tension and stop a negative thread as early as possible.
                        </p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 4 — Be collaborative */}
              <section id="coc-collaborative" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                  <div
                    className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                    style={{ background: "linear-gradient(270.11deg, #5382EB 1.91%, #5382EB 25.69%, #9F6CD4 51.37%, #EA4335 79.9%, #EA4335 97.02%)" }}
                  >
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Be collaborative</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 text-grey-900 dark:text-white">
                      <dd className="faq-entry">
                        <p>
                          We are here to learn a lot from each other. Share knowledge, and help each other out. You may disagree with ideas, not people.
                        </p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 5 — Participate */}
              <section id="coc-participate" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                  <div
                    className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                    style={{ background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)" }}
                  >
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Participate</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 text-grey-900 dark:text-white">
                      <dd className="faq-entry">
                        <p>
                          Be a good listener. Be mentally present in the sessions you are interested in. Join in on discussions, show up for the sessions on time, offer feedback on your event experience, and help us get better in our community engagements.
                        </p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 6 — Online etiquette */}
              <section id="coc-online" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                  <div
                    className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                    style={{ background: "linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)" }}
                  >
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Basic etiquette for online discussions</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 text-grey-900 dark:text-white">
                      <dd className="faq-entry">
                        <p>
                          Keep off topic conversations to a minimum. Don’t be spammy by advertising or promoting personal projects which are off topic.
                        </p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 7 — Opportunities */}
              <section id="coc-opportunities">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                  <div
                    className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                    style={{ background: "linear-gradient(90deg, #FFCB32 -0.15%, #FFCB32 17.85%, #F46831 52.85%, #EA4335 78.85%, #EA4335 99.85%)" }}
                  >
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Opportunities</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 text-grey-900 dark:text-white">
                      <dd className="faq-entry">
                        <p>
                          GDG Vizag is not responsible for any job opportunities, internships, collaborations, freelance opportunities and opportunities of any kind promised during the event and is just a facilitator of networking and visibility between local talent and local innovation and hence is not liable post event.
                        </p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
