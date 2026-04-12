import { Metadata } from "next";
import mainData from "@/data/config.json";

export const metadata: Metadata = {
    title: `Code of Conduct - ${mainData.eventInfo.name} | ${mainData.communityName}`,
    description: "Code of Conduct for World of Wonders 2026",
    openGraph: {
        title: `Code of Conduct - ${mainData.eventInfo.name} | ${mainData.communityName}`,
        description: "Code of Conduct for World of Wonders 2026",
    },
    twitter: {
        title: `Code of Conduct - ${mainData.eventInfo.name} | ${mainData.communityName}`,
        description: "Code of Conduct for World of Wonders 2026",
    },
};

export default function CodeOfConductLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
