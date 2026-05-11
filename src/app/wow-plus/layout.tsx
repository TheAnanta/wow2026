import { Metadata } from "next";
import mainData from "@/data/config.json";

export const metadata: Metadata = {
    title: `The WOW+ Add-on - ${mainData.eventInfo.name} | ${mainData.communityName}`,
    description: "Discover the WOW+ Add-on for World of Wonders 2026! Access exclusive features, content, and benefits for your WOW pass.",
    openGraph: {
        title: `The WOW+ Add-on - ${mainData.eventInfo.name} | ${mainData.communityName}`,
        description: "Discover the WOW+ Add-on for World of Wonders 2026! Access exclusive features, content, and benefits for your WOW pass.",
    },
    twitter: {
        title: `The WOW+ Add-on - ${mainData.eventInfo.name} | ${mainData.communityName}`,
        description: "Discover the WOW+ Add-on for World of Wonders 2026! Access exclusive features, content, and benefits for your WOW pass.",
    },
};

export default function WOWPlusLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
