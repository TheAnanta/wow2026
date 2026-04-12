import { useTranslations } from "next-intl";
export default function WhatToExpectSection() {
  const t = useTranslations();
  return <><div className="flex flex-col md:flex-row justify-between md:items-center mb-8 mt-6 md:mt-12">
        <span className="font-medium text-left sm:s-h3 md:l-h3">{t("what_to_expect_at_wow")}</span>
        <div className="cta-link-btn !text-[16px] text-md:!text-[20px] mt-3 md:mt-0 pl-0 inline-block">
            <p><a href="/explore">{t("view_all_learning_material")}</a></p>
        </div>
    </div>
        <div className="grid md:grid-cols-3 gap-4 md:justify-between md:gap-[32px] md:h-[240px]">

            <a href="/explore" data-analytics-event="content_card_select" data-analytics-event-data="{&quot;cardName&quot;: &quot;codelab&quot;}" className="group mb-0 inline-block p-6 bg-grey-bg dark:bg-grey! dark:hover:bg-grey-bg! hover:bg-grey w-full lg:min-w-[320px] min-[1288px]:min-w-[400px]! border-[1px] md:border-2 border-grey rounded-[16px] overflow-hidden dark:border-white hover:border-white dark:hover:border-grey hover:ring-[1px] hover:md:ring-2 hover:ring-offset-4 hover:ring-grey dark:hover:ring-0 dark:hover:ring-offset-0 dark:hover:outline dark:hover:outline-white dark:hover:outline-2 dark:hover:outline-offset-8">
                <img src="/images/io24-codelabs-icon.svg" className="max-w-[170px] dark:hidden group-hover:hidden! dark:group-hover:inline-block! " role="img" aria-hidden="true" />
                <img src="/images/io24-codelabs-icon-dark.svg" className="max-w-[170px] hidden dark:inline-block group-hover:inline-block dark:group-hover:hidden! " role="img" aria-hidden="true" />
                <div className="mt-6">
                    <span className="font-medium mb-3 sm:s-h5 md:l-h5 text-black dark:text-white group-hover:text-white dark:group-hover:text-black">{t("talks_and_conference")}</span>
                    <p className="font-normal sm:s-p2 text-black dark:text-white group-hover:text-white dark:group-hover:text-black">{t("find_the_latest_updates_and_insights_on_google_technologies")}</p>
                </div>
            </a>

            <a href="/explore?q=workshop" data-analytics-event="content_card_select" data-analytics-event-data="{&quot;cardName&quot;: &quot;workshop&quot;}" className="group mb-0 inline-block p-6 bg-grey-bg dark:bg-grey! dark:hover:bg-grey-bg! hover:bg-grey w-full lg:min-w-[320px] min-[1288px]:min-w-[400px]! border-[1px] md:border-2 border-grey rounded-[16px] overflow-hidden dark:border-white hover:border-white dark:hover:border-grey hover:ring-[1px] hover:md:ring-2 hover:ring-offset-4 hover:ring-grey dark:hover:ring-0 dark:hover:ring-offset-0 dark:hover:outline dark:hover:outline-white dark:hover:outline-2 dark:hover:outline-offset-8">
                <img src="/images/io24-workshops-icon.svg" className="max-w-[170px] dark:hidden group-hover:hidden! dark:group-hover:inline-block! " role="img" aria-hidden="true" />
                <img src="/images/io24-workshops-icon-dark.svg" className="max-w-[170px] hidden dark:inline-block group-hover:inline-block dark:group-hover:hidden! " role="img" aria-hidden="true" />
                <div className="mt-6">
                    <span className="font-medium mb-3 sm:s-h5 md:l-h5 text-black dark:text-white group-hover:text-white dark:group-hover:text-black">{t("workshops")}</span>
                    <p className="font-normal sm:s-p2 text-black dark:text-white group-hover:text-white dark:group-hover:text-black">{t("grow_your_skills_through_guided_codelabs_and_handson_workshops")}</p>
                </div>
            </a>

            <a href="" data-analytics-event="content_card_select" data-analytics-event-data="{&quot;cardName&quot;: &quot;demo&quot;}" className="group mb-0 inline-block p-6 bg-grey-bg dark:bg-grey! dark:hover:bg-grey-bg! hover:bg-grey w-full lg:min-w-[320px] min-[1288px]:min-w-[400px]! border-[1px] md:border-2 border-grey rounded-[16px] overflow-hidden dark:border-white hover:border-white dark:hover:border-grey hover:ring-[1px] hover:md:ring-2 hover:ring-offset-4 hover:ring-grey dark:hover:ring-0 dark:hover:ring-offset-0 dark:hover:outline dark:hover:outline-white dark:hover:outline-2 dark:hover:outline-offset-8">
                <img src="/images/io24-demos-icon.svg" className="max-w-[170px] dark:hidden group-hover:hidden! dark:group-hover:inline-block! ml-[-1rem]" role="img" aria-hidden="true" />
                <img src="/images/io24-demos-icon-dark.svg" className="max-w-[170px] hidden dark:inline-block group-hover:inline-block dark:group-hover:hidden! ml-[-1rem]" role="img" aria-hidden="true" />
                <div className="mt-6">
                    <span className="font-medium mb-3 sm:s-h5 md:l-h5 text-black dark:text-white group-hover:text-white dark:group-hover:text-black">{t("hackathon")}</span>
                    <p className="font-normal sm:s-p2 text-black dark:text-white group-hover:text-white dark:group-hover:text-black">{t("put_your_skills_to_the_test_with_other_developers")}</p>
                </div>
            </a>
        </div></>;
}