import { Metadata } from "next";
import mainData from "@/data/config.json";

export const metadata: Metadata = {
  title: `Explore - ${mainData.eventInfo.name} | ${mainData.communityName}`,
  description: "Explore sessions, speakers, and workshops at WOW 2026.",
  openGraph: {
    title: `Explore - ${mainData.eventInfo.name} | ${mainData.communityName}`,
    description: "Explore sessions, speakers, and workshops at WOW 2026.",
  },
  twitter: {
    title: `Explore - ${mainData.eventInfo.name} | ${mainData.communityName}`,
    description: "Explore sessions, speakers, and workshops at WOW 2026.",
  },
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
