'use client';
import { useState } from "react";

export default function AnnouncementBanner({ props }: { props: { announcement: string } }) {

    const [showBanner, setShowBanner] = useState<boolean>(true);
    return showBanner && (
        <div className="bg-[#202124] text-white py-3 px-4 text-center text-sm flex justify-center items-center relative">
            <span>{props.announcement}</span>
            <button
                className="absolute right-4 bg-transparent border-none text-white text-xl cursor-pointer"
                onClick={() => setShowBanner(false)}
            >
                &times;
            </button>
        </div>
    );
}