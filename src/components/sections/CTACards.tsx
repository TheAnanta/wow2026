// src/components/sections/CTACards.tsx

export function CTACards() {
  return (
    <div className="flex flex-col align-center items-stretch justify-center mt-4 md:mt-10 gap-y-4 md:gap-x-8 md:flex-row">
      {/* Plan your I/O card */}
      <div className="flex w-full md:w-2/3">
        <div className="h-full flex flex-col bg-grey-bg dark:bg-grey border md:border-2 border-grey rounded-[16px] overflow-hidden dark:border-white lg:flex-row flex-1">
          <div className="flex flex-col items-start p-6 pb-0 ml:p-10 ml:pb-0 lg:pr-0 lg:w-2/5">
            <span className="text-grey dark:text-white mb-3 text-md:mb-4 sm:l-h5 md:l-h4">
              Plan your I/O
            </span>
            <p className="text-grey dark:text-white mb-3 text-md:mb-6 sm:s-h6 md:l-h6">
              Visit My I/O for saved content and recommendations based on your personal interests.
            </p>
            <a
              href="https://io.google/2024/explore/#my-io-2024"
              className="cta-secondary"
              aria-label="Get started with planning your I/O, opens explore page"
              rel="noopener"
              data-analytics-event="cta_event_info"
              data-analytics-event-data='{"cta_position": "body"}'
            >
              Get started
            </a>
          </div>
          <div className="flex justify-end lg:justify-center lg:items-end lg:w-3/5">
            <img src="https://io.google/2024/app/images/io24-planio-cta-mobile.webp" className="inline-block dark:hidden mb-4 mr-4 md:hidden" role="img" aria-hidden="true" width="245" height="193" alt="" loading="lazy" />
            <img src="https://io.google/2024/app/images/io24-planio-cta-mobile-dark.webp" className="hidden dark:inline-block mb-4 mr-4 dark:md:hidden" role="img" aria-hidden="true" width="245" height="193" alt="" loading="lazy" />
            <img src="https://io.google/2024/app/images/io24-planio-cta.svg" className="hidden md:inline-block dark:hidden" role="img" aria-hidden="true" width="437" height="348" alt="" loading="lazy" />
            <img src="https://io.google/2024/app/images/io24-planio-cta-dark.svg" className="hidden dark:md:inline-block" role="img" aria-hidden="true" width="437" height="348" alt="" loading="lazy" />
          </div>
        </div>
      </div>

      {/* Join a community card */}
      <div className="md:w-[38%] md:max-w-[484px]">
        <div className="relative h-full bg-grey-bg dark:bg-grey border md:border-2 border-grey rounded-[16px] overflow-hidden dark:border-white">
          <div className="absolute bottom-0 right-0 md:max-w-[435px] rounded-br-[16px]">
            <img src="https://io.google/2024/app/images/io24-join-community-cta-mobile.svg" className="inline-block md:hidden dark:hidden -mr-[2px]" role="img" aria-hidden="true" width="283" height="172" alt="" loading="lazy" />
            <img src="https://io.google/2024/app/images/io24-join-community-cta-mobile-dark.svg" className="hidden dark:inline-block dark:md:hidden -mr-[2px]" role="img" aria-hidden="true" width="283" height="172" alt="" loading="lazy" />
            <img src="https://io.google/2024/app/images/io24-join-community-cta-v2.svg" className="hidden md:inline-block object-cover dark:hidden" role="img" aria-hidden="true" width="274" height="197" alt="" loading="lazy" />
            <img src="https://io.google/2024/app/images/io24-join-community-cta-dark.svg" className="hidden dark:md:inline-block object-cover lg:object-contain object-left lg:object-right -mr-[2px] max-w-[272px]" role="img" aria-hidden="true" width="437" height="270" alt="" loading="lazy" />
          </div>
          <div className="relative flex flex-col items-start p-6 ml:p-10 mb-28 sm:mb-16 md:mb-20">
            <span className="text-grey dark:text-white mb-3 text-md:mb-4 sm:l-h5 md:l-h4 text-md:tracking-tight">
              Join a community group
            </span>
            <p className="text-grey dark:text-white mb-3 text-md:mb-6 sm:max-w-[70%] md:max-w-none sm:s-h6 md:l-h6">
              Meet developers, discover local groups, and build your global network.
            </p>
            <a
              href="https://io.google/2024/community/"
              data-analytics-event="cta_community"
              data-analytics-event-data='{"cta_position": "body"}'
              className="cta-secondary"
              aria-label="Get started with joining an I/O community group, opens Community page"
              rel="noopener"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
