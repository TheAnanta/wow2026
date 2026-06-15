import type { Metadata } from "next";
import { Google_Sans_Code, Manrope } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const googleSans = localFont({
  src: [
    {
      path: "../../public/fonts/GoogleSans-Regular-v1.27.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GoogleSans-Italic-v1.27.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/GoogleSans-Medium-v1.27.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/GoogleSans-MediumItalic-v1.27.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/GoogleSans-Bold-v1.27.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/GoogleSans-BoldItalic-v1.27.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-google-sans",
});

const googleSansDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/GoogleSansDisplay-Regular-v1.27.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GoogleSansDisplay-Italic-v1.27.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/GoogleSansDisplay-Medium-v1.27.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/GoogleSansDisplay-MediumItalic-v1.27.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/GoogleSansDisplay-Bold-v1.27.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/GoogleSansDisplay-BoldItalic-v1.27.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-google-sans-display",
});

const googleSansCode = Google_Sans_Code({
  variable: "--font-google-sans-code",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

import mainData from "@/data/config.json";

export const metadata: Metadata = {

  metadataBase: new URL(mainData.seo.hostUrl),
  title: `${mainData.eventInfo.name} | ${mainData.communityName}`,
  description: mainData.eventInfo.description.short,
  keywords: mainData.seo.keywords,
  icons: {
    icon: "/gdg-logo.ico",
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
      className={`${googleSans.variable} ${googleSansDisplay.variable} ${googleSansCode.variable} ${manrope.variable}`}
    >
      <head>
        <meta name="google-site-verification" content="HraCim0B4dPQGhFNZP9GzjjZC6ZtrJ-jj7zFf-70pUc" />
      </head>
      <body className="dark:bg-grey-900! dark:text-grey-bg!">
        <AuthProvider>
          <AnalyticsProvider>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

            {/* Banner */}
            <AnnouncementBanner props={{ announcement: "GDG WOW 2026 tickets are live! Grab your Individual pass for ₹1,200 or Group Pass for 5 just at ₹4,000 (Save ₹2,000!) • Book your spot now!" }} />


            {children}

            <Footer />
          </AnalyticsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
