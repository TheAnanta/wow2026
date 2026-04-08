// src/components/registration/StepManager.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { InterestTags } from './InterestTags';
import { BadgeSuccess } from './BadgeSuccess';
import { RegistrationData, validateProfile } from '../../services/registrationStubs';
import { auth, signInWithGoogle } from '../../services/firebase';

interface StepManagerProps {
  currentStep: number;
  data: RegistrationData;
  updateData: (updates: Partial<RegistrationData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  onClose?: () => void;
}

export const StepManager: React.FC<StepManagerProps> = ({
  currentStep,
  data,
  updateData,
  onNext,
  onClose
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFirebaseLoading, setIsFirebaseLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const isAuthNow = !!user;
      setIsAuthenticated(isAuthNow);
      setIsFirebaseLoading(false);

      if (isAuthNow && user.displayName && !data.displayName) {
        updateData({ displayName: user.displayName });
      }
    });
    return () => unsubscribe();
  }, [data.displayName, updateData]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error('Google Sign In Error:', err);
    }
  };

  const handleProfileAndInterestsNext = () => {
    const newErrors = validateProfile(data);
    if (Object.keys(newErrors).length === 0) {
      onNext();
    } else {
      setErrors(newErrors);
    }
  };

  const toggleInterest = (interest: string) => {
    const current = data.interests || [];
    const updated = current.includes(interest)
      ? current.filter(i => i !== interest)
      : [...current, interest];
    updateData({ interests: updated });
  };

  /* Shared input/label/select class strings */
  const inputCls = 'w-full py-[0.65rem] px-4 border border-[#000000] rounded-[6px] font-[inherit] text-sm bg-white text-[#202124] focus:outline-none focus:border-[#4285F4] placeholder:text-[#bdc1c6]';
  const labelCls = 'text-xs font-semibold text-[#5f6368]';
  const nextBtnCls = 'py-3 px-10 bg-[#000000] text-white border-none rounded-full font-bold cursor-pointer transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-fit';

  const renderStep = () => {
    if (currentStep === 1 && !isAuthenticated && !isFirebaseLoading) {
      return (
        <div className="text-center py-8">
          <h2 className="text-lg font-bold mb-3 text-[#202124]">Sign in to continue</h2>
          <p className="text-xs text-[#5f6368] mb-8 leading-[1.5]">
            To register for Google WOW 2026, please sign in with your Google account.
          </p>
          <button
            onClick={handleGoogleSignIn}
            className="bg-white text-[#000000] border border-[#000000] rounded-full flex items-center gap-4 mx-auto w-fit py-3 px-8 font-bold cursor-pointer"
          >
            <img src="/images/google.svg" alt="Google" width="20" />
            Sign in with Google
          </button>
        </div>
      );
    }

    if (isFirebaseLoading && currentStep === 1) {
      return <div className="text-center py-8">Loading auth state...</div>;
    }

    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="text-lg font-bold mb-3 text-[#202124]">Create a developer profile</h2>
            <p className="text-xs text-[#5f6368] mb-8 leading-[1.5]">
              Create a developer profile to get recommendations for the best WOW sessions and content for you. You can also use your profile to save content to watch on demand.
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-[0.35rem]">
                <label className={labelCls}>Display name <span className="text-[#d93025]">*</span></label>
                <input
                  className={inputCls}
                  type="text"
                  value={data.displayName}
                  onChange={(e) => updateData({ displayName: e.target.value })}
                  placeholder="Developer"
                />
                {errors.displayName && <p className="text-[0.7rem] text-[#d93025] mt-1">{errors.displayName}</p>}
                <p className="text-xs text-[#5f6368] mt-1">Your name may appear where you contribute and can be changed at any time.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-[0.35rem]">
                  <label className={labelCls}>Pronoun</label>
                  <select className={inputCls} value={data.pronoun} onChange={(e) => updateData({ pronoun: e.target.value })}>
                    <option value="">Select pronoun</option>
                    <option value="he/him">He/Him</option>
                    <option value="she/her">She/Her</option>
                    <option value="they/them">They/Them</option>
                    <option value="prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div className="flex flex-col gap-[0.35rem]">
                  <label className={labelCls}>City/town <span className="text-[#d93025]">*</span></label>
                  <input
                    className={inputCls}
                    type="text"
                    value={data.cityTown}
                    onChange={(e) => updateData({ cityTown: e.target.value })}
                    placeholder="Your City"
                  />
                  {errors.cityTown && <p className="text-[0.7rem] text-[#d93025] mt-1">{errors.cityTown}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-[0.35rem]">
                  <label className={labelCls}>Role or job title</label>
                  <select className={inputCls} value={data.role} onChange={(e) => updateData({ role: e.target.value })}>
                    <option value="">Role or job title</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Designer">Designer</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
                <div className="flex flex-col gap-[0.35rem]">
                  <label className={labelCls}>Google</label>
                  <input className={inputCls} type="text" placeholder="e.g. Google" />
                  <p className="text-xs text-[#5f6368] mt-1">Name of your Company, Employer, or School</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className={`${labelCls} mb-4`}>Select your interests</h3>
                <p className="text-xs text-[#5f6368] mb-6">This will help us provide you with the most relevant WOW content.</p>
                <InterestTags selectedInterests={data.interests} toggleInterest={toggleInterest} showAll={true} />
                <a href="#" className="block mt-4 text-sm font-bold underline">See all</a>
              </div>

              <p className="text-xs text-[#5f6368] mt-8 leading-[1.4]">
                By creating a Google developer profile, you agree to the Content Policy, Google's Terms of Service and Privacy Policy apply to your use of this service. Your display name, organization, role, and interests will be used in your profile, along with the location entered in registration. Your display name may appear where you contribute and can be changed at any time.
              </p>

              <button
                type="button"
                onClick={handleProfileAndInterestsNext}
                className={nextBtnCls}
                style={{ paddingLeft: '3rem', paddingRight: '3rem', marginTop: '1rem' }}
              >
                Next
              </button>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h2 className="text-lg font-bold mb-4 text-[#202124]">Terms</h2>
            <div className="flex flex-col gap-4">
              {[
                { key: 'termsAgreed' as keyof RegistrationData, label: 'I am 18 years of age or older.', required: true },
                { key: 'agreeToTerms' as keyof RegistrationData, label: 'I agree to WOW 2026 Terms and Conditions, including Google Terms and Community Guidelines.', required: true },
                { key: 'marketingConsent' as keyof RegistrationData, label: 'I would like to receive marketing and events emails and updates about Google WOW.', required: false },
              ].map(({ key, label, required }) => (
                <div
                  key={key}
                  className="flex gap-4 items-start text-sm leading-[1.5] cursor-pointer"
                  onClick={() => updateData({ [key]: !data[key] })}
                >
                  <div className={`w-[18px] h-[18px] border border-[#000000] rounded-[4px] flex-shrink-0 mt-[3px] flex justify-center items-center ${data[key] ? 'bg-[#202124] checkbox-checked' : ''}`} />
                  <span>{label}{required && <span className="text-[#d93025]"> *</span>}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <button
                type="button"
                disabled={!data.termsAgreed || !data.agreeToTerms}
                onClick={onNext}
                className={nextBtnCls}
              >
                Register
              </button>
            </div>
          </>
        );

      case 3:
        return <BadgeSuccess onClose={onClose} />;

      default:
        return null;
    }
  };

  return <div className="flex-1 px-12 py-10 overflow-y-auto flex flex-col">{renderStep()}</div>;
};
