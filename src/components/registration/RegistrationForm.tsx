'use client';

import React, { useState, useEffect } from 'react';
import { InterestTags } from './InterestTags';
import { RegistrationData, validateProfile, submitRegistration } from '../../services/registrationStubs';
import { auth, signInWithGoogle } from '../../services/firebase';
import { useRouter } from 'next/navigation';

export const RegistrationForm: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<RegistrationData>({
    displayName: '',
    pronoun: '',
    phoneNumber: '',
    cityTown: '',
    role: '',
    interests: [],
    termsAgreed: false,
    agreeToTerms: false,
    marketingConsent: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFirebaseLoading, setIsFirebaseLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setIsFirebaseLoading(false);
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
      await signInWithGoogle();
    } catch (err) {
      console.error('Google Sign In Error:', err);
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
          setErrors({ submit: result.error || 'Registration failed' });
        }
      } catch (err) {
        setErrors({ submit: 'An error occurred. Please try again.' });
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

  // Realigning with the "WOW" design system classes
  const inputContainerCls = 'flex flex-col mb-4';
  const labelCls = 'font-medium mb-2 sm:s-p1 md:l-h6 dark:text-grey-bg transition-colors';
  const inputCls = 'w-full py-4 px-5 border-2 border-grey-900 dark:border-grey-bg rounded-[16px] font-sans text-base bg-white dark:bg-grey-900 text-grey-900 dark:text-white focus:outline-none focus:border-google-blue dark:focus:border-google-blue transition-all selection:bg-google-blue/30';
  const errorTextCls = 'text-xs text-google-red font-bold mt-2 animate-fade-in';

  if (isFirebaseLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="w-12 h-12 border-[3px] border-google-blue border-t-transparent rounded-full animate-spin mb-6" />
        <p className="font-medium sm:s-h6 md:l-h6 dark:text-white">Authenticating...</p>
      </div>
    );
  }

  if (!isAuthenticated && currentStep === 1) {
    return (
      <div className="flex flex-col items-center text-center animate-fade-in py-6">
        <div className="w-20 h-20 bg-google-blue text-white rounded-2xl flex items-center justify-center mb-8 shadow-[4px_4px_0px_rgba(32,33,36,1)] dark:shadow-[4px_4px_0px_rgba(241,243,244,1)] border-2 border-grey-900 dark:border-grey-bg">
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
             <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
           </svg>
        </div>
        <h2 className="font-medium mb-4 sm:s-h3 md:l-h3 dark:text-white">Sign in required</h2>
        <p className="font-medium sm:s-p1 md:l-h6 text-grey-text dark:text-grey-bg/80 mb-10 leading-relaxed max-w-[340px]">
          Please sign in with your Google account to confirm your registration for GDG WOW.
        </p>
        <button
          onClick={handleGoogleSignIn}
          className="bg-white dark:bg-grey-900 text-grey-900 dark:text-white border-2 border-grey-900 dark:border-grey-bg rounded-full flex items-center justify-center gap-4 py-4 px-12 font-bold hover:bg-grey-bg dark:hover:bg-grey transition-all shadow-[4px_4px_0px_rgba(32,33,36,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="22" />
          <span>Sign in with Google</span>
        </button>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col animate-fade-in">
            {/* Step Indicators - Google Pills Style */}
            <div className="flex gap-2 mb-10">
               <div className="h-2 flex-1 rounded-full bg-google-blue border-1.2 border-grey-900 dark:border-grey-bg" />
               <div className="h-2 flex-1 rounded-full bg-grey-bg dark:bg-grey border-1.2 border-grey-900 dark:border-grey-bg" />
            </div>

            <div className="mb-8">
              <h2 className="font-medium mb-2 sm:s-h4 md:l-h3 dark:text-white">Developer Profile</h2>
              <p className="font-medium sm:s-p1 md:l-h6 text-grey-text dark:text-grey-bg/80">Tell us a bit about yourself.</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className={inputContainerCls}>
                <label className={labelCls}>Display name <span className="text-google-red">*</span></label>
                <input
                  className={inputCls}
                  type="text"
                  value={data.displayName}
                  onChange={(e) => updateData({ displayName: e.target.value })}
                  placeholder="e.g. GDG Developer"
                />
                {errors.displayName && <p className={errorTextCls}>{errors.displayName}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={inputContainerCls}>
                  <label className={labelCls}>Phone number <span className="text-google-red">*</span></label>
                  <div className="relative group/phone">
                    <div className="absolute left-0 top-0 bottom-0 px-4 flex items-center bg-grey-bg dark:bg-grey border-r-2 border-grey-900 dark:border-grey-bg rounded-l-[16px] font-bold text-grey-900 dark:text-white">
                       <span className="mr-2">🇮🇳</span> +91
                    </div>
                    <input
                      className={`${inputCls} pl-[94px]`}
                      type="tel"
                      value={data.phoneNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                        updateData({ phoneNumber: val });
                      }}
                      placeholder="9876543210"
                    />
                  </div>
                  {errors.phoneNumber && <p className={errorTextCls}>{errors.phoneNumber}</p>}
                </div>
                
                <div className={inputContainerCls}>
                  <label className={labelCls}>City/town <span className="text-google-red">*</span></label>
                  <input
                    className={inputCls}
                    type="text"
                    value={data.cityTown}
                    onChange={(e) => updateData({ cityTown: e.target.value })}
                    placeholder="e.g. Bangalore"
                  />
                  {errors.cityTown && <p className={errorTextCls}>{errors.cityTown}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={inputContainerCls}>
                  <label className={labelCls}>Pronoun</label>
                  <select className={inputCls} value={data.pronoun} onChange={(e) => updateData({ pronoun: e.target.value })}>
                    <option value="">Select</option>
                    <option value="he/him">He/Him</option>
                    <option value="she/her">She/Her</option>
                    <option value="they/them">They/Them</option>
                    <option value="prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div className={inputContainerCls}>
                  <label className={labelCls}>Role or job title</label>
                  <select className={inputCls} value={data.role} onChange={(e) => updateData({ role: e.target.value })}>
                    <option value="">Select</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Designer">Designer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student">Student</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-bold sm:s-h6 md:l-h6 dark:text-white uppercase tracking-wider mb-4">Your Interests</h3>
                <InterestTags selectedInterests={data.interests} toggleInterest={toggleInterest} />
              </div>

              <div className="flex justify-end mt-10">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="cta-primary w-full md:w-auto px-12 py-4"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col animate-fade-in">
             {/* Step Indicators */}
            <div className="flex gap-2 mb-10">
               <div className="h-2 flex-1 rounded-full bg-google-blue border-1.2 border-grey-900 dark:border-grey-bg" />
               <div className="h-2 flex-1 rounded-full bg-google-green border-1.2 border-grey-900 dark:border-grey-bg" />
            </div>

             <div className="mb-8">
              <h2 className="font-medium mb-2 sm:s-h4 md:l-h3 dark:text-white">Terms & Agreements</h2>
              <p className="font-medium sm:s-p1 md:l-h6 text-grey-text dark:text-grey-bg/80">Finalize your event consent.</p>
            </div>
            
            <div className="flex flex-col gap-4">
              {[
                { key: 'termsAgreed' as keyof RegistrationData, label: 'I am 18 years of age or older.', required: true },
                { key: 'agreeToTerms' as keyof RegistrationData, label: 'I agree to the WOW 2026 Terms & Conditions, including Google Community Guidelines.', required: true },
                { key: 'marketingConsent' as keyof RegistrationData, label: 'I would like to receive marketing emails and event updates.', required: false },
              ].map(({ key, label, required }) => (
                <div
                  key={key}
                  className="flex gap-5 items-start cursor-pointer group p-5 rounded-[16px] border-2 border-transparent hover:border-grey-bg dark:hover:border-grey-900 hover:bg-grey-bg/30 dark:hover:bg-white/5 transition-all"
                  onClick={() => updateData({ [key]: !data[key as keyof RegistrationData] })}
                >
                  <div className={`checkbox-native flex-shrink-0 mt-1 ${data[key] ? 'checked' : ''}`}>
                    <input type="checkbox" checked={data[key] as boolean} readOnly className="hidden" />
                    {(data[key] as boolean) && (
                        <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    )}
                  </div>
                  <span className="font-medium sm:s-p1 md:l-h6 dark:text-white leading-normal">
                    {label}{required && <span className="text-google-red font-black"> *</span>}
                  </span>
                </div>
              ))}
            </div>

            {errors.submit && <p className="text-sm font-bold text-google-red p-5 bg-google-red/10 rounded-xl border-2 border-google-red mt-8">{errors.submit}</p>}

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-12 pt-8 border-t-2 border-dashed border-grey-bg dark:border-grey-900">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="font-bold sm:s-p1 md:l-p1 text-grey-text dark:text-grey-bg hover:text-grey-900 dark:hover:text-white transition-colors tracking-widest px-4 uppercase"
              >
                Back
              </button>
              <button
                type="button"
                disabled={!data.termsAgreed || !data.agreeToTerms || isSubmitting}
                onClick={handleNextStep}
                className={`cta-primary w-full md:min-w-[240px] flex items-center justify-center gap-3`}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-[3px] border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Complete Registration</span>
                )}
              </button>
            </div>

            <style jsx>{`
              .checkbox-native {
                width: 24px;
                height: 24px;
                border: 2.5px solid #202124;
                border-radius: 6px;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                background: white;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1.5px;
              }
              :global(.dark) .checkbox-native {
                border-color: #F1F3F4;
                background: transparent;
              }
              .checkbox-native.checked {
                background: #202124;
                border-color: #202124;
              }
              :global(.dark) .checkbox-native.checked {
                background: #4285F4;
                border-color: #4285F4;
              }
            `}</style>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="w-full">{renderStep()}</div>;
};
