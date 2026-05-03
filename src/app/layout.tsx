import type { Metadata } from "next";
import { Google_Sans, Google_Sans_Code } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

const googleSansCode = Google_Sans_Code({
  variable: "--font-google-sans-code",
  subsets: ["latin"],
});

import mainData from "@/data/config.json";

export const metadata: Metadata = {

  metadataBase: new URL(mainData.seo.hostUrl),
  title: `${mainData.eventInfo.name} | ${mainData.communityName}`,
  description: mainData.eventInfo.description.short,
  keywords: mainData.seo.keywords,
  icons: {
    icon: "/gdg-logo.webp",
  },
  authors: [{ name: "Google Developer Groups" }],
  creator: "Google Developer Groups",
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: `${mainData.eventInfo.name} | ${mainData.communityName}`,
    description: mainData.eventInfo.description.short,
    url: mainData.seo.hostUrl,
    siteName: mainData.eventInfo.name,
    images: [
      {
        url: `${mainData.seo.hostUrl}/thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
        width: 1024,
        height: 512,
        alt: mainData.eventInfo.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${mainData.eventInfo.name} | ${mainData.communityName}`,
    description: mainData.eventInfo.description.short,
    images: [`${mainData.seo.hostUrl}/thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`],
  },
};

import { AuthProvider } from "../context/AuthContext";
import { AnalyticsProvider } from "../components/AnalyticsProvider";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import { Footer } from "@/components/sections/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${googleSans.variable} ${googleSansCode.variable}`}
    >
      <head>
        <meta name="google-site-verification" content="HraCim0B4dPQGhFNZP9GzjjZC6ZtrJ-jj7zFf-70pUc" />
      </head>
      <body className="dark:bg-grey-900! dark:text-grey-bg!">
        <AuthProvider>
          <AnalyticsProvider>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            {/* Banner */}
            {/* <AnnouncementBanner props={{ announcement: "GDG WOW 2026 is happening this year, bigger, better and bolder • Tickets open • Register Now • Follow us on Instagram • @gdgwowap" }} /> */}

            {children}

            <Footer />
          </AnalyticsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
