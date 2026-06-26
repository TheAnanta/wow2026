'use client';

import React, { useState, useEffect, useRef } from 'react';
import { RegistrationData, validateProfile, submitRegistration } from '../../services/registrationStubs';
import { applyReferralCode } from '../../services/registrationStubs';
import { requestFirebaseToken } from '../../services/fcm';
import { analyticsService } from '../../services/analytics';
import { useAuth } from '../../context/AuthContext';
import { signInWithGoogle } from '../../services/firebase';
import { ErrorOverlay } from './ErrorOverlays';
import { useRouter, useSearchParams } from 'next/navigation';

const RegistrationBanner = () => (
  <div className="relative w-full h-40 md:h-56 bg-[#F1F3F4] dark:bg-grey-900 overflow-hidden border-b border-grey-200 dark:border-grey-text flex items-center px-8 md:px-14">
    <div className="flex-1 z-10">
      <h2 className="text-[1.875rem] md:text-[2.25rem] font-medium text-grey-900 dark:text-white tracking-tight leading-tight">Register for WOW</h2>
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
  const searchParams = useSearchParams();
  const formStartTimeRef = useRef(Date.now());
  const [data, setData] = useState<RegistrationData>({
    displayName: '',
    pronoun: '',
    phoneNumber: '',
    cityTown: '',
    role: '',
    organization: '',
    interests: [],
    termsAgreed: true,
    agreeToTerms: true,
    marketingConsent: false,
    newsletterConsent: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { user, profile, isLoggedIn, isLoading: isAuthLoading, refreshProfile, coupons, refreshTickets } = useAuth();
  const hasCoupon = coupons && coupons.length > 0;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorType, setErrorType] = useState<'signin' | 'account' | 'general' | null>(null);
  const [referralCode, setReferralCode] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('ref') || '';
    }
    return '';
  });
  const [referralStatus, setReferralStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [referralMessage, setReferralMessage] = useState('');

  useEffect(() => {
    if (profile) {
      setData(prev => ({
        ...prev,
        displayName: profile.first_name + (profile.last_name !== '.' ? ' ' + profile.last_name : ''),
        pronoun: profile.gender?.toLowerCase().replace(/_/g, ' ').replace(/(he)\s(him)/, '$1/$2').replace(/(she)\s(her)/, '$1/$2').replace(/(they)\s(them)/, '$1/$2') || '',
        phoneNumber: profile.phone?.replace('+91', '') || '',
        cityTown: profile.city || '',
        role: profile.designation || '',
        organization: profile.organization || '',
        interests: profile.interests || [],
      }));
    } else if (user && !data.displayName) {
      setData(prev => ({ ...prev, displayName: user.displayName || '' }));
    }
  }, [profile, user]);

  useEffect(() => {
    // If user is already registered (has a profile) and not in 'update' mode, 
    // redirect them to the payment page.
    if (isLoggedIn && profile && searchParams.get('update') !== 'true') {
      const currentParams = searchParams.toString();
      router.replace(`/payment${currentParams ? `?${currentParams}` : ''}`);
    }
  }, [isLoggedIn, profile, searchParams, router]);

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

  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);

  const handleSubmit = async () => {
    const newErrors = validateProfile(data);
    if (Object.keys(newErrors).length !== 0) {
      analyticsService.trackForm('registration', 'all', 'error', { errors: Object.keys(newErrors) });
      setErrors(newErrors);
      return;
    }
    // If they have a coupon, register as individual (to get the early bird ticket 1200 tier)
    if (hasCoupon) {
      handleConfirmRegistration('individual');
    } else {
      handleConfirmRegistration('team');
    }
  };

  const handleConfirmRegistration = async (type: 'individual' | 'team') => {
    setShowCheckoutDialog(false);
    analyticsService.trackCTA(`Register_${type}`, 'RegistrationForm', 'submit_start');
    setIsSubmitting(true);
    try {
      // Attempt to get FCM token before submission
      const fcm_token = await requestFirebaseToken();
      const intended_tier_id = type === 'team' ? 'clx_grouppass_006' : 'clx_earlybird_002';
      const result = await submitRegistration({ ...data, fcm_token: fcm_token || undefined, intended_tier_id });
      if (result.success) {
        const totalDuration = (Date.now() - formStartTimeRef.current) / 1000;
        analyticsService.trackTiming('registration_form', 'total_duration', totalDuration);
        analyticsService.trackForm('registration', 'all', 'complete');
        window.dispatchEvent(new CustomEvent('registrationSuccess'));
        await refreshProfile(); // Ensure state is updated before redirecting

        // Apply referral code if provided
        if (referralCode.trim()) {
          try {
            await applyReferralCode(referralCode.trim());
            setReferralStatus('success');
            setReferralMessage('₹100 WOW Cash added to your account! 🎉');
          } catch (err: any) {
            console.warn('Referral code error:', err.message);
            // Don't block registration if referral fails
          }
        }

        if (type === 'team') {
          router.push('/payment?tier=group');
        } else {
          if (hasCoupon && coupons[0]?.code) {
            try {
              const checkoutData = await initiateCheckout('clx_earlybird_002', coupons[0].code);
              if (checkoutData.data?.is_free || checkoutData.is_free) {
                await refreshTickets();
                router.push('/profile?success=true');
                return;
              }
            } catch (checkoutErr) {
              console.error('Failed auto-checkout with coupon:', checkoutErr);
            }
          }
          const couponParam = coupons[0]?.code ? `?promo=${coupons[0].code}` : '';
          router.push(`/payment${couponParam}`);
        }
      } else {
        analyticsService.trackForm('registration', 'all', 'error', { message: result.error });
        setErrors({ submit: result.error || 'The user account type is not allowed.' });
        setErrorType('account');
      }
    } catch (err: any) {
      analyticsService.trackForm('registration', 'all', 'error', { message: err.message });
      setErrors({ submit: err.message || 'An error occurred. Please try again.' });
      setErrorType('general');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseCls = 'w-full px-4 py-3.5 border border-grey-400 rounded-lg text-[1rem] focus:outline-none focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-all bg-white dark:bg-grey-900 placeholder:text-grey-600';
  const errorTextCls = 'text-[0.75rem] text-google-red mt-2 font-medium px-4';

  if (isAuthLoading) {
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

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col">
        <RegistrationBanner />
        <div className="p-8 md:p-12 text-center">
          <h2 className="text-[1.75rem] font-medium text-grey-900 mb-4">Register for WOW</h2>
          <p className="text-[1rem] text-grey-700 mb-8 max-w-md mx-auto">
            Please sign in to your Google Account to register for the event and create your student profile.
          </p>
          <button
            onClick={handleGoogleSignIn}
            className="inline-flex items-center gap-3 px-8 py-3 bg-white border border-grey-300 rounded-full hover:bg-grey-50 transition-colors shadow-sm font-medium"
          >
            <img src="/images/google.svg" alt="Google" width="18" />
            <span className='text-gray-900'>Sign in with Google</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col animate-fade-in">
      <RegistrationBanner />

      <div className="p-8 md:p-12">
        <div className="animate-fade-in">
          <h3 className="text-[1.25rem] font-medium mb-3">Create a student profile</h3>
          <p className="text-[0.9375rem] text-grey-700 mb-10 leading-relaxed max-w-[640px]">
            Create a student profile to get recommendations for the best WOW sessions and content for you. You can also use your profile to save content to watch on demand.
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
                  <select className={`${inputBaseCls} appearance-none pr-10 ${!data.pronoun ? 'text-grey-600' : 'text-grey-900 dark:text-white'}`} value={data.pronoun} onChange={(e) => updateData({ pronoun: e.target.value })}>
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
                <input
                  className={inputBaseCls}
                  type="text"
                  value={data.organization}
                  onChange={(e) => updateData({ organization: e.target.value })}
                  placeholder="University Name*"
                />
                <p className="text-[0.75rem] text-grey-500 mt-2 px-4">Name of your University, College or School</p>
                {errors.organization && <p className={errorTextCls}>{errors.organization}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Phone Number */}
              <div>
                <div className="relative">
                  <div className="absolute left-4 inset-y-0 flex items-center pointer-events-none text-grey-900 dark:text-white font-medium">
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

              {/* Referral Code */}
              <div>
                <div className="relative">
                  <div className="absolute left-4 inset-y-0 flex items-center pointer-events-none">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-grey-500">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                      <line x1="7" y1="7" x2="7.01" y2="7" />
                    </svg>
                  </div>
                  <input
                    className={`${inputBaseCls} pl-12`}
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    placeholder="Referral code (optional)"
                  />
                </div>
                <p className="text-[0.75rem] text-grey-500 mt-2 px-4">Got a friend's code? Get ₹100 WOW Cash on signup!</p>
                {referralStatus === 'success' && <p className="text-[0.75rem] text-google-green mt-2 px-4 font-medium">{referralMessage}</p>}
              </div>
            </div>

            <div className="mb-10">
              {[

                {
                  key: 'marketingConsent' as keyof RegistrationData,
                  label: 'I would like to receive marketing and events emails and updates about GDG WOW 2026.',
                  required: false
                },
                {
                  key: 'newsletterConsent' as keyof RegistrationData,
                  label: 'I would like to receive newsletters with the latest news and features for me. I understand that I can unsubscribe at any time by visiting my WOW Developer Profile settings.',
                  required: false
                },
              ].map(({ key, label, required }) => (
                <div
                  key={key as string}
                  className="filter-box__item"
                >
                  <input
                    type="checkbox"
                    id={key as string}
                    className="checkbox"
                    checked={!!data[key as keyof RegistrationData]}
                    onChange={() => {
                      const newState = !data[key as keyof RegistrationData];
                      analyticsService.trackUI(key as string, newState, 'RegistrationForm');
                      updateData({ [key]: newState });
                    }}
                  />
                  <label
                    className="text-[0.875rem] text-grey-800 dark:text-white leading-normal cursor-pointer flex-1"
                    htmlFor={key as string}
                  >
                    {label}{required && <span className="text-google-red font-bold"> *</span>}
                  </label>
                </div>
              ))}
            </div>

            <p className="text-[0.8125rem] text-grey-600 leading-relaxed mb-10">
              By creating a WOW student profile, you agree to the <a href="/content-policy" target="_blank" rel="noopener noreferrer" className="underline">Content Policy</a>, <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline">WOW's Terms of Service</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline">Privacy Policy</a> apply to your use of this service. Your display name may appear where you contribute and can be changed at any time.
            </p>

            {errors.submit && <p className="text-sm font-medium text-google-red mb-6">{errors.submit}</p>}

            <button
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="px-10 py-3 bg-grey-900 dark:bg-white text-white dark:text-grey-900 rounded-full font-medium hover:bg-black dark:hover:bg-white/80 disabled:bg-grey-300 disabled:cursor-not-allowed transition-all text-[1rem] flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{profile ? 'Updating...' : 'Registering...'}</span>
                </>
              ) : (
                <span>{profile ? 'Update profile' : 'Register'}</span>
              )}
            </button>
          </div>
        </div>
      </div>
      {showCheckoutDialog && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fade-in"
        >
          <div
            className="bg-white dark:bg-[#1e2124] rounded-[28px] p-6 md:p-8 max-w-[500px] w-full shadow-2xl border border-grey-200 dark:border-grey-700"
            style={{
              animation: 'dialogIn 280ms cubic-bezier(.2,0,0,1) both',
            }}
          >
            <h3 className="text-2xl font-bold tracking-tight text-grey-900 dark:text-white mb-2">
              Select Registration Type
            </h3>
            <p className="text-sm text-grey-600 dark:text-grey-400 mb-6">
              Choose how you would like to register for GDG WOW 2026.
            </p>

            <div className="flex flex-col gap-4 mb-6">
              {/* Individual Option */}
              <button
                type="button"
                onClick={() => handleConfirmRegistration('individual')}
                className="flex items-start gap-4 p-4 rounded-2xl border-2 border-grey-200 dark:border-grey-700 hover:border-google-blue dark:hover:border-google-blue bg-grey-50 dark:bg-grey-900/50 hover:bg-google-blue/5 dark:hover:bg-google-blue/10 text-left transition-all group active:scale-[0.98]"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-google-blue/10 text-google-blue group-hover:scale-110 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg text-grey-900 dark:text-white">Individual Pass</div>
                  <div className="text-sm text-grey-600 dark:text-grey-400 mt-0.5">Early Bird ticket for 1 attendee.</div>
                  <div className="text-xl font-bold text-google-blue mt-2">₹1,200</div>
                </div>
              </button>

              {/* Team Option */}
              <button
                type="button"
                onClick={() => handleConfirmRegistration('team')}
                className="flex items-start gap-4 p-4 rounded-2xl border-2 border-google-green bg-google-green/5 dark:bg-google-green/10 hover:bg-google-green/10 dark:hover:bg-google-green/20 text-left transition-all relative overflow-hidden group active:scale-[0.98]"
              >
                {/* Popular Badge */}
                <div className="absolute top-0 right-0 bg-google-green text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-bl-xl">
                  Save 33%
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-google-green/20 text-google-green group-hover:scale-110 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg text-grey-900 dark:text-white">Group Pass (Team of 5)</div>
                  <div className="text-sm text-grey-600 dark:text-grey-400 mt-0.5">Bring your squad. Details for other members collected later.</div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-xl font-bold text-google-green">₹4,000</span>
                    <span className="text-sm line-through text-grey-500">₹6,000</span>
                  </div>
                </div>
              </button>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowCheckoutDialog(false)}
                className="px-6 py-2.5 rounded-full text-sm font-semibold text-grey-700 dark:text-grey-300 hover:bg-grey-100 dark:hover:bg-grey-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes dialogIn {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};
