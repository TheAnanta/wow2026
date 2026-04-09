"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

const SECTION_IDS = [
  "terms-intro",
  "terms-passes",
  "terms-hackathon",
  "terms-accommodation",
  "terms-refund",
  "terms-conduct",
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("terms-intro");

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
    { id: "terms-intro", label: "Introduction" },
    { id: "terms-passes", label: "Pass Types" },
    { id: "terms-hackathon", label: "14-Hour Hackathon" },
    { id: "terms-accommodation", label: "Accommodation" },
    { id: "terms-refund", label: "Refund & Transfer" },
    { id: "terms-conduct", label: "Conduct & Media" },
  ];

  return (
    <div className="dark:bg-grey-900 min-h-screen flex flex-col font-sans text-[#202124] dark:text-white bg-white">
      <Header onRegisterClick={() => { }} />

      <main id="content" className="dark:bg-grey-900 flex-1">
        {/* Hero Banner — matches About page exactly */}
        <div className="w-full flex flex-col md:flex-row md:h-[407px] overflow-hidden bg-grey-bg dark:bg-grey border-b-[1px] md:border-b-2 border-grey dark:border-grey-bg">
          <div className="flex flex-col md:text-left md:justify-center px-4 py-5 w-full md:w-2/5 md:p-10 md:pr-0 dark:text-white z-10">
            <h1 className="font-medium mb-4 sm:s-h2 md:l-h1">
              Terms &amp; Conditions
            </h1>
            <p className="font-medium sm:s-h6 md:l-h6 mb-4">
              The official policies governing registration, passes, the 14-hour
              hackathon, accommodation, and conduct at GDG WOW 2026.
            </p>
          </div>
          <div className="flex justify-end items-end w-full md:w-3/5 !justify-start xl:!justify-end xl:pr-5">
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
              src="/images/io__-about-hero-mobile-dark.webp"
              role="img"
              aria-hidden="true"
              fetchPriority="high"
              width="800"
              height="350"
              alt=""
            />
          </div>
        </div>

        {/* FAQ-style layout — identical structure to About page */}
        <div className="w-full max-w-[1640px] mx-auto px-5 md:px-10 pt-4 md:pt-10 text-grey-900 dark:text-white flex flex-col">
          <div className="faq-container flex flex-row gap-12 mt-[60px]">

            {/* Left: Sticky Pills Nav */}
            <div className="faq-pills__container">
              <h2 className="font-medium mb-8 sm:l-h2 block faq-title__desktop text-grey-900 dark:text-white">
                Terms &amp; Conditions
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
              <section id="terms-intro" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                  <div
                    className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                    style={{ background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)" }}
                  >
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Introduction</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">What is GDGWOW 2026?</span>
                        </div>
                      </dt>
                      <dd className="mt-4 md:mt-5 faq-entry">
                        <p>
                          By purchasing any pass or participating in the Arcade, you agree to these terms and conditions in full.
                        </p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 2 — Pass Types */}
              <section id="terms-passes" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                  <div
                    className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                    style={{ background: "linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)" }}
                  >
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Pass Types &amp; Access Rights</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">Arcade Pass — ₹350 (The Community's Pass)</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p className="mb-2">
                          <strong>Definition:</strong> A pre-event engagement pass granting access to the "Now in Google" (GDGWOW) App and the 4-week gamified journey.
                        </p>
                        <p className="mb-2">
                          <strong>Inclusions:</strong> Access to live coaching, technical workshops, community channels, peer-to-peer messaging, and recorded content.
                        </p>
                        <p className="mb-2 font-bold text-[#EA4335]">
                          Important: The Arcade Pass is NOT a ticket to the physical event at GITAM University. It is a prerequisite/supplement that offers a pathway to a discounted event ticket.
                        </p>
                        <p>
                          <strong>The Arcade Route:</strong> Users can earn up to a 100% discount on the WOW Event Ticket based on their leaderboard performance within the app games over the 4-week period.
                        </p>
                      </dd>
                    </div>
                    <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">Event Passes (Early Bird, Regular, Late Bird)</span>
                        </div>
                      </dt>
                      <dd className="mt-4 md:mt-5 faq-entry">
                        <p className="mb-2">
                          <strong>Inclusions:</strong> Access to all physical sessions, Google Developer Expert (GDE) talks, the 14-hour hackathon, and event amenities.
                        </p>
                        <p>
                          <strong>App Access:</strong> Event pass holders receive app access for networking and schedules but do not have access to the "Games" section, which is exclusive to Arcade Pass holders for discount earning.
                        </p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 3 — Hackathon */}
              <section id="terms-hackathon" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                  <div
                    className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                    style={{ background: "linear-gradient(90deg, #FFCB32 -0.15%, #FFCB32 17.85%, #F46831 52.85%, #EA4335 78.85%, #EA4335 99.85%)" }}
                  >
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">The 14-Hour Hackathon</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">Timeline &amp; Eligibility</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p className="mb-2">
                          The hackathon starts on <strong>4th July at 04:00 PM</strong> and ends on <strong>5th July at 06:00 AM</strong>.
                        </p>
                        <p>
                          Open only to registered Event Pass holders. Teams must consist of <strong>3 to 5 members</strong>.
                        </p>
                      </dd>
                    </div>
                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">Requirements</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p>All participants must bring their own laptops, chargers, and any necessary hardware. These will not be provided at the venue.</p>
                      </dd>
                    </div>
                    <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">Overnight Stay</span>
                        </div>
                      </dt>
                      <dd className="mt-4 md:mt-5 faq-entry">
                        <p className="mb-2">Participants are expected to remain at the venue throughout the hackathon.</p>
                        <p>If an emergency arises, at least <strong>two team members must remain on-site</strong> at all times to maintain project eligibility.</p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 4 — Accommodation */}
              <section id="terms-accommodation" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                  <div
                    className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                    style={{ background: "linear-gradient(270.11deg, #5382EB 1.91%, #5382EB 25.69%, #9F6CD4 51.37%, #EA4335 79.9%, #EA4335 97.02%)" }}
                  >
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Accommodation &amp; Amenities</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">Food &amp; Internet</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p className="mb-2">Registration includes <strong>complimentary breakfast, lunch, and dinner</strong> during the event days.</p>
                        <p><strong>High-speed Wi-Fi</strong> will be provided by GITAM University throughout the event.</p>
                      </dd>
                    </div>
                    <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">Hostel Stay</span>
                        </div>
                      </dt>
                      <dd className="mt-4 md:mt-5 faq-entry">
                        <p className="mb-2">Pre-event accommodation on <strong>3rd July</strong> is available for <strong>₹300</strong> (not included in the event ticket).</p>
                        <p className="mb-2">Check-out is <strong>11:59 AM on 4th July</strong>. Extensions up to 6th July are available via the app for <strong>₹200/night</strong>, subject to availability.</p>
                        <p>This is shared accommodation. Attendees must follow all GITAM hostel rules during their stay.</p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 5 — Refund Policy */}
              <section id="terms-refund" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                  <div
                    className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                    style={{ background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)" }}
                  >
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Refund &amp; Transfer Policy</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">Non-Transferable</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p>Tickets are tied to the individual's identity and <strong>cannot be sold, bartered, or transferred</strong> to another person under any circumstance.</p>
                      </dd>
                    </div>
                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">Non-Refundable</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p>All pass purchases (Arcade and Event) are <strong>final</strong>. No refunds will be issued for no-shows or changes in plans.</p>
                      </dd>
                    </div>
                    <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">Information Accuracy</span>
                        </div>
                      </dt>
                      <dd className="mt-4 md:mt-5 faq-entry">
                        <p>Information provided during registration must be <strong>accurate and in English</strong>. Incorrect details may lead to the voiding of the pass without a refund.</p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 6 — Conduct & Media */}
              <section id="terms-conduct">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                  <div
                    className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                    style={{ background: "linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)" }}
                  >
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Conduct &amp; Media</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">Zero Tolerance</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p>Attendees must follow the <a href="https://developers.google.com/community-guidelines" target="_blank" rel="noopener noreferrer">Community Guidelines and Anti-Harassment Policy</a>. Smoking and soliciting are <strong>strictly prohibited</strong> at the venue.</p>
                      </dd>
                    </div>
                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">Photography &amp; Media Consent</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p className="mb-2">GDGWOW AP reserves the right to use photographs and videos taken during the event for promotional purposes.</p>
                        <p>By attending, you waive rights to compensation for your likeness being used in such materials.</p>
                      </dd>
                    </div>
                    <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">Liability</span>
                        </div>
                      </dt>
                      <dd className="mt-4 md:mt-5 faq-entry">
                        <p className="mb-2">Attendees are responsible for their personal belongings (laptops, bags, etc.).</p>
                        <p>GDGWOW AP and GITAM University are <strong>not liable</strong> for loss, theft, or injury during the event.</p>
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
