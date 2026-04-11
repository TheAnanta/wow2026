import Carousel from "../ui/Carousel";
import GALLERY_IMAGES from "@/data/gallery.json";

export default function EventMetricsSection() {
    const CARD_GRADIENTS = [
        'linear-gradient(90deg, rgb(66,133,244) -36.98%, rgb(66,133,244) 22.31%, rgb(52,168,83) 78.95%, rgb(52,168,83) 132.93%)',
        'linear-gradient(270deg, rgb(255,203,50) 6.94%, rgb(255,203,50) 27.99%, rgb(52,168,83) 73.59%, rgb(52,168,83) 94.64%)',
        'linear-gradient(90deg, rgb(255,203,50) -0.15%, rgb(255,203,50) 17.85%, rgb(244,104,49) 52.85%, rgb(234,67,53) 78.85%, rgb(234,67,53) 99.85%)',
        'linear-gradient(270deg, rgb(83,130,235) 1.91%, rgb(83,130,235) 25.69%, rgb(159,108,212) 51.37%, rgb(234,67,53) 79.9%, rgb(234,67,53) 97.02%)',
    ];

    return (<div className="flex flex-col items-stretch justify-center gap-y-4 md:gap-x-6 md:flex-row md:flex-wrap 3xl:flex-nowrap mt-6">
        {/* Join a community card */}
        <div className="md:flex-1 3xl:flex-none 3xl:w-[38%] 3xl:max-w-[420px]">
            <div className="relative h-full bg-grey-bg dark:bg-grey! border md:border-2 border-grey rounded-[16px] pb-[120px] overflow-hidden dark:border-white">
                <div className="absolute bottom-0 right-0 md:max-w-[435px] rounded-br-[16px]">
                    <img src="/images/landingpage.png" className="inline-block md:hidden dark:hidden -mr-[2px]" role="img" aria-hidden="true" width="283" height="172" alt="" loading="lazy" />
                    <img src="/images/landingpage.png" className="hidden dark:inline-block dark:md:hidden -mr-[2px]" role="img" aria-hidden="true" width="283" height="172" alt="" loading="lazy" />
                    <img src="/images/landingpage.png" className="hidden md:inline-block object-cover dark:hidden" role="img" aria-hidden="true" width="274" height="197" alt="" loading="lazy" />
                    <img src="/images/landingpage.png" className="hidden dark:md:inline-block object-cover lg:object-contain object-left lg:object-right -mr-[2px] max-w-[272px]" role="img" aria-hidden="true" width="437" height="270" alt="" loading="lazy" />
                </div>
                <div className="relative flex flex-col items-start p-6 ml:p-6 mb-28 sm:mb-16 md:mb-20">
                    <span className="text-grey dark:text-white mb-3 text-md:mb-4 sm:l-h5 md:l-h4 text-md:tracking-tight">
                        Break the loop
                    </span>
                    <p className="text-grey dark:text-white mb-3 text-md:mb-6 sm:max-w-[70%] md:max-w-none sm:s-h6 md:l-h6">
                        Play games, win prizes, and show off your skills to get discounted tickets.
                    </p>
                    <a
                        href="/arcade"
                        data-analytics-event="cta_community"
                        data-analytics-event-data='{"cta_position": "body"}'
                        className="cta-secondary"
                        aria-label="Get started with joining an WOW community group, opens Community page"
                        rel="noopener"
                    >
                        Play Now
                    </a>
                </div>
            </div>
        </div>
        <div className='w-full grid grid-cols-1 gap-y-9 mb-5 md:mb-[unset] md:gap-y-4 md:max-w-[200px]'>
            <div className="relative h-[90px] md:h-[184px]">
                {/* Front card */}
                <div className="absolute bg-grey-bg dark:bg-grey! w-full h-full rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg z-10 overflow-hidden">
                    <div className="flex flex-col items-center justify-center gap-y-1 h-full">
                        <div className="flex flex-row justify-center gap-2 h-[50%] md:h-[90px]">
                            <img
                                key={7}
                                src={`https://io.google/2024/app/images/io24-cd-${7}.svg`}
                                aria-hidden="true"
                                width="80"
                                height="88"
                                className="w-auto h-auto hcm-button"
                                loading="lazy"
                            />
                            <img
                                key={2}
                                src={`https://io.google/2024/app/images/io24-cd-${2}.svg`}
                                aria-hidden="true"
                                width="80"
                                height="88"
                                className="w-auto h-auto hcm-button"
                                loading="lazy"
                            />
                        </div>
                        <span className="visually-hidden">{'Flagship Events'}</span>
                        <span className="text-grey dark:text-white font-medium text-[14px] md:text-[18.567px]">
                            {'Flagship Events'}
                        </span>
                    </div>
                </div>
                {/* Shadow cards */}
                <div
                    style={{ backgroundImage: CARD_GRADIENTS[0] }}
                    className="absolute w-full h-full top-[23px] md:top-[36px] rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg bg-cover"
                />
                <div
                    style={{ backgroundImage: CARD_GRADIENTS[0] }}
                    className="absolute w-full h-full top-[11px] md:top-[19px] rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg bg-cover"
                />
            </div>

            <div className="relative h-[90px] md:h-[184px]">
                {/* Front card */}
                <div className="absolute bg-grey-bg dark:bg-grey! w-full h-full rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg z-10 overflow-hidden">
                    <div className="flex flex-col items-center justify-center gap-y-1 h-full">
                        <div className="flex flex-row justify-center gap-2 h-[50%] md:h-[90px]">
                            <img
                                key={2}
                                src={`https://io.google/2024/app/images/io24-cd-${2}.svg`}
                                aria-hidden="true"
                                width="80"
                                height="88"
                                className="w-auto h-auto hcm-button"
                                loading="lazy"
                            />
                        </div>
                        <span className="visually-hidden">{'2 Days'}</span>
                        <span className="text-grey dark:text-white font-medium text-[14px] md:text-[18.567px]">
                            {'Days'}
                        </span>
                    </div>
                </div>
                {/* Shadow cards */}
                <div
                    style={{ backgroundImage: CARD_GRADIENTS[2] }}
                    className="absolute w-full h-full top-[23px] md:top-[36px] rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg bg-cover"
                />
                <div
                    style={{ backgroundImage: CARD_GRADIENTS[2] }}
                    className="absolute w-full h-full top-[11px] md:top-[19px] rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg bg-cover"
                />
            </div>

        </div>
        <div className='w-full grid grid-cols-1 gap-y-9 mb-5 md:mb-[unset] md:gap-y-4 md:max-w-[282px]'>
            <div className="relative h-[90px] md:h-[184px]">
                {/* Front card */}
                <div className="absolute bg-grey-bg dark:bg-grey! w-full h-full rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg z-10 overflow-hidden">
                    <div className="flex flex-col items-center justify-center gap-y-1 h-full">
                        <div className="flex flex-row justify-center gap-2 h-[50%] md:h-[90px]">
                            <img
                                key={2}
                                src={`https://io.google/2024/app/images/io24-cd-${2}.svg`}
                                aria-hidden="true"
                                width="80"
                                height="88"
                                className="w-auto h-auto hcm-button"
                                loading="lazy"
                            />
                            <p className='text-[52px] leading-[46px] md:text-[116px] md:leading-[96px] font-bold [-webkit-text-stroke:2px_black] md:[-webkit-text-stroke:4.5px_black] [paint-order:stroke_fill] text-white'>
                                K+
                            </p>
                        </div>
                        <span className="visually-hidden">{'Attendees'}</span>
                        <span className="text-grey dark:text-white font-medium text-[14px] md:text-[18.567px]">
                            {'Attendees'}
                        </span>
                    </div>
                </div>
                {/* Shadow cards */}
                <div
                    style={{ backgroundImage: CARD_GRADIENTS[1] }}
                    className="absolute w-full h-full top-[23px] md:top-[36px] rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg bg-cover"
                />
                <div
                    style={{ backgroundImage: CARD_GRADIENTS[1] }}
                    className="absolute w-full h-full top-[11px] md:top-[19px] rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg bg-cover"
                />
            </div>

            <div className="relative h-[90px] md:h-[184px]">
                {/* Front card */}
                <div className="absolute bg-grey-bg dark:bg-grey! w-full h-full rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg z-10 overflow-hidden">
                    <div className="flex flex-col items-center justify-center gap-y-1 h-full">
                        <div className="flex flex-row justify-center gap-2 h-[50%] md:h-[90px]">
                            <img
                                key={2}
                                src={`https://io.google/2024/app/images/io24-cd-${2}.svg`}
                                aria-hidden="true"
                                width="80"
                                height="88"
                                className="w-auto h-auto hcm-button"
                                loading="lazy"
                            />
                            <img
                                key={4}
                                src={`https://io.google/2024/app/images/io24-cd-${4}.svg`}
                                aria-hidden="true"
                                width="80"
                                height="88"
                                className="w-auto h-auto hcm-button"
                                loading="lazy"
                            />
                        </div>
                        <span className="visually-hidden">{'Workshops'}</span>
                        <span className="text-grey dark:text-white font-medium text-[14px] md:text-[18.567px]">
                            {'Workshops'}
                        </span>
                    </div>
                </div>
                {/* Shadow cards */}
                <div
                    style={{ backgroundImage: CARD_GRADIENTS[3] }}
                    className="absolute w-full h-full top-[23px] md:top-[36px] rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg bg-cover"
                />
                <div
                    style={{ backgroundImage: CARD_GRADIENTS[3] }}
                    className="absolute w-full h-full top-[11px] md:top-[19px] rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg bg-cover"
                />
            </div>
        </div>

        <div className='w-full grid grid-cols-1 md:grid-cols-2 3xl:flex 3xl:flex-col! gap-4 3xl:flex-1! min-w-0 min-h-0'>
            <div className="border-[1.5px] md:border-2 rounded-[16px] w-full h-[200px] md:h-full 3xl:h-[220px]! overflow-hidden flex flex-col">
                <Carousel images={GALLERY_IMAGES} />
            </div>
            <a href="/now-in-google" data-analytics-event="content_card_select" data-analytics-event-data="{&quot;cardName&quot;: &quot;codelab&quot;}"
                className="relative shrink-0 group mb-0 flex flex-col p-6 bg-grey-bg dark:bg-grey! dark:hover:bg-grey-bg! hover:bg-grey w-full h-full 3xl:h-auto! 3xl:flex-1! border-[1px] md:border-2 border-grey rounded-[16px] overflow-hidden dark:border-white hover:border-white dark:hover:border-grey hover:ring-[1px] hover:md:ring-2 hover:ring-offset-4 hover:ring-grey dark:hover:ring-0 dark:hover:ring-offset-0 dark:hover:outline dark:hover:outline-white dark:hover:outline-2 dark:hover:outline-offset-8">
                <div className="mb-4 pb-8">
                    <span className="mb-3 sm:s-h5 md:l-h5 text-black dark:text-white group-hover:text-white dark:group-hover:text-black font-semibold!">
                        Now in Google
                    </span>
                    <p className="mb-8 mt-2 font-normal sm:s-p2 text-black dark:text-white group-hover:text-white dark:group-hover:text-black">Start coding today with self-paced exercises.</p>
                    <a
                        data-analytics-event-data='{"cta_position": "body"}'
                        className="cta-secondary group-hover:text-white dark:group-hover:text-black group-hover:border-white dark:group-hover:border-black">Install</a>
                </div>
                <img src="/images/io24-learning-cta.webp" className="ml-auto max-w-[170px] absolute right-4 bottom-4 dark:hidden group-hover:hidden! dark:group-hover:inline-block! " role="img" aria-hidden="true" />
                <img src="/images/io24-learning-cta-dark.webp" className="ml-auto max-w-[170px] absolute right-4 bottom-4 hidden dark:inline-block group-hover:inline-block dark:group-hover:hidden! " role="img" aria-hidden="true" />
            </a>
        </div>

    </div>);
}