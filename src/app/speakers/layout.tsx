import { Metadata } from "next";
import mainData from "@/data/config.json";

export const metadata: Metadata = {
  title: `Speakers - ${mainData.eventInfo.name} | ${mainData.communityName}`,
  description: `Meet the speakers of ${mainData.eventInfo.name}.`,
  openGraph: {
    title: `Speakers - ${mainData.eventInfo.name} | ${mainData.communityName}`,
    description: `Meet the speakers of ${mainData.eventInfo.name}.`,
  },
  twitter: {
    title: `Speakers - ${mainData.eventInfo.name} | ${mainData.communityName}`,
    description: `Meet the speakers of ${mainData.eventInfo.name}.`,
  },
};

export default function SpeakersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
