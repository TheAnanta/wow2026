// import "./styles.css";
"use client";
import mainData from "@/data/config.json";

import React, { useEffect } from "react";

export default function TermsConditionsPage() {
  useEffect(() => {
    document.title = `Terms & Conditions - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute(
        "content",
        `Terms & Conditions - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute(
        "content",
        `Terms & Conditions - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
  }, []); // Set title and meta tags on component mount
  return (
    <div className="p-[20px] md:p-[60px] faq flex flex-col mt-6 md:mt-[unset]">
      <h1 className="font-bold text-4xl mb-5">
        GDGoC WoW 2026 Terms & Conditions
      </h1>
      <div className="pb-10">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
          Last updated on: May 24, 2026
        </p>

        <p className="mb-6">
          These Terms and Conditions, along with the Privacy Policy and any
          additional terms (“Terms”), constitute a binding agreement between
          GDGoC WoW 2026 Andhra Pradesh (“we,” “our,” “us”) and you (“you,”
          “your”), and govern your use of our website and mobile application{" "}
          <a href="https://wow.vizag.dev" className="text-blue-600 underline">
            wow.vizag.dev
          </a>{" "}
          , dev.theananta.wow2026 and participation in any event, service, or interaction associated
          with GDGoC WoW 2026 (collectively, the “Services”).
        </p>

        <p className="mb-6">
          By accessing the website, app and using our Services, you acknowledge that
          you have read, understood, and agreed to these Terms, including the
          Privacy Policy. We may modify these Terms at any time without prior
          notice. It is your responsibility to review the Terms periodically for
          updates.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mt-10 mb-4">
          1. Use of Website/App and Services
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>
            You agree to provide accurate, current, and complete information
            during registration or participation.
          </li>
          <li>
            We make no guarantees about the accuracy, reliability, or
            completeness of any content or service offered.
          </li>
          <li>Your use of the Services is at your own risk and discretion.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mt-10 mb-4">
          2. Intellectual Property
        </h2>
        <p className="mb-6">
          All content, branding, logos, and materials are the intellectual
          property of GDGoC WoW 2026 Andhra Pradesh or its partners. You may not
          reuse them without written permission.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mt-10 mb-4">
          3. Prohibited Use
        </h2>
        <p className="mb-6">
          You agree not to use the website or Services for any unlawful or
          unauthorized purposes. Any misuse may result in legal action.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mt-10 mb-4">
          4. Third-Party Links
        </h2>
        <p className="mb-6">
          Our website/app may contain links to third-party platforms. We are not
          responsible for their content or practices.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mt-10 mb-4">
          5. Event Participation and Refund Policy
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>
            By registering for the event, you enter into a legally binding
            agreement with us.
          </li>
          <li>We reserve the right to modify or cancel any event activity.</li>
          <li>Ticket is non-cancellable and non-refundable.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mt-10 mb-4">
          6. Force Majeure
        </h2>
        <p className="mb-6">
          We are not liable for delays or failures caused by events beyond our
          control including natural disasters, pandemics, or internet outages.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mt-10 mb-4">
          7. Governing Law and Jurisdiction
        </h2>
        <p className="mb-6">
          These Terms are governed by Indian law. Any disputes will be subject
          to the jurisdiction of courts in{" "}
          <strong>Visakhapatnam, Andhra Pradesh</strong>.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mt-10 mb-4">
          8. Contact Us
        </h2>
        <ul className="mb-6">
          <li>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:gdscwowvizag@gmail.com"
              className="text-blue-600 underline"
            >
              gdscwowvizag@gmail.com
            </a>
          </li>
          <li>
            <strong>Phone:</strong>{" "}
            <a href="tel:9059145216" className="text-blue-600 underline">
              +91 90591 45216
            </a>
          </li>
          <li>
            <strong>Website:</strong>{" "}
            <a href="https://wow.vizag.dev" className="text-blue-600 underline">
              https://wow.vizag.dev
            </a>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mt-10 mb-4">
          9. Maintenance & Ownership
        </h2>
        <p className="mb-6">
          The website, app and related digital infrastructure are developed and
          maintained by <strong>Manas Malla</strong> for the GDGoC WoW 2026
          Andhra Pradesh initiative.
        </p>
      </div>
    </div>
  );
}
