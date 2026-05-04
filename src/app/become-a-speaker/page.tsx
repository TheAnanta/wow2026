"use client";

import React, { FormEvent, useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/sections/Header";
import { InterestTags } from "@/components/registration/InterestTags";
import {
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGlobe,
  FaCamera,
} from "react-icons/fa6";
import {
  saveDraft,
  loadDraft,
  submitSpeakerApplication,
  type SpeakerFormData,
} from "@/services/speakerService";

const inputBaseCls =
  "w-full px-4 py-3.5 border border-grey-400 rounded-lg text-[1rem] focus:outline-none focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-all bg-white dark:bg-grey-900 placeholder:text-grey-600 dark:text-white dark:border-grey-text";

const labelCls = "mb-2.5 block text-[0.875rem] font-semibold text-grey-900 dark:text-white";
const sectionCls = "border-t border-grey-200 dark:border-grey-text pt-10 mt-10";

function FieldLabel({ children, required = false }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className={labelCls}>
      {children}
      {required && <span className="text-google-red ml-1">*</span>}
    </label>
  );
}

const defaultFormData: SpeakerFormData = {
  sessionTitle: "",
  description: "",
  sessionFormat: "",
  level: "",
  additionalNotes: "",
  isGDE: "No",
  takenBefore: "No",
  experienceRef: "",
  firstName: "",
  lastName: "",
  gdgOnCampus: "GDG on Campus",
  gitam: "GITAM",
  tagline: "",
  email: "",
  biography: "",
  socialX: "",
  socialLinkedIn: "",
  socialInstagram: "",
  socialWebsite: "",
  coSpeakers: ["", "", ""],
  agreed: false,
};

function SpeakerApplicationForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const [formData, setFormData] = useState<SpeakerFormData>(defaultFormData);

  // Load draft on mount
  useEffect(() => {
    const { formData: savedData, tags } = loadDraft();
    if (savedData) {
      setFormData(savedData);
      setSelectedTags(tags);
    }
  }, []);

  // Auto-save on form changes (debounced)
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerAutoSave = useCallback(() => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      saveDraft(formData, selectedTags);
      const now = new Date();
      setLastSaved(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
  }, [formData, selectedTags]);

  useEffect(() => {
    triggerAutoSave();
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [formData, selectedTags, triggerAutoSave]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCoSpeakerChange = (index: number, value: string) => {
    const newCoSpeakers = [...formData.coSpeakers];
    newCoSpeakers[index] = value;
    setFormData(prev => ({ ...prev, coSpeakers: newCoSpeakers }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    const result = await submitSpeakerApplication(formData, selectedTags);

    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setSubmitError(result.error || "Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-google-green/10 text-google-green">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 className="text-[2rem] font-bold tracking-tight text-grey-900 dark:text-white">Submission Received!</h2>
        <p className="mt-4 max-w-md text-[1.125rem] text-grey-600 dark:text-grey-400">
          Thank you for submitting your session for WOW 2026. Our team will review your proposal and contact you at <strong>{formData.email}</strong>.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-10 rounded-full bg-google-blue px-10 py-3.5 text-[1rem] font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl active:scale-95"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      {/* Session Information */}
      <section>
        <h2 className="mb-4 text-[1.75rem] font-bold tracking-tight flex items-center gap-3 text-grey-900 dark:text-white">
          About your session
        </h2>

        <div className="space-y-6">
          <div>
            <FieldLabel required>Session Title</FieldLabel>
            <input
              className={inputBaseCls}
              name="sessionTitle"
              type="text"
              placeholder="Enter an engaging title"
              required
              value={formData.sessionTitle}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <FieldLabel required>Description</FieldLabel>
            <textarea
              className={`${inputBaseCls} min-h-[160px] resize-y`}
              name="description"
              placeholder="Describe your session in detail..."
              required
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <FieldLabel required>Session Format</FieldLabel>
              <select
                className={inputBaseCls}
                name="sessionFormat"
                required
                value={formData.sessionFormat}
                onChange={handleInputChange}
              >
                <option value="">Select format</option>
                <option value="Lightening Talk">Lightening Talk</option>
                <option value="Tech Byte">Tech Byte</option>
                <option value="Talk">Talk</option>
                <option value="Workshop">Workshop</option>
                <option value="Open Mic">Open Mic</option>
              </select>
            </div>
            <div>
              <FieldLabel required>Level of Session</FieldLabel>
              <select
                className={inputBaseCls}
                name="level"
                required
                value={formData.level}
                onChange={handleInputChange}
              >
                <option value="">Select level</option>
                <option value="Novice">Novice</option>
                <option value="Moderate">Moderate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          <div>
            <FieldLabel>Tags</FieldLabel>

            <InterestTags
              selectedInterests={selectedTags}
              toggleInterest={toggleTag}
              showAll={true}
            />
            <p className="mt-4 text-[0.75rem] text-grey-500">Select tags that best categorize your session.</p>

          </div>

          <div>
            <FieldLabel>Additional Notes</FieldLabel>
            <textarea
              className={`${inputBaseCls} min-h-[100px] resize-y`}
              name="additionalNotes"
              placeholder="Any extra info for the organizers?"
              value={formData.additionalNotes}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <FieldLabel required>Are you a Google Developer Expert?</FieldLabel>
              <div className="flex gap-6 mt-2">
                {["Yes", "No"].map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="isGDE"
                      value={opt}
                      checked={formData.isGDE === opt}
                      onChange={handleInputChange}
                      className="radio"
                    />
                    <span className="text-[1rem] font-medium transition-colors text-grey-800 dark:text-grey-200">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <FieldLabel required>Have you ever taken a session on this topic?</FieldLabel>
              <div className="flex gap-6 mt-2">
                {["Yes", "No"].map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="takenBefore"
                      value={opt}
                      checked={formData.takenBefore === opt}
                      onChange={handleInputChange}
                      className="radio"
                    />
                    <span className="text-[1rem] font-medium transition-colors text-grey-800 dark:text-grey-200">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {formData.takenBefore === "Yes" && (
            <div className="animate-slide-down">
              <FieldLabel required>Experience or References</FieldLabel>
              <textarea
                className={`${inputBaseCls} min-h-[100px] resize-y`}
                name="experienceRef"
                placeholder="Share your experience or links to past sessions..."
                required
                value={formData.experienceRef}
                onChange={handleInputChange}
              />
            </div>
          )}
        </div>
      </section>

      {/* Speaker Information */}
      <section className={sectionCls}>
        <h2 className="mb-8 text-[1.75rem] font-bold tracking-tight flex items-center gap-3 text-grey-900 dark:text-white">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="md:col-span-2 flex flex-col md:flex-row gap-8 items-stretch">
            <div className="relative group shrink-0 aspect-square py-1.5">
              <div className="h-full w-full overflow-hidden rounded-2xl border-2 border-dashed border-grey-300 dark:border-grey-text bg-grey-50 dark:bg-grey-900 flex items-center justify-center transition-all group-hover:border-google-blue cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-grey-400 dark:text-grey-300 group-hover:text-google-blue transition-colors text-center">
                    <FaCamera size={24} />
                    <span className="text-[0.7rem] mt-1 font-medium px-2">Speaker Photo</span>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 h-8 w-8 bg-white dark:bg-grey-700 border border-grey-200 dark:border-grey-text rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform text-grey-600 dark:text-white z-10"
              >
                <FaCamera size={14} className="text-current" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="flex-1 w-full space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FieldLabel required>First Name</FieldLabel>
                  <input
                    className={inputBaseCls}
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <FieldLabel required>Last Name</FieldLabel>
                  <input
                    className={inputBaseCls}
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FieldLabel required>Speaker Tagline</FieldLabel>
                  <input
                    className={inputBaseCls}
                    name="tagline"
                    type="text"
                    placeholder="Your company, position, title"
                    required
                    value={formData.tagline}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <FieldLabel required>Email</FieldLabel>
                  <input
                    className={inputBaseCls}
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <p className="mt-2 text-[0.75rem] text-google-blue font-medium">Organizer will use this email to contact you.</p>
                </div>
              </div>
            </div>
          </div>


          <div className="md:col-span-2">
            <FieldLabel required>Speaker Biography</FieldLabel>
            <textarea
              className={`${inputBaseCls} min-h-[140px] resize-y`}
              name="biography"
              placeholder="Tell us about yourself..."
              required
              value={formData.biography}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <h3 className="text-[1.125rem] font-bold text-grey-900 dark:text-white">Social Presence</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { id: "socialX", icon: <FaXTwitter />, label: "X (Twitter)", placeholder: "https://x.com/username" },
              { id: "socialLinkedIn", icon: <FaLinkedinIn />, label: "LinkedIn", placeholder: "https://linkedin.com/in/username" },
              { id: "socialInstagram", icon: <FaInstagram />, label: "Instagram", placeholder: "https://instagram.com/username" },
              { id: "socialWebsite", icon: <FaGlobe />, label: "Company Website", placeholder: "https://company.com" },
            ].map(social => (
              <div key={social.id} className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-grey-500 group-focus-within:text-google-blue transition-colors">
                  {social.icon}
                </div>
                <input
                  className={`${inputBaseCls} !pl-11`}
                  name={social.id}
                  type="url"
                  placeholder={social.placeholder}
                  value={(formData as any)[social.id]}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <h3 className="text-[1.125rem] font-bold text-grey-900 dark:text-white flex items-center gap-2">
            Co-speakers (Optional)
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {formData.coSpeakers.map((email, idx) => (
              <input
                key={idx}
                className={inputBaseCls}
                type="email"
                placeholder={`Email ${idx + 1}`}
                value={email}
                onChange={(e) => handleCoSpeakerChange(idx, e.target.value)}
              />
            ))}
          </div>
          <p className="text-[0.75rem] text-grey-500 italic">Enter email addresses of other speakers, and they'll receive an invitation to join your session as co-speakers.</p>
        </div>
      </section>

      {/* Consent */}
      <section className={sectionCls}>
        <div className="rounded-2xl bg-grey-50 dark:bg-grey-900/50">
          <label className="flex items-start gap-4 cursor-pointer group">
            <input
              className="checkbox"
              type="checkbox"
              name="agreed"
              required
              checked={formData.agreed}
              onChange={(e) => setFormData(prev => ({ ...prev, agreed: e.target.checked }))}
            />
            <div className="text-[0.95rem] font-medium leading-relaxed text-grey-700 dark:text-grey-300">
              I agree that personal data shown on this page is shared with the organizer of Wonder of Wonders 2026: Andhra Pradesh. Organizer may share your session and personal data publicly as (but not limited to) a part of an event schedule.
              Please read our <a href="/terms" className="text-google-blue hover:underline">Terms of Service</a> and <a href="/privacy" className="text-google-blue hover:underline">Privacy Policy</a>.
            </div>
          </label>
        </div>
      </section>

      <div className="mt-6 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <p className="text-[0.875rem] text-grey-500 font-medium italic opacity-50">
            Your progress saves automatically. You can close this page and return later, just mind the deadline.
          </p>

        </div>

        {submitError && (
          <div className="rounded-lg bg-google-red/10 border border-google-red/30 px-4 py-3 text-[0.875rem] text-google-red font-medium">
            {submitError}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            type="submit"
            disabled={submitting}
            className="px-10 py-2.5 bg-grey-900 dark:bg-white text-white dark:text-grey-900 rounded-full font-medium hover:bg-grey-text disabled:bg-grey-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white dark:border-grey-900 border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <span>Submit Session</span>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="px-8 py-2.5 bg-white dark:bg-grey-900 dark:text-white border border-grey-400 text-grey-900 rounded-full font-medium hover:bg-grey-50 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default function BecomeSpeakerPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-grey-900 dark:bg-grey-900 dark:text-white transition-colors duration-300">
      <Header onRegisterClick={() => router.push("/register")} />

      <main className="px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto w-full max-w-[1000px] overflow-hidden rounded-3xl border border-grey-200 bg-white shadow-xl dark:border-grey-text dark:bg-grey-900/80 backdrop-blur-sm">
          <div className="relative overflow-hidden border-b border-grey-200 dark:border-grey-text bg-gradient-to-br from-blue-600 to-blue-800 px-8 py-12 text-white md:px-14 md:py-16">
            <div className="relative z-10">
              <p className="mb-4 text-[0.875rem] font-black uppercase tracking-[0.2em] text-blue-100">Call for Speakers</p>
              <h1 className="font-display text-[2.5rem] font-black leading-[1.1] tracking-[-0.04em] md:text-[4rem]">
                Become a Speaker
              </h1>
              <p className="mt-6 max-w-[640px] text-[1.125rem] font-medium leading-relaxed text-blue-50 md:text-[1.375rem]">
                Share your expertise with developers, builders, founders, and students at WOW 2026.
              </p>
            </div>

            {/* Abstract Decorative Element */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-[-50px] right-[10%] h-80 w-80 rounded-full bg-blue-400/20 blur-3xl"></div>
          </div>

          <div className="px-8 py-12 md:px-14 md:py-16">
            <SpeakerApplicationForm />
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-down {
          animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
