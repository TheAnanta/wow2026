import { Metadata } from "next";
import mainData from "@/data/config.json";

export const metadata: Metadata = {
  title: `Terms - ${mainData.eventInfo.name} | ${mainData.communityName}`,
  description: `Terms and conditions for ${mainData.eventInfo.name}.`,
  openGraph: {
    title: `Terms - ${mainData.eventInfo.name} | ${mainData.communityName}`,
    description: `Terms and conditions for ${mainData.eventInfo.name}.`,
  },
  twitter: {
    title: `Terms - ${mainData.eventInfo.name} | ${mainData.communityName}`,
    description: `Terms and conditions for ${mainData.eventInfo.name}.`,
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
