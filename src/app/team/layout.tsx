import { Metadata } from "next";
import mainData from "@/data/config.json";

export const metadata: Metadata = {
  title: `Team - ${mainData.eventInfo.name} | ${mainData.communityName}`,
  description: `Meet the team behind ${mainData.eventInfo.name}.`,
  openGraph: {
    title: `Team - ${mainData.eventInfo.name} | ${mainData.communityName}`,
    description: `Meet the team behind ${mainData.eventInfo.name}.`,
  },
  twitter: {
    title: `Team - ${mainData.eventInfo.name} | ${mainData.communityName}`,
    description: `Meet the team behind ${mainData.eventInfo.name}.`,
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
