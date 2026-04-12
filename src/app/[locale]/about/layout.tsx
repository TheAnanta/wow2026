import { Metadata } from "next";
import mainData from "@/data/config.json";

export const metadata: Metadata = {
  title: `About - ${mainData.eventInfo.name} | ${mainData.communityName}`,
  description: "Discover everything you need to know about World of Wonders 2026 and get answers to your questions.",
  openGraph: {
    title: `About - ${mainData.eventInfo.name} | ${mainData.communityName}`,
    description: "Discover everything you need to know about World of Wonders 2026 and get answers to your questions.",
  },
  twitter: {
    title: `About - ${mainData.eventInfo.name} | ${mainData.communityName}`,
    description: "Discover everything you need to know about World of Wonders 2026 and get answers to your questions.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
