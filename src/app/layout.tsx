import "./globals.css";
import config from "@/data/config.json";
import NavigationBar from "@/components/common/navigation_bar";
import AnnouncementBar from "@/components/common/announcement_bar";
import Footer from "@/components/footer";
import { AuthContextProvider } from "@/context/AuthContext";
import CommonNavigationRail from "@/components/common/navigation_rail";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: config.eventInfo.name + " | " + config.communityName,
    template: "%s - " + config.eventInfo.name + " | " + config.communityName,
  },
  description: config.eventInfo.description.short,
  keywords: config.seo.keywords,
  authors: [{ name: "The Ananta Studio", url: "https://github.com/TheAnanta" }],
  creator: "The Ananta Studio",
  openGraph: {
    locale: "en_US",
    title: config.eventInfo.name + " | " + config.communityName,
    description: config.eventInfo.description.short,
    images: [
      `${config.seo.hostUrl}/thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
    ],
    url: config.seo.hostUrl,
    type: "website",
  },
  viewport: "width=device-width, initial-scale=1.0",
  twitter: {
    title: config.eventInfo.name + " | " + config.communityName,
    description: config.eventInfo.description.short,
    images: [
      `${config.seo.hostUrl}/thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
    ],
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="use-credentials"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Google+Sans:400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`antialiased`}>
        <div className="h-screen overflow-hidden">
          <AuthContextProvider>
            <>
              <Script
                id="phonepe-checkout-js"
                src="https://mercury.phonepe.com/web/bundle/checkout.js"
              />
              <CommonNavigationRail />
              {/* <div className="h-[24px] md:hidden" /> */}
              <div className="h-full overflow-y-scroll md:overflow-y-auto grow md:grow-0 ">
                <div className="w-full md:w-[unset] md:max-w-[1600px] mx-auto md:px-6 lg:px-16 md:py-6 md:pt-3">
                  <NavigationBar />
                  <AnnouncementBar />
                  {children}
                </div>
                <Footer />
              </div>
            </>
          </AuthContextProvider>
        </div>
      </body>
    </html>
  );
}
