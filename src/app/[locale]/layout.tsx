import type { Metadata } from "next";
import { Google_Sans, Google_Sans_Code } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

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
  authors: [{ name: "The Ananta Studio" }],
  creator: "The Ananta Studio",
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

import { AuthProvider } from "../../context/AuthContext";
import { AnalyticsProvider } from "../../components/AnalyticsProvider";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import { Footer } from "@/components/sections/Footer";
import { NextIntlClientProvider } from "next-intl";

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();
  return (
    <html lang={locale}
      className={`${googleSans.variable} ${googleSansCode.variable}`}
    >
      <head>
        <meta name="google-site-verification" content="HraCim0B4dPQGhFNZP9GzjjZC6ZtrJ-jj7zFf-70pUc" />
      </head>
      <body className="dark:bg-grey-900! dark:text-grey-bg!">
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <AnalyticsProvider>
              <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
              {/* Banner */}
              <AnnouncementBanner props={{ announcement: "GDG WOW 2026 is happening this year, bigger, better and bolder • Tickets open • Register Now • Follow us on Instagram • @gdgwowap" }} />

              {children}

              <Footer />
            </AnalyticsProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
