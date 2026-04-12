"use client";

import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
export default function AboutIO() {
  const t = useTranslations();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState("section-one");

  // Toggle mobile navigation drawer
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  // Simple scroll spy / tab effect for FAQ pills
  const scrollToFaq = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth"
    });
  };

  // Setup theme and IntersectionObserver for scroll spy
  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) {
      document.documentElement.classList.add("dark");
    }

    // Observer for FAQ sections
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -70% 0px",
      // Adjust to trigger when section top is near page top
      threshold: 0
    };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveFaq(entry.target.id);
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ["section-one", "section-two", "section-three", "section-four", "section-five", "section-six", "section-seven"];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return <>
            <Head>
                <title>{t("about_google_io_2024")}</title>
                <meta name="description" content="Discover everything you need to know about World of Wonders 2026 and get answers to your questions." />
            </Head>

            <div className="dark:bg-grey-900! min-h-screen flex flex-col font-sans text-[#202124] dark:text-white bg-white">
                <div id="page-title" className="absolute top-[-40px]">{t("about_google_io_2024")}</div>

                {/* Header */}
                <Header onRegisterClick={() => {}} />

                {/* Main Content */}
                <main id="content" className="dark:bg-grey-900! flex-1">
                    {/* Hero Banner */}
                    <div className="w-full flex flex-col md:flex-row text-md:h-[407px] md:h-[407px] overflow-hidden bg-grey-bg dark:bg-grey! border-b-[1px] md:border-b-2 border-grey dark:border-grey-bg">
                        <div className="flex flex-col md:text-left md:justify-center px-4 py-5 w-full md:w-2/5 md:p-10 md:pr-0 dark:text-white z-10">
                            <h1 className="font-medium mb-4 sm:s-h2 md:l-h1 text-md:-mr-40 md:-mr-40">{t("about_wow")}</h1>
                            <div className="font-medium sm:s-h6 md:l-h6 mb-4">
                                <p>{t("discover_everything_you_need_to_know_about_wonder_of_wonders_2026_and_get_answers_to_your_questions")}</p>

                            </div>
                        </div>
                        <div className="flex justify-end items-end w-full md:w-3/5 !justify-start xl:!justify-end xl:pr-5">
                            <img className="hidden md:inline-block h-full object-cover object-left dark:hidden md:max-h-[200px] text-md:max-h-[350px] -mb-[2px]" src="/images/io__-about-hero.webp" role="img" aria-hidden="true" fetchPriority="high" width="800" height="350" alt="" />
                            <img className="hidden dark:md:inline-block h-full object-cover object-left md:max-h-[200px] text-md:max-h-[350px] -mb-[2px]" src="/images/io24-about-hero-dark.webp" role="img" aria-hidden="true" fetchPriority="high" width="800" height="350" alt="" />
                            <img className="block md:hidden dark:hidden max-w-[90%] md:max-w-[auto]" src="/images/io24-about-hero-mobile.webp" role="img" aria-hidden="true" fetchPriority="high" width="800" height="350" alt="" />
                            <img className="hidden dark:inline-block dark:md:hidden max-w-[90%] md:max-w-[auto]" src="/images/io__-about-hero-mobile-dark.webp" role="img" aria-hidden="true" fetchPriority="high" width="800" height="350" alt="" />
                        </div>
                    </div>

                    <div className="w-full max-w-[1640px] mx-auto px-5 md:px-10 pt-4 md:pt-10 text-grey-900 dark:text-white flex flex-col">
                        {/* Get Engaged Section */}
                        <div className="flex flex-col mt-[8px] md:mt-[4px]">
                            <h2 className="font-medium text-left text-grey-900 mb-6 sm:s-h4 md:l-h2 md:mb-12 dark:text-grey-bg!">{t("get_engaged")}</h2>
                            <div className="grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:justify-items-center">
                                {/* Tune in Card */}
                                <div className="mb-9 basis-full">
                                    <div className="flex justify-center items-center overflow-hidden">
                                        <img src="/images/cs_products.webp" className="dark:hidden object-contain h-full w-full" width="471" height="258" alt="" />
                                        <img src="/images/cs_products-dark.webp" className="hidden dark:block object-contain h-full w-full" width="471" height="258" alt="" />
                                    </div>
                                    <div className="text-grey-900 mt-6 dark:text-white">
                                        <h3 className="font-medium mb-3 sm:s-h5 md:l-h5">{t("tune_in_live_or_on_demand")}</h3>
                                        <p className="font-normal sm:s-p2 md:l-p1">{t("learn_about_the_latest_product_launches_and_updates_through_keynotes_and_technical_sessions")}</p>
                                        <div>
                                            <div className="h-external-link">
                                                <p>
                                                    <Link href="/explore" className="text-black underline font-medium inline-block mt-3 dark:text-white">{t("watch_and_explore")}</Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Grow your skills Card */}
                                <div className="mb-9 basis-full">
                                    <div className="flex justify-center items-center overflow-hidden">
                                        <img src="/images/cs_learning.webp" className="dark:hidden object-contain h-full w-full" width="471" height="258" alt="" />
                                        <img src="/images/cs_learning-dark.webp" className="hidden dark:block object-contain h-full w-full" width="471" height="258" alt="" />
                                    </div>
                                    <div className="text-grey-900 mt-6 dark:text-white">
                                        <h3 className="font-medium mb-3 sm:s-h5 md:l-h5">{t("grow_your_skills")}</h3>
                                        <p className="font-normal sm:s-p2 md:l-p1">{t("try_new_google_products_and_solutions_through_selfdirected_codelabs_and_guided_workshops")}</p>
                                    </div>
                                </div>

                                {/* Join community Card */}
                                <div className="basis-full">
                                    <div className="flex justify-center items-center overflow-hidden">
                                        <img src="/images/cs_program.webp" className="dark:hidden object-cover h-full w-full" width="471" height="258" alt="" />
                                        <img src="/images/cs_program-dark.webp" className="hidden dark:block object-cover h-full w-full" width="471" height="258" alt="" />
                                    </div>
                                    <div className="text-grey-900 mt-6 dark:text-white">
                                        <h3 className="font-medium mb-3 sm:s-h5 md:l-h5">{t("join_a_community_group")}</h3>
                                        <p className="font-normal sm:s-p2 md:l-p1">{t("grow_your_knowledge_of_google_technology_through_meetups_collaboration_and_more")}</p>
                                        <div>
                                            <Link href="/community" className="text-black underline font-medium inline-block mt-3 dark:text-white">{t("get_started")}</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Layout */}
                    <div className="faq-container flex flex-row gap-12 mt-[60px]">
                        {/* FAQ Navigation Pills */}
                        <div className="faq-pills__container">
                            <h2 className="font-medium mb-1 sm:s-h2 hidden faq-title__mobile text-grey-900 dark:text-white">{t("faq")}</h2>
                            <h2 className="font-medium mb-8 sm:l-h2 block faq-title__desktop text-grey-900 dark:text-white">{t("frequently_asked_questions")}</h2>
                            <div className="flex flex-col faq-pills">
                                <button onClick={() => scrollToFaq("section-one")} className={`faq-pill ${activeFaq === "section-one" ? "faq-pill__active" : ""}`} style={{
                borderRadius: "8px",
                minWidth: "fit-content"
              }}>{t("general")}</button>
                                <button onClick={() => scrollToFaq("section-two")} className={`faq-pill ${activeFaq === "section-two" ? "faq-pill__active" : ""}`} style={{
                borderRadius: "8px",
                minWidth: "fit-content"
              }}>{t("hackathon")}</button>
                                <button onClick={() => scrollToFaq("section-three")} className={`faq-pill ${activeFaq === "section-three" ? "faq-pill__active" : ""}`} style={{
                borderRadius: "8px",
                minWidth: "fit-content"
              }}>{t("registration")}</button>
                                <button onClick={() => scrollToFaq("section-five")} className={`faq-pill ${activeFaq === "section-five" ? "faq-pill__active" : ""}`} style={{
                borderRadius: "8px",
                minWidth: "fit-content"
              }}>{t("amenities_details")}</button>
                            </div>
                        </div>

                        {/* FAQ Sections */}
                        <div className="flex-1 flex flex-col w-full max-w-xl mx-auto faq-sections">
                            {/* SECTION ONE - General Merged */}
                            <section id="section-one" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg overflow-hidden">
                                    <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg" style={{
                  background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)"
                }}>
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("general")}</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("what_is_wow_2026")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>{t("gdgwow_wonder_of_wonders_is_a_premier_developer_conference_and_14hour_hackathon_hosted_by_33_gdg_on_campus_chapters_across_andhra_pradesh")}</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("when_is_gdgwow_2026")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>{t("gdgwow_is_taking_place_in_vizag_at_gitam_university_from_4th_july_to_5th_july_this_year")}</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("how_will_gdgwow_2026_work_for_attendees_unable_to_attend_in_person")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>{t("one_of_the_exciting_things_about_this_event_is_the_opportunity_to_reach_a_wider_audience_conference_recordings_will_be_provided_on_demand_to_serve_every_arcade_pass_holder")}</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("how_can_i_stay_informed_on_the_latest_from_gdgwow_2026")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>{t("create_an_account_now_to_receive_important_information_via_email_about_the_event_to_stay_uptodate_on_the_latest_information_on_sessions_speakers_and_other_activities_check_the_gdgwow_2026_website_and_follow_our_instagram_page")}{" "}
                                                    <a href="https://www.instagram.com/gdgoncampusgitam/" target="_blank" rel="noopener noreferrer">{t("gdgoncampusgitam")}</a>,{" "}{t("_join_the_social_conversation_about_gdgwow_2026_via_the_official_gdgwow2026_hashtag")}</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("where_can_we_know_more_about_the_schedule")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>{t("the_schedule_can_be_found")}<a href="/agenda">{t("here")}</a>.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("community_guidelines")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>{t("our_community_guidelines_can_be_found")}<a href="/coc" target="_blank">{t("here")}</a>{t("_be_nice_to_each_other_and_be_respectful_and_constructive")}</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("the_official_gdgwow_26_app")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>{t("the_official_gdgwow_26_app_will_be_your_goto_resource_to_unlocking_the_best_experience_at_the_event_it_will_be_your_companion_for_the_event_providing_you_with_all_the_eventrelated_information_you_can_access_the_schedule_speaker_details_and_more_through_the_app_be_sure_to_download_it_once_its_available_very_soon")}</p>
                                            </dd>
                                        </div>

                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("medium_of_communication")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p>{t("all_the_conferences_sessions_and_workshops_will_be_conducted_in_english")}</p>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </section>

                            {/* SECTION TWO - Hackathon WoW */}
                            <section id="section-two" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg overflow-hidden">
                                    <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg" style={{
                  background: "linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)"
                }}>
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("hackathon")}</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("overview")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p className="mb-2">{t("the_gdgwow_2026_visakhapatnam_hackathon_is_a_14hour_event_where_participants_will_work_in_teams_to_build_innovative_solutions_using_the_latest_technologies")}</p>
                                                <p>{t("the_hackathon_will_take_place_on_the_4th5th_july_2026_starting_at_0400_pm_on_the_4th_and_ending_at_0600_am_on_the_5th")}</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("eligibility")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>{t("the_hackathon_is_open_to_all_registered_attendees_of_gdgwow_2026_visakhapatnam_participants_can_register_as_teams_ranging_from_3_to_5_members_teams_can_be_formed_on_the_spot_during_the_event_the_team_registration_panel_can_be_found")}<a href="#">{t("here")}</a>{t("_you_can_explore_the_community_page_of_the_gdgwow_26_app_to_find_teamates")}</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("domains")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p className="mb-2">{t("the_hackathon_will_focus_on_the_following_domains")}</p>
                                                <ul className="list-disc ml-6 space-y-1 mb-4">
                                                    <li>{t("web_development")}</li>
                                                    <li>{t("mobile_app_development")}</li>
                                                    <li>{t("aiml_solutions")}</li>
                                                    <li>{t("cloud_computing")}</li>
                                                    <li>{t("nocode_development")}</li>
                                                </ul>
                                                <p className="mb-2">{t("teams_can_choose_any_of_these_domains_or_any_other_relevant_domain_to_work_on_their_projects")}</p>
                                                <p className="italic text-grey-600 dark:text-grey-400">{t("participants_are_encouraged_to_think_outside_the_box_and_come_up_with_innovative_solutions_that_can_make_a_difference_in_the_world_and_impact_the_community_around_us_in_meaningful_ways")}</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("prizes")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>{t("the_top_three_teams_will_be_awarded_exciting_cash_prizes_and_exclusive_swags_all_participants_will_receive_a_certificate_of_participation")}</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("judging")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p className="mb-2">{t("the_hackathon_projects_will_be_judged_by_a_panel_of_experts_based_on_the_following_criteria")}</p>
                                                <ul className="list-disc ml-6 space-y-1">
                                                    <li>{t("innovation_and_creativity")}</li>
                                                    <li>{t("technical_implementation")}</li>
                                                    <li>{t("user_experience")}</li>
                                                    <li>{t("impact_and_scalability")}</li>
                                                </ul>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("ai_usage")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>{t("participants_are_encouraged_to_use_ai_tools_and_technologies_in_their_projects_however_the_use_of_ai_should_be_ethical_and_transparent_with_proper_attribution_to_any_ai_models_or_datasets_used")}</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("late_night_stay")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p className="mb-2">{t("participants_are_expected_to_stay_overnight_at_the_venue_during_the_hackathon_however_in_case_of_any_emergency_participants_can_leave_the_venue_and_return_the_next_day_by_0800_am_sharp")}</p>
                                                <p>{t("however_they_must_inform_the_organizers_about_their_absence_and_provide_a_valid_reason_also_atleast_two_members_of_the_team_must_be_present_at_the_venue_at_all_times")}</p>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </section>

                            {/* SECTION THREE - Registration Merged */}
                            <section id="section-three" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg overflow-hidden">
                                    <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg" style={{
                  background: "linear-gradient(90deg, #FFCB32 -0.15%, #FFCB32 17.85%, #F46831 52.85%, #EA4335 78.85%, #EA4335 99.85%)"
                }}>
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("registration")}</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("what_does_registration_include")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>{t("registration_for_gdgwow_26_enables_you_to_stay_up_to_date_about_the_schedule_and_content_along_with_relevant_developer_news_via_email")}</p>
                                            </dd>
                                        </div>

                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("registration_terms_conditions")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p>{t("tickets_are_nontransferable_and_solo_individual_purchase_only")}</p>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </section>


                            {/* SECTION FIVE - Amenities & Details WoW Merged */}
                            <section id="section-five" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg overflow-hidden">
                                    <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg" style={{
                  background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)"
                }}>
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("amenities_details")}</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("internet_access")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>{t("highspeed_wifi_will_be_provided_by_gitam_university_throughout_the_event")}<br /><br />{t("wifi")}<span className="font-bold">{t("gitam_5ghz")}</span><br />{t("password")}<b>{t("gitam123")}</b></p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("onsite_food_beverages")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>{t("breakfast_lunch_and_dinner_are_complimentary_for_attendees")}</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("accommodation")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p className="mb-2">{t("accommodation_details_will_be_shared_with_registered_attendees_closer_to_the_event_date")}<br /><br />{t("accommodation_will_be_provided_for_the_night_of")}<b>{t("3rd_july_2026")}</b>{t("at")}<b>{t("gitam_deemed_to_be_university_visakhapatnam")}</b>{t("_the_cost_of_accommodation_is")}<b>{t("300")}</b>{t("_which_is_not_included_in_the_event_registration_fee_the_checkout_time_for_accommodation_is")}<b>{t("1159_am_on_4th_july_2026")}</b>.</p>
                                                <p className="mb-2">{t("accommodation_will_be_provided_in_the")}<b>{t("gitam_hostel")}</b>{t("_and_it_will_be")}<b>{t("shared_accommodation")}</b>{t("_attendees_are_expected_to_maintain_decorum_and_follow_the_hostel_rules_during_their_stay")}</p>
                                                <p>{t("accommodation_can_be_extended_for_an_additional_fee_of")}<b>{t("200_per_night")}</b>{t("_subject_to_availability_the_stay_can_be_extended_until")}<b>{t("1159_am")}</b>{t("6th_july_2026")}</p><br />
                                                <p>{t("if_you_wish_to_extend_your_stay_you_can_manage_your_stay_through_the")}<b>{t("official_gdgdwow_2026_visakhapatnam_app")}</b>{t("_which_will_be_available_for_download_soon")}</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("washroom")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>{t("washrooms_can_be_found_on_either_side_")}<b>{t("east_and_west")}</b>{t("_of_the")}<b>{t("ict_building")}</b>{t("_located")}<b>{t("behind_the_elevator_lobbies")}</b>.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("drinking_fountain")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>{t("drinking_fountainbottle_filling_stations_can_be_found")}<b>{t("next_to_all_washroom_entrances")}</b>.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("event_attire")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>{t("gdgwow_visakhapatnam_is_a_developer_event_so_please_be")}<b>{t("comfortable_and_casual")}</b>{t("_there_is_no_enforced_dress_code")}</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("smoking")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>{t("smoking_is")}<b>{t("strictly_prohibited")}</b>{t("at_the_venue")}</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("no_soliciting")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p>{t("no_solicitation_or_selling_of_items_or_services_is_allowed_at_gdgwow_2026_visakhapatnam_any_attendee_conducting_these_activities")}<b>{t("may_be_removed")}</b>{t("from_the_conference")}</p>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </section>


                        </div>
                    </div>
                </main>

            </div>
        </>;
}