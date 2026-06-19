export default function EventMetricsSection() {
    const CARD_GRADIENTS = [
        'linear-gradient(90deg, rgb(66,133,244) -36.98%, rgb(66,133,244) 22.31%, rgb(52,168,83) 78.95%, rgb(52,168,83) 132.93%)',
        'linear-gradient(270deg, rgb(255,203,50) 6.94%, rgb(255,203,50) 27.99%, rgb(52,168,83) 73.59%, rgb(52,168,83) 94.64%)',
        'linear-gradient(90deg, rgb(255,203,50) -0.15%, rgb(255,203,50) 17.85%, rgb(244,104,49) 52.85%, rgb(234,67,53) 78.85%, rgb(234,67,53) 99.85%)',
        'linear-gradient(270deg, rgb(83,130,235) 1.91%, rgb(83,130,235) 25.69%, rgb(159,108,212) 51.37%, rgb(234,67,53) 79.9%, rgb(234,67,53) 97.02%)',
    ];

    return (
        <div className="h-countdown mt-6">
            <div className="grid grid-cols-countdown-cards-2 md:grid-cols-countdown-cards-4 pb-[2.3rem] gap-y-8 gap-6">
            {/* Card 1: Sessions */}
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
                                key={5}
                                src={`https://io.google/2024/app/images/io24-cd-${5}.svg`}
                                aria-hidden="true"
                                width="80"
                                height="88"
                                className="w-auto h-auto hcm-button"
                                loading="lazy"
                            />
                        </div>
                        <span className="visually-hidden">{'Sessions'}</span>
                        <span className="text-grey dark:text-white font-medium text-[14px] md:text-[18.567px]">
                            {'Sessions'}
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

            {/* Card 2: Days */}
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

            {/* Card 3: Attendees */}
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
                            <p className="text-[52px] leading-[46px] md:text-[116px] md:leading-[96px] font-bold [-webkit-text-stroke:2px_black] md:[-webkit-text-stroke:4.5px_black] [paint-order:stroke_fill] text-white">
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

            {/* Card 4: Speakers */}
            <div className="relative h-[90px] md:h-[184px]">
                {/* Front card */}
                <div className="absolute bg-grey-bg dark:bg-grey! w-full h-full rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg z-10 overflow-hidden">
                    <div className="flex flex-col items-center justify-center gap-y-1 h-full">
                        <div className="flex flex-row justify-center gap-2 h-[50%] md:h-[90px]">
                            <img
                                key={2}
                                src={`https://io.google/2024/app/images/io24-cd-${5}.svg`}
                                aria-hidden="true"
                                width="80"
                                height="88"
                                className="w-auto h-auto hcm-button"
                                loading="lazy"
                            />
                            <img
                                key={4}
                                src={`https://io.google/2024/app/images/io24-cd-${0}.svg`}
                                aria-hidden="true"
                                width="80"
                                height="88"
                                className="w-auto h-auto hcm-button"
                                loading="lazy"
                            />
                        </div>
                        <span className="visually-hidden">{'Speaker'}</span>
                        <span className="text-grey dark:text-white font-medium text-[14px] md:text-[18.567px]">
                            {'Speakers'}
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
    </div>
);
}