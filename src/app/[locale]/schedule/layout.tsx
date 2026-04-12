import { Metadata } from "next";
import mainData from "@/data/config.json";

export const metadata: Metadata = {
  title: `Schedule - ${mainData.eventInfo.name} | ${mainData.communityName}`,
  description: `View the schedule for ${mainData.eventInfo.name}, including keynotes, sessions, and workshops.`,
  openGraph: {
    title: `Schedule - ${mainData.eventInfo.name} | ${mainData.communityName}`,
    description: `View the schedule for ${mainData.eventInfo.name}, including keynotes, sessions, and workshops.`,
  },
  twitter: {
    title: `Schedule - ${mainData.eventInfo.name} | ${mainData.communityName}`,
    description: `View the schedule for ${mainData.eventInfo.name}, including keynotes, sessions, and workshops.`,
  },
};

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
