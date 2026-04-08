import { Metadata } from "next";
import mainData from "@/data/config.json";

export const metadata: Metadata = {
  title: `Community - ${mainData.eventInfo.name} | ${mainData.communityName}`,
  description: "Connect with the community and developer groups around you.",
  openGraph: {
    title: `Community - ${mainData.eventInfo.name} | ${mainData.communityName}`,
    description: "Connect with the community and developer groups around you.",
  },
  twitter: {
    title: `Community - ${mainData.eventInfo.name} | ${mainData.communityName}`,
    description: "Connect with the community and developer groups around you.",
  },
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
