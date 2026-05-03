"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/sections/Header";

const inputBaseCls =
  "w-full rounded-lg border border-grey-400 bg-white px-4 py-3 text-[1rem] text-grey-900 placeholder:text-grey-600 transition-all focus:border-google-blue focus:outline-none focus:ring-1 focus:ring-google-blue dark:bg-grey-900 dark:text-white";

const labelCls = "mb-2 block text-[0.875rem] font-medium text-grey-900 dark:text-white";
const sectionCls = "border-t border-grey-300 pt-8";

function FieldLabel({ children, required = false }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className={labelCls}>
      {children}
      {required && <span className="text-google-red"> *</span>}
    </label>
  );
}

function SpeakerApplicationForm() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {submitted && (
        <div className="rounded-lg border border-google-green bg-green-50 px-5 py-4 text-[0.95rem] font-medium text-grey-900">
          Your speaker application has been captured. The WOW team will review it and reach out soon.
        </div>
      )}

      <section>
        <h2 className="mb-6 text-[1.5rem] font-medium tracking-tight">Personal Details</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <FieldLabel required>Full Name</FieldLabel>
            <input className={inputBaseCls} name="fullName" type="text" required />
          </div>
          <div>
            <FieldLabel required>Email</FieldLabel>
            <input className={inputBaseCls} name="email" type="email" required />
          </div>
          <div>
            <FieldLabel required>Phone Number</FieldLabel>
            <input className={inputBaseCls} name="phoneNumber" type="tel" required />
          </div>
          <div>
            <FieldLabel required>LinkedIn Profile</FieldLabel>
            <input className={inputBaseCls} name="linkedin" type="url" required />
          </div>
          <div className="md:col-span-2">
            <FieldLabel>Portfolio / Website</FieldLabel>
            <input className={inputBaseCls} name="portfolio" type="url" />
          </div>
        </div>
      </section>

      <section className={sectionCls}>
        <h2 className="mb-6 text-[1.5rem] font-medium tracking-tight">Professional Info</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <FieldLabel required>Current Role / Title</FieldLabel>
            <input className={inputBaseCls} name="currentRole" type="text" required />
          </div>
          <div>
            <FieldLabel required>Organization / Company</FieldLabel>
            <input className={inputBaseCls} name="organization" type="text" required />
          </div>
          <div>
            <FieldLabel>Years of Experience</FieldLabel>
            <select className={inputBaseCls} name="yearsExperience" defaultValue="">
              <option value="" disabled>Select experience</option>
              <option value="0-1">0-1</option>
              <option value="1-3">1-3</option>
              <option value="3-5">3-5</option>
              <option value="5+">5+</option>
            </select>
          </div>
        </div>
      </section>

      <section className={sectionCls}>
        <h2 className="mb-6 text-[1.5rem] font-medium tracking-tight">Talk Proposal</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <FieldLabel required>Talk Title</FieldLabel>
            <input className={inputBaseCls} name="talkTitle" type="text" required />
          </div>
          <div className="md:col-span-2">
            <FieldLabel required>Talk Description</FieldLabel>
            <textarea
              className={`${inputBaseCls} min-h-[180px] resize-y`}
              name="talkDescription"
              required
              minLength={600}
              placeholder="Minimum 100 words"
            />
            <p className="mt-2 px-4 text-[0.75rem] text-grey-600">Please write at least 100 words.</p>
          </div>
          <div>
            <FieldLabel>Topic Category</FieldLabel>
            <select className={inputBaseCls} name="topicCategory" defaultValue="">
              <option value="" disabled>Select category</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Web Dev">Web Dev</option>
              <option value="Mobile Dev">Mobile Dev</option>
              <option value="Cloud">Cloud</option>
              <option value="DevOps">DevOps</option>
              <option value="Design">Design</option>
              <option value="Startup">Startup</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <FieldLabel>Experience Level of Audience</FieldLabel>
            <select className={inputBaseCls} name="audienceLevel" defaultValue="">
              <option value="" disabled>Select level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <FieldLabel>Session Type</FieldLabel>
            <select className={inputBaseCls} name="sessionType" defaultValue="">
              <option value="" disabled>Select session type</option>
              <option value="Talk">Talk</option>
              <option value="Workshop">Workshop</option>
              <option value="Panel">Panel</option>
            </select>
          </div>
        </div>
      </section>

      <section className={sectionCls}>
        <h2 className="mb-6 text-[1.5rem] font-medium tracking-tight">Credibility</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <FieldLabel>Have you spoken before?</FieldLabel>
            <select className={inputBaseCls} name="spokenBefore" defaultValue="">
              <option value="" disabled>Select answer</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <FieldLabel>Share past talk/video link</FieldLabel>
            <input className={inputBaseCls} name="pastTalkLink" type="url" />
          </div>
          <div className="md:col-span-2">
            <FieldLabel>If yes, describe experience</FieldLabel>
            <textarea className={`${inputBaseCls} min-h-[130px] resize-y`} name="speakingExperience" />
          </div>
        </div>
      </section>

      <section className={sectionCls}>
        <h2 className="mb-6 text-[1.5rem] font-medium tracking-tight">Motivation</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <FieldLabel>Why do you want to speak at WOW?</FieldLabel>
            <textarea className={`${inputBaseCls} min-h-[140px] resize-y`} name="motivation" />
          </div>
          <div>
            <FieldLabel>What will attendees gain from your session?</FieldLabel>
            <textarea className={`${inputBaseCls} min-h-[140px] resize-y`} name="attendeeGain" />
          </div>
        </div>
      </section>

      <section className={sectionCls}>
        <h2 className="mb-6 text-[1.5rem] font-medium tracking-tight">Logistics</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <FieldLabel>Availability</FieldLabel>
            <input className={inputBaseCls} name="availability" type="text" placeholder="Dates or time windows" />
          </div>
          <div className="md:col-span-2">
            <FieldLabel>Any special requirements?</FieldLabel>
            <textarea className={`${inputBaseCls} min-h-[120px] resize-y`} name="specialRequirements" />
          </div>
        </div>
      </section>

      <section className={sectionCls}>
        <h2 className="mb-6 text-[1.5rem] font-medium tracking-tight">Consent</h2>
        <div className="space-y-4">
          <label className="flex items-start gap-3 text-[0.95rem] font-medium leading-relaxed">
            <input className="checkbox mt-1" type="checkbox" name="accurateInfo" required />
            <span>I confirm the information is accurate</span>
          </label>
          <label className="flex items-start gap-3 text-[0.95rem] font-medium leading-relaxed">
            <input className="checkbox mt-1" type="checkbox" name="termsAccepted" required />
            <span>I agree to terms and conditions</span>
          </label>
        </div>
      </section>

      <div className="flex flex-col gap-3 border-t border-grey-300 pt-8 sm:flex-row">
        <button
          type="submit"
          className="rounded-full bg-grey-900 px-8 py-3 text-[1rem] font-medium text-white transition-colors hover:bg-black dark:bg-white dark:text-grey-900"
        >
          Apply as Speaker
        </button>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="rounded-full border border-grey-400 bg-white px-8 py-3 text-[1rem] font-medium text-grey-900 transition-colors hover:bg-grey-50 dark:bg-grey-900 dark:text-white"
        >
          Back to home
        </button>
      </div>
    </form>
  );
}

export default function BecomeSpeakerPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-grey-900 dark:bg-grey-900 dark:text-white">
      <Header onRegisterClick={() => router.push("/register")} />

      <main className="px-4 py-8 md:px-6 md:py-14">
        <div className="mx-auto w-full max-w-[960px] overflow-hidden rounded-2xl border border-grey-300 bg-white shadow-sm dark:border-grey-text dark:bg-grey-900">
          <div className="border-b border-grey-300 bg-[#2563EB] px-6 py-8 text-white md:px-10 md:py-12">
            <p className="mb-3 text-[0.875rem] font-medium uppercase tracking-[0.08em]">WOW 2026</p>
            <h1 className="font-display text-[2.25rem] font-bold leading-tight tracking-[-0.04em] md:text-[3.5rem]">
              Become a Speaker
            </h1>
            <p className="mt-4 max-w-[680px] text-[1rem] font-medium leading-relaxed md:text-[1.25rem]">
              Share your expertise with developers, builders, founders, and students at WOW.
            </p>
          </div>

          <div className="px-6 py-8 md:px-10 md:py-12">
            <SpeakerApplicationForm />
          </div>
        </div>
      </main>
    </div>
  );
}
