import mainData from "@/data/config.json";
import Carousel from "../ui/Carousel";
import GALLERY_IMAGES from "@/data/gallery.json";

export default function EventMetricsSection() {
    const { stats } = mainData.eventInfo;
    const CARD_GRADIENTS = [
        'linear-gradient(90deg, rgb(66,133,244) -36.98%, rgb(66,133,244) 22.31%, rgb(52,168,83) 78.95%, rgb(52,168,83) 132.93%)',
        'linear-gradient(270deg, rgb(255,203,50) 6.94%, rgb(255,203,50) 27.99%, rgb(52,168,83) 73.59%, rgb(52,168,83) 94.64%)',
        'linear-gradient(90deg, rgb(255,203,50) -0.15%, rgb(255,203,50) 17.85%, rgb(244,104,49) 52.85%, rgb(234,67,53) 78.85%, rgb(234,67,53) 99.85%)',
        'linear-gradient(270deg, rgb(83,130,235) 1.91%, rgb(83,130,235) 25.69%, rgb(159,108,212) 51.37%, rgb(234,67,53) 79.9%, rgb(234,67,53) 97.02%)',
    ];

    return (
        <div className="flex flex-col align-center items-stretch justify-center gap-y-4 md:gap-x-6 md:flex-row mt-6">
            {/* Join a community card */}
            <div className="md:w-[38%] md:max-w-[420px] shrink-0">
                <div className="relative h-full bg-grey-bg dark:bg-grey border md:border-2 border-grey rounded-[16px] pb-[120px] overflow-hidden dark:border-white">
                    <div className="absolute bottom-0 right-0 md:max-w-[435px] rounded-br-[16px]">
                        <img src="https://io.google/2024/puzzle/media/images/landingpage.png" className="w-full h-full object-contain" alt="" loading="lazy" />
                    </div>
                    <div className="relative flex flex-col items-start p-6 mb-28">
                        <span className="text-grey dark:text-white mb-3 sm:l-h5 md:l-h4">
                            Break the loop
                        </span>
                        <p className="text-grey dark:text-white mb-6 sm:s-h6 md:l-h6">
                            Play games, win prizes, and show off your skills to get discounted tickets.
                        </p>
                        <a href="/register" className="cta-secondary">
                            Play Now
                        </a>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="w-full grid grid-cols-2 md:grid-cols-2 gap-4 md:max-w-[400px]">
                {stats.map((stat, index) => (
                    <div key={index} className="relative h-[120px] md:h-[184px]">
                        <div className="absolute bg-grey-bg dark:bg-grey w-full h-full rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg z-10 overflow-hidden">
                            <div className="flex flex-col items-center justify-center gap-y-1 h-full">
                                <p className='text-[36px] md:text-[64px] font-bold [-webkit-text-stroke:1.5px_black] md:[-webkit-text-stroke:3px_black] [paint-order:stroke_fill] text-white'>
                                    {stat.value}
                                </p>
                                <span className="text-grey dark:text-white font-medium text-[12px] md:text-[16px]">
                                    {stat.name}
                                </span>
                            </div>
                        </div>
                        <div
                            style={{ backgroundImage: CARD_GRADIENTS[index % 4] }}
                            className="absolute w-full h-full top-[8px] md:top-[16px] rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg bg-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Gallery/Codelabs */}
            <div className='w-full flex flex-col gap-4 shrink min-w-0'>
                <div className="border-[1.5px] md:border-2 rounded-[16px] w-full h-[200px] overflow-hidden">
                    <Carousel images={GALLERY_IMAGES} />
                </div>
                <a href="/explore" className="relative p-6 bg-grey-bg dark:bg-grey hover:bg-grey border-[1.5px] md:border-2 border-grey rounded-[16px] overflow-hidden dark:border-white transition-all">
                    <span className="mb-3 sm:s-h5 md:l-h5 text-black dark:text-white font-semibold">
                        Now in Google
                    </span>
                    <p className="mt-2 text-black dark:text-white sm:s-p2">Start coding today with self-paced exercises.</p>
                    <div className="mt-4 inline-block text-[14px] font-medium underline">Explore More</div>
                </a>
            </div>
        </div>
    );
}