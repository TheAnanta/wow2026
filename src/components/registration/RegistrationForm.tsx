'use client';

import React, { useState, useEffect } from 'react';
import { InterestTags } from './InterestTags';
import { RegistrationData, validateProfile, submitRegistration } from '../../services/registrationStubs';
import { auth, signInWithGoogle } from '../../services/firebase';
import { ErrorOverlay } from './ErrorOverlays';
import { useRouter } from 'next/navigation';

const RegistrationBanner = () => (
  <div className="relative w-full h-40 md:h-56 bg-[#F1F3F4] overflow-hidden border-b border-grey-200 flex items-center px-8 md:px-14">
    <div className="flex-1 z-10">
      <h2 className="text-[1.875rem] md:text-[2.25rem] font-medium text-grey-900 tracking-tight leading-tight">Register for WOW</h2>
    </div>
    <div className="absolute bottom-0 -right-16 sm:right-0 w-[80%] md:w-[65%] pointer-events-none select-none">
      <picture className="w-full">
        <source srcSet="/images/io24-pencil-road-centered-dark.svg" media="(prefers-color-scheme: dark)" />
        <img
          src="/images/io24-pencil-road-centered.svg"
          alt=""
          className="w-full max-h-[200px] md:max-h-[300px] object-contain object-bottom-right"
        />
      </picture>
    </div>
    <button
      onClick={() => window.history.back()}
      className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/40 hover:bg-white text-grey-700 transition-all border border-grey-300 z-20 group shadow-sm"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:scale-95 transition-transform">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  </div>
);

export const RegistrationForm: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showAllInterests, setShowAllInterests] = useState(false);
  const [data, setData] = useState<RegistrationData>({
    displayName: '',
    pronoun: '',
    phoneNumber: '',
    cityTown: '',
    role: '',
    organization: '',
    interests: [],
    termsAgreed: false,
    agreeToTerms: false,
    marketingConsent: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFirebaseLoading, setIsFirebaseLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorType, setErrorType] = useState<'signin' | 'account' | 'general' | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setIsFirebaseLoading(false);
      if (user && !data.displayName) {
        setData(prev => ({ ...prev, displayName: user.displayName || '' }));
      }
    });
    return () => unsubscribe();
  }, []);

  const updateData = (updates: Partial<RegistrationData>) => {
    setData((prev) => ({ ...prev, ...updates }));
    const key = Object.keys(updates)[0];
    if (errors[key]) {
      const newErrors = { ...errors };
      delete newErrors[key];
      setErrors(newErrors);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setErrorType(null);
      await signInWithGoogle();
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      // Show the 'Whoops' error screen unless it was just a manual close by user
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        setErrorType('signin');
      }
    }
  };

  const handleNextStep = async () => {
    if (currentStep === 1) {
      const newErrors = validateProfile(data);
      if (Object.keys(newErrors).length === 0) {
        setCurrentStep(2);
      } else {
        setErrors(newErrors);
      }
    } else if (currentStep === 2) {
      setIsSubmitting(true);
      try {
        const result = await submitRegistration(data);
        if (result.success) {
          window.dispatchEvent(new CustomEvent('registrationSuccess'));
          router.push('/payment');
        } else {
          setErrors({ submit: result.error || 'The user account type is not allowed.' });
          setErrorType('account');
        }
      } catch (err: any) {
        setErrors({ submit: err.message || 'An error occurred. Please try again.' });
        setErrorType('general');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const toggleInterest = (interest: string) => {
    const current = data.interests || [];
    const updated = current.includes(interest)
      ? current.filter(i => i !== interest)
      : [...current, interest];
    updateData({ interests: updated });
  };

  const inputBaseCls = 'w-full px-4 py-3.5 border border-grey-400 rounded-lg text-[1rem] focus:outline-none focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-all bg-white placeholder:text-grey-600';
  const errorTextCls = 'text-[0.75rem] text-google-red mt-2 font-medium px-4';

  if (isFirebaseLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-google-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (errorType) {
    return (
      <div className="flex-1 flex flex-col justify-center">
        <ErrorOverlay
          type={errorType}
          onTryAgain={() => setErrorType(null)}
          errorMessage={(errorType === 'account' || errorType === 'general') ? errors.submit : undefined}
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col">
        <RegistrationBanner />
        <div className="p-8 md:p-12 text-center">
          <h2 className="text-[1.75rem] font-medium text-grey-900 mb-4">Register for WOW</h2>
          <p className="text-[1rem] text-grey-700 mb-8 max-w-md mx-auto">
            Please sign in to your Google Account to register for the event and create your developer profile.
          </p>
          <button
            onClick={handleGoogleSignIn}
            className="inline-flex items-center gap-3 px-8 py-3 bg-white border border-grey-300 rounded-full hover:bg-grey-50 transition-colors shadow-sm font-medium"
          >
            <img src="/images/google.svg" alt="Google" width="18" />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col animate-fade-in">
      <RegistrationBanner />

      <div className="p-8 md:p-12">
        {currentStep === 1 && (
          <div className="animate-fade-in">
            <h3 className="text-[1.25rem] font-medium mb-3">Create a developer profile</h3>
            <p className="text-[0.9375rem] text-grey-700 mb-10 leading-relaxed max-w-[640px]">
              Create a developer profile to get recommendations for the best I/O sessions and content for you. You can also use your profile to save content to watch on demand.
            </p>

            <p className="text-[0.8125rem] text-google-red mb-4 mt-4">*Required field</p>

            <div className="space-y-8">
              <div>
                <input
                  className={inputBaseCls}
                  type="text"
                  value={data.displayName}
                  onChange={(e) => updateData({ displayName: e.target.value })}
                  placeholder="Display name*"
                />
                <p className="text-[0.75rem] text-grey-500 mt-2 px-4">Your name may appear where you contribute and can be changed at any time.</p>
                {errors.displayName && <p className={errorTextCls}>{errors.displayName}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div>
                  <div className="relative">
                    <select className={`${inputBaseCls} appearance-none pr-10 ${!data.pronoun ? 'text-grey-600' : 'text-grey-900'}`} value={data.pronoun} onChange={(e) => updateData({ pronoun: e.target.value })}>
                      <option value="">Pronoun*</option>
                      <option value="he/him">He/Him</option>
                      <option value="she/her">She/Her</option>
                      <option value="they/them">They/Them</option>
                      <option value="prefer not to say">Prefer not to say</option>
                    </select>
                    <div className="absolute right-4 inset-y-0 flex items-center pointer-events-none transform rotate-180">
                      <img
                        className="block dark:hidden h-2.5"
                        src="/images/chevron-up.svg"
                        alt=""
                        aria-hidden="true"
                      />
                      <img
                        className="hidden dark:block h-2.5"
                        src="/images/chevron-up-white.svg"
                        alt=""
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  {errors.pronoun && <p className={errorTextCls}>{errors.pronoun}</p>}
                </div>
                <div>
                  <div className="relative">
                    <input
                      className={`${inputBaseCls} pl-11`}
                      type="text"
                      value={data.cityTown}
                      onChange={(e) => updateData({ cityTown: e.target.value })}
                      placeholder="City/town*"
                    />
                    <div className="absolute left-4 inset-y-0 flex items-center pointer-events-none text-grey-600">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    </div>
                  </div>
                  {errors.cityTown && <p className={errorTextCls}>{errors.cityTown}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div>
                  <div className="relative">
                    <select className={`${inputBaseCls} appearance-none pr-10 ${!data.role ? 'text-grey-600' : 'text-grey-900'}`} value={data.role} onChange={(e) => updateData({ role: e.target.value })}>
                      <option value="">Role or job title</option>
                      <optgroup label="Select your role">
                        <option value="Architect">Architect</option>
                        <option value="Data analyst">Data analyst</option>
                        <option value="Data engineer">Data engineer</option>
                        <option value="Data scientist">Data scientist</option>
                        <option value="Database admin">Database admin</option>
                        <option value="Designer">Designer</option>
                        <option value="Developer">Developer</option>
                        <option value="Developer advocate">Developer advocate</option>
                        <option value="Devops engineer">Devops engineer</option>
                        <option value="Educator">Educator</option>
                        <option value="Machine learning engineer">Machine learning engineer</option>
                        <option value="Network engineer">Network engineer</option>
                        <option value="Product manager">Product manager</option>
                        <option value="Security professional">Security professional</option>
                        <option value="Something else">Something else</option>
                        <option value="Student">Student</option>
                        <option value="Sysadmin">Sysadmin</option>
                        <option value="Technical writer">Technical writer</option>
                      </optgroup>
                    </select>
                    <div className="absolute right-4 inset-y-0 flex items-center pointer-events-none transform rotate-180">
                      <img
                        className="block dark:hidden h-2.5"
                        src="/images/chevron-up.svg"
                        alt=""
                        aria-hidden="true"
                      />
                      <img
                        className="hidden dark:block h-2.5"
                        src="/images/chevron-up-white.svg"
                        alt=""
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <input
                    className={inputBaseCls}
                    type="text"
                    value={data.organization}
                    onChange={(e) => updateData({ organization: e.target.value })}
                    placeholder="Google"
                  />
                  <p className="text-[0.75rem] text-grey-500 mt-2 px-4">Name of your Company, Employer, or School</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div>
                  <div className="relative">
                    <div className="absolute left-4 inset-y-0 flex items-center pointer-events-none text-grey-900 font-medium">
                      <span className="border-r border-grey-300 pr-3 mr-3 h-5 flex items-center">+91</span>
                    </div>
                    <input
                      className={`${inputBaseCls} pl-16`}
                      type="tel"
                      value={data.phoneNumber}
                      onChange={(e) => updateData({ phoneNumber: e.target.value })}
                      placeholder="Phone number*"
                    />
                  </div>
                  <p className="text-[0.75rem] text-grey-500 mt-2 px-4">10-digit mobile number for communication</p>
                  {errors.phoneNumber && <p className={errorTextCls}>{errors.phoneNumber}</p>}
                </div>
              </div>

              <div className="">
                <h3 className="text-[1.25rem] font-medium mb-3">Select your interests</h3>
                <p className="text-[0.9375rem] text-grey-700 mb-8 leading-relaxed">
                  This will help us provide you with the most relevant I/O content.
                </p>

                <InterestTags
                  selectedInterests={data.interests}
                  toggleInterest={toggleInterest}
                  showAll={showAllInterests}
                />

                <div className="mt-6 mb-10">
                  <button
                    className="text-[0.875rem] font-medium text-grey-900 underline hover:no-underline decoration-2 underline-offset-4"
                    type="button"
                    onClick={() => setShowAllInterests(!showAllInterests)}
                  >
                    {showAllInterests ? 'See less' : 'See all'}
                  </button>
                </div>

                <p className="text-[0.8125rem] text-grey-600 leading-relaxed mb-10">
                  By creating a Google developer profile, you agree to the <span className="underline cursor-pointer">Content Policy</span>, <span className="underline cursor-pointer">Google's Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span> apply to your use of this service. Your display name may appear where you contribute and can be changed at any time.
                </p>

                <button onClick={handleNextStep} className="px-10 py-3 bg-grey-900 text-white rounded-full font-medium hover:bg-black transition-all text-[1rem]">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="animate-fade-in">
            <h3 className="text-[1.5rem] font-bold mb-10">Terms</h3>

            <div className="space-y-6 mb-10">
              {[
                {
                  key: 'termsAgreed' as keyof RegistrationData,
                  label: 'I am 18 years of age or older.',
                  required: true
                },
                {
                  key: 'agreeToTerms' as keyof RegistrationData,
                  label: <span className="inline">I agree to the <span className="underline">IO24 Terms and Conditions</span>, including <span className="underline">Google Terms and Community Guidelines</span>, and acknowledge that my info will be used in accordance with <span className="underline">Google's Privacy Policy</span></span>,
                  required: true
                },
                {
                  key: 'marketingConsent' as keyof RegistrationData,
                  label: 'I would like to receive marketing and events emails and updates about Google I/O.',
                  required: false
                },
                {
                  key: 'newsletterConsent' as any,
                  label: 'I would like to receive newsletters with the latest developer news and features for me. I understand that I can unsubscribe at any time by visiting my Developer Profile settings.',
                  required: false
                },
              ].map(({ key, label, required }) => (
                <div
                  key={key as string}
                  className="flex gap-4 items-start group"
                >
                  <label className="relative flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-grey-400 transition-all checked:border-google-blue checked:bg-google-blue"
                      checked={!!data[key as keyof RegistrationData]}
                      onChange={() => updateData({ [key]: !data[key as keyof RegistrationData] })}
                    />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                  </label>
                  <span className="text-[0.875rem] text-grey-800 leading-normal">
                    {label}{required && <span className="text-google-red font-bold"> *</span>}
                  </span>
                </div>
              ))}
            </div>

            {errors.submit && <p className="text-sm font-medium text-google-red mb-6">{errors.submit}</p>}

            <div className="flex gap-4">
              <button
                disabled={!data.termsAgreed || !data.agreeToTerms || isSubmitting}
                onClick={handleNextStep}
                className="px-10 py-2.5 bg-grey-900 text-white rounded-full font-medium hover:bg-grey-text disabled:bg-grey-300 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Registering...</span>
                  </>
                ) : (
                  <span>Register</span>
                )}
              </button>
              <button onClick={handlePreviousStep} className="px-8 py-2.5 bg-white border border-grey-400 text-grey-900 rounded-full font-medium hover:bg-grey-50 transition-all">
                Back
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
