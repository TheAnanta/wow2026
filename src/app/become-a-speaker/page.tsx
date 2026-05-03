'use client';

import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../../components/sections/Header';
import TagMultiSelect from '@/components/ui/TagMultiSelect';

const inputBaseCls =
  "w-full h-[48px] rounded-[8px] border border-gray-300 dark:border-white/20 bg-white dark:bg-[#141517] px-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#9aa0a6] shadow-sm transition hover:border-gray-400 dark:hover:border-white/35 focus:border-[#4285f4] focus:outline-none focus:ring-2 focus:ring-[#4285f4]/30 [color-scheme:light] dark:[color-scheme:dark]";
const labelCls =
  "mb-2 block text-sm font-medium text-gray-700 dark:text-[#e8eaed]";

const sectionCls = "border-t border-gray-200 dark:border-white/12 pt-10";

const selectOptionCls = "bg-white text-gray-900 dark:bg-[#141517] dark:text-white";

const TOPIC_OPTIONS = [
  'Android',
  'Web',
  'AI & Machine Learning',
  'Cloud',
  'DevOps',
  'Flutter',
  'Firebase',
  'Design',
  'Backend',
];

const yesNoOptions = ['Yes', 'No'];

function FieldLabel({
  children,
  required = false,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className={labelCls}>
      {children}
      {required && <span className="text-red-500"> *</span>}
    </label>
  );
}

function SpeakerApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [topics, setTopics] = useState<string[]>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      topics,
    };

    console.log("FINAL PAYLOAD:", payload);

    setSubmitted(true);
    event.currentTarget.reset();
    setTopics([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[8px] border border-gray-200 dark:border-white/14 bg-white dark:bg-[#0f1012] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.10)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.36)] ring-1 ring-gray-100 dark:ring-white/5 md:p-10 lg:p-12 space-y-12"
    >
      {submitted && (
        <div className="rounded-[8px] border border-[#34a853]/50 bg-[#34a853]/10 px-5 py-4 text-sm font-medium text-[#1a7a36] dark:text-[#d8f7df]">
          Your speaker application has been submitted successfully.
        </div>
      )}

      {/* PERSONAL */}
      <section>
        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#1a73e8] dark:text-[#8ab4f8]">Step 01</p>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Speaker Details</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <FieldLabel required>Speaker Name</FieldLabel>
            <input className={inputBaseCls} name="speakerName" required />
          </div>

          <div>
            <FieldLabel required>Email</FieldLabel>
            <input className={inputBaseCls} name="email" type="email" required />
          </div>

          <div className="md:col-span-2">
            <FieldLabel required>Speaker Tagline</FieldLabel>
            <input
              className={inputBaseCls}
              name="speakerTagline"
              placeholder="Developer Advocate, Founder, Cloud Engineer..."
              required
            />
          </div>

          <div className="md:col-span-2">
            <FieldLabel required>Speaker Biography</FieldLabel>
            <textarea
              className={`${inputBaseCls} min-h-[150px] resize-y`}
              name="speakerBiography"
              required
            />
          </div>

          <div>
            <FieldLabel required>Speaker Photo</FieldLabel>
            <div className="flex items-center justify-center w-full h-[48px] rounded-[8px] border border-gray-300 dark:border-white/20 bg-white dark:bg-[#141517] shadow-sm transition hover:border-gray-400 dark:hover:border-white/35">
              <input
                className="file:mr-4 file:rounded-full file:border-0 file:bg-[#4285f4] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#669df6] text-sm text-gray-900 dark:text-white w-full px-4"
                name="speakerPhoto"
                type="file"
                accept="image/*"
                required
              />
            </div>
          </div>

          <div>
            <FieldLabel>X (Twitter)</FieldLabel>
            <input className={inputBaseCls} name="twitter" type="url" placeholder="https://" />
          </div>

          <div>
            <FieldLabel>LinkedIn</FieldLabel>
            <input className={inputBaseCls} name="linkedin" type="url" placeholder="https://" />
          </div>

          <div>
            <FieldLabel>Instagram</FieldLabel>
            <input className={inputBaseCls} name="instagram" type="url" placeholder="https://" />
          </div>

          <div>
            <FieldLabel>Blog</FieldLabel>
            <input className={inputBaseCls} name="blog" type="url" placeholder="https://" />
          </div>

          <div>
            <FieldLabel>Company Website</FieldLabel>
            <input className={inputBaseCls} name="companyWebsite" type="url" placeholder="https://" />
          </div>
        </div>
      </section>

      {/* TALK */}
      <section className={sectionCls}>
        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#b8860b] dark:text-[#fdd663]">Step 02</p>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Talk Proposal</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <FieldLabel required>Session Title</FieldLabel>
            <input className={inputBaseCls} name="title" required />
          </div>

          <div className="md:col-span-2">
            <FieldLabel required>Description</FieldLabel>
            <textarea
              className={`${inputBaseCls} min-h-[140px]`}
              name="description"
              required
            />
          </div>

          <div>
            <FieldLabel required>Session Format</FieldLabel>
            <select className={`${inputBaseCls} !bg-white dark:!bg-[#141517]`} name="sessionFormat" required>
              <option className={selectOptionCls} value="">Select</option>
              <option className={selectOptionCls}>Talk</option>
              <option className={selectOptionCls}>Workshop</option>
              <option className={selectOptionCls}>Panel</option>
              <option className={selectOptionCls}>Lightning Talk</option>
            </select>
          </div>

          <div>
            <FieldLabel required>Level of Session</FieldLabel>
            <select className={inputBaseCls} name="levelOfSession" required>
              <option className={selectOptionCls} value="">Select</option>
              <option className={selectOptionCls}>Beginner</option>
              <option className={selectOptionCls}>Intermediate</option>
              <option className={selectOptionCls}>Advanced</option>
            </select>
          </div>

          {/* TAGS */}
          <div className="md:col-span-2">
            <FieldLabel required>Tags</FieldLabel>
            <TagMultiSelect
              options={TOPIC_OPTIONS}
              value={topics}
              onChange={setTopics}
            />
          </div>

          <div className="flex flex-col justify-end">
            <FieldLabel required>Have you ever taken a session on this topic?</FieldLabel>
            <select className={inputBaseCls} name="previousSessionOnTopic" required>
              <option className={selectOptionCls} value="">Select</option>
              {yesNoOptions.map((option) => (
                <option className={selectOptionCls} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col justify-end">
            <FieldLabel>Co-speakers</FieldLabel>
            <input
              className={inputBaseCls}
              name="coSpeakers"
              placeholder="Add names, separated by commas"
            />
          </div>

          <div className="md:col-span-2">
            <FieldLabel>Additional Notes</FieldLabel>
            <textarea
              className={`${inputBaseCls} min-h-[130px] resize-y`}
              name="additionalNotes"
            />
          </div>
        </div>
      </section>

      <section className={sectionCls}>
        <label className="flex items-start gap-3 text-sm font-medium leading-6 text-gray-700 dark:text-[#e8eaed]">
          <input
            className="mt-1 h-5 w-5 rounded border border-gray-300 dark:border-white/30 bg-white dark:bg-[#141517] accent-[#4285f4]"
            type="checkbox"
            name="termsAccepted"
            required
          />
          <span>I agree to the terms and conditions.</span>
        </label>
      </section>

      {/* SUBMIT */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-full bg-[#4285f4] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#669df6] focus:outline-none focus:ring-2 focus:ring-[#8ab4f8] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#0f1012]"
        >
          Submit Proposal
        </button>
      </div>
    </form>
  );
}

export default function BecomeSpeakerPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
      <Header onRegisterClick={() => router.push('/register')} />

      <main className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-14">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#34a853]">
            Call for speakers
          </p>
          <h1 className="mb-3 text-4xl font-semibold tracking-normal text-gray-900 dark:text-white md:text-5xl">
            Become a Speaker
          </h1>
          <p className="text-base leading-7 text-gray-500 dark:text-[#bdc1c6] md:text-lg">
            Share your knowledge and inspire others at WOW 2026.
          </p>
        </div>

        <SpeakerApplicationForm />
      </main>
    </div>
  );
}
