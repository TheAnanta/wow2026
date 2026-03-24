"use client";
import { useEffect } from "react";
import mainData from "@/data/config.json";

export default function SponsorUs() {
  useEffect(() => {
    document.title = `Sponsor Us - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute(
        "content",
        `Sponsor Us - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute(
        "content",
        `Sponsor Us - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
  }, []); // Set title and meta tags on component mount
  return (
    <div className="flex flex-col gap-4">
      {/* <h1 className="text-5xl font-bold">Sponsor Us</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mi
        justo. Donec ac ligula nec enim efficitur facilisis. Donec ac ligula nec
        enim efficitur facilisis. Donec ac ligula nec enim efficitur facilisis.
      </p> */}
      <iframe
        title="Sponsorship Prospectus"
        src="https://docs.google.com/gview?url=https://wow.vizag.dev/Wonder%20of%20Wonders%202026%20-%20Default.pdf&embedded=true"
        className="w-full h-[80vh] border-2 border-black dark:border-white rounded-3xl"
      ></iframe>
    </div>
  );
}
