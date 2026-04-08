import { Metadata } from "next";
import mainData from "@/data/config.json";

export const metadata: Metadata = {
  title: `Register - ${mainData.eventInfo.name} | ${mainData.communityName}`,
  description: `Join us for ${mainData.eventInfo.name}! Register now to save your spot.`,
  openGraph: {
    title: `Register - ${mainData.eventInfo.name} | ${mainData.communityName}`,
    description: `Join us for ${mainData.eventInfo.name}! Register now to save your spot.`,
  },
  twitter: {
    title: `Register - ${mainData.eventInfo.name} | ${mainData.communityName}`,
    description: `Join us for ${mainData.eventInfo.name}! Register now to save your spot.`,
  },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
