'use client';
import { useState } from "react";
import { analyticsService } from "../services/analytics";

export default function AnnouncementBanner({ props }: { props: { announcement: string } }) {

    const [showBanner, setShowBanner] = useState<boolean>(true);
    return showBanner && (
        <div className="bg-[#202124] dark:bg-black/80 text-white py-3 px-4 text-sm flex items-center relative overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee">
                {[1, 2, 3, 4].map((i) => (
                    <span key={i} className="flex items-center gap-4 px-8">
                        <span>🚨</span> {props.announcement} <span>🚨</span>
                    </span>
                ))}
            </div>
            <button
                className="absolute right-0 top-0 bottom-0 px-4 bg-[#202124]/90 backdrop-blur-sm border-none text-white text-xl cursor-pointer z-10 hover:bg-red-600 transition-colors"
                onClick={() => {
                    analyticsService.trackUI('announcement_banner', 'close', 'Global');
                    setShowBanner(false);
                }}
            >
                &times;
            </button>
        </div>
    );
}