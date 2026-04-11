"use client";
import React, { useEffect } from "react";
import mainData from "@/data/config.json";
import { Header } from "@/components/sections/Header";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = `Privacy Policy - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute(
        "content",
        `Privacy Policy - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute(
        "content",
        `Privacy Policy - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
  }, []);

  return (
    <div className="w-full min-h-screen text-grey-900">
      <Header onRegisterClick={() => { }} />
      <main className="page-wrapper max-w-4xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-8">Privacy Policy</h1>
        <p className="text-xl text-grey-600 mb-12 border-b border-grey-bg pb-8">
          Effective Date: April 1, 2026
        </p>

        <div className="space-y-12 text-lg leading-relaxed text-grey-800">
          <section>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">1. Introduction</h2>
            <p>
              {mainData.eventInfo.name} Andhra Pradesh (&quot;we,&quot; &quot;our,&quot; or
              &quot;us&quot;) is committed to protecting your privacy. This Privacy
              Policy outlines how we collect, use, disclose, and safeguard your
              information when you visit our platform{" "}
              <a href={mainData.seo.hostUrl} className="text-google-blue hover:underline font-medium">
                {mainData.seo.hostUrl}
              </a>
              {" "}and participate in our events.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">2. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Personal Information:</h3>
                <p>
                  We may collect personal information that you voluntarily provide to us
                  when registering for events, such as your name, email address, phone
                  number, educational institution, and other relevant details required for badging and logistics.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Usage Data:</h3>
                <p>
                  We automatically collect certain information when you visit the
                  Platform, including your IP address, browser type, operating system,
                  access times, and pages viewed, to improve our services.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-3 marker:text-google-blue">
              <li>Facilitate event registration, badge printing, and participation.</li>
              <li>
                Communicate with you regarding event updates, session schedules, and related
                information.
              </li>
              <li>Improve our website/app and event offerings based on community feedback.</li>
              <li>Comply with necessary legal and safety obligations for in-person gatherings.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">4. Sharing Your Information</h2>
            <p className="mb-4">
              We do not sell or rent your personal information to third parties. We
              may share your information with:
            </p>
            <ul className="list-disc list-inside space-y-3 marker:text-google-blue">
              <li>
                Event partners and sponsors, strictly for event-related purposes like workshop access or prize fulfillment.
              </li>
              <li>
                Service providers who assist in operating our platform and organizing
                large-scale logistical needs.
              </li>
              <li>
                Law enforcement or other governmental authorities if required by
                law or for safety reasons.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">5. Data Security</h2>
            <p>
              We implement industry-standard technical and organizational measures to
              protect your personal information from unauthorized access, use, or
              disclosure. This includes encryption of sensitive data and secure handling of payment tokens.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">6. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc list-inside space-y-3 marker:text-google-blue">
              <li>Access the personal information we hold about you.</li>
              <li>Request correction or deletion of your personal information.</li>
              <li>
                Object to or restrict certain processing of your personal
                information.
              </li>
            </ul>
            <p className="mt-6 p-4 bg-grey-bg dark:bg-grey-bg/8! rounded-xl border-l-4 border-google-blue">
              To exercise these rights, please contact us at{" "}
              <a
                href={`mailto:gdgwowap@gmail.com`}
                className="text-google-blue hover:underline font-medium"
              >
                gdgwowap@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">7. Third-Party Links</h2>
            <p>
              Our Platform may contain links to third-party websites (like Google Maps or sponsor pages). We are not responsible for the privacy practices or content of such external websites.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">8. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify
              you of any significant changes by posting the new policy on our
              Platform.
            </p>
          </section>

          <section className="pt-8 border-t border-grey-bg">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">9. Contact Us</h2>
            <p className="mb-4">
              If you have any questions or concerns about this Privacy Policy,
              please contact us at:
            </p>
            <div className="space-y-2 font-medium">
              <p>{mainData.eventInfo.name} Andhra Pradesh</p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:gdgwowap@gmail.com`}
                  className="text-google-blue hover:underline"
                >
                  gdgwowap@gmail.com
                </a>
              </p>
              <p>
                Website:{" "}
                <a href={mainData.seo.hostUrl} className="text-google-blue hover:underline">
                  {mainData.seo.hostUrl}
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
