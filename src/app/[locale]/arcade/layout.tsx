import { Metadata } from "next";
import mainData from "@/data/config.json";

export const metadata: Metadata = {
    title: `Arcade - ${mainData.eventInfo.name} | ${mainData.communityName}`,
    description: "Play games, win prizes, and have fun at World of Wonders 2026!",
    openGraph: {
        title: `Arcade - ${mainData.eventInfo.name} | ${mainData.communityName}`,
        description: "Play games, win prizes, and have fun at World of Wonders 2026!",
    },
    twitter: {
        title: `Arcade - ${mainData.eventInfo.name} | ${mainData.communityName}`,
        description: "Play games, win prizes, and have fun at World of Wonders 2026!",
    },
};

export default function ArcadeLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
