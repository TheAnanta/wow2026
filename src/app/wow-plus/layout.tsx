import { Metadata } from "next";
import mainData from "@/data/config.json";

export const metadata: Metadata = {
    title: `The WOW+ Experience - ${mainData.eventInfo.name} | ${mainData.communityName}`,
    description: "Discover the WOW+ experience at World of Wonders 2026! Access exclusive features, content, and benefits with your WOW+ pass.",
    openGraph: {
        title: `The WOW+ Experience - ${mainData.eventInfo.name} | ${mainData.communityName}`,
        description: "Discover the WOW+ experience at World of Wonders 2026! Access exclusive features, content, and benefits with your WOW+ pass.",
    },
    twitter: {
        title: `The WOW+ Experience - ${mainData.eventInfo.name} | ${mainData.communityName}`,
        description: "Discover the WOW+ experience at World of Wonders 2026!  Access exclusive features, content, and benefits with your WOW+ pass.",
    },
};

export default function WOWPlusLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
