/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import announcements from "@/data/announcements.json";
import Marquee from "react-fast-marquee";

function getAnnouncements(announcements: any[]) {
  const items = Math.max(8 / announcements.length, 1);
  for (let i = 1; i < items; i++) {
    announcements.push(...announcements);
  }
  return announcements;
}

export default function AnnouncementBar() {
  return (
    <div className="relative z-20 flex pt-8 -translate-y-5 pb-4 border-b-2 border-l-2 border-r-2 gap-4 md:gap-8 bg-[#c3ecf6] text-black dark:bg-black dark:text-white dark:md:border-gray-700 dark:border-black md:rounded-3xl md:rounded-t-none pl-4 py-3 md:mx-[unset]">
      <p className="font-bold flex items-center gap-2 google-font">
        Announcements{" "}
        <img className="size-4" src="/icons/bullhorn-variant-outline.svg" />
      </p>
      <Marquee>
        {getAnnouncements(announcements).map((item, index) => (
          <>
            <div key={index} className="w-max mx-5 google-font">
              {item.text}
              {item.action && (
                <a
                  href={item.action.link}
                  className="font-bold text-[#174ea6] dark:text-blue-500 underline decoration-[2px] underline-offset-[5.5px] mx-2"
                  target="_blank"
                >
                  {item.action.linkText}
                </a>
              )}
            </div>
            <p className="inline">•</p>
          </>
        ))}
      </Marquee>
    </div>
  );
}
