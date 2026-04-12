"use client";

import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
const SECTION_IDS = ["terms-intro", "terms-passes", "terms-hackathon", "terms-accommodation", "terms-refund", "terms-conduct", "terms-usage", "terms-intellectual-property", "terms-legal", "terms-contact"];
export default function TermsPage() {
  const t = useTranslations();
  const [activeSection, setActiveSection] = useState("terms-intro");
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
    id: "terms-intro",
    label: "Introduction"
  }, {
    id: "terms-passes",
    label: "Pass Types"
  }, {
    id: "terms-hackathon",
    label: "14-Hour Hackathon"
  }, {
    id: "terms-accommodation",
    label: "Accommodation"
  }, {
    id: "terms-refund",
    label: "Refund & Transfer"
  }, {
    id: "terms-conduct",
    label: "Conduct & Media"
  }, {
    id: "terms-usage",
    label: "Usage Policy"
  }, {
    id: "terms-intellectual-property",
    label: "Intellectual Property"
  }, {
    id: "terms-legal",
    label: "Legal Terms"
  }, {
    id: "terms-contact",
    label: "Contact & Ownership"
  }];
  return <div className="dark:bg-grey-900! min-h-screen flex flex-col font-sans text-[#202124] dark:text-white bg-white">
      <Header onRegisterClick={() => {}} />

      <main id="content" className="dark:bg-grey-900! flex-1">
        {/* Hero Banner — matches About page exactly */}
        <div className="w-full flex flex-col md:flex-row md:h-[407px] overflow-hidden bg-grey-bg dark:bg-grey! border-b-[1px] md:border-b-2 border-grey dark:border-grey-bg">
          <div className="flex flex-col md:text-left md:justify-center px-4 py-5 w-full md:w-2/5 md:p-10 md:pr-0 dark:text-white z-10">
            <h1 className="font-medium mb-4 sm:s-h2 md:l-h1">{t("terms_conditions")}</h1>
            <p className="font-medium sm:s-h6 md:l-h6 mb-4">{t("the_official_policies_governing_registration_passes_the_14hour_hackathon_accommodation_and_conduct_at_gdg_wow_2026")}</p>
          </div>
          <div className="flex justify-end items-end w-full md:w-3/5 !justify-start xl:!justify-end xl:pr-5">
            <img className="hidden md:inline-block h-full object-cover object-left dark:hidden md:max-h-[200px] text-md:max-h-[350px] -mb-[2px]" src="/images/io__-about-hero.webp" role="img" aria-hidden="true" fetchPriority="high" width="800" height="350" alt="" />
            <img className="hidden dark:md:inline-block h-full object-cover object-left md:max-h-[200px] text-md:max-h-[350px] -mb-[2px]" src="/images/io24-about-hero-dark.webp" role="img" aria-hidden="true" fetchPriority="high" width="800" height="350" alt="" />
            <img className="block md:hidden dark:hidden max-w-[90%]" src="/images/io24-about-hero-mobile.webp" role="img" aria-hidden="true" fetchPriority="high" width="800" height="350" alt="" />
            <img className="hidden dark:inline-block dark:md:hidden max-w-[90%]" src="/images/io__-about-hero-mobile-dark.webp" role="img" aria-hidden="true" fetchPriority="high" width="800" height="350" alt="" />
          </div>
        </div>

        {/* FAQ-style layout — identical structure to About page */}
        <div className="w-full max-w-[1640px] mx-auto px-5 md:px-10 pt-4 md:pt-10 text-grey-900 dark:text-white flex flex-col">
          <div className="faq-container flex flex-row gap-12 mt-[60px]">

            {/* Left: Sticky Pills Nav */}
            <div className="faq-pills__container">
              <h2 className="font-medium mb-8 sm:l-h2 block faq-title__desktop text-grey-900 dark:text-white">{t("terms_conditions")}</h2>
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
              <section id="terms-intro" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg overflow-hidden">
                  <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg" style={{
                  background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)"
                }}>
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("introduction")}</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("binding_agreement")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p className="mb-4">{t("these_terms_and_conditions_along_with_the_privacy_policy_and_any_additional_terms_terms_constitute_a_binding_agreement_between_gdgoc_wow_2025_andhra_pradesh_we_our_us_and_you_you_your_and_govern_your_use_of_our_website_and_mobile_application")}<strong>{t("wowvizagdev")}</strong>, <strong>{t("devtheanantawow2025")}</strong>{t("and_participation_in_any_event_service_or_interaction_associated_with_gdgoc_wow_2025_collectively_the_services")}</p>
                        <p className="mb-2">{t("by_accessing_the_website_app_and_using_our_services_you_acknowledge_that_you_have_read_understood_and_agreed_to_these_terms_including_the_privacy_policy_we_may_modify_these_terms_at_any_time_without_prior_notice_it_is_your_responsibility_to_review_the_terms_periodically_for_updates")}</p>
                      </dd>
                    </div>

                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("registration_terms")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p className="mb-2">{t("by_registering_you_acknowledge_that_your_information_will_be_used_in_accordance_with_gdgwows")}{" "}
                          <a href="" target="_blank" rel="noopener noreferrer">{t("privacy_policy")}</a>{t("and")}{" "}
                          <a href="" target="_blank" rel="noopener noreferrer">{t("terms_of_service")}</a>.
                        </p>
                        <p className="mb-2">{t("you_may_not_register_on_behalf_of_anyone_else_gdgwow_registration_must_be_used_by_the_original_registrant_and_is_nontransferable")}</p>
                        <p className="mb-2">{t("all_information_entered_into_the_registration_form_must_be_correct_and_accurate_to_the_best_of_your_knowledge_all_information_must_be_entered_in_english_some_of_the_information_entered_such_as_name_and_company_will_be_displayed_to_other_users")}</p>


                        <p className="mb-2">{t("by_registering_and_accepting_any_discounts_gifts_or_items_of_value_related_to_gdgwow_2026_visakhapatnam_you_certify_that_you_are_able_to_do_so_in_compliance_with_applicable_laws_and_the_internal_rules_of_your_organization")}</p>
                        <p className="mb-2">{t("tickets_may_not_be_sold_bartered_or_auctioned_in_any_way_and_doing_so_may_result_in_gdgwow_ap_rendering_the_ticket_null_and_void_without_any_responsibility_to_gdgwow_ap")}</p>
                        <p className="mb-2">{t("attendees_arent_permitted_to_bring_guests_to_gdgwow_2026_visakhapatnam_if_you_have_someone_traveling_with_you_theyll_need_to_register_themselves_and_purchase_an_attendee_ticket")}</p>

                      </dd>
                    </div>
                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("event_conduct")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p>{t("by_registering_you_agree_to_follow_the")}<a href="https://developers.google.com/community-guidelines" target="_blank" rel="noopener noreferrer">{t("community_guidelines_and_antiharassment_policy")}</a>
                        </p>
                      </dd>
                    </div>

                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("photography_and_media")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p className="mb-2">{t("photographs_andor_video_taken_at_gdgwow_2026_visakhapatnam_by_gdgwow_ap_or_others_on_behalf_of_gdgwow_ap_may_include_your_image_or_likeness")}</p>
                        <p>{t("you_agree_that_gdgwow_ap_may_use_such_photographs_andor_video_for_any_purpose_without_compensation_to_you")}</p>
                      </dd>
                    </div>
                    <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("liability_and_safety")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 md:mt-5 faq-entry">
                        <p className="mb-2">{t("you_agree_to_be_solely_responsible_for_your_own_safety_belongings_and_wellbeing_while_participating_in_gdgwow_2026_visakhapatnam")}</p>
                        <p>{t("gdgwow_ap_wont_be_liable_for_your_participation_in_gdgwow_2026_visakhapatnam")}</p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 2 — Pass Types */}
              <section id="terms-passes" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg overflow-hidden">
                  <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg" style={{
                  background: "linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)"
                }}>
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("pass_types_access_rights")}</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("arcade_pass_350_the_communitys_pass")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p className="mb-2">
                          <strong>{t("definition")}</strong>{t("a_preevent_engagement_pass_granting_access_to_the_now_in_google_gdgwow_app_and_the_4week_gamified_journey")}</p>
                        <p className="mb-2">
                          <strong>{t("inclusions")}</strong>{t("access_to_live_coaching_technical_workshops_community_channels_peertopeer_messaging_and_recorded_content")}</p>
                        <p className="mb-2 font-bold text-[#EA4335]">{t("important_the_arcade_pass_is_not_a_ticket_to_the_physical_event_at_gitam_university_it_is_a_prerequisitesupplement_that_offers_a_pathway_to_a_discounted_event_ticket")}</p>
                        <p>
                          <strong>{t("the_arcade_route")}</strong>{t("users_can_earn_up_to_a_100_discount_on_the_wow_event_ticket_based_on_their_leaderboard_performance_within_the_app_games_over_the_4week_period")}</p>
                      </dd>
                    </div>
                    <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("event_passes_early_bird_regular_late_bird")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 md:mt-5 faq-entry">
                        <p className="mb-2">
                          <strong>{t("inclusions")}</strong>{t("access_to_all_physical_sessions_google_developer_expert_gde_talks_the_14hour_hackathon_and_event_amenities")}</p>
                        <p>
                          <strong>{t("app_access")}</strong>{t("event_pass_holders_receive_app_access_for_networking_and_schedules_but_do_not_have_access_to_the_games_section_which_is_exclusive_to_arcade_pass_holders_for_discount_earning")}</p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 3 — Hackathon */}
              <section id="terms-hackathon" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg overflow-hidden">
                  <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg" style={{
                  background: "linear-gradient(90deg, #FFCB32 -0.15%, #FFCB32 17.85%, #F46831 52.85%, #EA4335 78.85%, #EA4335 99.85%)"
                }}>
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("the_14hour_hackathon")}</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("timeline_eligibility")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p className="mb-2">{t("the_hackathon_starts_on")}<strong>{t("4th_july_at_0400_pm")}</strong>{t("and_ends_on")}<strong>{t("5th_july_at_0600_am")}</strong>.
                        </p>
                        <p>{t("open_only_to_registered_event_pass_holders_teams_must_consist_of")}<strong>{t("3_to_5_members")}</strong>.
                        </p>
                      </dd>
                    </div>
                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("requirements")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p>{t("all_participants_must_bring_their_own_laptops_chargers_and_any_necessary_hardware_these_will_not_be_provided_at_the_venue")}</p>
                      </dd>
                    </div>
                    <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("overnight_stay")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 md:mt-5 faq-entry">
                        <p className="mb-2">{t("participants_are_expected_to_remain_at_the_venue_throughout_the_hackathon")}</p>
                        <p>{t("if_an_emergency_arises_at_least")}<strong>{t("two_team_members_must_remain_onsite")}</strong>{t("at_all_times_to_maintain_project_eligibility")}</p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 4 — Accommodation */}
              <section id="terms-accommodation" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg overflow-hidden">
                  <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg" style={{
                  background: "linear-gradient(270.11deg, #5382EB 1.91%, #5382EB 25.69%, #9F6CD4 51.37%, #EA4335 79.9%, #EA4335 97.02%)"
                }}>
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("accommodation_amenities")}</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("food_internet")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p className="mb-2">{t("registration_includes")}<strong>{t("complimentary_breakfast_lunch_and_dinner")}</strong>{t("during_the_event_days")}</p>
                        <p><strong>{t("highspeed_wifi")}</strong>{t("will_be_provided_by_gitam_university_throughout_the_event")}</p>
                      </dd>
                    </div>
                    <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("hostel_stay")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 md:mt-5 faq-entry">
                        <p className="mb-2">{t("preevent_accommodation_on")}<strong>{t("3rd_july")}</strong>{t("is_available_for")}<strong>{t("300")}</strong>{t("not_included_in_the_event_ticket")}</p>
                        <p className="mb-2">{t("checkout_is")}<strong>{t("1159_am_on_4th_july")}</strong>{t("_extensions_up_to_6th_july_are_available_via_the_app_for")}<strong>{t("200night")}</strong>{t("_subject_to_availability")}</p>
                        <p>{t("this_is_shared_accommodation_attendees_must_follow_all_gitam_hostel_rules_during_their_stay")}</p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 5 — Refund Policy */}
              <section id="terms-refund" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg overflow-hidden">
                  <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg" style={{
                  background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)"
                }}>
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("refund_transfer_policy")}</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("nontransferable")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p>{t("tickets_are_tied_to_the_individuals_identity_and")}<strong>{t("cannot_be_sold_bartered_or_transferred")}</strong>{t("to_another_person_under_any_circumstance")}</p>
                      </dd>
                    </div>
                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("nonrefundable")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p>{t("all_pass_purchases_arcade_and_event_are")}<strong>{t("final")}</strong>{t("_no_refunds_will_be_issued_for_noshows_or_changes_in_plans")}</p>
                      </dd>
                    </div>
                    <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("information_accuracy")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 md:mt-5 faq-entry">
                        <p>{t("information_provided_during_registration_must_be")}<strong>{t("accurate_and_in_english")}</strong>{t("_incorrect_details_may_lead_to_the_voiding_of_the_pass_without_a_refund")}</p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 6 — Conduct & Media */}
              <section id="terms-conduct" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg overflow-hidden">
                  <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg" style={{
                  background: "linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)"
                }}>
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("conduct_media")}</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("zero_tolerance")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p>{t("attendees_must_follow_the")}<a href="https://developers.google.com/community-guidelines" target="_blank" rel="noopener noreferrer">{t("community_guidelines_and_antiharassment_policy")}</a>{t("_smoking_and_soliciting_are")}<strong>{t("strictly_prohibited")}</strong>{t("at_the_venue")}</p>
                      </dd>
                    </div>
                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("photography_media_consent")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p className="mb-2">{t("gdgwow_ap_reserves_the_right_to_use_photographs_and_videos_taken_during_the_event_for_promotional_purposes")}</p>
                        <p>{t("by_attending_you_waive_rights_to_compensation_for_your_likeness_being_used_in_such_materials")}</p>
                      </dd>
                    </div>
                    <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("liability")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 md:mt-5 faq-entry">
                        <p className="mb-2">{t("attendees_are_responsible_for_their_personal_belongings_laptops_bags_etc")}</p>
                        <p>{t("gdgwow_ap_and_gitam_university_are")}<strong>{t("not_liable")}</strong>{t("for_loss_theft_or_injury_during_the_event")}</p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 7 — Usage Policy */}
              <section id="terms-usage" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg overflow-hidden">
                  <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg" style={{
                  background: "linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)"
                }}>
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("usage_policy")}</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("user_responsibilities")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 md:mt-5 faq-entry">
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                          <li>{t("you_agree_to_provide_accurate_current_and_complete_information_during_registration_or_participation")}</li>
                          <li>{t("we_make_no_guarantees_about_the_accuracy_reliability_or_completeness_of_any_content_or_service_offered")}</li>
                          <li>{t("your_use_of_the_services_is_at_your_own_risk_and_discretion")}</li>
                          <li>{t("any_misuse_of_the_services_or_website_for_unlawful_or_unauthorized_purposes_may_result_in_legal_action")}</li>
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 8 — Intellectual Property */}
              <section id="terms-intellectual-property" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg overflow-hidden">
                  <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg" style={{
                  background: "linear-gradient(90deg, #FFCB32 -0.15%, #FFCB32 17.85%, #F46831 52.85%, #EA4335 78.85%, #EA4335 99.85%)"
                }}>
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("intellectual_property")}</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("ownership")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 md:mt-5 faq-entry">
                        <p>{t("all_content_branding_logos_and_materials_are_the_intellectual_property_of_gdgoc_wow_2025_andhra_pradesh_or_its_partners_you_may_not_reuse_them_without_written_permission")}</p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 9 — Legal Terms */}
              <section id="terms-legal" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg overflow-hidden">
                  <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg" style={{
                  background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)"
                }}>
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("legal_terms")}</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("force_majeure")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p>{t("we_are_not_liable_for_delays_or_failures_caused_by_events_beyond_our_control_including_natural_disasters_pandemics_or_internet_outages")}</p>
                      </dd>
                    </div>
                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("governing_law_jurisdiction")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p>{t("these_terms_are_governed_by_indian_law_any_disputes_will_be_subject_to_the_jurisdiction_of_courts_in")}<strong>{t("visakhapatnam_andhra_pradesh")}</strong>.</p>
                      </dd>
                    </div>
                    <div className="pt-[14px] pr-12 text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("thirdparty_links")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 md:mt-5 faq-entry">
                        <p>{t("our_websiteapp_may_contain_links_to_thirdparty_platforms_we_are_not_responsible_for_their_content_or_practices")}</p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Section 10 — Contact & Ownership */}
              <section id="terms-contact" className="pb-10">
                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg overflow-hidden">
                  <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg" style={{
                  background: "linear-gradient(270.11deg, #5382EB 1.91%, #5382EB 25.69%, #9F6CD4 51.37%, #EA4335 79.9%, #EA4335 97.02%)"
                }}>
                    <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("contact_ownership")}</h2>
                  </div>
                  <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                    <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("contact_us")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                        <p className="mb-2"><strong>{t("email")}</strong>{t("gdscwowvizaggmailcom")}</p>
                        <p className="mb-2"><strong>{t("phone")}</strong>{t("91_90591_45216")}</p>
                        <p className="mb-2"><strong>{t("website")}</strong> <a href="https://wow.vizag.dev" className="text-blue-link underline">{t("httpswowvizagdev")}</a></p>
                      </dd>
                    </div>
                    <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                      <dt>
                        <div className="flex justify-between items-start w-full text-left">
                          <span className="font-medium sm:s-h5 md:l-h5">{t("maintenance_ownership")}</span>
                        </div>
                      </dt>
                      <dd className="mt-4 md:mt-5 faq-entry">
                        <p>{t("the_website_app_and_related_digital_infrastructure_are_developed_and_maintained_by")}<strong>{t("the_ananta")}</strong>{t("for_the_gdgoc_wow_2025_andhra_pradesh_initiative")}</p>
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