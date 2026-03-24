"use client";
import React, { useEffect } from "react";
import mainData from "@/data/config.json";

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
  }, []); // Set title and meta tags on component mount
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Effective Date: July 2026
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p>
          GDGoC WoW 2026 Andhra Pradesh (&quot;we,&quot; &quot;our,&quot; or
          &quot;us&quot;) is committed to protecting your privacy. This Privacy
          Policy outlines how we collect, use, disclose, and safeguard your
          information when you visit our website{" "}
          <a href="https://wow.vizag.dev" className="text-blue-600 underline">
            https://wow.vizag.dev
          </a>
          (the &quot;Platform&quot;)/app and participate in our events.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          2. Information We Collect
        </h2>
        <p className="mb-2 font-medium">Personal Information:</p>
        <p className="mb-4">
          We may collect personal information that you voluntarily provide to us
          when registering for events, such as your name, email address, phone
          number, educational institution, and other relevant details.
        </p>
        <p className="mb-2 font-medium">Usage Data:</p>
        <p>
          We automatically collect certain information when you visit the
          Platform, including your IP address, browser type, operating system,
          access times, and pages viewed.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          3. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Facilitate event registration and participation.</li>
          <li>
            Communicate with you regarding event updates and related
            information.
          </li>
          <li>Improve our website/app and event offerings.</li>
          <li>Comply with legal obligations.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          4. Sharing Your Information
        </h2>
        <p className="mb-4">
          We do not sell or rent your personal information to third parties. We
          may share your information with:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Event partners and sponsors, strictly for event-related purposes.
          </li>
          <li>
            Service providers who assist in operating our website/app and organizing
            events.
          </li>
          <li>
            Law enforcement or other governmental authorities if required by
            law.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to
          protect your personal information from unauthorized access, use, or
          disclosure.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Access the personal information we hold about you.</li>
          <li>Request correction or deletion of your personal information.</li>
          <li>
            Object to or restrict certain processing of your personal
            information.
          </li>
        </ul>
        <p className="mt-2">
          To exercise these rights, please contact us at{" "}
          <a
            href="mailto:gdscwowvizag@gmail.com"
            className="text-blue-600 underline"
          >
            gdscwowvizag@gmail.com
          </a>
          .
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Third-Party Links</h2>
        <p>
          Our Platform may contain links to third-party websites. We are not
          responsible for the privacy practices or content of such websites.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          8. Changes to This Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any significant changes by posting the new policy on our
          Platform.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
        <p className="mb-1">
          If you have any questions or concerns about this Privacy Policy,
          please contact us at:
        </p>
        <p>GDGoC WoW 2026 Andhra Pradesh</p>
        <p>
          Email:{" "}
          <a
            href="mailto:gdscwowvizag@gmail.com"
            className="text-blue-600 underline"
          >
            gdscwowvizag@gmail.com
          </a>
        </p>
        <p>
          Website:{" "}
          <a href="https://wow.vizag.dev" className="text-blue-600 underline">
            https://wow.vizag.dev
          </a>
        </p>
      </section>
    </main>
  );
}
