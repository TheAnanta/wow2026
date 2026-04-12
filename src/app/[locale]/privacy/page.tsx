"use client";

import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import mainData from "@/data/config.json";
import { Header } from "@/components/sections/Header";
export default function PrivacyPolicyPage() {
  const t = useTranslations();
  useEffect(() => {
    document.title = `Privacy Policy - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document.querySelector("meta[property='og:title']")?.setAttribute("content", `Privacy Policy - ${mainData.eventInfo.name} | ${mainData.communityName}`);
    document.querySelector("meta[name='twitter:title']")?.setAttribute("content", `Privacy Policy - ${mainData.eventInfo.name} | ${mainData.communityName}`);
  }, []);
  return <div className="w-full min-h-screen text-grey-900">
      <Header onRegisterClick={() => {}} />
      <main className="page-wrapper max-w-4xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-8">{t("privacy_policy")}</h1>
        <p className="text-xl text-grey-600 mb-12 border-b border-grey-bg pb-8">{t("effective_date_april_1_2026")}</p>

        <div className="space-y-12 text-lg leading-relaxed text-grey-800">
          <section>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">{t("1_introduction")}</h2>
            <p>
              {mainData.eventInfo.name}{t("andhra_pradesh_we_our_or_us_is_committed_to_protecting_your_privacy_this_privacy_policy_outlines_how_we_collect_use_disclose_and_safeguard_your_information_when_you_visit_our_platform")}{" "}
              <a href={mainData.seo.hostUrl} className="text-google-blue hover:underline font-medium">
                {mainData.seo.hostUrl}
              </a>
              {" "}{t("and_participate_in_our_events")}</p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">{t("2_information_we_collect")}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-1">{t("personal_information")}</h3>
                <p>{t("we_may_collect_personal_information_that_you_voluntarily_provide_to_us_when_registering_for_events_such_as_your_name_email_address_phone_number_educational_institution_and_other_relevant_details_required_for_badging_and_logistics")}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{t("usage_data")}</h3>
                <p>{t("we_automatically_collect_certain_information_when_you_visit_the_platform_including_your_ip_address_browser_type_operating_system_access_times_and_pages_viewed_to_improve_our_services")}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">{t("3_how_we_use_your_information")}</h2>
            <ul className="list-disc list-inside space-y-3 marker:text-google-blue">
              <li>{t("facilitate_event_registration_badge_printing_and_participation")}</li>
              <li>{t("communicate_with_you_regarding_event_updates_session_schedules_and_related_information")}</li>
              <li>{t("improve_our_websiteapp_and_event_offerings_based_on_community_feedback")}</li>
              <li>{t("comply_with_necessary_legal_and_safety_obligations_for_inperson_gatherings")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">{t("4_sharing_your_information")}</h2>
            <p className="mb-4">{t("we_do_not_sell_or_rent_your_personal_information_to_third_parties_we_may_share_your_information_with")}</p>
            <ul className="list-disc list-inside space-y-3 marker:text-google-blue">
              <li>{t("event_partners_and_sponsors_strictly_for_eventrelated_purposes_like_workshop_access_or_prize_fulfillment")}</li>
              <li>{t("service_providers_who_assist_in_operating_our_platform_and_organizing_largescale_logistical_needs")}</li>
              <li>{t("law_enforcement_or_other_governmental_authorities_if_required_by_law_or_for_safety_reasons")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">{t("5_data_security")}</h2>
            <p>{t("we_implement_industrystandard_technical_and_organizational_measures_to_protect_your_personal_information_from_unauthorized_access_use_or_disclosure_this_includes_encryption_of_sensitive_data_and_secure_handling_of_payment_tokens")}</p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">{t("6_your_rights")}</h2>
            <p className="mb-4">{t("you_have_the_right_to")}</p>
            <ul className="list-disc list-inside space-y-3 marker:text-google-blue">
              <li>{t("access_the_personal_information_we_hold_about_you")}</li>
              <li>{t("request_correction_or_deletion_of_your_personal_information")}</li>
              <li>{t("object_to_or_restrict_certain_processing_of_your_personal_information")}</li>
            </ul>
            <p className="mt-6 p-4 bg-grey-bg dark:bg-grey-bg/8! rounded-xl border-l-4 border-google-blue">{t("to_exercise_these_rights_please_contact_us_at")}{" "}
              <a href={`mailto:gdgwowap@gmail.com`} className="text-google-blue hover:underline font-medium">{t("gdgwowapgmailcom")}</a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">{t("7_thirdparty_links")}</h2>
            <p>{t("our_platform_may_contain_links_to_thirdparty_websites_like_google_maps_or_sponsor_pages_we_are_not_responsible_for_the_privacy_practices_or_content_of_such_external_websites")}</p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">{t("8_changes_to_this_privacy_policy")}</h2>
            <p>{t("we_may_update_this_privacy_policy_from_time_to_time_we_will_notify_you_of_any_significant_changes_by_posting_the_new_policy_on_our_platform")}</p>
          </section>

          <section className="pt-8 border-t border-grey-bg">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">{t("9_contact_us")}</h2>
            <p className="mb-4">{t("if_you_have_any_questions_or_concerns_about_this_privacy_policy_please_contact_us_at")}</p>
            <div className="space-y-2 font-medium">
              <p>{mainData.eventInfo.name}{t("andhra_pradesh")}</p>
              <p>{t("email")}{" "}
                <a href={`mailto:gdgwowap@gmail.com`} className="text-google-blue hover:underline">{t("gdgwowapgmailcom")}</a>
              </p>
              <p>{t("website")}{" "}
                <a href={mainData.seo.hostUrl} className="text-google-blue hover:underline">
                  {mainData.seo.hostUrl}
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>;
}