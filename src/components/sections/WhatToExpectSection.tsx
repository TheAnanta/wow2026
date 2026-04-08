import mainData from "@/data/config.json";

export default function WhatToExpectSection() {
    const { whatToExpect } = mainData.eventInfo;
    return (
        <>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 mt-6 md:mt-12">
                <span className="font-medium text-left sm:s-h3 md:l-h3">
                    What to expect at {mainData.eventInfo.name}
                </span>
                <div className="cta-link-btn !text-[16px] text-md:!text-[20px] mt-3 md:mt-0 pl-0 inline-block">
                    <p><a href="/explore">Explore all sessions</a></p>
                </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 md:justify-between md:gap-[32px]">
                {whatToExpect.map((item, index) => (
                    <div
                        key={index}
                        className="group mb-0 inline-block p-6 bg-grey-bg dark:bg-grey hover:bg-grey w-full border-[1.5px] md:border-2 border-grey rounded-[16px] overflow-hidden dark:border-white transition-all shadow-sm"
                    >
                        <div className="mt-2">
                            <span className="font-medium mb-3 sm:s-h5 md:l-h5 text-black dark:text-white">
                                {item.title}
                            </span>
                            <p className="font-normal sm:s-p2 text-black dark:text-white mt-2">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}