"use client";

import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
const SECTION_IDS = ["coc-intro", "coc-nice", "coc-respectful", "coc-collaborative", "coc-participate", "coc-online", "coc-opportunities"];
export default function CodeOfConductPage() {
  const t = useTranslations();
  const [activeSection, setActiveSection] = useState("coc-intro");
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -70% 0px",
      threshold: 0
    };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth"
    });
  };
  const pills = [{
    id: "coc-intro",
    label: "Introduction"
  }, {
    id: "coc-nice",
    label: "Be nice"
  }, {
    id: "coc-respectful",
    label: "Be respectful"
  }, {
    id: "coc-collaborative",
    label: "Be collaborative"
  }, {
    id: "coc-participate",
    label: "Participate"
  }, {
    id: "coc-online",
    label: "Online etiquette"
  }, {
    id: "coc-opportunities",
    label: "Opportunities"
  }];
  return <div className="dark:bg-grey-900! min-h-screen flex flex-col font-sans text-[#202124] dark:text-white bg-white">
      <Header onRegisterClick={() => {}} />

      <main id="content" className="dark:bg-grey-900! flex-1">
        {/* Hero Banner */}
        <div className="w-full flex flex-col md:flex-row md:h-[407px] overflow-hidden bg-grey-bg dark:bg-grey! border-b md:border-b-2 border-grey dark:border-grey-bg">
          <div className="flex flex-col md:text-left md:justify-center px-4 py-5 w-full md:w-2/5 md:p-10 md:pr-0 dark:text-white z-10">
            <h1 className="font-medium mb-4 sm:s-h2 md:l-h1">{t("code_of_conduct")}</h1>
            <p className="font-medium sm:s-h6 md:l-h6 mb-4">{t("all_participants_of_gdgoc_wow_ap_2025_event_attendees_event_staff_and_speakers_must_abide_by_the_following_policy")}</p>
          </div>
          <div className="flex items-end w-full md:w-3/5 justify-start! xl:justify-end! xl:pr-5">
            <img className="hidden md:inline-block h-full object-cover object-left dark:hidden md:max-h-[200px] text-md:max-h-[350px] -mb-[2px]" src="/images/io__-about-hero.webp" role="img" aria-hidden="true" fetchPriority="high" width="800" height="350" alt="" />
            <img className="hidden dark:md:inline-block h-full object-cover object-left md:max-h-[200px] text-md:max-h-[350px] -mb-[2px]" src="/images/io24-about-hero-dark.webp" role="img" aria-hidden="true" fetchPriority="high" width="800" height="350" alt="" />
            <img className="block md:hidden dark:hidden max-w-[90%]" src="/images/io24-about-hero-mobile.webp" role="img" aria-hidden="true" fetchPriority="high" width="800" height="350" alt="" />
            <img className="hidden dark:inline-block dark:md:hidden max-w-[90%]" src="/images/io24-about-hero-mobile-dark.webp" role="img" aria-hidden="true" fetchPriority="high" width="800" height="350" alt="" />
          </div>
        </div>

        {/* Content Layout */}
        <div className="w-full max-w-[1640px] mx-auto px-5 md:px-10 pt-4 md:pt-10 text-grey-900 dark:text-white flex flex-col">
          <div className="faq-container flex flex-row gap-12 mt-[60px]">

            {/* Left: Sticky Pills Nav */}
            <div className="faq-pills__container">
              <h2 className="font-medium mb-8 sm:l-h2 block faq-title__desktop text-grey-900 dark:text-white">{t("code_of_conduct")}</h2>
              <div className="flex flex-col faq-pills">
                {pills.map((pill, i) => <button key={pill.id} onClick={() => scrollToSection(pill.id)} className={`${i === pills.length - 1 ? "last-pill " : ""}faq-pill ${activeSection === pill.id ? "faq-pill__active" : ""}`} style={{
                borderRadius: "8px",
                minWidth: "fit-content"
              }}>
                    {pill.label}
                  </button>)}
              </div>
            </div>

            {/* Right: Content sections */}
            <div className="flex-1 flex flex-col w-full max-w-xl mx-auto faq-sections">

              {/* Section 1 — Introduction */}
              <section id="coc-intro" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                  <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200" style={{
                  background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)"
                }}>
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("introduction")}</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 text-grey-900 dark:text-white">
                      <dd className="faq-entry">
                        <p className="mb-2">{t("all_participants_of_gdgoc_wow_ap_2025_event_attendees_event_staff_and_speakers_must_abide_by_the_following_policy")}</p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 2 — Be nice */}
              <section id="coc-nice" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                  <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200" style={{
                  background: "linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)"
                }}>
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("be_nice_to_the_other_attendees")}</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 text-grey-900 dark:text-white">
                      <dd className="faq-entry">
                        <p>{t("were_all_part_of_the_same_community_so_be_friendly_welcoming_and_generally_a_nice_person_be_someone_that_other_people_want_to_be_around")}</p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 3 — Be respectful */}
              <section id="coc-respectful" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                  <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200" style={{
                  background: "linear-gradient(90deg, #FFCB32 -0.15%, #FFCB32 17.85%, #F46831 52.85%, #EA4335 78.85%, #EA4335 99.85%)"
                }}>
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("be_respectful_and_constructive")}</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 text-grey-900 dark:text-white">
                      <dd className="faq-entry">
                        <p>{t("remember_to_be_respectful_and_constructive_with_your_communication_in_discussions_to_fellow_attendees_dont_get_into_flame_wars_make_personal_attacks_vent_or_rant_unconstructively_everyone_should_take_responsibility_for_the_community_and_take_the_initiative_to_diffuse_tension_and_stop_a_negative_thread_as_early_as_possible")}</p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 4 — Be collaborative */}
              <section id="coc-collaborative" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                  <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200" style={{
                  background: "linear-gradient(270.11deg, #5382EB 1.91%, #5382EB 25.69%, #9F6CD4 51.37%, #EA4335 79.9%, #EA4335 97.02%)"
                }}>
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("be_collaborative")}</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 text-grey-900 dark:text-white">
                      <dd className="faq-entry">
                        <p>{t("we_are_here_to_learn_a_lot_from_each_other_share_knowledge_and_help_each_other_out_you_may_disagree_with_ideas_not_people")}</p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 5 — Participate */}
              <section id="coc-participate" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                  <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200" style={{
                  background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)"
                }}>
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("participate")}</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 text-grey-900 dark:text-white">
                      <dd className="faq-entry">
                        <p>{t("be_a_good_listener_be_mentally_present_in_the_sessions_you_are_interested_in_join_in_on_discussions_show_up_for_the_sessions_on_time_offer_feedback_on_your_event_experience_and_help_us_get_better_in_our_community_engagements")}</p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 6 — Online etiquette */}
              <section id="coc-online" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                  <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200" style={{
                  background: "linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)"
                }}>
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("basic_etiquette_for_online_discussions")}</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 text-grey-900 dark:text-white">
                      <dd className="faq-entry">
                        <p>{t("keep_off_topic_conversations_to_a_minimum_dont_be_spammy_by_advertising_or_promoting_personal_projects_which_are_off_topic")}</p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 7 — Opportunities */}
              <section id="coc-opportunities">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                  <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200" style={{
                  background: "linear-gradient(90deg, #FFCB32 -0.15%, #FFCB32 17.85%, #F46831 52.85%, #EA4335 78.85%, #EA4335 99.85%)"
                }}>
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("opportunities")}</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 text-grey-900 dark:text-white">
                      <dd className="faq-entry">
                        <p>{t("gdg_vizag_is_not_responsible_for_any_job_opportunities_internships_collaborations_freelance_opportunities_and_opportunities_of_any_kind_promised_during_the_event_and_is_just_a_facilitator_of_networking_and_visibility_between_local_talent_and_local_innovation_and_hence_is_not_liable_post_event")}</p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
    </div>;
}