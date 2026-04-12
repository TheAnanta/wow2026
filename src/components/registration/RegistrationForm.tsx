'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from "next-intl";
import React, { useState, useEffect, useRef } from 'react';
import { InterestTags } from './InterestTags';
import { RegistrationData, validateProfile, submitRegistration } from '../../services/registrationStubs';
import { requestFirebaseToken } from '../../services/fcm';
import { analyticsService } from '../../services/analytics';
import { useAuth } from '../../context/AuthContext';
import { signInWithGoogle } from '../../services/firebase';
import { ErrorOverlay } from './ErrorOverlays';
import { useRouter } from 'next/navigation';
const RegistrationBanner = () => {
  const t = useTranslations();
  return <div className="relative w-full h-40 md:h-56 bg-[#F1F3F4] overflow-hidden border-b border-grey-200 flex items-center px-8 md:px-14">
    <div className="flex-1 z-10">
      <h2 className="text-[1.875rem] md:text-[2.25rem] font-medium text-grey-900 tracking-tight leading-tight">{t("register_for_wow")}</h2>
    </div>
    <div className="absolute bottom-0 -right-16 sm:right-0 w-[80%] md:w-[65%] pointer-events-none select-none">
      <picture className="w-full">
        <source srcSet="/images/io24-pencil-road-centered-dark.svg" media="(prefers-color-scheme: dark)" />
        <img src="/images/io24-pencil-road-centered.svg" alt="" className="w-full max-h-[200px] md:max-h-[300px] object-contain object-bottom-right" />
      </picture>
    </div>
    <button onClick={() => window.history.back()} className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/40 hover:bg-white text-grey-700 transition-all border border-grey-300 z-20 group shadow-sm">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:scale-95 transition-transform">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  </div>;
};
export const RegistrationForm: React.FC = () => {
  const t = useTranslations();
  const router = useRouter();
  const formStartTimeRef = useRef(Date.now());
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
    marketingConsent: false
  });
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  const {
    user,
    profile,
    isLoggedIn,
    isLoading: isAuthLoading,
    refreshProfile
  } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorType, setErrorType] = useState<'signin' | 'account' | 'general' | null>(null);
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
        interests: profile.interests || []
      }));
    } else if (user && !data.displayName) {
      setData(prev => ({
        ...prev,
        displayName: user.displayName || ''
      }));
    }
  }, [profile, user]);
  const updateData = (updates: Partial<RegistrationData>) => {
    setData(prev => ({
      ...prev,
      ...updates
    }));
    const key = Object.keys(updates)[0];
    if (errors[key]) {
      const newErrors = {
        ...errors
      };
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
        const step1Duration = (Date.now() - formStartTimeRef.current) / 1000;
        analyticsService.trackTiming('registration_form', 'step1_duration', step1Duration);
        analyticsService.trackForm('registration', 'step1', 'complete');
        setCurrentStep(2);
      } else {
        analyticsService.trackForm('registration', 'step1', 'error', {
          errors: Object.keys(newErrors)
        });
        setErrors(newErrors);
      }
    } else if (currentStep === 2) {
      analyticsService.trackCTA('Register', 'RegistrationForm', 'submit_start');
      setIsSubmitting(true);
      try {
        // Attempt to get FCM token before submission
        const fcm_token = await requestFirebaseToken();
        const result = await submitRegistration({
          ...data,
          fcm_token: fcm_token || undefined
        });
        if (result.success) {
          const totalDuration = (Date.now() - formStartTimeRef.current) / 1000;
          analyticsService.trackTiming('registration_form', 'total_duration', totalDuration);
          analyticsService.trackForm('registration', 'all', 'complete');
          window.dispatchEvent(new CustomEvent('registrationSuccess'));
          await refreshProfile(); // Ensure state is updated before redirecting
          router.push('/payment');
        } else {
          analyticsService.trackForm('registration', 'all', 'error', {
            message: result.error
          });
          setErrors({
            submit: result.error || 'The user account type is not allowed.'
          });
          setErrorType('account');
        }
      } catch (err: any) {
        analyticsService.trackForm('registration', 'all', 'error', {
          message: err.message
        });
        setErrors({
          submit: err.message || 'An error occurred. Please try again.'
        });
        setErrorType('general');
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  const handlePreviousStep = () => {
    analyticsService.trackCTA('Back', 'RegistrationForm', 'click');
    setCurrentStep(prev => Math.max(1, prev - 1));
  };
  const toggleInterest = (interest: string) => {
    const current = data.interests || [];
    const updated = current.includes(interest) ? current.filter(i => i !== interest) : [...current, interest];
    analyticsService.trackUI('interest_tag', updated.includes(interest), 'RegistrationForm');
    updateData({
      interests: updated
    });
  };
  const inputBaseCls = 'w-full px-4 py-3.5 border border-grey-400 rounded-lg text-[1rem] focus:outline-none focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-all bg-white placeholder:text-grey-600';
  const errorTextCls = 'text-[0.75rem] text-google-red mt-2 font-medium px-4';
  if (isAuthLoading) {
    return <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="w-10 h-10 border-4 border-google-blue border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }
  if (errorType) {
    return <div className="flex-1 flex flex-col justify-center">
      <ErrorOverlay type={errorType} onTryAgain={() => setErrorType(null)} errorMessage={errorType === 'account' || errorType === 'general' ? errors.submit : undefined} />
    </div>;
  }
  if (!isLoggedIn) {
    return <div className="flex flex-col">
      <RegistrationBanner />
      <div className="p-8 md:p-12 text-center">
        <h2 className="text-[1.75rem] font-medium text-grey-900 mb-4">{t("register_for_wow")}</h2>
        <p className="text-[1rem] text-grey-700 mb-8 max-w-md mx-auto">{t("please_sign_in_to_your_google_account_to_register_for_the_event_and_create_your_developer_profile")}</p>
        <button onClick={handleGoogleSignIn} className="inline-flex items-center gap-3 px-8 py-3 bg-white border border-grey-300 rounded-full hover:bg-grey-50 transition-colors shadow-sm font-medium">
          <img src="/images/google.svg" alt="Google" width="18" />
          <span>{t("sign_in_with_google")}</span>
        </button>
      </div>
    </div>;
  }
  return <div className="flex flex-col animate-fade-in">
    <RegistrationBanner />

    <div className="p-8 md:p-12">
      {currentStep === 1 && <div className="animate-fade-in">
        <h3 className="text-[1.25rem] font-medium mb-3">{t("create_a_developer_profile")}</h3>
        <p className="text-[0.9375rem] text-grey-700 mb-10 leading-relaxed max-w-[640px]">{t("create_a_developer_profile_to_get_recommendations_for_the_best_io_sessions_and_content_for_you_you_can_also_use_your_profile_to_save_content_to_watch_on_demand")}</p>

        <p className="text-[0.8125rem] text-google-red mb-4 mt-4">{t("required_field")}</p>

        <div className="space-y-8">
          <div>
            <input className={inputBaseCls} type="text" value={data.displayName} onChange={e => updateData({
              displayName: e.target.value
            })} placeholder={t("display_name")} />
            <p className="text-[0.75rem] text-grey-500 mt-2 px-4">{t("your_name_may_appear_where_you_contribute_and_can_be_changed_at_any_time")}</p>
            {errors.displayName && <p className={errorTextCls}>{errors.displayName}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="relative">
                <select className={`${inputBaseCls} appearance-none pr-10 ${!data.pronoun ? 'text-grey-600' : 'text-grey-900'}`} value={data.pronoun} onChange={e => updateData({
                  pronoun: e.target.value
                })}>
                  <option value="">{t("pronoun")}</option>
                  <option value="he/him">{t("hehim")}</option>
                  <option value="she/her">{t("sheher")}</option>
                  <option value="they/them">{t("theythem")}</option>
                  <option value="prefer not to say">{t("prefer_not_to_say")}</option>
                </select>
                <div className="absolute right-4 inset-y-0 flex items-center pointer-events-none transform rotate-180">
                  <img className="block dark:hidden h-2.5" src="/images/chevron-up.svg" alt="" aria-hidden="true" />
                  <img className="hidden dark:block h-2.5" src="/images/chevron-up-white.svg" alt="" aria-hidden="true" />
                </div>
              </div>
              {errors.pronoun && <p className={errorTextCls}>{errors.pronoun}</p>}
            </div>
            <div>
              <div className="relative">
                <input className={`${inputBaseCls} pl-11`} type="text" value={data.cityTown} onChange={e => updateData({
                  cityTown: e.target.value
                })} placeholder={t("citytown")} />
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
                <select className={`${inputBaseCls} appearance-none pr-10 ${!data.role ? 'text-grey-600' : 'text-grey-900'}`} value={data.role} onChange={e => updateData({
                  role: e.target.value
                })}>
                  <option value="">{t("role_or_job_title")}</option>
                  <optgroup label="Select your role">
                    <option value="Architect">{t("architect")}</option>
                    <option value="Data analyst">{t("data_analyst")}</option>
                    <option value="Data engineer">{t("data_engineer")}</option>
                    <option value="Data scientist">{t("data_scientist")}</option>
                    <option value="Database admin">{t("database_admin")}</option>
                    <option value="Designer">{t("designer")}</option>
                    <option value="Developer">{t("developer")}</option>
                    <option value="Developer advocate">{t("developer_advocate")}</option>
                    <option value="Devops engineer">{t("devops_engineer")}</option>
                    <option value="Educator">{t("educator")}</option>
                    <option value="Machine learning engineer">{t("machine_learning_engineer")}</option>
                    <option value="Network engineer">{t("network_engineer")}</option>
                    <option value="Product manager">{t("product_manager")}</option>
                    <option value="Security professional">{t("security_professional")}</option>
                    <option value="Something else">{t("something_else")}</option>
                    <option value="Student">{t("student")}</option>
                    <option value="Sysadmin">{t("sysadmin")}</option>
                    <option value="Technical writer">{t("technical_writer")}</option>
                  </optgroup>
                </select>
                <div className="absolute right-4 inset-y-0 flex items-center pointer-events-none transform rotate-180">
                  <img className="block dark:hidden h-2.5" src="/images/chevron-up.svg" alt="" aria-hidden="true" />
                  <img className="hidden dark:block h-2.5" src="/images/chevron-up-white.svg" alt="" aria-hidden="true" />
                </div>
              </div>
            </div>
            <div>
              <input className={inputBaseCls} type="text" value={data.organization} onChange={e => updateData({
                organization: e.target.value
              })} placeholder={t("google")} />
              <p className="text-[0.75rem] text-grey-500 mt-2 px-4">{t("name_of_your_company_employer_or_school")}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="relative">
                <div className="absolute left-4 inset-y-0 flex items-center pointer-events-none text-grey-900 font-medium">
                  <span className="border-r border-grey-300 pr-3 mr-3 h-5 flex items-center">{t("91")}</span>
                </div>
                <input className={`${inputBaseCls} pl-16`} type="tel" value={data.phoneNumber} onChange={e => updateData({
                  phoneNumber: e.target.value
                })} placeholder={t("phone_number")} />
              </div>
              <p className="text-[0.75rem] text-grey-500 mt-2 px-4">{t("10digit_mobile_number_for_communication")}</p>
              {errors.phoneNumber && <p className={errorTextCls}>{errors.phoneNumber}</p>}
            </div>
          </div>

          <div className="">
            <h3 className="text-[1.25rem] font-medium mb-3">{t("select_your_interests")}</h3>
            <p className="text-[0.9375rem] text-grey-700 mb-8 leading-relaxed">{t("this_will_help_us_provide_you_with_the_most_relevant_io_content")}</p>

            <InterestTags selectedInterests={data.interests} toggleInterest={toggleInterest} showAll={showAllInterests} />

            <div className="mt-6 mb-10">
              <button className="text-[0.875rem] font-medium text-grey-900 underline hover:no-underline decoration-2 underline-offset-4" type="button" onClick={() => setShowAllInterests(!showAllInterests)}>
                {showAllInterests ? t('see_less') : t('see_all')}
              </button>
            </div>

            <p className="text-[0.8125rem] text-grey-600 leading-relaxed mb-10">{t("by_creating_a_wow_developer_profile_you_agree_to_the")}<Link href="/content-policy" target="_blank" rel="noopener noreferrer" className="underline">{t("content_policy")}</Link>, <Link href="/terms" target="_blank" rel="noopener noreferrer" className="underline">{t("wows_terms_of_service")}</Link>{t("and")}<Link href="/privacy" target="_blank" rel="noopener noreferrer" className="underline">{t("privacy_policy")}</Link>{t("apply_to_your_use_of_this_service_your_display_name_may_appear_where_you_contribute_and_can_be_changed_at_any_time")}</p>

            <button onClick={handleNextStep} className="px-10 py-3 bg-grey-900 text-white rounded-full font-medium hover:bg-black transition-all text-[1rem]">{t("next")}</button>
          </div>
        </div>
      </div>}

      {currentStep === 2 && <div className="animate-fade-in">
        <h3 className="text-[1.5rem] font-bold mb-10">{t("terms")}</h3>

        <div className="mb-10">
          {[{
            key: 'agreeToTerms' as keyof RegistrationData,
            label: <span className="inline">{t("i_agree_to_the")}<Link href="/terms" target="_blank" rel="noopener noreferrer" className="underline">{t("wow_terms_and_conditions")}</Link>{t("_including")}<Link href="/code-of-conduct" target="_blank" rel="noopener noreferrer" className="underline">{t("google_terms_and_community_guidelines")}</Link>{t("_and_acknowledge_that_my_info_will_be_used_in_accordance_with")}<Link href="/privacy" target="_blank" rel="noopener noreferrer" className="underline">{t("googles_privacy_policy")}</Link></span>,
            required: true
          }, {
            key: 'marketingConsent' as keyof RegistrationData,
            label: t('i_would_like_to_receive_marketing_and_events_emails_and_updates_about_gdg_wow_2026'),
            required: false
          }, {
            key: 'newsletterConsent' as any,
            label: t('i_would_like_to_receive_newsletters_with_the_latest_developer_news_and_features_for_me_i_understand_that_i_can_unsubscribe_at_any_time_by_visiting_my_wow_developer_profile_settings'),
            required: false
          }].map(({
            key,
            label,
            required
          }) => <div key={key as string} className="filter-box__item">
              <input type="checkbox" id={key as string} className="checkbox" checked={!!data[key as keyof RegistrationData]} onChange={() => {
                const newState = !data[key as keyof RegistrationData];
                analyticsService.trackUI(key as string, newState, 'RegistrationForm');
                updateData({
                  [key]: newState
                });
              }} />
              <label className="text-[0.875rem] text-grey-800 leading-normal cursor-pointer flex-1" htmlFor={key as string}>
                {label}{required && <span className="text-google-red font-bold"> *</span>}
              </label>
            </div>)}
        </div>

        {errors.submit && <p className="text-sm font-medium text-google-red mb-6">{errors.submit}</p>}

        <div className="flex gap-4">
          <button disabled={!data.agreeToTerms || isSubmitting} onClick={handleNextStep} className="px-10 py-2.5 bg-grey-900 text-white rounded-full font-medium hover:bg-grey-text disabled:bg-grey-300 disabled:cursor-not-allowed transition-all flex items-center gap-2">
            {isSubmitting ? <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>{profile ? t('updating_') : t('registering_')}</span>
            </> : <span>{profile ? t('update_profile') : t('register')}</span>}
          </button>
          <button onClick={handlePreviousStep} className="px-8 py-2.5 bg-white border border-grey-400 text-grey-900 rounded-full font-medium hover:bg-grey-50 transition-all">{t("back")}</button>
        </div>
      </div>}
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
  </div>;
};